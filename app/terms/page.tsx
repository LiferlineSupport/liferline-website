import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions for purchasing Forever Cables from Hatch Patch Cables. Covers orders, shipping, returns, lifetime guarantee, and site usage.',
  alternates: {
    canonical: 'https://liferline.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Forever Cables',
    description: 'Terms and conditions for shopping Forever Cables.',
    url: 'https://liferline.com/terms',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Forever Cables by Hatch Patch Cables' }],
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
        name: 'Terms of Service',
        item: 'https://liferline.com/terms',
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

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li className="text-cream">Terms of Service</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Legal
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          Terms of Service
        </h1>
        <p className="text-muted text-sm">
          Last updated: July 17, 2026
        </p>
      </div>

      <div className="space-y-12 text-muted leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Overview</h2>
          <p>
            These terms govern your use of the liferline.com website and your purchase of
            Forever Cables products from Hatch Patch Cables. By placing an order or using
            this site, you agree to these terms. If you do not agree, please do not use the
            site or place orders.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Products and pricing</h2>
          <p className="mb-4">
            All prices are listed in US dollars and include applicable taxes where required.
            Prices may change at any time, but changes will not affect orders that have
            already been placed and confirmed.
          </p>
          <p>
            Product descriptions and images are intended to be accurate. Because our cables
            are hand-built, minor cosmetic variations between units are normal and do not
            constitute a defect.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Orders and payment</h2>
          <p className="mb-4">
            When you place an order, you are making an offer to purchase. We confirm your
            order by sending a receipt to the email address you provide at checkout. Payment
            is processed securely through Stripe at the time of purchase.
          </p>
          <p>
            We reserve the right to cancel any order if we are unable to fulfill it (for
            example, due to inventory constraints). If we cancel your order, you will receive
            a full refund.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Shipping</h2>
          <p className="mb-4">
            We currently ship to addresses within the United States only. All orders include
            free shipping via USPS. Estimated delivery is 3 to 7 business days
            from the date of shipment, plus 1 to 3 business days for production.
          </p>
          <p>
            Once your order ships, you will receive a tracking number by email. We are not
            responsible for delays caused by the carrier after handoff, but we will work with
            you to resolve any delivery issues. Full details are available on our{' '}
            <Link href="/shipping" className="text-accent hover:underline">
              Shipping Policy
            </Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Lifetime guarantee</h2>
          <p className="mb-4">
            Every Forever Cable is backed by our no-questions-asked lifetime guarantee. If
            your cable fails for any reason, at any time, we will replace it free of charge.
            There is no time limit and no list of exclusions.
          </p>
          <p className="mb-4">
            To file a guarantee claim, email{' '}
            <a href="mailto:support@liferline.com" className="text-accent hover:underline">
              support@liferline.com
            </a>{' '}
            with your name, a description of the issue, and your shipping address. We will
            ship a replacement before asking you to return the original cable.
          </p>
          <p>
            Full details of the guarantee are available on our{' '}
            <Link href="/guarantee" className="text-accent hover:underline">
              Lifetime Guarantee
            </Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Returns and refunds</h2>
          <p className="mb-4">
            If you are not satisfied with your purchase for any reason, contact us within 30
            days of delivery for a full refund. You are responsible for return shipping on standard returns. Email{' '}
            <a href="mailto:support@liferline.com" className="text-accent hover:underline">
              support@liferline.com
            </a>{' '}
            to start a return.
          </p>
          <p className="mb-4">
            After 30 days, the lifetime guarantee still applies. If the cable fails at any
            point, we replace it. If you simply change your mind after 30 days, we are happy
            to work something out on a case-by-case basis.
          </p>
          <p>
            Full details are available on our{' '}
            <Link href="/returns" className="text-accent hover:underline">
              Returns and Exchanges
            </Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Intellectual property</h2>
          <p>
            All content on this site, including text, images, logos, and design, is owned by
            Hatch Patch Cables or used with permission. You may not copy, reproduce, or
            distribute any content from this site without written permission, except for
            personal, non-commercial use (such as sharing a product link).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Hatch Patch Cables is not liable for any
            indirect, incidental, or consequential damages arising from the use of our
            products or website. Our total liability for any claim related to a product is
            limited to the purchase price you paid for that product. This does not affect
            your statutory rights.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Governing law</h2>
          <p>
            These terms are governed by the laws of the United States. Any disputes will be
            resolved in accordance with applicable federal and state law.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Changes to these terms</h2>
          <p>
            We may update these terms from time to time. When we do, we will update the
            "last updated" date at the top. Continued use of the site after changes are
            posted constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Contact</h2>
          <p>
            Questions about these terms? Email us at{' '}
            <a href="mailto:support@liferline.com" className="text-accent hover:underline">
              support@liferline.com
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-16 border-t border-border pt-12 flex flex-col sm:flex-row gap-6">
        <Link href="/products" className="btn-primary text-center">
          Shop Cables
        </Link>
        <Link href="/contact" className="btn-ghost text-center">
          Contact Us
        </Link>
      </div>
    </div>
  )
}
