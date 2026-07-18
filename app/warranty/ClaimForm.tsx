'use client'

import { useState } from 'react'

const ISSUE_TYPES = [
  { value: 'broken-connector', label: 'Broken or loose connector' },
  { value: 'bad-solder', label: 'Crackling or intermittent signal (bad solder joint)' },
  { value: 'damaged-jacket', label: 'Cracked or split cable jacket' },
  { value: 'signal-degradation', label: 'Signal sounds dull or noisy' },
  { value: 'wear-and-tear', label: 'General wear and tear' },
  { value: 'other', label: 'Something else' },
]

export default function ClaimForm() {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    orderId: '',
    sku: '',
    issueType: '',
    description: '',
    shippingAddress: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [claimId, setClaimId] = useState('')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/warranty/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }

      setClaimId(data.claimId)
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (claimId) {
    return (
      <div className="bg-card border border-accent/30 p-8 text-center">
        <div className="w-12 h-12 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-cream mb-2">Claim submitted.</h3>
        <p className="text-muted text-sm mb-4">
          Your claim ID is <span className="text-cream font-mono">{claimId}</span>.
        </p>
        <p className="text-muted text-sm leading-relaxed max-w-md mx-auto">
          We will review your claim and get a replacement cable headed your way.
          You will hear from us at <span className="text-cream">{form.customerEmail}</span> within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs text-muted mb-2 font-semibold uppercase tracking-wider">
            Your Name *
          </label>
          <input
            type="text"
            value={form.customerName}
            onChange={(e) => update('customerName', e.target.value)}
            required
            className="w-full bg-bg border border-border px-4 py-3 text-cream text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-2 font-semibold uppercase tracking-wider">
            Email *
          </label>
          <input
            type="email"
            value={form.customerEmail}
            onChange={(e) => update('customerEmail', e.target.value)}
            required
            className="w-full bg-bg border border-border px-4 py-3 text-cream text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs text-muted mb-2 font-semibold uppercase tracking-wider">
            Order ID (if you have it)
          </label>
          <input
            type="text"
            value={form.orderId}
            onChange={(e) => update('orderId', e.target.value)}
            placeholder="Optional"
            className="w-full bg-bg border border-border px-4 py-3 text-cream text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-2 font-semibold uppercase tracking-wider">
            Which cable? (if you know)
          </label>
          <select
            value={form.sku}
            onChange={(e) => update('sku', e.target.value)}
            className="w-full bg-bg border border-border px-4 py-3 text-cream text-sm focus:outline-none focus:border-accent"
          >
            <option value="">Not sure / other</option>
            <option value="WH-6">The Workhorse 6&quot;</option>
            <option value="WH-12">The Workhorse 12&quot;</option>
            <option value="WH-18">The Workhorse 18&quot;</option>
            <option value="RA-6">The Right Angle 6&quot;</option>
            <option value="RA-12">The Right Angle 12&quot;</option>
            <option value="SC-10">The Stage Cable 10ft</option>
            <option value="SC-15">The Stage Cable 15ft</option>
            <option value="SC-20">The Stage Cable 20ft</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-muted mb-2 font-semibold uppercase tracking-wider">
          What happened? *
        </label>
        <select
          value={form.issueType}
          onChange={(e) => update('issueType', e.target.value)}
          required
          className="w-full bg-bg border border-border px-4 py-3 text-cream text-sm focus:outline-none focus:border-accent"
        >
          <option value="">Select an issue type</option>
          {ISSUE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-muted mb-2 font-semibold uppercase tracking-wider">
          Tell us more *
        </label>
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          required
          rows={4}
          placeholder="Describe what went wrong. The more detail you give us, the faster we can get your replacement out."
          className="w-full bg-bg border border-border px-4 py-3 text-cream text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent resize-none"
        />
      </div>

      <div>
        <label className="block text-xs text-muted mb-2 font-semibold uppercase tracking-wider">
          Shipping address for replacement *
        </label>
        <textarea
          value={form.shippingAddress}
          onChange={(e) => update('shippingAddress', e.target.value)}
          required
          rows={3}
          placeholder="Street address, city, state, ZIP"
          className="w-full bg-bg border border-border px-4 py-3 text-cream text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full sm:w-auto disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Warranty Claim'}
      </button>
    </form>
  )
}
