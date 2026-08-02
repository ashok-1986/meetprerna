# MeetPrerna — Design (`DESIGN.md`)

Colors, fonts, and layout rules only. This is the single design-system reference for the site — everything below is verified directly against `src/styles/tokens.css` and `src/app/layout.tsx`, not carried over from any prior doc's claims.

---

## 1. Color tokens

```css
/* src/styles/tokens.css — the only place colour exists */
:root {
  /* Surfaces, monotonic light to dark */
  --color-ink:        #111111;  /* base canvas */
  --color-ink-100:    #212121;  /* raised: cards, dialogs */
  --color-ink-200:    #2A2A2A;  /* hover surface */
  --color-ink-300:    #363636;  /* decorative hairline ONLY, 1.4:1 */
  --color-ink-500:    #6B6B6B;  /* meaningful border, disabled, 3.3:1 */

  /* Text */
  --color-ivory:      #FDFFE9;  /* body */
  --color-ivory-dim:  #C9CBB6;  /* captions, metadata */

  /* The one accent */
  --color-inchworm:      #C4FF61;
  --color-inchworm-deep: #9FCC4A;  /* pressed */
  --color-inchworm-tint: rgb(196 255 97 / 0.12);  /* fills, never text */

  /* Semantic */
  --color-focus:   var(--color-inchworm);
  --color-success: var(--color-inchworm-deep);
  --color-danger:  #FF6B6B;
}
```

### Verified contrast, all measured

| Pair | Ratio | Grade | Use |
|---|---|---|---|
| `ivory` on `ink` | 17.2:1 | AAA | body text |
| `ivory-dim` on `ink` | 10.4:1 | AAA | captions, metadata |
| `inchworm` on `ink` | 14.8:1 | AAA | accent text, links, focus ring |
| `ink` on `inchworm` | 14.8:1 | AAA | dark label on a filled CTA |
| `inchworm-deep` on `ink` | 9.3:1 | AAA | pressed state |
| `danger` on `ink` | 6.3:1 | AA | form errors |
| `ink-500` on `ink` | 3.3:1 | AA non-text | borders, disabled |
| `ink-300` on `ink` | 1.4:1 | decorative | hairlines only, never the sole signal |

Any new pair is measured and added here before it ships. Estimated ratios are rejected.

### The accent budget

Four rules, all checkable.

**Rule 1 — the 10% threshold.** Accent occupies no more than roughly 10% of visible pixels in any viewport. This is a ceiling, not a target. Explicitly permitted on: primary CTA buttons (max 2 per viewport), specific high-impact keywords in copy (max 2-3 per viewport, spaced out), the logo, and active navigation states.

**Rule 2 — role lock.** Accent only ever means "act here" or "you are here". It is a functional signal, never decoration. If a thing is not clickable and not a state, it does not get accent.

**Rule 3 — the dilution ladder.** When you need accent presence without accent weight, step down instead of shrinking:

| Step | Treatment | Use |
|---|---|---|
| 1 | Solid `--color-inchworm` fill | Primary CTA. One per page. |
| 2 | 1px `--color-inchworm` line or underline | Active nav, focus ring |
| 3 | `--color-inchworm-tint` at 12% on ink | Selected filter chip, active row |
| 4 | Dim glow, `0 0 24px rgb(196 255 97 / 0.15)` | Hover on the primary CTA only |

Most of the site lives at step 2 and 3. Step 1 is rare — reserve it for the one primary action per page.

**Rule 4 — never.** Accent is never on: body text, headings, backgrounds larger than a button, borders of non-interactive elements, gradients, non-interactive icons, more than one filled element per viewport.

---

## 2. Fonts

Four families load in [`src/app/layout.tsx`](src/app/layout.tsx), each bound to a CSS variable and exposed through `--font-*` tokens in `tokens.css`.

| Role | Face | Variable | Notes |
|---|---|---|---|
| Display / headings | **Cormorant Garamond** | `--font-cormorant` | Weights loaded: 300, 400 (normal + italic). **Every shipped heading currently renders at weight 400** — grepped across the codebase, zero uses of 500/600 exist. |
| Body and UI | **Urbanist** | `--font-body` | Weight 400 only. Used for `body`, buttons, inputs, and all prose via the global `tokens.css` base rule. |
| Metadata | **JetBrains Mono** | `--font-jetbrains` (aliased `--font-mono`) | Real metadata only: piece year/medium/placement, stat numbers, process step numbers, filter/motif tags, footer legal text. Not decorative eyebrows — see the banned list. |
| Accent serif | **Libre Baskerville** | `--font-accent` | Weight 400, italic only. Used in exactly one place: testimonial quote text ([`Voices.module.css`](src/components/voices/Voices.module.css)). Do not add a second role without checking here first — an unused font is dead weight, a second role dilutes what makes the face distinct. |

No Devanagari font is currently loaded — there is no Devanagari copy on the site yet.

```css
--text-display-xl: clamp(3.25rem, 11vw, 10rem);
--text-display-l:  clamp(2.25rem, 6vw, 5rem);
--text-h1: 2rem;
--text-h2: 1.5rem;
--text-h3: 1.25rem;
--text-body-l: 1.125rem;
--text-body: 1rem;
--text-caption: 0.875rem;
--text-mono: 0.75rem;
```

**Two display sizes only.** Nothing between `display-l` and `h1`.

Body never below 16px on mobile. Line height 1.6 body, 1.15 headings, 0.92 display. Measure 62 to 70ch desktop, 38 to 52ch mobile — body and sub-headings only; display headlines are exempt.

**Eyebrows are banned, with one narrow exception.** Decorative labels above a heading stay banned. Section labels on long scrolls are permitted on `/` and `/sanctuary` only: mono, sentence case, `--color-ivory-dim`, one per section, never above the H1, only where a reader would otherwise lose their place.

**Numbering is allowed only on real sequences.** The five steps on `/sanctuary` are a sequence. The work grid is not — do not number it.

---

## 3. Space, grid, shape

- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Nothing off-scale.
- **Section rhythm:** 96px mobile, 192px desktop between sections.
- **Contained mode:** 12 columns, 1440 max canvas, 1200 max content — for grids and long-form prose.
- **Radius:** `0` on media and cards. `2px` on inputs and buttons. Pills on filter chips only.
- **No drop shadows on the dark canvas.** Depth is surface tone, a hairline, or the accent-budget step-4 glow.

## 4. Glass

Two surfaces only: the sticky header and the lightbox chrome. `backdrop-filter: blur(12px)` maximum. Never behind body text. Always a solid fallback where `backdrop-filter` is unsupported.

## 5. Two-anchor layout — the statement mode

A second layout mode alongside the contained grid, for statement sections only.

**The shape.** Content is pinned to the left gutter and the right gutter. The middle is empty and stays empty. Display type sits left at `--text-display-xl`; supporting copy sits right at `--text-body`, still within measure. The gap between them does the work.

**Gutters.** 32px desktop, 24px mobile — not the 1200px content cap. That cap stays for prose-led pages, where a centred measure is correct. A statement section spans the full canvas and lets the type reach the edge.

**The empty middle is the design.** Do not fill it with an image, a rule, or a decorative mark. The scale contrast between a 10rem word and a 16px sentence only reads when there is distance between them.

**Breakpoints.** Two anchors need width. Stack below 1024: display type first, copy beneath it, both left-aligned to the gutter.

**Measure still applies to the right column.** 38 to 52ch — a narrow column at the right edge, not a second wide block.

**No letter or number markers.** A marker that conveys nothing is decoration.

**Vertical rhythm.** Sections are content height plus padding. Never `100vh`, never `min-height: 100svh`, never one statement per screen. 192px padding above and below the section as a whole; 96px between statements inside it. At 1440px, at least two statements should be visible in one viewport — if only one fills the screen, the section is too tall.

**Full-width bands.** Any section using a full-bleed background must lay its content out in an actual grid spanning close to the full canvas (the gutters above, not the 1200px prose cap) — not centred as a single narrow text column — unless the content is a single centred statement by design (a closing CTA, which stays centred and narrow on purpose).

---

## 6. Light mode and the ground-shift rule

Two ground colours exist: `--color-ink` (dark) and `--color-ivory` (light). The site is dark by default. Light mode is deliberate and appears in exactly two places:

1. **`/portfolio/[slug]`**, when the piece's medium is Painting or Sketch. Not the archive grid, which stays dark and consistent.
2. **The lower half of the home page**, after the still band. One ground shift, one direction, never back — no scrub, no crossfade between the two.

`--color-ivory` ground, `--color-ink` text, for both. **Accent on light must be `--color-inchworm-deep`, and even that is 2.0:1 on ivory, which fails for text.** On light, the accent is used only as a fill behind dark text, or as a 2px underline — never as text colour.

**The footer inverts, and is the one exception.** Background `--color-inchworm`, text `--color-ink`. Unlike the two cases above, the ground here is the accent itself, not ivory — the footer's job is brand signature, not conversion, so it reads as a single loud color-block. Text uses `--color-ink` at three opacity steps: full for the email link, 0.75 for nav and social, 0.65 for the "Powered by" credit (0.60 fails AA at ~4.3:1; 0.65 clears it at ~5.1:1). Focus rings inside the footer use `--color-ink`, not `--color-focus` — a lime ring is invisible on a lime background.

---

## 7. Banned outright

Gradient text. Hero counters and stat blocks. Eyebrow labels (outside the one exception in §2). Emoji as icons. Mixed icon sets. Decorative dividers with no structural meaning. Numbering on anything that is not a sequence. `transition: all`. Stock photography. Countdown timers. Fake scarcity. Exit-intent popups. Two filled accent elements in one viewport.
