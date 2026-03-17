# Meet Prerna — Custom Tattoo Artist Website

Awwwards-level Next.js 15 website for Meet Prerna, a female custom tattoo artist based in Navi Mumbai, India.

**Design Aesthetic:** Dark luxury editorial — Vogue magazine meets fine art tattoo studio.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion v11 + GSAP 3
- **Smooth Scroll:** Lenis v2
- **UI Components:** shadcn/ui patterns + custom components

## 📦 Installation

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Add Assets

Place all image and video files in the `/public/assets/` directory:

**Required Images:**
- `logo.png` — Brand logo (transparent background recommended)
- `prerna-bw-studio.jpg` — Studio portrait
- `prerna-sunglasses.jpg` — Portrait with sunglasses
- `prerna-contemplative.jpg` — Contemplative portrait
- `tattoo-01-wolf-red.jpg` — Geometric wolf tattoo
- `tattoo-02-butterfly-back.jpg` — Butterfly back piece
- `tattoo-03-brushstroke-heart.jpg` — Brushstroke heart
- `tattoo-04-eye-triangle.jpg` — All-seeing eye triangle
- `tattoo-05-wolf-geometric.jpg` — Geometric wolf upper arm
- `tattoo-06-placeholder.jpg` through `tattoo-10-placeholder.jpg` — Additional portfolio images

**Required Videos:**
- `intro-video.mp4` — Homepage intro video (muted, loop)
- `reel.mp4` — Portfolio process reel

**Optional:**
- `og-image.jpg` — Social media share image (1200x630px)

### Step 3: Update Fillout URL

Edit `/src/lib/constants.ts` and update the `FILLOUT_URL` constant with your actual Fillout form URL:

```typescript
export const FILLOUT_URL = 'https://meetprerna.fillout.com/book';
```

### Step 4: Update Contact Details

Edit `/src/lib/constants.ts` and update the `CONTACT_DETAILS` object:

```typescript
export const CONTACT_DETAILS = {
  phone: '+91 77381 47935',
  email: 'your-actual-email@example.com',
  location: 'Navi Mumbai, Maharashtra, India',
  hours: 'By Appointment Only',
};
```

### Step 5: Update Social Links

Edit `/src/lib/constants.ts` and update the `SOCIAL_LINKS` array with actual URLs.

## 🏃 Run Commands

### Development

```bash
npm run dev
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
meetprerna-next/
├── public/
│   └── assets/              # All images and videos
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with fonts, providers, SEO
│   │   ├── page.tsx         # Homepage
│   │   ├── globals.css      # Global styles, CSS variables
│   │   ├── about/
│   │   ├── portfolio/
│   │   ├── contact/
│   │   └── consultation/
│   ├── components/
│   │   ├── layout/          # Nav, Footer, Loader, Cursor, Grain
│   │   ├── sections/        # Hero, Marquee, Intro, Process, etc.
│   │   ├── ui/              # Reusable UI components
│   │   └── providers/       # LenisProvider, PageWrapper
│   ├── hooks/
│   │   └── useLenis.ts      # Smooth scroll hook
│   └── lib/
│       ├── constants.ts     # All data and content
│       └── tokens.ts        # Utility functions (cn)
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.ts           # Next.js configuration
```

## 🎨 Design Tokens

### Colors (defined in `/src/app/globals.css`)

```css
--color-black:   #1A1A1A   /* All backgrounds */
--color-ivory:   #FDFFE9   /* All body text + headings */
--color-green:   #C4FF61   /* Primary CTA, cursor, active states */
--color-yellow:  #EAFF27   /* Hover states, marquee */
--color-muted:   rgba(253,255,233,0.4)  /* Secondary text */
```

### Typography

- **Display Font:** Playfair Display (weights: 400, 500, 600, 700)
- **Body Font:** DM Sans (weights: 300, 400, 500)
- **Hero Heading:** clamp(4.5rem, 9vw, 11rem), line-height: 0.9
- **Section Heading:** clamp(2.5rem, 4vw, 4.5rem)
- **Body Text:** 0.9rem–0.95rem, weight 300

## ✨ Key Features

1. **Custom Cursor** — Dual-element cursor with GSAP animation (hidden on mobile)
2. **Grain Overlay** — Subtle film grain texture for editorial aesthetic
3. **Page Loader** — Animated loading screen with progress bar
4. **Smooth Scroll** — Lenis integration with GSAP ScrollTrigger sync
5. **Responsive Navigation** — Transparent to blur on scroll, mobile drawer
6. **Animated Sections** — Framer Motion scroll reveals throughout
7. **Parallax Images** — Scroll-based parallax effects
8. **Portfolio Lightbox** — Full-screen image viewer with keyboard navigation
9. **Fillout Embed** — Booking form integration
10. **SEO Optimized** — Metadata, JSON-LD schema, Open Graph

## 📱 Mobile Considerations

- Custom cursor hidden on touch devices (`pointer: coarse`)
- All layouts tested at 375px width
- Hamburger menu for mobile navigation
- Horizontal scroll snap for testimonials
- Single-column layouts on mobile breakpoints

## 🔒 Environment Variables

No environment variables required for basic functionality. For production deployment, consider:

- `NEXT_PUBLIC_SITE_URL` — Your production domain
- `NEXT_PUBLIC_ANALYTICS_ID` — Analytics tracking ID (if added)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy

### Manual

```bash
npm run build
npm run start
```

## 📄 License

This project is proprietary. All rights reserved.

---

**Built with** ❤️ **by Meet Prerna**
