'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to manage GSAP context and ScrollTrigger
 * Ensures proper cleanup and ScrollTrigger synchronization
 */
export function useGSAP(callback: () => void | (() => void), dependencies: any[] = []) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Create GSAP context for automatic cleanup
    contextRef.current = gsap.context(() => {
      const cleanup = callback();
      return cleanup;
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, dependencies);

  return contextRef;
}

/**
 * Hook to synchronize Lenis smooth scroll with GSAP ScrollTrigger
 * Call this once in your root layout or Lenis provider
 */
export function useLenisGSAPSync(lenis: any) {
  useEffect(() => {
    if (!lenis?.current) return;

    const lenisInstance = lenis.current;

    // Sync Lenis with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP's ticker
    const gsapTick = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add((time) => {
      gsapTick(time);
    });

    return () => {
      gsap.ticker.remove(gsapTick);
    };
  }, [lenis]);
}
