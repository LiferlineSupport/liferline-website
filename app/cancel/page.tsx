import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Cancelled',
  robots: { index: false, follow: false },
}

export default function Cancel() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-cream mb-4">Order not completed.</h1>
      <p className="text-muted text-lg mb-10">
        No worries, your order was cancelled and you haven't been charged. Come back
        whenever you're ready.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/products" className="btn-primary">
          Back to Shop
        </Link>
        <Link href="/contact" className="btn-ghost">
          Questions? Contact Us
        </Link>
      </div>
    </div>
  )
}
