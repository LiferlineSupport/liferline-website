'use client'

import { useState } from 'react'

interface WarrantyRecord {
  date: string
  orderId: string
  sku: string
  qtyShipped: number
  customerName: string
}

interface WarrantyClaim {
  id: string
  date: string
  issueType: string
  description: string
  status: string
  sku: string
}

const SKU_NAMES: Record<string, string> = {
  'WH-6': 'The Workhorse 6"',
  'WH-12': 'The Workhorse 12"',
  'WH-18': 'The Workhorse 18"',
  'RA-6': 'The Right Angle 6"',
  'RA-12': 'The Right Angle 12"',
  'PBP-MIX': 'The Pedalboard Pack',
  'SC-10': 'The Stage Cable 10ft',
  'SC-15': 'The Stage Cable 15ft',
  'SC-20': 'The Stage Cable 20ft',
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    submitted: 'Claim Received',
    approved: 'Approved',
    shipped: 'Replacement Shipped',
    resolved: 'Resolved',
  }
  return labels[status] ?? status
}

export default function WarrantyLookup() {
  const [email, setEmail] = useState('')
  const [records, setRecords] = useState<WarrantyRecord[] | null>(null)
  const [claims, setClaims] = useState<WarrantyClaim[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setRecords(null)
    setClaims([])
    setSearched(false)

    try {
      const res = await fetch('/api/warranty/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }

      setRecords(data.records)
      setClaims(data.claims)
      setSearched(true)
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 bg-bg border border-border px-4 py-3 text-cream text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary whitespace-nowrap disabled:opacity-50"
        >
          {loading ? 'Looking up...' : 'Look Up Warranty'}
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-sm mb-6">{error}</p>
      )}

      {searched && records !== null && records.length === 0 && (
        <div className="bg-card border border-border p-6 mb-8">
          <p className="text-muted text-sm leading-relaxed">
            We did not find any orders associated with that email address. If you purchased
            a Forever Cable and it is not showing up, no worries. Email us at{' '}
            <a href="mailto:support@liferline.com" className="text-accent hover:underline">
              support@liferline.com
            </a>{' '}
            and we will sort it out. The guarantee follows the cable, not the receipt.
          </p>
        </div>
      )}

      {records && records.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xs tracking-[0.15em] uppercase text-muted mb-4 font-semibold">
            Your Covered Cables
          </h3>
          <div className="space-y-3">
            {records.map((r, i) => (
              <div key={i} className="bg-card border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-cream font-semibold text-sm">
                    {SKU_NAMES[r.sku] ?? r.sku}
                    {r.qtyShipped > 1 && <span className="text-muted"> x{r.qtyShipped}</span>}
                  </p>
                  <p className="text-muted text-xs mt-1">
                    Purchased {formatDate(r.date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-400 text-xs font-semibold tracking-wide uppercase">
                    Lifetime Warranty Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {claims.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs tracking-[0.15em] uppercase text-muted mb-4 font-semibold">
            Your Warranty Claims
          </h3>
          <div className="space-y-3">
            {claims.map((c) => (
              <div key={c.id} className="bg-card border border-border p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <p className="text-cream text-sm font-semibold">
                    Claim {c.id}
                  </p>
                  <span className="text-accent text-xs font-semibold tracking-wide uppercase">
                    {statusLabel(c.status)}
                  </span>
                </div>
                <p className="text-muted text-xs">
                  {SKU_NAMES[c.sku] ?? c.sku} &middot; Filed {formatDate(c.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
