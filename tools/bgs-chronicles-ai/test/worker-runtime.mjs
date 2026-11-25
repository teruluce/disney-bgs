import assert from "node:assert/strict";
import test from "node:test";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";

for (const model of ["gemini-3.1-flash-lite", "gemini-3.8-flash"]) {
  test(`the bundled Worker authenticates and persists a quota stop for ${model}`, async () => {
    const origin = "https://pilot.example.invalid";
    const token = model === "gemini-3.8-flash" ? ["sample", "TEST12", "abcDEF"].join("-") : "f".repeat(64);
    const fakeKey = "runtime-fixture";
    const authorization = "Basic " + btoa("editor:" + token);
    const bindings = {
      PILOT_ACCESS_TOKEN: token,
      PILOT_ENABLED: "true", FREE_TIER_VERIFIED: "true",
      GEMINI_MODEL: model, AI_STUDIO_VERIFIED_MODEL: model,
      GEMINI_API_KEY: fakeKey, AI_STUDIO_RPM: "3", AI_STUDIO_RPD: "20", AI_STUDIO_TPM: "40000",
    };
    const seen = [];
    const worker = new Miniflare(convertV4MiniflareOptions({
      cf: { country: "JP" },
      workers: [{
        name: "bgs-chronicles-ai",
        modules: true,
        scriptPath: ".generated/bundle/worker.js",
        compatibilityDate: "2026-11-24",
        compatibilityFlags: ["nodejs_compat"],
        durableObjects: { QUOTA: { className: "PilotQuota", useSQLite: true } },
        bindings,
        outboundService: async request => {
          // This hook is the entire outbound network for the test Worker.
          if (request.method === "GET") {
            seen.push({
              host: new URL(request.url).hostname,
              path: new URL(request.url).pathname,
              keyMatches: request.headers.get("x-goog-api-key") === fakeKey,
              forwardedAuth: request.headers.has("authorization"),
            });
            return Response.json({ name: `models/${model}` });
          }
          const body = await request.json();
          const { evidence } = JSON.parse(body.contents[0].parts[0].text);
          seen.push({
            host: new URL(request.url).hostname,
            path: new URL(request.url).pathname,
            keyMatches: request.headers.get("x-goog-api-key") === fakeKey,
            forwardedAuth: request.headers.has("authorization"),
          });
          if (seen.filter(item => item.path.endsWith(":generateContent")).length > 1) {
            return new Response("Fixture quota exhausted", { status: 429 });
          }
          const selected = evidence.find(item => item.type === "official");
          const text = JSON.stringify({
            selections: [{ id: selected.id, translation: "Hotel tours began in 1912." }],
          });
          return Response.json({ candidates: [{ finishReason: "STOP", content: { parts: [{ text }] } }] });
        },
      }],
    }));
    try {
      const denied = await worker.dispatchFetch(origin + "/chat.js");
      assert.equal(denied.status, 401);
      const page = await worker.dispatchFetch(origin + "/", { headers: { authorization } });
      assert.equal(page.status, 200);
      assert.match(await page.text(), /資料室（仮称）/);

      const provider = await worker.dispatchFetch(origin + "/api/provider-check", { headers: { authorization } });
      assert.equal(provider.status, 200);
      assert.deepEqual(await provider.json(), { kind: "provider_ok", model });

      const ask = () => worker.dispatchFetch(origin + "/api/question", {
        method: "POST", headers: { authorization, origin, "content-type": "application/json" },
        body: JSON.stringify({ question: "When did the Hotel Hightower tour begin?", language: "en" }),
      });
      const first = await ask();
      assert.equal(first.status, 200);
      const result = await first.json();
      assert.equal(result.answer[0].text, "Hotel tours began in 1912.");
      assert.equal(result.answer[0].source.url, "https://teruluce.github.io/disney-bgs/bgs-tot.html#prologue");

      for (let i = 0; i < 2; i++) {
        const rejected = await ask();
        assert.equal(rejected.status, 429);
        assert.deepEqual(await rejected.json(), { kind: "daily_limit" });
      }
      assert.deepEqual(seen, [{
        host: "generativelanguage.googleapis.com", path: `/v1beta/models/${model}`,
        keyMatches: true, forwardedAuth: false,
      }, ...Array(2).fill({
        host: "generativelanguage.googleapis.com", path: `/v1beta/models/${model}:generateContent`,
        keyMatches: true, forwardedAuth: false,
      })]);
    } finally {
      await worker.dispose();
    }
  });
}
