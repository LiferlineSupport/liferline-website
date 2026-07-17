import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { decrementInventory } from '@/lib/inventory'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[webhook] Missing signature or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[webhook] Signature verification failed: ${message}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const productId = session.metadata?.productId
    const variant = session.metadata?.variant ?? undefined
    const quantity = Math.max(parseInt(session.metadata?.quantity ?? '1', 10) || 1, 1)
    const orderId = session.id
    const customerName = session.customer_details?.name ?? ''
    const customerEmail = session.customer_details?.email ?? ''

    if (!productId) {
      console.error(`[webhook] checkout.session.completed missing productId metadata. Session: ${orderId}`)
      return NextResponse.json({ received: true })
    }

    const result = decrementInventory(orderId, productId, quantity, customerName, customerEmail, variant)

    if (!result.success) {
      console.error(`[webhook] Inventory decrement failed for order ${orderId}: ${result.error}`)
    } else if (result.warning) {
      console.warn(`[webhook] ${result.warning}`)
    } else {
      console.log(`[webhook] Order ${orderId}: decremented ${result.sku} from ${result.previousQty} to ${result.newQty}`)
    }
  }

  return NextResponse.json({ received: true })
}
