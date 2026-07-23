'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { registerR3FRender, unregisterR3FRender } from '@/lib/masterTicker';

export function R3FRenderBridge() {
  const { advance } = useThree();

  useEffect(() => {
    // advance() = R3F renders one frame
    const render = () => advance(Date.now() / 1000);
    registerR3FRender(render);

    return () => unregisterR3FRender(render);
  }, [advance]);

  return null;
}
