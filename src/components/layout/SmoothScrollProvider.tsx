'use client';

import { useEffect } from 'react';
import { getLenis, destroyLenis } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * SmoothScrollProvider — owns the Lenis singleton lifecycle.
 * Disabled under prefers-reduced-motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    getLenis();
    return () => {
      destroyLenis();
    };
  }, [reduce]);

  return <>{children}</>;
}
