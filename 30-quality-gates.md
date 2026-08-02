# Rule: Quality Gates

Applies to every merge and every phase sign-off. Nothing here is aspirational.

## Before anything else: confirm the gates can actually run

`pnpm a11y`, `pnpm e2e` and `pnpm test` must execute. If a command errors because a dependency is missing, the gate is not passing, it is absent. Say so plainly and restore the tooling before continuing.

A checklist item verified by reading the source is code review, not a gate. Code review does not catch what you did not think to look for, which is the entire reason automated checks exist.

---

## Merge checklist (every PR)

Paste the evidence into the PR. A claim without output is not evidence.

- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm build` green. Output pasted.
- [ ] `pnpm a11y` reports zero critical and zero serious issues.
- [ ] Screenshots at 360, 768 and 1440 attached.
- [ ] Keyboard walkthrough done. Every interactive element reachable, focus ring visible, tab order matches reading order.
- [ ] Tested with `prefers-reduced-motion: reduce` on.
- [ ] No raw colour value outside `tokens.css`.
- [ ] Any new colour pair has a measured contrast ratio in `DESIGN.md` §1.
- [ ] No `TODO` left without an owner tag.
- [ ] **Disappearing-TODO check.** If this change REMOVED a `TODO(prerna):` or `TODO(owner):` marker, confirm the owner actually supplied that content. A vanished TODO with plausible prose in its place is a fabrication, not a completion. This has happened: an invented cancellation policy, an invented "six years of tattooing", and an unconfirmed email address all shipped this way in one commit.

## Accessibility floor

WCAG 2.1 AA. Not negotiable, not deferred to a later phase.

- Text contrast 4.5:1. Large text and non-text UI 3:1. Measured, not estimated.
- Focus ring: `--color-inchworm`, 2px solid, 2px offset, visible on every focusable element including inside the shader region.
- Skip link, first in tab order, visible on focus.
- Sequential headings. One `h1` per page. No level skipped.
- Icon-only controls have `aria-label`. Every input has a real `<label>`, not a placeholder.
- Errors use `role="alert"`. Toasts use `aria-live="polite"` and never steal focus.
- Dialogs trap focus and restore it to the trigger on close. Escape always closes.
- Touch targets 44px minimum, 8px apart.
- No information conveyed by colour alone.
- If a scroll animation moves content out of view, that content stays in the accessibility tree and reachable by keyboard.
- Tested with VoiceOver on Safari and NVDA on Firefox before any phase gate passes.

## Content safety

- Nothing describing Prerna's practice ships without her approval.
- No invented pricing, address, timeline, medical claim or guarantee. Missing fact means `TODO(prerna):`, not a plausible guess.
- **No `LocalBusiness` schema. No address. No map embed.**
- No client photograph published without written consent.
- No testimonial published without a name and a verifiable source.

## SEO gates

- Every route has a unique title and description from `content.md` §8.
- All redirects implemented in `next.config.js` and verified with `curl -I` before DNS switch.
- `sitemap.ts` and `robots.ts` present. Sitemap submitted on switch day.
- JSON-LD: `Person`, `Service`, `VisualArtwork` on art detail, `BreadcrumbList`, `FAQPage` on `/sanctuary`. Validated in the Rich Results test.
- Every portfolio image has descriptive alt text. Decorative shapes get `alt=""`.
- Canonical tags on every page. No orphan pages.

## Phase gates

### Phase 1 — Foundation
- [ ] Clean install from a fresh clone.
- [ ] All four commands green.
- [ ] `tokens.css` complete, contrast table verified.
- [ ] Fonts self-hosted, subset, `font-display: swap`.
- [ ] Canonical page renders every token and both display sizes.
- [ ] Lighthouse desktop ≥ 95, Accessibility 100.
- [ ] **Photography shoot booked with a date.** This gate does not pass without it.

### Phase 2 — Structure
- [ ] All nine routes navigable. No motion anywhere.
- [ ] All images use the Next.js `<Image>` component with an explicit `sizes`. No raw `<img>`. No source image over ~1MB in the repo.
- [ ] Testimonials fetched from the Senja API at build time and rendered in our own components. The Senja widget embed is NOT used.
- [ ] All redirects in place and verified with `curl -I`.
- [ ] Fillout embed on /consulting loads, submits, and onInit/onSubmit fire the funnel events. Verified on a hard load AND after a client-side route transition.
- [ ] WhatsApp appears once, as a fallback link only. Confirm it is not styled as a button anywhere.
- [ ] Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, SEO 100.
- [ ] axe-core zero critical.

### Phase 3 — Motion
- [ ] **Content gate: 80% of `content.md` §9 delivered.** Do not start this phase otherwise.
- [ ] Every animation traces to a register row.
- [ ] 55fps minimum on a Pixel 6a scroll-stress test, recorded.
- [ ] Every reduced-motion path verified manually with the OS setting on.
- [ ] Zero layout shift caused by any animation.
- [ ] Lighthouse mobile Performance ≥ 90.

### Phase 4 — Shader
- [ ] Two passes only. GPU under 5ms on a Pixel 6a, measured.
- [ ] All five kill switches individually tested and screenshotted.
- [ ] Fallback screenshotted and confirmed to look deliberate.
- [ ] OGL chunk is async only and absent from the initial bundle. Bundle report attached.
- [ ] Lighthouse mobile Performance ≥ 90, Best Practices 100.

### Phase 5 — Launch
- [ ] All copy approved by Prerna.
- [ ] All images consented, captioned, alt-tagged.
- [ ] Redirects verified against the live domain post-switch.
- [ ] Search Console: sitemap submitted, coverage clean.
- [ ] Funnel measurable end to end: Vercel Analytics live for page views, Fillout Analytics tab showing visitors/started/finished, and `source` parameters reaching Fillout submissions. No custom event pipeline.
- [ ] Handover recorded: Prerna can add a testimonial (via the Senja link) and knows the Drive folder workflow for new images. Adding a new portfolio piece requires a code change by Ashok — this is a known, accepted limitation, documented in the runbook so nobody is surprised by it later.
- [ ] Rollback plan written.
- [ ] 7 days live with no P0 or P1.

## How the Reviewer works

The Reviewer runs in a fresh conversation with no build context. It does not review its own work. It does not pass on inspection. Every box needs a command output, a screenshot or a measured number.

A fail listing three specific defects is worth more than a pass with three caveats.
