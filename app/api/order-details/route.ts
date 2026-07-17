import { NextRequest, NextResponse } from 'next/server'
import { getStripe, isStripeConfigured } from '@/lib/stripe'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId || !isStripeConfigured()) {
    return NextResponse.json({ error: 'Missing session' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      productName: session.metadata?.productName ?? '',
      productId: session.metadata?.productId ?? '',
      variant: session.metadata?.variantLabel ?? '',
      quantity: parseInt(session.metadata?.quantity ?? '1', 10) || 1,
      total: (session.amount_total ?? 0) / 100,
      currency: session.currency ?? 'usd',
    })
  } catch {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
}
