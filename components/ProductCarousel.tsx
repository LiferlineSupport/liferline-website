'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

interface Props {
  products: Product[]
}

export default function ProductCarousel({ products }: Props) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? products.length - 1 : c - 1))
  }, [products.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === products.length - 1 ? 0 : c + 1))
  }, [products.length])

  const product = products[current]

  return (
    <div className="relative w-full">
      {/* Slide */}
      <Link href={`/products/${product.slug}`} className="block group">
        {/* Image */}
        <div className="relative w-full aspect-[16/9] bg-card-hover border border-border overflow-hidden">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              priority={current === 0}
            />
          )}

          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bg/80 to-transparent pointer-events-none" />
        </div>

        {/* Product info */}
        <div className="mt-6 px-2 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-2">
            {product.tagline}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-cream group-hover:text-accent transition-colors mb-3">
            {product.name}
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-xl mx-auto">
            {product.description}
          </p>
          <span className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-accent border-b border-accent/40 group-hover:border-accent transition-colors pb-0.5">
            View full listing
          </span>
        </div>
      </Link>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Previous product"
        className="absolute left-0 top-[calc(50%-3rem)] -translate-y-1/2 p-3 text-muted hover:text-cream transition-colors bg-bg/80 border border-border hover:border-accent/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next product"
        className="absolute right-0 top-[calc(50%-3rem)] -translate-y-1/2 p-3 text-muted hover:text-cream transition-colors bg-bg/80 border border-border hover:border-accent/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Product slides">
        {products.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to ${p.name}`}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
              i === current ? 'bg-accent w-6' : 'bg-border hover:bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
