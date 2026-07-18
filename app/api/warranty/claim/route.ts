import { NextRequest, NextResponse } from 'next/server'
import { submitClaim } from '@/lib/warranty'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VALID_ISSUE_TYPES = [
  'broken-connector',
  'bad-solder',
  'damaged-jacket',
  'signal-degradation',
  'wear-and-tear',
  'other',
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customerName, customerEmail, orderId, sku, issueType, description, shippingAddress } = body

    if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 1) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    if (!customerEmail || typeof customerEmail !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const cleanEmail = customerEmail.trim().toLowerCase()
    if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 254) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!issueType || !VALID_ISSUE_TYPES.includes(issueType)) {
      return NextResponse.json({ error: 'Please select an issue type.' }, { status: 400 })
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json({ error: 'Please describe the issue (at least 10 characters).' }, { status: 400 })
    }

    if (description.length > 2000) {
      return NextResponse.json({ error: 'Description is too long (max 2000 characters).' }, { status: 400 })
    }

    if (!shippingAddress || typeof shippingAddress !== 'string' || shippingAddress.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide your shipping address for the replacement.' }, { status: 400 })
    }

    const claim = submitClaim({
      customerName: customerName.trim(),
      customerEmail: cleanEmail,
      orderId: typeof orderId === 'string' ? orderId.trim() : '',
      sku: typeof sku === 'string' ? sku.trim() : '',
      issueType,
      description: description.trim(),
      shippingAddress: shippingAddress.trim().slice(0, 500),
    })

    return NextResponse.json({ ok: true, claimId: claim.id })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
