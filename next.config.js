/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, must-revalidate' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
