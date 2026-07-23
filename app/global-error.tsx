'use client';

import { useEffect } from 'react';

// This boundary is intentionally self-contained: it must render even when
// something in the root layout itself (fonts, ShaderRoot, providers) is what
// threw. No shared components, no next/font, no next/link — just inline
// styles matching the site's dark-ink/ivory palette, and a plain <button>
// since routing may not be safe to assume works.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root Layout Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
          backgroundColor: '#1A1A1A',
          color: '#FDFFE9',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 500,
            margin: '0 0 16px',
          }}
        >
          Something went wrong.
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: '#C9CBB6',
            maxWidth: '28rem',
            margin: '0 0 32px',
            lineHeight: 1.6,
          }}
        >
          We encountered an unexpected error while loading this page. Please try again.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: '12px 28px',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: '#1A1A1A',
            backgroundColor: '#FDFFE9',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
