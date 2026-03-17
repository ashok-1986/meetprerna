'use client';

import { ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';

/**
 * Lenis Provider Component
 * Wraps children with smooth scrolling functionality
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useLenis();

  return <>{children}</>;
}
