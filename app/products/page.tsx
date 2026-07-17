import type { Metadata } from 'next'
import Link from 'next/link'
import { products, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'All Cables | Forever Cables by Hatch Patch Cables',
  description:
    'Browse the complete Forever Cables lineup: boutique guitar patch cables and instrument cables hand-soldered in the USA with Mogami wire and Neutrik connectors. Every cable guaranteed for life.',
  keywords: [
    'buy guitar patch cables',
    'boutique patch cables',
    'best pedalboard cables',
    'handmade guitar cables',
    'Mogami patch cables',
    'Neutrik guitar cables',
    'lifetime guarantee cables',
    'american made guitar cables',
  ],
  alternates: {
    canonical: 'https://liferline.com/products',
  },
  openGraph: {
    title: 'All Cables | Forever Cables',
    description:
      'Hand-soldered guitar patch cables and instrument cables. Mogami wire, Neutrik connectors, lifetime guarantee.',
    url: 'https://liferline.com/products',
    type: 'website',
  },
}

function ProductListJsonLd() {
  const items = products.map((p, i) => {
    const variantPrices = p.variants
      .map((v) => v.price)
      .filter((pr): pr is number => pr != null)
    const hasRange =
      variantPrices.length > 1 &&
      Math.min(...variantPrices) !== Math.max(...variantPrices)

    const offers = hasRange
      ? {
          '@type': 'AggregateOffer',
          lowPrice: (Math.min(...variantPrices) / 100).toFixed(2),
          highPrice: (Math.max(...variantPrices) / 100).toFixed(2),
          priceCurrency: 'USD',
          offerCount: variantPrices.length,
          availability: 'https://schema.org/InStock',
          url: `https://liferline.com/products/${p.slug}`,
          seller: { '@type': 'Organization', name: 'Hatch Patch Cables' },
        }
      : {
          '@type': 'Offer',
          price: (p.price / 100).toFixed(2),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
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
        name: 'All Cables',
        item: 'https://liferline.com/products',
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

export default function ProductsPage() {
  return (
    <>
      <ProductListJsonLd />
      <BreadcrumbJsonLd />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-cream">All Cables</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-4">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Forever Cables
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          All Cables
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Every cable in the Forever Cables lineup is hand-soldered in the USA
          with Mogami wire and Neutrik connectors. Pick your length, pick your
          connector, and never buy another cable again.
        </p>
      </section>

      {/* Product grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
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
      </section>

      {/* Trust bar */}
      <section className="border-t border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🔨', label: 'Hand-Soldered', sub: 'One at a time, by hand' },
              { icon: '🇺🇸', label: 'American-Made', sub: 'Built in the USA' },
              { icon: '♾️', label: 'Lifetime Guarantee', sub: 'We stand behind every cable' },
              { icon: '📦', label: 'Free Shipping', sub: 'On every order, every time' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-sm font-semibold text-cream tracking-wide">
                  {item.label}
                </span>
                <span className="text-xs text-muted">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom cables CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-serif text-3xl text-cream mb-4">
          Need something custom?
        </h2>
        <p className="text-muted mb-8 max-w-lg mx-auto">
          We build to spec. Custom lengths, connector combinations, and bulk
          orders are all available. Tell us what you need.
        </p>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </section>
    </>
  )
}
