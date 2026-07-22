/**
 * Sanity client — read-only for frontend.
 * Reference: docs/PRD.md §6.1.
 */
import { createClient } from 'next-sanity';
import { env } from '@/lib/env';

export const sanityClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  perspective: 'published',
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
});

/**
 * Preview client for draft content (requires token).
 * Only use in preview mode or server components with valid token.
 */
export function createPreviewClient(token?: string) {
  return createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: false,
    perspective: 'previewDrafts',
    token: token || env.SANITY_API_READ_TOKEN,
    stega: {
      enabled: process.env.NODE_ENV === 'development',
      studioUrl: '/studio',
    },
  });
}

/**
 * Helper to get the appropriate client based on preview mode.
 */
export function getSanityClient(preview = false, token?: string) {
  return preview ? createPreviewClient(token) : sanityClient;
}