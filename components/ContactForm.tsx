'use client'

import { useState } from 'react'

const SUBJECT_OPTIONS = [
  'General question',
  'Lifetime guarantee claim',
  'Custom cable request',
  'Order question',
  'Wholesale inquiry',
  'Other',
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('sent')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-accent/30 bg-accent/5 p-8 text-center">
        <div className="w-12 h-12 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-cream font-semibold mb-2">Message sent.</p>
        <p className="text-muted text-sm">
          We typically respond within one business day. Check your inbox for a reply from support@liferline.com.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="text-xs tracking-[0.1em] uppercase text-muted mb-1.5 block font-medium">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-bg border border-border px-4 py-2.5 text-sm text-cream placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-xs tracking-[0.1em] uppercase text-muted mb-1.5 block font-medium">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-bg border border-border px-4 py-2.5 text-sm text-cream placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-xs tracking-[0.1em] uppercase text-muted mb-1.5 block font-medium">
          Subject
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-bg border border-border px-4 py-2.5 text-sm text-cream focus:border-accent focus:outline-none transition-colors appearance-none"
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-xs tracking-[0.1em] uppercase text-muted mb-1.5 block font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          minLength={10}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-bg border border-border px-4 py-2.5 text-sm text-cream placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors resize-y"
          placeholder="Tell us what you need. For guarantee claims, include your name, a description of the issue, and your shipping address."
        />
      </div>

      {errorMsg && (
        <p className="text-red-400 text-xs">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
