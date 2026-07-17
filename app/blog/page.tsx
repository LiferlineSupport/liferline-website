import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides and articles about guitar patch cables, pedalboard setup, cable quality, and what makes Forever Cables different. Expert advice from the people who build them by hand.',
  keywords: [
    'guitar cable blog',
    'patch cable guide',
    'pedalboard cable advice',
    'guitar cable tips',
    'forever cables blog',
  ],
  alternates: {
    canonical: 'https://liferline.com/blog',
  },
  openGraph: {
    title: 'Blog | Forever Cables by Hatch Patch Cables',
    description:
      'Guides and expert advice about guitar patch cables, pedalboard setup, and cable quality.',
    url: 'https://liferline.com/blog',
    type: 'website',
  },
}

function BreadcrumbJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://liferline.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://liferline.com/blog',
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function BlogListJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Forever Cables Blog',
    description: 'Guides and expert advice about guitar patch cables, pedalboard setup, and cable quality.',
    url: 'https://liferline.com/blog',
    hasPart: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://liferline.com/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Organization',
        name: 'Hatch Patch Cables',
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <BreadcrumbJsonLd />
      <BlogListJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-cream">Blog</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          From the Workbench
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          The Forever Cables Blog
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Guides, deep dives, and honest advice about guitar cables,
          pedalboards, and signal chain quality. Written by the people who build
          them by hand.
        </p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-border hover:border-accent p-8 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs tracking-[0.15em] uppercase text-accent font-semibold">
                {post.category}
              </span>
              <span className="text-muted text-xs">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <h2 className="font-serif text-2xl text-cream group-hover:text-accent transition-colors mb-3 leading-snug">
              {post.title}
            </h2>
            <p className="text-muted text-sm leading-relaxed">{post.excerpt}</p>
            <span className="inline-block mt-4 text-xs tracking-wide uppercase text-accent font-semibold">
              Read More
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-12 flex flex-col sm:flex-row gap-6">
        <Link href="/products" className="btn-primary text-center">
          Shop Cables
        </Link>
        <Link href="/contact" className="btn-ghost text-center">
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
