# Implementation Plan — Six Changes

## 1. Portfolio data (portfolio.ts)
Replace with 18 pieces: 13 existing tattoos + 4 paintings + 1 sketch.
New paintings: abstract-reverie, figures-in-motion, waterlilies, ink-portrait
New sketch: gesture-study
Image files for new pieces don't exist yet — add entries, they'll work when images land.

## 2. Archive grid — restore medium filter
Add "All / Tattoo / Painting / Sketch" row above motif chips.
Placement filter hidden when medium is Painting or Sketch.
Motif chips always visible.
Add URL search param support (`?medium=tattoo`) so home index links work.

## 3. /portfolio hero — update copy
H1: "The archive."
Sub: "Tattoos, paintings and sketches, in one place, because they are one practice."

## 4. /portfolio/[slug] detail — full light mode for paintings/sketches
Conditional metadata:
- Tattoo: `placement · motifs` (current, unchanged)
- Painting/Sketch: `dimensions · Available/NFS` (new)
Light mode is already wired (`isLight`), needs:
- Correct metadata rendering per medium
- `.light .metaItem` color fix for proper contrast on ivory
- Add `.available` green dot or text for paintings

## 5. Home block 02 — restore 3-row index
Three rows: 01 Tattoos (13), 02 Paintings (4), 03 Sketches (1)
Each links to `/portfolio?medium=...`
Keep scroll cue below.

## 6. About — training section
Insert after "How this started" block:
- Diploma text from content.md §5b
- "I have been tattooing since 2021"
- Witch Art Tattoos named
Add `prerna-with-work.jpg` image beside this section
Replace TODO duration in "Where to find me" with real copy

## 7. Terms — real deposit policy from Q8
Deposit after design agreed. ₹500/₹1000/₹1500/₹2000 tiers (no sizes). Non-refundable but carries forward on any reschedule. Lost only if client ghosts.

## 8. Phone number report
Three numbers conflict:
- site.ts: 917738147935
- CV: +91 8840833827
- Hardcoded fallback: 919820012345
Report and stop.

## Files touched
src/content/portfolio.ts (rewrite)
src/app/portfolio/ArchiveGrid.client.tsx (medium filter + search params)
src/app/portfolio/page.tsx (hero copy)
src/app/portfolio/page.module.css (medium filter styles)
src/app/portfolio/[slug]/page.tsx (conditional metadata + light mode)
src/app/portfolio/[slug]/page.module.css (light mode styles, available/dimensions)
src/app/page.tsx (3-row index)
src/app/page.module.css (3-row index — restore old multi-row)
src/app/about/page.tsx (training section + image)
src/app/about/page.module.css (training section + image styles)
src/app/terms/page.tsx (real deposit policy)
src/app/sanctuary/page.tsx (FAQ Q8 update)

## Verify
pnpm typecheck && pnpm lint && pnpm build
pnpm a11y (all routes, 360 + 1440)
Screenshots: /portfolio filtered to Painting, one painting detail at 360 + 1440
grep "six years|seven years" — zero
First Load JS for /portfolio
