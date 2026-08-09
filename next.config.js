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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
