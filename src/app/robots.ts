import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/consulting?source=sketchbook*'],
    },
    sitemap: 'https://meetprerna.com/sitemap.xml',
  }
}