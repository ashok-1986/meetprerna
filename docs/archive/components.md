# MeetPrerna — Component API (`components.md`)

> The contract for every reusable component in the codebase. Props, behavior, a11y, motion hooks, and Storybook story notes. **The Frontend Architect arbitrates any ambiguity in this file.**

---

## 0. Conventions

- **TypeScript everywhere.** `interface Props` is the public API. Default to `type` for unions and `interface` for component props.
- **Ref forwarding** for any component that wraps a real DOM element.
- **`className` always accepted** and merged with `cn()`.
- **Polymorphism** via `as` prop or `@radix-ui/react-slot` when needed.
- **`data-*` attributes** for state are the public a11y/testing surface (`data-state="open"`, `data-cursor="open"`).
- **Storybook story** with all states from `designs.md` §6.7.
- **No default exports for utility modules.** Default exports only for React components.

```ts
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

---

## 1. Layout components

### 1.1 `Container`

```ts
interface ContainerProps {
  size?: 'narrow' | 'wide' | 'edge';
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav';
  children: React.ReactNode;
  className?: string;
}
```

- `narrow` → 768px max, centered.
- `wide` → 1280px max, centered.
- `edge` → 100vw, no padding (used for full-bleed).
- Horizontal padding = `var(--space-gutter)`.
- A11y: `<main>` only once per page; `<header>` only at the top.

### 1.2 `Section`

```ts
interface SectionProps {
  id?: string;
  as?: 'section' | 'div' | 'article';
  spacing?: 'hero' | 'section' | 'tight' | 'none';
  tone?: 'default' | 'quiet' | 'warm' | 'vignette';
  /** Mark a section as a "ScrollTrigger" target. */
  reveal?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

- `reveal` adds the default `opacity 0 → 1, y 24 → 0` via the `useSectionReveal` hook (which wraps the default timeline from `animations/reveal.ts`).
- `tone="warm"` overlays a 6% marigold gradient. `tone="vignette"` applies a radial gradient from `--color-ink-70` to `--color-ink`.

### 1.3 `Stack`

```ts
interface StackProps {
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'section' | 'gutter' | 'rail';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  as?: 'div' | 'ul' | 'ol' | 'section';
  children: React.ReactNode;
  className?: string;
}
```

- Vertical by default.
- `as="ul"` for semantic lists. Children should be `<li>`s (not enforced).

### 1.4 `Cluster`

```ts
interface ClusterProps {
  gap?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  as?: 'div' | 'ul';
  children: React.ReactNode;
  className?: string;
}
```

- For inline groups of tags, chips, buttons. Wraps by default.

### 1.5 `Rail`

```ts
interface RailProps {
  eyebrow?: string;
  number?: string;       // e.g., "01"
  label?: string;
  children: React.ReactNode;
  className?: string;
}
```

- Sticky left rail (5 cols on `lg+`, stacked above on `lg-`).
- The right side is the content.
- The rail's content is `sticky top: 25vh` on `lg+`.

### 1.6 `Header` / `Footer`

```ts
// src/components/layout/Header.tsx
interface HeaderProps {
  variant?: 'default' | 'overlay';
}
```

- `default` → solid ink background, sits above the content.
- `overlay` → transparent, sits over the hero. The hero is responsible for the inverse-color nav.
- Auto-hide on scroll-down, show on scroll-up (§2.4 in `animations.md`).

```ts
// src/components/layout/Footer.tsx
interface FooterProps {}
```

- Includes the "available for booking" dot, primary nav, secondary nav, social links, copyright, and a small print colophon.

### 1.7 `MobileMenu`

```ts
interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

- A `<Dialog>` (Radix) with a left-side slide-in. Triggered by the header's hamburger.
- Each nav link is full-width; the active one is `--color-inchworm`.
- Reduced motion: simple fade.

---

## 2. UI primitives

### 2.1 `Button`

```ts
type ButtonVariant = 'primary' | 'secondary' | 'editorial' | 'icon' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Cursor label override. Default is the button's text content. */
  cursorLabel?: string;
  /** Mark for the ink-drop particle on click. */
  inkDrop?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}
```

- **Variants:**
  - `primary`: solid `--color-inchworm`, ink text. Hover → `--color-inchworm-deep`. Inner text translates `x: 0 → 4` on hover.
  - `secondary`: ghost, 1px ivory border, ivory text. Hover → border becomes inchworm.
  - `editorial`: no border, no background. Underline draws left-to-right on hover (180ms `soft`).
  - `icon`: square 40px, ghost.
  - `ghost`: no border, no background; opacity shifts on hover.
- **Sizes:** `sm` (32px), `md` (44px), `lg` (56px).
- **Loading state:** spinner replaces label; width preserved.
- **Cursor label:** by default the button's `aria-label` or text content. `cursorLabel` overrides.
- **A11y:** `:focus-visible` shows a 2px inchworm ring with 2px offset. Disabled is `aria-disabled` and a different visual style (50% opacity, no pointer).
- **Storybook story:** all 5 variants × 3 sizes × 5 states (default, hover, focus, active, disabled, loading).

### 2.2 `Tag`

```ts
type TagVariant = 'default' | 'marigold' | 'ink-50';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  active?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}
```

- Used for portfolio filters. 32px tall, 1px border, 24px horizontal padding.
- Hover: border → inchworm.
- Active: 1.5px inchworm border, ink-50 background.
- `removable` shows a small "×" button (12px hit area 24px).
- A11y: when used as a filter button, render as `<button>` (not `<span>`). Pass `aria-pressed={active}`.

### 2.3 `Input`

```ts
type InputType = 'text' | 'email' | 'tel' | 'password' | 'url';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helper?: string;
  error?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  /** Optional character count, e.g. for the brief. */
  showCount?: boolean;
  maxLength?: number;
}
```

- Floating label (1.5rem above the input on focus or when filled).
- Bottom border (1px) → 2px on focus.
- A11y: label is a real `<label htmlFor>`. Errors have `aria-describedby`. Error message uses `aria-live="polite"`.
- Variants: `default`, `error`, `disabled`.
- Storybook story: all states + 5 input types.

### 2.4 `Textarea`

```ts
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helper?: string;
  error?: string;
  showCount?: boolean;
  maxLength?: number;
  rows?: number;
  /** Auto-grow with content. */
  autoGrow?: boolean;
}
```

- Same visual rules as `Input`.
- `autoGrow` uses a hidden clone to measure and resize up to `rows * 24px * 4`.

### 2.5 `Select`

```ts
interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  label: string;
  options: SelectOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  helper?: string;
  error?: string;
  placeholder?: string;
}
```

- Custom built on Radix `<Select>` for accessibility.
- Keyboard-first: arrow keys navigate, enter selects, escape closes.
- Visual: bottom border style, like `Input`.

### 2.6 `Dialog`

```ts
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Disable the FLIP transition (e.g., in tests). */
  noFlip?: boolean;
}
```

- Wraps Radix `<Dialog>`.
- Sizes: `sm` 480, `md` 720, `lg` 960, `full` 100vw.
- Focus trap, focus restoration on close, ESC to close, click-outside to close (except `size="full"`).
- `noFlip` is for tests and the Storybook canvas; production uses FLIP.
- A11y: `aria-labelledby` for title, `aria-describedby` for description (if any).

### 2.7 `Tabs`

```ts
interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'underline' | 'pill';
}
```

- Radix `<Tabs>` underneath.
- Underline: bottom border, 2px inchworm on active. Pill: rounded, ink-50 background on active.
- Keyboard navigable (arrow keys).

### 2.8 `Tooltip`

```ts
interface TooltipProps {
  content: React.ReactNode;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactElement;
}
```

- Radix `<Tooltip>` underneath.
- 200ms delay. No arrow (per design).

### 2.9 `Toast`

```ts
interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
  onDismiss?: () => void;
}
```

- Top-right stack. Auto-dismiss after `duration` (default 4s).
- Reduced motion: instant in/out.

### 2.10 `Marquee`

```ts
interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;        // px/sec, default 40
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  /** Mark reduced-motion behavior. */
  reducedMotion?: 'pause' | 'stop';
}
```

- Duplicates children for seamless looping.
- Driven by `gsap.ticker` for smoothness.
- `pauseOnHover` is the default; touch devices get `stop` instead.
- Used in the "selected press logos" row, "the four pillars" strip, etc.

### 2.11 `CountUp`

```ts
interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;     // ms, default 1200
  delay?: number;        // ms, default 0
  /** Format the number, e.g. n.toLocaleString(). */
  format?: (n: number) => string;
  trigger?: 'inView' | 'mount' | 'manual';
  start?: () => void;
  className?: string;
}
```

- Used in the "studio" section for things like "8 years of practice, 200+ pieces".
- Default trigger: `inView`. The hook listens to an `IntersectionObserver` with a 30% threshold.
- Easing: `ease.editorial` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Reduced motion: jumps to `to` immediately.

### 2.12 `PullQuote`

```ts
interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
  withUnderline?: boolean;
}
```

- Times New Roman italic, large display size.
- The marigold underline is conditional.
- Used for testimonials and journal pull-quotes.

### 2.13 `Eyebrow`

```ts
interface EyebrowProps {
  children: React.ReactNode;
  as?: 'span' | 'p' | 'div';
  className?: string;
}
```

- 11–12px, uppercase, 0.2em tracking, ivory-dim.

### 2.14 `SectionTitle`

```ts
interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  level?: 1 | 2 | 3;
  size?: 'display-md' | 'display-sm' | 'h1' | 'h2' | 'h3';
  align?: 'start' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  children?: React.ReactNode; // optional body
}
```

- Renders an eyebrow (optional) + a heading.
- The heading animates word-by-word (per §2.5 in `animations.md`).
- If `children` are passed, they render below as a lead paragraph.

### 2.15 `StatusDot`

```ts
interface StatusDotProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;       // shown on hover
  pulse?: boolean;
  color?: 'inchworm' | 'marigold' | 'danger';
}
```

- The "available for booking" indicator.
- `pulse` drives the `breath` animation; off under reduced motion.

### 2.16 `Breadcrumb`

```ts
interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}
```

- Visual: `/` separated, no chevron. Each segment is body-sm, ivory-dim. Last segment is ivory.

### 2.17 `ChipGroup`

```ts
interface ChipGroupProps {
  children: React.ReactNode;
  gap?: 1 | 2 | 3;
}
```

- A `Cluster` alias for tag-like UI.

### 2.18 `Pill`

```ts
interface PillProps {
  children: React.ReactNode;
  tone?: 'default' | 'marigold' | 'success';
}
```

- Small rounded badge for year, status, etc. e.g. "2024", "Available", "Sold".

### 2.19 `DefinitionList`

```ts
interface DefinitionListProps {
  items: { term: string; description: React.ReactNode }[];
}
```

- For service details (price, duration, aftercare). Term is body-sm uppercase ivory-dim. Description is body ivory.

### 2.20 `Kicker`

```ts
interface KickerProps {
  children: React.ReactNode;
}
```

- A small word/phrase that introduces a paragraph, set in marigold italic display.

### 2.21 `SocialLink`

```ts
interface SocialLinkProps {
  href: string;
  platform: 'instagram' | 'are.na' | 'behance' | 'email' | 'phone' | 'maps';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode; // for an optional label
}
```

- 1.5px stroke icon + optional label. Hover: ivory-dim → inchworm.

---

## 3. Visual primitives (motion-aware)

### 3.1 `MaskReveal`

```ts
interface MaskRevealProps {
  /** Direction of the wipe. */
  direction?: 'left' | 'right' | 'top' | 'bottom';
  /** Duration in ms. */
  duration?: number;
  /** Delay in ms. */
  delay?: number;
  /** Easing. */
  ease?: 'studio' | 'editorial' | 'soft';
  /** Trigger on inView, on mount, or manual. */
  trigger?: 'inView' | 'mount' | 'manual';
  /** Manual trigger. */
  start?: () => void;
  as?: 'div' | 'span' | 'section';
  children: React.ReactNode;
  className?: string;
}
```

- Wipes content with a clip-path.
- The default section reveal is `MaskReveal` with `direction="top"`, `duration: 420`, `ease: "editorial"`.
- Reduced motion: no clip-path, opacity 1 immediately.

### 3.2 `Parallax`

```ts
interface ParallaxProps {
  /** Pixels of movement from start to end. */
  amount?: number;        // default 60
  /** Direction of motion (negative = up). */
  direction?: 'up' | 'down';
  /** Disable on mobile. */
  mobile?: boolean;
  as?: 'div' | 'span' | 'figure';
  children: React.ReactNode;
  className?: string;
}
```

- Drives `y` via a `ScrollTrigger.scrub`.
- On mobile (< `md`), `amount` is halved; if `mobile={false}`, it's a no-op.

### 3.3 `Magnetic`

```ts
interface MagneticProps {
  /** Pixels of pull. */
  amount?: number;        // default 8
  /** Easing. */
  ease?: 'glide' | 'studio';
  children: React.ReactElement;
}
```

- The child subtly follows the cursor (≤ `amount` px) on hover. Used on CTAs.
- Disabled on touch and reduced motion.

### 3.4 `SplitText` (our wrapper around GSAP SplitText)

```ts
interface SplitTextProps {
  text: string;
  /** How to split. */
  by?: 'chars' | 'words' | 'lines';
  /** Per-element delay. */
  stagger?: number;
  /** Per-element duration. */
  duration?: number;
  ease?: 'editorial' | 'studio' | 'soft';
  /** When to animate. */
  trigger?: 'inView' | 'mount';
  /** If true, render as inline (no block elements). */
  inline?: boolean;
  /** Tag for the wrapper. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
}
```

- Wraps GSAP's SplitText (which is a paid plugin; we use the trial version for development and the licensed one in CI).
- Reduced motion: `by="words"` is honored; the reveal is instant.

### 3.5 `CountUp`

(See §2.11.)

### 3.6 `ScrubImage`

```ts
interface ScrubImageProps extends ImageProps {
  /** Pixels of parallax. */
  amount?: number;
}
```

- A tall image with parallax; the user scrolls and the image "scrubs" upward.

### 3.7 `InView`

```ts
interface InViewProps {
  /** Threshold (0..1) to fire. */
  threshold?: number;
  /** Once or every time. */
  once?: boolean;
  /** Receive the inView state. */
  children: (inView: boolean) => React.ReactNode;
}
```

- A render-prop wrapper around `IntersectionObserver`.
- Used in many places: gallery, testimonials, etc.

### 3.8 `Sticky`

```ts
interface StickyProps {
  /** When to release. Default is the parent's bottom. */
  releaseAt?: 'parent-bottom' | string; // CSS selector
  /** Top offset. */
  top?: number; // default 96
  children: React.ReactNode;
  className?: string;
}
```

- Wraps a child with `position: sticky; top: ${top}px`.
- Used for the rail and for the process step number column.

### 3.9 `ScrollProgress`

```ts
interface ScrollProgressProps {
  /** Aria label. */
  label?: string;
  /** Color. */
  color?: 'inchworm' | 'marigold';
  /** Bar thickness. */
  thickness?: number; // default 2
}
```

- A horizontal bar at the top of the viewport.

### 3.10 `Marquee`

(See §2.10.)

---

## 4. Media components

### 4.1 `RevealImage`

```ts
interface RevealImageProps extends Omit<NextImageProps, 'placeholder' | 'blurDataURL'> {
  /** Mask direction. */
  direction?: 'left' | 'right' | 'top' | 'bottom';
  /** Aspect ratio (overrides the image's natural ratio). */
  aspect?: `${number}/${number}`;
  /** Quality (default 80). */
  quality?: number;
  /** Eager-load (default false). */
  priority?: boolean;
  /** Sizes attribute. */
  sizes?: string;
  /** Decorative; alt="" is used. */
  decorative?: boolean;
  /** Alt text (required unless decorative). */
  alt: string;
  /** Object fit. */
  fit?: 'cover' | 'contain';
  /** Optional caption. */
  caption?: string;
}
```

- A `next/image` wrapper that:
  - Uses Sanity's auto-blur LQIP for the placeholder.
  - Wraps the image in a `MaskReveal`.
  - Adds an optional `<figcaption>` in ivory-dim.
- If `decorative`, the image is `alt=""` and skipped by screen readers.

### 4.2 `Gallery` / `GalleryItem` / `GalleryDialog`

```ts
// src/components/media/Gallery.tsx
interface GalleryProps {
  items: PortfolioItem[];
  columns?: 2 | 3 | 4 | 'masonry';
  /** Variant by collection. */
  variant?: 'tattoo' | 'painting' | 'sketch';
  /** Enable drag-pan (desktop only). */
  dragPan?: boolean;
  onItemClick?: (item: PortfolioItem) => void;
  className?: string;
}

// src/components/media/GalleryItem.tsx
interface GalleryItemProps {
  item: PortfolioItem;
  index: number;
  variant: 'tattoo' | 'painting' | 'sketch';
  onClick?: (item: PortfolioItem) => void;
  dataCursor?: 'open' | 'drag';
}

// src/components/media/GalleryDialog.tsx
interface GalleryDialogProps {
  item: PortfolioItem | null;
  onClose: () => void;
  /** Items for "next/prev" navigation. */
  related?: PortfolioItem[];
}
```

- The grid uses CSS Grid (with `masonry` falling back to a JavaScript-laid-out grid for browsers without `grid-template-rows: masonry`).
- Each `GalleryItem` is a `<button>` (a11y) with a `<figure>` inside.
- The dialog uses the FLIP transition.
- Reduced motion: no FLIP, no mask, no parallax.

### 4.3 `VideoFrame`

```ts
interface VideoFrameProps {
  src: string;
  poster: string;
  /** Aspect ratio. */
  aspect?: `${number}/${number}`;
  /** Mute. */
  muted?: boolean;          // default true
  /** Autoplay on hover (desktop) or inView (mobile). */
  autoplay?: 'hover' | 'inView' | 'manual';
  /** Loop. */
  loop?: boolean;            // default true
  /** Aria label. */
  label: string;
}
```

- A lazy-loaded video. The poster is always visible; the video is mounted on first interaction (hover) or inView.
- Reduced motion: poster only.

### 4.4 `Portrait`

```ts
interface PortraitProps {
  src: string;
  alt: string;
  /** Aspect ratio. */
  aspect?: '3/4' | '4/5' | '1/1' | '16/9';
  /** Caption below. */
  caption?: string;
  /** Show the small marigold underline. */
  withUnderline?: boolean;
}
```

- A tall editorial image. Used on the About hero.

### 4.5 `StudioPhoto`

```ts
interface StudioPhotoProps {
  src: string;
  alt: string;
  /** Aspect ratio. */
  aspect?: '21/9' | '16/9' | '3/2' | '4/3';
  /** Caption. */
  caption?: string;
}
```

- A wide photo. Used on the Studio and Home vignette sections.

---

## 5. Cursor components

### 5.1 `CustomCursor`

```ts
// src/components/cursor/CustomCursor.tsx
interface CustomCursorProps {
  /** A label to show on idle (e.g., "Ink"). */
  idleLabel?: string;
}
```

- Mounts in the root layout.
- Reads `useIsCoarsePointer()` and `usePrefersReducedMotion()` — both bail-out.
- Owns the global `pointermove` listener and dispatches per-element behaviors based on `[data-cursor]`.

### 5.2 `CursorLabel`

```ts
// A sub-component used internally by CustomCursor.
interface CursorLabelProps {
  text: string;
}
```

- Renders a small text label below the cursor.

### 5.3 `CursorBlend`

```ts
// A wrapper that gives the cursor its `mix-blend-mode: difference` against the page.
interface CursorBlendProps {
  children: React.ReactNode;
}
```

- Used in the root layout. The cursor is the only child.

---

## 6. Section components (per-page)

Each section is documented at the API level here; visual + motion is in `designs.md` and `animations.md`.

### 6.1 `HeroSection`

```ts
interface HeroSectionProps {
  /** Headline text. */
  headline: string;
  /** Subhead. */
  subhead?: string;
  /** Primary CTA. */
  ctaPrimary: { label: string; href: string };
  /** Secondary CTA. */
  ctaSecondary?: { label: string; href: string };
  /** Hero image. */
  image?: { src: string; alt: string };
  /** Optional eyebrow. */
  eyebrow?: string;
}
```

- Uses `MaskReveal` on the image, `SplitText` on the headline, `Parallax` on the image.
- The custom cursor approach behavior is wired here.

### 6.2 `ManifestoSection`

```ts
interface ManifestoSectionProps {
  eyebrow?: string;
  title: string;
  body: string;
  pillars: Pillar[];
}

interface Pillar {
  name: string;        // "Psychology"
  description: string; // one-line
  href?: string;       // optional deep link
}
```

### 6.3 `SelectedWorkSection`

```ts
interface SelectedWorkSectionProps {
  items: PortfolioItem[];   // 6 items
  /** The collection(s) to draw from. */
  sources?: ('tattoo' | 'painting' | 'sketch')[];
  title?: string;
  eyebrow?: string;
}
```

### 6.4 `ProcessTeaserSection`

```ts
interface ProcessTeaserSectionProps {
  steps: { name: string; description?: string }[];
  title?: string;
  eyebrow?: string;
}
```

### 6.5 `StudioVignetteSection`

```ts
interface StudioVignetteSectionProps {
  photos: { src: string; alt: string; caption?: string }[];
  title?: string;
  eyebrow?: string;
  body?: string;
}
```

### 6.6 `TestimonialsSection`

```ts
interface TestimonialsSectionProps {
  items: Testimonial[];
  title?: string;
  eyebrow?: string;
}

interface Testimonial {
  quote: string;
  attribution: string;   // "Aanya R., Mumbai"
}
```

### 6.7 `PillarsSection`

```ts
interface PillarsSectionProps {
  pillars: PillarDetail[];
}

interface PillarDetail {
  name: string;
  essay: string;        // 200 words
  portrait: { src: string; alt: string };
}
```

### 6.8 `StudioEssaySection`

```ts
interface StudioEssaySectionProps {
  eyebrow: string;
  title: string;
  body: string;        // 600 words
  photos: StudioPhoto[];
}
```

### 6.9 `PressSection`

```ts
interface PressSectionProps {
  items: { name: string; logo: string; href?: string }[];
  emptyText?: string;
}
```

### 6.10 `PortfolioSection`

```ts
interface PortfolioSectionProps {
  items: PortfolioItem[];
  variant: 'tattoo' | 'painting' | 'sketch';
  initialFilters?: Partial<PortfolioFilters>;
}

interface PortfolioFilters {
  styles: string[];
  bodyAreas?: string[];     // tattoo only
  years: number[];
  series?: string[];        // paintings, sketches
}
```

- Hosts the `FilterBar` and the `Gallery`.

### 6.11 `FilterBar`

```ts
interface FilterBarProps {
  filters: PortfolioFilters;
  value: PortfolioFilters;
  onChange: (next: PortfolioFilters) => void;
  variant: 'tattoo' | 'painting' | 'sketch';
}
```

### 6.12 `SeriesIndexSection`

```ts
interface SeriesIndexSectionProps {
  series: { year: number; name: string; count: number; href: string }[];
}
```

### 6.13 `CollectorCTASection`

```ts
interface CollectorCTASectionProps {
  title: string;
  body: string;
  cta: { label: string; href: string };
}
```

### 6.14 `ProcessSection` / `ProcessStep`

```ts
// src/components/sections/process/ProcessSection.tsx
interface ProcessSectionProps {
  steps: ProcessStepData[];
  title: string;
  eyebrow: string;
}

// src/components/sections/process/ProcessStep.tsx
interface ProcessStepData {
  number: string;     // "01"
  name: string;       // "Conversation"
  body: string;       // ~200 words
  image: { src: string; alt: string };
  video?: { src: string; poster: string; label: string };
}
```

### 6.15 `AboutSection` / `TimelineSection`

```ts
// AboutSection is composed of:
// - <HeroSection variant="portrait" />
// - <OriginSection />
// - <PracticeSection />
// - <TimelineSection />
// - <PressSection />
// - <ClosingLine />
```

### 6.16 `ContactSection` / `ContactForm`

```ts
// src/components/sections/contact/ContactSection.tsx
interface ContactSectionProps {
  // pulls from site config
}

// src/components/sections/contact/ContactForm.tsx
interface ContactFormProps {
  onSubmit: (data: ContactSubmission) => Promise<void>;
  defaultProjectType?: ProjectType;
}

interface ContactSubmission {
  name: string;
  email: string;
  projectType: ProjectType;
  brief: string;
  references: File[];
  consent: boolean;
}

type ProjectType = 'tattoo' | 'painting' | 'sketch' | 'other';
```

### 6.17 `BookingFlow`

```ts
interface BookingFlowProps {
  onSubmit: (data: BookingSubmission) => Promise<void>;
  defaultProjectType?: ProjectType;
}

interface BookingSubmission {
  projectType: ProjectType;
  bodyArea?: string;          // tattoo
  preferredMonth: string;     // YYYY-MM
  references: File[];
  brief: string;
  name: string;
  email: string;
  phone?: string;
  consent: boolean;
}
```

### 6.18 `CTASection`

```ts
interface CTASectionProps {
  title: string;
  body?: string;
  cta: { label: string; href: string };
}
```

### 6.19 `FooterSection`

```ts
interface FooterSectionProps {
  // pulls from site config
}
```

### 6.20 `HeaderSection`

```ts
interface HeaderSectionProps {
  variant?: 'default' | 'overlay';
}
```

---

## 7. Hooks

### 7.1 `useLenis()`

Returns the singleton `Lenis` instance. `null` until the first call (which initializes).

### 7.2 `useGsapContext()`

A wrapper around `gsap.context()` for safe per-component animation lifecycle. All timelines created in a `useGsapContext` are killed on unmount.

```ts
function useGsapContext(fn: (ctx: gsap.Context) => void, deps: React.DependencyList = []) {
  const ref = useRef<gsap.Context | null>(null);
  useEffect(() => {
    const ctx = gsap.context(fn);
    ref.current = ctx;
    return () => ctx.revert();
  }, deps);
  return ref;
}
```

### 7.3 `useScrollProgress()`

Returns the current scroll progress (0..1) and the absolute `scrollY`.

### 7.4 `useMatchMedia(query)`

```ts
function useMatchMedia(query: string): boolean
```

- SSR-safe (returns `false` until mounted).
- Updates on `change`.

### 7.5 `usePrefersReducedMotion()`

```ts
function usePrefersReducedMotion(): boolean
```

- `true` if the user has `prefers-reduced-motion: reduce`.

### 7.6 `usePointer()`

```ts
function usePointer(): { x: number; y: number; isFine: boolean }
```

- `x` and `y` in viewport coordinates.
- `isFine` is `false` on touch devices.

### 7.7 `useInView<T extends Element>(ref, options?)`

```ts
function useInView<T extends Element>(
  ref: React.RefObject<T>,
  options?: IntersectionObserverInit & { once?: boolean }
): boolean
```

### 7.8 `useIsCoarsePointer()`

```ts
function useIsCoarsePointer(): boolean
```

- `true` on touch-primary devices.

### 7.9 `useFocusTrap(active)`

A small wrapper that traps focus within a ref when `active`.

### 7.10 `useDeviceTier()`

```ts
type DeviceTier = 'low' | 'mid' | 'high';
function useDeviceTier(): DeviceTier
```

- Based on `navigator.deviceMemory` and `navigator.hardwareConcurrency`.
- Used to decide whether to mount the shader root, the per-element distortion, etc.

---

## 8. Libs (pure, no React)

### 8.1 `src/lib/gsap.ts`

(See `animations.md` §0.)

### 8.2 `src/lib/lenis.ts`

Exports `getLenis()` and `destroyLenis()`.

### 8.3 `src/lib/sanity/client.ts`

```ts
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  perspective: 'published',
});
```

### 8.4 `src/lib/sanity/queries.ts`

GROQ queries. Each query has a typed return.

### 8.5 `src/lib/seo.ts`

```ts
export function buildMetadata(opts: MetadataOptions): Metadata
```

- Generates `<title>`, `<meta description>`, OG, Twitter, canonical.

### 8.6 `src/lib/analytics.ts`

```ts
type AnalyticsEvent =
  | { name: 'page_view'; route: string }
  | { name: 'cta_click'; cta: string; route: string }
  | { name: 'gallery_open'; item: string }
  | { name: 'booking_submit'; projectType: string }
  | { name: 'contact_submit' };

export function track(event: AnalyticsEvent): void;
```

- Dispatches to Plausible + PostHog based on env config.

### 8.7 `src/lib/env.ts`

Typed env via `@t3-oss/env-nextjs`.

---

## 9. Storybook stories — checklist

For every component:

- [ ] Default story (most common usage).
- [ ] All variants story (a grid of variants).
- [ ] All states story (default, hover, focus, active, disabled, loading, error, empty).
- [ ] Responsive story (mobile, tablet, desktop snapshots).
- [ ] Reduced-motion story (with the flag set).
- [ ] A11y addon enabled.
- [ ] `?debug=timeline` toggle respected.
- [ ] No console warnings or errors in any story.

---

## 10. Testing contracts

### 10.1 Unit tests (Vitest)

- Every pure utility (`cn`, `clamp`, `format`, `ease`, `dur`, `lenis`, `gsap` plugin setup) is unit-tested.
- Every animation timeline factory is unit-tested with a mocked `ScrollTrigger`.

### 10.2 Component tests (Vitest + Testing Library)

- Every component renders all states without errors.
- Every form validates correctly.
- Every dialog traps and restores focus.

### 10.3 E2E tests (Playwright)

- Every form submits and the success state is reached.
- Every page loads with the correct title, meta, and OG.
- The keyboard path works for navigation, dialogs, and forms.
- The reduced-motion path is verified.

### 10.4 Visual regression (Playwright)

- The home, studio, process, portfolio detail, and book pages have a snapshot.
- A11y checks fail the build on critical issues.

---

## 11. Change policy

- A new component **must** have: a story, a test, a `?debug` flag if it animates, and a `data-tier` flag if it touches the GPU.
- A breaking change to a component's API **must** be a major version bump of the design system (e.g., `0.x` → `1.0`).
- A change to a component's animation timing **must** be reflected in `animations.md`.
- A change to a component's color usage **must** be reflected in `designs.md` §2.
