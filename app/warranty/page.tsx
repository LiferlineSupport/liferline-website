import type { Metadata } from 'next'
import Link from 'next/link'
import WarrantyLookup from './WarrantyLookup'
import ClaimForm from './ClaimForm'

export const metadata: Metadata = {
  title: 'Warranty Lookup and Claims | Forever Cables',
  description:
    'Look up your Forever Cables lifetime warranty status or file a warranty claim. Every Forever Cable is guaranteed for life, no questions asked.',
  keywords: [
    'forever cables warranty',
    'guitar cable warranty claim',
    'lifetime warranty lookup',
    'guitar cable replacement',
  ],
  alternates: {
    canonical: 'https://liferline.com/warranty',
  },
  openGraph: {
    title: 'Warranty Lookup and Claims | Forever Cables',
    description: 'Look up your warranty status or file a claim. Every Forever Cable is guaranteed for life.',
    url: 'https://liferline.com/warranty',
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
        name: 'Warranty',
        item: 'https://liferline.com/warranty',
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

export default function WarrantyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <BreadcrumbJsonLd />

      <nav className="mb-12">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li className="text-cream">Warranty</li>
        </ol>
      </nav>

      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Lifetime Guarantee
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          Warranty Lookup
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Enter the email address you used when you purchased your cable to see your
          warranty status. Every Forever Cable is covered for life, no receipt required.
        </p>
      </div>

      <section className="mb-20">
        <WarrantyLookup />
      </section>

      <section className="border-t border-border pt-16">
        <div className="mb-10">
          <h2 className="font-serif text-3xl text-cream mb-4">File a Warranty Claim</h2>
          <p className="text-muted leading-relaxed max-w-2xl">
            Something wrong with your cable? Fill out the form below and we will get a
            replacement headed your way. No return shipping required, no approval
            process, no runaround.
          </p>
        </div>

        <ClaimForm />
      </section>

      <div className="mt-16 border-t border-border pt-12 flex flex-col sm:flex-row gap-6">
        <Link href="/guarantee" className="btn-ghost text-center">
          Lifetime Guarantee Details
        </Link>
        <Link href="/contact" className="btn-ghost text-center">
          Contact Support
        </Link>
        <Link href="/products" className="btn-primary text-center">
          Shop Cables
        </Link>
      </div>
    </div>
  )
}
