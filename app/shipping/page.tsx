import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shipping Policy | Forever Cables',
  description:
    'Free shipping on all US orders. Forever Cables are handmade to order and ship within 3 to 5 business days. Tracked shipping via USPS.',
  keywords: [
    'forever cables shipping',
    'guitar cable shipping',
    'free shipping guitar cables',
    'forever cables delivery',
    'patch cable shipping time',
  ],
  alternates: {
    canonical: 'https://liferline.com/shipping',
  },
  openGraph: {
    title: 'Shipping Policy | Forever Cables',
    description:
      'Free shipping on all US orders. Handmade to order, shipped within 3 to 5 business days.',
    url: 'https://liferline.com/shipping',
    type: 'website',
  },
}

const shippingFaq = [
  {
    q: 'How much does shipping cost?',
    a: 'Nothing. Every US order ships free, no minimum purchase required.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Most orders arrive within 3 to 7 business days. Because each cable is built by hand, please allow 1 to 3 business days for us to make your cable before it ships.',
  },
  {
    q: 'Will I get a tracking number?',
    a: 'Yes. You will receive a shipping confirmation email with a USPS tracking number as soon as your cable ships.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Not yet. We currently ship within the United States only. We plan to add international shipping in the future.',
  },
  {
    q: 'What if my package is lost or damaged?',
    a: 'Email support@liferline.com with your order number. We will work with the carrier and, if needed, ship a replacement at no cost to you.',
  },
  {
    q: 'Can I change my shipping address after ordering?',
    a: 'If your cable has not shipped yet, email support@liferline.com and we will update your address. Once a package is in transit, we cannot redirect it.',
  },
]

function ShippingFaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: shippingFaq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
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
        name: 'Shipping Policy',
        item: 'https://liferline.com/shipping',
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

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <ShippingFaqJsonLd />
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-cream">Shipping Policy</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Our Policy
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          Shipping
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Every US order ships free. Your cable is built by hand, tested on the
          bench, and shipped with tracking.
        </p>
      </div>

      <div className="space-y-16">
        {/* Free Shipping */}
        <section>
          <h2 className="font-serif text-3xl text-cream mb-6">
            Free Shipping on Every Order
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              All orders within the United States ship free. No minimum purchase,
              no promo code, no catches. The price you see is the price you pay.
            </p>
          </div>
        </section>

        {/* Built to Order */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Built to Order
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Every Forever Cable is handmade after you place your order. We do
              not keep pre-built inventory sitting on shelves. Your cable is cut,
              soldered, and tested specifically for you.
            </p>
            <p>
              Because of this, please allow 1 to 3 business days for production
              before your cable ships. Most orders ship within 2 business days.
            </p>
          </div>
        </section>

        {/* Delivery Timeline */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Delivery Timeline
          </h2>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Order placed',
                body: 'You place your order. We start building your cable the same day or next business day.',
              },
              {
                step: '2',
                title: 'Cable built and tested',
                body: 'Your cable is hand-soldered, tested for signal and continuity, and packaged. This takes 1 to 3 business days.',
              },
              {
                step: '3',
                title: 'Shipped with tracking',
                body: 'Your cable ships via USPS with a tracking number emailed to you. Delivery takes 3 to 5 business days from shipment.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-10 h-10 bg-accent text-bg font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-card border border-border p-6">
            <p className="text-muted text-sm leading-relaxed">
              <strong className="text-cream">Total time from order to delivery:</strong>{' '}
              approximately 4 to 8 business days, depending on your location.
            </p>
          </div>
        </section>

        {/* Tracking */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Order Tracking
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Every order ships with USPS tracking. You will receive a
              confirmation email with your tracking number as soon as your cable
              is picked up by the carrier.
            </p>
            <p>
              If you have not received a tracking email within 4 business days
              of your order, check your spam folder first, then email{' '}
              <a
                href="mailto:support@liferline.com"
                className="text-accent hover:underline"
              >
                support@liferline.com
              </a>{' '}
              and we will get you sorted.
            </p>
          </div>
        </section>

        {/* Lost or Damaged */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Lost or Damaged Packages
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              If your package shows as delivered but you did not receive it, or
              if it arrives damaged, email{' '}
              <a
                href="mailto:support@liferline.com"
                className="text-accent hover:underline"
              >
                support@liferline.com
              </a>{' '}
              with your order number. We will work with USPS to locate the
              package.
            </p>
            <p>
              If the package cannot be found or was damaged in transit, we will
              ship a replacement at no cost to you.
            </p>
          </div>
        </section>

        {/* International */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            International Shipping
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We currently ship within the United States only. International
              shipping is on our roadmap, and we will update this page when it
              becomes available.
            </p>
            <p>
              If you are outside the US and want a Forever Cable, email{' '}
              <a
                href="mailto:support@liferline.com"
                className="text-accent hover:underline"
              >
                support@liferline.com
              </a>{' '}
              and we will see what we can do.
            </p>
          </div>
        </section>

        {/* Address Accuracy */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Shipping Address
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Please double-check your shipping address at checkout. We ship to
              the address you provide, and once a package is in transit we cannot
              redirect it.
            </p>
            <p>
              If you need to update your address after ordering, email us before
              your cable ships and we will make the change.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Shipping FAQ
          </h2>
          <div className="space-y-6">
            {shippingFaq.map((item) => (
              <div key={item.q} className="border-b border-border pb-6">
                <h3 className="text-cream text-sm font-semibold mb-2">
                  {item.q}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-16 border-t border-border pt-12 flex flex-col sm:flex-row gap-6">
        <Link href="/products" className="btn-primary text-center">
          Shop Cables
        </Link>
        <Link href="/returns" className="btn-ghost text-center">
          Returns and Exchanges
        </Link>
        <Link href="/contact" className="btn-ghost text-center">
          Contact Support
        </Link>
      </div>
    </div>
  )
}
