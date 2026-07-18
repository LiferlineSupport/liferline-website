'use client'

import { useState, useEffect } from 'react'

const DISMISS_KEY = 'newsletter_banner_dismissed'
const DISMISS_DAYS = 7

function isDismissed(): boolean {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(DISMISS_KEY)
  if (!stored) return false
  const dismissedAt = Number(stored)
  if (isNaN(dismissedAt)) return false
  return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000
}

export default function NewsletterBanner() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!isDismissed()) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now()))
    setVisible(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-accent/30 bg-card/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 relative">
        <button
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted hover:text-cream transition-colors p-1"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="14" y2="14" />
            <line x1="14" y1="4" x2="4" y2="14" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-2 pr-6">
            <p className="text-accent font-semibold text-sm sm:text-base">
              You're in! We'll send your 10% discount code within 24 hours.
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pr-6">
            <p className="text-cream text-sm sm:text-base font-medium shrink-0">
              Get 10% off your first order.{' '}
              <span className="text-muted text-sm">Join the Forever Cables early access list.</span>
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-1 min-w-0">
              <label htmlFor="banner-email" className="sr-only">Email address</label>
              <input
                id="banner-email"
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                className="flex-1 min-w-0 bg-bg border border-border px-3 py-2 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary py-2 px-4 text-xs whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Get 10% Off'}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-red-400 text-xs">{errorMsg}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
