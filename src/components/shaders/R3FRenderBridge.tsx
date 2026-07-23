'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from '@/lib/gsap';

export function R3FRenderBridge() {
  const shouldRender = useRef(false);

  useEffect(() => {
    const trigger = () => { shouldRender.current = true; };
    gsap.ticker.add(trigger);
    return () => gsap.ticker.remove(trigger);
  }, []);

  useFrame(() => {
    if (!shouldRender.current) return;
    shouldRender.current = false;
  }, 1);

  return null;
}
