# Site quality checks

Maintainer: **Codex-BGS-20261027**. These checks complement the editorial guide; they do not replace visual review.

## Source checks (standard library only)

```sh
python scripts/seo_audit.py
python -m unittest discover -s scripts -p 'test_*.py'
node --check site.js
```

The audit checks metadata, JSON-LD syntax, local HTML/asset references (including image variants and OGP images), anchors, duplicate IDs, existing Article modification dates against the displayed editorial date, and sitemap coverage/duplicates. It does not infer actual edit dates, validate external URLs, or measure Core Web Vitals. `sites.html` currently has an existing advisory warning for absent JSON-LD.

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

- `site-components.css`: identical share and article-pagination styles extracted from the pages. Load before page-specific styles and mobile/desktop layers.
- `site.js`: deferred, used only on pages needing filters, dialogs or canonical-based share initialization. Article-specific member text remains in the article and is passed through `window.BGSCreatorMembers`. The shared controller handles focus containment/return, Escape, background inert state and scroll restoration.
- Preserve the existing article-specific CSS, colors, page URLs, permanent file numbers and original images.

## Display image variants

`profile.html` uses 164/328/492 px JPEG variants; `bgs-tot.html` uses 120/240/360 px PNG variants. `srcset`/`sizes` selects the appropriate source for the existing display frame and screen density. OGP images and original photos are retained.

To rebuild variants after changing an original, use a development environment with Pillow:

```sh
python scripts/optimize_display_images.py
```

The script resizes without cropping or color adjustment, preserves the profile ICC profile if present and PNG transparency, and leaves originals untouched. Compare the real rendered image before committing variants. Pillow is not needed by GitHub Pages or the SEO CI.
