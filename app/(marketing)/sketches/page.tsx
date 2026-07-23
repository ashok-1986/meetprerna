import { sanityClient } from '@/lib/sanity/client';
import { portfolioItemsByKindQuery } from '@/lib/sanity/queries';
import { STATIC_FALLBACK_SKETCHES } from '@/lib/sanity/fallbackData';
import SketchesClient from './SketchesClient';

export default async function SketchesPage() {
  const items = await sanityClient.fetch(
    portfolioItemsByKindQuery,
    { kind: 'sketch' },
    { next: { tags: ['portfolio'] } }
  ).catch(() => STATIC_FALLBACK_SKETCHES);

  return <SketchesClient items={items} />;
}
