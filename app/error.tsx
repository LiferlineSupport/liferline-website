'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
        Something went wrong
      </p>
      <h1 className="font-serif text-4xl text-cream mb-4">
        We hit a snag.
      </h1>
      <p className="text-muted text-lg mb-10">
        Something unexpected happened. Try again, or head back to the shop.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={reset} className="btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn-ghost">
          Back to Shop
        </Link>
      </div>
    </div>
  )
}
