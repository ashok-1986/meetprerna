# Directory Tree

* `/app`: Next.js App Router core files (`layout.tsx`, `page.tsx`).
  * `/app/page.tsx` — Home
  * `/app/portfolio/page.tsx` — Portfolio index
  * `/app/portfolio/[slug]/page.tsx` — Portfolio detail (dynamic)
  * `/app/about/page.tsx` — Full narrative
  * `/app/connect/page.tsx` — Consultation intake (see `CONSULTATION.md`)
* `/components/animations`: Reusable GSAP and Framer components (e.g., `TextReveal.tsx`, `ImageDistort.tsx`, `PinnedSequence.tsx` — new, powers the narrative pinned-scroll pattern in `ANIMATIONS.md`).
* `/components/ui`: Static interface elements (e.g., `Navigation.tsx`, `Footer.tsx`, `CTAButton.tsx`, `ClientVoiceCard.tsx` — new).
* `/content/portfolio`: Local `.md` files detailing specific art pieces and tattoo case studies. One file per `[slug]` route.
* `/content/narrative`: Local `.md` files containing the biographical journey (all four optimized story blocks — see `CONTENT.md`).
* `/content/voices`: New — local `.md` or `.json` files holding client quote entries for the Client Voices section.
* `/hooks`: Custom React hooks for window resizing, mouse tracking, scroll progress, and `usePrefersReducedMotion.ts` (new).
* `/lib`: Utility functions for parsing Markdown files (`mdParser.ts`) and formatting dates.
* `/public/assets/tattoos`: High-resolution WebP imagery of living ink projects.
* `/public/assets/canvas`: High-resolution WebP imagery of abstract paintings.
* `/scripts`: New — build-time responsive image generation script (see `ASSETS.md`).
* `/styles`: Global CSS and Tailwind configuration directives.
