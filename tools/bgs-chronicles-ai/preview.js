// Local design preview. This file is outside the Wrangler bundle.
import { createServer } from "node:http";
import { Readable } from "node:stream";
import { setTimeout } from "node:timers/promises";
import { createHandler } from "./src/handler.js";
import { DEFAULT_MODEL } from "./src/gemini.js";

const port = Number(process.env.PORT ?? 8789);
const origin = `http://127.0.0.1:${port}`;
const fixtureOrigin = origin.replace("http:", "https:");
const handler = createHandler();
const token = "f".repeat(64);
const env = {
  PILOT_ACCESS_TOKEN: token,
  PILOT_ENABLED: "true", FREE_TIER_VERIFIED: "true", AI_STUDIO_VERIFIED_MODEL: DEFAULT_MODEL,
  AI_STUDIO_RPM: "1", AI_STUDIO_RPD: "1", AI_STUDIO_TPM: "10000",
  QUOTA: {
    getByName() {
      return {
        async ask(input) {
          await setTimeout(350);
          const { question, evidence, language } = JSON.parse(input);
          const samples = [
            {
              questions: ["ホテル・ハイタワーの見学ツアーはいつ始まりましたか?", "When did the Hotel Hightower tour begin?"],
              text: "1912年 ニューヨーク市保存協会により、ホテル内の見学ツアーが始まる。",
              english: "The New York City Preservation Society began offering tours of the hotel in 1912.",
            },
            {
              questions: ["レイジングスピリッツで神々が怒ったのはなぜですか?", "Why did the gods get angry at Raging Spirits?"],
              text: "石像は互いを見つめ合うように立てられ、神々の怒りが爆発したのです。",
              english: "The statues were placed facing one another, and the gods erupted in anger.",
            },
          ];
          const sample = samples.find(item => item.questions.includes(question));
          const passage = evidence.find(item => item.text === sample?.text);
          const selections = passage ? [{ id: passage.id, translation: language === "en" ? sample.english : "" }] : [];
          return { kind: "selection", data: { selections } };
        },
      };
    },
  },
};

createServer(async (incoming, outgoing) => {
  if (incoming.headers.host !== `127.0.0.1:${port}`) {
    outgoing.writeHead(403).end();
    return;
  }
  const headers = new Headers(incoming.headers);
  headers.set("authorization", "Basic " + btoa("editor:" + token));
  if (headers.get("origin") === origin) headers.set("origin", fixtureOrigin);
  const request = new Request(fixtureOrigin + incoming.url, {
    method: incoming.method, headers,
    ...(incoming.method === "POST" ? { body: Readable.toWeb(incoming), duplex: "half" } : {}),
  });
  Object.defineProperty(request, "cf", { value: { country: "JP" } });
  const response = await handler(request, env);
  outgoing.writeHead(response.status, Object.fromEntries(response.headers));
  if (!response.body) outgoing.end();
  else if (incoming.url === "/") {
    outgoing.end((await response.text()).replace("<body>", "<body data-local-preview>"));
  } else Readable.fromWeb(response.body).pipe(outgoing);
}).listen(port, "127.0.0.1", () => console.log(`Local fixture preview: ${origin}`));
