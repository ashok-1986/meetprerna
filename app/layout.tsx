import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import { site } from '@/config/site';

const ShaderRoot = dynamic(
  () => import('@/components/shaders/ShaderRoot').then(mod => mod.ShaderRoot),
  { ssr: false, loading: () => null }
);
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import '@/styles/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A1A1A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html
      lang={site.locale}
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){var c=document.documentElement.classList;var t=navigator.connection||navigator.mozConnection||navigator.webkitConnection;if(t&&(t.saveData||/2g|3g/.test(t.effectiveType))){c.add('reduce-data')}})();
            `.trim(),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: site.name,
              description: site.description,
              url: site.url,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Navi Mumbai',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN',
              },
              sameAs: [
                site.social.instagram,
              ],
            }),
          }}
        />
      </head>
      <body className="bg-ink text-ivory antialiased">
        <a href="#main" className="skip-link sr-only focus:not-sr-only">Skip to content</a>
        <ShaderRoot />
        <SmoothScrollProvider>
          <CustomCursor />
          <div>{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
