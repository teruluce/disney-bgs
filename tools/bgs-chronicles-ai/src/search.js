import index from "../.generated/index.js";
import { concepts, conceptTerms, normalize, terms } from "./terms.js";

const names = index.titles.map(article => {
  const japanese = article.title.split(/[｜（]/u)[0];
  return [article.english, japanese].map(normalize);
});
const topicConcepts = names.map(titles => concepts(titles.join(" / ")));

export function retrieve(question) {
  const scores = new Map();
  const normalized = normalize(question);
  const queryConcepts = concepts(normalized);
  const preferred = names.map((titles, id) =>
    titles.some(name => name.length >= 4 && normalized.includes(name)) ||
    topicConcepts[id].some(concept => queryConcepts.includes(concept)));
  const titleConcepts = queryConcepts.filter(concept => topicConcepts.some(list => list.includes(concept)));
  const titleTerms = new Set(titleConcepts.flatMap(conceptTerms));
  const distinctTopic = queryConcepts.length > titleConcepts.length;
  const asksWhen = /いつ|何年|何月|\b(?:when|what (?:year|date))\b/u.test(normalized);
  const matches = [...terms(normalized), ...queryConcepts]
    .filter(term => Object.hasOwn(index.postings, term))
    .sort((left, right) => index.postings[left].length - index.postings[right].length)
    .slice(0, 42);

  for (const term of matches) {
    const list = index.postings[term];
    const concept = term.startsWith("@");
    const topicWeight = distinctTopic && (titleTerms.has(term) || titleConcepts.includes(term)) ? 0.4 : 1;
    const weight = Math.log1p(index.passages.length / list.length) * (concept ? 3.3 : 1) * topicWeight;
    for (const value of list) {
      const id = Math.floor(value / 3);
      const previous = scores.get(id) ?? { score: 0, count: 0, direct: false };
      previous.score += weight * (value % 3);
      previous.count++;
      previous.direct ||= value % 3 === 2;
      scores.set(id, previous);
    }
  }

  return [...scores.entries()]
    .filter(([, score]) => score.direct && (score.count >= 2 || score.score >= 15))
    .map(([id, match]) => {
      const passage = index.passages[id];
      let score = match.score * (preferred[passage.article] ? 1.38 : 1);
      if (asksWhen && /\d{2,4}年|\d{1,2}月\d{1,2}日/u.test(passage.text)) score *= 1.25;
      if (passage.category === "official") score *= 1.12;
      return { id: String(id), ...passage, ...index.titles[passage.article], score };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 9);
}
