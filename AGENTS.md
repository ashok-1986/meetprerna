# AGENTS.md — MeetPrerna

Standing instructions for every agent in this workspace. Read this before any other file.

---

## Read order, every conversation

1. This file.
2. `DECISIONS.md` — the locked answers. It overrides every other document.
3. Your persona in `docs/agents.md`.
4. Only the spec files your persona owns. Do not read all eight.

Precedence when documents disagree:

`DECISIONS.md` > `BLUEPRINT.md` > `ARCHITECTURE.md` > `PRD.md` > `docs/agents.md` > `DESIGN.md` > `MOTION.md` > `docs/content.md` > `docs/components.md`

**`PRD.md` §5 (page-by-page specs) is dead.** Use `BLUEPRINT.md`. `PRD.md` §4, §6.1 and §7.2 are superseded by `DECISIONS.md`.

If a doc contradicts `DECISIONS.md`, the doc is wrong. Say so, then follow `DECISIONS.md`.

---

## The project in one line

An immersive portfolio for Prerna, a tattoo artist and painter working across Mumbai and Navi Mumbai and travelling, that turns a nervous first-timer into a booked consultation.

Four pillars govern every decision: Psychology, Meditation, Therapy, Calmness. If a feature contradicts a pillar, the feature loses.

---

## The stack

Locked in `DECISIONS.md` §18. Do not substitute, do not add to it without a written reason.

- Next.js App Router, TypeScript strict, pnpm. Tailwind for layout, CSS Modules for component internals, CSS variables for tokens.
- GSAP + ScrollTrigger. Native scroll, no Lenis. OGL for the two shaders, not three.js.
- **Enquiries: Fillout**, form `gvnCVtzfz2us`, via `@fillout/react` `FilloutStandardEmbed`. Never the raw script-tag embed. `DECISIONS.md` §9.
- **Testimonials: Senja**, fetched from its API at build time and rendered in our own components. Never their widget embed. `DECISIONS.md` §19.
- **Images: `/public/images/`** with the Next.js `<Image>` component. No Cloudinary, no media host. `DECISIONS.md` §20.
- **No CMS, no database.** Piece data is a typed array in `src/content/portfolio.ts`. Do not install Sanity. `DECISIONS.md` §21.
- Deposits are handled by Cashfree, entirely outside this site. Not our concern.
- **Measurement is two separate layers. `DECISIONS.md` §22.** The funnel is measured at source: Vercel Analytics for page views, Fillout's own Analytics tab for form visitors/started/finished. Never build a client-side funnel event pipeline. Separately, `/api/analytics` records on-site behaviour only, the things no third party can see: slider use, sketchbook opens, filter use, scroll depth, CTA taps. Its sink is deliberately open for now.

---

## Hard rules

These are not preferences. A PR that breaks one of these does not merge.

### Tokens
- No raw hex, rgb or hsl outside `src/styles/tokens.css`. Not in a component, not in a shader uniform default, not in a Tailwind class.
- One accent: `--color-inchworm` (`#C4FF61`). There is no second accent. Marigold is deleted.
- Accent budget: one FILLED accent element per viewport, max. `DESIGN.md` §4.
- Any new colour pair must have its contrast ratio measured and written into `designs.md` §2.4 before commit. Estimated ratios are rejected.

### Motion
- Animate only `transform`, `opacity`, `clip-path`, `filter`. Nothing else. Ever.
- Every animation needs a row in the motion register (`.agents/rules/20-motion-performance.md`) before it is written.
- Every animation ships with its `prefers-reduced-motion` path in the same commit.
- No `ease-in` on UI. No `transition: all`. No entry from `scale(0)`.
- Lenis and the custom cursor are **cut**. Do not reintroduce them. See `DECISIONS.md` §10 and §11.

### Accessibility
- WCAG 2.1 AA is a merge gate, not a phase.
- Visible focus ring on every interactive element. `--color-inchworm`, 2px solid, 2px offset.
- Icon-only buttons need `aria-label`. Every form field needs a real `<label>`.
- Errors announce via `role="alert"`. Dialogs trap and restore focus.
- Hover-only interactions are banned. Gate all hover behind `@media (hover: hover) and (pointer: fine)`.

### Performance
- Initial route JS ≤ 130KB gzipped. Hard cap 180KB.
- Never import `three`, `ogl` or any GSAP plugin into a server component or a shared bundle.
- Every image goes through `next/image` with an explicit `sizes`. `priority` on the hero LCP image only.
- No new dependency without a one-line justification that includes the gzipped size.

### Content
- Never write placeholder copy where `content.md` has real copy.
- Never invent a fact about Prerna's practice. No pricing, no address, no medical claim, no timeline she has not confirmed. If a fact is missing, leave a `TODO(prerna):` and move on.
- There is no fixed studio address. No `LocalBusiness` schema, no map embed. See `DECISIONS.md` §8.

### Scope
- The routes are `/`, `/portfolio`, `/portfolio/[slug]`, `/sanctuary`, `/about`, `/consulting`, `/contact`, `/privacy`, `/terms`. Do not add one.
- `/portfolio` holds tattoos, paintings and sketches together, filtered by medium. There is no separate `/work` or `/art` route. `DECISIONS.md` §6.
- Out of scope for v1: e-commerce, multi-language, accounts, comments, journal, native app.

---

## How to work

- **Plan before code.** Write the implementation plan as an artifact, get it approved, then build. Do not start editing files on a fresh instruction.
- **One phase per conversation.** When a phase gate passes, start a new conversation.
- **Small commits.** One section or one component per commit.
- **Verify, do not assume.** After a UI change, run the dev server, open the page in the browser tool, and screenshot it. A claim that something works without a screenshot or a command output is not evidence.
- **Stop on contradiction.** If an instruction conflicts with a locked decision, stop and say so. Do not quietly build the other thing.
- **Never substitute for an unanswered question.** If a prompt asks you to check something and report back, report back. Do not build a workaround and describe it as complete. A placeholder that satisfies a type signature but does not do the job is worse than no implementation, because it hides the gap.
- **Never claim a measurement you did not take.** "Should be under the cap" is not a measurement. If you cannot measure something, say the words "I could not measure this" and give the reason.
- **Say what you did not do.** End every turn with what you deliberately skipped and why.

---

## Commands

```bash
pnpm dev              # local
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
pnpm test             # vitest
pnpm e2e              # playwright
pnpm build            # next build
pnpm lh               # lighthouse ci
pnpm a11y             # axe-core against the running dev server
```

Before claiming any phase is done: `pnpm typecheck && pnpm lint && pnpm test && pnpm build` must be green. Paste the output.

---

## Tone in this repo

Written English throughout is plain and direct. Short sentences. No marketing register in code comments, commit messages or UI copy. If a sentence sounds like a press release, rewrite it.
