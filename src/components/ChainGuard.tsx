'use client'

import { useAccount } from 'wagmi'

const REQUIRED_CHAIN_ID = [11155111, 137] // Sepolia or Polygon

export function ChainGuard({ children }: { children: React.ReactNode }) {
  const { chain } = useAccount()

  if (!chain) return null

  if (!REQUIRED_CHAIN_ID.includes(chain.id)) {
    return (
      <p style={{ color: 'red' }}>
        Wrong network. Please switch to Sepolia or Polygon.
      </p>
    )
  }

  return <>{children}</>
}
