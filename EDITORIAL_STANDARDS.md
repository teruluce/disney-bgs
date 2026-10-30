# BGS Chronicles — Editorial & Collaboration Guide

Updated: 2026-10-21

## Product identity

BGS Chronicles is an independent Disney Parks fan publication presented as a carefully edited, early-20th-century newspaper/archive. It is an atmospheric editorial experience, not a dry encyclopedia. Preserve the existing masthead, serif headlines, fine rules, warm paper texture, ink-brown text, restrained bordeaux accents, and antique-gold details.

The owner's visual reference is an early-20th-century American newspaper in the spirit of American Waterfront. Preserve the established typefaces, ink colors, paper palette, and restrained rules when adding or changing components; check changes in context.

## Editorial voice and uncertainty

- Write with narrative flow, curiosity, and a sense of discovery. Do not interrupt articles with repeated defensive disclaimers such as “公式では確認できませんでした” unless the distinction is essential to avoid misleading readers.
- Keep official story material, observable park details, and fan interpretation distinct through natural wording. For example: “ファンの間では、こうした意匠から○○を想起する考察もあります。” or “一部のファンの間では、○○という解釈も語られています。”
- Never present speculation as confirmed canon. Use subtle attribution (“〜と考察するファンもいます”, “〜という見方もあります”) rather than repeated warning boxes.
- Prefer official sources for hard factual claims. If a point is uncertain, qualify only that point gracefully and continue the story; do not make the whole page read like a reference database.
- Never invent sources, quotes, production history, dates, or designer intent. Separate verified facts from interpretation by phrasing, not disruptive disclaimers.
- Keep research and sourcing out of the narrative voice (owner's rule, 2026-10-25). Do not write "公式ブログによると", "公式サイトでは〜と紹介されています", "今回確認した範囲では見つかりませんでした" or similar phrases about how the facts were checked. Say it in the story's own voice, and put sources in the folded source note at the end. Details and exceptions are in `docs/AI_WORK_LOG.md`.
- When adapting a research report (owner's rule, 2026-10-28), rewrite its report-style or news-style voice into the story's voice. Do not leave source-flavored phrasing such as 「〜に沿えば」「〜が発表されています」「〜と報じられています」 in the body. Never stack hedges (「設定では」 plus 「〜とされています」 in one sentence); state in-world facts about S.E.A., Hightower and the like plainly. Hedge only genuinely uncertain points, with 「〜といわれています」「〜と語り継がれています」. Before publishing, search the body for 公式|によると|によれば|に沿えば|と伝えられ|発表されています|報じられ|とされています|設定では. Details are in `docs/AI_WORK_LOG.md`.
- Keep headlines aligned with the actual story and section content. Avoid generic headings that promise information the section does not deliver.

## In-world narration — owner's rule, 2026-10-30

- Match existing narrative articles with composed Japanese in 「です・ます」 form; retain occasional noun-ending sentences where they serve the rhythm.
- Treat verified BGS events, people and technology as the history and reality of their world. In narrative articles, speak from inside that world.
- Do not use world-breaking meta commentary in the body, headings, captions, illustration labels, or article share copy. This includes 「設定上」「架空の」「公式設定では」「演出として」「実際の配線ではなくBGS」 and explanations of research or verification.
- The sole exception for meta discussion in article prose is a relevant explanation about Imagineers. Sources remain in the folded note at the end; research, artwork provenance and checks belong in maintenance records.
- This rule takes precedence over older suggestions to attribute claims to fans in narrative prose. Omit unsupported material rather than inventing certainty or breaking the world to discuss it. Do not invent diary entries, quotations, signatures or technical specifications for atmosphere.

## Narrative immersion and written Japanese

- The article's purpose is not merely to explain facts, but to help readers uncover the story carried by the place. Use verified facts as the foundation for a narrative that moves through architecture, props, landscape, history, and show details.
- Prefer composed written Japanese over casual conversational phrasing. In context, use forms such as 「しかし」「一方で」「ただし」 rather than casual 「けれど」「でも」. Do not mechanically replace every connector; choose the wording that best preserves the sentence's meaning and rhythm.
- Avoid addressing readers with repeated opening questions or interrupting the narrative with meta headings and phrases such as 「この記事では〜を解説します」「この記事で辿ること」「写真でもわかるように」「解説によると」. Introduce the subject through a detail, a contrast, or a narrative question instead.
- Keep interpretations legible as interpretations. Avoid turning a visual resemblance into a confirmed production intention, or calling a detail a 「伏線」「決定的な証拠」 unless the evidence supports that level of certainty. Atmospheric writing should deepen the story, not inflate the claim.
- Favor precise, restrained endings over repeated emphatic formulations such as 「〜なのです」. Poetic language is welcome when it grows naturally from the place and its details; avoid generic sentiment or grand conclusions that could fit any article.
- Make small, local edits first. Preserve the existing article's facts, structure, voice, and design unless a specific inconsistency or clarity issue calls for a change.

## Visual typography

- Treat the entire site as a printed publication, including dates, update notices, credits, navigation, copyright, and contact/operational details.
- Use the existing typewriter/monospace face for small editorial metadata and colophon-like information; use the Japanese serif face for dates and the established display serif for headlines.
- Metadata should use subdued ink-brown/sepia colors. Use bordeaux sparingly for meaningful accents; avoid modern bright colors, default blue links, oversized labels, or UI elements that look detached from the paper.
- Prefer thin rules, double rules, small caps/letter spacing, and measured spacing to pills, heavy boxes, or generic modern UI.
- Keep body text comfortable to read, especially on mobile. Newspaper styling must not compromise contrast, tap targets, or line length.

## Archive file numbers and stamps

Shared styles live in `archive.css` (linked before `mobile.css`). Rolled out on 2026-10-17: `index.html` cards and all 19 articles have a File No.; only Port Discovery has a stamp so far. New articles should get the next File No. and a `file-strip`.

- **File No.** is a permanent three-digit number per article, shown on the home cards ("No. 019 · Story · TDS") and in the article's `file-strip`. Numbers are never reused or renumbered. New articles take the next number. Current assignment (home-page order at the time of numbering): 001 Splash Mountain, 002 Big Thunder Mountain, 003 Haunted Mansion, 004 Beauty and the Beast, 005 World Bazaar, 006 Cinderella Castle, 007 Tomorrowland, 008 It's a Small World, 009 Tokyo Disneyland (chronicle), 010 Electrical Parade, 011 TDS Spatial Epic, 012 Tower of Terror, 013 Sindbad's Voyage, 014 Fantasy Springs, 015 Soarin', 016 S.E.A. Archives, 017 Raging Spirits, 018 Indiana Jones, 019 Port Discovery, 020 Birth of DisneySea, 021 Genesis of BGS.
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

- Identify each working session explicitly in logs, commits, and PR descriptions; do not use the generic name "ChatGPT" to infer ownership of another session's task. The additional Codex session uses `Codex-BGS-20261027`.
- There are no fixed roles. Either assistant may edit, research, review, test, merge, and verify the published site, whichever is available and able to finish the work. What matters is avoiding duplicate work and finishing reliably.
- Before starting, read `docs/AI_WORK_LOG.md` and compare it with the actual state of GitHub (main, branches, PRs). If the log and GitHub disagree, GitHub wins and the log is corrected.
- Do not overwrite the other assistant's unmerged work. Check existing branches and PRs for the same files before editing, and record what you did, what you verified, and what remains in the work log when you finish.
- Shared workflow: agree on the intended outcome, make changes in a branch, review the diff, have the other assistant inspect it where useful, merge only after review, and verify the deployed result when possible.
- Both assistants should read this guide before significant editorial or visual changes. Avoid parallel edits to the same files without coordinating, to reduce conflicts.
- The user's final direction takes priority over either assistant's stylistic preference.

