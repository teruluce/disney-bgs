"""Build a private Worker corpus from the tracked public article list."""
import json
from html.parser import HTMLParser
from pathlib import Path
import re

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT = HERE / ".generated"
SITE = "https://teruluce.github.io/disney-bgs/"
ARTICLE_CLASSES = {"article-block", "article", "section"}
SKIP = {"details", "nav", "script", "style", "blockquote", "figure", "dialog", "button", "template"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
BLOCKS = {"h2", "h3", "h4", "p", "li", "tr"}
INTERPRETATION = re.compile(r"考察|解釈の一つ|という見方|可能性があり|可能性も|推測|仮説")
UNCERTAIN = re.compile(r"不明|定かでは|明かされていません|分かっていません|判明していません|断定できません|説明できません|遺体は見つかり")


class Article(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.title = ""
        self.main = False
        self.section = ""
        self.section_depth = 0
        self.skipped = []
        self.block = None
        self.pieces = []
        self.heading = ""
        self.subheading = ""
        self.passages = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = set(attrs.get("class", "").split())
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "meta" and attrs.get("property") == "og:title":
            self.title = attrs.get("content", "").removesuffix(" — BGS Chronicles")
        if self.skipped:
            if tag not in VOID:
                self.skipped.append(tag)
            return
        if tag == "main":
            self.main = True
        if not self.main:
            return
        if tag in SKIP or "hidden" in attrs or attrs.get("aria-hidden") == "true":
            if tag not in VOID:
                self.skipped.append(tag)
            return
        if tag == "section":
            if self.section:
                self.section_depth += 1
            elif ARTICLE_CLASSES & classes and re.fullmatch(r"[a-zA-Z0-9_-]+", attrs.get("id", "")):
                self.section = attrs["id"]
                self.section_depth = 1
                self.heading = self.subheading = ""
        if not self.section:
            return
        if tag in BLOCKS and self.block is None:
            self.block, self.pieces = tag, []
        if self.block and tag in {"br", "td", "th"}:
            self.pieces.append(" ")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if self.skipped:
            if tag in self.skipped:
                while self.skipped.pop() != tag:
                    pass
            return
        if tag == "main":
            self.main = False
        if tag == "section" and self.section:
            self.section_depth -= 1
            if not self.section_depth:
                self.section = ""
        if tag != self.block:
            return
        self.block = None
        text = " ".join("".join(self.pieces).split())
        if tag == "h2":
            self.heading, self.subheading = text, ""
        elif tag in {"h3", "h4"}:
            self.subheading = text
        elif len(text) >= 12 and self.section and self.heading:
            self.passages.append((self.section, self.heading, self.subheading, text))

    def handle_data(self, data):
        if self.block and not self.skipped:
            self.pieces.append(data)


def articles():
    ledger = json.loads((ROOT / "archive-order.json").read_text())
    verified = json.loads((HERE / "official-passages.json").read_text())
    unmatched = set(verified)
    seen = set()
    result = []
    for group in ledger["groups"]:
        for entry in group["articles"]:
            path = entry["url"]
            if path in seen or not re.fullmatch(r"[a-z0-9-]+\.html", path):
                raise ValueError(f"Invalid or duplicate article path: {path}")
            seen.add(path)
            article = Article()
            article.feed((ROOT / path).read_text())
            article.close()
            if article.canonical != SITE + path or not article.title or not article.passages:
                raise ValueError(f"Missing or invalid canonical, title, or passages: {path}")
            records = []
            for anchor, chapter, subheading, text in article.passages:
                # Keep whole sentences. Carry an uncertainty marker over the complete paragraph.
                category = "interpretation" if INTERPRETATION.search(chapter + subheading + text) else "record"
                if UNCERTAIN.search(text) and category == "record":
                    category = "uncertain"
                sentences = re.split(r"(?<=[。！？])(?=[^」』）】])", text)
                for sentence in (part.strip() for part in sentences):
                    if not 8 <= len(sentence) <= 270:
                        continue
                    key = f"{path}#{anchor}"
                    match = verified.get(key)
                    official = match and sentence == match["text"]
                    if official:
                        unmatched.discard(key)
                    records.append({
                        "anchor": anchor, "heading": subheading or chapter, "text": sentence,
                        "category": "official" if official else category,
                    })
            if not records:
                raise ValueError(f"No usable article sentences: {path}")
            result.append({"path": path, "title": article.title, "english": entry["tocTitle"], "records": records})
    if unmatched:
        raise ValueError("Review changed passages in official-passages.json: " + ", ".join(sorted(unmatched)))
    return result


def write_module(name, value):
    (OUT / name).write_text("export default " + json.dumps(value, ensure_ascii=False, separators=(",", ":")) + ";\n")


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    corpus = articles()
    write_module("passages.js", corpus)
    write_module("ui.js", {name: (HERE / "ui" / name).read_text() for name in ("page.html.in", "pilot.css", "chat.js")})
    print(f"Indexed {sum(len(item['records']) for item in corpus)} passages from {len(corpus)} articles")
