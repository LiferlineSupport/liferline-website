import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getAllClaims, updateClaimStatus, WarrantyClaim } from '@/lib/warranty'

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  const claims = getAllClaims()
  const statusFilter = req.nextUrl.searchParams.get('status') as WarrantyClaim['status'] | null

  const filtered = statusFilter
    ? claims.filter((c) => c.status === statusFilter)
    : claims

  return NextResponse.json({
    total: claims.length,
    showing: filtered.length,
    claims: filtered.reverse(),
  })
}

export async function PATCH(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const { claimId, status } = await req.json()

    if (!claimId || typeof claimId !== 'string') {
      return NextResponse.json({ error: 'claimId is required' }, { status: 400 })
    }

    const validStatuses: WarrantyClaim['status'][] = ['submitted', 'approved', 'shipped', 'resolved']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: `status must be one of: ${validStatuses.join(', ')}` }, { status: 400 })
    }

    const updated = updateClaimStatus(claimId, status)
    if (!updated) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
