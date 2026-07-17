import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const INVENTORY_FILE = path.join(DATA_DIR, 'finished_goods.json')
const SHIPMENT_LOG_FILE = path.join(DATA_DIR, 'shipment_log.json')

export interface InventoryItem {
  sku: string
  cableType: string
  lengthIn: string
  connectorConfig: string
  qtyOnHand: number
  reorderThreshold: number
  unitCostUsd: number
  lastUpdated: string
}

export interface ShipmentRecord {
  date: string
  orderId: string
  sku: string
  qtyShipped: number
  customerName: string
  customerEmail: string
  notes: string
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

const DEFAULT_INVENTORY: InventoryItem[] = [
  { sku: 'WH-6', cableType: 'patch', lengthIn: '6', connectorConfig: 'straight-straight', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 4.5, lastUpdated: '' },
  { sku: 'WH-12', cableType: 'patch', lengthIn: '12', connectorConfig: 'straight-straight', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 5.5, lastUpdated: '' },
  { sku: 'WH-18', cableType: 'patch', lengthIn: '18', connectorConfig: 'straight-straight', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 6.5, lastUpdated: '' },
  { sku: 'RA-6', cableType: 'patch', lengthIn: '6', connectorConfig: 'straight-right-angle', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 5.0, lastUpdated: '' },
  { sku: 'RA-12', cableType: 'patch', lengthIn: '12', connectorConfig: 'straight-right-angle', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 6.0, lastUpdated: '' },
  { sku: 'PBP-MIX', cableType: 'pack', lengthIn: 'mixed', connectorConfig: 'mixed', qtyOnHand: 0, reorderThreshold: 3, unitCostUsd: 22.0, lastUpdated: '' },
  { sku: 'SC-10', cableType: 'instrument', lengthIn: '120', connectorConfig: 'straight-straight', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 8.0, lastUpdated: '' },
  { sku: 'SC-15', cableType: 'instrument', lengthIn: '180', connectorConfig: 'straight-straight', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 9.5, lastUpdated: '' },
  { sku: 'SC-20', cableType: 'instrument', lengthIn: '240', connectorConfig: 'straight-straight', qtyOnHand: 0, reorderThreshold: 5, unitCostUsd: 11.0, lastUpdated: '' },
]

function readInventory(): InventoryItem[] {
  ensureDataDir()
  if (!fs.existsSync(INVENTORY_FILE)) {
    writeInventory(DEFAULT_INVENTORY)
    return DEFAULT_INVENTORY
  }
  return JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf-8'))
}

function writeInventory(items: InventoryItem[]) {
  ensureDataDir()
  fs.writeFileSync(INVENTORY_FILE, JSON.stringify(items, null, 2))
}

function appendShipment(record: ShipmentRecord) {
  ensureDataDir()
  const records: ShipmentRecord[] = fs.existsSync(SHIPMENT_LOG_FILE)
    ? JSON.parse(fs.readFileSync(SHIPMENT_LOG_FILE, 'utf-8'))
    : []
  records.push(record)
  fs.writeFileSync(SHIPMENT_LOG_FILE, JSON.stringify(records, null, 2))
}

const VARIANT_SKU_MAP: Record<string, Record<string, string>> = {
  'workhorse-6': { '6in': 'WH-6', '12in': 'WH-12', '18in': 'WH-18' },
  'workhorse-ra': { '6in': 'RA-6', '12in': 'RA-12' },
  'stage-cable': { '10ft': 'SC-10', '15ft': 'SC-15', '20ft': 'SC-20' },
}

const BASE_SKU_MAP: Record<string, string> = {
  'workhorse-6': 'WH-6',
  'workhorse-ra': 'RA-6',
  'pedalboard-pack': 'PBP-MIX',
  'stage-cable': 'SC-10',
}

export function resolveSku(productId: string, variant?: string): string | undefined {
  if (variant && VARIANT_SKU_MAP[productId]?.[variant]) {
    return VARIANT_SKU_MAP[productId][variant]
  }
  return BASE_SKU_MAP[productId]
}

export interface DecrementResult {
  success: boolean
  sku: string
  previousQty: number
  newQty: number
  warning?: string
  error?: string
}

export function decrementInventory(
  orderId: string,
  productId: string,
  qty: number,
  customerName: string,
  customerEmail: string,
  variant?: string
): DecrementResult {
  const sku = resolveSku(productId, variant)
  if (!sku) {
    return {
      success: false,
      sku: productId,
      previousQty: 0,
      newQty: 0,
      error: `No SKU mapping for product "${productId}"`,
    }
  }

  const items = readInventory()
  const item = items.find((i) => i.sku === sku)

  if (!item) {
    return {
      success: false,
      sku,
      previousQty: 0,
      newQty: 0,
      error: `SKU "${sku}" not found in inventory`,
    }
  }

  const previousQty = item.qtyOnHand
  item.qtyOnHand -= qty
  item.lastUpdated = new Date().toISOString()

  let warning: string | undefined
  if (item.qtyOnHand < 0) {
    warning = `Stock went negative: ${item.qtyOnHand} units of ${sku}. Oversold by ${Math.abs(item.qtyOnHand)}.`
  } else if (item.qtyOnHand <= item.reorderThreshold) {
    warning = `Low stock alert: ${item.qtyOnHand} units of ${sku} remaining (threshold: ${item.reorderThreshold}).`
  }

  writeInventory(items)

  appendShipment({
    date: new Date().toISOString(),
    orderId,
    sku,
    qtyShipped: qty,
    customerName,
    customerEmail,
    notes: warning ?? '',
  })

  return {
    success: true,
    sku,
    previousQty,
    newQty: item.qtyOnHand,
    warning,
  }
}

export function checkStock(): { lowStock: InventoryItem[]; outOfStock: InventoryItem[] } {
  const items = readInventory()
  return {
    lowStock: items.filter((i) => i.qtyOnHand > 0 && i.qtyOnHand <= i.reorderThreshold),
    outOfStock: items.filter((i) => i.qtyOnHand <= 0),
  }
}
