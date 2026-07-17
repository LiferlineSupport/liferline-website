import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lifetime Guarantee | Forever Cables',
  description:
    'Every Forever Cable is backed by a no-questions-asked lifetime warranty. If your guitar cable ever fails, for any reason, we replace it free. No receipts. No shipping labels. No expiration.',
  keywords: [
    'lifetime warranty guitar cable',
    'lifetime guarantee guitar cable',
    'best guitar cable warranty',
    'guitar cable replacement',
    'forever cables guarantee',
  ],
  alternates: {
    canonical: 'https://liferline.com/guarantee',
  },
}

const guaranteeFaq = [
  {
    q: 'Do I need my receipt?',
    a: 'No. We can usually look up your order by email, but even if we cannot, we will still honor the guarantee. Every Forever Cable has our name on it.',
  },
  {
    q: 'Is there a time limit?',
    a: 'No. Lifetime means lifetime. Whether you bought the cable last month or five years ago, the guarantee applies.',
  },
  {
    q: 'Do I have to send the broken cable back?',
    a: 'Not before we send the replacement. If you want to send it back afterward so we can learn from it, that is appreciated but not required.',
  },
  {
    q: 'Does this cover cables bought as gifts?',
    a: 'Yes. The guarantee follows the cable, not the buyer.',
  },
  {
    q: 'What if my cable was damaged by accident?',
    a: 'Still covered. We do not distinguish between manufacturing defects and accidental damage. If the cable does not work, we replace it.',
  },
]

function GuaranteeFaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guaranteeFaq.map((item) => ({
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
        name: 'Lifetime Guarantee',
        item: 'https://liferline.com/guarantee',
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

export default function Guarantee() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <GuaranteeFaqJsonLd />
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li className="text-cream">Lifetime Guarantee</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Our Promise
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          The Forever Cables Lifetime Guarantee
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Every cable we sell is guaranteed for life. Not one year. Not five years.
          The entire life of the cable. If it fails, we replace it. Period.
        </p>
      </div>

      <div className="space-y-16">
        {/* What it covers */}
        <section>
          <h2 className="font-serif text-3xl text-cream mb-6">What the guarantee covers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Broken connector',
                body: 'If the plug snaps, loosens, or stops making contact, we replace the cable.',
              },
              {
                title: 'Bad solder joint',
                body: 'Crackling, cutting out, intermittent signal: that is a solder joint issue, and it is on us.',
              },
              {
                title: 'Damaged jacket',
                body: 'If the outer jacket cracks, splits, or wears through, we replace it.',
              },
              {
                title: 'Signal degradation',
                body: 'If the cable starts sounding dull or noisy over time, send it back and we will send you a new one.',
              },
              {
                title: 'Wear and tear',
                body: 'Cables get stepped on, yanked, coiled, and thrown in gig bags. That is normal use, and it is covered.',
              },
              {
                title: 'Anything else',
                body: 'We do not have a list of exclusions. If the cable is not working the way it should, that is a claim.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border p-6">
                <h3 className="text-cream font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="font-serif text-3xl text-cream mb-6">How to file a claim</h2>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Email us',
                body: 'Send a message to support@liferline.com. Tell us your name, what happened to the cable, and your shipping address.',
              },
              {
                step: '2',
                title: 'We ship a replacement',
                body: 'We do not make you wait. A new cable ships to you before we even ask for the old one back.',
              },
              {
                step: '3',
                title: 'That is it',
                body: 'No return shipping labels. No diagnostic forms. No waiting on hold. No approval process.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-10 h-10 bg-accent text-bg font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why we can do this */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">Why we can guarantee cables for life</h2>
          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              Most cable companies cannot offer a real lifetime guarantee because they cannot control
              their quality. They buy cables from overseas factories, slap a label on them, and hope
              for the best.
            </p>
            <p>
              We build every cable by hand, one at a time. We use Mogami cable and Neutrik connectors
              because they are the best components available, used in professional recording studios
              and by touring musicians worldwide. We hand-solder every connection and test every cable
              before it leaves our bench.
            </p>
            <p>
              When you control every step of the build process, you know exactly how long a cable will
              last. Our return rate is under 1%. The lifetime guarantee is not a marketing gimmick.
              It is just math.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-cream mb-6">Guarantee FAQ</h2>
          <div className="space-y-6">
            {guaranteeFaq.map((item) => (
              <div key={item.q} className="border-b border-border pb-6">
                <h3 className="text-cream text-sm font-semibold mb-2">{item.q}</h3>
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
        <Link href="/contact" className="btn-ghost text-center">
          Contact Support
        </Link>
      </div>
    </div>
  )
}
