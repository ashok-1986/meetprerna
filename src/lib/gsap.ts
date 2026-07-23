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
// Register plugins immediately
gsap.registerPlugin(ScrollTrigger, Observer, SplitText);

// Lenis logic has moved to masterTicker.ts

if (typeof window !== 'undefined') {
  document.documentElement.classList.add('gsap-ready');
  if (process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).has('debug')) {
    ScrollTrigger.defaults({ markers: true });
    gsap.globalTimeline.timeScale(4);
  }
  
  ScrollTrigger.defaults({
    invalidateOnRefresh: true,
    fastScrollEnd: true,
  });
  
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
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

