import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Hatch Patch Cables collects, uses, and protects your personal information when you shop Forever Cables.',
  alternates: {
    canonical: 'https://liferline.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Hatch Patch Cables',
    description: 'How we handle your data when you shop Forever Cables.',
    url: 'https://liferline.com/privacy',
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
        name: 'Privacy Policy',
        item: 'https://liferline.com/privacy',
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

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li className="text-cream">Privacy Policy</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Legal
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm">
          Last updated: July 17, 2026
        </p>
      </div>

      <div className="space-y-12 text-muted leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Who we are</h2>
          <p>
            Hatch Patch Cables operates the Forever Cables product line and the website at
            liferline.com. When this policy says "we," "us," or "our," it means Hatch Patch
            Cables.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">What we collect</h2>
          <p className="mb-4">
            We collect only what we need to fulfill your order and provide support:
          </p>
          <ul className="space-y-3">
            {[
              'Name and email address (so we can send order confirmations and respond to support requests)',
              'Shipping address (so we can deliver your cables)',
              'Payment information (processed securely by Stripe; we never see or store your full card number)',
              'Order details (what you bought, when, and how much you paid)',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span className="text-accent mt-0.5 shrink-0">+</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">How we use your information</h2>
          <ul className="space-y-3">
            {[
              'Process and ship your order',
              'Send order confirmation and shipping updates',
              'Honor our lifetime guarantee (we may look up your order history to verify a claim, but we honor claims even without a receipt)',
              'Respond to support requests and questions',
              'Improve our products and website',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span className="text-accent mt-0.5 shrink-0">+</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4">
            We do not sell, rent, or trade your personal information to third parties. We do
            not send marketing emails unless you have explicitly opted in.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Payment processing</h2>
          <p>
            All payments are processed by Stripe, Inc. When you check out, your payment
            details are sent directly to Stripe over an encrypted connection. We never
            receive or store your full credit card number. Stripe's privacy policy is
            available at stripe.com/privacy.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Analytics</h2>
          <p>
            We use Plausible Analytics, a privacy-focused analytics tool that does not use
            cookies and does not collect personal data. Plausible tracks aggregate page
            views and referral sources so we can understand how people find our site. No
            individual visitor profiles are created.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Cookies</h2>
          <p>
            We do not set tracking cookies. Stripe may set cookies required for payment
            processing and fraud prevention during checkout. These are essential cookies,
            not used for advertising.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Data retention</h2>
          <p>
            We keep order records as long as needed to fulfill our lifetime guarantee and
            comply with tax and accounting requirements. If you would like us to delete
            your personal information, email us and we will remove everything we can while
            still meeting our legal obligations.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Your rights</h2>
          <p>You can request to:</p>
          <ul className="space-y-3 mt-3">
            {[
              'See what personal information we have about you',
              'Correct any information that is wrong',
              'Delete your personal information (subject to legal retention requirements)',
              'Receive a copy of your data in a portable format',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span className="text-accent mt-0.5 shrink-0">+</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4">
            To make any of these requests, email us at{' '}
            <a href="mailto:support@liferline.com" className="text-accent hover:underline">
              support@liferline.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Children</h2>
          <p>
            Our site is not directed at children under 13, and we do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Changes to this policy</h2>
          <p>
            If we make changes to this privacy policy, we will update the "last updated"
            date at the top of this page. We encourage you to check this page occasionally.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream mb-4">Contact</h2>
          <p>
            Questions about this privacy policy or how we handle your data? Email us at{' '}
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
