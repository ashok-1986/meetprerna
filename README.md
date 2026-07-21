# MeetPrerna — Creative Studio & Tattoo Artist Portfolio

> A high-craft, motion-driven portfolio for **MeetPrerna** — a Navi Mumbai and Mumbai-based creative studio led by Prerna, a tattoo artist, painter, and sketch artist.

This repository hosts the production codebase. **You are currently looking at the `/docs` and configuration of a blueprint.** Implementation begins after sign-off on the architecture documents in `docs/`.

---

## Quick links

| Document | Purpose |
|---|---|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Top-level overview, system map, and reading order |
| [docs/PRD.md](./docs/PRD.md) | Product requirements, phase gates, acceptance criteria |
| [docs/agents.md](./docs/agents.md) | Specialized AI agent roles & collaboration protocols |
| [docs/designs.md](./docs/designs.md) | Design system, components, animations, shaders |
| [docs/content.md](./docs/content.md) | Content inventory and copy deck |
| [docs/animations.md](./docs/animations.md) | Exhaustive animation choreography |
| [docs/shaders.md](./docs/shaders.md) | GLSL shader specifications & uniform controls |
| [docs/components.md](./docs/components.md) | Reusable component API reference |

---

## Stack at a glance

- **Framework:** Next.js 14 (App Router, RSC, streaming)
- **Language:** TypeScript strict
- **Styling:** Tailwind CSS (layout only) + CSS Modules (component-level) + design tokens via CSS custom properties
- **Motion:** GSAP 3.12 + ScrollTrigger + SplitText + Observer + Lenis smooth scroll
- **3D / WebGL:** three.js + @react-three/fiber + @react-three/drei (selective; lazy-loaded)
- **UI primitives:** Radix UI + shadcn/ui patterns (hand-rolled, not vendored)
- **Forms:** react-hook-form + zod
- **i18n:** next-intl
- **CMS:** Sanity (headless, structured content for portfolio, services, journal)
- **Hosting:** Vercel (edge + ISR) with image optimization via `next/image`
- **Quality:** Vitest, Playwright, axe-core, Lighthouse CI

See `docs/ARCHITECTURE.md` for the full system diagram and rationale.

---

## Local development

> Implementation has not yet started. Once Phase 1 (Foundation) is approved, follow the setup below.

```bash
pnpm install
cp .env.example .env.local   # fill in the keys you have
pnpm dev                     # http://localhost:3000
pnpm storybook               # http://localhost:6006
pnpm test                    # unit + integration
pnpm test:e2e                # Playwright
pnpm typecheck && pnpm lint
```

---

## Brand snapshot

| Token | Value | Use |
|---|---|---|
| `--color-inchworm` | `#C4FF61` | Primary accent, CTAs, focus |
| `--color-marigold` | `#EAFF27` | Secondary accent, editorial highlights |
| `--color-ink` | `#1A1A1A` | Background, surfaces |
| `--color-ivory` | `#FDFFE9` | Default text, light surfaces |
| Font (display) | Cormorant Garamond | All h1–h3, hero, editorial moments |
| Font (editorial) | Times New Roman italic | Reserved for testimonials, journal pull-quotes |
| Font (body) | MG12 (or fallback) | Long-form copy, UI |

---

## License

Proprietary. © MeetPrerna Studio. All rights reserved.
