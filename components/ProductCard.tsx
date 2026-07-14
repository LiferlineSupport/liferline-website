'use client'

import { useState } from 'react'
import { Product, formatPrice } from '@/lib/products'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.value ?? ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleBuy() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          variant: selectedVariant,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border hover:border-accent/30 transition-colors duration-300 flex flex-col relative">
      {product.badge && (
        <div className="absolute top-4 right-4 bg-accent text-bg text-xs font-bold tracking-wider uppercase px-2 py-1">
          {product.badge}
        </div>
      )}

      {/* Product image placeholder */}
      <div className="aspect-square bg-card-hover flex items-center justify-center border-b border-border">
        <svg
          className="w-24 h-24 text-border"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.75}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="font-serif text-xl text-cream mb-1">{product.name}</h3>
          <p className="text-xs tracking-[0.12em] uppercase text-accent mb-3">
            {product.tagline}
          </p>
          <p className="text-sm text-muted leading-relaxed">{product.description}</p>
        </div>

        {product.variants.length > 0 && (
          <div className="mb-5">
            <p className="text-xs tracking-[0.1em] uppercase text-muted mb-2">
              Length
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setSelectedVariant(v.value)}
                  className={`px-3 py-1.5 text-xs tracking-wide border transition-colors duration-150 ${
                    selectedVariant === v.value
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-border text-muted hover:border-muted'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-serif text-2xl text-cream">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted tracking-wide">Free shipping $50+</span>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-3">{error}</p>
          )}

          <button
            onClick={handleBuy}
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
