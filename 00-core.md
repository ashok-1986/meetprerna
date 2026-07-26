# Rule: Core

Applies to every agent, every task, always.

## Source of truth

Read `@/DECISIONS.md` before acting. It overrides every other document in this repo, including `PRD.md`.

Full precedence and project context: `@/AGENTS.md`.

## Stack (locked, do not substitute)

- Next.js App Router, React, TypeScript strict, pnpm
- Tailwind for layout only. CSS Modules for component internals. CSS variables for all tokens.
- GSAP with ScrollTrigger for scroll motion. Native scroll. No Lenis.
- OGL for WebGL. Not three.js, not @react-three/fiber, not drei.
- **No CMS, no media host.** Piece data is a typed array in `src/content/portfolio.ts`. Images live in `/public/images/` and use the Next.js `<Image>` component. Testimonials come from the Senja API at build time. Do not install Sanity or Cloudinary.
- Radix for Dialog, Tabs, Tooltip. Zod for validation. Resend for email.

Adding any dependency outside this list requires a written justification with the gzipped size, in the PR description, before install.

## File conventions

```
src/
  app/                 routes only, thin
  components/
    layout/            header, footer, nav, container
    ui/                button, input, dialog, tag
    sections/          one folder per page section
    media/             image, figure, gallery
    shaders/           OGL canvas and passes
  animations/
    easing.ts          duration and easing tokens
    timelines/         one factory per section
  content/             portfolio.ts, testimonials.ts, site.ts
  lib/                 seo, analytics, senja, utils
  styles/              tokens.css, globals.css, prose.css
  hooks/
```

- Components: `PascalCase.tsx`. Hooks: `useThing.ts`. Timelines: `thing.timeline.ts`.
- Named exports. No default exports except Next.js route files.
- One component per file. If a file passes 200 lines, split it.

## Non-negotiables

1. No raw colour values outside `src/styles/tokens.css`.
2. No `any`. No `@ts-ignore` without a comment explaining why.
3. No `console.log` in committed code.
4. No secret, key or token in the repo. Use `.env.local` and `src/lib/env.ts`.
5. No fact invented about Prerna's practice. Use `TODO(prerna):`.
6. **Never remove test tooling.** Playwright, `@axe-core/playwright`, Vitest and Lighthouse CI are devDependencies. They never ship to a user and have zero effect on bundle size. Removing them silently disables the merge gates in `30-quality-gates.md`, and the failure is invisible until something ships broken. If a test dependency looks unused, say so and stop. Do not uninstall it.
6. No route added beyond the ten in `@/AGENTS.md`.

## Ending a turn

Every turn ends with three lines:

- **Built:** what changed, file paths.
- **Skipped:** what you deliberately did not do, and why.
- **Verify:** the exact command or URL the human should check.

No summary paragraphs. No restating the task back.
