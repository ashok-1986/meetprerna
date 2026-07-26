# Implementation Plan — /book Page + Sanity CMS Wiring

**Persona:** Interface Engineer  
**Date:** 2026-07-25  
**Depends on:** Header component (Phase 1) — complete.

---

## 0. Scope

Two features, built in parallel:

1. **`/book` consulting page** — Fillout embed with our chrome, WhatsApp fallback, analytics wiring.
2. **Sanity CMS** — Client setup, `siteSettings` schema with `cityLine`, Studio at `/studio`, header wired to real data.

**Out of scope:** Other routes (`/work`, `/art`, `/sanctuary`, `/about`), other Sanity schemas (`workPiece`, `artPiece`, etc.), image pipeline, visual editing.

---

## Feature A: /book Consulting Page

### A1. Files to create

| # | File | Purpose |
|---|---|---|
| 1 | `src/app/book/page.tsx` | Server component — metadata, chrome, Fillout embed |
| 2 | `src/app/book/book.module.css` | Card surface, heading, fallback styles |
| 3 | `src/components/fillout/BookEmbed.tsx` | Client — `FilloutStandardEmbed` wrapper with skeleton + fallback |

### A2. Page structure (`/book`)

```
<Header />
<main id="main-content">
  <section>                          ← centred, max-width 640px
    <h1>Start a conversation.</h1>    ← Fraunces, --text-display-l
    <p>Tell me what you are carrying. I reply within two working days.</p>
    <div class="card">               ← --color-ink-100, --color-ink-300 hairline
      <BookEmbed source="header" />  ← Fillout iframe, skeleton while loading
    </div>
    <p class="fallback">             ← below card, small, --color-ivory-dim
      Having trouble? <a href="mailto:...">Send an email</a> instead.
    </p>
  </section>
</main>
```

### A3. BookEmbed.tsx (client component)

- Uses `@fillout/react` → `FilloutStandardEmbed`
- Props: `source: string` (for analytics: "header", "sketchbook", "sanctuary")
- `filloutId="gvnCVtzfz2us"` (locked in DECISIONS.md §9)
- `dynamicResize`, `inheritParameters`
- `parameters={{ source }}` — passed to Fillout for tracking
- `onInit` → `track('enquiry_started', { source: 'fillout' })`
- `onSubmit` → `track('enquiry_submitted', { submissionUuid })`
- **Loading state:** Skeleton shimmer (animated gradient, `--color-ink-200` to `--color-ink-100`)
- **Error/fallback:** If Fillout fails to load (ad blocker), show mailto link as fallback
- **Reduced motion:** Skeleton uses opacity pulse, not translate

### A4. Styling (book.module.css)

| Element | Tokens |
|---|---|
| Page centring | `max-width: 640px`, `margin: 0 auto`, `padding: clamp(24px, 4vw, 120px)` |
| H1 | `font-family: var(--font-fraunces)`, `font-size: var(--text-display-l)`, `color: var(--color-ivory)` |
| Sub-line | `font-size: var(--text-body-l)`, `color: var(--color-ivory-dim)`, `margin-top: 12px` |
| Card surface | `background: var(--color-ink-100)`, `border: 1px solid var(--color-ink-300)`, `border-radius: 2px`, `padding: 32px` |
| Skeleton | `background: linear-gradient(90deg, var(--color-ink-200) 0%, var(--color-ink-100) 50%, var(--color-ink-200) 100%)`, `background-size: 200% 100%`, `animation: shimmer 1.5s infinite` |
| Fallback text | `font-size: var(--text-caption)`, `color: var(--color-ivory-dim)`, `margin-top: 16px` |
| Fallback link | `color: var(--color-ivory-dim)`, underline on hover, NOT accent-coloured |

### A5. SEO metadata

```ts
export const metadata: Metadata = {
  title: 'Start a Conversation',
  description: 'Send a brief or a feeling. Reply within two working days. Tattoo, painting, sketch or commercial enquiries.',
}
```

### A6. Prefill from Sketchbook

Handle `?source=sketchbook&piece={slug}` search params. Pass to Fillout:
```ts
parameters={{ source: 'sketchbook', piece: searchParams.piece }}
```
This pre-fills the brief field in Fillout. The actual prefill mapping is configured in Fillout's dashboard, not in code — we just pass the params.

### A7. CSP update

Add to `next.config.ts` headers:
```ts
{
  source: '/book',
  headers: [
    { key: 'Content-Security-Policy', value: "script-src 'self' server.fillout.com; frame-src server.fillout.com;" }
  ]
}
```

### A8. Dependencies

```bash
pnpm add @fillout/react
```

---

## Feature B: Sanity CMS Wiring

### B1. Files to create

| # | File | Purpose |
|---|---|---|
| 1 | `src/sanity/lib/client.ts` | Configured Sanity client |
| 2 | `src/sanity/lib/live.ts` | `defineLive` for `sanityFetch` + `SanityLive` |
| 3 | `src/sanity/env.ts` | Project ID + dataset from env vars |
| 4 | `src/sanity/schemaTypes/index.ts` | Schema registry |
| 5 | `src/sanity/schemaTypes/siteSettings.ts` | `siteSettings` with `cityLine` field |
| 6 | `src/sanity/queries.ts` | GROQ queries (`siteSettingsQuery`) |
| 7 | `src/sanity/types.ts` | TypeScript types for Sanity documents |
| 8 | `sanity.config.ts` | Studio config (root level) |
| 9 | `sanity.cli.ts` | CLI config (root level) |
| 10 | `src/app/studio/[[...tool]]/page.tsx` | Studio route |
| 11 | `src/app/studio/layout.tsx` | Studio layout (no header/footer) |
| 12 | `.env.local` | Sanity env vars |

### B2. Environment variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=1ap7cxac
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk69NWp3CBnPZx1bbMRJMKAUJ8vzwK1wbI2p2OvywErH4nl0X3rkvc51zZ3AyaUReKBsppKSKsQlZLZwtbE5CW9PSr4FFzdFrQsRa9cLl6D5mvF4WOLbCdUyCUqmTWkZ0OUVDoGGyjfIYXPcTpyYqf78QAYX9Or24QVIXFbHI9XEOya9pSFG
```

### B3. Sanity client (`src/sanity/lib/client.ts`)

```ts
import { createClient } from 'next-sanity'
import { projectId, dataset } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-07-25',
  useCdn: true,
})
```

### B4. Live content (`src/sanity/lib/live.ts`)

```ts
import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2026-07-25' }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})
```

### B5. siteSettings schema

```ts
import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'cityLine',
      title: 'City Line',
      type: 'string',
      description: 'e.g. "Currently Mumbai · Next Pune, August 2026"',
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
```

### B6. GROQ queries

```ts
import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    cityLine
  }
`
```

### B7. TypeScript types

```ts
export interface SiteSettings {
  _type: 'siteSettings'
  cityLine?: string
}
```

### B8. Wire Header to real Sanity data

Update `src/components/header/Header.tsx`:
- Replace placeholder `getCityLine()` with real Sanity fetch
- Use `sanityFetch` from `@/sanity/lib/live`
- Fallback to hardcoded string if Sanity is unavailable

### B9. Wire Layout to SanityLive

Update `src/app/layout.tsx`:
- Import and render `<SanityLive />` at the end of `<body>`

### B10. Studio route

```tsx
// src/app/studio/[[...tool]]/page.tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### B11. Dependencies

```bash
pnpm add next-sanity sanity @sanity/image-url
```

### B12. CORS

Add `http://localhost:3002` as a CORS origin in Sanity project settings at sanity.io/manage → API → CORS Origins, with "Allow credentials" checked.

---

## 3. Execution order

1. **Install dependencies** (`@fillout/react`, `next-sanity`, `sanity`, `@sanity/image-url`)
2. **Create `.env.local`** with Sanity credentials
3. **Build Sanity scaffolding** (client, env, schemas, types, queries)
4. **Create Studio route** (`/studio`)
5. **Wire Header to Sanity** (replace placeholder)
6. **Wire Layout to SanityLive**
7. **Create `/book` page** (chrome + BookEmbed)
8. **Update `next.config.ts`** (CSP headers)
9. **Verify:** `pnpm typecheck && pnpm lint && pnpm build`

---

## 4. What the Interface Engineer does NOT do

| Item | Why |
|---|---|
| Fillout theme configuration | Manual step in Fillout dashboard — DECISIONS.md §9 D8.2 lists exact values |
| Fillout form field creation | Manual step in Fillout dashboard — content.md §7 has the field list |
| Other Sanity schemas (`workPiece`, `artPiece`, etc.) | Phase 2 scope, different persona |
| Image pipeline | Phase 2 scope |
| Visual editing / Draft Mode | Phase 2 scope, Architect decision |
| `/privacy` update | One-line mention of Fillout — out of header scope |

---

## 5. Resolved questions

| Question | Answer |
|---|---|
| WhatsApp number for fallback | **Not needed.** All inquiries route through Fillout. No WhatsApp link on `/book`. |
| Sanity project status | **Live.** Project ID `1ap7cxac` exists and is accessible at sanity.io/manage. |
| Fillout dashboard access | **User can configure.** Will set theme values from DECISIONS.md §9 D8.2 manually. |

No open questions remaining. Plan is ready for execution.
