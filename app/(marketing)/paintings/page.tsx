import { sanityClient } from '@/lib/sanity/client';
import { portfolioItemsByKindQuery } from '@/lib/sanity/queries';
import { STATIC_FALLBACK_PAINTINGS } from '@/lib/sanity/fallbackData';
import PaintingsClient from './PaintingsClient';

export default async function PaintingsPage() {
  const items = await sanityClient.fetch(
    portfolioItemsByKindQuery,
    { kind: 'painting' },
    { next: { tags: ['portfolio'] } }
  ).catch(() => STATIC_FALLBACK_PAINTINGS);

  return <PaintingsClient items={items} />;
}
