/**
 * SEO metadata builders.
 * Reference: docs/PRD.md §7.2, docs/content.md §14.
 */
import type { Metadata } from 'next';
import { site } from '@/config/site';

export interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  images?: { url: string; width: number; height: number; alt: string }[];
  noIndex?: boolean;
  noFollow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export function buildMetadata(opts: MetadataOptions = {}): Metadata {
  const url = `${site.url}${opts.path || ''}`;
  const title = opts.title ? `${opts.title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const description = opts.description || site.description;
  const images = opts.images?.length
    ? opts.images
    : [{ url: '/og/default-1200x630.png', width: 1200, height: 630, alt: site.name }];

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    applicationName: site.name,
    authors: opts.authors?.map((name) => ({ name })) || [{ name: 'Prerna' }],
    creator: 'Prerna',
    publisher: 'MeetPrerna Studio',
    formatDetection: { telephone: false, address: false, email: false },
    openGraph: {
      type: 'website',
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description,
      images: images.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((img) => img.url),
    },
    robots: {
      index: !opts.noIndex,
      follow: !opts.noFollow,
      googleBot: {
        index: !opts.noIndex,
        follow: !opts.noFollow,
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:published_time': opts.publishedTime || '',
      'article:modified_time': opts.modifiedTime || '',
      'article:author': opts.authors?.join(',') || 'Prerna',
      'article:section': opts.section || '',
      'article:tag': opts.tags?.join(',') || '',
    },
  };
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prerna',
    url: site.url,
    image: `${site.url}/og/default-1200x630.png`,
    sameAs: [site.social.instagram, site.social.arena],
    jobTitle: 'Tattoo Artist, Painter, Sketch Artist',
    worksFor: {
      '@type': 'Organization',
      name: 'MeetPrerna Studio',
      url: site.url,
    },
    knowsAbout: ['Tattooing', 'Abstract Painting', 'Sketching', 'Line Work', 'Blackwork', 'Fine Line'],
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'TattooParlor'],
    name: site.name,
    url: site.url,
    logo: `${site.url}/og/default-1200x630.png`,
    image: `${site.url}/og/default-1200x630.png`,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line1,
      addressLocality: 'Navi Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400703',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.076,
      longitude: 72.997,
    },
    telephone: site.phone,
    email: site.email,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:00',
        closes: '19:00',
      },
    ],
    priceRange: '$$$',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Card, UPI',
    areaServed: 'Navi Mumbai, Mumbai, Maharashtra, India',
    sameAs: [site.social.instagram, site.social.arena],
  };
}