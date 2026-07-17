import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Returns and Exchanges | Forever Cables',
  description:
    'Returns and exchanges for Forever Cables guitar patch cables. 30-day return window on unused cables. Free exchanges for wrong-length orders. Defective cables covered by our lifetime guarantee.',
  keywords: [
    'forever cables returns',
    'guitar cable return policy',
    'patch cable exchange',
    'forever cables exchange',
    'guitar cable refund',
  ],
  alternates: {
    canonical: 'https://liferline.com/returns',
  },
  openGraph: {
    title: 'Returns and Exchanges | Forever Cables',
    description:
      '30-day returns on unused cables. Free exchanges for wrong-length orders. Defective cables covered by our lifetime guarantee.',
    url: 'https://liferline.com/returns',
    type: 'website',
  },
}

const returnsFaq = [
  {
    q: 'What if my cable is defective?',
    a: 'Defective cables are covered by our lifetime guarantee, not this return policy. We ship a replacement before you send anything back. Visit our guarantee page or email support@liferline.com.',
  },
  {
    q: 'Can I exchange for a different length?',
    a: 'Yes. Email support@liferline.com with your order number and the length you need. You cover return shipping; we handle the rest.',
  },
  {
    q: 'How long does a refund take?',
    a: 'Once we receive and inspect the returned cable, refunds are issued within 5 to 7 business days to your original payment method.',
  },
  {
    q: 'Do you accept returns on sale items?',
    a: 'Yes. The same 30-day return policy applies to all Forever Cables products, regardless of price or promotion.',
  },
  {
    q: 'What if I received the wrong cable?',
    a: 'Email support@liferline.com. We will send the correct cable immediately and provide a prepaid return label for the wrong item. No cost to you.',
  },
]

function ReturnsFaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: returnsFaq.map((item) => ({
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
        name: 'Returns and Exchanges',
        item: 'https://liferline.com/returns',
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

export default function Returns() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <ReturnsFaqJsonLd />
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-cream">Returns and Exchanges</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Our Policy
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          Returns and Exchanges
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          We want you to be happy with your cables. If something is not right,
          here is how we handle it.
        </p>
      </div>

      <div className="space-y-16">
        {/* Standard Returns */}
        <section>
          <h2 className="font-serif text-3xl text-cream mb-6">
            Standard Returns
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              You can return any unused Forever Cable within 30 days of delivery
              for a full refund. The cable must be in its original packaging and
              in unused condition.
            </p>
          </div>
          <div className="mt-8 space-y-8">
            {[
              {
                step: '1',
                title: 'Email us',
                body: 'Send a message to support@liferline.com with your order number and reason for return.',
              },
              {
                step: '2',
                title: 'Ship it back',
                body: 'We will reply within one business day with return instructions. You are responsible for return shipping on standard returns.',
              },
              {
                step: '3',
                title: 'Get your refund',
                body: 'Once we receive and inspect the cable, we issue a full refund to your original payment method within 5 to 7 business days.',
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
        </section>

        {/* Exchanges */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">Exchanges</h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Ordered the wrong length? It happens. We will exchange your unused
              cable for a different length at no extra charge. You just cover
              return shipping.
            </p>
            <p>
              If the new length costs more, we will send you a payment link for
              the difference. If it costs less, we will refund the difference.
            </p>
            <p>
              To request an exchange, email{' '}
              <a
                href="mailto:support@liferline.com"
                className="text-accent hover:underline"
              >
                support@liferline.com
              </a>{' '}
              with your order number and the length you need.
            </p>
          </div>
        </section>

        {/* Defective Cables */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Defective Cables
          </h2>
          <div className="bg-card border border-border p-8">
            <p className="text-muted leading-relaxed mb-4">
              If your cable is defective or stops working, do not use this
              return policy. Your cable is covered by our{' '}
              <Link
                href="/guarantee"
                className="text-accent hover:underline font-semibold"
              >
                lifetime guarantee
              </Link>
              , which is faster and better for you.
            </p>
            <p className="text-muted leading-relaxed">
              We ship the replacement before you send anything back. No return
              shipping. No waiting. No cost.
            </p>
          </div>
        </section>

        {/* Wrong Item */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Wrong Item Received
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              If we shipped you the wrong cable, email{' '}
              <a
                href="mailto:support@liferline.com"
                className="text-accent hover:underline"
              >
                support@liferline.com
              </a>
              . We will send the correct cable immediately and provide a prepaid
              return label for the wrong item. No cost to you.
            </p>
          </div>
        </section>

        {/* International */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            International Orders
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              International customers are welcome to return cables under the
              same 30-day policy. Return shipping and any customs or duties on
              the return shipment are the customer's responsibility. We cannot
              reimburse customs fees.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">
            Returns FAQ
          </h2>
          <div className="space-y-6">
            {returnsFaq.map((item) => (
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
        <Link href="/guarantee" className="btn-primary text-center">
          Lifetime Guarantee
        </Link>
        <Link href="/contact" className="btn-ghost text-center">
          Contact Support
        </Link>
      </div>
    </div>
  )
}
