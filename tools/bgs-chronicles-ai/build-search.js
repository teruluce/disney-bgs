import { writeFileSync } from "node:fs";
import articles from "./.generated/passages.js";
import { concepts, terms } from "./src/terms.js";

const postings = Object.create(null);
const passages = [];
const titles = [];
for (const {path, title, english, records} of articles) {
  const article = titles.length;
  titles.push({ path, title, english });
  for (const record of records) {
    const id = passages.length;
    passages.push({ ...record, article });
    const heading = new Set([...terms(record.heading), ...concepts(record.heading)]);
    const text = new Set([...terms(record.text), ...concepts(record.text)]);
    for (const token of new Set([...heading, ...text])) {
      const weight = text.has(token) ? 2 : 1;
      (postings[token] ??= []).push(id * 3 + weight);
    }
  }
}

// Drop very common terms to keep search work bounded within Workers Free CPU.
for (const token of Object.keys(postings)) {
  if (postings[token].length > 320) delete postings[token];
}

writeFileSync(new URL("./.generated/index.js", import.meta.url),
  "export default " + JSON.stringify({ titles, passages, postings }) + ";\n");
