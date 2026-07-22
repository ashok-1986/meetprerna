import { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/tattoos',
    '/paintings',
    '/sketches',
    '/studio',
    '/about',
    '/process',
    '/contact',
    '/book',
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In Phase 5 (Sanity), we would fetch all portfolio items and append them here.

  return routes;
}
