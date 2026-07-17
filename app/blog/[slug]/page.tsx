import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/blog-posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `https://liferline.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://liferline.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Hatch Patch Cables'],
      siteName: 'Hatch Patch Cables',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  }
}

function BlogPostJsonLd({ post }: { post: NonNullable<ReturnType<typeof getBlogPost>> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    url: `https://liferline.com/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Hatch Patch Cables',
      url: 'https://liferline.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hatch Patch Cables',
      url: 'https://liferline.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://liferline.com/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function BreadcrumbJsonLd({ post }: { post: NonNullable<ReturnType<typeof getBlogPost>> }) {
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://liferline.com/blog/${post.slug}`,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <BlogPostJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-cream transition-colors">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-cream truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      <article>
        <header className="mb-12">
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
          <h1 className="font-serif text-4xl sm:text-5xl text-cream leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="space-y-8 text-muted leading-relaxed">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-serif text-2xl text-cream mb-4 mt-12 first:mt-0">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="bg-card border border-border p-8 mt-16">
          <p className="text-cream font-semibold mb-2">Browse Forever Cables</p>
          <p className="text-muted text-sm mb-6">{post.cta}</p>
          <Link href="/products" className="btn-primary inline-block">
            Shop the Full Line
          </Link>
        </div>

        <footer className="text-xs text-muted mt-12 pt-8 border-t border-border">
          <p>
            <em>
              Hatch Patch Cables makes hand-soldered, lifetime-guaranteed patch
              cables under the Forever Cables product line. Every cable is built
              to order.
            </em>
          </p>
        </footer>
      </article>

      {(prevPost || nextPost) && (
        <nav className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group"
            >
              <span className="text-xs text-muted uppercase tracking-wide">
                Previous
              </span>
              <p className="text-sm text-cream group-hover:text-accent transition-colors mt-1 leading-snug">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group sm:text-right"
            >
              <span className="text-xs text-muted uppercase tracking-wide">
                Next
              </span>
              <p className="text-sm text-cream group-hover:text-accent transition-colors mt-1 leading-snug">
                {nextPost.title}
              </p>
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
