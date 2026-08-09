# MeetPrerna — Animation Strategy (v2.0 - Edge-to-Edge)

This strategy formalizes the motion budget and mechanics extracted from the latest references (oevra.com, fiddle.digital, athleticsnyc.com, and Framer components).

As the UX/UI and Motion Engineer, I have mapped these mechanics onto our Edge-to-Edge layout paradigm.

## 1. Global Motion Environment
* **Engine:** GSAP (ScrollTrigger, SplitText) + native CSS transforms.
* **Canvas:** OGL/Three.js overlay for WebGL fluid distortions and noise grain (derived from oevra.com).
* **Pacing:** Cinematic, fluid, and continuous. Zero hard cuts; every transition must overlap slightly with the next.

## 2. Core Mechanics

### 2.1 The Entry Sequence (Framer Preloader)
* **Reference:** Framer Interactive Preloader
* **Execution:** A dedicated load screen that masks out the initial DOM render. It reveals the site via a complex clip-path expansion (circle or polygon) from the center out, smoothly unveiling the Hero Block.

### 2.2 Text & Typography Reveals (StringTune + Oevra)
* **Reference:** oevra.com and StringTune
* **Execution:** Headings (`--text-display-l` and `xl`) will be split into words or characters using GSAP SplitText. They will be revealed via `clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)` and `y: 100%` scrubs, creating a tight "emerging from the baseline" effect.

### 2.3 Image Appearance (Fiddle.digital)
* **Reference:** fiddle.digital
* **Execution:** Images do not simply fade in. They utilize a combined `scale: 1.1 -> 1.0` and `clip-path` wipe from left-to-right or bottom-to-top, governed by ScrollTrigger. This makes imagery feel like it is physically sliding into the viewport.

### 2.4 Section Stacking & Wiping (Athletics NYC)
* **Reference:** athleticsnyc.com
* **Execution:** To emphasize the Edge-to-Edge layout, major sections (e.g., The Hinge, Investment Teaser) will use `position: sticky` logic via GSAP. The incoming section slides over the outgoing section, or the outgoing section scales down slightly (`scale: 0.95`, `brightness: 0.5`) as the new one wipes over it.

### 2.5 The Horizontal Gallery (Framer ImageScroller)
* **Reference:** Framer ImageScroller
* **Execution:** For the "Selected Work" drag rail. We will implement native CSS horizontal scrolling combined with a JS pointer observer to allow cursor dragging (`cursor: grab/grabbing`). A skew effect based on drag velocity will be applied to the images (`transform: skewX()`).

## 3. The WebGL Layer (Shader Engineer Hand-off)
To fully achieve the oevra.com aesthetic:
* A full-screen `<canvas>` must be mounted behind the DOM (or above with mix-blend-mode).
* **Pass 1:** Fluid distortion mapped to the user's cursor position.
* **Pass 2:** A continuous, low-opacity noise grain (animated via time uniform) to give the Ink and Ivory backgrounds physical texture.

## 4. Accessibility & Reduced Motion
If `prefers-reduced-motion: reduce` is detected:
* **Kill the Canvas:** The WebGL fluid and noise passes must not mount.
* **Disable Scrubber:** The Framer preloader bypasses immediately.
* **Fallback Reveals:** All clip-path and `y: 100%` text/image reveals default to a simple 300ms CSS opacity fade.
* **Disable Skew:** The Image Scroller loses its velocity-based skewing physics.
