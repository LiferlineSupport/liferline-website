'use client'

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
      </button>
      <button
        onClick={next}
        aria-label="Next product"
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
            }`}
          />
        ))}
      </div>
    </div>
  )
}
