'use client'

import { useAccount, useSignMessage } from 'wagmi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function login() {
    try {
      setLoading(true)
      setError(null)
      setMessage(null)

      // 1️⃣ Get nonce
      const nonceRes = await fetch('/api/nonce')
      const { nonce } = await nonceRes.json()

      // 2️⃣ Create message
      const msg = `Sign in to MyApp\n\nWallet: ${address}\nNonce: ${nonce}`

      // 3️⃣ Sign message
      const signature = await signMessageAsync({ message: msg })

      // 4️⃣ Verify on backend
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          message: msg,
          signature,
        }),
      })

      if (!verifyRes.ok) {
        throw new Error('Signature verification failed')
      }

      // ✅ SUCCESS
      setMessage('✅ Login successful! Redirecting…')

      // ⏳ Small delay for UX clarity (optional but senior touch)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={login} disabled={loading}>
        {loading ? 'Signing…' : 'Sign-In with Ethereum'}
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
