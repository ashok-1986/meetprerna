# Plan: Block 01 — Hero Portrait (Home)

---

## What we are building

The home page hero. Full-bleed portrait (`origin.jpg`), headline overlaid, with two sequenced CSS animations on mount: an M16 ink-bleed mask reveal on the image (starting 40% open), then an M1 clip-path reveal on each headline line. No CTA (header CTA handles conversion). Bottom of viewport: a scroll cue in mono type.

---

## Files to create

```
src/
  components/
    hero/
      Hero.tsx                         — server component, renders shell + image + content
      Hero.css                         — all styles + CSS animations
public/images/hero/origin.jpg          — portrait (REQUIRED before any build)
```

No `src/animations/` files yet. No client component file. No GSAP import.

## Files to edit

```
src/app/page.tsx                      — replace demo content with <Hero />
```

---

## Implementation phases

### Phase 1: wait for image

**Do not start until `public/images/hero/origin.jpg` exists.** Every phase below depends on it for contrast verification and per-breakpoint `object-position` tuning.

### Phase 2: hero module

Create `src/components/hero/Hero.tsx` (server component — no `"use client"`):

1. Renders `<section id="hero">` — full viewport, `overflow: hidden`, `position: relative`.
2. Next.js `<Image>` with `src={originImage}`, `priority`, `sizes="100vw"`, `alt="Prerna Bhardwaj"`.
3. Image wrapper gets the M16 mask animation.
4. Headline rendered as plain `<h1>` with each line in its own `<span>`.
   - Headline spans are `aria-hidden="true"`; the `<h1>` carries `aria-label="Prerna Bhardwaj\nTattoo artist & painter"`.
5. Subtitle: `<p>` with `--color-ivory-dim`, `--text-body-l`.
6. Scroll cue: `<div>` with JetBrains Mono `--text-mono` text (e.g. `SCROLL`), `--color-ivory-dim`, bottom of viewport, plus a 1px decorative line.
7. Reduced motion path: no animation classes applied, everything visible immediately.

### Phase 3: styles + animations (Hero.css)

Create `src/components/hero/Hero.css`:

**Layout:**
- `#hero`: 100vh (100dvh via `@supports`), full bleed, `position: relative`, `overflow: hidden`.
- `.hero-image`: `position: absolute`, inset 0, `z-index: 0`.
  - Image inside gets `object-fit: cover`, `width: 100%`, `height: 100%`.
- `.hero-overlay`: optional subtle gradient at bottom via `background: linear-gradient(transparent, var(--color-ink))` at 40–60% height.
- `.hero-content`: `position: absolute`, bottom-left aligned, padding matches content margin, `z-index: 1`, `pointer-events: none` (catches clicks through to header).

**M16 — ink-bleed mask reveal (CSS only):**
- Target: `.hero-image` (the image wrapper).
- Initial state: `mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 42%)`, `mask-size: 100%`, `-webkit-mask-image:` (same).
  - Starts 40% open so Chrome registers meaningful LCP pixels immediately.
- Final state (after animation): `mask-image: radial-gradient(circle at 50% 50%, black 100%, transparent 102%)`.
- Transition: `mask-image 800ms var(--ease-out)`.
- `.hero-image.scale-settle`: `transform: scale(1.15)` initially, transitions to `scale(1)` over 800ms same easing.
- **Trigger**: add class `.is-revealed` to `#hero` on mount via a small inline script or `useEffect` in a minimal client wrapper. (One readable alternative: put the trigger on a `<link rel="stylesheet" href="..." media="print" onload="...">` polyfill pattern; cleanest is a tiny `"use client"` component with a `useEffect` that adds the class after hydration.)

**M1 — per-line clip-path reveal (CSS only):**
- Target: each `.hero-line` span.
- Initial state: `clip-path: inset(0 0 100% 0)`.
- Final: `clip-path: inset(0)`.
- Each span gets `--i` set inline (0, 1, 2...).
- Transition: `clip-path 700ms var(--ease-out)` with `transition-delay: calc(var(--i) * 60ms + 200ms)`.
  - +200ms delay so M1 starts slightly after M16 begins (overlap, not sequence).

**Subtitle fade:**
- Initial: `opacity: 0`, `transform: translateY(12px)`.
- Final: `opacity: 1`, `transform: translateY(0)`.
- Transition: `opacity 600ms var(--ease-out)`, `transform 600ms var(--ease-out)`.
- Delay: 900ms (after M1 lines mostly revealed).

**Scroll cue:**
- `.scroll-cue`: JetBrains Mono, `--text-mono`, `--color-ivory-dim`, `text-transform: uppercase`, `letter-spacing: 0.08em`.
- Position: `position: absolute`, `bottom: 32px`, `left: 50%`, `transform: translateX(-50%)`.
- Plus a single 1px `--color-ink-500` line centred above it, 24px wide.
- Fades in via the same 600ms opacity transition as the subtitle.
- No filled accent in this block.

**Reduced motion (`prefers-reduced-motion: reduce`):**
- All transitions set to `transition: none` or `animation: none`.
- `.hero-image` starts at `transform: scale(1)`, `mask-image: none`.
- `.hero-line` starts with `clip-path: none`.
- Subtitle and scroll cue start `opacity: 1`, `transform: none`.

### Phase 4: wire into the page

4. Edit `src/app/page.tsx`:
   - Remove demo content.
   - Import `<Hero />`.
   - Header already has `position: fixed` (from existing `header.module.css` — verify) and overlays the hero. If not, the header should have `z-index: 10` and sit above the hero.
   - `<Header />` before `<Hero />` in the tree is fine since Header is fixed-positioned.

### Phase 5: verify

5. Visual checks at 360, 768, 1440px:
   - `object-position` tuned so her face is not cropped at any breakpoint.
   - Text contrast against the photograph passes at all sizes (verify against real `origin.jpg`).
6. Run `pnpm typecheck && pnpm lint && pnpm build` — must all pass.
7. Run `pnpm a11y` — must pass.
8. **Measure LCP on Lighthouse mobile.** Report the number. If > 2.0s, either reduce mask duration or increase the initial reveal percentage. This is a test, not an estimate.
9. Reduced-motion check: animations skip, content fully visible.
10. Take screenshots at 360, 768, 1440.

---

## Animation sequence (timeline, CSS-driven)

```
t=0ms       .is-revealed class added
            M16: mask-image transitions from 40% → 100% (800ms, ease-out)
            Image scale: 1.15 → 1 (800ms, ease-out, same CSS transition)

t=200ms     M1 line 0 clip-path: inset(0 0 100% 0) → inset(0) (700ms ease-out)
t=260ms     M1 line 1 starts (60ms stagger)
t=320ms     M1 line 2 starts
t=360ms     M1 line 3 starts

t=900ms     Subtitle opacity 0→1 + translateY 12px→0 (600ms ease-out)
            Scroll cue opacity 0→1 + translateY 12px→0 (600ms ease-out)

t=1500ms    All settled.
```

Total ~1.5s, within narrative budget.

---

## Copy (needs confirmation from prerna)

- **Line 1:** `Prerna Bhardwaj`
- **Line 2:** `Tattoo artist & painter`
- **Subtitle:** `Mumbai · Navi Mumbai · Travelling`
- **Scroll cue:** `SCROLL` (or `DISCOVER` or the three-verb triad from the brief)

Confirm with prerna before shipping.

---

## Design constraints checked

| Rule | Status |
|---|---|
| One filled accent per viewport | No filled accent in hero (CTA moved to header) |
| Accent means "act here" | Header CTA handles this |
| No accent on body text, headings, backgrounds | — |
| No gradient text, no eyebrow labels | — |
| Text on black-ground image (origin.jpg blends into --color-ink) | Natural with origin.jpg |
| Fraunces display / Inter body / JetBrains Mono metadata | Matches |
| No drop shadows | Using surface tone + hairline only |
| Scroll cue (mono, dim, 1px line) | `--text-mono`, `--color-ivory-dim`, `--color-ink-500` hairline |

---

## Motion constraints checked

| Rule | Status |
|---|---|
| Animate only transform, opacity, clip-path, filter | M16: `mask-image` + `transform: scale`; M1: `clip-path`; subtitle: `opacity` + `translateY` |
| No `ease-in` on UI | All use `var(--ease-out)` |
| No `scale(0)` | M16 starts at 1.15 |
| Narrative budget 400–900ms per move | M16 800ms, M1 700ms, subtitle 600ms |
| Reduced motion path | All content visible, no transitions, no clip-path, scale settles to 1 |
| `prefers-reduced-motion: reduce` blocks all | Checked |
| Split text a11y | `aria-hidden="true"` lines, `aria-label` on `<h1>` |
| No GSAP import on `/` | All CSS, no JS motion library |

---

## LCP strategy

- `origin.jpg` is the LCP element. `<Image priority />` preloads it.
- **Mask starts 40% open** so meaningful pixels are painted immediately. Chrome can register LCP on the partially-unmasked image.
- Mask uses `mask-image` with a CSS transition (not `clip-path`), composited by the browser.
- Image `sizes="100vw"` ensures the correct source is selected.
- Measured LCP from Lighthouse mobile is the merge gate. If > 2.0s, one of:
  - Increase initial reveal to 50–60%.
  - Reduce M16 duration to 500ms.
  - Move `mask-image` off the critical path and let the image render unmasked first, then mask in after paint.
- Report the actual number.

---

## Blocker

`public/images/hero/origin.jpg` does not exist (only `.gitkeep`). Building phase cannot start until the file is in place. The three verification steps that depend on it:

1. Text contrast over the actual photograph (can only verify with the real image).
2. `object-position` per breakpoint so her face is not cropped.
3. LCP measurement on a real image load.

---

## When the image arrives, I will:

1. Copy `origin.jpg` into `public/images/hero/`
2. Create `Hero.tsx` + `Hero.css`
3. Edit `page.tsx`
4. Run `pnpm typecheck && pnpm lint && pnpm build && pnpm a11y`
5. Take screenshots at 360/768/1440
6. Report measured LCP from Lighthouse mobile
