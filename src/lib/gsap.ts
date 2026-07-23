/**
 * MeetPrerna — GSAP singleton & plugin registration.
 *
 * Conditionally loads paid plugin stubs when NEXT_PUBLIC_GSAP_STUBS=true.
 * Reference: docs/animations.md §0.
 */
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

// Register plugins immediately
gsap.registerPlugin(ScrollTrigger, Observer, SplitText);

// ---------------------------------------------------------------------------
// Lenis + GSAP ticker sync.
// ---------------------------------------------------------------------------

let lenisInstance: Lenis | null = null;

/**
 * Returns the singleton Lenis instance. Initializes on first call.
 * The Lenis RAF is driven by the GSAP ticker so scroll + tweens share
 * the same frame budget.
 */
export function getLenis(): Lenis {
  if (typeof window === 'undefined') {
    throw new Error('getLenis() called on the server');
  }
  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut-ish
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
  return lenisInstance;
}

export function destroyLenis() {
  lenisInstance?.destroy();
  lenisInstance = null;
}

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).has('debug')) {
  ScrollTrigger.defaults({ markers: true });
  gsap.globalTimeline.timeScale(4);
}

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export {
  gsap,
  ScrollTrigger,
  Observer,
  SplitText,
};

