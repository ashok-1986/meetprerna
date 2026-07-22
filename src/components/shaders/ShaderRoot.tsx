'use client';

import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const InkField = dynamic(
  () => import('./InkField').then((m) => m.InkField),
  { ssr: false },
);
const Grain = dynamic(
  () => import('./Grain').then((m) => m.Grain),
  { ssr: false },
);

export function ShaderRoot() {
  const reduce = usePrefersReducedMotion();
  if (reduce) return null;
  return (
    <>
      <InkField />
      <Grain />
    </>
  );
}
