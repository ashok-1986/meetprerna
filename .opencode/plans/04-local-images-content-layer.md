# Plan 04 — Drop Sanity & Cloudinary, Local Images + Content Layer

**Decision:** AGENTS.md stack (§36-42) + DECISIONS.md §18, §19, §20, §21. No CMS, no media host. Local images in `/public/images/`, typed content in `src/content/`.

**Status:** Plan mode — approval required before any edits.

---

## Part 1: Remove All External Services

### 1a. Uninstall packages
```
pnpm remove sanity next-sanity @portabletext/sanity-bridge @sanity/client @sanity/image-url next-cloudinary cloudinary
```
Also check `styled-components` — it was a Sanity peer dep. If not used elsewhere, remove it too.

### 1b. Delete files/dirs
| Path | Reason |
|---|---|
| `sanity.config.ts`, `sanity.cli.ts` | Studio config |
| `src/sanity/` (entire) | Client, queries, types, schemas |
| `src/app/studio/` (entire) | Embedded Studio route |
| `src/components/media/Image.tsx` | Cloudinary wrapper |
| `src/lib/sanity/` if exists | Any Sanity lib files |

### 1c. Environment cleanup
**`.env.local`** — Remove:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_VERSION`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Keep only Fillout/PostHog vars.

**`.env.example`** — Same removals, keep template for Fillout/PostHog.

### 1d. next.config.ts
Remove `images.remotePatterns` entirely (no remote domains needed).

---

## Part 2: Local Image Folders

Create with `.gitkeep`:
```
public/images/
  portfolio/
  hero/
  about/
  studio/
  og/
public/video/
```

---

## Part 3: Content Files

### 3a. `src/content/portfolio.ts`
```ts
export type Piece = {
  slug: string;
  title: string;
  medium: 'tattoo' | 'painting' | 'sketch';
  year: number;
  image: string;              // filename only, e.g. "tidal.jpg"
  healed?: string;            // e.g. "tidal-healed.jpg", enables M15
  motifs: string[];
  placement?: string;         // tattoo only
  sessions?: number;          // tattoo only
  dimensions?: string;        // painting/sketch only
  available?: boolean;        // painting/sketch only
  story?: string;             // 60-120 words, added later
};

export const portfolio: Piece[] = [];

export function imagePath(medium: Piece['medium'], filename: string): string {
  return `/images/portfolio/${filename}`;
}
```

### 3b. `src/content/site.ts`
```ts
export const site = {
  cityLine: 'Mumbai · Navi Mumbai · Travelling Artist | ✈️ Now in Goa',
  whatsapp: '917738147935',
  filloutId: 'gvnCVtzfz2us',
  senjaCollectUrl: 'https://senja.io/p/meetprerna/r/collect',
};
```

### 3c. `src/content/testimonials.ts`
Five real testimonials from DECISIONS.md §19, exact text, with tags:
- Pain + First-timer
- Hygiene + Process
- Hygiene
- Process
- Indecision + Pain + First-timer

Type:
```ts
export type Testimonial = {
  id: string;
  name: string;
  text: string;
  tags: ('pain' | 'hygiene' | 'process' | 'indecision' | 'first-timer')[];
};
```

---

## Verify

1. `pnpm typecheck && pnpm lint && pnpm build` — paste output
2. `grep -ri "sanity\|cloudinary" . --exclude-dir=node_modules --exclude-dir=.git` — must return nothing
3. **Measure** gzipped First Load JS for `/` with `@next/bundle-analyzer` or DevTools Network tab (compression on). Report actual bytes. If cannot measure, state so plainly.

---

## Files Created (7)
- `src/content/portfolio.ts`
- `src/content/site.ts`
- `src/content/testimonials.ts`
- `public/images/portfolio/.gitkeep`
- `public/images/hero/.gitkeep`
- `public/images/about/.gitkeep`
- `public/images/studio/.gitkeep`
- `public/images/og/.gitkeep`
- `public/video/.gitkeep`

## Files Deleted (~15)
- `sanity.config.ts`, `sanity.cli.ts`
- `src/sanity/` (7 files)
- `src/app/studio/` (2 files)
- `src/components/media/Image.tsx`
- `src/lib/sanity/` if exists

## Files Modified (3)
- `next.config.ts` (remove remotePatterns)
- `.env.local` (strip Sanity/Cloudinary vars)
- `.env.example` (same)

## Deliberately Skipped
- Senja API integration — deferred to when `/sanctuary` or Home marquee is built
- Actual image files — next prompt provides real data
- `styled-components` removal — will check if unused after Sanity packages gone