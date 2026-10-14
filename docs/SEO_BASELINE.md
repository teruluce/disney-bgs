# BGS Chronicles — SEO baseline (2026-10-10)

## Repository review

Reviewed the current `main` files and the shared AI work log before making changes. The site remains a GitHub Pages static site at:

- `https://teruluce.github.io/disney-bgs/`

## Already present on the reviewed main branch

- `sitemap.xml` lists the home page, 18 article/archive pages, and the profile page.
- `robots.txt` allows crawling and declares the sitemap.
- The home page, profile, and the 18 sitemap-listed editorial pages have title, meta description, canonical, OGP, and X card metadata.
- Most editorial pages already have Article JSON-LD. The coverage and field consistency are uneven: `bgs-fs.html` and `cinderella-castle.html` had no JSON-LD at review time; the Small World page had Article, FAQPage, and BreadcrumbList data.
- A visible HTML breadcrumb was not detected consistently in the reviewed page sources.
- OGP image aspect ratios differ between pages. Check actual public images and social preview rendering before replacing them; do not assume every existing photo is suitable for a 1200×630 card.
- The sitemap and robots file already exist; do not create duplicate versions.

## Changes in this SEO foundation PR

- Enriched the existing profile page's Person data with the existing public profile image, public social account links, and subject areas. No credentials or unsupported professional claims were added.
- Added a dependency-free Python smoke check for page titles, descriptions, canonical URLs, OGP/X metadata, JSON-LD syntax, sitemap file targets, and the robots sitemap declaration.
- Added a GitHub Actions workflow to run the smoke check on relevant pull requests and pushes to main. It uses free GitHub-hosted Actions and Python's standard library; no paid service or third-party SEO package is required.

## Follow-up work

1. Review the open PR #9 against current main before deciding whether to update, close, or merge it. It touches many of the same article files and `index.html`; this PR intentionally avoids those files.
2. Add and verify consistent visible HTML breadcrumbs and matching BreadcrumbList JSON-LD across editorial pages in a coordinated follow-up, avoiding duplicate schema.
3. Review existing Article JSON-LD for accurate author, publisher, image, dates, and mainEntityOfPage values. Do not set `dateModified` to the current date unless the article content was actually updated.
4. Validate all OGP image URLs and their dimensions; use a locally created, rights-cleared 1200×630 image only where appropriate.
5. Add category/archive hubs and relevant internal links after coordinating changes to `index.html` and the open PR.
6. Register/verify Search Console and GA4 in the site owner's accounts; code changes alone cannot perform account ownership verification.

## Verification boundaries

The source review found valid JSON syntax in the existing JSON-LD blocks sampled across the sitemap-listed pages. The new audit script itself is committed for automated execution; its first GitHub Actions result and live Pages behavior must be checked after the PR is opened/merged. No Search Console or GA4 account settings were changed.
