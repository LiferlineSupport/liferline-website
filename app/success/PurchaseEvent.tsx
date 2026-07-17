'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PurchaseEvent() {
  const fired = useRef(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const sessionId = searchParams.get('session_id')

    async function trackPurchase() {
      let orderData: {
        productName: string
        productId: string
        variant: string
        quantity: number
        total: number
        currency: string
      } | null = null

      if (sessionId) {
        try {
          const res = await fetch(`/api/order-details?session_id=${encodeURIComponent(sessionId)}`)
          if (res.ok) orderData = await res.json()
        } catch {
          // Fall through to fire events without value
        }
      }

      if (typeof window !== 'undefined' && (window as any).plausible) {
        ;(window as any).plausible('purchase', {
          revenue: orderData ? { currency: 'USD', amount: orderData.total } : undefined,
          props: orderData
            ? { product_name: orderData.productName, quantity: String(orderData.quantity) }
            : undefined,
        })
      }

      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Purchase', orderData
          ? {
              content_ids: [orderData.productId],
              content_name: orderData.productName,
              content_type: 'product',
              value: orderData.total,
              currency: 'USD',
              num_items: orderData.quantity,
            }
          : undefined
        )
      }

      if (typeof window !== 'undefined' && (window as any).gtag) {
        if (orderData) {
          ;(window as any).gtag('event', 'purchase', {
            currency: 'USD',
            value: orderData.total,
            transaction_id: sessionId,
            items: [{
              item_id: orderData.productId,
              item_name: orderData.productName,
              item_variant: orderData.variant || undefined,
              price: orderData.total / orderData.quantity,
              quantity: orderData.quantity,
            }],
          })
        }

        const conversionId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID
        const conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL
        if (conversionId && conversionLabel) {
          ;(window as any).gtag('event', 'conversion', {
            send_to: `${conversionId}/${conversionLabel}`,
            value: orderData?.total,
            currency: 'USD',
            transaction_id: sessionId,
          })
        }
      }
    }

    trackPurchase()
  }, [searchParams])

  return null
}
