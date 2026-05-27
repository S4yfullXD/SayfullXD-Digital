/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'www.gutenberg.org' },
      { protocol: 'https', hostname: 'gutenberg.org' },
      { protocol: 'http', hostname: 'gutenberg.org' },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/cron/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },
}

module.exports = nextConfig
