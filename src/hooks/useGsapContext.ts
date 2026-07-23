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
  fn: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(fn);
    ref.current = ctx;
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
