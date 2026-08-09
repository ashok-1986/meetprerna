# Technical Specifications

**Core Stack**

* **Framework:** Next.js (App Router, v14+) for static site generation and optimal load times.
* **Styling:** Tailwind CSS (v3+) for rapid, scalable utility classes.
* **Animation Libraries:** GSAP (v3+) for complex scroll-triggers and sequencing; Three.js (@react-three/fiber) for WebGL image distortion effects.
* **Content Strategy:** Markdown (`.md`) and JSON files parsed locally via `gray-matter` and `remark`.

**Routing (Phase 2 finalized — 5 pages)**

* `/` — Home
* `/portfolio` — Filterable index across all categories
* `/portfolio/[slug]` — Individual piece detail, dynamic route driven by `/content/portfolio/*.md`
* `/about` — Full narrative
* `/connect` — Consultation intake (see `CONSULTATION.md`)

**Rationale for CMS Exclusion**
External Headless CMS tools (like Sanity or Contentful) introduce unnecessary network latency, subscription costs, and maintenance overhead for a single-artist portfolio. By maintaining content as code via local Markdown files, we achieve perfect version control, instantaneous build times, and absolute security.

**Accessibility & Responsive Rules (New — Phase 2)**

* All GSAP/WebGL/scroll-trigger effects must check `prefers-reduced-motion` and fall back to instant state changes — no distortion, no pinned scroll, content simply in place.
* Custom cursor and hover-distortion effects are **desktop-only** (`pointer: fine` media query). Mobile portfolio interaction = tap to reveal secondary image / tap to open case study detail page, no hover dependency.
* Minimum contrast: body copy (Ivory on Eerie Black) must clear WCAG AA (4.5:1) — verify in Phase 1, not Phase 4.

**Deployment Strategy**

* Platform: Vercel.
* CI/CD: Automated builds triggered by pushes to the `main` branch on GitHub.
* Optimization: Next.js Image component utilized strictly with pre-optimized WebP assets, generated via the responsive image pipeline in `ASSETS.md`.
