import { DEFAULT_MODEL, isSupportedModel, MAX_OUTPUT_TOKENS } from "./gemini.js";

const pacific = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit",
});
const MINUTE = 60000;
const LEASE_TIME = 30000;

function positive(value) {
  if (!/^[1-9][0-9]*$/.test(value ?? "")) return 0;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : 0;
}

export function getLimits(env) {
  if (env.PILOT_ENABLED !== "true" || env.FREE_TIER_VERIFIED !== "true") return null;
  const model = env.GEMINI_MODEL ?? DEFAULT_MODEL;
  if (!isSupportedModel(model) || env.AI_STUDIO_VERIFIED_MODEL !== model) return null;
  const rpm = Math.min(3, positive(env.AI_STUDIO_RPM));
  const rpd = Math.min(20, positive(env.AI_STUDIO_RPD));
  const tpm = positive(env.AI_STUDIO_TPM);
  const tpd = positive(env.AI_STUDIO_TPD);
  if (!rpm || !rpd || !tpm || (env.AI_STUDIO_TPD && !tpd)) return null;
  return { model, rpm, rpd, tpm, tpd: tpd || null };
}

export function pacificDay(now) {
  return pacific.format(now);
}

export function reserveQuota(previous, now, limits, cost, id) {
  const day = pacificDay(now);
  const current = previous ?? { recent: [] };
  const sameDay = current.day === day;
  const callsToday = sameDay ? current.callsToday : 0;
  const tokensToday = sameDay ? current.tokensToday : 0;
  const dailyCost = cost + MAX_OUTPUT_TOKENS;
  const recent = current.recent.filter(entry => entry.time > now - MINUTE);
  const recentTokens = recent.reduce((sum, entry) => sum + entry.cost, 0);
  if (current.blockedDay === day || callsToday >= limits.rpd ||
      (limits.tpd && tokensToday + dailyCost > limits.tpd)) {
    return { kind: "daily_limit" };
  }
  if (recent.length >= limits.rpm || recentTokens + cost > limits.tpm) {
    return { kind: "minute_limit" };
  }
  if (current.lease?.expires > now) return { kind: "busy" };
  return {
    kind: "reserved",
    state: {
      day, callsToday: callsToday + 1, tokensToday: tokensToday + dailyCost,
      recent: [...recent, { time: now, cost }],
      lease: { id, expires: now + LEASE_TIME },
    },
  };
}

export function finishQuota(state, now, id, limited) {
  if (state.lease?.id === id) delete state.lease;
  if (limited) state.blockedDay = pacificDay(now);
  return state;
}
