# MeetPrerna — Motion (`MOTION.md`)

**Version:** 1.0 · **Date:** 2026-07-25 · **Replaces:** `animations.md` (542 lines) + `shaders.md` (659 lines)

Delete both once this is in the repo. 1,201 lines to 260.

---

## 1. What the reference sites actually do

Checked against live markup, the studio's own case study, and published breakdowns. Not assumed.

| Reference | Built with | The moves that matter |
|---|---|---|
| **floema.com** | Editorial site by Büro | Numbered index sections (01 to 05), a visible scroll cue, massive type, staggered reveals, generous space. **No WebGL.** |
| **michael-aust.com** | GSAP, jQuery, Lottie, SVG, Webpack | Typography-led microinteractions, a "creative menu", scroll storytelling, black and white restraint. **No WebGL, no three.js.** |
| **torchsystems.com** | Webflow | Looping `.webm` clips inside section blocks, a repeated SVG mark as a bullet, a footer text marquee, one accent. **No shader background.** |
| **landonorris.com** | Webflow, OFF+BRAND with wearegrip. Awwwards Site of the Year. | Drag-to-reveal hero portrait (drag across his face to swap between headshot and helmet splash), the studio's signature two-layer **mask reveal**, a "Helmets Hall of Fame" collection gallery with hover storytelling, 3D object rotation, **Rive** motion graphics, and vibrant lime accents. |

**Two findings that change the spec.**

**One.** Three of the four use zero WebGL. Their texture comes from GSAP, typography, looping video and marquees. The v1.0 blueprint specced five shader passes and 659 lines of GLSL to chase something Torch achieves with a `.webm`. Shaders are reduced to a small ambient layer, §6.

**Two.** Lando Norris is the one that carries real motion weight, and the load-bearing parts are **not shaders**. They are a drag-driven mask reveal, a themed object gallery, and **Rive**. Rive is a vector motion runtime, roughly 100KB, GPU accelerated, built for exactly this. For an artist whose entire practice is line work, Rive is a dramatically better fit than hand-written GLSL. It is now the approved third motion layer instead of shader passes 3, 4 and 5.

Side note worth knowing: OFF+BRAND describe the Lando palette as "vibrant lime accents" paired with bold typography to carry "youthful, playful energy". If the inchworm neon came from there, it came from the right place. That palette is doing exactly the job you want it to do here.

## 2. Two budgets

- **UI motion** (buttons, dialogs, filters, nav, tooltips): **under 300ms**. Strict. No exceptions.
- **Narrative motion** (hero load, scroll reveals, the session line): 400 to 900ms. (Exception: Hero headline reveal M1 at 1800ms, per owner override). This is a portfolio, not a dashboard.

Never use the narrative budget on a UI element. A 400ms filter chip feels broken.

Exit is always 60 to 70% of enter.

---

## 3. Tokens

```ts
// src/animations/easing.ts
export const dur = {
  press: 120, tooltip: 160, ui: 220, dialog: 280,
  reveal: 600, narrative: 900,
} as const;

export const ease = {
  out:    'cubic-bezier(0.23, 1, 0.32, 1)',   // enter. the default.
  inOut:  'cubic-bezier(0.77, 0, 0.175, 1)',  // on-screen movement
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',   // sheets
  breath: 'cubic-bezier(0.45, 0, 0.55, 1)',   // ambient only
} as const;
```

Never `ease-in` on UI. It delays the first frame, which is the exact moment the user is watching.

---

## 4. The register

**An animation with no row here does not get written.** Add the row in a PR first, then build.

| # | Effect | Where | Purpose | Pillar | Technique | Timing | Reduced motion |
|---|---|---|---|---|---|---|---|
| M1 | Reveal (clip-path) | Hero headline, per line | Set the pace in the first two seconds | Meditation | `clip-path: inset(0 0 100% 0)` → `inset(0)` | 1800ms `out`, 100ms stagger | Visible, no motion |
| **M21** | **Per-character scroll-scrubbed text** | Home block 05, the four pillars | Type that assembles as you scroll. The kinetic-type personality lever. | Meditation | Split to chars. Each char gets a randomised turn order, then a two-layer swap: outgoing layer slides right and fades, incoming layer slides in from left. Driven by ScrollTrigger `scrub`, not a timed tween. | scrub | **Full sentence renders normally, no split, no motion** |
| M2 | Line drawing | Session line, whole home page | The needle's path. **The signature.** | Meditation | SVG `stroke-dashoffset`, ScrollTrigger `scrub` | scrub | Fully drawn, static |
| M3 | Scroll reveal | Every section, default | Stop things appearing abruptly | Calmness | `opacity` 0→1, `translateY` 12px→0 | 600ms `out`, `once: true`, margin -100px | Opacity only, 200ms |
| M4 | Stagger | Grid items | Cascade reads calmer than a snap | Calmness | M3 offset 40ms per item, cap 8 | 40ms | No stagger |
| M5 | Press feedback | Every button, card, chip | Confirm the tap landed | Therapy | `scale(0.97)` on `:active` | 120ms `out` | **Keep.** Feedback is not decoration. |
| M6 | Hover (media card) | Work and art grids | Affordance | Psychology | `scale(1.02)` inside a fixed frame, label fades in | 220ms `out`, gated `(hover:hover) and (pointer:fine)` | Label only |
| M7 | Shared element transition | Grid thumb → detail | Keep the user oriented | Calmness | View Transitions API, GSAP Flip fallback | 320ms `inOut` | Crossfade |
| M8 | Origin-aware animation | Filter dropdown, tooltip | Grow from the trigger, not the centre | Psychology | `transform-origin` from the Radix CSS var, `scale(0.96)` + opacity | 180ms `out` | Instant |
| M9 | Accordion | FAQ on `/sanctuary` | Expand and collapse | Calmness | `grid-template-rows: 0fr → 1fr` | 240ms `out` | Instant |
| M10 | Marquee | Partner studios and travel cities | Signals the itinerant model | Psychology | `translateX` linear, pause on hover, `aria-hidden` on the duplicate | 40s linear | Static list |
| M11 | Crossfade | Filter result change | Replace content in place | Calmness | opacity only, never layout | 180ms `out` | Instant |
| M12 | Page enter | Route change | Continuity | Calmness | View Transitions, opacity + 8px `translateY` | 260ms `out` | Opacity only |
| M13 | Video loop | Sanctuary process steps | Show the hand working. Cheaper and warmer than a shader. | Meditation | `<video>` muted, playsinline, loop, `preload="none"`, poster frame, IntersectionObserver play and pause | native | Poster only, no autoplay |
| M14 | Float (ambient) | Ink shader drift | Stillness. The room breathing. | Meditation | GLSL FBM, see §6 | continuous | **Canvas never mounts** |

**Cut, and not to be reintroduced:** custom cursor of any kind, cursor-driven `font-variation-settings`, `mix-blend-mode` on a moving element, Lenis smooth scroll, parallax on text, typewriter, number tickers, hero counters, hover-only reveals.

M13 is new and it is the direct lesson from Torch. A 6-second silent loop of her hand drawing does more for the Meditation pillar than any shader, weighs about 400KB, and works on a 4-year-old Android.

---

## 5. The two-speed system

This resolves the tension in the brief. The four pillars say slow and meditative. A 25-year-old creative says kinetic and physical. Average the two and you get beige.

Do not average. Split the site.

| Register | Where | Feel | Timing |
|---|---|---|---|
| **Slow** | `/sanctuary`, the four pillars, the manifesto, `/about` | Meditative. One idea per viewport. Nothing competing. | 600 to 900ms, `out` |
| **Physical** | Hero, `/portfolio`, the Sketchbook | Kinetic, draggable, responsive to the hand. This is where she shows up. | 120 to 320ms, drag-tracked, spring on release |

**Never mix the two in one viewport.** A drag gallery and a 900ms meditative reveal in the same screen cancel each other out. The scroll should feel like walking into a quiet room, then picking up a sketchbook and flipping it fast, then sitting down again.

---

## 6. Signature moves

These are the six that make the site hers rather than competent. Each traces to a reference site **and** to something real in her practice.

| # | Move | From | Why it is hers | Technique |
|---|---|---|---|---|
| **M15** | **Fresh → healed slider** | Lando's drag-to-reveal portrait | The single biggest unspoken fear of a first-timer is "what will this look like in a year". No other tattoo portfolio in Mumbai answers it. This is the highest-value component on the site. | Two stacked images, `clip-path: inset(0 X% 0 0)` on the top one, X driven by pointer or touch. No extra DOM, GPU only. Keyboard: arrow keys move the divider in 5% steps. |
| **M16** | **Ink bleed mask reveal** | OFF+BRAND's two-layer mask reveal | The mask shape is a spreading ink blot, not a rectangle wipe. Her medium performing the reveal of her work. | SVG `mask` with an organic path, or a radial-gradient mask with animated stops. **Pair it with a scale settle: image starts at `scale(1.15)` and eases to `1` over the same duration, so the frame opens and the image relaxes into it at once.** 800ms `out`. Soft edges, so a **Mask**, not a **Clip-path**. Note: the reference tutorial used `scale(2)`, which paints four times the pixel area. `1.15` reads almost identically and costs a fraction. |
| **M17** | **The Sketchbook** | "Helmets Hall of Fame" | She does not sell flash, margin is too low. The move that mattered was a themed collection of an artifact only that practice produces. For a custom artist that is the **unused sketches**: hundreds of drawings that never became tattoos. Free, already shot, and the most honest thing on any artist's site. See `BLUEPRINT.md` §5. | **Layout: an asymmetric CSS Grid, roughly 14 columns, with each sketch given explicit `grid-column` and `grid-row` positions so nothing lines up in a regular pattern.** That scattered placement is what makes it read as a desk rather than a gallery wall. Seeded so it is identical on every load. 20 to 30 sketches on a light paper ground. Reveal with M16. Hover lifts one `scale(1.04)` + `rotate(±2deg)`, 220ms. Tap opens large with her note. CTA routes to `/consulting`. |
| **M18** | **Drag gallery** | Drag navigation across OFF+BRAND's work | Flipping a sketchbook, not clicking a carousel. This is the physical register. | Pointer capture, momentum on release (dismiss if velocity > 0.11), damping past the boundaries rather than a hard stop. **Visible arrows too.** Never gesture-only. |
| **M19** | **Italic on hover** | Michael Aust's typography-led microinteractions | **Revised 2026-07-26.** Originally specced as animating Fraunces's `WONK` axis. The typeface is now Cormorant Garamond (`DECISIONS.md` §5), which has no WONK or optical-size axis — only weight. That interaction cannot be built. Replacement: hovering a work title swaps roman to Cormorant's **true italic**. A Garamond italic is a genuinely different letterform, not a slant, so the change reads as craft rather than a CSS effect. | `font-style: italic` on a discrete hover state, 240ms transition. Fixed-width container so nothing reflows — italic is narrower, so reserve the roman width. Load the italic face or it will synthesise and look wrong. |
| **M20** | **Rive mark** | Rive on landonorris.com | One ink line that draws itself into her mark. Vector motion for a line artist. Replaces shader passes 3, 4 and 5 at a fraction of the cost. | Rive runtime, roughly 100KB, lazy loaded, one `.riv` file under 60KB. Plays once on first view, then idles. Static SVG fallback. |

**On M19 and the earlier cursor ban.** These are not the same thing. The cut version mutated `font-variation-settings` on every heading on every `pointermove`, which is layout and paint on text sixty times a second. M19 is a discrete hover state on one element with a CSS transition and a fixed container. One is a per-frame text relayout. The other is a state change. Only the first was the problem.

**M15 is confirmed.** Six healed pairs are in hand. It ships in the hero (block 01), on the home page (block 04), on every `/portfolio/[slug]` tattoo detail page that has a pair, and on `/about`. It is the highest-value component on the site.

---

## 7. Arrangement

The block-by-block page architecture, with every block attributed to a reference site, lives in **`BLUEPRINT.md`**. That file supersedes `PRD.md` §5.

This file is the mechanical spec: what each move is, how it is built, what it costs. `BLUEPRINT.md` is where the moves are arranged into pages.

---

## 8. Shaders, reduced to their real job

Two passes. One canvas. Ambient only.

**InkField** — low frequency simplex plus slow FBM drift, tinted `--color-ink` to `--color-ink-200`, with a faint `--color-inchworm` bloom at very low alpha. Hero and the final CTA band only. Not the whole page.

**Grain** — a final overlay pass. Re-seeded every 6 frames.

Distortion, InkDrop and the Process shader from `shaders.md` §5 to §7 are **cut and replaced by M20 (Rive)**, which does the same job for a tenth of the cost and is what OFF+BRAND actually used. The arithmetic: their own stated budgets were 4+1+3+1+4 = 13ms of GPU against a 16.6ms frame that also has to run JavaScript, style, layout, paint and composite. It was never going to hold 55fps on a Pixel 6a.

**Constraints, all mandatory:**

- **OGL**, roughly 10KB gzipped. Not three.js plus @react-three/fiber plus drei. The GLSL in `shaders.md` §3 and §4 is portable and does not change. Only the mount layer changes.
- One canvas, root layout, `z-index: 0`, `pointer-events: none`.
- DPR capped at 1.25 mobile, 1.75 desktop.
- RAF paused on `document.hidden` and when the canvas is off-screen.
- Mount only after `requestIdleCallback` **and** after the LCP image has painted.
- Combined GPU budget **5ms** on a Pixel 6a, measured on a real device.

**Five kill switches. Canvas does not mount if any is true:**

```ts
prefers-reduced-motion: reduce
navigator.connection?.saveData
navigator.deviceMemory <= 4
navigator.hardwareConcurrency <= 4
no WebGL context
```

**Fallback:** a static CSS radial gradient plus a grain PNG under 30KB. Screenshot it. It must look deliberate. Most visitors on a mid Android will see this, so it is the real design, not the degraded one.

---

## 9. Split text: the accessibility rule

Any effect that splits a heading into lines, words or characters (M1, M19, M21) must follow this, without exception.

- The parent element carries the complete sentence in an `aria-label`.
- Every generated `<span>` for a line, word or character is `aria-hidden="true"`.
- Under `prefers-reduced-motion: reduce`, **do not split at all.** Render the plain sentence.
- Never rely on a CSS pseudo-element to carry visible text that has no accessible equivalent. Pseudo-element content is exposed inconsistently across screen readers, and the reference tutorial makes exactly this mistake: it sets the real text to `transparent` and paints the visible text via `::before` and `::after`.

A heading that a screen reader announces one letter at a time fails the WCAG AA gate in `.agents/rules/30-quality-gates.md`. This is not optional polish.

---

## 10. Performance rules

- Animate only `transform`, `opacity`, `clip-path`, `filter`. Nothing else. Ever.
- CSS transitions, not keyframes, on anything a user can trigger rapidly. Transitions retarget mid-flight. Keyframes restart from zero.
- Do not set a CSS variable on a parent to drive a child transform. It recalculates styles for every child. Set the transform on the element.
- Never animate from `scale(0)`. Start at `0.95` with `opacity: 0`.
- `will-change` only while actively animating, removed after.
- One `gsap.context()` per component. Always return `ctx.revert()` from cleanup.
- `blur()` under 20px. It is expensive in Safari.
- GSAP hardware acceleration: use the full `transform` string, not the `x` and `y` shorthands, on anything that must stay smooth during a route load.

---

## 11. Budgets (Lighthouse CI blocks merge)

| Metric | Target | Hard cap |
|---|---|---|
| LCP mobile | ≤ 1.8s | ≤ 2.5s |
| INP | ≤ 180ms | ≤ 200ms |
| CLS | ≤ 0.03 | ≤ 0.05 |
| Initial JS gzipped | ≤ 130KB | ≤ 180KB |
| Frame rate, scroll stress, Pixel 6a | ≥ 58fps | ≥ 55fps |
| Total transferred, home | ≤ 1.5MB | ≤ 2.0MB |
| Lighthouse Performance mobile | ≥ 90 | ≥ 85 |
| Lighthouse Accessibility | ≥ 98 | ≥ 95 |

---

## 12. Review

Animations are reviewed the next day, with fresh eyes, at 25% speed in DevTools.

Look for: two states visibly overlapping during a crossfade, easing that starts abruptly, a wrong transform origin, coordinated properties drifting out of sync.

Then run `/review-ui`.
