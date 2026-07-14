import { NextRequest, NextResponse } from 'next/server'
import { getStripe, isStripeConfigured } from '@/lib/stripe'
import { products } from '@/lib/products'

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Checkout is not yet configured. Please contact us at support@liferline.com to place an order.' },
      { status: 503 }
    )
  }

  try {
    const { productId, variant } = await req.json()

    const product = products.find((p) => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    if (!product.stripePriceId) {
      return NextResponse.json(
        { error: 'This product is not yet available for purchase online. Contact us to order.' },
        { status: 503 }
      )
    }

    const stripe = getStripe()
    const origin = req.headers.get('origin') ?? 'https://liferline.com'

    const variantLabel = product.variants.find((v) => v.value === variant)?.label

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        productId: product.id,
        productName: product.name,
        variant: variantLabel ?? '',
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      custom_text: {
        submit: {
          message: 'Every Liferline cable is backed by a no-questions-asked lifetime guarantee.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
