import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/blog-posts'
import { products, formatPrice } from '@/lib/products'
import Image from 'next/image'
import EmailSignup from '@/components/EmailSignup'

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
      authors: ['Forever Cables'],
      siteName: 'Forever Cables',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Forever Cables by Hatch Patch Cables' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: ['/twitter-image'],
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

const PRODUCT_TAG_MAP: Record<string, string[]> = {
  'patch cables': ['the-workhorse', 'the-right-angle', 'the-pedalboard-pack'],
  'pedalboard': ['the-workhorse', 'the-right-angle', 'the-pedalboard-pack'],
  'pedalboard setup': ['the-pedalboard-pack', 'the-workhorse', 'the-right-angle'],
  'pedalboard plans': ['the-pedalboard-pack', 'the-workhorse'],
  'cable management': ['the-pedalboard-pack'],
  'organization': ['the-pedalboard-pack'],
  'cable routing': ['the-pedalboard-pack', 'the-right-angle'],
  'guitar pedals': ['the-workhorse', 'the-right-angle'],
  'guitar cable': ['the-stage-cable', 'the-workhorse'],
  'guitar cables': ['the-stage-cable', 'the-workhorse'],
  'instrument cable': ['the-stage-cable'],
  'instrument cables': ['the-stage-cable'],
  'amp': ['the-stage-cable'],
  'guitar tone': ['the-stage-cable', 'the-workhorse'],
  'tone': ['the-stage-cable', 'the-workhorse'],
  'soldered cables': ['the-workhorse', 'the-right-angle', 'the-stage-cable'],
  'buying guide': ['the-workhorse', 'the-stage-cable', 'the-pedalboard-pack'],
  'cable comparison': ['the-workhorse', 'the-stage-cable'],
  'canare': ['the-workhorse', 'the-right-angle'],
  'canare gs-6': ['the-workhorse', 'the-right-angle'],
  'mogami': ['the-stage-cable'],
  'Mogami': ['the-stage-cable'],
  'mogami w2524': ['the-stage-cable'],
  'lifetime warranty': ['the-workhorse', 'the-stage-cable'],
  'guarantee': ['the-workhorse', 'the-stage-cable'],
  'cable specs': ['the-workhorse', 'the-stage-cable'],
  'signal chain': ['the-workhorse', 'the-right-angle', 'the-stage-cable'],
  'effects order': ['the-workhorse', 'the-right-angle'],
  'bass cable': ['the-stage-cable'],
  'studio gear': ['the-stage-cable'],
}

function getRecommendedProducts(tags: string[]) {
  const slugScores = new Map<string, number>()
  for (const tag of tags) {
    const mapped = PRODUCT_TAG_MAP[tag]
    if (!mapped) continue
    for (const slug of mapped) {
      slugScores.set(slug, (slugScores.get(slug) ?? 0) + 1)
    }
  }
  const sorted = Array.from(slugScores.entries()).sort((a, b) => b[1] - a[1])
  const topSlugs = sorted.slice(0, 2).map(([slug]) => slug)
  if (topSlugs.length === 0) topSlugs.push('the-workhorse', 'the-stage-cable')
  return products.filter((p) => topSlugs.includes(p.slug))
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

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

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

        <div className="mt-16 border-t border-border pt-12">
          <p className="font-serif text-2xl text-cream mb-2">Built for This</p>
          <p className="text-muted text-sm mb-8">{post.cta}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getRecommendedProducts(post.tags).map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="bg-card border border-border hover:border-accent/40 transition-colors group flex gap-4 p-4"
              >
                <div className="w-20 h-20 flex-shrink-0 bg-card-hover relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <p className="text-cream font-semibold text-sm group-hover:text-accent transition-colors">
                    {product.name}
                  </p>
                  <p className="text-xs text-accent tracking-wide uppercase mt-0.5">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    From {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/products" className="text-xs text-muted hover:text-accent transition-colors tracking-wide uppercase">
              View all Forever Cables
            </Link>
          </div>
        </div>

        <div className="mt-16 border border-border p-8 text-center">
          <p className="text-cream font-semibold mb-2">Stay in the loop</p>
          <p className="text-muted text-sm mb-6">
            New gear guides, limited promos, and launch updates. No spam.
          </p>
          <EmailSignup />
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

      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="font-serif text-xl text-cream mb-6">Related Articles</h2>
          <div className="space-y-4">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="block border border-border hover:border-accent p-5 transition-colors group"
              >
                <p className="text-sm text-cream group-hover:text-accent transition-colors leading-snug">
                  {rp.title}
                </p>
                <p className="text-xs text-muted mt-1">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

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
