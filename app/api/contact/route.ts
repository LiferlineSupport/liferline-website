import { NextRequest, NextResponse } from 'next/server'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')
const CONTACTS_FILE = join(DATA_DIR, 'contact_submissions.json')

interface ContactSubmission {
  date: string
  name: string
  email: string
  subject: string
  message: string
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function appendSubmission(submission: ContactSubmission) {
  ensureDataDir()
  const submissions: ContactSubmission[] = existsSync(CONTACTS_FILE)
    ? JSON.parse(readFileSync(CONTACTS_FILE, 'utf-8'))
    : []
  submissions.push(submission)
  writeFileSync(CONTACTS_FILE, JSON.stringify(submissions, null, 2))
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 254) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Please include a message (at least 10 characters).' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long (max 5000 characters).' }, { status: 400 })
    }

    appendSubmission({
      date: new Date().toISOString(),
      name: name.trim(),
      email: cleanEmail,
      subject: typeof subject === 'string' ? subject.trim().slice(0, 200) : '',
      message: message.trim(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
