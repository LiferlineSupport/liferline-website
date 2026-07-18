'use client'

import { useState } from 'react'
import { Product, formatPrice, getVariantPrice } from '@/lib/products'

interface Props {
  product: Product
}

export default function BuyButton({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.value ?? ''
  )
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const unitPrice = getVariantPrice(product, selectedVariant)
  const totalPrice = unitPrice * quantity

  async function handleBuy() {
    setLoading(true)
    setError(null)

    const priceStr = (totalPrice / 100).toFixed(2)

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('add_to_cart', {
        props: {
          product_name: product.name,
          product_id: product.id,
          price: priceStr,
          variant: selectedVariant,
          quantity: String(quantity),
        },
      })
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: parseFloat(priceStr),
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_variant: selectedVariant || undefined,
          price: unitPrice / 100,
          quantity,
        }],
      })
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: parseFloat(priceStr),
        currency: 'USD',
      })
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          variant: selectedVariant,
          quantity,
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

      <div className="mb-5">
        <p className="text-xs tracking-[0.1em] uppercase text-muted mb-2">
          Quantity
        </p>
        <div className="flex items-center gap-0">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-10 h-10 border border-border text-muted hover:text-cream hover:border-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-lg"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <span className="w-12 h-10 border-t border-b border-border flex items-center justify-center text-cream text-sm tabular-nums">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            className="w-10 h-10 border border-border text-muted hover:text-cream hover:border-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="font-serif text-3xl text-cream">
          {formatPrice(totalPrice)}
        </span>
        <span className="text-xs text-muted tracking-wide">Free US shipping</span>
      </div>

      {error && (
        <p className="text-red-400 text-xs mb-3">{error}</p>
      )}

      <button
        onClick={handleBuy}
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Redirecting...' : quantity > 1 ? `Buy ${quantity} Now` : 'Buy Now'}
      </button>
    </div>
  )
}
