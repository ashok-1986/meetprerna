/**
 * Next.js configuration for MeetPrerna.
 *
 * Design priorities (in order):
 *   1. Visual fidelity — preserve every animation and shader.
 *   2. Performance — code-split, prefetch critical, lazy-load heavy scenes.
 *   3. SEO & social — first-class metadata, OG, sitemap, RSS.
 *   4. Accessibility — semantic HTML, focus management, no autoplay surprises.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/drei'],
    scrollRestoration: true,
  },
  webpack: (config, { dev, isServer }) => {
    // GLSL shader support — use asset/source for ?raw imports
    // (e.g., import frag from '@/shaders/inkField.frag?raw')
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    if (!dev && !isServer) {
      // Aggressive code-splitting hint: keep heavy animation libs in their own chunks.
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...(config.optimization.splitChunks?.cacheGroups ?? {}),
          gsap: {
            test: /[\\/]node_modules[\\/](gsap|gsap-trial)[\\/]/,
            name: 'gsap',
            chunks: 'all',
            priority: 30,
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'async',
            priority: 25,
          },
          lenis: {
            test: /[\\/]node_modules[\\/]lenis[\\/]/,
            name: 'lenis',
            chunks: 'all',
            priority: 20,
          },
        },
      };
    }
    return config;
  },
  async headers() {
    // Pragmatic CSP baseline. Not maximally strict — over-restricting risks
    // breaking things that can't be verified without a live deploy.
    //
    // frame-src/child-src allowlist embed.fillout.com (the /book and /contact
    // pages embed a Fillout form via https://server.fillout.com/embed/v1/,
    // which injects an https://embed.fillout.com iframe) and
    // player.vimeo.com (VideoEmbed component). frame-ancestors is 'self',
    // consistent with X-Frame-Options: SAMEORIGIN below — NOT 'none', which
    // would (and, per a live report-only-policy audit, does — see note in
    // next.config.mjs history / PR description) block the Fillout embed by
    // conflating "who can frame us" with "what we're allowed to frame".
    const cspDirectives = [
      "default-src 'self'",
      "frame-src 'self' https://embed.fillout.com https://player.vimeo.com",
      "child-src 'self' https://embed.fillout.com https://player.vimeo.com",
      "frame-ancestors 'self'",
      "script-src 'self' 'unsafe-inline' https://server.fillout.com https://plausible.io",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.sanity.io https://images.unsplash.com https://i.vimeocdn.com",
      "font-src 'self' data:",
      "connect-src 'self' https://*.sanity.io https://plausible.io https://app.posthog.com",
    ];

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: cspDirectives.join('; ') },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/tattoo', destination: '/tattoos', permanent: true },
      { source: '/art', destination: '/paintings', permanent: true },
    ];
  },
};

const withBundleAnalyzer = (await import('next-bundle-analyzer')).default({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
