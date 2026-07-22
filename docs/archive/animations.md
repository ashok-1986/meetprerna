# MeetPrerna — Animation Choreography (`animations.md`)

> The exhaustive list of every motion in the site. Each section is a contract: triggers, easings, durations, easings, scrub vs. one-shot, and the reduced-motion counterpart.

---

## 0. Read this first

- All motion code lives in **`src/animations/`**, never inside components.
- Components import timeline factories and call them in a `useEffect` or a `useLayoutEffect` with cleanup.
- Lenis drives the global RAF. GSAP's ticker is **synchronized** to Lenis via `gsap.ticker.lagSmoothing(0)` and a `ScrollTrigger.scrollerProxy` if needed (Lenis v1 doesn't require it but we keep the seam).
- Every motion checks `usePrefersReducedMotion()` and either instantiates the no-motion variant or returns early.
- All easings are imported from `src/animations/easing.ts`. **No inline strings.**

```ts
// src/lib/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Observer } from 'gsap/Observer';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  Observer,
  InertiaPlugin,
  MotionPathPlugin,
  DrawSVGPlugin,
);

export { gsap, ScrollTrigger, SplitText, Observer, InertiaPlugin, MotionPathPlugin, DrawSVGPlugin };

// Singleton Lenis, ticking via gsap.ticker.
let lenis: Lenis | null = null;
export function getLenis(): Lenis {
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut-ish
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    gsap.ticker.add((time) => lenis!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return lenis;
}
```

```ts
// src/animations/easing.ts
export const ease = {
  studio:    'cubic-bezier(0.65, 0, 0.35, 1)',
  editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
  soft:      'cubic-bezier(0.25, 0.1, 0.25, 1)',
  glide:     'cubic-bezier(0.22, 1, 0.36, 1)',
  breath:    'cubic-bezier(0.45, 0, 0.55, 1)',
} as const;

export const dur = {
  d120: 0.12,
  d180: 0.18,
  d260: 0.26,
  d420: 0.42,
  d620: 0.62,
  d900: 0.9,
  d1400: 1.4,
} as const;
```

---

## 1. The five motion verbs (recap)

From [`designs.md` §7.3](./designs.md#73-the-five-motion-verbs):

1. **Enter** — element appears.
2. **Reveal** — content is uncovered.
3. **Lead** — element directs the eye.
4. **Respond** — element reacts to the user.
5. **Breathe** — idle ambient motion.

Every timeline in the site is one of these. The choreography below is organized by section; each row tells you *which verb* and *how*.

---

## 2. Global (every page)

### 2.1 Page enter (route change)

- **Verb:** Enter.
- **Trigger:** View Transitions API where supported, with a fallback. Implementation: a `usePageTransition` hook wrapping the `AnimatePresence`-equivalent.
- **Motion:**
  1. **Outgoing (260ms, `studio`):** Page root fades 1 → 0, `y: 0 → -16`. Custom cursor circle expands to 100vw and turns to `inchworm`.
  2. **Incoming (420ms, `editorial`):** Page root fades 0 → 1, `y: 24 → 0`.
- **Reduced motion:** Instant crossfade, 120ms.
- **Notes:** View Transitions is preferred (free, browser-native). Fallback uses a `gsap.timeline` with two stages. The cursor expansion is *not* in the View Transitions version — the cursor's exit is owned by the page-leave timeline, not the transition.

### 2.2 Cursor follow

- **Verb:** Respond.
- **Implementation:** A single `<CustomCursor>` mounted in the root layout. Uses `gsap.quickTo` to drive `x` and `y` (RAF-friendly, no re-tween). On every `pointermove`:
  - **Default:** `x, y` track the pointer with a 60ms lag. Radius 12px, `bg: ivory`, `opacity: 0.4`.
  - **Hover (link, button, [data-cursor="open"]):** radius → 4px, `bg: inchworm`, `opacity: 1`. A label appears 24px below.
  - **Drag (gallery, [data-cursor="drag"]):** radius → 28px ring, `border: 1.5px ivory`.
  - **Approach (display heading, [data-cursor="lead"]):** the heading's `font-variation-settings` shifts `wght` by `+100 * (1 - dist/100px)` clamped to [0, 100]. The cursor's `mix-blend-mode: difference` keeps it readable on any background.
- **Reduced motion:** Cursor disabled. System cursor only.
- **Touch:** Disabled via `useIsCoarsePointer()`.

### 2.3 Scroll progress bar

- **Verb:** Lead (subtle).
- **Trigger:** Scroll.
- **Motion:** A 2px bar at the top of the viewport. Width tracks `scrollY / scrollMax`. Color `--color-inchworm`. Easing is *inherent* to scrub (instant frame-by-frame).
- **Reduced motion:** Width still tracks (it's a status, not motion).

### 2.4 Header show/hide

- **Verb:** Respond.
- **Trigger:** Scroll direction.
- **Motion:** On scroll down, header translates `y: 0 → -100%` over 240ms `studio`. On scroll up, the reverse. On scroll to top, always visible.
- **Reduced motion:** Header is always visible.

### 2.5 Section reveal (default for any section)

- **Verb:** Reveal.
- **Trigger:** `ScrollTrigger` with `start: 'top 80%'`, `toggleActions: 'play none none reverse'`.
- **Motion:**
  1. Section's `opacity: 0 → 1` over 420ms `editorial`.
  2. Section's `y: 24 → 0` over 620ms `editorial`.
  3. Children stagger: `stagger: 0.06` over 420ms `editorial`.
- **Reduced motion:** Section visible immediately. `opacity: 1`, `y: 0`.

### 2.6 Idle breath (footer "available" dot)

- **Verb:** Breathe.
- **Trigger:** Always, with a 30s grace period after the last user interaction.
- **Motion:** A 6px circle pulses from `scale: 1, opacity: 0.6` to `scale: 1.4, opacity: 0.2` and back, 4s cycle, `breath` easing.
- **Reduced motion:** Dot is a static `opacity: 0.6` circle.

---

## 3. Home (`/`)

### 3.1 Hero

**Layout:**
- Left rail (5 cols, sticky): eyebrow + number "01 — Hero".
- Right (7 cols): headline, subhead, CTAs, hero image.

**Choreography:**

1. **Idle:** The full-bleed `InkField` shader is running. The hero image is revealed with a left-to-right mask (0% → 100% clip-path inset) over 900ms `editorial`, with `ease: 'power3.inOut'`. The headline waits for the mask to be ~50% revealed.
2. **Headline (Enter):** Each word fades in and translates `y: 48 → 0` over 620ms `editorial`, `stagger: 0.06`. `opacity: 0 → 1`.
3. **Subhead (Enter):** Same pattern, `stagger: 0.04`, starting at 0.32s after the headline begins. Body size, single block.
4. **CTAs (Enter):** From `opacity: 0, y: 16` to `opacity: 1, y: 0` over 420ms `soft`, starting at 0.62s.
5. **Eyebrow (Enter):** Eyebrow label slides in from `x: -16` to `x: 0` over 420ms `studio`, before everything else.
6. **Scroll-bound (Lead):** The hero image parallaxes `y: 0 → -120px` over the first 100vh of scroll (scrubbed). The headline parallaxes the opposite way at half speed.
7. **Cursor approach:** The headline's `font-variation-settings` shifts `wght` based on cursor proximity (per §2.2).

**Reduced motion:** Headline, subhead, CTAs all visible immediately. Hero image visible at full opacity. Parallax off.

**Files:**
- `src/components/sections/hero/HeroSection.tsx`
- `src/components/sections/hero/HeroHeadline.tsx`
- `src/components/sections/hero/HeroSubhead.tsx`
- `src/components/sections/hero/HeroImage.tsx`
- `src/animations/timelines/hero.timeline.ts`
- `src/hooks/useGsapContext.ts`

### 3.2 Manifesto

**Layout:** The four pillars in a 4×1 grid (mobile: 1×4 stack).

**Choreography:**

1. **Section reveal (Reveal):** The headline ("Four ideas that make the work.") and lead paragraph enter with the default section reveal (§2.5).
2. **Pillars (Enter):** Each of the four pillars enters with:
   - **Word-by-word** (the pillar name) — same headline pattern.
   - **Pillar description** fades in 80ms after the word.
   - Stagger 0.12s between pillars (a long stagger is editorial).
3. **Hover (Respond):** On hover, the pillar's number changes from `ivory-dim` to `inchworm`. The pillar's bottom border (a 1px marigold line) draws from `scaleX(0)` to `scaleX(1)` over 420ms `studio`.
4. **Cursor (Respond):** The cursor shows the label "Read" on hover.

**Reduced motion:** All pillars visible. No hover border draw. Border always full-width in `marigold`.

### 3.3 Selected Work

**Layout:** Editorial asymmetric grid — 2 cards in the top row, 3 in the second (sizes vary by index).

**Choreography:**

1. **Section reveal (Reveal):** Standard.
2. **Cards (Enter):** Cards reveal with a clip-path mask (small inset → 0) over 620ms `editorial`, staggered 80ms.
3. **Card hover (Respond):** Scale `1 → 1.02`, cursor label "View" appears, image's saturation shifts 0% → 110% (subtle). Duration 260ms `studio`.
4. **Card open (Respond):** The card's image mask-reveals to the dialog (transform-origin: center, 420ms `editorial`).
5. **Cursor (Respond):** Per §2.2.

**Reduced motion:** No scale, no mask on enter. Cards visible. Hover still highlights (color change), no scale.

### 3.4 Process teaser

**Layout:** A vertical line connecting five steps, on the left. The step number + name on the right.

**Choreography:**

1. **Vertical line (Lead):** As the user scrolls past the section, the line draws from `scaleY: 0` to `scaleY: 1` over the section's scroll range (scrubbed). 1.5px marigold.
2. **Steps (Enter):** Each step reveals as the line passes it (one-shot, `start: 'top 70%'`). Word reveal of the step name + small fade-in of the description.
3. **Hover (Respond):** A small filled circle appears at the step number.

**Reduced motion:** Vertical line is fully drawn immediately. Steps visible. No hover circle.

### 3.5 Studio vignette

**Layout:** 1 wide photo, 2 stacked narrow photos, all `edge`-bleed.

**Choreography:**

1. **Photos (Reveal):** Each photo reveals with a `clip-path: inset(0 100% 0 0) → 0` over 900ms `editorial` (left-to-right wipe).
2. **Scroll-bound (Lead):** Each photo parallaxes `y: 0 → -60px` over the section's scroll, scrubbed.
3. **Caption (Enter):** Word-by-word reveal, 60ms stagger.

**Reduced motion:** Photos visible. No parallax. Caption visible.

### 3.6 Testimonials

**Layout:** 3 cards in a horizontal row (mobile: stack).

**Choreography:**

1. **Cards (Enter):** Card opacity 0 → 1, `y: 32 → 0`, 620ms `editorial`, `stagger: 0.12`.
2. **Marigold underline (Lead):** The pull-quote's marigold underline animates from `scaleX: 0` to `scaleX: 1` (transform-origin: left) over 620ms `editorial`, starting 200ms after the card is visible.
3. **Cursor (Respond):** No special cursor. Cards are read-only.

**Reduced motion:** Cards visible. Underline full-width.

### 3.7 Final CTA

Standard section reveal. The CTA button is a primary `Button` with the standard hover (§4.1.1 in [`components.md`](./components.md)).

---

## 4. Studio (`/studio`)

### 4.1 Hero

Standard hero pattern, smaller scale. Headline: "A quiet room in Vashi."

### 4.2 The space (photo essay)

**Layout:** Full-bleed photo + overlay text, one column, scroll-pinned.

**Choreography:**

1. **Photo (Reveal):** The photo reveals with a vertical mask (top → bottom) over 900ms `editorial` as it enters.
2. **Pinned scroll (Lead):** The photo is pinned for 100vh of scroll. The text overlay translates `y: 100 → 0` from `0% → 100%` of the pin range (scrubbed). At 100% of the pin, the photo un-pins and the next section takes over.
3. **Multiple photos:** A series of pin-and-reveal moments (3 photos × 100vh each).

**Reduced motion:** Photo visible immediately, no pin. Text visible.

**Implementation note:** Pinned sections must keep keyboard navigation working. The `next-focusable` after the pin section remains the same as if pin weren't happening. We use `ScrollTrigger.scrub` with `pinSpacing: true` to preserve layout.

### 4.3 Four Pillars

Same as Home's manifesto, but one pillar per section, with a portrait.

**Choreography:**

1. **Pillar title (Enter):** Word-by-word reveal.
2. **Pillar essay (Reveal):** Line-by-line (stagger 0.04) reveal as the user scrolls. The essay is 200 words; we pre-split into lines via `SplitText`.
3. **Portrait (Reveal):** Mask reveal, then a subtle `scale: 1.05 → 1.0` over 900ms `editorial`.
4. **Scroll-bound (Lead):** Portrait parallaxes `y: 0 → -40px`.

**Reduced motion:** Visible. No parallax. No line stagger.

### 4.4 Press & Recognition

**Layout:** Logos in a 4-column grid.

**Choreography:**

1. **Logos (Enter):** `opacity: 0 → 1` with `y: 16 → 0`, 420ms `studio`, stagger 0.06.
2. **Hover (Respond):** Logo opacity 0.5 → 1.0 over 180ms `soft`.
3. **Empty state:** A single sentence visible, no animation.

---

## 5. Portfolio pages (`/tattoos`, `/paintings`, `/sketches`)

### 5.1 Hero

Standard small hero. Headline: "Tattoos." (or "Paintings." / "Sketches.").

### 5.2 Filter Bar

**Layout:** Sticky horizontal bar just below the header.

**Choreography:**

1. **Enter:** Filter chips fade in with `y: -8 → 0`, stagger 0.04, on mount.
2. **Active filter (Respond):** When a filter is active, a 2px inchworm underline draws across it (`scaleX: 0 → 1`, transform-origin: left, 180ms `soft`).
3. **Filter change (Respond):** The gallery cards re-flow with a FLIP animation (First, Last, Invert, Play). The active filter chip's underline animates from the previous chip's position to the new one via MotionPath (260ms `studio`).

**Reduced motion:** No FLIP. Cards just re-render. Underline change is instant.

### 5.3 Gallery (the heart of the site)

**Layout:** Editorial asymmetric grid (masonry-like, but the asymmetry is hand-authored per page).

**Choreography:**

1. **Cards (Enter):** First-paint cards reveal with a `clip-path: inset(0 100% 0 0) → 0` (left-to-right wipe) over 620ms `editorial`, staggered 0.06s, capped at 6 cards in the initial batch.
2. **Card hover (Respond):**
   - Scale `1 → 1.02`, 260ms `studio`.
   - The card's image: saturation 100% → 110%, 260ms `studio`.
   - The card's title: y `0 → -2`, 180ms `soft`.
   - Cursor label "View" appears.
3. **Card click (Respond):**
   - The card's image flies to the dialog (FLIP, 420ms `editorial`).
   - The dialog opens with `opacity: 0 → 1, scale: 0.96 → 1`, 420ms `editorial`.
4. **Drag-pan (Respond):** If the gallery is in drag-pan mode (large screens, optional), a `gsap.Observer` listens to drag events and applies a clamped `x` translation to the gallery.
5. **Scroll-bound (Lead):** Each card parallaxes `y: 0 → -40px` over its in-view scroll (scrubbed). On mobile, parallax is halved.

**Reduced motion:** Cards visible. No scale, no mask, no parallax. Hover still highlights. Dialog opens with opacity only.

### 5.4 Portfolio detail dialog

**Layout:** Centered modal, image left, metadata right (mobile: stacked).

**Choreography:**

1. **Open (Enter):** Per §5.3.
2. **Image crossfade (Respond):** When the user changes image (thumbs), the current fades out and the next fades in over 260ms `soft`. Both `position: absolute` during the transition.
3. **Close (Respond):** Reverse of open. Image flies back to its origin card (FLIP), 260ms `studio`.

**Reduced motion:** Instant. No FLIP.

### 5.5 Series index (paintings, sketches)

**Layout:** A list of series, each a row with name, year, count.

**Choreography:**

1. **Rows (Enter):** Each row reveals with a left-to-right mask, 420ms `editorial`, stagger 0.08.
2. **Hover (Respond):** The series's count column translates `x: 0 → 4`, 180ms `soft`. The marigold underline animates in.
3. **Click (Respond):** The page transitions to the filtered gallery (§3.1).

---

## 6. Process (`/process`)

### 6.1 Hero

Standard small hero. Headline: "The five steps."

### 6.2 Process step

**Layout:** Each step is its own section. The number is large (display-sm), the title is h2, the body is body-lg, and there's an image and a video on the right (mobile: stacked).

**Choreography:**

1. **Section reveal (Reveal):** Standard.
2. **Number (Enter):** The step number `01 —` etc. reveals with a `clip-path: inset(0 0 100% 0)` (top-down) over 620ms `editorial`. The dash draws via `DrawSVGPlugin` (a 24px line, 1.5px marigold, draws over 420ms `studio`).
3. **Title (Enter):** Word-by-word.
4. **Body (Reveal):** Line-by-line.
5. **Image (Reveal):** Mask reveal, then parallax `y: 0 → -60px`.
6. **Video (Respond):** Hover or in-view (whichever first) starts the muted, looped video. On hover-out (or out-of-view), the video pauses and reverses to its poster.
7. **Connector line (Lead):** A vertical marigold line connects each step to the next. It draws (via `scaleY: 0 → 1`) as the user scrolls between the two.

**Reduced motion:** Everything visible. Videos remain posters. No lines, no parallax.

### 6.3 Final CTA

Standard section. Headline: "Start your brief." CTA to `/book`.

---

## 7. About (`/about`)

### 7.1 Hero

A wide portrait of Prerna on the right, headline + lead on the left.

**Choreography:**

1. **Portrait (Reveal):** Mask reveal, scale 1.05 → 1.0, 900ms `editorial`.
2. **Headline (Enter):** Word-by-word.
3. **Lead (Reveal):** Line-by-line.
4. **Scroll-bound (Lead):** Portrait parallaxes `y: 0 → -60px`.

### 7.2 Origin & Practice sections

Standard two-column layout: text on the left, image on the right. As the user scrolls, the text reveals line-by-line and the image parallaxes.

### 7.3 Timeline

**Layout:** A vertical timeline. Each year is a row, with 1–3 events.

**Choreography:**

1. **Vertical line (Lead):** A 1.5px marigold vertical line draws from top to bottom of the section as the user scrolls (scrubbed).
2. **Years (Enter):** Each year reveals as the line reaches it.
3. **Events (Enter):** Staggered fade-in within each year, 80ms.

**Reduced motion:** Visible. Line full-height. No draw.

### 7.4 Closing line

A single line in Times New Roman italic, center-aligned, with extra space. No animation; the line is the closing breath. The section is otherwise empty.

---

## 8. Contact (`/contact`)

### 8.1 Hero

Standard small hero. Headline: "Get in touch."

### 8.2 Form

**Layout:** Two columns. Form on the left, studio info on the right. Mobile: stacked, form first.

**Choreography:**

1. **Section reveal (Reveal):** Standard.
2. **Field focus (Respond):** Label floats 4px, bottom border 1px → 2px ivory-dim → inchworm. 180ms `soft`.
3. **Field error (Respond):** Shake (8px, 4 cycles, 240ms total) + bottom border inchworm → danger + error text fade-in below.
4. **Field success (Respond):** On a successful submit, the form fades out 260ms, then a success card scales in (0.94 → 1.0, opacity 0 → 1, 420ms `editorial`).
5. **Map (Respond):** The embedded map is a static placeholder until the user clicks "Show map" — a 12KB SVG of the area. On click, the Google Map loads (lazy iframe). The transition: the SVG fades out, the iframe fades in.

**Reduced motion:** Standard form behavior. No shake (errors are text-only).

---

## 9. Book (`/book`)

Same form micro-interactions as `/contact`. On success, a confirmation card with a calendar link.

---

## 10. Cursor details (recap, with all states)

| Selector | Default → Hover | Label | Notes |
|---|---|---|---|
| `a`, `button` (primary) | `12px ivory 0.4` → `4px inchworm 1.0` | — | Cursor label is the link's `aria-label` or text content (truncated to 1 word). |
| `[data-cursor="open"]` | `12px ivory 0.4` → `4px inchworm 1.0` | "View" | Used on portfolio cards. |
| `[data-cursor="drag"]` | `12px ivory 0.4` → `28px ring ivory 1.0` | — | Used on drag-pan galleries. |
| `[data-cursor="lead"]` | `12px ivory 0.4` → `12px inchworm 0.7` | — | Display headings. The heading's `font-variation-settings` shifts. |
| `[data-cursor="write"]` | `12px ivory 0.4` → `12px marigold 0.8` | "Write" | Used on the studio's contact card. |
| `input`, `textarea` | unchanged | — | System cursor for editable controls. Always. |

**Implementation:**

```ts
// src/animations/cursor.ts
export function buildCursorTimeline(cursor: HTMLDivElement, label: HTMLDivElement) {
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'glide' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'glide' });
  // ... pointermove, hover-in/out, drag handlers.
}
```

---

## 11. Page transition choreography (full)

The two-stage transition is the same in spirit across routes, with route-specific accents:

- **From `/`:** The hero image's mask-reveal runs in reverse during the outgoing stage, then the cursor circle expands.
- **To `/tattoos`:** The incoming is a left-to-right wipe on the gallery header.
- **To `/process`:** A vertical line draws down the center as the page enters.
- **To `/about`:** The portrait scale-reveals in.
- **To `/contact`:** The form fields cascade in.

Each route exports its `enterTimeline()` and `exitTimeline()` from its section components, and the page transition orchestrator runs them in order.

---

## 12. The scroll choreography (full-page sense)

A reader scrolling the home page top-to-bottom should feel:

1. **0–100vh:** Hero. Big type, image mask, slight parallax.
2. **100–150vh:** Manifesto. Four pillars, slow stagger.
3. **150–250vh:** Selected work. Cards entering with masks.
4. **250–350vh:** Process teaser. Vertical line drawing.
5. **350–450vh:** Studio vignette. Photo wipes.
6. **450–550vh:** Testimonials. Cards, underlines.
7. **550–600vh:** Final CTA.

The cumulative **scroll-to-pace ratio** is roughly 100vh per section. The reader spends ~5–8 seconds per section on a desktop. This is the editorial "long read" pacing.

The animation engineer owns this pacing. The content strategist owns the words per section. The two negotiate on a per-section basis if the words demand a longer dwell.

---

## 13. The "always running" animations

These run in the background regardless of route:

1. **InkField shader** (full-bleed canvas) — see [`shaders.md` §3](./shaders.md#3-inkfield).
2. **Grain pass** — film grain overlay, 8% opacity.
3. **Footer "available" dot** — breath animation.
4. **Header** — show/hide on scroll direction.
5. **Scroll progress bar** — width tracks scroll.

All five pause on `prefers-reduced-motion: reduce` (except the scroll progress bar, which is a status indicator, not motion).

---

## 14. Implementation checklist (per section)

For every section, before sign-off:

- [ ] `usePrefersReducedMotion` honored.
- [ ] Keyboard navigation works end-to-end.
- [ ] Focus is visible at every interactive moment.
- [ ] No `top`/`left`/`width`/`height` in tweens.
- [ ] `will-change` removed after animation.
- [ ] Tested on a Pixel 6a profile (60fps target).
- [ ] Tested with VoiceOver + keyboard.
- [ ] Tested in dark mode (the only mode).
- [ ] Tested in Safari (View Transitions fallback path).
- [ ] Unit tests for the timeline factory (mocked `ScrollTrigger`).
- [ ] Storybook story with a `?debug=timeline` toggle for markers.

---

## 15. The `?debug=timeline` query param

When `?debug=timeline` is set, every `ScrollTrigger` shows markers, every timeline runs at 4× speed, and a small panel in the bottom-right shows the active timelines. The flag is dev-only and stripped in production builds.

```ts
// src/lib/gsap.ts
if (process.env.NODE_ENV === 'development' && new URLSearchParams(location.search).has('debug')) {
  ScrollTrigger.defaults({ markers: true });
}
```
