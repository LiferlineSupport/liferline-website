import Link from 'next/link'
import { products } from '@/lib/products'
import EmailSignup from '@/components/EmailSignup'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-serif text-xl text-cream block">Forever Cables</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted">by Liferline</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Hand-built boutique guitar cables made in the USA. Every cable is backed by
              our no-questions-asked lifetime guarantee.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase text-muted mb-5 font-semibold">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-sm text-muted hover:text-cream transition-colors">
                  All Cables
                </Link>
              </li>
              {products.map((p) => (
                <li key={p.id}>
                  <Link href={`/products/${p.slug}`} className="text-sm text-muted hover:text-cream transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase text-muted mb-5 font-semibold">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted hover:text-cream transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted hover:text-cream transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted hover:text-cream transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted hover:text-cream transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-muted hover:text-cream transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted hover:text-cream transition-colors">
                  Returns and Exchanges
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="text-sm text-muted hover:text-cream transition-colors">
                  Lifetime Guarantee
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-sm text-muted hover:text-cream transition-colors">
                  Warranty Lookup
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted hover:text-cream transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted hover:text-cream transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Email signup */}
        <div className="border-t border-border mt-12 pt-8 pb-8">
          <p className="text-xs tracking-[0.15em] uppercase text-muted mb-4 font-semibold text-center md:text-left">
            Join the list
          </p>
          <EmailSignup />
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Liferline. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Hand-Built. American-Made. Guaranteed for Life.™
          </p>
        </div>
      </div>
    </footer>
  )
}
