'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Marketing Route Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-24 text-center px-4">
      <h2 className="text-h2 font-display mb-4 text-ivory">Something went wrong.</h2>
      <p className="text-body text-ivory-dim mb-8 max-w-md">
        We encountered an unexpected error while loading this page. 
        Please try refreshing, or return to the homepage.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="secondary">
          Try again
        </Button>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
