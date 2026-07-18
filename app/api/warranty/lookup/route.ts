import { NextRequest, NextResponse } from 'next/server'
import { lookupWarranty, getClaimsForEmail } from '@/lib/warranty'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const cleaned = email.trim().toLowerCase()
    if (!EMAIL_RE.test(cleaned) || cleaned.length > 254) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const records = lookupWarranty(cleaned)
    const claims = getClaimsForEmail(cleaned)

    return NextResponse.json({ records, claims })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
