import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // SPECIFIC redirects FIRST (before general trailing slash)
      // Both legacy paths go straight to /enquiry — /consultation used
      // to chain through /consulting, updated here to avoid the extra hop.
      { source: '/consultation', destination: '/enquiry', permanent: true },
      { source: '/consulting', destination: '/enquiry', permanent: true },
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
      source: '/enquiry',
      headers: [
        {
          key: 'Content-Security-Policy',
          // Bug found and fixed while testing /schedule: the previous value
          // (copied from the old /consulting header) only allowed
          // server.fillout.com, but Fillout's actual iframe embed loads
          // from embed.fillout.com — the form was being silently blocked.
          // Also allowlists va.vercel-scripts.com so Vercel Analytics isn't
          // blocked on these two pages the way it was before (every other
          // route has no CSP override and loads it fine).
          value:
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' server.fillout.com embed.fillout.com va.vercel-scripts.com; frame-src server.fillout.com embed.fillout.com; connect-src 'self' server.fillout.com embed.fillout.com us.i.posthog.com;",
        },
      ],
    },
    {
      // Also embeds Fillout — same CSP allowance as /enquiry.
      source: '/schedule',
      headers: [
        {
          key: 'Content-Security-Policy',
          // Bug found and fixed while testing /schedule: the previous value
          // (copied from the old /consulting header) only allowed
          // server.fillout.com, but Fillout's actual iframe embed loads
          // from embed.fillout.com — the form was being silently blocked.
          // Also allowlists va.vercel-scripts.com so Vercel Analytics isn't
          // blocked on these two pages the way it was before (every other
          // route has no CSP override and loads it fine).
          value:
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' server.fillout.com embed.fillout.com va.vercel-scripts.com; frame-src server.fillout.com embed.fillout.com; connect-src 'self' server.fillout.com embed.fillout.com us.i.posthog.com;",
        },
      ],
    },
  ],
}

export default withBundleAnalyzer(nextConfig)