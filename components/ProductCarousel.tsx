'use client'

<<<<<<< HEAD
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
              sizes="(max-width: 1024px) 100vw, 1024px"
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
=======
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CarouselSlide {
  name: string
  slug: string
  image: string
  tagline: string
  brief: string
}

const slides: CarouselSlide[] = [
  {
    name: 'The Workhorse',
    slug: 'the-workhorse',
    image: '/products/the-workhorse-macro.png',
    tagline: 'Single Patch Cable',
    brief:
      'One cable, built right. Hand-soldered Mogami wire, Neutrik plugs, ferrite-filtered, and tested one at a time. Available in 6, 12, and 18 inches.',
  },
  {
    name: 'The Custom Pack',
    slug: 'the-custom-pack',
    image: '/products/the-custom-pack.png',
    tagline: '6-Pack, Mixed Lengths',
    brief:
      'Six Workhorse cables covering your whole rig. Two 6-inch, two 12-inch, two 18-inch. All built the same way, all guaranteed forever.',
  },
  {
    name: 'The Custom Pro Pack',
    slug: 'the-custom-pro-pack',
    image: '/products/the-custom-pro-pack.png',
    tagline: '14-Pack, Mixed Lengths',
    brief:
      'Fourteen cables for serious pedalboard builders. Six 6-inch, four 12-inch, four 18-inch. Certified, wax-secured, and guaranteed forever.',
  },
  {
    name: 'The Stage Cable',
    slug: 'the-stage-cable',
    image: '/products/the-stage-cable.png',
    tagline: 'Instrument Cable',
    brief:
      'From guitar to amp, dead quiet. Mogami W2524, Neutrik gold plugs, hand-soldered and individually certified. Available in 10, 15, and 20 feet.',
  },
]

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0)

  function prev() {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  }

  function next() {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))
  }

  const slide = slides[current]

  return (
    <div className="relative select-none">
      {/* Slide */}
      <Link
        href={`/products/${slide.slug}`}
        className="block group"
        aria-label={`View ${slide.name}`}
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/9] bg-card-hover overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={s.slug}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src={s.image}
                alt={s.name}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
              />
            </div>
          ))}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Caption */}
        <div className="bg-card border-x border-b border-border px-8 py-6 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-semibold mb-2">
            {slide.tagline}
          </p>
          <h3 className="font-serif text-3xl text-cream mb-3 group-hover:text-accent transition-colors duration-200">
            {slide.name}
          </h3>
          <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto">
            {slide.brief}
          </p>
          <p className="text-accent text-xs tracking-wide mt-4 group-hover:underline">
            View specs, options &amp; pricing &rarr;
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <button
        onClick={prev}
        aria-label="Previous product"
        className="absolute left-4 top-[calc(50%-3rem)] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-bg/80 border border-border hover:border-accent hover:text-accent text-cream transition-colors duration-150 backdrop-blur-sm"
      >
        &#8592;
>>>>>>> origin/hat-339-homepage-carousel
      </button>
      <button
        onClick={next}
        aria-label="Next product"
<<<<<<< HEAD
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
=======
        className="absolute right-4 top-[calc(50%-3rem)] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-bg/80 border border-border hover:border-accent hover:text-accent text-cream transition-colors duration-150 backdrop-blur-sm"
      >
        &#8594;
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${s.name}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === current ? 'bg-accent' : 'bg-border hover:bg-muted'
>>>>>>> origin/hat-339-homepage-carousel
            }`}
          />
        ))}
      </div>
    </div>
  )
}
