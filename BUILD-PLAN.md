# MeetPrerna — Build Plan for Antigravity

**Version:** 1.1 · **Date:** 2026-07-25

Paste-ready prompts. One phase per conversation. Do not carry a conversation across a phase gate.

---

## 0. Setup, before any prompt

```bash
mkdir meetprerna && cd meetprerna && git init
```

Drop the files in:

```
meetprerna/
├── AGENTS.md                          # root standing rules
├── DESIGN.md                          # colour, font, and layout rules
├── BUILD-PLAN.md                      # this file
├── docs/
│   ├── ARCHITECTURE.md                # from v1.0
│   ├── PRD.md                         # from v1.0
│   ├── agents.md                      # new
│   ├── designs.md                     # from v1.0
│   ├── animations.md                  # from v1.0
│   ├── shaders.md                     # from v1.0
│   ├── components.md                  # from v1.0
│   ├── content.md                     # new
│   └── INDEX.md                       # from v1.0
└── .agents/
    ├── rules/
    │   ├── 00-core.md
    │   └── 30-quality-gates.md
    └── workflows/
        ├── build-section.md
        └── review-ui.md
```

`DECISIONS.md`, `10-design-system.md` and `20-motion-performance.md` have since been retired — colour/font/layout content now lives solely in `DESIGN.md`.

Then in Antigravity:

1. Agent Manager → **+ Open Workspace** → point at this folder.
2. Confirm the rules loaded: `•••` → Additional options → Customizations → Rules. You should see four workspace rules.
3. Autonomy profile: **Review-driven development** for Phases 1 and 2.
4. `/build-section` and `/review-ui` should now appear as slash commands.

**Week one, in parallel with Phase 1:** book the photographer. The build is not the critical path. The photos are.

---

## Revised timeline (solo, with agents)

`PRD.md` §9 assumes five leads. This is re-cut for one person.

| Phase | Duration | Gate |
|---|---|---|
| 1 Foundation | 3 to 4 days | Tooling, tokens, CI green, shoot booked |
| 2 Structure | 6 to 8 days | Nine routes, content files, redirects, Fillout, Senja, Cloudinary |
| **Content** | **runs from day 1, blocks Phase 3** | 80% of assets delivered |
| 3 Motion | 5 to 7 days | Register built, 55fps on a Pixel 6a |
| 4 Shader | 2 to 3 days | Two passes, 5ms GPU, kill switches tested |
| 5 Launch | 4 to 5 days | Copy approved, redirects live, CMS handover |
| **Total** | **5 to 6 weeks of build** | plus content lead time |

Content is the long pole, not motion. `PRD.md` §9 calls Phase 3 the critical path. It is wrong. Motion can be cut back in an afternoon. A photo shoot cannot be compressed.

---

## Phase 1 — Foundation

```
Read AGENTS.md and DESIGN.md first. Work as the Architect persona
from docs/agents.md.

Scaffold the MeetPrerna project.

Stack, do not substitute:
Next.js App Router, TypeScript strict, pnpm, Tailwind for layout only,
CSS Modules for component internals, CSS variables for all tokens,
GSAP with ScrollTrigger, OGL for WebGL, next-cloudinary for images, Radix
primitives, Zod, Resend.

Do NOT install: lenis, three, @react-three/fiber, @react-three/drei.
They are cut.

Deliver:
1. Repo scaffold with the folder structure in .agents/rules/00-core.md
2. src/styles/tokens.css with the exact palette and type scale from
   DESIGN.md. Every value. Nothing invented.
3. Self-hosted Fraunces, Inter, JetBrains Mono via next/font. Latin
   subset. font-display: swap. Noto Sans Devanagari as fallback.
4. tailwind.config.ts reading the tokens. No colours defined in Tailwind.
5. ESLint, Prettier, Husky, lint-staged, Vitest, Playwright, Lighthouse CI
6. GitHub Actions running typecheck, lint, test, build in parallel
7. app/layout.tsx with root metadata and viewport
8. One canonical page at /_canon rendering every colour token with its
   measured contrast ratio, plus both display sizes and the full type scale
9. README.md with setup steps

Write the implementation plan as an artifact first. Stop for approval
before writing any file.

Gate: pnpm typecheck && pnpm lint && pnpm test && pnpm build all green,
Lighthouse desktop on /_canon at 95+ Performance and 100 Accessibility.
Paste the output.
```

---

## Phase 2 — Structure

```
Read AGENTS.md and DESIGN.md. Work as the Interface Engineer persona.
No animation in this phase at all.

Build all nine routes with real copy from docs/content.md.

Routes, exactly these:
/  /portfolio  /portfolio/[slug]  /sanctuary  /about  /consulting  /contact
/privacy  /terms

Do not build /studio, /process, /work, /art, /tattoos, /paintings or
/sketches as separate routes. They are dropped or merged into /portfolio.
PRD.md §4 is superseded.

Deliver in this order:
1. src/content/portfolio.ts — the typed Piece array, plus
   src/content/site.ts for the city line and other site-wide strings.
   No CMS, no Sanity, no database. Cloudinary public IDs referenced by
   string.
2. Layout shell: header, footer, mobile nav, container. Skip link first
   in tab order.
3. All nine routes with real copy from docs/content.md sections 3 to 7.
   Where content.md has no copy, use TODO(prerna): and move on. Never
   invent a fact about her practice.
4. Redirects in next.config.js. Verify each with curl -I and paste the
   output.
5. /consulting: FilloutStandardEmbed, filloutId gvnCVtzfz2us, framed in our own
   chrome. dynamicResize, inheritParameters, and
   onInit/onSubmit wired to the enquiry_started/enquiry_submitted events.
   Do NOT use the raw script-tag embed. Skeleton while loading, static
   fallback (mailto + WhatsApp line) if the script fails to load.
6. WhatsApp: one small fallback link, footer and beside the /consulting embed
   only. Never a button, never accent-coloured.
7. SEO: per-route metadata from content.md §8, sitemap.ts, robots.ts,
   JSON-LD Person + Service + BreadcrumbList + FAQPage on /sanctuary.
   NO LocalBusiness. NO address. NO map embed.
8. 404 and 500 pages with the copy from content.md §7.
9. /portfolio/[slug] renders in light mode ONLY when the piece's medium
   is Painting or Sketch. The /portfolio archive grid itself stays dark
   throughout. Ivory ground, ink text, patina-deep for accent text on
   the light detail pages.
10. /contact: lighter weight than /consulting, no embed required for
    launch, press kit link and a plain email. Copy in content.md's new
    Contact page section.

Gate: all nine routes navigable, every
redirect verified, form delivers a real email, Lighthouse mobile
Performance 85+ Accessibility 95+ SEO 100, axe-core zero critical.
```

---

## Phase 2.5 — Content checkpoint

Not a prompt. A stop.

Open `docs/content.md` §9 and count what has actually been delivered. If it is below 80%, **do not start Phase 3.** Animating placeholder rectangles feels like progress and is not.

If content is behind, use the time to write the FAQ answers and the twelve piece stories with Prerna. That work has to happen anyway and it does not depend on the shoot.

---

## Phase 3 — Motion

```
Read AGENTS.md. Work as the Motion Engineer persona.

Confirm before starting: is 80% of docs/content.md §9 delivered? If not,
stop and say so.

Motion governance no longer runs through a numbered register — that
system was retired. Build motion with a stated purpose and a
prefers-reduced-motion path in the same commit. Nothing else.

Cut, do not reintroduce: Lenis smooth scroll, the custom cursor,
cursor-driven font-variation-settings, mix-blend-mode on moving elements.

Deliver:
1. src/animations/easing.ts with the duration and easing tokens
2. One timeline factory per section in src/animations/timelines/, each
   returning a timeline plus kill()
3. usePrefersReducedMotion, honoured in every single timeline
4. M2, the session line: one continuous SVG stroke threading the whole
   home page, drawn by ScrollTrigger scrub, ending as the underline of
   the final CTA. This is the signature element. Under reduced motion it
   renders fully drawn and static.
5. GSAP context cleanup on every component unmount

Rules, from the ruleset:
- transform, opacity, clip-path, filter only
- UI motion under 300ms. Narrative motion up to 900ms.
- exit at 60 to 70% of enter
- no ease-in on UI, ever
- never animate from scale(0)
- CSS transitions, not keyframes, on anything triggered rapidly
- hover gated behind @media (hover: hover) and (pointer: fine)

Gate: 55fps minimum on a Pixel 6a scroll-stress test, recorded. Every
reduced-motion path verified manually with the OS setting on. Zero
layout shift from any animation. Lighthouse mobile Performance 90+.
```

---

## Phase 4 — Shader

```
Read AGENTS.md, docs/shaders.md §1 to §4.
Work as the Shader Engineer persona.

Two passes only: InkField and Grain. One OGL canvas. The GLSL in
shaders.md is portable and does not change, only the mount layer.

Do not build Distortion, InkDrop or the Process shader. They are moved
to a post-launch backlog.

Deliver:
1. One OGL canvas in the root layout, z-index 0, pointer-events none
2. InkField: low frequency simplex plus slow FBM drift
3. Grain: final pass overlay
4. All five kill switches, individually tested and screenshotted:
   prefers-reduced-motion, saveData, deviceMemory <= 4,
   hardwareConcurrency <= 4, no WebGL context
5. DPR capped at 1.25 mobile, 1.75 desktop
6. RAF paused on document.hidden and when the canvas is off-screen
7. Mount only after requestIdleCallback and after the LCP image paints
8. Fallback: static CSS radial gradient plus a grain PNG under 30KB.
   Screenshot it. It must look deliberate, not broken.

Gate: combined GPU under 5ms on a Pixel 6a, measured on a real device
not estimated. OGL chunk async only, absent from the initial bundle,
bundle report attached. All five kill switches screenshotted.
Lighthouse mobile Performance 90+, Best Practices 100.
```

---

## Phase 5 — Launch

```
Read AGENTS.md and .agents/rules/30-quality-gates.md.

Pre-launch:
1. Every piece of copy approved by Prerna. No TODO(prerna): left anywhere.
2. Every image consented, captioned, alt-tagged per content.md §8.
3. Testimonials: only ones naming Prerna, each with a source link.
4. Analytics firing all six funnel events.
5. Sentry wired. Source maps uploaded.
6. Full a11y pass: VoiceOver on Safari, NVDA on Firefox, keyboard only.
7. Rollback plan written.

Switch day, in order:
1. Deploy to production, verify on the Vercel URL
2. Point DNS
3. curl -I every redirect against the live domain
4. Submit the new sitemap in Search Console
5. Keep the old sitemap live for 30 days
6. Watch Search Console coverage daily for two weeks

Then: recorded 30-minute CMS handover with Prerna. She adds one piece
unaided. If she cannot, Phase 5 has not passed.

Gate: 7 days live with no P0 or P1.
```

---

## Fix this week, separate from the build

Four defects on the live site right now. Roughly an hour of work.

1. Footer links for "Expertise", "About" and "Blog" resolve to `etemplates.wdesignkit.com/techtide/...`, a template demo site.
2. The footer shows `prerna@meetprerna.com` but the `mailto:` is `hello@prosepixel.co`.
3. The counters render "Tattoos Completed 0+" and "Client Satisfaction 0%" when the count-up script does not fire.
4. Four of the five testimonials name "Alza", not Prerna.

The footer credits ALCHEMETRYX. Broken links under your own agency credit cost more than the hour.

---

## Prompt hygiene

- One phase per conversation. Fresh conversation at every gate.
- Maximum two parallel agents, only the pairings in `docs/agents.md` §6.
- Never run two agents on `tokens.css`.
- Never run Motion Engineer and Interface Engineer on the same route at once.
- Always: plan artifact first, approve, then build.
- If the agent says something contradicts `DESIGN.md`, believe it and check. That refusal is the ruleset working.
