# Print fonts for supplemental notices

These local fonts are used only for photo requests, footer information, dates,
site notices, share notes and source notes. Titles, article text, navigation and
cards retain their existing typefaces. Small World and Tomorrowland are unchanged.
The print texture comes from the actual outlines, without blur or text shadows.

The renamed WOFF2 subsets derive from the official Google Fonts repository at
commit `6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec`:

| Original source | Local family | License |
| --- | --- | --- |
| `ofl/imfellenglish/IMFeENrm28P.ttf` | BGS Press English | SIL OFL 1.1, IM-FELL-English-OFL.txt |
| `ofl/shipporiminchob1/ShipporiMinchoB1-Regular.ttf` | BGS Press Mincho | SIL OFL 1.1, Shippori-Mincho-B1-OFL.txt |

IM FELL English provides uneven, worn print contours; Shippori Mincho B1 provides
ink-pooling details in Japanese. The subsets are not original typeface designs.
Copyright and license records are preserved. Both use `font-display: swap` and
system serif fallbacks. The site's existing primary fonts are unchanged.

## Rebuild after changing notices

The subsets cover the supplemental classes selected in
`scripts/build_print_fonts.py`, plus Latin and punctuation. New characters use a
system fallback until rebuilt. Rebuild after changing Japanese notices.

1. Download the two original TTF files from
   `https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/`
   followed by each source path above, into a directory outside the checkout.
2. In a temporary Python environment, install `fonttools[woff]==4.61.1` and
   `brotli==1.2.0` (build tools only, no public-site runtime dependency).
3. From the repository root, run:

   ```sh
   python scripts/build_print_fonts.py /path/to/original-ttfs
   ```

The script verifies original SHA-256 hashes, subsets without altering outlines,
renames family identifiers and writes the two WOFF2 files. Keep TLS verification
and source checksum verification enabled. Commit regenerated assets with notice
changes. Verify actual custom-font rendering, main text retaining its original
font, and system fallbacks when local WOFF2 requests fail.
