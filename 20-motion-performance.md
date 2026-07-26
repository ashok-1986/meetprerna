# Rule: Motion & Performance

Applies to any task that adds, changes or reviews motion. Rationale in `@/DECISIONS.md` §10 to §12.

## The gate: four questions before any animation

Answer all four in the PR description. If any answer is weak, do not animate.

1. **How often does a user see this?**

| Frequency | Decision |
|---|---|
| 100+ times a session (nav toggle, filter click) | No animation |
| Tens of times (hover, list nav) | Reduce hard or remove |
| Occasional (dialog, drawer, page enter) | Standard |
| Once or rare (hero load, first scroll) | Can carry craft |

2. **What is the purpose?** Valid: spatial consistency, state indication, feedback, explanation, preventing a jarring change, or mood that traces to a named pillar. "It looks cool" is not valid on anything seen more than occasionally.

3. **Which pillar does it serve?** Name it. Psychology, Meditation, Therapy or Calmness. If none, cut it.

4. **What happens under `prefers-reduced-motion`?** Write it now, in the same commit.

## Two budgets, and they are different

- **UI motion** (buttons, dialogs, filters, nav, tooltips): **under 300ms**, always. This is the strict one.
- **Narrative motion** (hero load, scroll reveals, the session line): 400 to 900ms is allowed. This is a portfolio, not a dashboard. But it must never block input.

Do not use the narrative budget as an excuse on a UI element.

## Tokens

```ts
export const dur = {
  press:    120,
  tooltip:  160,
  ui:       220,
  dialog:   280,
  reveal:   600,
  narrative: 900,
} as const;

export const ease = {
  out:     'cubic-bezier(0.23, 1, 0.32, 1)',      // enter, default
  inOut:   'cubic-bezier(0.77, 0, 0.175, 1)',     // on-screen movement
  drawer:  'cubic-bezier(0.32, 0.72, 0, 1)',      // sheets
  breath:  'cubic-bezier(0.45, 0, 0.55, 1)',      // ambient only
} as const;
```

Exit is 60 to 70% of enter duration. Always.

## The motion register

**The register lives in `@/MOTION.md` §4 and §6. It is the single source of truth.** M1 to M21.

An animation with no row there does not get written. Add the row in a PR first, then build.

Do not duplicate the table here. Two copies drift, and a drifting register is worse than none.

Quick recall of what is in it: hero line reveal (M1), the session line (M2, the signature), scroll reveal (M3), stagger (M4), press feedback (M5), media card hover (M6), shared element transition (M7), origin-aware popover (M8), accordion (M9), marquee (M10), crossfade (M11), page enter (M12), silent looping video (M13), ambient shader float (M14), per-character scroll-scrubbed text (M21).

**Signature moves, `MOTION.md` §6:** fresh-to-healed slider (M15), ink bleed mask reveal (M16), the Sketchbook (M17), drag gallery (M18), wonk-on-hover (M19), Rive mark (M20). These are what make the site hers. Build them, do not trim them for time.

**Arrangement:** the block-by-block page architecture is in `@/BLUEPRINT.md`. It supersedes `PRD.md` §5.

**Split text is an accessibility hazard, `MOTION.md` §9.** Any effect splitting a heading into lines, words or characters (M1, M19, M21) must put the full sentence in `aria-label` on the parent, mark every generated span `aria-hidden="true"`, and skip splitting entirely under `prefers-reduced-motion`. Never carry visible text only in a `::before` or `::after`.

**No new animation libraries.** GSAP with ScrollTrigger covers everything in the register. StringTune, Lenis, Locomotive, framer-motion and `motion` are not to be installed. Two scroll loops on one page is the standard cause of Android scroll jank.

**CSS first, always.** Before reaching for any library, check whether the effect is a CSS transition or `@keyframes`. Most of this register is. Real examples from this build: the FAQ accordion shipped with framer-motion at 40KB gzipped and was rebuilt in about twenty lines of CSS using `grid-template-rows: 0fr -> 1fr`, taking `/sanctuary` from 148KB to 104KB. The hero reveal and M3 scroll reveal are `@keyframes` plus an IntersectionObserver class toggle. GSAP earns its place only where scroll-scrubbing or a timeline is genuinely required: M2 the session line, and M21. Nowhere else so far.

If you are about to install an animation package to do a fade, a slide, a scale or an expand, stop. That is CSS.

**Two-speed rule, `MOTION.md` §5:** slow register on `/sanctuary`, pillars and `/about`. Physical register on hero, `/portfolio` and the Sketchbook. Never both in one viewport.

**Cut, and not to be reintroduced:** custom cursor of any kind, cursor-driven `font-variation-settings`, `mix-blend-mode` on a moving element, Lenis smooth scroll, parallax on text, typewriter, number tickers, hero counters, hover-only reveals.

## Performance rules

- Animate only `transform`, `opacity`, `clip-path`, `filter`. Never `width`, `height`, `top`, `left`, `margin`, `padding`.
- Use CSS transitions, not keyframes, on anything a user can trigger rapidly. Transitions retarget. Keyframes restart from zero.
- Do not write a CSS variable on a parent to drive a child's transform. It recalculates styles for every child. Set the transform on the element.
- Never animate from `scale(0)`. Start at `0.95` with `opacity: 0`.
- `will-change` only on an element actively animating. Remove it after.
- One GSAP context per component. Always return `ctx.revert()` from the effect cleanup.
- `blur()` stays under 20px. It is expensive in Safari.

## Shader constraints

Two passes in v1, InkField and Grain, on one OGL canvas. Ambient only. Full spec and the five mandatory kill switches are in `@/MOTION.md` §6.

Reason, short version: three of the four reference sites use zero WebGL. Their texture comes from GSAP, typography and looping video. The v1.0 spec budgeted 13ms of GPU against a 16.6ms frame. See `@/MOTION.md` §1.

## Budgets (Lighthouse CI enforces, failure blocks merge)

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

## Review the next day

Animations are reviewed with fresh eyes, the following day, at 25% speed in DevTools. Check: do two states overlap visibly during a crossfade, does the easing start abruptly, is the transform origin right, are coordinated properties in sync.
