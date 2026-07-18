import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Support & Contact',
  description:
    'Get help with your Forever Cables by Hatch Patch Cables. File a lifetime guarantee claim, ask about custom cables, or just say hello.',
  alternates: {
    canonical: 'https://liferline.com/contact',
  },
  openGraph: {
    title: 'Support & Contact | Forever Cables',
    description: 'File a lifetime guarantee claim, ask about custom cables, or get help with your order. We actually answer emails.',
    url: 'https://liferline.com/contact',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Forever Cables by Hatch Patch Cables' }],
  },
}

const faqItems = [
  {
    q: 'What does the lifetime guarantee actually cover?',
    a: "Everything. If the cable fails for any reason (bad solder joint, broken connector, damaged jacket), we replace it. We don't have a list of exclusions because we don't believe in them.",
  },
  {
    q: "Do I need to send the old cable back?",
    a: "No. We'll ship the replacement first. If you want to send the broken one back after, great; we can learn from it. But it's not required.",
  },
  {
    q: 'How long does shipping take?',
    a: "Shipping is free on every order. Each cable is built to order (1 to 3 business days), then ships via USPS with tracking (3 to 5 business days). US only for now.",
  },
  {
    q: 'Can you build something custom?',
    a: "Often yes. Email us with what you need (custom length, connector combo, bulk order) and we'll tell you what's possible.",
  },
  {
    q: 'Why are Forever Cables more expensive than store cables?',
    a: "Because we use better materials, assemble them by hand, and guarantee them forever. The math works out in your favor within a year or two.",
  },
]

function FaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
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
        name: 'Support & Contact',
        item: 'https://liferline.com/contact',
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

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <FaqJsonLd />
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li className="text-cream">Support & Contact</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Support & Contact
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          We actually answer emails.
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          High-touch support is part of the product. Whether you need a replacement cable,
          have a question about an order, or want to build something custom, we're here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Contact form */}
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-cream mb-4">Send us a message</h2>
            <p className="text-muted leading-relaxed mb-6">
              Fill out the form below and we'll get back to you within one business day.
              You can also reach us directly at{' '}
              <a
                href="mailto:support@liferline.com"
                className="text-accent hover:underline"
              >
                support@liferline.com
              </a>.
            </p>
            <ContactForm />
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-sm font-semibold text-cream tracking-wide mb-4">
              Filing a guarantee claim?
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              The fastest way is to use our{' '}
              <Link href="/warranty" className="text-accent hover:underline">
                warranty claim form
              </Link>
              . You can also look up your covered cables there. Or, select
              &ldquo;Lifetime guarantee claim&rdquo; as the subject above and include:
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-accent">→</span>
                Your name and order info (if you have it)
              </li>
              <li className="flex gap-2">
                <span className="text-accent">→</span>
                A quick description of what's wrong
              </li>
              <li className="flex gap-2">
                <span className="text-accent">→</span>
                Your shipping address
              </li>
            </ul>
            <p className="text-muted text-sm leading-relaxed mt-4">
              That's it. We don't need you to ship the old cable back first.
              A replacement will be on the way before you've had to dig for a box.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-serif text-2xl text-cream mb-6">Common questions</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="border-b border-border pb-6">
                <h3 className="text-cream text-sm font-semibold mb-2">{item.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link href="/warranty" className="btn-primary text-center">
          Warranty Lookup and Claims
        </Link>
        <Link href="/returns" className="btn-ghost text-center">
          Returns and Exchanges
        </Link>
        <Link href="/guarantee" className="btn-ghost text-center">
          Lifetime Guarantee
        </Link>
      </div>
    </div>
  )
}
