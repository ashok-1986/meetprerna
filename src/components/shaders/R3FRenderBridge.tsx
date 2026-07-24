'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { registerR3FRender, unregisterR3FRender } from '@/lib/masterTicker';

/**
 * Wires the R3F render loop to GSAP's master ticker. The <Canvas> is in
 * frameloop="demand" mode, so R3F does not run its own independent RAF
 * loop — it only renders when invalidate() is called. This effect
 * registers a callback with the master ticker (src/lib/masterTicker.ts)
 * that invalidates the canvas on every GSAP tick, making GSAP the single
 * clock driving Lenis, ScrollTrigger, and R3F rendering in lockstep.
 */
export function R3FRenderBridge() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const onTick = () => invalidate();
    registerR3FRender(onTick);
    return () => unregisterR3FRender(onTick);
  }, [invalidate]);

  return null;
}
