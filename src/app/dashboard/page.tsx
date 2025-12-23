'use client'

import { Web3Guard } from '@/components/Web3Guard'
import { useAccount } from 'wagmi'

export default function Dashboard() {
  const { address } = useAccount()

  return (
    <Web3Guard>
      <h1>Dashboard</h1>
      <p>Welcome: {address}</p>

      <button>Mint NFT</button>
      <button>Stake Tokens</button>
    </Web3Guard>
  )
}
