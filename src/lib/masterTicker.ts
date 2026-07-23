import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
const r3fCallbacks = new Set<(time: number, delta: number) => void>();

export function initMasterTicker() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  });

  // Lenis drives ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // GSAP is the master clock
  gsap.ticker.add((time: number) => {
    // 1. Update Lenis physics
    lenisInstance?.raf(time * 1000);
    
    // 2. ScrollTrigger reads new scroll position
    //    (already called by lenis.on('scroll'), but double-call is harmless)
    ScrollTrigger.update();
    
    // 3. Render R3F frames
    const delta = gsap.ticker.deltaRatio();
    r3fCallbacks.forEach((fn) => fn(time, delta));
  });

  gsap.ticker.lagSmoothing(0);

  // Refresh triggers after fonts settle
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  
  // Fallback refresh
  setTimeout(() => ScrollTrigger.refresh(), 500);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function registerR3FRender(fn: (time: number, delta: number) => void) {
  r3fCallbacks.add(fn);
}

export function unregisterR3FRender(fn: (time: number, delta: number) => void) {
  r3fCallbacks.delete(fn);
}
