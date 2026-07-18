import { NextRequest, NextResponse } from 'next/server'

export function requireAdmin(req: NextRequest): NextResponse | null {
  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Admin access not configured' }, { status: 503 })
  }

  const auth = req.headers.get('authorization')
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  const queryToken = req.nextUrl.searchParams.get('key')

  if (token !== secret && queryToken !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}
