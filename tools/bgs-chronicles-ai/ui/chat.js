const copy = {
  ja: {
    trial: "非公開試験", local: "ローカル試作・模擬回答", language: "表示・回答言語", title: "資料室（仮称）",
    dek: "パークに息づく物語を、記事の記録からひもとく。", question: "質問を書く",
    privacy: "質問と関連する記事の抜粋を Google Gemini に送信します。Google は無料枠の入出力をサービス改善に使うことがあります。個人情報は入力しないでください。",
    localPrivacy: "この表示確認では、質問を手元の環境で処理します。",
    ask: "質問を送る", answer: "回答", ai: "AI による回答", examples: "質問の例",
    empty: "質問を送ると、ここに回答と記事へのリンクが表示されます。",
    working: "記事を探し、回答を作成しています…",
    unknown: "掲載記事から、この質問に答えられる記録は見つかりませんでした。",
    disabled: "現在は試験利用を受け付けていません。",
    unavailable: "回答を取得できませんでした。時間をおいてもう一度お試しください。",
    daily_limit: "本日の試験利用は終了しました。米国太平洋時間の翌日午前0時以降にお試しください。",
    minute_limit: "短時間の利用上限に達しました。1分ほどお待ちください。",
    edge_limit: "試験環境の利用上限に達しました。時間をおいてお試しください。",
    busy: "別の質問への回答を作成しています。少しお待ちください。",
    invalid: "日本語または英語で質問を入力してください。",
    denied: "試験利用の認証を確認できません。ページを開き直してください。",
    too_large: "質問は500文字以内で入力してください。",
    sensitive: "連絡先や URL などを除いてから送信してください。",
    restricted: "BGS Chronicles の記事に関する質問を入力してください。",
    official: "公式設定", interpretation: "記事の考察", uncertain: "不明・未確認", record: "記事の記述",
    original: "日本語の原文", source: "参照記事", placeholder: "例：ハイタワー三世が失踪したのはいつですか？",
    samples: ["ホテル・ハイタワーの見学ツアーはいつ始まりましたか？", "レイジングスピリッツで神々が怒ったのはなぜですか？"],
  },
  en: {
    trial: "Private trial", local: "Local preview · simulated answers", language: "Display and answer language", title: "Archive Desk (working title)",
    dek: "Explore the stories of the parks through the pages of BGS Chronicles.", question: "Ask a question",
    privacy: "Your question and excerpts from relevant articles go to Google Gemini. Google may use free-tier inputs and outputs to improve its services. Leave out personal information.",
    localPrivacy: "This preview processes your question locally.",
    ask: "Send question", answer: "Answer", ai: "AI-generated answer", examples: "Example questions",
    empty: "Answers and links to the relevant articles appear here.",
    working: "Searching the archive and preparing an answer…",
    unknown: "The published articles do not provide enough evidence to answer this question.",
    disabled: "The trial is currently paused.",
    unavailable: "An answer could not be retrieved. Please try again in a moment.",
    daily_limit: "The daily trial limit has been reached. Try again after midnight Pacific time.",
    minute_limit: "The short-term limit has been reached. Please wait about a minute.",
    edge_limit: "The trial has reached a service limit. Please try again later.",
    busy: "Another answer is being prepared. Please try again shortly.",
    invalid: "Enter a question in Japanese or English.",
    denied: "Trial access could not be confirmed. Reopen the page to sign in.",
    too_large: "Keep your question within 500 characters.",
    sensitive: "Remove contact details and URLs before sending.",
    restricted: "Enter a question about the BGS Chronicles articles.",
    official: "Official story", interpretation: "Article interpretation", uncertain: "Uncertain or unknown", record: "Article record",
    original: "Original Japanese passage", source: "Source article", placeholder: "e.g. When did Hightower disappear?",
    samples: ["When did the Hotel Hightower tour begin?", "Why did the gods get angry at Raging Spirits?"],
  },
};

const form = document.querySelector("#question-form");
const field = document.querySelector("#question");
const count = document.querySelector("#count");
const language = document.querySelector("#language");
const state = document.querySelector("#state");
const result = document.querySelector("#result");
const submit = form.querySelector(".submit");
const examples = document.querySelectorAll(".example");
let status = "empty";

function message(kind) {
  status = kind;
  state.textContent = kind ? copy[language.value][kind] : "";
  state.dataset.error = String(Boolean(kind && !["empty", "working", "unknown"].includes(kind)));
}

function renderAnswer(items) {
  const words = copy[language.value];
  const entries = items.map(item => {
    const entry = document.createElement("article");
    entry.className = "entry";
    const category = document.createElement("p");
    category.className = "category";
    category.textContent = words[item.category];
    const text = document.createElement("p");
    text.className = "text";
    text.textContent = item.text;
    entry.append(category, text);

    if (item.original) {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = words.original;
      const original = document.createElement("p");
      original.lang = "ja";
      original.textContent = item.original;
      details.append(summary, original);
      entry.append(details);
    }

    const link = document.createElement("a");
    link.href = item.source.url;
    link.textContent = words.source + " · " + item.source.title;
    entry.append(link);
    return entry;
  });
  result.replaceChildren(...entries);
}

function setLanguage() {
  const code = language.value;
  const words = copy[code];
  document.documentElement.lang = code;
  document.title = words.title + " — BGS Chronicles";
  for (const element of document.querySelectorAll("[data-copy]")) {
    const key = element.dataset.copy;
    element.textContent = words[key];
  }
  if (document.body.hasAttribute("data-local-preview")) {
    document.querySelector('[data-copy="trial"]').textContent = words.local;
    document.querySelector("#usage").textContent = words.localPrivacy;
  }
  field.placeholder = words.placeholder;
  examples.forEach((button, index) => {
    button.textContent = words.samples[index];
  });
  result.replaceChildren();
  message("empty");
}

function updateCount() {
  count.textContent = field.value.length + " / 500";
  if (!submit.disabled && status === "invalid" && field.value.trim()) message("empty");
}

field.addEventListener("input", updateCount);
language.addEventListener("change", setLanguage);
examples.forEach((button, index) => button.addEventListener("click", () => {
  field.value = copy[language.value].samples[index];
  updateCount();
  field.focus();
}));

form.addEventListener("submit", async event => {
  event.preventDefault();
  if (submit.disabled) return;
  const question = field.value.trim();
  if (!question) {
    message("invalid");
    field.focus();
    return;
  }
  submit.disabled = true;
  language.disabled = true;
  result.replaceChildren();
  message("working");
  const heading = document.querySelector("#response-title");
  if (heading.getBoundingClientRect().top >= window.innerHeight) {
    heading.scrollIntoView({ block: "start" });
  }
  try {
    const response = await fetch("/api/question", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question, language: language.value }),
      signal: AbortSignal.timeout(25000),
    });
    const data = await response.json().catch(() => null);
    if (response.ok && data?.kind === "answer") {
      message("");
      renderAnswer(data.answer);
    } else if (typeof data?.kind === "string" && Object.hasOwn(copy[language.value], data.kind)) {
      message(data.kind);
    } else if (response.status === 429 || response.status === 503 && !data) {
      message("edge_limit");
    } else {
      message(response.redirected || response.status === 403 ? "denied" : "unavailable");
    }
  } catch {
    message("unavailable");
  } finally {
    submit.disabled = false;
    language.disabled = false;
  }
});

setLanguage();
