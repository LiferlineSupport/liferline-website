'use client'

import { useState } from 'react'
import { Product, formatPrice } from '@/lib/products'

interface Props {
  product: Product
}

export default function BuyButton({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.value ?? ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleBuy() {
    setLoading(true)
    setError(null)

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('add_to_cart', {
        props: {
          product_name: product.name,
          product_id: product.id,
          price: (product.price / 100).toFixed(2),
          variant: selectedVariant,
        },
      })
    }

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
    <div>
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
                aria-pressed={selectedVariant === v.value}
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

      <div className="flex items-center justify-between mb-4">
        <span className="font-serif text-3xl text-cream">
          {formatPrice(product.price)}
        </span>
        <span className="text-xs text-muted tracking-wide">Guaranteed for life</span>
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
  )
}
