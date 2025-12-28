/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fa'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  // Performance optimizations
  productionBrowserSourceMaps: false,
  swcMinify: true,
  poweredByHeader: false,
  // Configure page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Enable gzip compression
  compress: true,
  // Environment variables exposed to the client
  env: {
    NEXT_PUBLIC_ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    NEXT_PUBLIC_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  // Static file serving for storage
  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: '/api/storage/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 





