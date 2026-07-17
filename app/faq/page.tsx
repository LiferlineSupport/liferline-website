import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Forever Cables: lifetime guarantee details, materials, compatibility, shipping, custom orders, and more.',
  keywords: [
    'forever cables faq',
    'guitar cable questions',
    'guitar cable lifetime guarantee',
    'mogami cable faq',
    'canare gs-6 faq',
    'guitar cable compatibility',
    'custom guitar cables',
    'guitar cable shipping',
  ],
  alternates: {
    canonical: 'https://liferline.com/faq',
  },
  openGraph: {
    title: 'FAQ | Forever Cables by Hatch Patch Cables',
    description:
      'Answers to common questions about Forever Cables: guarantee, materials, compatibility, shipping, and custom orders.',
    url: 'https://liferline.com/faq',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'What makes Forever Cables different from cables I can buy at a music store?',
    a: 'The difference is in how they are built. Mass-produced cables are assembled at volume with components selected to hit a price point. Forever Cables are handmade one at a time using professional-grade wire (Canare GS-6 or Mogami W2524), Neutrik connectors, and Cardas silver solder. Each cable is tested and inspected before it ships. And unlike anything you will find at a big box store, every Forever Cable comes with a lifetime guarantee: no time limit, no receipt required.',
  },
  {
    q: 'What is the Lifetime Guarantee?',
    a: 'If your Forever Cable ever fails for any reason, we will repair or replace it at no cost to you. There is no expiration date on the guarantee, no registration required, and no fine print. If the cable stops working the way it should, contact us and we will make it right.',
  },
  {
    q: 'How do I claim the Lifetime Guarantee?',
    a: 'Just reach out to us by email. Describe what happened, and we will walk you through the process. You do not need a receipt, the original packaging, or proof of purchase date. If it is a Forever Cable, the guarantee applies.',
  },
  {
    q: 'What wire do you use?',
    a: 'We use two of the most trusted cables in professional audio. Canare GS-6 is a low-capacitance instrument cable wire used by studio engineers and touring musicians around the world; it delivers a clean, quiet signal with excellent shielding. Mogami W2524 is an ultra-flexible, high-shielding wire favored in broadcast and live sound environments. We use Canare GS-6 in our standard patch and instrument cable lengths, and Mogami W2524 in our longer stage cable runs.',
  },
  {
    q: 'What connectors do you use?',
    a: 'All Forever Cables use Neutrik connectors: the industry benchmark for reliability in professional audio. We use the NP2X-B (straight) and NP2RX-B (right angle) 1/4" TS connectors with black and gold finish.',
  },
  {
    q: 'What solder do you use?',
    a: 'We use Cardas 4% silver solder on every joint. Silver solder creates a cleaner, more conductive connection than standard tin-lead solder. It is more expensive and requires more skill to apply correctly. We use it because it is the right material for the job.',
  },
  {
    q: 'Will these cables work with my guitar, pedals, and amp?',
    a: 'Yes. Forever Cables use standard 1/4" TS connectors, which are compatible with virtually all electric guitars, basses, effect pedals, amplifiers, and audio interfaces that use a standard instrument input.',
  },
  {
    q: 'Do you make cables for bass guitar, keyboards, or other instruments?',
    a: 'Forever Cables are 1/4" TS instrument cables, so they work with any instrument that uses that connection: electric guitar, bass guitar, keyboards, synthesizers, and any direct-box or DI application. If you are not sure whether a Forever Cable fits your setup, feel free to ask.',
  },
  {
    q: 'Are these really handmade?',
    a: 'Yes. Every Forever Cable is assembled by hand from raw wire and connectors. That means cutting the wire to length, stripping and tinning the ends, soldering each connector individually, and testing the finished cable before it ships. No automated assembly, no offshore factory. Made by hand, by us.',
  },
  {
    q: 'How long does each cable take to make?',
    a: 'Each cable takes meaningful time to build correctly. We do not rush the process. That means Forever Cables are made to order and ship within a few business days of your order being placed. If you need a cable by a specific date, contact us and we will do our best to accommodate you.',
  },
  {
    q: 'Do you offer custom lengths or configurations?',
    a: 'We build our standard lineup to cover the most common needs. If you need a length or configuration not listed in the shop, contact us before ordering. We take on select custom builds and are happy to talk through what you need.',
  },
  {
    q: 'How do I know what cable length I need?',
    a: 'For patch cables (connecting pedals on a board), measure the distance between pedals on your actual pedalboard; shorter is better for signal quality and board aesthetics. For instrument cables (guitar to first pedal or amp), most players are comfortable with 10 to 15 feet, while stage players who move a lot often prefer 20 feet. For amp cables (send/return effects loops), 6 to 10 feet is usually enough. When in doubt, contact us and describe your setup.',
  },
  {
    q: 'How long does shipping take?',
    a: 'All US orders ship free via USPS. Because each cable is handmade to order, allow 1 to 3 business days for production, then 3 to 5 business days for delivery. Tracking is provided for every order. See our shipping policy page for full details.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'We currently ship within the United States. International shipping may be available on a case-by-case basis. Contact us before placing an order if you are outside the US and we will let you know what is possible.',
  },
  {
    q: 'What is your return policy?',
    a: 'You can return any unused Forever Cable within 30 days of delivery for a full refund. If your cable is defective or was damaged in shipping, it is covered by our lifetime guarantee and we will replace it immediately. See our returns and exchanges page for full details.',
  },
  {
    q: 'Can I get my cable repaired instead of replaced?',
    a: 'Yes. If you prefer to have your original cable repaired rather than replaced, we can do that. Contact us and describe the issue. For simple solder joint failures or connector damage, we will either walk you through the repair if you are comfortable with a soldering iron, or ask you to send the cable back and we will fix it for you.',
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
        name: 'FAQ',
        item: 'https://liferline.com/faq',
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

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <FaqJsonLd />
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-cream">FAQ</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Frequently Asked Questions
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          Everything you need to know.
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Questions about our cables, materials, guarantee, shipping, or
          anything else? You will probably find the answer here. If not,{' '}
          <Link
            href="/contact"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            get in touch
          </Link>
          .
        </p>
      </div>

      <div className="space-y-8">
        {faqItems.map((item) => (
          <div key={item.q} className="border-b border-border pb-8">
            <h2 className="text-cream font-semibold mb-3">{item.q}</h2>
            <p className="text-muted text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
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
