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
  }, [])

  return null
}
