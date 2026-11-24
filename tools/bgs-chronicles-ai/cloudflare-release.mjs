import { spawnSync } from "node:child_process";
import { publicEncrypt, createPublicKey } from "node:crypto";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
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
  const disabledVars = { PILOT_ENABLED: "false", FREE_TIER_VERIFIED: "false", GEMINI_MODEL: model,
    AI_STUDIO_RPM: "5", AI_STUDIO_TPM: "250000", AI_STUDIO_RPD: "20" };
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

function runWrangler(env, target = configFile) {
  const cli = fileURLToPath(new URL("./node_modules/wrangler/bin/wrangler.js", import.meta.url));
  const result = spawnSync(process.execPath, [cli, "deploy", "--config", fileURLToPath(target)], {
    cwd: fileURLToPath(new URL(".", import.meta.url)),
    env: { ...env, CI: "true", WRANGLER_SEND_METRICS: "false", WRANGLER_WRITE_LOGS: "false" },
    stdio: "ignore",
  });
  if (result.status !== 0) {
    throw new ReleaseError("Wrangler deploy did not complete. Check the Worker deployment history and token write permission before retrying.");
  }
}

async function verifyDenial(origin, path, request, pause) {
  let reason = "network error";
  for (let attempt = 0; attempt < 6; attempt++) {
    if (attempt) await pause(5000);
    try {
      const response = await request(origin + path, {
        headers: { "user-agent": "BGS-Chronicles-Operator-Check/1.0", accept: "application/json" },
        method: path === "/api/question" ? "POST" : "GET", redirect: "error", signal: AbortSignal.timeout(8000),
      });
      reason = `HTTP ${response.status}`;
      if (response.status === 401 || response.status === 403) {
        const body = await response.json().catch(() => null);
        if (body?.kind === "denied") return;
        reason += " without Worker denial";
      }
      if (response.ok) break;
    } catch {
      reason = "network error";
    }
  }
  throw new ReleaseError(`Anonymous check for ${path} failed (${reason}).`);
}

export async function release(operation, env, config, {
  request = fetch, deploy = runWrangler, report = console.log,
  pause = ms => new Promise(resolve => setTimeout(resolve, ms)),
} = {}) {
  if (!["preflight", "deploy", "open-private", "enable-inference", "close-private"].includes(operation)) throw new ReleaseError("Unknown workflow operation.");
  validateClosedConfig(config);

  const before = await inspectWorker(env, request);
  report("Cloudflare authentication, existing Worker and GEMINI_API_KEY text Secret verified.");
  report(`PILOT_ACCESS_TOKEN text Secret: ${before.pilotSecret ? "present" : "missing"}.`);
  report(`workers.dev: ${before.workersDev ? "enabled" : "disabled"} / preview URLs: ${before.previews ? "enabled" : "disabled"}.`);
  if (operation === "preflight") return;

  if (env.CLOSED_FREE_CONFIRMED !== "true") {
    throw new ReleaseError("Confirm Workers Free and the absence of custom routes before deploying.");
  }
  const inference = operation === "enable-inference";
  const opening = operation === "open-private" || inference;
  if (inference && (!before.workersDev || env.GEMINI_FREE_CONFIRMED !== "true" ||
      config.vars.GEMINI_MODEL !== "gemini-3.8-flash")) {
    throw new ReleaseError("Confirm the key project, unlinked billing, 3.8 Flash quota and existing private URL.");
  }
  if (opening && !before.pilotSecret) throw new ReleaseError("Private login Secret is required.");
  if ((before.workersDev && operation === "deploy") || before.previews) {
    throw new ReleaseError("Close the existing workers.dev and preview URLs before deploying the pilot.");
  }
  let origin;
  let deliveryKey;
  if (opening) {
    const account = env.CLOUDFLARE_ACCOUNT_ID;
    const data = await readCloudflare(`https://api.cloudflare.com/client/v4/accounts/${account}/workers/subdomain`,
      env.CLOUDFLARE_API_TOKEN, "Account workers.dev subdomain", request);
    if (typeof data.subdomain !== "string" || !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(data.subdomain)) {
      throw new ReleaseError("Unexpected workers.dev subdomain.");
    }
    origin = `https://${workerName}.${data.subdomain}.workers.dev`;
    if (inference) {
      for (const path of ["/", "/api/question"]) await verifyDenial(origin, path, request, pause);
    }
    if (env.URL_PUBLIC_KEY) {
      deliveryKey = createPublicKey({ key: Buffer.from(env.URL_PUBLIC_KEY, "base64"), type: "spki", format: "der" });
      if (deliveryKey.asymmetricKeyType !== "rsa" || deliveryKey.asymmetricKeyDetails.modulusLength < 2048) {
        throw new ReleaseError("URL delivery requires an RSA public key of at least 2048 bits.");
      }
    }
    const target = new URL("./wrangler.trial.json", import.meta.url);
    writeFileSync(target, JSON.stringify({ ...config, workers_dev: true,
      vars: inference ? { ...config.vars, PILOT_ENABLED: "true", FREE_TIER_VERIFIED: "true",
        AI_STUDIO_VERIFIED_MODEL: config.vars.GEMINI_MODEL } : config.vars,
      secrets: { required: [requiredSecret, "PILOT_ACCESS_TOKEN"] } }), { flag: "wx" });
    try { deploy(env, target); } finally { unlinkSync(target); }
  } else {
    deploy(env);
  }
  try {
    const after = await inspectWorker(env, request);
    if (after.workersDev !== opening || after.previews || (before.pilotSecret && !after.pilotSecret) ||
        [...before.secretNames].some(name => !after.secretNames.has(name))) {
      throw new ReleaseError("The deployed Worker does not match the expected closed URLs and Secret state. Inspect it before retrying.");
    }
    if (opening) {
      for (const path of ["/", "/pilot.css", "/chat.js", "/api/question"]) {
        await verifyDenial(origin, path, request, pause);
      }
    }
  } catch (error) {
    if (!opening) throw error;
    if (error instanceof ReleaseError) report(error.message);
    deploy(env);
    const closed = await inspectWorker(env, request);
    if (closed.workersDev || closed.previews) throw new ReleaseError("Urgent: check failed and closure is unverified.");
    throw new ReleaseError("Private URL verification failed. The private URL was closed.");
  }
  if (opening) {
    report(`Private URL verified: anonymous UI, assets and API denied. Inference ${inference ? "enabled" : "disabled"}. Existing Secrets retained.`);
    if (deliveryKey) report("Operator URL (RSA-OAEP): " +
      publicEncrypt({ key: deliveryKey, oaepHash: "sha256" }, Buffer.from(origin)).toString("base64"));
    return;
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
