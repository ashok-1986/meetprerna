/**
 * useGsapContext — React hook.
 *
 * Wraps gsap.context() so all animations created in `fn` are reverted
 * on unmount. Use this for every component that creates a timeline.
 *
 * Reference: docs/animations.md §0.
 */
'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function useGsapContext(
  callback: (context: gsap.Context) => (() => void) | void,
  deps: React.DependencyList = []
) {
  const cleanupRef = useRef<(() => void) | void>();
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      cleanupRef.current = callback(self);
    });
    ctxRef.current = ctx;
    
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctxRef;
}
