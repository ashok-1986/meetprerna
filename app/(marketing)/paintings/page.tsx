import { sanityClient } from '@/lib/sanity/client';
import { portfolioItemsByKindQuery } from '@/lib/sanity/queries';
import { STATIC_FALLBACK_PAINTINGS } from '@/lib/sanity/fallbackData';
import PaintingsClient from './PaintingsClient';

export const revalidate = 60;

export default async function PaintingsPage() {
  const items = await sanityClient.fetch(portfolioItemsByKindQuery, { kind: 'painting' }).catch(() => STATIC_FALLBACK_PAINTINGS);

  return <PaintingsClient items={items} />;
}
