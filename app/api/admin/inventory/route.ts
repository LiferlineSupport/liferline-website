import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getInventory, adjustStock, checkStock } from '@/lib/inventory'

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  const items = getInventory()
  const { lowStock, outOfStock } = checkStock()

  return NextResponse.json({
    inventory: items,
    alerts: {
      lowStock: lowStock.map((i) => i.sku),
      outOfStock: outOfStock.map((i) => i.sku),
    },
  })
}

export async function POST(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const { sku, qty, note } = await req.json()

    if (!sku || typeof sku !== 'string') {
      return NextResponse.json({ error: 'sku is required' }, { status: 400 })
    }
    if (typeof qty !== 'number' || !Number.isInteger(qty) || qty === 0) {
      return NextResponse.json({ error: 'qty must be a non-zero integer' }, { status: 400 })
    }

    const result = adjustStock(sku, qty, note ?? '')
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
