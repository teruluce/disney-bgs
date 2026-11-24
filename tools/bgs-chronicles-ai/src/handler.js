import { timingSafeEqual } from "node:crypto";
import ui from "../.generated/ui.js";
import { buildPrompt, groundedAnswer, MAX_QUESTION } from "./gemini.js";
import { getLimits } from "./limits.js";
import { retrieve } from "./search.js";

const MAX_BODY_BYTES = 4096;
const encoder = new TextEncoder();
const TOKEN = /^[!-~]{20,64}$/;
const DEFAULT_HEADERS = {
  "cache-control": "no-store",
  "content-security-policy": "default-src 'none'; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  "referrer-policy": "no-referrer",
  "strict-transport-security": "max-age=31536000",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "x-robots-tag": "noindex, nofollow, noarchive",
};
const STATUS = {
  answer: 200, unknown: 200, disabled: 503, unavailable: 503,
  daily_limit: 429, minute_limit: 429, busy: 429, invalid: 400,
  denied: 403, method: 405, too_large: 413, sensitive: 400, restricted: 400,
};

function json(result, challenge = false) {
  const headers = { ...DEFAULT_HEADERS };
  if (challenge) {
    headers["www-authenticate"] = 'Basic realm="BGS Chronicles private trial", charset="UTF-8"';
    return Response.json(result, { status: 401, headers });
  }
  if (result.kind === "minute_limit") headers["retry-after"] = "60";
  if (result.kind === "busy") headers["retry-after"] = "30";
  return Response.json(result, { status: STATUS[result.kind], headers });
}

function authorized(request, secret) {
  const authorization = request.headers.get("authorization") ?? "";
  if (authorization.length > 128) return false;
  const encoded = /^Basic ([A-Za-z0-9+/]+=*)$/i.exec(authorization)?.[1];
  if (!encoded) return false;
  try {
    const credentials = atob(encoded);
    const token = credentials.slice("editor:".length);
    return credentials.startsWith("editor:") && TOKEN.test(token) && token.length === secret.length &&
      timingSafeEqual(encoder.encode(token), encoder.encode(secret));
  } catch {
    return false;
  }
}

async function readQuestion(request) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (declaredLength > MAX_BODY_BYTES) return { kind: "too_large" };
  if (!request.body) return { kind: "invalid" };

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let body = "";
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return { kind: "too_large" };
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const data = JSON.parse(body);
    if (!data || typeof data.question !== "string" || !["ja", "en"].includes(data.language)) {
      return { kind: "invalid" };
    }
    const question = data.question.trim().normalize("NFKC").replace(/\s+/gu, " ");
    if (!question || /\p{C}/u.test(question)) return { kind: "invalid" };
    if ([...question].length > MAX_QUESTION) return { kind: "too_large" };
    if (/\b[^\s@]+@[^\s@]+\.[^\s@]+\b|https?:\/\/|\bwww\.|\b(?:\+?81[- .]?)?0\d{1,4}[- .]\d{1,4}[- .]\d{3,4}\b|\bAIza[\w-]{30,}|\bAQ\.[\w-]{25,}/iu.test(question)) {
      return { kind: "sensitive" };
    }
    if (/(?:reveal|print|show|expose|repeat|ignore).{0,40}(?:system prompt|previous instructions|api key)|システムプロンプト|前の指示.{0,12}無視|APIキー.{0,12}(?:教え|表示|出力)/iu.test(question)) {
      return { kind: "restricted" };
    }
    return { question, language: data.language };
  } catch {
    return { kind: "invalid" };
  } finally {
    reader.releaseLock();
  }
}

async function ask(request, env, url) {
  if (request.method !== "POST") return json({ kind: "method" });
  if (request.headers.get("origin") !== url.origin) return json({ kind: "denied" });
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) {
    return json({ kind: "invalid" });
  }
  const limits = getLimits(env);
  if (!limits) return json({ kind: "disabled" });
  const query = await readQuestion(request);
  if (query.kind) return json(query);

  const passages = retrieve(query.question);
  if (!passages.length) return json({ kind: "unknown" });
  const prompt = buildPrompt(query.question, query.language, passages, limits.tpm, limits.tpd);
  if (!prompt) return json({ kind: "disabled" });
  const result = await env.QUOTA.getByName("gemini-project").ask(prompt.input, prompt.cost);
  return json(groundedAnswer(result, prompt.selected, query.language));
}

const pages = {
  "/": ["page.html.in", "text/html; charset=utf-8"],
  "/pilot.css": ["pilot.css", "text/css; charset=utf-8"],
  "/chat.js": ["chat.js", "text/javascript; charset=utf-8"],
};

export function createHandler() {
  return async (request, env) => {
    try {
      const url = new URL(request.url);
      if (url.protocol !== "https:" || request.cf?.country !== "JP" ||
          !TOKEN.test(env.PILOT_ACCESS_TOKEN ?? "")) {
        return json({ kind: "denied" });
      }
      if (!authorized(request, env.PILOT_ACCESS_TOKEN)) return json({ kind: "denied" }, true);
      if (url.pathname === "/api/question") return await ask(request, env, url);
      if (request.method !== "GET" && request.method !== "HEAD") return json({ kind: "method" });
      if (url.pathname === "/robots.txt") {
        return new Response(request.method === "HEAD" ? null : "User-agent: *\nDisallow: /\n", {
          headers: { ...DEFAULT_HEADERS, "content-type": "text/plain; charset=utf-8" },
        });
      }
      if (!Object.hasOwn(pages, url.pathname)) return new Response(null, { status: 404, headers: DEFAULT_HEADERS });
      const [name, type] = pages[url.pathname];
      return new Response(request.method === "HEAD" ? null : ui[name], {
        headers: { ...DEFAULT_HEADERS, "content-type": type },
      });
    } catch {
      return json({ kind: "unavailable", diagnostic: "WORKER_INTERNAL" });
    }
  };
}
