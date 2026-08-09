# Immersive Motion Architecture & Animation System (`ANIMATIONS.md`)

> Comprehensive motion spec merged from **LightshipRV** (Expressive Physicality) and **Oevra** (Subtle Functional Restraint).
> Tailored for high-end editorial and portfolio applications (e.g., `meetprerna.com`).

---

## Table of Contents

* [#1-overview-and-motion-philosophy](https://www.google.com/search?q=%231-overview-and-motion-philosophy)
* [#2-design-tokens-and-foundations](https://www.google.com/search?q=%232-design-tokens-and-foundations)
* [#3-registered-keyframes-and-css-specs](https://www.google.com/search?q=%233-registered-keyframes-and-css-specs)
* [#4-motion-categories-and-component-patterns](https://www.google.com/search?q=%234-motion-categories-and-component-patterns)
* [#5-spatial-direction-and-layout-physics](https://www.google.com/search?q=%235-spatial-direction-and-layout-physics)
* [#6-immersive-enhancements](https://www.google.com/search?q=%236-immersive-enhancements)
* [#7-page-and-component-compatibility-matrix](https://www.google.com/search?q=%237-page-and-component-compatibility-matrix)
* [#8-performance-budget-and-technical-rules](https://www.google.com/search?q=%238-performance-budget-and-technical-rules)
* [#9-governance-dos-and-donts](https://www.google.com/search?q=%239-governance-dos-and-donts)

---

## 1. Overview and Motion Philosophy

This system operates on a dual-register philosophy that bridges functional restraint with expressive storytelling:

1. **Functional UI (Quiet Register):** Micro-interactions, navigation links, buttons, and state changes are **subtle, fast, and functional**. They smooth state changes without demanding attention or delaying user intent.
2. **Narrative & Staged Reveals (Expressive Register):** Section entrances, scroll-driven storytelling, and editorial showcases employ **expressive layout physics, spring dynamics, and staggered reveals**. Motion here feels organic, responsive, and alive—grounded in spatial weight and physical inertia.

### Core Principles

* **Intentional Pacing:** Short durations for micro-interactions ($<250\text{ms}$), deliberate curves for content reveals ($300\text{ms} - 800\text{ms}$).
* **Hardware Honor:** Animate only compositor-friendly properties (`transform`, `opacity`, `color`, `background-color`).
* **When in doubt, leave it static:** Motion must enhance legibility and mood, never act as decorative clutter.

---

## 2. Design Tokens and Foundations

### Duration Scale

| Token | Value | Intent & Usage |
| --- | --- | --- |
| `--duration-instant` | `0ms` | Immediate state resets, hard layout toggles |
| `--duration-micro` | `150ms` | Hover states, active links, focus indicators, color shifts |
| `--duration-short` | `200ms` | Small element transitions, icon swaps, sub-menu toggles |
| `--duration-standard` | `250ms` - `300ms` | Default component reveals, card reveals, button transitions |
| `--duration-medium` | `400ms` | Panel drawers, accordion reveals, content swaps |
| `--duration-long` | `500ms` | Section entrances, hero masks, large layout shifts |
| `--duration-page` | `800ms` | Full-page route transitions, full-screen menu reveals |
| `--duration-ambient` | `5000000ms` | Continuous looping animations (marquee, background noise, clock) |

---

### Easing Functions

| Curve Token | Value / Cubic-Bezier | Usage Context |
| --- | --- | --- |
| `--ease-system-default` | `cubic-bezier(.43, .195, .02, 1)` | System-wide default curve (Smooth, editorial deceleration) |
| `--ease-out` | `ease-out` / `cubic-bezier(0, 0, .2, 1)` | Entering elements, reveals, fast accelerate-out |
| `--ease-in` | `ease-in` | Exiting elements, drawer dismissals |
| `--ease-in-out` | `ease-in-out` | Continuous loops, ambient pulses, marquee tracks |
| `--ease-spring-enter` | `cubic-bezier(.8, 0, 1, 1)` | Fast deceleration for high-impact enters |
| `--ease-material` | `cubic-bezier(.4, 0, .2, 1)` | Standard deceleration for UI panels |
| `--ease-fallback` | `ease` | Generic fallback curve |

---

### Animated CSS Variable Tokens

These custom properties facilitate performant interpolation for underlines, borders, and spatial vectors without triggering layout recalculations:

```css
:root {
  --border-scaleX: 0;
  --border-width: 0%;
  --border-scale: 1;
  --border-opacity: 0;
  --border-x: -4rem;
}

```

---

## 3. Registered Keyframes and CSS Specs

The system registers **9 keyframes** for ambient loops, reveals, and progress feedback:

```css
/* 1. Subtle film-grain / dither ambient noise */
@keyframes noise {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
}

/* 2. Elements enter from below */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

/* 3. Sliding motion along a rail/track */
@keyframes rail {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

/* 4. Circular / rotating motion */
@keyframes clock {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 5. Scale/opacity pulse — attention cue & loading */
@keyframes pulsed {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.96);
  }
}

/* 6. SVG stroke dash-offset travel (Drawing / progress lines) */
@keyframes dashoffsetMoving {
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
}

/* 7. Dashed line scrolling path */
@keyframes dash-scroll {
  to { stroke-dashoffset: -24; }
}

/* 8. Indeterminate loading spinner */
@keyframes loading {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 9. Tri-element / 3-dot loader variant */
@keyframes l3 {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.4); opacity: 0.3; }
}

```

---

## 4. Motion Categories and Component Patterns

### Micro-Interactions

```css
/* Button Primary Hover */
.btn-primary {
  transition: opacity 150ms ease, transform 150ms cubic-bezier(.43, .195, .02, 1);
  will-change: opacity, transform;
}
.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
}

/* Navigation Link States */
.nav-link {
  color: var(--color-ivory-dim, #6B6B6B);
  transition: color 150ms cubic-bezier(.43, .195, .02, 1);
  position: relative;
}
.nav-link:hover {
  color: var(--color-ink, #000000);
}
.nav-link.active {
  color: var(--color-accent, #1da1f2);
}

/* Animated Border/Underline Interpolation */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(var(--border-scaleX));
  transform-origin: right;
  transition: transform 200ms cubic-bezier(.43, .195, .02, 1);
}
.nav-link:hover::after {
  --border-scaleX: 1;
  transform-origin: left;
}

```

---

### Scroll-Driven & Timeline Motion

Scroll interactions use native GSAP `ScrollTrigger` bindings. The native scrollbar remains unhijacked, and scrubbing is applied directly to property timelines.

```javascript
// GSAP Timeline Pattern for Section Reveal
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createSectionReveal(container, elements) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });

  tl.fromTo(elements, 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform'
    }
  );

  return tl;
}

```

---

### Page Transitions

Full-screen menu panels and route swaps use smooth `--duration-page` ($800\text{ms}$) transitions with strict focus isolation.

```css
.page-drawer {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: var(--color-ink);
  transform: translate3d(100%, 0, 0);
  transition: transform 800ms cubic-bezier(.43, .195, .02, 1);
  will-change: transform;
}

.page-drawer.is-open {
  transform: translate3d(0, 0, 0);
}

```

---

### 3D / WebGL / Shaders

* **Budget Limit:** Combined GPU processing budget must remain under **5ms per frame** on mobile hardware.
* **Canvas Mount:** WebGL contexts must mount post-LCP via `requestIdleCallback`.
* **Pass Limit:** Capped at two ambient passes max (e.g., `InkField` and `Grain`).

---

### Ambient & Background FX

The `noise` keyframe is applied via an overlay pseudo-element to inject subtle texture without triggering layout recalculations:

```css
.ambient-grain {
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url('/assets/noise.png');
  opacity: 0.03;
  pointer-events: none;
  animation: noise 8s steps(10) infinite;
  z-index: 1;
}

```

---

## 5. Spatial Direction and Layout Physics

To establish a coherent spatial mental model across the experience:

* **Entrance Axis:** Elements enter from the **Bottom** or **Right**.
* **Exit Axis:** Elements exit toward the **Top** or **Left**.

```
       [ EXIT ]  ▲ (Top)
                 │
 (Left) ◄────────┼────────► (Right) [ ENTER ]
                 │
       [ ENTER ] ▼ (Bottom)

```

### Staggered Reveals

When multiple cards or grid items enter simultaneously, apply a sequential stagger between $40\text{ms}$ and $120\text{ms}$ to direct eye tracking smoothly across the canvas.

---

## 6. Immersive Enhancements

### Depth Layering & Inertia Parallax

Assign explicit Z-index tiers and differential scroll speeds to create visual separation without custom scrollbars:

```javascript
// Differential Scroll Inertia (GSAP Scrub)
gsap.to('.parallax-background', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

gsap.to('.parallax-foreground', {
  yPercent: -5,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

```

---

### Scroll Velocity Detection

Dynamically skew or scale elements slightly based on trackpad or mouse wheel velocity to accentuate physical weight:

```javascript
let clamp = gsap.utils.clamp(-8, 8);

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    gsap.to('.velocity-card', {
      skewY: skew,
      duration: 0.1,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  }
});

```

---

### Progressive Enhancement & Low-Power Devices

Disable heavy canvas layers, high-frequency velocity skews, and infinite ambient keyframe loops under any of the following hardware conditions:

1. `navigator.hardwareConcurrency <= 4`
2. `navigator.deviceMemory <= 4`
3. Network connection in `saveData` mode.

---

### Accessibility: Reduced Motion Fallback

Always respect OS-level motion reductions using a strict global override:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .ambient-grain,
  .velocity-card {
    animation: none !important;
    transform: none !important;
  }
}

```

```javascript
// JS Prefers-Reduced-Motion Guard
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}

```

---

## 7. Page and Component Compatibility Matrix

| Animation Technique | Hero Section | Portfolio Grid | About Page | Sanctuary / Process | Contact Form |
| --- | --- | --- | --- | --- | --- |
| **Micro Hover (150ms)** | Yes | Yes | Yes | Yes | Yes |
| **Staggered Enters (slideInUp)** | Yes | Yes | Yes | Yes | No |
| **Scroll-Scrubbed Masking** | Yes | Optional | No | Yes | No |
| **Horizontal Rail Loop** | Yes | Yes | No | No | No |
| **Parallax Depth Layering** | Yes | No | Yes | Yes | No |
| **WebGL Shader Passes** | Yes (Hero background) | No | No | No | No |
| **SVG Dash-Offset Drawing** | No | No | Yes | Yes | No |
| **Ambient Noise Overlay** | Yes | Yes | Yes | Yes | Yes |

---

## 8. Performance Budget and Technical Rules

### Frame & GPU Budget

* **Target Frame Rate:** $60\text{fps}$ ($16.6\text{ms}$ per frame window).
* **Composite/Paint Budget:** Maximum $5\text{ms}$ for layout updates and GPU composite operations.
* **Reflow Avoidance:** Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`).

### Property Classification

```
┌─────────────────────────────────────────┐
│     ALLOWED (GPU Composited)            │
├─────────────────────────────────────────┤
│  transform: translate3d() / scale()     │
│  opacity                                │
│  color                                  │
│  background-color                       │
│  clip-path (Simple polygons)            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│     BANNED (Triggers Layout/Reflow)     │
├─────────────────────────────────────────┤
│  width / height                         │
│  top / left / right / bottom            │
│  margin / padding                       │
│  box-shadow (Repaints whole element)    │
│  filter / backdrop-filter (Heavy GPU)   │
└─────────────────────────────────────────┘

```

---

## 9. Governance: Do's and Don'ts

### Do's

* **DO** stick strictly to the duration scale and standard easing curves.
* **DO** default to `cubic-bezier(.43, .195, .02, 1)` for general UI transitions.
* **DO** use `ease-out` for entering elements and `ease-in` for exiting elements.
* **DO** animate exclusively GPU-friendly properties (`transform`, `opacity`, `color`, `background-color`).
* **DO** use spring physics and staggered reveals for physical, expressive storytelling.
* **DO** keep continuous background loops subtle and unobtrusive.
* **DO** verify all reduced-motion paths manually with OS motion reduction enabled.

### Don'ts

* **DON'T** animate layout-triggering properties (`width`, `height`, `top`, `left`). Use `transform` scales or translations instead.
* **DON'T** animate `box-shadow`. Use flat surface fills, clean borders, or opacity step transitions.
* **DON'T** animate `filter` or `backdrop-filter` dynamically during scroll.
* **DON'T** invent keyframes or arbitrary curve values outside this spec.
* **DON'T** use long or bouncy easings on core functional UI elements (buttons, nav, inputs).
* **DON'T** hijack native scrolling using artificial smooth-scroll wrappers (e.g., Lenis/ScrollSmoother) on mobile viewports.
* **DON'T** skip `prefers-reduced-motion` handling in both CSS media queries and JS timeline logic.