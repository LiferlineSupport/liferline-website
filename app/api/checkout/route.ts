import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe, isStripeConfigured } from '@/lib/stripe'
import { products, getVariantPriceId, getConfigurablePrice } from '@/lib/products'

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Checkout is not yet configured. Please contact us at support@liferline.com to place an order.' },
      { status: 503 }
    )
  }

  try {
    const { productId, variant, endA, endB, finish, quantity: rawQty } = await req.json()

    const quantity = Math.min(Math.max(Math.floor(Number(rawQty) || 1), 1), 10)

    const product = products.find((p) => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    const variantLabel = product.variants.find((v) => v.value === variant)?.label

    let lineItem: Stripe.Checkout.SessionCreateParams.LineItem
    let endALabel: string | undefined
    let endBLabel: string | undefined
    let finishLabel: string | undefined

    if (product.plugCostCents) {
      const endAOpt = product.endOptions?.find((o) => o.value === endA)
      const endBOpt = product.endOptions?.find((o) => o.value === endB)
      const finishOpt = product.finishOptions?.find((o) => o.value === finish)
      if (!endAOpt || !endBOpt || !finishOpt) {
        return NextResponse.json({ error: 'Invalid connector or finish selection.' }, { status: 400 })
      }
      endALabel = endAOpt.label
      endBLabel = endBOpt.label
      finishLabel = finishOpt.label

      const unitAmount = getConfigurablePrice(product, variant, endA, endB, finish)
      if (!unitAmount) {
        return NextResponse.json(
          { error: 'This configuration is not available. Contact us to order.' },
          { status: 503 }
        )
      }

      lineItem = {
        price_data: {
          currency: product.currency,
          unit_amount: unitAmount,
          product_data: {
            name: [product.name, variantLabel, `${endALabel}/${endBLabel}`, finishLabel]
              .filter(Boolean)
              .join(' - '),
          },
        },
        quantity,
      }
    } else {
      const priceId = getVariantPriceId(product, variant)
      if (!priceId) {
        return NextResponse.json(
          { error: 'This product is not yet available for purchase online. Contact us to order.' },
          { status: 503 }
        )
      }
      lineItem = { price: priceId, quantity }
    }

    const stripe = getStripe()
    const origin = req.headers.get('origin') ?? 'https://liferline.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [lineItem],
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      metadata: {
        productId: product.id,
        productName: product.name,
        variant: variant ?? '',
        variantLabel: variantLabel ?? '',
        endA: endA ?? '',
        endALabel: endALabel ?? '',
        endB: endB ?? '',
        endBLabel: endBLabel ?? '',
        finish: finish ?? '',
        finishLabel: finishLabel ?? '',
        quantity: String(quantity),
      },
      allow_promotion_codes: true,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      custom_text: {
        submit: {
          message: 'Every Forever Cable is backed by a no-questions-asked Forever Guarantee.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
