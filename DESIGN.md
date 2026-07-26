# MeetPrerna — Design (`DESIGN.md`)

**Version:** 1.0 · **Date:** 2026-07-25 · **Replaces:** `designs.md` (686 lines)

Delete `designs.md` once this is in the repo.

---

## 1. The brand colour is locked. Neon stays.

`--color-inchworm` `#C4FF61` is the brand. It does not change to suit the four pillars.

That call is correct and my earlier one was not. Pillars are not expressed through hue. A calm site is not a green-grey site. It is a site with **one loud thing per screen, a lot of space, and no pressure**. You can be calm in neon. You cannot be calm in clutter.

So the neon stays and the discipline moves to **quantity, placement and pacing**. Those are the levers, and they are enforceable in a way that "make it feel meditative" is not.

---

## 2. Two corrections that are not taste

These are defects in `designs.md` §2.1 and §2.4, not preferences.

**One.** `--color-ink-50` `#545454` on `--color-ink` `#1A1A1A` is documented at 3.2:1. Measured, it is **2.34:1**. It fails the 3:1 floor for non-text UI, which is what it is used for (disabled controls, borders). Replaced with `#6B6B6B` at **3.27:1**.

**Two.** The grey scale is not monotonic. `ink-20` `#3a3a3a` is *darker* than `ink-50` `#545454`, and sits two hex points from `ink-70` `#363636`. Two near-identical tokens with contradictory names. An agent will pick the wrong one. Renumbered below.

**Three, and this one is taste but it is load-bearing.** `--color-marigold` `#EAFF27` is deleted. Two neons 20 degrees apart do not read as two signals. They read as one blurry signal, and then neither says "act here". One accent means the accent means something.

---

## 3. Tokens

```css
/* src/styles/tokens.css — the only place colour exists */
:root {
  /* Surfaces, monotonic light to dark */
  --color-ink:        #1A1A1A;  /* base canvas */
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

Deleted: `--color-marigold`, `--color-ink-90`, `--color-ink-70`, `--color-ink-50`, `--color-ink-20`, `--color-warning`.

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

---

## 4. The accent budget

This is how neon stays neon without becoming a energy drink. Four rules, all checkable.

**Rule 1 — the 3% rule.** Accent occupies no more than roughly 3% of visible pixels in any viewport. In practice: **one filled accent element per screen.** One button, or one active chip, or one line. Not all three. If you can see two filled neon things at once, cut one.

**Rule 2 — role lock.** Accent only ever means "act here" or "you are here". It is a functional signal, never decoration. If a thing is not clickable and not a state, it does not get accent. This alone removes 90% of the overdone cases.

**Rule 3 — the dilution ladder.** When you need accent presence without accent weight, step down instead of shrinking:

| Step | Treatment | Use |
|---|---|---|
| 1 | Solid `--color-inchworm` fill | Primary CTA. One per page. |
| 2 | 1px `--color-inchworm` line or underline | Active nav, focus ring, the session line |
| 3 | `--color-inchworm-tint` at 12% on ink | Selected filter chip, active row |
| 4 | Dim glow, `0 0 24px rgb(196 255 97 / 0.15)` | Hover on the primary CTA only |

Most of the site lives at step 2 and 3. Step 1 appears about six times in the whole build.

**Rule 4 — never.** Accent is never on: body text, headings, backgrounds larger than a button, borders of non-interactive elements, gradients, non-interactive icons, more than one filled element per viewport.

---

## 5. Where the pillars actually live

Not in the palette. In these.

| Pillar | Expressed through | Concretely |
|---|---|---|
| **Meditation** | Pacing | One idea per viewport. 900ms narrative reveals. Nothing competing for attention at the same moment. Space between sections at 96px minimum, 192px on desktop. |
| **Calmness** | Quantity restraint | The 3% rule *is* calmness. One accent, one focal point, hairlines instead of boxes, no drop shadows. |
| **Therapy** | Absence of pressure | No countdown. No "only 2 slots left". No exit popup. No newsletter interstitial. No fake scarcity anywhere, ever. This is a hard ban. |
| **Psychology** | Information order | Answer the fear before asking for the booking. `/sanctuary` puts pain, hygiene and cost before the CTA, not after. |

If someone says the site does not feel calm enough, the fix is in this table. It is never "make the green softer".

---

## 6. Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Cormorant Garamond** | Weight **500 or 600** at display sizes. Never 300 or 400 — hairlines vanish on a dark ground. `DECISIONS.md` D4.1. |
| Body and UI | **Inter** | Reliable at 16px on mid Android. The PRD's own MG12 fallback. |
| Accent serif | **Tinos** | Metric-compatible with Times New Roman. **Testimonial quotes only**, italic. Do not load it if it has no role. `DECISIONS.md` D4.2, D4.3. |
| Metadata | **JetBrains Mono** | Year, medium, dimensions, placement, session count. |
| Devanagari | **Noto Sans Devanagari** | Fallback. |

MG12 stays parked until its licence clears. Times New Roman is replaced by Tinos, which is metric-compatible and actually loadable on the web. `PRD.md` §10 Q6 parked the MG12 licence and made Phase 1 depend on it. Nothing here has an open licence.

```css
--text-display-xl: clamp(3.25rem, 11vw, 10rem);  /* line-height 0.92 */
--text-display-l:  clamp(2.25rem, 6vw, 5rem);    /* line-height 0.98 */
--text-h1: 2rem;  --text-h2: 1.5rem;  --text-h3: 1.25rem;
--text-body-l: 1.125rem;  --text-body: 1rem;  --text-caption: 0.875rem;
--text-mono: 0.75rem;  /* uppercase, 0.08em tracking */
```

**Two display sizes only.** Nothing between `display-l` and `h1`. This restriction is what creates the identity, the same way Floema's does.

Body never below 16px on mobile. Line height 1.6 body, 1.15 headings, 0.92 display. Measure 62 to 70ch desktop, 38 to 52ch mobile.

**Eyebrows are banned, with one narrow exception.** Decorative labels above a heading stay banned — that was the AI-slop pattern `PRODUCT.md` named. **Section labels on long scrolls are permitted**: `/` and `/sanctuary` only, mono, sentence case, `--color-ivory-dim`, one per section, never above the H1, and only where a reader would otherwise lose their place. `BLUEPRINT.md` §4e. Mono is otherwise for real metadata only: `2025 · Forearm · 2 sessions`.

**Numbering is allowed only on real sequences.** The five steps on `/sanctuary` are a sequence, so `01` to `05` is honest there, the way Floema numbers its five collections. The work grid is not a sequence. Do not number it.

---

## 7. Space, grid, shape

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Nothing off-scale.
- 12 columns, 1440 max canvas, 1200 max content — **for contained sections and prose.** Statement sections use the two-anchor mode in §12 instead, which spans to a 32px gutter.
- Section rhythm: 96px mobile, 192px desktop. This is where the calm comes from.
- Radius: `0` on media and cards. `2px` on inputs and buttons. Pills on filter chips only.
- **No drop shadows on the dark canvas.** Depth is surface tone, a hairline, or the step-4 glow.

---

## 8. Glass

Two surfaces only: the sticky header and the lightbox chrome. `backdrop-filter: blur(12px)` maximum. Never behind body text. Always a solid fallback where `backdrop-filter` is unsupported.

---

## 9. Light mode

Two places, both deliberate:

1. **`/portfolio/[slug]`** when the piece's medium is Painting or Sketch. Not the archive grid, which stays dark and consistent.
2. **The lower half of the home page**, after the still band. One ground shift, one direction, never back. `BLUEPRINT.md` §4c.

The logic in both cases is the same: ink for the work, paper for the words.

`--color-ivory` ground, `--color-ink` text. **Accent on light must be `--color-inchworm-deep`, and even that is 2.0:1 on ivory, which fails for text.** On light, the accent is used only as a fill behind dark text, or as a 2px underline. Never as text colour. This is the one place the accent changes behaviour.

---

## 12. Two-anchor layout — the statement mode

**Added 2026-07-26.** A second layout mode alongside the contained grid, for statement sections only.

**The shape.** Content is pinned to the left gutter and the right gutter. The middle is empty and stays empty. Display type sits left at `--text-display-xl`; supporting copy sits right at `--text-body`, still within measure. The gap between them does the work.

```
GUTTER                                                    GUTTER
│                                                              │
│ PSYCHOLOGY                              Choosing to mark     │
│                                         your skin is a       │
│                                         decision about who   │
│                                         you are becoming.    │
│                                                              │
```

**Gutters.** 32px desktop, 24px mobile. Not the 1200px content cap.

That cap stays for prose-led pages, where a centred measure is correct. It does not apply here. A statement section spans the full canvas and lets the type reach the edge, which is the entire point — a headline stopping 120px short of the screen edge on a 1440 display reads as timid.

**The empty middle is the design.** Do not fill it with an image, a rule, or a decorative mark. The scale contrast between a 10rem word and a 16px sentence only reads when there is distance between them. Anything in the gap collapses the effect.

**Where it applies:**
- Block 05, the four pillars. Strongest fit — the content is already name-plus-sentence.
- Block 02b, thesis and stats. Already this shape; widen it to the gutters.
- Block 06, process steps.
- `/sanctuary` — the pain and hygiene sections.
- `/about` — each section heading.

**Where it does not:**
- `/portfolio` archive grid. It has filters and needs to scan.
- Any long-form prose. Measure rule still governs at 62-70ch.
- `/consulting`, `/contact`, `/privacy`, `/terms`. Short pages; the mode needs vertical room to breathe.

**Breakpoints.** Two anchors need width. Below 1024 the gap collapses and the two columns crowd each other, which looks like a bug rather than a decision. Stack below 1024: display type first, copy beneath it, both left-aligned to the gutter.

**Measure still applies to the right column.** 38 to 52ch. It is a narrow column at the right edge, not a second wide block.

**No letter or number markers.** Athletics puts a small `A` and `B` beside each statement. Skip it. `DESIGN.md` §6 permits numbering only on real sequences, and the reason is that a marker which conveys nothing is decoration. Four pillars are a set, not an order, and letters would be exactly as empty as numbers. The pillar names are the markers.

**Vertical rhythm inside the mode.** Each statement gets its own generous block — 192px desktop between them, minimum. The mode fails when statements are packed; it needs the vertical space as much as the horizontal.

---

## 10. Banned outright

Gradient text. Hero counters and stat blocks. Eyebrow labels. Emoji as icons. Mixed icon sets. Decorative dividers with no structural meaning. Numbering on anything that is not a sequence. `transition: all`. Stock photography. Countdown timers. Fake scarcity. Exit-intent popups. Two filled accent elements in one viewport.
