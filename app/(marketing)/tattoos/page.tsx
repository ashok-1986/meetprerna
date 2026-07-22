import { sanityClient } from '@/lib/sanity/client';
import { portfolioItemsByKindQuery } from '@/lib/sanity/queries';
import { STATIC_FALLBACK_TATTOOS } from '@/lib/sanity/fallbackData';
import TattoosClient from './TattoosClient';

export const revalidate = 60;

export default async function TattoosPage() {
  const items = await sanityClient.fetch(portfolioItemsByKindQuery, { kind: 'tattoo' }).catch(() => STATIC_FALLBACK_TATTOOS);

  return <TattoosClient items={items} />;
}
