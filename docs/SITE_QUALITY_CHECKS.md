# Site quality checks

Maintainer: **Codex-BGS-20261027**. These checks complement the editorial guide; they do not replace visual review.

## Source checks (standard library only)

```sh
python scripts/check_site.py
```

The audit checks metadata, JSON-LD syntax, local HTML/asset references (including image variants and OGP images), anchors, duplicate IDs, existing Article modification dates against the displayed editorial date, and sitemap coverage/duplicates. It does not infer actual edit dates, validate external URLs, or measure Core Web Vitals. `sites.html` currently has an existing advisory warning for absent JSON-LD.

The same command also checks X share copy, permanent File Nos, home-card coverage, article order/previous-next links, Python regression tests and the shared JavaScript syntax. The GitHub Actions workflow runs it for relevant pull requests.

The home archive search filters article titles, descriptions and photo alt text together with the existing park buttons. It hides only when JavaScript is unavailable, leaving all cards readable. A table-of-contents link restores the target card if an active search or park filter had hidden it. Three article footers include a small related-record link; keep these links editorially relevant rather than adding them mechanically to every article.

## Adding an archive article

1. Give the article the next unused File No.; never renumber existing records. Add its card to `index.html` with the same number and a useful title, description, category, photo and alt text.
2. Add the article's canonical/OGP data, article navigation and a folded source note following the editorial guide. Update the neighboring articles' previous/next links. Add the new page to `sitemap.xml` and `share-captions.json`, then run `python scripts/update_share_links.py`.
3. Run `python scripts/check_site.py` and the browser smoke check before the PR. Check the real page on mobile and desktop. Keep any new card photo's original for articles/OGP, and add a display copy using `scripts/optimize_archive_images.py` if the photo is large.

## Archive cover and card images

`index.html` uses a 1200px display JPEG for the cover and 800/1200px responsive JPEGs for 16 photo cards. `scripts/optimize_archive_images.py` regenerates them from originals with Pillow. The Fantasy Springs card keeps the same 4:3 crop and 20% vertical position. `tds-map.jpg` is already small; `origins-card.png` remains its original illustration. OGP and article photography continue to use their existing originals. Check the actual crop after changing a source image.

When updating an article's content, record its actual editorial date in the displayed `last-edited` time and any existing Article `dateModified` and sitemap `lastmod`. Do not substitute the date of unrelated technical maintenance. Do not add unsupported publication dates.

## Browser checks

Start a server from the repository root:

```sh
python -m http.server 8765
```

With Playwright available in your development environment and Chromium installed:

```sh
node scripts/browser_smoke.cjs
```

Override `BGS_TEST_URL` (trailing slash required) and `BGS_CHROMIUM` if needed. Playwright is a development-only prerequisite; the public site has no new runtime dependency or build step. The script checks 23 pages at 390/768/1280 px, local asset responses, decoded images, horizontal overflow, navigation, filtering/history, modal keyboard operation, reduced motion, and no-JavaScript article visibility. It deliberately blocks Google Fonts for repeatable fallback-font checks. Verify the actual web fonts and mobile hardware separately.

## Shared components

- `article-layout.css`: common layout for the 20 newspaper articles, loaded after the mobile and desktop layers on `body.article-page`. Keep the English title, Japanese subtitle, optional introduction, File No., index and body in that order. Use separate `.toc-num` / `.toc-text` spans so wrapped index entries align. Body text is 16px on phones and 17px above 640px; the index becomes a sidebar at 1100px. Small World and Tomorrowland intentionally do not load this layer. Home, profile and the site chooser retain their distinct page functions.
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
