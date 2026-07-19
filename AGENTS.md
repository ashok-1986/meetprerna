<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# meetprerna — Next.js 16 (React 19) Portfolio Site

## Quick Commands

```bash
pnpm dev          # Dev server on port 3001 (Turbopack)
pnpm build        # Production build
pnpm start        # Prod server on port 3001
pnpm lint         # ESLint (Next.js core-web-vitals + TS config)
```

## Architecture

- **Framework**: Next.js 16.2.1 with App Router, React 19.2.4, React Compiler enabled
- **Styling**: Tailwind CSS v4 (PostCSS), CSS variables via `globals.css`
- **UI**: shadcn/ui (Radix Nova style), lucide-react icons
- **Motion**: Framer Motion, Lenis smooth scroll
- **Fonts**: Geist (via `next/font`), custom fonts via `replace_font.js`
- **Alias**: `@/*` → `src/*`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout (fonts, providers, global styles)
│   ├── page.tsx         # Homepage — hero → featured work → statement → disciplines → marquee → process → testimonials → CTA
│   ├── work/page.tsx    # Portfolio grid
│   ├── story/page.tsx   # About page (story beats)
│   └── contact/page.tsx # Contact form
├── components/
│   ├── ui/              # shadcn components (button, dialog, sheet, separator, badge, LineReveal, WordReveal)
│   ├── about/           # About page components (StoryBeat, PhilosophyStrip, etc.)
│   ├── work/            # Portfolio components
│   └── contact/         # Contact form
└── lib/
    ├── utils.ts         # cn() utility
    └── SmoothScrollProvider.tsx  # Lenis provider
```

## Key Patterns

### React Compiler
Enabled in `next.config.ts` — no `useMemo`/`useCallback` needed for memoization.

### Client Components
- Most UI components are client components (`"use client"`)
- `SmoothScrollProvider` wraps layout for Lenis
- `Navbar`, `HeroReveal`, `CustomCursor` use client-side effects

### Styling
- Tailwind v4: `@import "tailwindcss"` in `globals.css`
- CSS variables for theming (dark mode via `class` strategy)
- Custom animations via `tw-animate-css`

### shadcn/ui Config
- `components.json` defines aliases, style: "radix-nova", cssVariables: true
- UI components in `src/components/ui/`
- Use `cn()` from `@/lib/utils` for class merging

## Pages Overview

| Route | Components |
|-------|------------|
| `/` | HeroReveal → FeaturedWork → Statement → DisciplinesStrip → Marquee → Process → Testimonials → CTA |
| `/work` | PortfolioGrid (featured + grid) |
| `/story` | AboutHero → StoryBeat → PhilosophyStrip → AboutTestimonials → AboutCTA |
| `/contact` | ContactSection |

## Image Assets

- `public/hero/` — Portrait images (jpg/png variants)
- `public/work/` — Portfolio images (jpg/png variants)
- `public/logo/` — Brand logo

## Environment

- Node 20+ (per `package.json` engines)
- pnpm workspace (see `pnpm-workspace.yaml`)
- No `.env` required for local dev

## Lint/Typecheck

```bash
pnpm lint        # ESLint with Next.js config
# No separate typecheck script — TS runs during build
```

## Common Gotchas

1. **Port 3001** — Dev and prod servers both use 3001 (not default 3000)
2. **React 19** — Uses new JSX transform, no `React` import needed
3. **Turbopack** — `next dev` uses Turbopack by default in v16
4. **React Compiler** — Enabled in `next.config.ts`; don't add manual memoization
5. **Tailwind v4** — Config in CSS, not `tailwind.config.js`
6. **Lenis** — Smooth scroll via `SmoothScrollProvider`; don't add manual scroll listeners
7. **Radix Nova** — shadcn uses `@radix-ui/react-*` v1.4.3 (not latest v2)