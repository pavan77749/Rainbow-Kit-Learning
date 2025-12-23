'use client'

import { WalletGuard } from './WalletGuard'
import { ChainGuard } from './ChainGuard'

export function Web3Guard({ children }: { children: React.ReactNode }) {
  return (
    <WalletGuard>
      <ChainGuard>
        {children}
      </ChainGuard>
    </WalletGuard>
  )
}
