import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, getProductBySlug, formatPrice } from '@/lib/products'
import BuyButton from '@/components/BuyButton'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  const title = `${product.name} | Forever Cables by Hatch Patch Cables`
  const description = `${product.description} Hand-soldered in the USA with Mogami wire and Neutrik connectors. ${formatPrice(product.price)}. Guaranteed for life.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://liferline.com/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Forever Cables`,
      description,
      url: `https://liferline.com/products/${product.slug}`,
      type: 'website',
    },
  }
}

function BreadcrumbJsonLd({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
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
        name: 'Cables',
        item: 'https://liferline.com/#products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://liferline.com/products/${product.slug}`,
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

function ProductJsonLd({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    brand: { '@type': 'Brand', name: 'Forever Cables' },
    manufacturer: { '@type': 'Organization', name: 'Hatch Patch Cables' },
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://liferline.com/products/${product.slug}`,
      seller: { '@type': 'Organization', name: 'Hatch Patch Cables' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'd',
          },
        },
      },
    },
    hasWarranty: {
      '@type': 'WarrantyPromise',
      warrantyScope: 'https://schema.org/FullLifetimeWarranty',
      description: 'No-questions-asked lifetime guarantee. If it fails, we replace it.',
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: 'United States',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd product={product} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/#products" className="hover:text-cream transition-colors">Cables</Link>
          </li>
          <li>/</li>
          <li className="text-cream">{product.name}</li>
        </ol>
      </nav>

      {/* Product detail */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image placeholder */}
          <div className="aspect-square bg-card border border-border flex items-center justify-center">
            <svg
              className="w-32 h-32 text-border"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.75}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {product.badge && (
              <span className="inline-block bg-accent text-bg text-xs font-bold tracking-wider uppercase px-2 py-1 mb-4 self-start">
                {product.badge}
              </span>
            )}

            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-2 font-semibold">
              Forever Cables
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mb-2">
              {product.name}
            </h1>
            <p className="text-sm tracking-[0.12em] uppercase text-muted mb-6">
              {product.tagline}
            </p>

            <p className="text-muted leading-relaxed mb-8">
              {product.longDescription}
            </p>

            {/* Specs */}
            <div className="border border-border p-6 mb-8 bg-card">
              <h2 className="text-xs tracking-[0.15em] uppercase text-cream font-semibold mb-4">
                Specifications
              </h2>
              <ul className="space-y-2">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex gap-3 text-sm text-muted">
                    <span className="text-accent mt-0.5">+</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Buy section */}
            <div className="mt-auto">
              <BuyButton product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee reminder */}
      <section className="border-t border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex items-center gap-4">
              <span className="text-3xl">♾️</span>
              <div>
                <p className="text-cream font-semibold">Lifetime Guarantee</p>
                <p className="text-sm text-muted">
                  If this cable ever fails, for any reason, we replace it. No questions asked.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">🇺🇸</span>
              <div>
                <p className="text-cream font-semibold">American-Made</p>
                <p className="text-sm text-muted">
                  Hand-soldered in the USA. Every joint, every cable, every time.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">🔨</span>
              <div>
                <p className="text-cream font-semibold">Hand-Built</p>
                <p className="text-sm text-muted">
                  One at a time, tested before it ships.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">📦</span>
              <div>
                <p className="text-cream font-semibold">Free Shipping</p>
                <p className="text-sm text-muted">
                  Every order ships free within the USA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other products */}
      {otherProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="section-heading mb-8">More Forever Cables</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="block group">
                <div className="bg-card border border-border group-hover:border-accent/30 transition-colors duration-300 p-6">
                  <h3 className="font-serif text-xl text-cream mb-1">{p.name}</h3>
                  <p className="text-xs tracking-[0.12em] uppercase text-accent mb-3">{p.tagline}</p>
                  <p className="text-sm text-muted leading-relaxed mb-4">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl text-cream">{formatPrice(p.price)}</span>
                    <span className="text-xs text-accent tracking-wide">View details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
