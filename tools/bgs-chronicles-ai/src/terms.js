const stop = new Set((
  "a an and are about as at be been by can could did do does for from had has have how i in is it its me of on " +
  "or please tell than that the their them there these they this to was were what when where which who why will with would you your " +
  "について 教えて ください ですか 場所 所は 名前 名は"
).split(" "));

const aliases = [
  ["tower of terror", "hotel hightower", "タワーオブテラー", "タワー・オブ・テラー", "ホテルハイタワー", "ホテル・ハイタワー"],
  ["hightower", "harrison hightower", "ハイタワー"],
  ["shirki utundu", "shiriki utundu", "シリキ・ウトゥンドゥ"],
  ["smelding", "アーチボルト", "スメルディング"],
  ["disappear", "disappeared", "disappearance", "vanished", "missing", "失踪", "行方不明", "姿を消"],
  ["hotel tour", "tour", "preservation society", "見学ツアー", "ニューヨーク市保存協会"],
  ["raging spirits", "レイジングスピリッツ", "レイジング・スピリッツ"],
  ["angry gods", "gods", "god", "神々", "石像"],
  ["twisted", "twist", "twists", "twisting", "ねじれ", "捻じ曲"],
  ["rail", "rails", "track", "tracks", "レール"],
  ["loop", "360 degrees", "360度", "ループ", "一回転"],
  ["american waterfront", "アメリカンウォーターフロント"],
  ["cape cod", "ケープコッド"], ["new york", "ニューヨーク"],
  ["mira costa", "miracosta", "ミラコスタ"],
  ["soaring", "soarin", "fantastic flight", "ソアリン", "ファンタスティック・フライト"],
  ["camellia falco", "カメリア・ファルコ"],
  ["society of explorers and adventurers", "s e a", "探検家・冒険家学会", "冒険家学会"],
  ["fantasy springs", "ファンタジースプリングス"], ["magic spring", "魔法の泉"],
  ["sindbad", "sinbad", "シンドバッド"], ["chandu", "チャンドゥ"],
  ["mysterious island", "ミステリアスアイランド"], ["captain nemo", "ネモ船長"],
  ["port discovery", "ポートディスカバリー"], ["stormrider", "ストームライダー"],
  ["indiana jones", "インディ・ジョーンズ", "インディジョーンズ"], ["crystal skull", "クリスタルスカル"],
  ["disneysea", "ディズニーシー"], ["disneyland", "ディズニーランド"],
  ["world bazaar", "ワールドバザール"], ["cinderella castle", "シンデレラ城"],
  ["big thunder mountain", "ビッグサンダー・マウンテン", "ビッグサンダーマウンテン"],
  ["splash mountain", "スプラッシュ・マウンテン", "スプラッシュマウンテン"],
  ["haunted mansion", "ホーンテッドマンション"],
  ["small world", "スモールワールド"], ["mary blair", "メアリー・ブレア"],
  ["beauty and the beast", "美女と野獣"], ["beast", "野獣"], ["belle", "ベル"],
  ["prince adam", "adam", "アダム"], ["curse", "cursed", "呪い"], ["age", "old", "歳", "年齢"],
  ["tomorrowland", "トゥモローランド"], ["space mountain", "スペース・マウンテン", "スペースマウンテン"],
  ["electrical parade", "エレクトリカルパレード", "エレクトリカル・パレード"],
  ["opened", "opening", "began", "begin", "started", "開園", "開業", "始ま"], ["origin", "origins", "誕生", "由来"],
  ["created", "creator", "designer", "designed", "制作", "設計"],
  ["theories", "theory", "interpretation", "考察", "見方"], ["canon", "official", "公式設定"],
];

export function normalize(text) {
  return text.normalize("NFKC").toLowerCase().replace(/[’']/g, "").replace(/\bs\.e\.a\.?\b/g, "s e a");
}

export function terms(text) {
  const chunks = normalize(text).match(/[a-z0-9]+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]+/gu) ?? [];
  const tokens = new Set();
  for (const chunk of chunks) {
    if (stop.has(chunk)) continue;
    if (/^[a-z0-9]+$/.test(chunk)) {
      if (chunk.length >= 2) tokens.add(chunk);
      continue;
    }
    const characters = [...chunk];
    for (let i = 0; i + 1 < characters.length; i++) {
      const pair = characters[i] + characters[i + 1];
      if (!/^\p{Script=Hiragana}{2}$/u.test(pair)) tokens.add(pair);
    }
  }
  return [...tokens];
}

// A set of synonyms contributes at most once, even when several spellings match.
export function conceptTerms(concept) {
  return terms(aliases[Number(concept.slice(1))].join(" "));
}

export function concepts(text) {
  const normalized = normalize(text);
  const latin = " " + normalized.replace(/[^a-z0-9]+/g, " ").trim() + " ";
  return aliases.flatMap((group, index) => group.some(phrase => /[a-z]/.test(phrase)
    ? latin.includes(" " + phrase + " ")
    : normalized.includes(phrase)) ? ["@" + index] : []);
}
