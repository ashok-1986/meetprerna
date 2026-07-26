import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // SPECIFIC redirects FIRST (before general trailing slash)
      { source: '/consultation', destination: '/consulting', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/about/', destination: '/about', permanent: true },
      { source: '/portfolio/', destination: '/portfolio', permanent: true },
      { source: '/wp-content/uploads/:path*', destination: '/portfolio', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'p' }], destination: '/', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'page_id' }], destination: '/', permanent: true },
      // General trailing slash canonicalization LAST
      { source: '/:path+/', destination: '/:path+', permanent: true },
    ]
  },
  headers: async () => [
    {
      source: '/consulting',
      headers: [
        {
          key: 'Content-Security-Policy',
          value:
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' server.fillout.com; frame-src server.fillout.com; connect-src 'self' server.fillout.com us.i.posthog.com;",
        },
      ],
    },
  ],
}

export default withBundleAnalyzer(nextConfig)