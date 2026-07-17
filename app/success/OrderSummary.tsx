'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface OrderData {
  productName: string
  productId: string
  variant: string
  quantity: number
  total: number
  currency: string
}

export default function OrderSummary() {
  const searchParams = useSearchParams()
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return

    fetch(`/api/order-details?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setOrder(data) })
      .catch(() => {})
  }, [searchParams])

  if (!order) return null

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.total)

  return (
    <div className="bg-card border border-border p-6 mb-6 text-left">
      <p className="text-xs tracking-[0.15em] uppercase text-muted mb-4 font-semibold">
        Order summary
      </p>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-cream font-medium">{order.productName}</p>
          {order.variant && (
            <p className="text-xs text-muted">{order.variant}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-cream font-serif text-lg">{formattedTotal}</p>
          {order.quantity > 1 && (
            <p className="text-xs text-muted">Qty: {order.quantity}</p>
          )}
        </div>
      </div>
      <div className="border-t border-border mt-4 pt-3">
        <p className="text-xs text-muted">
          Free shipping included. Allow 3 to 7 business days for delivery.
        </p>
      </div>
    </div>
  )
}
