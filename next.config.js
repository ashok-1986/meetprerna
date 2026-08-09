/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
  async redirects() {
    return [
      {
        source: '/consulting',
        destination: '/connect',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Uncomment and configure when migrating to Cloudflare R2 or other external buckets:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.meetprerna.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;
