#!/usr/bin/env python3
"""Dependency-free SEO smoke checks for the BGS Chronicles static site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, urljoin, unquote
from collections import Counter
from datetime import date, datetime
import json
import re
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
SHARE_IMAGES = (("property", "og:image"), ("name", "twitter:image"))
# These dates predate publishing dateModified consistently. A later edit
# must synchronize all three fields and remove the corresponding entry.
LEGACY_ARTICLE_DATES = {
    "bgs-genesis.html": date(2026, 10, 28),
    "bgs-origins.html": date(2026, 11, 21),
    "bgs-portdiscovery.html": date(2026, 11, 21),
}

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = []
        self.in_title = False
        self.h1_count = 0
        self.h1_text = []
        self.in_h1 = False
        self.meta = {}
        self.canonical = None
        self.jsonld = []
        self.archive_cards = []
        self._in_jsonld = False
        self._jsonld_buffer = []
        self.redirect = False
        self.verification = False
        self.ids = []
        self.references = []
        self.edit_dates = []
        self._in_edit_date = False
        self._edit_time = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for key in ("href", "src"):
            if attrs.get(key):
                self.references.append(attrs[key])
        if attrs.get("srcset"):
            self.references.extend(part.strip().split()[0] for part in attrs["srcset"].split(",") if part.strip())
        if tag == "a" and "card" in attrs.get("class", "").split() and attrs.get("href"):
            self.archive_cards.append(attrs["href"])
        if tag == "p" and "last-edited" in attrs.get("class", "").split():
            self._in_edit_date = True
        if tag == "time" and self._in_edit_date:
            self._edit_time = (attrs.get("datetime"), [])
        if tag == "meta" and any(attrs.get(attribute) == key for attribute, key in SHARE_IMAGES):
            self.references.append(attrs.get("content", ""))
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.h1_count += 1
            self.in_h1 = True
        elif tag == "br" and self.in_h1:
            self.h1_text.append(" ")
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
        if tag == "time" and self._edit_time is not None:
            value, label = self._edit_time
            self.edit_dates.append((value, "".join(label).strip()))
            self._edit_time = None
        elif tag == "p":
            self._in_edit_date = False
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False
        elif tag == "script" and self._in_jsonld:
            self.jsonld.append("".join(self._jsonld_buffer).strip())
            self._in_jsonld = False
            self._jsonld_buffer = []

    def handle_data(self, data):
        if self._edit_time is not None:
            self._edit_time[1].append(data)
        if self.in_h1:
            self.h1_text.append(data)
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


def calendar_day(value):
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return date.fromisoformat(value)
    return datetime.fromisoformat(value).date()


def validate_article_dates(path, parser, data, lastmod, errors):
    if isinstance(data, list):
        for item in data:
            validate_article_dates(path, parser, item, lastmod, errors)
        return
    if not isinstance(data, dict):
        return
    if "@graph" in data:
        validate_article_dates(path, parser, data["@graph"], lastmod, errors)
    types = data.get("@type", [])
    if isinstance(types, str):
        types = [types]
    if not isinstance(types, list) or "Article" not in types:
        return
    if len(parser.edit_dates) != 1:
        errors.append(f"{path.name}: expected one displayed edit date")
        return
    value, label = parser.edit_dates[0]
    try:
        displayed_day = calendar_day(value)
    except (TypeError, ValueError):
        errors.append(f"{path.name}: invalid displayed edit date")
        return
    japanese_date = re.fullmatch(r"(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日", label)
    if japanese_date:
        year, month, day = map(int, japanese_date.groups())
        label = f"{year:04d}-{month:02d}-{day:02d}"
    if label != displayed_day.isoformat():
        errors.append(f"{path.name}: displayed edit date text does not match its datetime")
    if lastmod is None:
        errors.append(f"{path.name}: missing sitemap lastmod")
    else:
        try:
            if calendar_day(lastmod) != displayed_day:
                errors.append(f"{path.name}: sitemap lastmod does not match displayed edit date")
        except (TypeError, ValueError):
            errors.append(f"{path.name}: invalid sitemap lastmod")
    if "dateModified" not in data:
        if LEGACY_ARTICLE_DATES.get(path.name) != displayed_day:
            errors.append(f"{path.name}: missing Article.dateModified")
        return
    try:
        modified_day = calendar_day(data["dateModified"])
        published = data.get("datePublished")
        if published and modified_day < calendar_day(published):
            errors.append(f"{path.name}: dateModified precedes datePublished")
    except (TypeError, ValueError):
        errors.append(f"{path.name}: invalid Article date")
        return
    if modified_day != displayed_day:
        errors.append(f"{path.name}: dateModified does not match displayed edit date")


def validate_home_schema(path, parser, data, errors):
    """Keep invisible archive metadata aligned with the actual home-page cards."""
    if path.name != "index.html" or not parser.archive_cards:
        return
    graph = data.get("@graph", []) if isinstance(data, dict) else []
    by_type = {item.get("@type"): item for item in graph if isinstance(item, dict) and isinstance(item.get("@type"), str)}
    description = parser.meta.get(("name", "description"))
    for kind in ("WebSite", "CollectionPage"):
        item = by_type.get(kind, {})
        if item.get("description") != description:
            errors.append(f"index.html: {kind} description differs from page metadata")
        if item.get("url") != parser.canonical:
            errors.append(f"index.html: {kind} URL differs from canonical")
    if by_type.get("CollectionPage", {}).get("name") != "".join(parser.title).strip():
        errors.append("index.html: CollectionPage name differs from title")
    items = by_type.get("ItemList", {}).get("itemListElement", [])
    if not isinstance(items, list) or not all(isinstance(item, dict) for item in items):
        errors.append("index.html: invalid ItemList entries")
        return
    expected = [BASE_URL + target for target in parser.archive_cards]
    if [item.get("url") for item in items] != expected:
        errors.append("index.html: ItemList must match archive cards in order")
    if [item.get("position") for item in items] != list(range(1, len(expected) + 1)):
        errors.append("index.html: ItemList positions must be consecutive")


def main():
    errors = []
    warnings = []
    pages = sorted(ROOT.glob("*.html"))
    checked = 0
    cache = {path.resolve(): inspect_page(path) for path in pages}
    editorial_pages = set()
    article_data = []
    lastmods = {}

    for path in pages:
        raw_html = path.read_text(encoding="utf-8")
        parser = cache[path.resolve()]
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
        for attribute, key in SHARE_IMAGES:
            if parser.meta.get((attribute, key)) and not parser.meta.get((attribute, key + ":alt")):
                errors.append(f"{label}: missing {attribute}={key}:alt for shared image")
        if parser.meta.get(("property", "og:url")) and parser.canonical:
            if parser.meta[("property", "og:url")].rstrip("/") != parser.canonical.rstrip("/"):
                errors.append(f"{label}: og:url does not match canonical")

        for index, raw in enumerate(parser.jsonld, start=1):
            try:
                data = json.loads(raw)
                article_data.append((path.resolve(), data))
                validate_home_schema(path, parser, data, errors)
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
            for node in tree.findall("sm:url", ns):
                url = node.findtext("sm:loc", "", ns).strip()
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
                target = target.resolve()
                sitemap_targets.add(target)
                lastmod = node.findtext("sm:lastmod", namespaces=ns)
                if lastmod is not None:
                    lastmods[target] = lastmod.strip()
                if not target.is_file():
                    errors.append(f"sitemap.xml: URL does not map to a file: {url}")
            for missing in sorted(editorial_pages - sitemap_targets):
                errors.append(f"sitemap.xml: missing editorial page: {missing.name}")
            for extra in sorted(sitemap_targets - editorial_pages):
                errors.append(f"sitemap.xml: non-editorial page listed: {extra.name}")
        except ET.ParseError as exc:
            errors.append(f"sitemap.xml: invalid XML ({exc})")

    for path, data in article_data:
        validate_article_dates(path, cache[path], data, lastmods.get(path), errors)

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
