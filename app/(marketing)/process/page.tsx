import { sanityClient } from '@/lib/sanity/client';
import { processVideosQuery } from '@/lib/sanity/queries';
import ProcessClient from './ProcessClient';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return buildMetadata({ title: 'Process', path: '/process' });
}

export const revalidate = 3600; // revalidate every hour

export default async function ProcessPage() {
  const videos = await sanityClient.fetch(processVideosQuery);
  return <ProcessClient videos={videos || []} />;
}
