#!/usr/bin/env python3
"""Build the local print fonts from verified upstream TTF files (see fonts/README.md)."""
import argparse
import hashlib
from html.parser import HTMLParser
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONTS = (
    ("IMFeENrm28P.ttf", "fe9705bbde51af802719246d4608d08d37bde956ab99d9a590da996a5221a24c", "press-english", "BGS Press English", "Regular"),
    ("ShipporiMinchoB1-Regular.ttf", "89403e4b2a9ca0db9f832b893cfbfd90506c7c674cd640ba8a0ee128c34de7a4", "press-mincho", "BGS Press Mincho", "Regular"),
)


class NoticeText(HTMLParser):
    CLASSES = {"photo-request", "footer-copy", "footer-related", "footer-notice-btn",
               "last-edited", "modal-copyright", "modal-text", "site-share-note", "source-note"}
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self):
        super().__init__()
        self.stack = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        selected = bool(self.CLASSES & set(dict(attrs).get("class", "").split()))
        active = selected or bool(self.stack and self.stack[-1][1])
        if tag not in self.VOID:
            self.stack.append((tag, active))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if self.stack and self.stack[-1][1]:
            self.text.append(data)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source_dir", type=Path, help="Directory containing the two original TTF files")
    args = parser.parse_args()
    # Include only supplemental notices: article prose and titles keep their existing faces.
    parser = NoticeText()
    for page in sorted(ROOT.glob("*.html")):
        if 'print-notes.css' in page.read_text(encoding="utf-8"):
            parser.feed(page.read_text(encoding="utf-8"))
    text = "".join(parser.text)
    text += "".join(chr(c) for c in range(32, 383))
    text += "".join(chr(c) for c in range(0x2000, 0x2070))
    options = subset.Options()
    options.layout_features = ["*"]
    options.recalc_timestamp = False
    options.canonical_order = True
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    for filename, digest, output, family, style in FONTS:
        source = args.source_dir / filename
        if hashlib.sha256(source.read_bytes()).hexdigest() != digest:
            raise SystemExit(f"Checksum mismatch: {filename}")
        font = TTFont(source, recalcTimestamp=False)
        worker = subset.Subsetter(options=options)
        worker.populate(text=text)
        worker.subset(font)
        # The redistributed subsets have distinct family names; retain copyright/license records.
        names = {1: family, 2: style, 3: f"{family}-{style}-subset", 4: f"{family} {style}",
                 6: f"{family.replace(' ', '')}-{style}", 16: family, 17: style}
        for record in font["name"].names:
            if record.nameID in names:
                record.string = names[record.nameID].encode(record.getEncoding())
        font.flavor = "woff2"
        path = ROOT / "fonts" / f"{output}.woff2"
        font.save(path)
        print(f"{path.name}: {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
