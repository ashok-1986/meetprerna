import { sanityClient } from '@/lib/sanity/client';
import { processVideosQuery } from '@/lib/sanity/queries';
import ProcessClient from './ProcessClient';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return buildMetadata({ title: 'Process', path: '/process' });
}

export default async function ProcessPage() {
  const videos = await sanityClient.fetch(
    processVideosQuery,
    {},
    { next: { tags: ['process'] } }
  );
  return <ProcessClient videos={videos || []} />;
}
