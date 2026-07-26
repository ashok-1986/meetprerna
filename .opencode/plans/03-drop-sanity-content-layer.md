# Plan 03 — Drop Sanity, Add Content Layer + Cloudinary

**Decision:** DECISIONS.md §3 (reversed by §18/§19/§20). No CMS. Typed files in repo.
**Status:** Plan mode — approval required before any edits.

---

## Part 1: Remove Sanity Completely

### 1a. Uninstall packages
pnpm remove sanity next-sanity @sanity/client @sanity/image-url @portabletext/sanity-bridge

styled-components is NOT a direct dependency (only a transitive peer dep of Sanity) — leave it alone. pnpm will clean it up automatically once the Sanity packages are gone.

### 1b. Delete files
- sanity.config.ts — Studio config
- sanity.cli.ts — CLI config
- src/sanity/ (entire directory, 7 files) — Client, queries, types, schemas
- src/app/studio/ (entire directory) — Embedded Studio route

### 1c. Edit files
- src/app/layout.tsx — Remove SanityLive import and render
- src/components/header/Header.tsx — Remove all Sanity imports, replace with static import from @/content/site
- src/app/book/page.tsx — No changes needed

### 1d. Environment
- .env.local — Remove all Sanity lines (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN). Keep PostHog comment.
- .env.example — Create with Cloudinary vars (see Part 5)

### 1e. next.config.ts
Add res.cloudinary.com to images.remotePatterns

---

## Part 2: Content Layer

### 2a. src/content/portfolio.ts
Create with the Piece type from DECISIONS.md §20. Seed with 3 placeholder entries (one per medium), all fields marked TODO(ashok).

### 2b. src/content/site.ts
Create with the static site config:
- cityLine: 'Mumbai · Navi Mumbai · Travelling Artist | ✈️ Now in Goa'
- whatsapp: '917738147935'
- filloutId: 'gvnCVtzfz2us'
- senjaCollectUrl: 'https://senja.io/p/meetprerna/r/collect'

### 2c. Header.tsx update
Replace Sanity fetch with static import from @/content/site

---

## Part 3: Testimonials

### 3a. src/content/testimonials.ts
Create with the 5 approved testimonials from DECISIONS.md §19.

### 3b. src/components/TestimonialQuote.tsx
Server component. Quote text in --font-inter, name in --font-jetbrains. No card, no stars.

---

## Part 4: Placement (deferred)
Testimonial placement on /sanctuary and Home marquee depends on those pages existing.

---

## Part 5: Cloudinary

### 5a. Install
pnpm add next-cloudinary

### 5b. .env.example
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

### 5c. src/components/media/Image.tsx
Wraps CldImage with project defaults: explicit sizes, format auto, quality auto, blur placeholder, priority passthrough.

### 5d. next.config.ts
Add res.cloudinary.com to images.remotePatterns

---

## Part 6: Verify
1. pnpm typecheck && pnpm lint && pnpm build
2. grep -ri "sanity" . --exclude-dir=node_modules --exclude-dir=.git — must return nothing
3. Bundle size: report gzipped First Load JS for /
4. pnpm a11y — zero critical, zero serious

---

## Files Created (7)
- src/content/site.ts
- src/content/portfolio.ts
- src/content/testimonials.ts
- src/components/TestimonialQuote.tsx
- src/components/testimonial-quote.module.css
- src/components/media/Image.tsx
- .env.example

## Files Deleted (11)
- sanity.config.ts
- sanity.cli.ts
- src/sanity/env.ts
- src/sanity/queries.ts
- src/sanity/types.ts
- src/sanity/lib/client.ts
- src/sanity/lib/live.ts
- src/sanity/schemaTypes/index.ts
- src/sanity/schemaTypes/siteSettings.ts
- src/app/studio/layout.tsx
- src/app/studio/[[...tool]]/page.tsx

## Files Modified (4)
- src/app/layout.tsx — Remove SanityLive
- src/components/header/Header.tsx — Static import
- next.config.ts — Add Cloudinary
- .env.local — Remove Sanity vars

## Deliberately Skipped
- Cloudinary env vars in Vercel — user must add these
- Testimonial placement on /sanctuary and Home — pages don't exist yet
- Senja API integration — deferred to Home marquee build
- styled-components cleanup — transitive, pnpm handles it
