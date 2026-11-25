import { DurableObject } from "cloudflare:workers";
import { createHandler } from "./handler.js";
import { checkGeneration, checkProvider, generate } from "./gemini.js";
import { finishQuota, getLimits, reserveQuota } from "./limits.js";

export class PilotQuota extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.storage = ctx.storage;
    this.sql = ctx.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS quota (id INTEGER PRIMARY KEY, state TEXT NOT NULL)");
  }

  readState() {
    const row = this.sql.exec("SELECT state FROM quota WHERE id = 1").toArray()[0];
    return row ? JSON.parse(row.state) : null;
  }

  writeState(state) {
    this.sql.exec("INSERT OR REPLACE INTO quota VALUES (1, ?)", JSON.stringify(state));
  }

  async ask(input, cost) {
    const limits = getLimits(this.env);
    if (!limits || !this.env.GEMINI_API_KEY) return { kind: "disabled" };

    const id = crypto.randomUUID();
    const reservation = this.storage.transactionSync(() => {
      const result = reserveQuota(this.readState(), Date.now(), limits, cost, id);
      if (result.kind === "reserved") this.writeState(result.state);
      return result;
    });
    if (reservation.kind !== "reserved") return { kind: reservation.kind };

    let result = { kind: "unavailable" };
    try {
      result = await generate(input, this.env.GEMINI_API_KEY, limits.model);
    } catch (error) {
      const diagnostic = error?.name === "TimeoutError" || error?.name === "AbortError" ? "GEMINI_TIMEOUT" :
        error instanceof SyntaxError ? "GEMINI_JSON" : "GEMINI_TRANSPORT";
      result = { kind: "unavailable", diagnostic };
    } finally {
      this.storage.transactionSync(() => {
        this.writeState(finishQuota(this.readState(), Date.now(), id, result.kind === "limit"));
      });
    }
    return result.kind === "limit" ? { kind: "daily_limit" } : result;
  }

  async checkProvider() {
    const limits = getLimits(this.env);
    if (!limits || !this.env.GEMINI_API_KEY) return { kind: "disabled" };
    try {
      return await checkProvider(this.env.GEMINI_API_KEY, limits.model);
    } catch (error) {
      const diagnostic = error?.name === "TimeoutError" || error?.name === "AbortError" ?
        "GEMINI_TIMEOUT" : "GEMINI_TRANSPORT";
      return { kind: "unavailable", diagnostic };
    }
  }

  async checkGeneration() {
    const limits = getLimits(this.env);
    if (!limits || !this.env.GEMINI_API_KEY) return { kind: "disabled" };
    const id = crypto.randomUUID();
    const reservation = this.storage.transactionSync(() => {
      const result = reserveQuota(this.readState(), Date.now(), limits, 128, id);
      if (result.kind === "reserved") this.writeState(result.state);
      return result;
    });
    if (reservation.kind !== "reserved") return { kind: reservation.kind };
    let result;
    try {
      result = await checkGeneration(this.env.GEMINI_API_KEY, limits.model);
    } catch (error) {
      const diagnostic = error?.name === "TimeoutError" || error?.name === "AbortError" ?
        "GEMINI_TIMEOUT" : "GEMINI_TRANSPORT";
      result = { kind: "unavailable", diagnostic };
    } finally {
      this.storage.transactionSync(() => {
        this.writeState(finishQuota(this.readState(), Date.now(), id, result?.kind === "limit"));
      });
    }
    return result?.kind === "limit" ? { kind: "daily_limit" } : result;
  }
}

export default { fetch: createHandler() };
