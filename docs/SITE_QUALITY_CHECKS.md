# Site quality checks

Maintainer: **Codex-BGS-20261027**. These checks complement the editorial guide; they do not replace visual review.

## Source checks (standard library only)

```sh
python scripts/check_site.py
```

The audit checks metadata, JSON-LD syntax, local HTML/asset references, anchors, duplicate IDs and sitemap coverage. It checks the displayed Article edit date and its `datetime` against `Article.dateModified` and sitemap `lastmod`. It also requires a non-empty alt for each OGP and X share image. External URLs, actual edit dates and Core Web Vitals require separate verification.

The same command checks X share copy, internal accessions, home-card coverage, matching reading estimates, public File Nos and previous/next links. It also runs the Python regression tests and the shared JavaScript syntax check. GitHub Actions runs it for relevant pull requests.

The home archive search filters article titles, descriptions and photo alt text together with the existing park buttons. It hides only when JavaScript is unavailable, leaving all cards readable. A table-of-contents link restores the target card if an active search or park filter had hidden it. Article footers can include a small related-record link; keep these links editorially relevant rather than adding them mechanically to every article.

## Private AI pilot

The separate Cloudflare Worker has its own checks in `tools/bgs-chronicles-ai`. Run
`npm test` for the corpus, grounding, authentication, quota and Cloudflare
preflight checks, and `npm run test:runtime` to exercise the bundled Worker
against simulated responses for both Gemini models. The **BGS AI pilot checks**
workflow runs those checks on relevant PRs. The [pilot runbook](BGS_AI_PILOT.md)
covers local preview and the separate manual Cloudflare release.

## Adding an archive article

1. Give the article its next unused three-digit permanent accession. Add its card to `index.html` with a useful title, description, category, photo and alt text. Set its position in `archive-order.json` and run `python scripts/build_archive.py` to synchronize the card and article display numbers and each group’s navigation.
2. Add the article's canonical and social metadata, an `article-pagination` navigation landmark and a folded source note. Use `og:image:alt` and `twitter:image:alt` to describe the actual image selected for each platform. Add the new page to `sitemap.xml` and `share-captions.json`, then run `python scripts/update_share_links.py`. Record the editorial date and reading estimate using the instructions below.
3. Run `python scripts/check_site.py` and the browser smoke check before the PR. Check the real page on mobile and desktop. Keep any new card photo's original for articles/OGP, and add a display copy using `scripts/optimize_archive_images.py` if the photo is large.

## Archive cover and card images

`index.html` uses a 1200px display JPEG for the cover and 800/1200px responsive JPEGs for 16 photo cards. `scripts/optimize_archive_images.py` regenerates them from originals with Pillow. The Fantasy Springs card keeps the same 4:3 crop and 20% vertical position. `tds-map.jpg` is already small; `origins-card.png` remains its original illustration. OGP and article photography continue to use their existing originals. Check the actual crop after changing a source image.

## Article dates and reading estimates

- When publishing or revising article content, record the actual editorial date in the visible `last-edited` time and its `datetime`, `Article.dateModified` and sitemap `lastmod`. Retain that date for unrelated maintenance. Record `datePublished` when the publication date is supported.
- The three existing Article records listed in `LEGACY_ARTICLE_DATES` in `scripts/seo_audit.py` may retain the recorded day without `dateModified` until their next editorial revision. Their visible date and sitemap date still have to agree. At the next editorial revision synchronize all three dates and remove the entry. Pages without Article markup follow their own date conventions.
- Estimate reading time at 600 characters per minute, rounded up. Count the introductory and article prose, including column paragraphs. Exclude whitespace, headings, captions, tables, source notes and separate interactive biographies. Put the same estimate in the top card and the article's File No. strip. The static check compares the two labels.

## Browser checks

Start a server from the repository root:

```sh
python -m http.server 8765
```

With Playwright available in your development environment and Chromium installed:

```sh
node scripts/browser_smoke.cjs
```

The approved R3 homepage also has a focused regression check: `node scripts/homepage_smoke.cjs` (same Playwright, Chromium and `BGS_TEST_URL` setup). It checks 16 layouts, the 900/901px boundary, dateline wrapping, actual rendered keyboard-focus pixels and forced colors. See [HOMEPAGE_R3.md](HOMEPAGE_R3.md) for the implementation and verification limits.

Override `BGS_TEST_URL` (trailing slash required) and `BGS_CHROMIUM` if needed. Playwright is a development-only prerequisite; the public site has no new runtime dependency or build step. The script checks 25 pages at 390/767/768/1024/1280 px, desktop column bounds and mobile stacking at the breakpoint, local asset responses, decoded images, horizontal overflow, navigation, filtering/history, modal keyboard operation, reduced motion, and no-JavaScript article visibility. It deliberately blocks Google Fonts for repeatable fallback-font checks. Verify the actual web fonts and mobile hardware separately.

## Shared components

- `print-notes.css`: print-like typefaces only for photo requests, footer information, dates, site notices and source notes. Page titles, article prose, cards and navigation retain their existing fonts. The local fonts' licenses and rebuild instructions are in `fonts/README.md`; rebuild after changing Japanese notice text. Small World and Tomorrowland do not load this layer.
- `article-layout.css`: common layout for the 20 newspaper articles, loaded after the mobile and desktop layers on `body.article-page`. Keep the English title, Japanese subtitle, optional introduction, File No., index and body in that order. Use separate `.toc-num` / `.toc-text` spans so wrapped index entries align. Body text is 16px on phones and 17px above 640px; the index becomes a sidebar at 768px (with narrower gutters and a 180px sidebar below 1100px). Small World and Tomorrowland intentionally do not load this layer. Home, profile and the site chooser retain their distinct page functions.
- Prefer real paragraphs for prose instead of consecutive `<br>` tags; retain intentional breaks in tables and labels. Check 320/390px phones, 768/1024px tablets and 1280px or wider desktops when changing the article layout. Confirm index numbers stay on one line and the desktop sidebar does not overlap the body.
- `site-components.css`: identical share and article-pagination styles extracted from the pages. Load before page-specific styles and mobile/desktop layers.
- `site.js`: deferred, used only on pages needing filters or dialogs. X share links are static HTML generated from `share-captions.json` (see `docs/X_SHARE_COPY.md`). Article-specific member text remains in the article and is passed through `window.BGSCreatorMembers`. The shared controller handles focus containment/return, Escape, background inert state and scroll restoration.
- Preserve the existing article-specific CSS, colors, page URLs, permanent file numbers and original images.

## Display image variants

`profile.html` uses 164/328/492 px JPEG variants; `bgs-tot.html` uses 120/240/360 px PNG variants. `srcset`/`sizes` selects the appropriate source for the existing display frame and screen density. OGP images and original photos are retained.

To rebuild variants after changing an original, use a development environment with Pillow:

```sh
python scripts/optimize_display_images.py
```

The script resizes without cropping or color adjustment, preserves the profile ICC profile if present and PNG transparency, and leaves originals untouched. Compare the real rendered image before committing variants. Pillow is not needed by GitHub Pages or the SEO CI.

## Reader-page quality checks

`node scripts/reading_smoke.cjs` checks the 24 non-home reader pages at 320/390/640/641/767/768/1366 px. Set `BGS_BROWSER` to chromium, firefox or webkit. It covers native skip links, main landmarks, table keyboard scrolling and visible focus, no-JavaScript use, image decode, targeted axe rules and overflow. The browser CI matrix runs it with pinned development-only Playwright/axe packages and installed CJK fallback fonts. `BGS_TEST_FONTS=normal` enables a separate normal-font run; default runs block Google Fonts.

For UI-only preservation checks, explicitly choose the pre-change commit: `python scripts/check_reading_preservation.py --base <SHA>`. This is an opt-in comparison for this refactor, not a ban on future editorial changes. See [READING_QUALITY.md](READING_QUALITY.md) for scope and remaining verification limits.
