'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function WalletGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAccount()

  if (status === 'connecting' || status === 'reconnecting') {
    return <p>Checking wallet connection…</p>
  }

  if (status !== 'connected') {
    return (
      <div>
        <h3>Wallet required</h3>
        <p>Please connect your wallet to continue.</p>
        <ConnectButton />
      </div>
    )
  }

  return <>{children}</>
}
