import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { release, validateClosedConfig } from "../cloudflare-release.mjs";

const config = JSON.parse(readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"));
const env = {
  CLOUDFLARE_ACCOUNT_ID: "a".repeat(32),
  CLOUDFLARE_API_TOKEN: "token-fixture",
  CLOSED_FREE_CONFIRMED: "true",
};
const gemini = { name: "GEMINI_API_KEY", type: "secret_text", text: "untrusted-fixture-secret" };
const privateLogin = { name: "PILOT_ACCESS_TOKEN", type: "secret_text" };

function fixture(states) {
  const writes = [];
  const reports = [];
  const requests = [];
  let phase = 0;
  return {
    writes, reports, requests,
    async request(url, options) {
      const state = states[phase];
      if (new URL(url).hostname === "bgs-chronicles-ai.example.workers.dev") {
        assert.equal(options.headers, undefined);
        return Response.json({ kind: "denied" }, { status: state.anonymous ?? 401 });
      }
      assert.equal(new URL(url).hostname, "api.cloudflare.com");
      assert.equal(options.method, "GET");
      assert.equal(options.headers.authorization, "Bearer token-fixture");
      assert.equal(options.redirect, "error");
      requests.push(new URL(url).pathname);
      if (url.endsWith("/workers/subdomain")) return Response.json({ success: true, result: { subdomain: "example" } });
      assert.match(new URL(url).pathname, /\/workers\/scripts\/bgs-chronicles-ai\//);
      if (state.status) {
        return Response.json({ errors: [{ message: "untrusted-fixture-secret" }] }, { status: state.status });
      }
      const result = url.endsWith("/secrets") ? state.secrets : { enabled: state.enabled, previews_enabled: state.previews ?? false };
      return Response.json({ success: true, result });
    },
    deploy(_env, target) {
      if (target) {
        const trial = JSON.parse(readFileSync(target, "utf8"));
        assert.deepEqual(trial, { ...config, workers_dev: true,
          secrets: { required: ["GEMINI_API_KEY", "PILOT_ACCESS_TOKEN"] } });
      }
      writes.push(target ? "open" : "deploy");
      phase++;
    },
    report(message) { reports.push(message); },
  };
}

test("the checked deployment config is closed and limited to the named Worker and SQLite", () => {
  validateClosedConfig(config);
  for (const unsafe of [
    { ...config, name: "other-worker" },
    { ...config, workers_dev: true },
    { ...config, preview_urls: true },
    { ...config, routes: [{ pattern: "example.invalid/*" }] },
    { ...config, vars: { ...config.vars, PILOT_ENABLED: "true" } },
    { ...config, vars: { ...config.vars, FREE_TIER_VERIFIED: "true" } },
    { ...config, vars: { ...config.vars, OTHER_BINDING: "value" } },
    { ...config, ai: { binding: "AI" } },
    { ...config, migrations: [{ tag: "bgs-ai-quota-v1", new_classes: ["PilotQuota"] }] },
  ]) {
    assert.throws(() => validateClosedConfig(unsafe), /outside the closed Workers Free deployment/);
  }
});

test("preflight authenticates with GETs and reports known Secret metadata without payloads", async () => {
  const deps = fixture([{ secrets: [gemini], enabled: true }]);
  await release("preflight", env, config, deps);
  assert.deepEqual(deps.writes, []);
  assert.equal(deps.requests.length, 2);
  assert.match(deps.reports.join("\n"), /GEMINI_API_KEY text Secret verified/);
  assert.match(deps.reports.join("\n"), /PILOT_ACCESS_TOKEN text Secret: missing/);
  assert.ok(!deps.reports.join("\n").includes(gemini.text));
});

test("missing credentials, insufficient permissions and absent Worker prevent deployment", async () => {
  const deps = fixture([{ status: 403 }]);
  await assert.rejects(release("deploy", { ...env, CLOUDFLARE_API_TOKEN: "" }, config, deps), /missing or malformed/);
  assert.equal(deps.requests.length, 0);
  await assert.rejects(release("deploy", env, config, deps), {
    message: "Worker Secret metadata: HTTP 403. Check token expiry and Workers access in the target account.",
  });
  assert.deepEqual(deps.reports, []);
  assert.deepEqual(deps.writes, []);

  for (const [remote, message] of [
    [{ status: 404 }, /named Worker exists/],
    [{ status: 503 }, /HTTP 503/],
    [{ secrets: [{ ...gemini, type: "plain_text" }] }, /missing the GEMINI_API_KEY text Secret/],
  ]) {
    const failure = fixture([remote]);
    await assert.rejects(release("deploy", env, config, failure), message);
    assert.deepEqual(failure.writes, []);
  }
});

test("a closed deployment needs explicit confirmation and closed existing URLs", async () => {
  const closed = { secrets: [gemini, privateLogin], enabled: false };
  const deps = fixture([closed]);
  await assert.rejects(release("deploy", { ...env, CLOSED_FREE_CONFIRMED: "false" }, config, deps), /Confirm Workers Free/);
  assert.deepEqual(deps.writes, []);
  for (const urls of [{ enabled: true }, { previews: true }]) {
    const open = fixture([{ ...closed, ...urls }]);
    await assert.rejects(release("deploy", env, config, open), /Close the existing/);
    assert.deepEqual(open.writes, []);
  }
});

test("a closed deployment checks route state and retention of all existing Secret names", async () => {
  const closed = { secrets: [gemini, privateLogin, { name: "EXISTING", type: "secret_text" }], enabled: false };
  const success = fixture([closed, closed]);
  await release("deploy", env, config, success);
  assert.deepEqual(success.writes, ["deploy"]);
  assert.equal(success.requests.length, 4);
  assert.match(success.reports.at(-1), /Existing Secret names are retained/);

  const missing = fixture([closed, { secrets: [gemini, privateLogin], enabled: false }]);
  await assert.rejects(release("deploy", env, config, missing), /expected closed URLs and Secret state/);
  assert.deepEqual(missing.writes, ["deploy"]);
});

test("private URL requires login Secret, keeps inference off, and closes on an anonymous probe failure", async () => {
  const closed = { secrets: [gemini, privateLogin], enabled: false };
  const opened = { ...closed, enabled: true };
  const missing = fixture([{ ...closed, secrets: [gemini] }]);
  await assert.rejects(release("open-private", env, config, missing), /login Secret/);
  assert.deepEqual(missing.writes, []);
  const ok = fixture([closed, opened]);
  await release("open-private", env, config, ok);
  assert.deepEqual(ok.writes, ["open"]);
  const failure = fixture([closed, { ...opened, anonymous: 200 }, closed]);
  await assert.rejects(release("open-private", env, config, failure), /was closed/);
  assert.deepEqual(failure.writes, ["open", "deploy"]);
  const stop = fixture([opened, closed]);
  await release("close-private", env, config, stop);
  assert.deepEqual(stop.writes, ["deploy"]);
});
