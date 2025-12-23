import { NextResponse } from 'next/server'
import { verifyMessage } from 'viem'

export async function POST(req: Request) {
  const { address, message, signature } = await req.json()

  const isValid = verifyMessage({
    address,
    message,
    signature,
  })

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    )
  }

  // ✅ User authenticated
  // Issue JWT / session here

  return NextResponse.json({ success: true })
}
