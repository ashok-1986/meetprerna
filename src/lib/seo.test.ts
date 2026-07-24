import { describe, it, expect } from 'vitest';
import { buildMetadata, buildPersonJsonLd, buildLocalBusinessJsonLd } from './seo';

// Regression tests for the fix that replaced the dead /og/default-1200x630.png
// reference (public/og/ was empty — a real 404) with /opengraph-image, the
// working Next.js file-convention route in app/opengraph-image.tsx.

describe('buildMetadata', () => {
  it('defaults openGraph and twitter images to the real /opengraph-image route, not the dead static path', () => {
    const metadata = buildMetadata();

    const ogImages = metadata.openGraph?.images;
    expect(Array.isArray(ogImages)).toBe(true);
    const firstOg = (ogImages as { url: string }[])[0];
    expect(firstOg.url).toContain('/opengraph-image');
    expect(firstOg.url).not.toContain('default-1200x630.png');

    const twitterImages = metadata.twitter?.images as string[];
    expect(twitterImages[0]).toContain('/opengraph-image');
  });

  it('uses caller-supplied images instead of the default when provided', () => {
    const metadata = buildMetadata({
      images: [{ url: '/custom-og.png', width: 1200, height: 630, alt: 'Custom' }],
    });
    const ogImages = metadata.openGraph?.images as { url: string }[];
    expect(ogImages[0].url).toBe('/custom-og.png');
  });
});

describe('buildPersonJsonLd / buildLocalBusinessJsonLd', () => {
  it('points JSON-LD image/logo fields at /opengraph-image, not the dead static path', () => {
    const person = buildPersonJsonLd();
    expect(person.image).toContain('/opengraph-image');
    expect(person.image).not.toContain('default-1200x630.png');

    const business = buildLocalBusinessJsonLd();
    expect(business.logo).toContain('/opengraph-image');
    expect(business.image).toContain('/opengraph-image');
  });
});
