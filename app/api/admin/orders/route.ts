import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getShipmentLog } from '@/lib/inventory'

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  const records = getShipmentLog()
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') ?? '50', 10) || 50, 200)
  const recent = records.slice(-limit).reverse()

  return NextResponse.json({
    total: records.length,
    showing: recent.length,
    orders: recent,
  })
}
