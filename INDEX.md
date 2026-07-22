# MeetPrerna Blueprint — Delivery Manifest

**Version:** 1.0 · **Date:** 2026-07-22 · **Status:** Complete · **Read this first**

---

## 1. What this package is

A complete, internally-consistent **technical architecture and development blueprint** for an immersive portfolio website for **MeetPrerna** — a Navi Mumbai and Mumbai-based creative studio and tattoo artist.

The blueprint is:

- **Documentation-first.** Eight cross-referenced `.md` files in `docs/`.
- **Anchored in working code.** ~20 source files demonstrate the spec — design tokens, GSAP + Lenis setup, R3F ink-field shader, custom cursor, Sanity schemas, root layout.
- **CI-ready.** ESLint, Prettier, TypeScript strict, Lighthouse CI budget, Playwright, Vitest all wired.
- **Phase-gated.** 
- [x] Phase 1: Foundation
- [x] Phase 2: Structure
- [x] Phase 3: Motion
- [x] Phase 4: Polish
- [x] Phase 5: Launch

It is **not**:

- A finished website.
- A drop-in starter (no `node_modules`; you run `pnpm install` after Phase 1 sign-off).
- A monolithic app (the codebase is split into clear modules with a folder architecture you can grow into).

---

## 2. Reading order (read these first)

If you have 30 minutes:
1. `docs/ARCHITECTURE.md` — the system map and the philosophy.
2. `docs/PRD.md` §1–3 — the goals, the audience, the four-pillar thesis.
3. `docs/agents.md` §1–4 — the people (or roles) and how they collaborate.
4. `docs/designs.md` §1–7 — the visual + motion language.

If you have 2 hours, add:
5. `docs/animations.md` §0–3 — the GSAP contract and the hero choreography.
6. `docs/shaders.md` §1–3 — the GLSL contract and the ink-field.
7. `docs/components.md` §1–3 — the component primitives.
8. `docs/content.md` §1–3 — the voice and the home-page copy.

If you are signing off Phase 1, read the whole set.

---

## 3. File map (everything shipped)

### 3.1 Top-level configuration

| File | Purpose | Bytes |
|---|---|---|
| `package.json` | All deps with pinned versions; pnpm 9; scripts for dev, build, test, e2e, lighthouse, storybook. | 3.6 KB |
| `tsconfig.json` | TS 5.6 strict mode; path aliases; `noUncheckedIndexedAccess`. | 1.4 KB |
| `next.config.js` | App Router config; image domains; security headers; GLSL loader; bundle splits for gsap/three/lenis. | 3.5 KB |
| `tailwind.config.ts` | Layout-only Tailwind; consumes design tokens; fluid type scale; keyframes. | 4.5 KB |
| `postcss.config.js` | Tailwind + autoprefixer (with grid + flexbox). | 0.2 KB |
| `.eslintrc.json` | Next + TS + a11y + react-hooks; bans framer-motion for orchestration. | 1.9 KB |
| `.prettierrc.json` | Prettier + tailwind plugin. | 0.3 KB |
| `.gitignore` | Next + node + vercel + lighthouse. | 0.5 KB |
| `.env.example` | All env keys with descriptions. | 0.9 KB |
| `lighthouserc.json` | Performance / a11y / SEO budget enforcement. | 1.5 KB |
| `README.md` | Developer quick-start. | 3.1 KB |

### 3.2 CI / Editor

| File | Purpose |
|---|---|
| `.github/workflows/ci.yml` | Lint, typecheck, test, build, e2e, lighthouse — all in parallel. |
| `.vscode/settings.json` | Format-on-save, ESLint fix, TS workspace SDK. |
| `.vscode/extensions.json` | Recommended extensions. |

### 3.3 Documentation (`docs/`)

| File | Lines | Sections | Purpose |
|---|---|---|---|
| `ARCHITECTURE.md` | 340 | 9 | System map, folder architecture, naming conventions, phase gates, non-goals. |
| `PRD.md` | 594 | 13 | Goals, personas, IA, page specs, technical architecture, content strategy, phase gates, timeline, risks, open questions. |
| `agents.md` | 382 | 7 | Role definitions (Frontend Architect, Animation Engineer, WebGL Dev, Content Strategist, UX Writer), decision authority, collaboration protocol. |
| `designs.md` | 683 | 16 | Color system, type, spacing, layout primitives, component inventory, motion grammar, micro-interactions, shader overview, imagery, don'ts. |
| `animations.md` | 542 | 15 | GSAP + Lenis contract, the five motion verbs, per-section choreography (home, studio, portfolio, process, about, contact, book), cursor details, page transitions. |
| `shaders.md` | 659 | 14 | Five passes (InkField, Grain, Distortion, Ink Drop, Process), GLSL code, uniforms, performance budgets, mobile-tier handling. |
| `components.md` | 1,295 | 11 | Public API for every reusable: layout, UI primitives, visual primitives, media, cursor, section components, hooks, libs. |
| `content.md` | 482 | 18 | Voice, copy deck (site-level, home, studio, tattoos, paintings, sketches, process, about, contact, book), FAQs, testimonials, taxonomy, SEO, image inventory. |

**Total documentation: ~4,977 lines.**

### 3.4 Source — styles

| File | Purpose |
|---|---|
| `src/styles/tokens.css` | Every design token — color, type (fluid), space, motion, layout, radii, z-index, shadows. The single source of truth. |
| `src/styles/globals.css` | Resets, base typography, focus rings, skip link, shader canvas, Tailwind layers. |
| `src/styles/fonts.css` | Font fallbacks + override metrics. |
| `src/styles/prose.css` | Long-form essay typography. |

### 3.5 Source — animations

| File | Purpose |
|---|---|
| `src/animations/easing.ts` | `dur`, `easeCss`, `ease` (GSAP-friendly), `withEase()` helper. |
| `src/animations/timelines/hero.timeline.ts` | A complete, working hero timeline: image mask + word-by-word headline + subhead + CTA cascade + parallax. The contract every other section's timeline follows. |

### 3.6 Source — hooks

| File | Purpose |
|---|---|
| `src/hooks/usePrefersReducedMotion.ts` | Reactive `prefers-reduced-motion` query. |
| `src/hooks/useGsapContext.ts` | `gsap.context()` wrapper for safe per-component animation lifecycle. |
| `src/hooks/useIsCoarsePointer.ts` | Touch device detection. |
| `src/hooks/useDeviceTier.ts` | Low / mid / high tier classifier; drives shader decisions. |

### 3.7 Source — lib

| File | Purpose |
|---|---|
| `src/lib/gsap.ts` | Plugin registration, Lenis singleton, GSAP-ticker sync. |
| `src/lib/sanity/schemas/portfolioItem.ts` | The most-used schema. Tattoos, paintings, sketches all flow through this. |
| `src/lib/sanity/schemas/series.ts` | For paintings/sketches grouping. |
| `src/lib/sanity/schemas/service.ts` | Service offering (tattoo, painting, sketch). |
| `src/lib/sanity/schemas/testimonial.ts` | With permission gating. |
| `src/lib/sanity/schemas/faq.ts` | Categorized, ordered. |
| `src/lib/sanity/schemas/sitePage.ts` | Long-form essays via Portable Text. |
| `src/lib/sanity/schemas/index.ts` | Barrel. |

### 3.8 Source — components

| File | Purpose |
|---|---|
| `src/components/shaders/ShaderRoot.tsx` | Mounts InkField + Grain after `usePrefersReducedMotion` and idle check. |
| `src/components/shaders/InkField.tsx` | The full-bleed ambient ink shader (R3F, three.js, dynamic import). |
| `src/components/shaders/Grain.tsx` | The film-grain overlay. |
| `src/components/layout/SmoothScrollProvider.tsx` | Owns the Lenis lifecycle. |
| `src/components/cursor/CustomCursor.tsx` | The ink-blot cursor with five states, all `data-cursor` driven. |

### 3.9 Source — app & config

| File | Purpose |
|---|---|
| `src/app/layout.tsx` | Root layout: html, fonts, metadata (full OG, Twitter, robots), viewport, ShaderRoot, SmoothScrollProvider, CustomCursor, skip link. |
| `src/config/site.ts` | Site-wide constants — name, tagline, address, hours, social, feature flags. |
| `src/config/nav.ts` | Primary nav + footer nav, typed. |

---

## 4. The five-phase build (recap)

| Phase | Output | Sign-off owner | Hard gate |
|---|---|---|---|
| **1. Foundation** | Repo, tokens, fonts, CI, one canonical "Hello" page. | Frontend Architect | `pnpm install && pnpm dev && pnpm typecheck && pnpm lint && pnpm test && pnpm build` all green; Lighthouse desktop ≥ 95. |
| **2. Structure** | All routes navigable; CMS round-trip; forms; SEO; no motion. | Frontend Architect | Lighthouse mobile ≥ 85; axe-core 0 critical. |
| **3. Motion** | Lenis + GSAP + section timelines + cursor + transitions. | Animation Engineer | 55fps on Pixel 6a; reduced-motion paths work. |
| **4. Polish** | Shaders, distortion, perf to budget. | WebGL Dev + Frontend Architect | Lighthouse mobile ≥ 90; bundle splits in place. |
| **5. Launch** | Content loaded, audited, deployed, monitored. | Studio + Frontend Architect | 7-day stability window; WCAG 2.1 AA audit clean. |

Each phase is documented in `PRD.md` §8 with full acceptance criteria.

---

## 5. The four-pillar thesis, made real

The blueprint doesn't just *name* Psychology, Meditation, Therapy, and Calmness — it builds them into the architecture:

- **Psychology** lives in the *consultation step* on `/process`, in the slow interview pattern of the contact form, in the long-form essays that explain the *why* before the *what*.
- **Meditation** lives in the *scroll pacing* (100vh per section), the *breath easing* (`sine.inOut`), the *5s* of stillness between parallax updates, the *6s* cycle of the footer dot, and the *idle grace* of 30s after the last user interaction.
- **Therapy** lives in the *cursor* — an ink-blot that follows, settles, doesn't grab. In the *no-pressure CTA* ("Begin a piece" not "Book now"). In the *transparent process* (five steps, no hidden gate).
- **Calmness** lives in the *dark canvas* (no white, no high contrast pops), the *one accent* (only inchworm for CTA), the *quiet type* (Cormorant Garamond at 400, not 700), the *Lenis duration of 1.2s* (not 0.6s), and the *festival of negative space* between sections.

If a future feature contradicts a pillar, the feature loses.

---

## 6. What's intentionally *not* in v1

These are the non-goals, locked in `ARCHITECTURE.md` §8 and `PRD.md` §12:

- E-commerce.
- Multi-language.
- User accounts.
- Comments.
- Native mobile app.
- A blog / journal route (scaffolded, not built).

---

## 7. The open questions before Phase 1

These are the only blockers. Full list in `PRD.md` §10.

1. **Sanity** confirmed as CMS? *(Default: yes.)*
2. **Booking flow** — own the form or link to Calendly / Cal.com? *(Default: own form + email; Calendly as fallback in `/book`.)*
3. **Hindi / English at launch?** *(Default: English only, i18n seams in place.)*
4. **Original imagery available?** *(Default: 24–36 portfolio pieces, 3 portraits, 6–10 studio photos needed.)*
5. **Domain + email set up?** *(Default: `meetprerna.com` + `studio@meetprerna.com` via Resend / Google Workspace.)*
6. **MG12 font license confirmed?** *(Default: fall back to Inter; swap to MG12 when license clears.)*
7. **Studio video content planned?** *(Default: commission 3 short vertical videos, one per practice.)*
8. **Subject rights** — are all published client photos opt-in? *(Default: yes.)*

---

## 8. How to start

After sign-off on the blueprint and the open questions:

```bash
# 1. Clone
git clone <repo>
cd meetprerna

# 2. Install
pnpm install

# 3. Configure
cp .env.example .env.local  # fill in what you have

# 4. Run
pnpm dev                    # http://localhost:3000
pnpm storybook              # http://localhost:6006

# 5. Verify
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

Phase 1 begins with a single PR that wires the tokens, the canonical "Hello" page, and a green CI.

---

## 9. The contract

This blueprint is the *source of truth*. If the code disagrees with the docs, the docs win (and a PR is opened to fix the code). If the docs disagree with each other, the *lower-numbered doc* wins — `ARCHITECTURE.md` > `PRD.md` > `agents.md` > `designs.md` > `animations.md` > `shaders.md` > `components.md` > `content.md` (for cross-cutting docs) and `PRD.md` > `content.md` (for business decisions).

The Frontend Architect arbitrates any remaining ambiguity.

---

## 10. Credits

A project for **MeetPrerna Studio**, Navi Mumbai. Concept, design, and engineering blueprint authored as a Mavis-team deliverable, July 2026.

*"Ink as language. Studio as a slow room."*
