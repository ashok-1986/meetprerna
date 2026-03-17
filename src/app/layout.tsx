import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { Grain } from '@/components/layout/Grain';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Loader } from '@/components/layout/Loader';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { PageWrapper } from '@/components/providers/PageWrapper';
import './globals.css';

// ============================================
// FONT CONFIGURATION
// ============================================
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weights: ['400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weights: ['300', '400', '500'],
  display: 'swap',
});

// ============================================
// METADATA
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL('https://meetprerna.com'),
  title: {
    default: 'Custom Tattoo Artist in Mumbai & Navi Mumbai | Prerna',
    template: '%s | Meet Prerna',
  },
  description:
    'Meet Prerna is a female custom tattoo artist based in Navi Mumbai, specializing in story-driven, fine line, and geometric tattoo designs. By appointment only.',
  keywords: [
    'tattoo artist',
    'Navi Mumbai',
    'Mumbai',
    'custom tattoo',
    'female tattoo artist',
    'fine line tattoo',
    'geometric tattoo',
    'story-driven design',
  ],
  authors: [{ name: 'Meet Prerna' }],
  creator: 'Meet Prerna',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://meetprerna.com',
    title: 'Custom Tattoo Artist in Mumbai & Navi Mumbai | Prerna',
    description:
      'Female custom tattoo artist specializing in meaningful, story-driven designs. Based in Navi Mumbai, by appointment only.',
    siteName: 'Meet Prerna',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meet Prerna - Custom Tattoo Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Tattoo Artist in Mumbai & Navi Mumbai | Prerna',
    description:
      'Female custom tattoo artist specializing in meaningful, story-driven designs.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================
// JSON-LD SCHEMA
// ============================================
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Meet Prerna',
  description: 'Custom tattoo artist based in Navi Mumbai, specializing in story-driven designs.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Navi Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.033,
    longitude: 73.0297,
  },
  telephone: '+917738147935',
  image: 'https://meetprerna.com/assets/logo.png',
  url: 'https://meetprerna.com',
  priceRange: '₹₹',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '11:00',
    closes: '19:00',
  },
};

// ============================================
// ROOT LAYOUT
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-black text-ivory antialiased">
        <Grain />
        <CustomCursor />
        <Loader onComplete={() => {}} />
        <Nav />
        <LenisProvider>
          <PageWrapper>{children}</PageWrapper>
        </LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
