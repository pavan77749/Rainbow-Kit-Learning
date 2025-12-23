import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  const nonce = crypto.randomBytes(16).toString('hex')

  // In real apps: store nonce in DB or cache
  return NextResponse.json({ nonce })
}
