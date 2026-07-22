/**
 * useDeviceTier — coarse client-side tier classifier.
 * Drives shader decisions and per-element distortion enablement.
 * Reference: docs/shaders.md §11.
 */
'use client';

import { useEffect, useState } from 'react';

export type DeviceTier = 'low' | 'mid' | 'high';

function classify(): DeviceTier {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'mid';

  const dm = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 4;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const reduceData = matchMedia?.('(prefers-reduced-data: reduce)').matches ?? false;

  if (reduceData) return 'low';
  if (isMobile && (dm !== undefined && dm < 4)) return 'low';
  if (isMobile && cores <= 4) return 'mid';
  if (dm !== undefined && dm < 2) return 'low';
  if (cores <= 2) return 'low';
  return 'high';
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('mid');

  useEffect(() => {
    setTier(classify());
  }, []);

  return tier;
}
