'use client'

import { useState } from 'react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-accent font-semibold mb-1">You're on the list.</p>
        <p className="text-sm text-muted">
          We'll let you know when new cables drop and when we run limited promos.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <label htmlFor="email-signup" className="sr-only">
        Email address
      </label>
      <input
        id="email-signup"
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
        className="flex-1 bg-bg border border-border px-4 py-3 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Joining...' : 'Join the List'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs sm:absolute sm:bottom-0 sm:translate-y-full sm:pt-1">
          {errorMsg}
        </p>
      )}
    </form>
  )
}
