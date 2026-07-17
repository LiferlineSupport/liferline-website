import { NextRequest, NextResponse } from 'next/server'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const SUBSCRIBERS_FILE = join(process.cwd(), '.subscribers.json')

function getSubscribers(): string[] {
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
