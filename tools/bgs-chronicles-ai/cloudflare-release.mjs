import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { isSupportedModel } from "./src/gemini.js";

class ReleaseError extends Error {}

const workerName = "bgs-chronicles-ai";
const requiredSecret = "GEMINI_API_KEY";
const configFile = new URL("./wrangler.jsonc", import.meta.url);
const closedWorker = {
  name: workerName,
  main: "src/worker.js",
  workers_dev: false,
  preview_urls: false,
  observability: { enabled: false },
  secrets: { required: [requiredSecret] },
  durable_objects: { bindings: [{ name: "QUOTA", class_name: "PilotQuota" }] },
  migrations: [{ tag: "bgs-ai-quota-v1", new_sqlite_classes: ["PilotQuota"] }],
};

export function validateClosedConfig(config) {
  const { $schema, compatibility_date, compatibility_flags, vars, ...deployment } = config;
  const model = vars?.GEMINI_MODEL;
  const disabledVars = { PILOT_ENABLED: "false", FREE_TIER_VERIFIED: "false", GEMINI_MODEL: model };
  if (!isDeepStrictEqual(deployment, closedWorker) || !isDeepStrictEqual(vars, disabledVars) ||
      !isSupportedModel(model)) {
    throw new ReleaseError("Tracked Wrangler configuration is outside the closed Workers Free deployment.");
  }
}

async function readCloudflare(url, token, label, request) {
  let response;
  try {
    response = await request(url, {
      method: "GET",
      headers: { authorization: `Bearer ${token}`, accept: "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new ReleaseError(`${label}: Cloudflare API could not be reached.`);
  }
  if (!response.ok) {
    const status = response.status;
    if (status === 401 || status === 403) {
      throw new ReleaseError(`${label}: HTTP ${status}. Check token expiry and Workers access in the target account.`);
    }
    if (status === 404) throw new ReleaseError(`${label}: HTTP 404. Check that the named Worker exists in the target account.`);
    throw new ReleaseError(`${label}: Cloudflare rejected the request (HTTP ${status}).`);
  }
  const envelope = await response.json().catch(() => null);
  if (envelope?.success !== true || !envelope.result) {
    throw new ReleaseError(`${label}: Cloudflare did not return a successful result.`);
  }
  return envelope.result;
}

export async function inspectWorker(env, request = fetch) {
  const { CLOUDFLARE_ACCOUNT_ID: account, CLOUDFLARE_API_TOKEN: token } = env;
  if (!/^[a-f\d]{32}$/i.test(account ?? "") || !token?.trim()) {
    throw new ReleaseError("Cloudflare account ID or API token is missing or malformed.");
  }
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${account}/workers/scripts/${workerName}`;
  const secrets = await readCloudflare(endpoint + "/secrets", token, "Worker Secret metadata", request);
  if (!Array.isArray(secrets) || secrets.some(item =>
    typeof item?.name !== "string" || typeof item.type !== "string")) {
    throw new ReleaseError("Worker Secret metadata: unexpected response shape.");
  }
  if (!secrets.some(item => item.name === requiredSecret && item.type === "secret_text")) {
    throw new ReleaseError("Existing Worker is missing the GEMINI_API_KEY text Secret.");
  }
  const routing = await readCloudflare(endpoint + "/subdomain", token, "Worker URL status", request);
  if (typeof routing.enabled !== "boolean" || typeof routing.previews_enabled !== "boolean") {
    throw new ReleaseError("Worker URL status: unexpected response shape.");
  }
  return {
    secretNames: new Set(secrets.map(item => item.name)),
    pilotSecret: secrets.some(item => item.name === "PILOT_ACCESS_TOKEN" && item.type === "secret_text"),
    workersDev: routing.enabled,
    previews: routing.previews_enabled,
  };
}

function runWrangler(env) {
  const cli = fileURLToPath(new URL("./node_modules/wrangler/bin/wrangler.js", import.meta.url));
  const result = spawnSync(process.execPath, [cli, "deploy", "--config", fileURLToPath(configFile)], {
    cwd: fileURLToPath(new URL(".", import.meta.url)),
    env: { ...env, CI: "true", WRANGLER_SEND_METRICS: "false", WRANGLER_WRITE_LOGS: "false" },
    stdio: "ignore",
  });
  if (result.status !== 0) {
    throw new ReleaseError("Wrangler deploy did not complete. Check the Worker deployment history and token write permission before retrying.");
  }
}

export async function release(operation, env, config, {
  request = fetch, deploy = runWrangler, report = console.log,
} = {}) {
  if (operation !== "preflight" && operation !== "deploy") throw new ReleaseError("Unknown workflow operation.");
  validateClosedConfig(config);

  const before = await inspectWorker(env, request);
  report("Cloudflare authentication, existing Worker and GEMINI_API_KEY text Secret verified.");
  report(`PILOT_ACCESS_TOKEN text Secret: ${before.pilotSecret ? "present" : "missing"}.`);
  report(`workers.dev: ${before.workersDev ? "enabled" : "disabled"} / preview URLs: ${before.previews ? "enabled" : "disabled"}.`);
  if (operation === "preflight") return;

  if (env.CLOSED_FREE_CONFIRMED !== "true") {
    throw new ReleaseError("Confirm Workers Free and the absence of custom routes before deploying.");
  }
  if (before.workersDev || before.previews) {
    throw new ReleaseError("Close the existing workers.dev and preview URLs before deploying the pilot.");
  }
  deploy(env);
  const after = await inspectWorker(env, request);
  if (after.workersDev || after.previews || (before.pilotSecret && !after.pilotSecret) ||
      [...before.secretNames].some(name => !after.secretNames.has(name))) {
    throw new ReleaseError("The deployed Worker does not match the expected closed URLs and Secret state. Inspect it before retrying.");
  }
  report("Closed deployment verified. Existing Secret names are retained.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await release(process.env.WORKFLOW_OPERATION, process.env, JSON.parse(readFileSync(configFile, "utf8")));
  } catch (error) {
    // Cloudflare payloads, subprocess output and unexpected exception details stay out of Actions logs.
    const message = error instanceof ReleaseError ? error.message :
      "Unexpected release error. Check the tracked configuration and deployment history.";
    console.error(message);
    process.exitCode = 1;
  }
}
