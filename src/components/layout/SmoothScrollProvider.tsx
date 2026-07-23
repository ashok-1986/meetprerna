'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';
import { initMasterTicker, destroyLenis } from '@/lib/masterTicker';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * SmoothScrollProvider — owns the Lenis singleton lifecycle.
 * Disabled under prefers-reduced-motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduce) return;
    initMasterTicker();
    return () => {
      destroyLenis();
    };
  }, [reduce]);

  // Refresh ScrollTrigger when path changes and layout settles
  useEffect(() => {
    if (reduce) return;
    
    // Refresh after fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    // Refresh after all images load
    const images = document.querySelectorAll('img');
    let loaded = 0;
    
    if (images.length === 0) {
      ScrollTrigger.refresh();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loaded++;
          if (loaded === images.length) ScrollTrigger.refresh();
        } else {
          img.addEventListener('load', () => {
            loaded++;
            if (loaded === images.length) ScrollTrigger.refresh();
          });
        }
      });
    }

    // Fallback refresh
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000);
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname, reduce]);

  return <>{children}</>;
}
