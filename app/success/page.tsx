import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Confirmed — Liferline Cable Company',
}

export default function Success() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
      <div className="w-16 h-16 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-serif text-4xl text-cream mb-4">Order confirmed.</h1>
      <p className="text-muted text-lg mb-10 leading-relaxed">
        Your Liferline cable is on its way. Check your email for a receipt and tracking
        number. And remember — if anything ever goes wrong, we've got you.
      </p>

      <div className="bg-card border border-border p-6 mb-10 text-left">
        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3 font-semibold">
          Your lifetime guarantee
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Your cable is covered for life. If it ever fails — for any reason — email us at{' '}
          <a href="mailto:support@liferline.com" className="text-accent hover:underline">
            support@liferline.com
          </a>{' '}
          and we'll get a replacement shipped.
        </p>
      </div>

      <Link href="/" className="btn-primary inline-block">
        Back to Shop
      </Link>
    </div>
  )
}
