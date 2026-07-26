# Rule: Design System

Full spec: `@/DESIGN.md`. Motion: `@/.agents/rules/20-motion-performance.md`.

## Colour lives in one file

`src/styles/tokens.css`. No raw hex, rgb or hsl anywhere else. Not in a component, not in a Tailwind class, not in a shader uniform default.

```css
--color-ink:        #1A1A1A;   /* canvas */
--color-ink-100:    #212121;   /* raised */
--color-ink-200:    #2A2A2A;   /* hover surface */
--color-ink-300:    #363636;   /* decorative hairline ONLY, 1.4:1 */
--color-ink-500:    #6B6B6B;   /* meaningful border, disabled, 3.3:1 */
--color-ivory:      #FDFFE9;   /* body text, 17.2:1 */
--color-ivory-dim:  #C9CBB6;   /* captions, 10.4:1 */
--color-inchworm:      #C4FF61; /* THE accent, 14.8:1 */
--color-inchworm-deep: #9FCC4A; /* pressed, 9.3:1 */
--color-inchworm-tint: rgb(196 255 97 / 0.12);
--color-danger:  #FF6B6B;       /* 6.3:1 */
--color-focus:   var(--color-inchworm);
```

Deleted, never to return: `--color-marigold`, `--color-ink-90`, `--color-ink-70`, `--color-ink-50`, `--color-ink-20`.

Two of these are bug fixes, not preferences: the old `ink-50` `#545454` was documented at 3.2:1 and measures **2.34:1**, failing the non-text floor. And the old scale was non-monotonic, with `ink-20` darker than `ink-50`.

## The accent budget

The neon is the brand colour. Subtlety comes from quantity, not hue.

1. **One filled accent element per viewport.** One button, or one active chip, or one line. Never all three. If you can see two filled neon things at once, cut one.
2. **Role lock.** Accent means "act here" or "you are here". Never decoration. Not clickable and not a state means no accent.
3. **Dilution ladder.** Solid fill → 1px line → 12% tint → dim glow. Most of the site is at steps 2 and 3. Solid fill appears about six times in the whole build.
4. **Never** on: body text, headings, backgrounds larger than a button, borders of non-interactive elements, gradients, non-interactive icons.

## Pillars are not a colour

| Pillar | Lever |
|---|---|
| Meditation | Pacing. One idea per viewport. 96px section rhythm mobile, 192px desktop. |
| Calmness | Quantity. The one-accent rule is the calm. |
| Therapy | No pressure patterns. No countdown, no fake scarcity, no exit popup. Hard ban. |
| Psychology | Information order. Answer the fear before asking for the booking. |

## Typography

**Cormorant Garamond** (display, weight 500/600 only — never 300/400, hairlines vanish on dark). **Inter** (body, UI). **Tinos** (accent serif, testimonial quotes only, italic — do not load without a role). **JetBrains Mono** (metadata). Noto Serif Devanagari (fallback). All OFL, all self-hosted. `DECISIONS.md` §5.

- **Two display sizes only:** `clamp(3.25rem, 11vw, 10rem)` and `clamp(2.25rem, 6vw, 5rem)`. Nothing between `display-l` and `h1`.
- Body never below 16px on mobile. Line height 1.6 body, 1.15 headings, 0.92 display.
- Measure 62 to 70ch desktop, 38 to 52ch mobile. **Body and sub-headings only.** Display headlines are exempt — a 3-word line has no return-sweep problem. Let display type run to 70-75% of its container.
- **Eyebrows are banned.** Mono is for real metadata only: `2025 · Forearm · 2 sessions`. Never above a heading.
- **Numbering only on real sequences.** The five steps on `/sanctuary` qualify. The work grid does not.

## Space and shape

Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Nothing off-scale. Radius `0` on media and cards, `2px` on inputs and buttons, pills on filter chips only. **No drop shadows on the dark canvas.**

**Two layout modes.**
- **Contained:** 12 columns, 1440 canvas, 1200 content. For grids and long-form prose.
- **Two-anchor:** display type pinned to a 32px left gutter, supporting copy pinned right, middle deliberately empty, spanning the full canvas. For statement sections only — the pillars, the thesis strip, process steps, `/sanctuary` sections. Stacks below 1024. `DESIGN.md` §12.

The empty middle in two-anchor **is** the design. Do not fill it with an image, a rule or a mark — the scale contrast between a 10rem word and a 16px sentence only reads across distance.

**Ground shift.** The home page begins on `--color-ink` and ends on `--color-ivory`, changing once behind the full-bleed photo in block 05b. No scrub, no crossfade. On the light half the accent is fill-only — `--color-inchworm` as text on ivory is ~2:1 and fails. `BLUEPRINT.md` §4c.

## Glass

Sticky header and lightbox chrome only. `blur(12px)` max. Never behind body text. Always a solid fallback.

## Light mode

`/portfolio/[slug]` only, and only when the piece's medium is Painting or Sketch. Not a whole route — the archive grid itself stays dark. Ivory ground, ink text. **The accent fails contrast for text on ivory (2.0:1).** On light it may only be a fill behind dark text, or a 2px underline. Never text colour.

## Banned

Gradient text. Hero counters. Eyebrows. Emoji icons. Mixed icon sets. Numbering on non-sequences. `transition: all`. Stock photography. Countdown timers. Fake scarcity. Exit popups. Two filled accents in one viewport.
