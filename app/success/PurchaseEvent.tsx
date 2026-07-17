'use client'

import { useEffect, useRef } from 'react'

export default function PurchaseEvent() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('purchase')
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'Purchase')
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      const conversionId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID
      const conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL
      if (conversionId && conversionLabel) {
        ;(window as any).gtag('event', 'conversion', {
          send_to: `${conversionId}/${conversionLabel}`,
        })
      }
    }
  }, [])

  return null
}
