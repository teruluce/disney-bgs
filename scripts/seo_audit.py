#!/usr/bin/env python3
"""Dependency-free SEO smoke checks for the BGS Chronicles static site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, urljoin, unquote
from collections import Counter
from datetime import date
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://teruluce.github.io/disney-bgs/"
REQUIRED_META = (
    ("property", "og:title"),
    ("property", "og:description"),
    ("property", "og:image"),
    ("property", "og:url"),
    ("name", "twitter:card"),
    ("name", "twitter:title"),
    ("name", "twitter:description"),
    ("name", "twitter:image"),
)

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = []
        self.in_title = False
        self.h1_count = 0
        self.meta = {}
        self.canonical = None
        self.jsonld = []
        self._in_jsonld = False
        self._jsonld_buffer = []
        self.redirect = False
        self.verification = False
        self.ids = []
        self.references = []
        self.edit_dates = []
        self._in_edit_date = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for key in ("href", "src"):
            if attrs.get(key):
                self.references.append(attrs[key])
        if attrs.get("srcset"):
            self.references.extend(part.strip().split()[0] for part in attrs["srcset"].split(",") if part.strip())
        if tag == "p" and "last-edited" in attrs.get("class", "").split():
            self._in_edit_date = True
        if tag == "time" and self._in_edit_date and attrs.get("datetime"):
            self.edit_dates.append(attrs["datetime"])
        if tag == "meta" and (attrs.get("property") == "og:image" or attrs.get("name") == "twitter:image"):
            self.references.append(attrs.get("content", ""))
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "meta":
            name = attrs.get("name", "").lower()
            prop = attrs.get("property", "").lower()
            if name == "google-site-verification":
                self.verification = True
            if name and "content" in attrs:
                self.meta[("name", name)] = attrs["content"].strip()
            if prop and "content" in attrs:
                self.meta[("property", prop)] = attrs["content"].strip()
            if attrs.get("http-equiv", "").lower() == "refresh":
                self.redirect = True
        elif tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonical = attrs.get("href")
        elif tag == "script" and attrs.get("type", "").lower() == "application/ld+json":
            self._in_jsonld = True
            self._jsonld_buffer = []

    def handle_endtag(self, tag):
        if tag == "p":
            self._in_edit_date = False
        if tag == "title":
            self.in_title = False
        elif tag == "script" and self._in_jsonld:
            self.jsonld.append("".join(self._jsonld_buffer).strip())
            self._in_jsonld = False
            self._jsonld_buffer = []

    def handle_data(self, data):
        if self.in_title:
            self.title.append(data)
        if self._in_jsonld:
            self._jsonld_buffer.append(data)

def inspect_page(path):
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser

def local_target(reference, source, root):
    """Resolve only this project's URLs; keep query strings out of file paths."""
    base = urlparse(BASE_URL)
    page_url = BASE_URL + source.relative_to(root).as_posix()
    url = urlparse(urljoin(page_url, reference))
    if url.scheme not in ("https", "http") or url.netloc != base.netloc:
        return None
    prefix = base.path
    if not url.path.startswith(prefix):
        return None  # A different Pages project on the same host is external.
    relative = unquote(url.path[len(prefix):])
    target = (root / relative).resolve()
    if not target.is_relative_to(root.resolve()):
        return None
    if url.path.endswith("/"):
        target /= "index.html"
    return target, unquote(url.fragment)


def validate_references(path, parser, root, errors, cache):
    for element_id, count in Counter(parser.ids).items():
        if count > 1:
            errors.append(f"{path.name}: duplicate id={element_id}")
    for reference in parser.references:
        resolved = local_target(reference, path, root)
        if resolved is None:
            continue
        target, fragment = resolved
        if not target.is_file():
            errors.append(f"{path.name}: missing local target: {reference}")
        elif fragment and target.suffix == ".html":
            if target not in cache:
                cache[target] = inspect_page(target)
            # Text fragments are browser directives, not element IDs.
            element_id = fragment.split(":~:text=", 1)[0]
            if element_id and element_id not in cache[target].ids:
                errors.append(f"{path.name}: missing anchor: {reference}")


def validate_article_dates(path, parser, data, errors):
    if isinstance(data, list):
        for item in data:
            validate_article_dates(path, parser, item, errors)
        return
    if not isinstance(data, dict):
        return
    if "@graph" in data:
        validate_article_dates(path, parser, data["@graph"], errors)
    types = data.get("@type", [])
    if isinstance(types, str):
        types = [types]
    if "Article" not in types or not data.get("dateModified"):
        return
    modified = data["dateModified"]
    try:
        modified_day = date.fromisoformat(modified[:10])
        published = data.get("datePublished")
        if published and modified_day < date.fromisoformat(published[:10]):
            errors.append(f"{path.name}: dateModified precedes datePublished")
    except (TypeError, ValueError):
        errors.append(f"{path.name}: invalid Article date")
        return
    if parser.edit_dates and modified[:10] != parser.edit_dates[-1][:10]:
        errors.append(f"{path.name}: dateModified does not match displayed edit date")


def main():
    errors = []
    warnings = []
    pages = sorted(ROOT.glob("*.html"))
    checked = 0
    cache = {path.resolve(): inspect_page(path) for path in pages}
    editorial_pages = set()

    for path in pages:
        raw_html = path.read_text(encoding="utf-8")
        parser = inspect_page(path)
        validate_references(path, parser, ROOT, errors, cache)
        # Google Search Console may use a plain-text HTML verification file with no tags.
        if parser.redirect or parser.verification or raw_html.strip().startswith("google-site-verification:"):
            continue
        checked += 1
        editorial_pages.add(path.resolve())
        label = path.name
        title = "".join(parser.title).strip()
        description = parser.meta.get(("name", "description"), "")
        expected = BASE_URL if path.name == "index.html" else BASE_URL + path.name

        if not title:
            errors.append(f"{label}: missing <title>")
        if not description:
            errors.append(f"{label}: missing meta description")
        if not parser.canonical:
            errors.append(f"{label}: missing canonical")
        elif parser.canonical.rstrip("/") != expected.rstrip("/"):
            errors.append(f"{label}: canonical mismatch (expected {expected}, got {parser.canonical})")

        for key in REQUIRED_META:
            if not parser.meta.get(key):
                errors.append(f"{label}: missing {key[0]}={key[1]}")
        if parser.meta.get(("property", "og:url")) and parser.canonical:
            if parser.meta[("property", "og:url")].rstrip("/") != parser.canonical.rstrip("/"):
                errors.append(f"{label}: og:url does not match canonical")

        for index, raw in enumerate(parser.jsonld, start=1):
            try:
                data = json.loads(raw)
                validate_article_dates(path, parser, data, errors)
            except json.JSONDecodeError as exc:
                errors.append(f"{label}: JSON-LD block {index} is invalid JSON ({exc})")

        if parser.h1_count != 1:
            warnings.append(f"{label}: found {parser.h1_count} H1 elements (review manually)")
        if not parser.jsonld:
            warnings.append(f"{label}: no JSON-LD structured data yet")

    sitemap = ROOT / "sitemap.xml"
    if not sitemap.exists():
        errors.append("sitemap.xml is missing")
    else:
        try:
            tree = ET.parse(sitemap)
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            sitemap_targets = set()
            sitemap_urls = set()
            for node in tree.findall(".//sm:loc", ns):
                url = (node.text or "").strip()
                if url in sitemap_urls:
                    errors.append(f"sitemap.xml: duplicate URL: {url}")
                sitemap_urls.add(url)
                parsed = urlparse(url)
                if parsed.scheme != "https" or parsed.netloc != urlparse(BASE_URL).netloc:
                    errors.append(f"sitemap.xml: unexpected URL host/scheme: {url}")
                    continue
                prefix = "/disney-bgs"
                if parsed.path == prefix or parsed.path == prefix + "/":
                    target = ROOT / "index.html"
                elif parsed.path.startswith(prefix + "/"):
                    target = ROOT / parsed.path[len(prefix) + 1:]
                else:
                    errors.append(f"sitemap.xml: URL is outside the site path: {url}")
                    continue
                sitemap_targets.add(target.resolve())
                if not target.is_file():
                    errors.append(f"sitemap.xml: URL does not map to a file: {url}")
            for missing in sorted(editorial_pages - sitemap_targets):
                errors.append(f"sitemap.xml: missing editorial page: {missing.name}")
            for extra in sorted(sitemap_targets - editorial_pages):
                errors.append(f"sitemap.xml: non-editorial page listed: {extra.name}")
        except ET.ParseError as exc:
            errors.append(f"sitemap.xml: invalid XML ({exc})")

    robots = ROOT / "robots.txt"
    if not robots.exists():
        errors.append("robots.txt is missing")
    elif "Sitemap: " + BASE_URL + "sitemap.xml" not in robots.read_text(encoding="utf-8"):
        errors.append("robots.txt: sitemap declaration is missing or incorrect")

    print(f"SEO smoke check: {checked} HTML pages checked.")
    for warning in warnings:
        print("WARNING:", warning)
    for error in errors:
        print("ERROR:", error)
    if errors:
        print(f"FAILED: {len(errors)} error(s), {len(warnings)} warning(s).")
        return 1
    print(f"PASSED: no metadata, JSON-LD, local reference, date, sitemap, or robots.txt errors. {len(warnings)} warning(s).")
    return 0

if __name__ == "__main__":
    sys.exit(main())
