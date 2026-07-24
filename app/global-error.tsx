'use client';

import Link from 'next/link';
import { site } from '@/config/site';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang={site.locale}>
      <head>
        <title>Something went wrong — {site.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.className = 'bg-ink text-ivory antialiased';
              document.body.style.cssText = 'margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1.5rem;font-family:system-ui,sans-serif;';
            `,
          }}
        />
      </head>
      <body>
        <div style={{ textAlign: 'center', maxWidth: '32rem', padding: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem', color: 'rgb(var(--color-ivory))' }}>
            Something went wrong.
          </h1>
          <p style={{ color: 'rgb(var(--color-ivory-dim))', marginBottom: '2rem', lineHeight: 1.6 }}>
            We encountered an unexpected error loading the page. Our team has been notified.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                background: 'rgb(var(--color-inchworm))',
                color: 'rgb(var(--color-ink))',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                background: 'transparent',
                color: 'rgb(var(--color-ivory-dim))',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 500,
                border: '1px solid rgb(var(--color-ink-50))',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Go home
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '2rem', textAlign: 'left', color: 'rgb(var(--color-ivory-dim))', fontSize: '0.875rem' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>Error details (development)</summary>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {error.message}
                {error.digest && <span> [{error.digest}]</span>}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  );
}