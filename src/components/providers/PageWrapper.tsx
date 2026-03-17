'use client';

import { ReactNode, useState } from 'react';
import { Loader } from '@/components/layout/Loader';

/**
 * Page Wrapper Component
 * Handles page-level loading state and wraps content
 */
export function PageWrapper({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      {!isLoading && children}
    </>
  );
}
