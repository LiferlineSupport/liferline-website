'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, formatPrice, getVariantPrice } from '@/lib/products'

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

    const unitPrice = getVariantPrice(product, selectedVariant)
    const priceStr = (unitPrice / 100).toFixed(2)

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('add_to_cart', {
        props: {
          product_name: product.name,
          product_id: product.id,
          price: priceStr,
          variant: selectedVariant,
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
          quantity: 1,
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

      <div className="aspect-square bg-card-hover border-b border-border overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="font-serif text-xl text-cream mb-1">
            <Link href={`/products/${product.slug}`} className="hover:text-accent transition-colors">
              {product.name}
            </Link>
          </h3>
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

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-serif text-2xl text-cream">
              {formatPrice(getVariantPrice(product, selectedVariant))}
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
            {loading ? 'Redirecting...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
