import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin', '/success', '/cancel'],
    },
    sitemap: 'https://liferline.com/sitemap.xml',
  }
}
