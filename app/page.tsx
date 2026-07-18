import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/lib/products'
import { blogPosts } from '@/lib/blog-posts'
import ProductCard from '@/components/ProductCard'
import EmailSignup from '@/components/EmailSignup'

export const metadata: Metadata = {
  title: { absolute: 'Forever Cables | Hand-Built Boutique Guitar Patch Cables | Liferline' },
  description:
    'Boutique guitar patch cables and instrument cables hand-soldered in the USA with Canare and Mogami wire and Neutrik connectors. Every cable backed by a lifetime guarantee. Buy once, keep forever.',
  alternates: {
    canonical: 'https://liferline.com',
  },
}

function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Forever Cables by Hatch Patch Cables',
    url: 'https://liferline.com',
    description:
      'Boutique guitar patch cables and instrument cables hand-soldered in the USA with Canare and Mogami wire and Neutrik connectors. Guaranteed for life.',
    publisher: {
      '@type': 'Organization',
      name: 'Hatch Patch Cables',
      url: 'https://liferline.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://liferline.com/icon.svg',
      },
      brand: {
        '@type': 'Brand',
        name: 'Forever Cables',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@liferline.com',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function ProductListJsonLd() {
  const items = products.map((p, i) => {
    const variantPrices = p.variants
      .map((v) => v.price)
      .filter((pr): pr is number => pr != null)
    const hasRange = variantPrices.length > 1 &&
      Math.min(...variantPrices) !== Math.max(...variantPrices)

    const offers = hasRange
      ? {
          '@type': 'AggregateOffer',
          lowPrice: (Math.min(...variantPrices) / 100).toFixed(2),
          highPrice: (Math.max(...variantPrices) / 100).toFixed(2),
          priceCurrency: 'USD',
          offerCount: variantPrices.length,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: `https://liferline.com/products/${p.slug}`,
          seller: { '@type': 'Organization', name: 'Hatch Patch Cables' },
        }
      : {
          '@type': 'Offer',
          price: (p.price / 100).toFixed(2),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: `https://liferline.com/products/${p.slug}`,
          seller: { '@type': 'Organization', name: 'Hatch Patch Cables' },
        }

    return {
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: `https://liferline.com${p.image}`,
        brand: { '@type': 'Brand', name: 'Forever Cables' },
        manufacturer: { '@type': 'Organization', name: 'Hatch Patch Cables' },
        offers,
      },
    }
  })
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Forever Cables',
    numberOfItems: products.length,
    itemListElement: items,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function Home() {
  return (
    <>
      <WebSiteJsonLd />
      <ProductListJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-semibold">
              Forever Cables by Hatch Patch Cables
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.05] mb-8">
              Built to last.{' '}
              <span className="text-accent">Guaranteed</span>{' '}
              forever.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl">
              Every cable is hand-soldered in the USA using premium components. No shortcuts.
              No outsourcing. And if it ever fails, for any reason, we replace it. No questions asked.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#products" className="btn-primary text-center">
                Shop Cables
              </Link>
              <Link href="/about" className="btn-ghost text-center">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🔨', label: 'Hand-Soldered', sub: 'One at a time, by hand' },
              { icon: '🇺🇸', label: 'American-Made', sub: 'Built in the USA' },
              { icon: '♾️', label: 'Lifetime Guarantee', sub: 'We stand behind every cable' },
              { icon: '📦', label: 'Free US Shipping', sub: 'On every order, every time' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-sm font-semibold text-cream tracking-wide">{item.label}</span>
                <span className="text-xs text-muted">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="mb-12">
          <h2 className="section-heading">Forever Cables</h2>
          <p className="section-subheading">
            Premium guitar patch cables and instrument cables built to spec with Canare and Mogami wire
            and Neutrik connectors. Every one guaranteed for life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <Link
                href={`/products/${product.slug}`}
                className="absolute top-4 left-4 z-10 text-xs text-muted hover:text-accent tracking-wide transition-colors"
              >
                View details
              </Link>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-10">
          Need something custom? <Link href="/contact" className="text-accent hover:underline">Contact us</Link>, we build to spec.
        </p>
      </section>

      {/* Guarantee section */}
      <section className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">
                Our Promise
              </p>
              <h2 className="font-serif text-4xl text-cream mb-6 leading-tight">
                If it ever fails,<br />we fix it. Full stop.
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                We don't put expiration dates on our guarantees because we don't put limits
                on our craftsmanship. Every cable is built to last decades, and if one
                doesn't, that's on us.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Email us, describe what happened, and we'll ship you a replacement before
                you even send the old one back. That's the Forever Cables standard.
              </p>
              <Link href="/guarantee" className="btn-ghost inline-block">
                Read the Guarantee
              </Link>
            </div>
            <div className="border border-border p-8 bg-bg">
              <div className="space-y-6">
                {[
                  {
                    title: 'It broke',
                    body: 'Email us. We ship a replacement immediately.',
                  },
                  {
                    title: 'It crackles',
                    body: "Bad solder joint, our fault. New cable on the way.",
                  },
                  {
                    title: "It's just old",
                    body: "Doesn't matter. The guarantee doesn't expire.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    <div>
                      <p className="text-cream font-medium mb-1">{item.title}</p>
                      <p className="text-muted text-sm">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-8 pt-6">
                <Link
                  href="/guarantee"
                  className="text-accent text-sm hover:underline tracking-wide"
                >
                  Read the full guarantee →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">
              From the Workbench
            </p>
            <h2 className="font-serif text-4xl text-cream mb-4">
              Guides and gear knowledge
            </h2>
            <p className="text-muted max-w-lg text-sm">
              Honest advice about guitar cables, pedalboard setup, and signal
              chain quality. Written by the people who build them by hand.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-border hover:border-accent p-6 transition-colors group"
              >
                <span className="text-xs tracking-[0.15em] uppercase text-accent font-semibold">
                  {post.category}
                </span>
                <h3 className="font-serif text-lg text-cream group-hover:text-accent transition-colors mt-3 mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="btn-ghost inline-block">
              Read All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">
            Stay in the Loop
          </p>
          <h2 className="font-serif text-3xl text-cream mb-3">
            New cables, limited drops, and promos.
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto text-sm">
            Join the list. No spam, just cables.
          </p>
          <EmailSignup />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-serif text-4xl text-cream mb-4">
          Ready to upgrade your rig?
        </h2>
        <p className="text-muted mb-10 max-w-lg mx-auto">
          Stop replacing cheap cables. Buy once, keep forever.
        </p>
        <Link href="#products" className="btn-primary">
          Shop All Cables
        </Link>
      </section>
    </>
  )
}
