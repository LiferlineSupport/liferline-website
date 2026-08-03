/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/mogami-vs-canare-patch-cables',
        destination: '/blog/mogami-guitar-cables-explained',
        permanent: true,
      },
      {
        source: '/blog/canare-vs-mogami-guitar-cable',
        destination: '/blog/mogami-guitar-cables-explained',
        permanent: true,
      },
      {
        source: '/blog/mogami-vs-canare-guitar-cables',
        destination: '/blog/mogami-guitar-cables-explained',
        permanent: true,
      },
      {
        source: '/blog/george-ls-vs-lava-cable',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/products/the-right-angle',
        destination: '/products',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Security headers for HTML pages only
        source: '/:path((?!_next|api).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache headers for static assets (_next directory)
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // HTML pages: short cache to prevent stale JS chunk references after deployments.
        // Next.js JS chunks use content-hashed filenames (immutable), but HTML pages
        // reference those hashes — if HTML is cached too long, users get stale HTML
        // pointing to non-existent chunk filenames → "We hit a snag" error.
        // Excludes /_next/static so it doesn't override the immutable rule above:
        // this source previously matched /_next/static/* too, and being the later
        // rule in this array, its s-maxage=60 was winning over the immutable header.
        source: '/:path((?!_next/static).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, must-revalidate' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
