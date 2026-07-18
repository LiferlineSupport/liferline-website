import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'How Hatch Patch Cables started: hand-built boutique guitar cables made in the USA with Canare GS-6, Mogami wire, and Neutrik connectors. Why we guarantee every Forever Cable for life.',
  keywords: [
    'about forever cables',
    'hatch patch cables',
    'handmade guitar cables usa',
    'boutique guitar cables',
    'hand soldered guitar cables',
    'mogami guitar cable',
    'canare gs-6 guitar cable',
    'neutrik guitar cable connector',
  ],
  alternates: {
    canonical: 'https://liferline.com/about',
  },
  openGraph: {
    title: 'Our Story | Forever Cables',
    description:
      'We got tired of bad cables. So we started building our own. Hand-soldered in the USA with Canare GS-6, Mogami wire, and Neutrik connectors.',
    url: 'https://liferline.com/about',
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
        name: 'Our Story',
        item: 'https://liferline.com/about',
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

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-cream">Our Story</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Our Story
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-8">
          We got tired of bad cables.
        </h1>
        <p className="text-muted text-lg leading-relaxed">
          So we started building our own.
        </p>
      </div>

      <div className="space-y-12 text-muted leading-relaxed">
        <div className="border-l-2 border-accent pl-8">
          <p className="text-lg">
            Every guitarist has a story. A cable that crackled mid-set and
            ruined the take. A connector that worked fine at soundcheck and died
            before the first song ended. A patch cable that lasted three months
            before going intermittent in the most annoying, impossible-to-
            diagnose way possible.
          </p>
        </div>

        <p>
          We started Hatch Patch Cables because we were sick of that story. Sick
          of cheap cables with thin insulation, cold solder joints, and
          connectors that wobble loose after a few months. Sick of guitar shops
          that sell &quot;professional&quot; cables for $15 and wonder why they
          keep coming back.
        </p>

        <p>
          Forever Cables are handmade guitar patch cables built to last the
          lifetime of your rig. Not the lifetime of a budget cable. Yours.
        </p>

        <h2 className="font-serif text-3xl text-cream pt-4">Who We Are</h2>

        <p>
          Forever Cables are made by Hatch Patch Cables: a small, hands-on
          operation dedicated to one thing, making the most reliable guitar
          cables money can buy and backing them without reservation.
        </p>

        <p>
          We are not a big box brand. We do not outsource assembly to a factory
          floor. Every cable that ships from us is made by hand, tested by ear,
          and signed off by a real person who cares about the quality of your
          signal chain.
        </p>

        <p>
          We believe a cable should be the last thing you think about when you
          plug in. That belief is built into every joint we solder.
        </p>

        <h2 className="font-serif text-3xl text-cream pt-4">The Craft</h2>

        <p>
          Every Forever Cable starts with components we trust completely.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-card border border-border p-6">
            <h3 className="text-cream font-semibold mb-3">Wire</h3>
            <p className="text-sm">
              We use <strong className="text-cream">Canare GS-6</strong> and{' '}
              <strong className="text-cream">Mogami W2524</strong>, two of the
              most respected wire formulations in professional audio. Canare
              GS-6 is the go-to for studio engineers and touring guitarists who
              need low capacitance and zero compromise. Mogami W2524 brings
              exceptional shielding and signal clarity to longer stage runs.
            </p>
          </div>
          <div className="bg-card border border-border p-6">
            <h3 className="text-cream font-semibold mb-3">Connectors</h3>
            <p className="text-sm">
              All connectors are{' '}
              <strong className="text-cream">Neutrik</strong>, the industry
              standard for locking reliability. The black and gold finish is not
              cosmetic; it reflects the quality of the contact surfaces inside.
            </p>
          </div>
          <div className="bg-card border border-border p-6">
            <h3 className="text-cream font-semibold mb-3">Solder</h3>
            <p className="text-sm">
              We use{' '}
              <strong className="text-cream">Cardas 4% silver solder</strong>{' '}
              for every joint. Silver solder produces a cleaner, more conductive
              bond than standard tin-lead. It costs more and takes more skill to
              work with correctly. We use it anyway.
            </p>
          </div>
        </div>

        <p>
          Each cable is built, tested, and inspected by hand before it ships. If
          it does not pass, it does not leave.
        </p>

        <h2 className="font-serif text-3xl text-cream pt-4">
          The Lifetime Guarantee
        </h2>

        <p>
          The guarantee is simple: if your Forever Cable ever fails, we will fix
          it or replace it. No receipt required. No expiration date. No
          exceptions.
        </p>

        <p>
          We offer this guarantee because we mean it literally. We build these
          cables to outlast your current amp, your current pedalboard, and your
          current band. The guarantee is our commitment that if something does go
          wrong, we will make it right without question.
        </p>

        <p>
          Most cable companies do not offer this because they know their cables
          will fail. We offer it because we are confident ours will not.
        </p>

        <h2 className="font-serif text-3xl text-cream pt-4">Our Mission</h2>

        <p>
          High-quality, handmade guitar cables should not be out of reach.
          Boutique does not have to mean unobtainable. We make Forever Cables to
          bring professional-grade signal quality to every guitarist who is
          serious about their tone, with the kind of customer support you would
          expect from someone who actually picks up the phone.
        </p>

        <p>
          When you buy a Forever Cable, you are buying from people who care about
          your rig as much as you do.
        </p>

        <div className="bg-card border border-border p-8 my-8">
          <p className="font-serif text-2xl text-cream mb-4 leading-snug">
            &quot;Hand-Built. American-Made. Guaranteed for Life.&quot;
          </p>
          <p className="text-sm text-muted">
            That is not a tagline we brainstormed in a meeting. It is literally a
            description of what we do.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-12 flex flex-col sm:flex-row gap-6">
        <Link href="/products" className="btn-primary text-center">
          Shop Cables
        </Link>
        <Link href="/contact" className="btn-ghost text-center">
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
