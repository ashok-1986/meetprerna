'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook to initialize and manage Lenis smooth scrolling
 * Integrates with GSAP ScrollTrigger for synchronized animations
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP's ticker
    const gsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Request animation frame loop
    let rafId: number;
    const raf = (time: number) => {
      rafId = requestAnimationFrame(raf);
      gsapTick(time);
    };
    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
