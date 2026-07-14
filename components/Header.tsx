'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-bg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl text-cream group-hover:text-accent transition-colors">
              Liferline
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
              Cable Company
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#products"
              className="text-sm tracking-wide text-muted hover:text-cream transition-colors"
            >
              Cables
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wide text-muted hover:text-cream transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="text-sm tracking-wide text-muted hover:text-cream transition-colors"
            >
              Support
            </Link>
            <Link href="/#products" className="btn-primary">
              Shop Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-muted hover:text-cream transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border py-4 flex flex-col gap-4">
            <Link
              href="/#products"
              className="text-sm tracking-wide text-muted hover:text-cream transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Cables
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wide text-muted hover:text-cream transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="text-sm tracking-wide text-muted hover:text-cream transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Support
            </Link>
            <Link href="/#products" className="btn-primary inline-block text-center" onClick={() => setMenuOpen(false)}>
              Shop Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
