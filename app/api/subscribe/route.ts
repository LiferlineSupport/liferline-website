import { NextRequest, NextResponse } from 'next/server'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')
const SUBSCRIBERS_FILE = join(DATA_DIR, 'subscribers.json')

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function getSubscribers(): string[] {
  ensureDataDir()
  if (!existsSync(SUBSCRIBERS_FILE)) return []
  try {
    return JSON.parse(readFileSync(SUBSCRIBERS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function addSubscriber(email: string): boolean {
  const subscribers = getSubscribers()
  if (subscribers.includes(email)) return false
  subscribers.push(email)
  ensureDataDir()
  writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
  return true
}

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

    addSubscriber(cleaned)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
