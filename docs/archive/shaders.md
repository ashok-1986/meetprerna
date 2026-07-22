# MeetPrerna — Shaders (`shaders.md`)

> GLSL specifications, uniform controls, render pipeline, and performance budgets for every WebGL pass on the site.

---

## 1. The five passes

| # | Shader | Role | Where it runs | Loaded when |
|---|---|---|---|---|
| 1 | **InkField** | The full-bleed ambient ink behind the entire site. | `app/layout.tsx` (one full-viewport canvas) | Always (with WebGL). |
| 2 | **Grain** | Film-grain overlay applied as a final pass. | `app/layout.tsx` (a second full-viewport canvas, slightly above) | Always (with WebGL). |
| 3 | **Distortion** | Localized UV displacement around the cursor and on portfolio card hover. | A small per-element canvas | Lazy on first hover. |
| 4 | **Ink Drop** | A subtle ink-drop particle. | Cursor click | Triggered; not running. |
| 5 | **Process** | A subtle ink-mix transition between process steps. | `/process` route | Lazy on first scroll. |

All five:

- Are **disabled** under `prefers-reduced-motion: reduce`. The shaders are removed from the DOM; static CSS backgrounds take over.
- Are **disabled** when WebGL is unavailable. A static radial-gradient CSS background replaces the InkField.
- Pause on `visibilitychange === 'hidden'`.
- Use `requestAnimationFrame` only when visible.
- Cap `devicePixelRatio` at 1.5 on mobile, 2.0 on desktop.

---

## 2. Render pipeline (architecture)

```
┌─────────────────────┐
│  Full-bleed canvas  │   z-index: 0, pointer-events: none
│  ─────────────────  │
│  Pass 1: InkField   │   full quad
│  Pass 2: Grain      │   full quad, additive blend
└─────────────────────┘
            ↑ (behind)
┌─────────────────────┐
│        DOM          │   z-index: 10
│  (Next.js content)  │
└─────────────────────┘
            ↑ (above DOM where mounted)
┌─────────────────────┐
│ Per-element canvas  │   z-index: 11, pointer-events: none
│ Pass 3: Distortion  │   mounted on .portfolio-card and .hero
└─────────────────────┘
```

A single `three.js` `Scene` is shared; each shader is its own `ShaderMaterial` on a `PlaneGeometry` filling a `OrthographicCamera`.

The **Ink Drop** and **Process** shaders are mounted lazily on first trigger.

### 2.1 Mount component (root layout)

```tsx
// src/components/shaders/ShaderRoot.tsx
'use client';

import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const InkField = dynamic(() => import('./InkField').then(m => m.InkField), { ssr: false });
const Grain = dynamic(() => import('./Grain').then(m => m.Grain), { ssr: false });

export function ShaderRoot() {
  const reduce = usePrefersReducedMotion();
  if (reduce) return null;
  return (
    <>
      <InkField />
      <Grain />
    </>
  );
}
```

`InkField` and `Grain` are themselves client components, dynamically imported, and only mounted after `requestIdleCallback` fires (so the LCP image wins the first frame).

---

## 3. InkField

The ambient layer. Always running. The "room tone" of the site.

### 3.1 Visual goal

A near-imperceptible drift of low-amplitude, low-frequency values that *could* be ink-in-water, *could* be paper grain, *could* be the air in a quiet room. Never busy. Never bright. It's the page's calm, made of pixels.

### 3.2 Implementation

- **Geometry:** A `PlaneGeometry(2, 2)` with a `OrthographicCamera(-1, 1, 1, -1, 0, 1)`. Standard fullscreen quad.
- **Material:** Custom `ShaderMaterial`.
- **Blending:** Normal.
- **Depth test:** Off.
- **Render target:** The canvas itself (no offscreen).

### 3.3 Fragment shader (`src/shaders/inkField.frag`)

```glsl
precision highp float;

uniform float uTime;          // seconds since start
uniform vec2  uResolution;    // canvas size in physical pixels
uniform vec2  uMouse;         // 0..1 normalized
uniform float uMouseInfluence;// 0..1, 0 when no mouse
uniform float uScroll;        // 0..1
uniform vec3  uInk;           // brand --color-ink in linear
uniform vec3  uInchworm;      // brand --color-inchworm in linear
uniform float uIntensity;     // 0..1, eased by section

// noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  // aspect-correct slow drift
  vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

  // two layers of FBM at different scales
  float n1 = fbm(p * 1.4 + uTime * 0.03);
  float n2 = fbm(p * 3.2 - uTime * 0.05 + n1 * 0.3);
  float n  = mix(n1, n2, 0.5);

  // mouse proximity: a soft circular influence
  float md = distance(uv, uMouse);
  float mouse = smoothstep(0.45, 0.0, md) * uMouseInfluence;

  // base ink color
  vec3 col = uInk;

  // lift the color slightly with the noise, biased toward inchworm
  float lift = smoothstep(-0.2, 0.6, n) * 0.06;
  col = mix(col, uInchworm, lift * uIntensity * 0.18);

  // mouse adds a faint warm spot (still on-brand)
  col = mix(col, uInchworm, mouse * 0.05);

  // soft vertical vignette to anchor the eye
  float vig = smoothstep(1.2, 0.4, length(uv - 0.5));
  col *= 0.85 + 0.15 * vig;

  // scroll-driven very slow gradient shift
  col *= 0.96 + 0.04 * (1.0 - uScroll);

  gl_FragColor = vec4(col, 1.0);
}
```

### 3.4 Vertex shader (`src/shaders/inkField.vert`)

```glsl
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
```

### 3.5 Uniforms

| Uniform | Type | Range | Source | Default |
|---|---|---|---|---|
| `uTime` | `float` | 0..∞ | RAF delta accumulator | 0 |
| `uResolution` | `vec2` | canvas px | ResizeObserver | viewport |
| `uMouse` | `vec2` | 0..1 | `gsap.quickTo` from pointer | (0.5, 0.5) |
| `uMouseInfluence` | `float` | 0..1 | Eased over 800ms after first pointermove | 0 |
| `uScroll` | `float` | 0..1 | `ScrollTrigger` proxy | 0 |
| `uInk` | `vec3` | linear | `tokens.css` | linear(#1A1A1A) |
| `uInchworm` | `vec3` | linear | `tokens.css` | linear(#C4FF61) |
| `uIntensity` | `float` | 0..1 | Eased by route + scroll | 1.0 on `/`, 0.6 on `/about`, 0.4 on contact, 0 on `/book` |

### 3.6 Performance budget

- **Frame time:** ≤ 4ms GPU on a Pixel 6a.
- **Pixels shaded per frame:** full viewport.
- **Memory:** 0 (no offscreen, no textures).
- **Compile time:** < 30ms (one program).

### 3.7 Reduced motion / WebGL fallback

The CSS background:

```css
.shader-fallback {
  background:
    radial-gradient(ellipse at 30% 20%, #1f1f1f 0%, transparent 60%),
    radial-gradient(ellipse at 70% 80%, #161616 0%, transparent 50%),
    #1A1A1A;
}
```

This is applied to `<body>` when the shader root is removed.

---

## 4. Grain

A film-grain overlay. Subtle, but it's the difference between *screen* and *page*.

### 4.1 Visual goal

A high-frequency, low-amplitude noise pattern that *barely* moves. It's the texture of paper projected on screen.

### 4.2 Implementation

- **Material:** Custom `ShaderMaterial`.
- **Blending:** `AdditiveBlending` against the page DOM (the canvas is `mix-blend-mode: overlay`).
- **Opacity:** 0.08.
- **Refresh:** Re-seeded every 6 frames at 60fps (10Hz) — imperceptible motion.

### 4.3 Fragment shader (`src/shaders/grain.frag`)

```glsl
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform float uOpacity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy;
  float n = hash(uv + floor(uTime * 10.0));
  vec3 col = vec3(n);
  gl_FragColor = vec4(col, uOpacity);
}
```

### 4.4 Uniforms

| Uniform | Type | Range | Default |
|---|---|---|---|
| `uTime` | `float` | 0..∞ | 0 |
| `uResolution` | `vec2` | canvas px | viewport |
| `uOpacity` | `float` | 0..0.2 | 0.08 |

### 4.5 Performance budget

- **Frame time:** ≤ 1ms GPU (cheaper than InkField).
- **Memory:** 0.

### 4.6 Reduced motion

The grain is a *texture*, not motion. It's a static noise pattern (no `uTime` advancement) under reduced motion.

---

## 5. Distortion

A localized UV displacement that surrounds the cursor and activates on portfolio card hover.

### 5.1 Visual goal

A "heat-haze" of pixels that *follows* the cursor. The cursor moves, the ink follows, then settles. The ink gives the cursor weight.

### 5.2 Implementation

- **Geometry:** A `PlaneGeometry(2, 2)` per element.
- **Material:** Custom `ShaderMaterial` with the element's image as a sampler.
- **Mounted on:** `.hero__image`, `.portfolio-card`.
- **Active when:** `pointermove` over the element OR `data-active="true"` (from card hover).

### 5.3 Fragment shader (`src/shaders/distortion.frag`)

```glsl
precision highp float;

uniform sampler2D uTexture;
uniform vec2  uResolution;
uniform vec2  uPointer;     // 0..1 within the element
uniform float uPointerInfluence;
uniform float uTime;

uniform float uAmp;         // amplitude of distortion
uniform float uFreq;        // frequency of distortion
uniform float uSpeed;       // animation speed

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  // distance from pointer
  float d = distance(uv, uPointer);

  // pointer influence is a soft radial
  float inf = smoothstep(0.4, 0.0, d) * uPointerInfluence;

  // noise-driven displacement, time-modulated
  vec2 n = vec2(
    snoise(uv * uFreq + uTime * uSpeed),
    snoise(uv * uFreq + uTime * uSpeed + 100.0)
  );

  vec2 offset = n * uAmp * inf;

  vec4 col = texture2D(uTexture, uv + offset);
  gl_FragColor = col;
}
```

### 5.4 Uniforms

| Uniform | Type | Default | Notes |
|---|---|---|---|
| `uTexture` | `sampler2D` | the element's image | Bound from `useRef<HTMLImageElement>()` via `THREE.Texture`. |
| `uResolution` | `vec2` | element size | ResizeObserver. |
| `uPointer` | `vec2` | (0.5, 0.5) | `gsap.quickTo`. |
| `uPointerInfluence` | `float` | 0 | Eased to 1 on hover, to 0 on hover-out (260ms). |
| `uTime` | `float` | 0 | RAF. |
| `uAmp` | `float` | 0.012 | Set per element. Hero is 0.02; cards 0.008. |
| `uFreq` | `float` | 3.0 | Set per element. Cards 6.0. |
| `uSpeed` | `float` | 0.4 | Always. |

### 5.5 Performance budget

- **Frame time:** ≤ 3ms GPU per active canvas.
- **Memory:** 1 texture (the image).
- **Concurrent instances:** never more than 2 active at once (hero + at most one hovered card).

### 5.6 Reduced motion

The texture is shown un-distorted. The pointer is ignored.

---

## 6. Ink Drop

A subtle particle effect on cursor click.

### 6.1 Visual goal

A single, slow-rising ink droplet that appears at the click point and dissipates over 1.2s. Brand.

### 6.2 Implementation

- **Geometry:** A `Points` with one position attribute (the click point in 0..1).
- **Material:** Custom `ShaderMaterial`, additive blending.
- **Trigger:** Cursor `click` event on `[data-cursor="click-ink"]` (links and CTAs).
- **Lifetime:** 1200ms.
- **Count:** at most 5 active droplets.

### 6.3 Fragment shader (`src/shaders/inkDrop.frag`)

```glsl
precision highp float;

uniform float uTime;        // seconds since spawn
uniform float uLifetime;   // total lifetime in seconds
uniform vec3  uInchworm;    // color
uniform float uSize;        // base size in pixels

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  float t = clamp(uTime / uLifetime, 0.0, 1.0);

  // radial soft circle, fading out
  float alpha = smoothstep(0.5, 0.0, r) * (1.0 - t);
  if (alpha < 0.001) discard;

  // slight inward contraction over time
  float scale = 1.0 - t * 0.2;

  gl_FragColor = vec4(uInchworm, alpha * 0.6 * scale);
}
```

### 6.4 Uniforms (per droplet)

| Uniform | Type | Default | Notes |
|---|---|---|---|
| `uTime` | `float` | 0 | Per-frame, per-droplet. |
| `uLifetime` | `float` | 1.2 | |
| `uInchworm` | `vec3` | linear(#C4FF61) | |
| `uSize` | `float` | 32 | Hero: 48; CTAs: 24. |

### 6.5 Performance budget

- **Frame time:** ≤ 1ms GPU.
- **Memory:** A single `BufferAttribute` of size 5 × 3 floats.

### 6.6 Reduced motion

No droplets.

---

## 7. Process (the per-step ink-mix)

A subtle transition on `/process` between steps.

### 7.1 Visual goal

A slow, soft "ink mix" — the colors of the previous step bleed into the next over 600ms. Almost imperceptible.

### 7.2 Implementation

- **Geometry:** Full-bleed canvas on the route.
- **Material:** Custom `ShaderMaterial` with two textures (current step's image, next step's image) and a mix factor.
- **Mounted on:** `/process` only.

### 7.3 Fragment shader (`src/shaders/process.frag`)

```glsl
precision highp float;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform float uMix;        // 0..1
uniform float uTime;
uniform vec2  uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec4 a = texture2D(uFrom, uv);
  vec4 b = texture2D(uTo, uv);

  // dissolve via a noise mask for the "mix" feel
  float n = fract(sin(dot(uv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  float t = smoothstep(uMix - 0.05, uMix + 0.05, n);

  gl_FragColor = mix(a, b, t);
}
```

### 7.4 Uniforms

| Uniform | Type | Range | Notes |
|---|---|---|---|
| `uFrom` | `sampler2D` | — | The current step's hero image. |
| `uTo` | `sampler2D` | — | The next step's hero image. |
| `uMix` | `float` | 0..1 | Driven by `ScrollTrigger.scrub` over the section's scroll. |
| `uTime` | `float` | 0..∞ | RAF. |
| `uResolution` | `vec2` | canvas px | |

### 7.5 Performance budget

- **Frame time:** ≤ 4ms GPU.
- **Memory:** 2 textures.

### 7.6 Reduced motion

No transition. Steps cross-fade via CSS at the section's enter moment.

---

## 8. Color management

- All uniforms that are brand colors (`uInk`, `uInchworm`, `uInkDrop.uInchworm`) are converted from sRGB to **linear** at the JS level:

  ```ts
  const linear = (srgb: number) => Math.pow(srgb / 255, 2.2);
  const uInk = new THREE.Vector3(linear(0x1a), linear(0x1a), linear(0x1a));
  ```

- Tone mapping: `NoToneMapping`. The site is dark; we don't want to crush blacks further.
- Output color space: `THREE.SRGBColorSpace` so the linear uniforms render correctly.

---

## 9. WebGL feature detection

```ts
// src/lib/webgl.ts
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
```

Used in `ShaderRoot` to decide whether to mount anything at all.

---

## 10. Lifecycle & visibility

- The root layout mounts the shader after `requestIdleCallback` fires (or 1500ms, whichever first) — so the LCP image wins.
- The render loop is paused when `document.visibilityState === 'hidden'`.
- The render loop is paused on `prefers-reduced-motion: reduce` (loop never starts).
- The render loop is throttled to 30fps on `prefers-reduced-data: reduce` (a small concession to data-conscious users).

```ts
// src/lib/raf.ts
export function makeRafLoop(tick: (dt: number) => void) {
  let last = performance.now();
  let raf = 0;
  let running = false;

  const loop = (now: number) => {
    if (!running) return;
    const dt = (now - last) / 1000;
    last = now;
    tick(dt);
    raf = requestAnimationFrame(loop);
  };

  return {
    start: () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    },
    stop: () => {
      running = false;
      cancelAnimationFrame(raf);
    },
  };
}
```

---

## 11. Mobile-tier handling

On mobile devices (any `prefers-reduced-data`, any device with `navigator.deviceMemory < 4`, or any iOS device), the following fallbacks apply:

- `devicePixelRatio` capped at 1.0.
- `InkField` continues to run, but its `uIntensity` is reduced to 0.6.
- `Grain` continues to run at half opacity.
- `Distortion` is **disabled** on portfolio cards (still works on the hero if the hero is a static image, not a video).
- `Ink Drop` is **disabled**.
- `Process` is **disabled** (steps cross-fade via CSS).

A `data-tier="low"` attribute on `<html>` drives these decisions and is set in `app/layout.tsx` from a small script that runs before hydration.

---

## 12. Shader file layout

```
src/shaders/
├── inkField.frag
├── inkField.vert
├── grain.frag
├── grain.vert          // shared
├── distortion.frag
├── distortion.vert     // shared
├── inkDrop.frag
├── inkDrop.vert
├── process.frag
├── process.vert
├── common/
│   ├── fullscreen.vert // shared fullscreen quad
│   └── noise.glsl      // #include-able via glslify
└── index.ts            // barrel exporting compiled sources
```

GLSL is loaded via `?raw`:

```ts
// src/lib/glsl.ts
import inkFieldFrag from '@/shaders/inkField.frag?raw';
import inkFieldVert from '@/shaders/inkField.vert?raw';
// ...
```

The `webpack` rule in `next.config.js` handles `.glsl/.frag/.vert/.vs/.fs` as `asset/source`.

---

## 13. Debug & inspection

In development, with `?debug=shader` in the URL:

- The canvas has a 1px red border.
- Each uniform's value is printed to a small overlay.
- A Spector.js capture button is available (Spector loaded only with this flag).

---

## 14. Acceptance criteria (Phase 4 gate)

A shader is "done" when:

- [ ] Compiles without warnings.
- [ ] Renders the expected visual.
- [ ] Honors `prefers-reduced-motion`.
- [ ] Honors `prefers-reduced-data`.
- [ ] Pauses on `visibilitychange === 'hidden'`.
- [ ] Handles resize without artifacts.
- [ ] Handles devicePixelRatio changes.
- [ ] Has a CSS fallback when WebGL is unavailable.
- [ ] Frame time is within the budget on a Pixel 6a profile.
- [ ] No texture leaks across route changes (verified via DevTools Memory snapshots).
- [ ] Documented in this file.
