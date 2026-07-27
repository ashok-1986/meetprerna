# meetprerna — Hero + Band/Stats section, build prompt

Reference implementation attached: hero-and-stats.html
Port the behaviour and structure. Do not port raw HTML/CSS wholesale,
translate it into the project's Next.js components and existing token
system.

---

## PROMPT — Senior Web Developer

```
ROLE: Senior Web Developer, Next.js.

TASK: Build two homepage sections — Hero and Band/Stats — using
hero-and-stats.html as the behavioural and structural reference.

ASSET PATH
The hero photo lives at:
D:\Projects\Personal_Projects\Websites\meetprerna\public\images\hero\prerna-hero.jpeg

This is a local Windows path into the project's /public folder. In
Next.js, anything under /public is served from the root. The correct
src in code is:

  /images/hero/prerna-hero.jpeg

Do NOT reference the Windows path directly anywhere in code. Use
next/image with this src, not a plain <img> tag — this is the largest
image on the homepage and very likely the LCP element, so it needs
priority loading and automatic sizing.

  import Image from 'next/image';
  <Image
    src="/images/hero/prerna-hero.jpeg"
    alt="Prerna, hands resting on her own face, tattoo visible across her chest"
    fill
    priority
    style={{ objectFit: 'cover' }}
  />

The GSAP scale transform in the reference applies to a wrapping div
around the Image component, not to the Image itself. next/image
manages its own internal img element; wrap it and animate the wrapper.

DEPENDENCY
GSAP is not yet a project dependency. Install it properly:

  npm install gsap

Do NOT load GSAP from a CDN script tag in the production build. The
reference file uses a CDN tag only because it is a standalone demo.
Import it in the component:

  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

SCROLL COORDINATION — read this before writing any ScrollTrigger code
The header already has its own scroll listener driving a three-stage
convergence (data-nav="0/1/2" on <html>, thresholds at 80px and 220px).
This section adds a SECOND, independent scroll-driven system via GSAP
ScrollTrigger. Both must run without fighting each other:

  - Do not attach the header's logic and this section's ScrollTrigger
    to the same scroll listener. Keep them fully separate; each reads
    window.scrollY independently.
  - Register ScrollTrigger.refresh() on route change / resize, since
    Next.js client-side navigation can leave stale trigger positions.
  - Test with the header's convergence stages actively happening
    (scroll 0–220px) overlapping the hero's pin start. If both are
    visually competing for the same 220px of scroll, that's a real
    problem, surface it, don't silently pick one to win.

HERO BEHAVIOUR
- Hero section has scroll room (min-height: 220vh in the reference).
- Photo is pinned via ScrollTrigger (pin: true) and scales from full
  bleed down to ~0.62 scale with a growing border-radius, using
  gsap.to() on transform properties only (scale, borderRadius). Do
  NOT animate width/height/top/left on this element — pin handles
  positioning, transform handles the visual scale.
- Once the photo settles (~45% through the pin's scroll range),
  headline + subhead + CTA fade in, centred, on top of the framed
  photo.
- scrub: 0.6 on both timelines. Not scrub: true (zero smoothing reads
  as jittery), not a manual lerp (framerate-dependent, already ruled
  out for the header — same reasoning applies here).

CONTENT — hero
Headline: "Trained in fine art. Fluent in skin."
Subhead: "Custom tattoos, paintings, and sketches, made in
conversation, never in a rush."
CTA: "Start a conversation", links to /consulting, hover
micro-interaction already built (fill slides in from left on hover).

NOTE ON THE HEADLINE: this is my working placeholder, not
copywriter-final or confirmed by Prerna. Build it as specified so the
section is complete and testable, but expect this exact line to be
swapped once real copy is signed off. Do not treat it as locked.

BAND BEHAVIOUR
Fixed content, NOT a looping marquee. Six items separated by "·",
each one scrubs from --paper-dim (rgba(245,242,234,0.28)) to full
--paper as the band scrolls through the viewport, staggered ~0.15s
apart, tied to ScrollTrigger scrub, not a CSS animation loop. One
entrance only. Content order:

  Custom Tattoos · Fine Art · Illustration · Traveler Artist ·
  Mumbai · Navi Mumbai

Wrap the whole line in a visually hidden plain-text node containing the full phrase, and mark the animated visual spans `aria-hidden="true"`. This ensures screen readers get one coherent phrase instead of reading each "·" separator as a word, without relying on `aria-label` on a `<p>` tag which is often ignored by assistive technology.

STATS BEHAVIOUR — the fix, not just the content
All four stat figures (500+, 100+, Since 2021, Fine Arts) share ONE
font-size and ONE line-height. Reserve a fixed min-height on the
figure container equal to two lines, so a single-line figure and a
two-line figure sit on the same baseline. This was the actual bug in
the original mockup — inconsistent type scale across four cells
meant to read as one dataset, not a spacing problem.

Content:
  500+   / Tattoos completed
  100+   / Custom designs
  Since 2021 / Tattooing
  Fine Arts  / Diploma, JK Academy

These four figures are confirmed and authentic. Do not add a
verification step or a "TODO: confirm" comment — this is settled.

LAYOUT — the dead-space fix
The intro paragraph ("Every person carries something they have not
said out loud...") sits directly under the "Ink that goes deeper than
skin." headline, on the left. Stats sit in a bordered 2x2 grid on the
right, sharing a top border with the paragraph block so headline,
paragraph, and stat grid read as one aligned row, not three
independently placed elements. This replaces the earlier version
where the left half of the section was empty below the headline.

TOKENS
Reuse the project's existing --color-ink (#1A1A1A), the locked neon
lime, Cormorant Garamond for display, Inter for body. The --font-xl
clamp value in the reference maps to whatever the project's existing
XL type-scale token is — reuse that token, do not mint a new one.

ACCESSIBILITY
- prefers-reduced-motion: reduce must fully disable both ScrollTriggers.
  Photo snaps to its settled scale, hero content is visible immediately,
  band words render at full opacity immediately. No partial motion.
- Visible focus ring on the CTA, same neon token as the header.
- Confirm the existing a11y suite still passes after this section is
  wired in — a second ScrollTrigger instance is a plausible place for
  a new violation to sneak in via focus order or motion.

OUT OF SCOPE
- The venetian-blind/shutter transition into a third section is NOT
  part of this task. That section's content has not been defined yet.
  Do not build a transition into something that doesn't exist.
- Do not touch the header's scroll logic, DESIGN.md, or any other
  homepage section.

WHEN DONE
Report: First Load JS before/after adding gsap, confirmation that the
header's convergence stages and this section's pin/scrub do not visibly
fight each other when scrolled together, and confirmation the a11y
suite still passes.
```

---

## Two things to flag before you run this

**1. GSAP is a new dependency.** It wasn't in the project before this.
Worth a quick look at what it adds to First Load JS — GSAP core is
small (~30kB min) but ScrollTrigger and the plugin registration add to
that. Ask the developer to report the number rather than assuming it's
negligible.

**2. Two independent scroll systems now exist on one page** — the
header's manual listener and this section's ScrollTrigger. They don't
technically conflict, each reads scroll position independently, but
they do overlap in the same 0–220px range where the header is mid-
convergence and the hero's pin is just starting. Worth an actual visual
check once built, not an assumption that "independent" means "fine."
