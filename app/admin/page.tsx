'use client'

import { useState, useEffect, useCallback } from 'react'

interface InventoryItem {
  sku: string
  cableType: string
  lengthIn: string
  connectorConfig: string
  qtyOnHand: number
  reorderThreshold: number
  unitCostUsd: number
  lastUpdated: string
}

interface ShipmentRecord {
  date: string
  orderId: string
  sku: string
  qtyShipped: number
  customerName: string
  customerEmail: string
  notes: string
}

interface WarrantyClaim {
  id: string
  date: string
  customerName: string
  customerEmail: string
  orderId: string
  sku: string
  issueType: string
  description: string
  status: 'submitted' | 'approved' | 'shipped' | 'resolved'
}

type Tab = 'inventory' | 'orders' | 'claims' | 'copy'

async function apiFetch(path: string, key: string, opts?: RequestInit) {
  const res = await fetch(`/api/admin/${path}`, {
    ...opts,
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(data.error || res.statusText)
  }
  return res.json()
}

function LoginForm({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await apiFetch('inventory', key)
      onLogin(key)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-border p-8 bg-card">
        <h1 className="font-serif text-2xl text-cream mb-6">Admin Dashboard</h1>
        <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
          Admin Key
        </label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full bg-bg border border-border text-cream px-3 py-2 text-sm mb-4 focus:outline-none focus:border-accent"
          placeholder="Enter admin secret"
          autoFocus
        />
        {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading || !key}
          className="btn-primary w-full text-center disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

function InventoryPanel({ apiKey }: { apiKey: string }) {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [alerts, setAlerts] = useState<{ lowStock: string[]; outOfStock: string[] }>({ lowStock: [], outOfStock: [] })
  const [loading, setLoading] = useState(true)
  const [adjustSku, setAdjustSku] = useState('')
  const [adjustQty, setAdjustQty] = useState('')
  const [adjustNote, setAdjustNote] = useState('')
  const [adjusting, setAdjusting] = useState(false)
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    try {
      const data = await apiFetch('inventory', apiKey)
      setItems(data.inventory)
      setAlerts(data.alerts)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [apiKey])

  useEffect(() => { load() }, [load])

  async function handleAdjust(e: React.FormEvent) {
    e.preventDefault()
    const qty = parseInt(adjustQty, 10)
    if (!adjustSku || !qty) return
    setAdjusting(true)
    setMessage('')
    try {
      const result = await apiFetch('inventory', apiKey, {
        method: 'POST',
        body: JSON.stringify({ sku: adjustSku, qty, note: adjustNote }),
      })
      setMessage(`${result.sku}: ${result.previousQty} → ${result.newQty}`)
      setAdjustQty('')
      setAdjustNote('')
      load()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed')
    } finally {
      setAdjusting(false)
    }
  }

  if (loading) return <p className="text-muted">Loading inventory...</p>

  return (
    <div>
      {(alerts.outOfStock.length > 0 || alerts.lowStock.length > 0) && (
        <div className="border border-red-500/30 bg-red-500/5 p-4 mb-6">
          {alerts.outOfStock.length > 0 && (
            <p className="text-red-400 text-sm font-semibold mb-1">
              Out of stock: {alerts.outOfStock.join(', ')}
            </p>
          )}
          {alerts.lowStock.length > 0 && (
            <p className="text-yellow-400 text-sm">
              Low stock: {alerts.lowStock.join(', ')}
            </p>
          )}
        </div>
      )}

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-[0.1em] uppercase text-muted">
              <th className="py-3 pr-4">SKU</th>
              <th className="py-3 pr-4">Type</th>
              <th className="py-3 pr-4">Length</th>
              <th className="py-3 pr-4 text-right">On Hand</th>
              <th className="py-3 pr-4 text-right">Reorder At</th>
              <th className="py-3 pr-4 text-right">Unit Cost</th>
              <th className="py-3">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.sku}
                className={`border-b border-border/50 ${
                  item.qtyOnHand <= 0
                    ? 'text-red-400'
                    : item.qtyOnHand <= item.reorderThreshold
                    ? 'text-yellow-400'
                    : 'text-cream'
                }`}
              >
                <td className="py-3 pr-4 font-mono font-semibold">{item.sku}</td>
                <td className="py-3 pr-4">{item.cableType}</td>
                <td className="py-3 pr-4">{item.lengthIn}</td>
                <td className="py-3 pr-4 text-right font-mono">{item.qtyOnHand}</td>
                <td className="py-3 pr-4 text-right text-muted">{item.reorderThreshold}</td>
                <td className="py-3 pr-4 text-right text-muted">${item.unitCostUsd.toFixed(2)}</td>
                <td className="py-3 text-muted text-xs">
                  {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : 'Never'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-border p-6 bg-card">
        <h3 className="text-xs tracking-[0.15em] uppercase text-cream font-semibold mb-4">
          Adjust Stock
        </h3>
        <form onSubmit={handleAdjust} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs text-muted mb-1">SKU</label>
            <select
              value={adjustSku}
              onChange={(e) => setAdjustSku(e.target.value)}
              className="w-full bg-bg border border-border text-cream px-3 py-2 text-sm focus:outline-none focus:border-accent"
            >
              <option value="">Select SKU</option>
              {items.map((i) => (
                <option key={i.sku} value={i.sku}>{i.sku} ({i.qtyOnHand} on hand)</option>
              ))}
            </select>
          </div>
          <div className="w-24">
            <label className="block text-xs text-muted mb-1">Qty (+/-)</label>
            <input
              type="number"
              value={adjustQty}
              onChange={(e) => setAdjustQty(e.target.value)}
              className="w-full bg-bg border border-border text-cream px-3 py-2 text-sm focus:outline-none focus:border-accent"
              placeholder="+5"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-muted mb-1">Note (optional)</label>
            <input
              type="text"
              value={adjustNote}
              onChange={(e) => setAdjustNote(e.target.value)}
              className="w-full bg-bg border border-border text-cream px-3 py-2 text-sm focus:outline-none focus:border-accent"
              placeholder="Built 5 more Workhorse 6in"
            />
          </div>
          <button
            type="submit"
            disabled={adjusting || !adjustSku || !adjustQty}
            className="btn-primary whitespace-nowrap disabled:opacity-50"
          >
            {adjusting ? 'Saving...' : 'Update'}
          </button>
        </form>
        {message && <p className="text-accent text-sm mt-3">{message}</p>}
      </div>
    </div>
  )
}

function OrdersPanel({ apiKey }: { apiKey: string }) {
  const [orders, setOrders] = useState<ShipmentRecord[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('orders', apiKey)
      .then((data) => {
        setOrders(data.orders)
        setTotal(data.total)
      })
      .finally(() => setLoading(false))
  }, [apiKey])

  if (loading) return <p className="text-muted">Loading orders...</p>
  if (orders.length === 0) return <p className="text-muted">No orders yet.</p>

  return (
    <div>
      <p className="text-muted text-sm mb-4">{total} total shipment records</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-[0.1em] uppercase text-muted">
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Order ID</th>
              <th className="py-3 pr-4">SKU</th>
              <th className="py-3 pr-4 text-right">Qty</th>
              <th className="py-3 pr-4">Customer</th>
              <th className="py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={`${o.orderId}-${i}`} className="border-b border-border/50 text-cream">
                <td className="py-3 pr-4 text-xs text-muted whitespace-nowrap">
                  {new Date(o.date).toLocaleDateString()}
                </td>
                <td className="py-3 pr-4 font-mono text-xs max-w-[120px] truncate" title={o.orderId}>
                  {o.orderId.slice(0, 16)}...
                </td>
                <td className="py-3 pr-4 font-mono font-semibold">{o.sku}</td>
                <td className="py-3 pr-4 text-right">{o.qtyShipped}</td>
                <td className="py-3 pr-4">{o.customerName || o.customerEmail}</td>
                <td className="py-3 text-xs text-muted max-w-[200px] truncate" title={o.notes}>
                  {o.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ClaimsPanel({ apiKey }: { apiKey: string }) {
  const [claims, setClaims] = useState<WarrantyClaim[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const data = await apiFetch('warranty-claims', apiKey)
      setClaims(data.claims)
      setTotal(data.total)
    } finally {
      setLoading(false)
    }
  }, [apiKey])

  useEffect(() => { load() }, [load])

  async function handleStatusChange(claimId: string, status: WarrantyClaim['status']) {
    setUpdating(claimId)
    try {
      await apiFetch('warranty-claims', apiKey, {
        method: 'PATCH',
        body: JSON.stringify({ claimId, status }),
      })
      load()
    } finally {
      setUpdating(null)
    }
  }

  if (loading) return <p className="text-muted">Loading claims...</p>
  if (claims.length === 0) return <p className="text-muted">No warranty claims yet.</p>

  const statusColors: Record<string, string> = {
    submitted: 'text-yellow-400',
    approved: 'text-blue-400',
    shipped: 'text-purple-400',
    resolved: 'text-green-400',
  }

  return (
    <div>
      <p className="text-muted text-sm mb-4">{total} total warranty claims</p>
      <div className="space-y-4">
        {claims.map((claim) => (
          <div key={claim.id} className="border border-border p-4 bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <span className="font-mono text-xs text-muted">{claim.id}</span>
              <span className={`text-xs font-semibold uppercase tracking-wider ${statusColors[claim.status] || 'text-muted'}`}>
                {claim.status}
              </span>
              <span className="text-xs text-muted ml-auto">
                {new Date(claim.date).toLocaleDateString()}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
              <div><span className="text-muted">Customer:</span> {claim.customerName}</div>
              <div><span className="text-muted">Email:</span> {claim.customerEmail}</div>
              <div><span className="text-muted">SKU:</span> <span className="font-mono">{claim.sku}</span></div>
              <div><span className="text-muted">Issue:</span> {claim.issueType}</div>
            </div>
            <p className="text-sm text-muted mb-3">{claim.description}</p>
            <div className="flex gap-2">
              {(['submitted', 'approved', 'shipped', 'resolved'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(claim.id, s)}
                  disabled={claim.status === s || updating === claim.id}
                  className={`text-xs px-3 py-1 border transition-colors ${
                    claim.status === s
                      ? 'border-accent text-accent'
                      : 'border-border text-muted hover:text-cream hover:border-cream'
                  } disabled:opacity-50`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Copy Editor ────────────────────────────────────────────────────────────

interface ProductCopy {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  specs: string[]
  hasOverrides: boolean
}

interface BlogSection {
  heading?: string
  paragraphs: string[]
}

interface BlogPostCopy {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  cta: string
  sections: BlogSection[]
  hasOverrides: boolean
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-1 font-semibold">
      {children}
    </label>
  )
}

function TInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-bg border border-border text-cream px-3 py-2 text-sm focus:outline-none focus:border-accent"
    />
  )
}

function TArea({ value, onChange, rows = 4, mono = false }: {
  value: string
  onChange: (v: string) => void
  rows?: number
  mono?: boolean
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`w-full bg-bg border border-border text-cream px-3 py-2 text-sm focus:outline-none focus:border-accent resize-y${mono ? ' font-mono text-xs' : ''}`}
    />
  )
}

function ProductEditor({ product, apiKey, onSave }: {
  product: ProductCopy
  apiKey: string
  onSave: () => void
}) {
  const [name, setName] = useState(product.name)
  const [tagline, setTagline] = useState(product.tagline)
  const [description, setDescription] = useState(product.description)
  const [longDescription, setLongDescription] = useState(product.longDescription)
  const [specs, setSpecs] = useState(product.specs.join('\n'))
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setName(product.name)
    setTagline(product.tagline)
    setDescription(product.description)
    setLongDescription(product.longDescription)
    setSpecs(product.specs.join('\n'))
    setMsg('')
  }, [product.id])  // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave() {
    setSaving(true)
    setMsg('')
    try {
      await apiFetch('copy', apiKey, {
        method: 'PATCH',
        body: JSON.stringify({
          type: 'product',
          id: product.id,
          fields: {
            name: name.trim(),
            tagline: tagline.trim(),
            description: description.trim(),
            longDescription: longDescription.trim(),
            specs: specs.split('\n').map((s) => s.trim()).filter(Boolean),
          },
        }),
      })
      setMsg('Saved!')
      onSave()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleReset() {
    if (!confirm('Reset to the built-in default? Your edits will be lost.')) return
    setSaving(true)
    try {
      await apiFetch('copy', apiKey, {
        method: 'PATCH',
        body: JSON.stringify({ type: 'product', id: product.id, reset: true }),
      })
      setMsg('Reset to default.')
      onSave()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <h3 className="font-serif text-xl text-cream">{product.name}</h3>
        {product.hasOverrides && (
          <span className="text-xs border border-accent text-accent px-2 py-0.5">Edited</span>
        )}
      </div>

      <div>
        <FieldLabel>Name</FieldLabel>
        <TInput value={name} onChange={setName} />
      </div>
      <div>
        <FieldLabel>Tagline</FieldLabel>
        <TInput value={tagline} onChange={setTagline} />
      </div>
      <div>
        <FieldLabel>Short Description (product cards)</FieldLabel>
        <TArea value={description} onChange={setDescription} rows={3} />
      </div>
      <div>
        <FieldLabel>Long Description (product detail page)</FieldLabel>
        <TArea value={longDescription} onChange={setLongDescription} rows={6} />
      </div>
      <div>
        <FieldLabel>Specs — one bullet per line</FieldLabel>
        <TArea value={specs} onChange={setSpecs} rows={8} mono />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {product.hasOverrides && (
          <button
            onClick={handleReset}
            disabled={saving}
            className="text-xs text-muted hover:text-red-400 transition-colors"
          >
            Reset to default
          </button>
        )}
        {msg && <span className="text-xs text-accent">{msg}</span>}
      </div>
    </div>
  )
}

function BlogPostEditor({ post, apiKey, onSave }: {
  post: BlogPostCopy
  apiKey: string
  onSave: () => void
}) {
  const [title, setTitle] = useState(post.title)
  const [metaTitle, setMetaTitle] = useState(post.metaTitle)
  const [metaDesc, setMetaDesc] = useState(post.metaDescription)
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [cta, setCta] = useState(post.cta)
  const [sections, setSections] = useState<BlogSection[]>(post.sections)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setTitle(post.title)
    setMetaTitle(post.metaTitle)
    setMetaDesc(post.metaDescription)
    setExcerpt(post.excerpt)
    setCta(post.cta)
    setSections(post.sections)
    setMsg('')
  }, [post.slug])  // eslint-disable-line react-hooks/exhaustive-deps

  function updateSection(i: number, patch: Partial<BlogSection>) {
    setSections((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))
  }

  function parseSectionText(text: string): string[] {
    return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  }

  async function handleSave() {
    setSaving(true)
    setMsg('')
    try {
      await apiFetch('copy', apiKey, {
        method: 'PATCH',
        body: JSON.stringify({
          type: 'blogPost',
          id: post.slug,
          fields: {
            title: title.trim(),
            metaTitle: metaTitle.trim(),
            metaDescription: metaDesc.trim(),
            excerpt: excerpt.trim(),
            cta: cta.trim(),
            sections,
          },
        }),
      })
      setMsg('Saved!')
      onSave()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleReset() {
    if (!confirm('Reset to the built-in default? Your edits will be lost.')) return
    setSaving(true)
    try {
      await apiFetch('copy', apiKey, {
        method: 'PATCH',
        body: JSON.stringify({ type: 'blogPost', id: post.slug, reset: true }),
      })
      setMsg('Reset to default.')
      onSave()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1 flex-wrap">
        <h3 className="font-serif text-lg text-cream leading-snug">{post.title}</h3>
        {post.hasOverrides && (
          <span className="shrink-0 text-xs border border-accent text-accent px-2 py-0.5">Edited</span>
        )}
      </div>

      <div>
        <FieldLabel>Title (shown on page)</FieldLabel>
        <TInput value={title} onChange={setTitle} />
      </div>
      <div>
        <FieldLabel>Meta Title (browser tab / Google)</FieldLabel>
        <TInput value={metaTitle} onChange={setMetaTitle} />
      </div>
      <div>
        <FieldLabel>Meta Description (Google snippet — keep under 160 chars)</FieldLabel>
        <TArea value={metaDesc} onChange={setMetaDesc} rows={2} />
      </div>
      <div>
        <FieldLabel>Excerpt (blog index preview)</FieldLabel>
        <TArea value={excerpt} onChange={setExcerpt} rows={3} />
      </div>
      <div>
        <FieldLabel>CTA (call-to-action at end of post)</FieldLabel>
        <TArea value={cta} onChange={setCta} rows={2} />
      </div>

      <div>
        <FieldLabel>Article Sections</FieldLabel>
        <div className="space-y-4 mt-2">
          {sections.map((s, i) => (
            <div key={i} className="border border-border p-4 bg-card space-y-3">
              <p className="text-xs text-muted">Section {i + 1}</p>
              <div>
                <label className="block text-xs text-muted mb-1">Heading (leave blank if none)</label>
                <TInput
                  value={s.heading ?? ''}
                  onChange={(v) => updateSection(i, { heading: v || undefined })}
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">
                  Paragraphs — separate with a blank line between each
                </label>
                <TArea
                  value={s.paragraphs.join('\n\n')}
                  onChange={(v) => updateSection(i, { paragraphs: parseSectionText(v) })}
                  rows={6}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {post.hasOverrides && (
          <button
            onClick={handleReset}
            disabled={saving}
            className="text-xs text-muted hover:text-red-400 transition-colors"
          >
            Reset to default
          </button>
        )}
        {msg && <span className="text-xs text-accent">{msg}</span>}
      </div>
    </div>
  )
}

type CopySubTab = 'products' | 'blogPosts'

function CopyPanel({ apiKey }: { apiKey: string }) {
  const [subTab, setSubTab] = useState<CopySubTab>('products')
  const [allProducts, setAllProducts] = useState<ProductCopy[]>([])
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPostCopy[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [loadErr, setLoadErr] = useState('')

  const load = useCallback(async () => {
    try {
      const data = await apiFetch('copy', apiKey)
      setAllProducts(data.products)
      setAllBlogPosts(data.blogPosts)
      if (!selectedProduct && data.products.length > 0) setSelectedProduct(data.products[0].id)
      if (!selectedPost && data.blogPosts.length > 0) setSelectedPost(data.blogPosts[0].slug)
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [apiKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load() }, [load])

  if (loading) return <p className="text-muted">Loading copy data…</p>
  if (loadErr) return <p className="text-red-400 text-sm">{loadErr}</p>

  const currentProduct = allProducts.find((p) => p.id === selectedProduct) ?? null
  const currentPost = allBlogPosts.find((p) => p.slug === selectedPost) ?? null

  const subTabs: { key: CopySubTab; label: string }[] = [
    { key: 'products', label: 'Products' },
    { key: 'blogPosts', label: 'Blog Posts' },
  ]

  return (
    <div>
      <p className="text-xs text-muted mb-5">
        Edits save to a live overrides file on the server. Changes appear on the website immediately after saving.
        Use &ldquo;Reset to default&rdquo; to revert any field back to the original source copy.
      </p>

      <div className="flex gap-6 border-b border-border mb-6">
        {subTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSubTab(t.key)}
            className={`pb-2 text-xs tracking-[0.1em] uppercase transition-colors border-b-2 -mb-px ${
              subTab === t.key
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-cream'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'products' && (
        <div className="flex gap-6">
          <div className="w-44 shrink-0 space-y-1">
            {allProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p.id)}
                className={`w-full text-left px-3 py-2 text-sm border transition-colors ${
                  selectedProduct === p.id
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-border text-muted hover:text-cream'
                }`}
              >
                <span className="block truncate">{p.name}</span>
                {p.hasOverrides && <span className="block text-[10px] text-accent/70">edited</span>}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-0">
            {currentProduct ? (
              <ProductEditor
                key={currentProduct.id}
                product={currentProduct}
                apiKey={apiKey}
                onSave={load}
              />
            ) : (
              <p className="text-muted text-sm">Select a product to edit</p>
            )}
          </div>
        </div>
      )}

      {subTab === 'blogPosts' && (
        <div className="flex gap-6">
          <div className="w-44 shrink-0 space-y-1 max-h-[65vh] overflow-y-auto">
            {allBlogPosts.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedPost(p.slug)}
                className={`w-full text-left px-3 py-2 text-sm border transition-colors ${
                  selectedPost === p.slug
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-border text-muted hover:text-cream'
                }`}
              >
                <span className="block text-xs leading-snug line-clamp-2">{p.title}</span>
                {p.hasOverrides && <span className="block text-[10px] text-accent/70">edited</span>}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-0 max-h-[65vh] overflow-y-auto pr-2">
            {currentPost ? (
              <BlogPostEditor
                key={currentPost.slug}
                post={currentPost}
                apiKey={apiKey}
                onSave={load}
              />
            ) : (
              <p className="text-muted text-sm">Select a blog post to edit</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('inventory')

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_key')
    if (stored) setApiKey(stored)
  }, [])

  function handleLogin(key: string) {
    sessionStorage.setItem('admin_key', key)
    setApiKey(key)
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_key')
    setApiKey(null)
  }

  if (!apiKey) return <LoginForm onLogin={handleLogin} />

  const tabs: { key: Tab; label: string }[] = [
    { key: 'inventory', label: 'Inventory' },
    { key: 'orders', label: 'Orders' },
    { key: 'claims', label: 'Warranty Claims' },
    { key: 'copy', label: 'Copy Editor' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2 font-semibold">
            Admin Dashboard
          </p>
          <h1 className="font-serif text-3xl text-cream">
            LiferLine
          </h1>
        </div>
        <button onClick={handleLogout} className="text-xs text-muted hover:text-cream transition-colors">
          Sign Out
        </button>
      </div>

      <div className="flex gap-4 border-b border-border mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-sm tracking-wide transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-cream'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'inventory' && <InventoryPanel apiKey={apiKey} />}
      {tab === 'orders' && <OrdersPanel apiKey={apiKey} />}
      {tab === 'claims' && <ClaimsPanel apiKey={apiKey} />}
      {tab === 'copy' && <CopyPanel apiKey={apiKey} />}
    </div>
  )
}
