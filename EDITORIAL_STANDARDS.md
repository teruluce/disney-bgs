# BGS Chronicles — Editorial & Collaboration Guide

Updated: 2026-10-21

## Product identity

BGS Chronicles is an independent Disney Parks fan publication presented as a carefully edited, early-20th-century newspaper/archive. It is an atmospheric editorial experience, not a dry encyclopedia. Preserve the existing masthead, serif headlines, fine rules, warm paper texture, ink-brown text, restrained bordeaux accents, and antique-gold details.

## Editorial voice and uncertainty

- Write with narrative flow, curiosity, and a sense of discovery. Do not interrupt articles with repeated defensive disclaimers such as “公式では確認できませんでした” unless the distinction is essential to avoid misleading readers.
- Keep official story material, observable park details, and fan interpretation distinct through natural wording. For example: “ファンの間では、こうした意匠から○○を想起する考察もあります。” or “一部のファンの間では、○○という解釈も語られています。”
- Never present speculation as confirmed canon. Use subtle attribution (“〜と考察するファンもいます”, “〜という見方もあります”) rather than repeated warning boxes.
- Prefer official sources for hard factual claims. If a point is uncertain, qualify only that point gracefully and continue the story; do not make the whole page read like a reference database.
- Never invent sources, quotes, production history, dates, or designer intent. Separate verified facts from interpretation by phrasing, not disruptive disclaimers.
- Keep research and sourcing out of the narrative voice (owner's rule, 2026-10-25). Do not write "公式ブログによると", "公式サイトでは〜と紹介されています", "今回確認した範囲では見つかりませんでした" or similar phrases about how the facts were checked. Say it in the story's own voice, and put sources in the folded source note at the end. Details and exceptions are in `docs/AI_WORK_LOG.md`.
- Keep headlines aligned with the actual story and section content. Avoid generic headings that promise information the section does not deliver.

## Visual typography

- Treat the entire site as a printed publication, including dates, update notices, credits, navigation, copyright, and contact/operational details.
- Use the existing typewriter/monospace face for small editorial metadata and colophon-like information; use the Japanese serif face for dates and the established display serif for headlines.
- Metadata should use subdued ink-brown/sepia colors. Use bordeaux sparingly for meaningful accents; avoid modern bright colors, default blue links, oversized labels, or UI elements that look detached from the paper.
- Prefer thin rules, double rules, small caps/letter spacing, and measured spacing to pills, heavy boxes, or generic modern UI.
- Keep body text comfortable to read, especially on mobile. Newspaper styling must not compromise contrast, tap targets, or line length.

## Archive file numbers and stamps

Shared styles live in `archive.css` (linked before `mobile.css`). Rolled out on 2026-10-17: `index.html` cards and all 19 articles have a File No.; only Port Discovery has a stamp so far. New articles should get the next File No. and a `file-strip`.

- **File No.** is a permanent three-digit number per article, shown on the home cards ("No. 019 · Story · TDS") and in the article's `file-strip`. Numbers are never reused or renumbered. New articles take the next number. Current assignment (home-page order at the time of numbering): 001 Splash Mountain, 002 Big Thunder Mountain, 003 Haunted Mansion, 004 Beauty and the Beast, 005 World Bazaar, 006 Cinderella Castle, 007 Tomorrowland, 008 It's a Small World, 009 Tokyo Disneyland (chronicle), 010 Electrical Parade, 011 TDS Spatial Epic, 012 Tower of Terror, 013 Sindbad's Voyage, 014 Fantasy Springs, 015 Soarin', 016 S.E.A. Archives, 017 Raging Spirits, 018 Indiana Jones, 019 Port Discovery, 020 Birth of DisneySea.
- **Stamps** (`file-stamp` / `card-stamp`) state only facts the article itself already supports (for example a closure date). Do not stamp anything that is unconfirmed.
- **No per-article summary box.** The "File Brief" (要点欄) was removed on 2026-10-21 at the owner's request because it broke the in-world newspaper/archive feel. Do not add summary boxes to articles.
- **Sources** stay in the folded `source-note` list, numbered `[1]`, `[2]`… with no external links (decision of 2026-10-15). Do not add in-text footnote numbers unless the claim-to-source mapping has been checked against the sources.

## Technical working rules

- Preserve existing page structure and the established newspaper design unless a change is explicitly intended.
- Prefer focused, reviewable changes. For larger refactors, create a branch and pull request rather than making a broad unreviewed edit directly on `main`.
- Check desktop and mobile layouts, article navigation, canonical/OGP metadata, and JavaScript interactions after relevant changes.
- Do not claim a visual/live deployment check unless it was actually performed. Distinguish source-level verification from browser-level verification in internal reports.
- Keep this repository as the shared source of truth. Record substantive editorial/design decisions here so both AI assistants can follow the same standards.

## Division of work: ChatGPT + Claude

- There are no fixed roles. Either assistant may edit, research, review, test, merge, and verify the published site, whichever is available and able to finish the work. What matters is avoiding duplicate work and finishing reliably.
- Before starting, read `docs/AI_WORK_LOG.md` and compare it with the actual state of GitHub (main, branches, PRs). If the log and GitHub disagree, GitHub wins and the log is corrected.
- Do not overwrite the other assistant's unmerged work. Check existing branches and PRs for the same files before editing, and record what you did, what you verified, and what remains in the work log when you finish.
- Shared workflow: agree on the intended outcome, make changes in a branch, review the diff, have the other assistant inspect it where useful, merge only after review, and verify the deployed result when possible.
- Both assistants should read this guide before significant editorial or visual changes. Avoid parallel edits to the same files without coordinating, to reduce conflicts.
- The user's final direction takes priority over either assistant's stylistic preference.
