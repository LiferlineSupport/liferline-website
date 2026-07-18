import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const CLAIMS_FILE = path.join(DATA_DIR, 'warranty_claims.json')
const SHIPMENT_LOG_FILE = path.join(DATA_DIR, 'shipment_log.json')

export interface WarrantyRecord {
  date: string
  orderId: string
  sku: string
  qtyShipped: number
  customerName: string
  customerEmail: string
}

export interface WarrantyClaim {
  id: string
  date: string
  customerName: string
  customerEmail: string
  orderId: string
  sku: string
  issueType: string
  description: string
  shippingAddress: string
  status: 'submitted' | 'approved' | 'shipped' | 'resolved'
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function lookupWarranty(email: string): WarrantyRecord[] {
  ensureDataDir()
  if (!fs.existsSync(SHIPMENT_LOG_FILE)) return []
  try {
    const records: WarrantyRecord[] = JSON.parse(fs.readFileSync(SHIPMENT_LOG_FILE, 'utf-8'))
    return records.filter(
      (r) => r.customerEmail.toLowerCase() === email.toLowerCase()
    )
  } catch {
    return []
  }
}

export function getClaimsForEmail(email: string): WarrantyClaim[] {
  ensureDataDir()
  if (!fs.existsSync(CLAIMS_FILE)) return []
  try {
    const claims: WarrantyClaim[] = JSON.parse(fs.readFileSync(CLAIMS_FILE, 'utf-8'))
    return claims.filter(
      (c) => c.customerEmail.toLowerCase() === email.toLowerCase()
    )
  } catch {
    return []
  }
}

export function submitClaim(claim: Omit<WarrantyClaim, 'id' | 'date' | 'status'>): WarrantyClaim {
  ensureDataDir()
  const claims: WarrantyClaim[] = fs.existsSync(CLAIMS_FILE)
    ? JSON.parse(fs.readFileSync(CLAIMS_FILE, 'utf-8'))
    : []

  const newClaim: WarrantyClaim = {
    ...claim,
    id: `WC-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date: new Date().toISOString(),
    status: 'submitted',
  }

  claims.push(newClaim)
  fs.writeFileSync(CLAIMS_FILE, JSON.stringify(claims, null, 2))
  return newClaim
}

export function getAllClaims(): WarrantyClaim[] {
  ensureDataDir()
  if (!fs.existsSync(CLAIMS_FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(CLAIMS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

export function updateClaimStatus(claimId: string, status: WarrantyClaim['status']): WarrantyClaim | null {
  ensureDataDir()
  if (!fs.existsSync(CLAIMS_FILE)) return null
  const claims: WarrantyClaim[] = JSON.parse(fs.readFileSync(CLAIMS_FILE, 'utf-8'))
  const claim = claims.find((c) => c.id === claimId)
  if (!claim) return null
  claim.status = status
  fs.writeFileSync(CLAIMS_FILE, JSON.stringify(claims, null, 2))
  return claim
}
