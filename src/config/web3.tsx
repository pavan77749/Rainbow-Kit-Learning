import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'My Web3 App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, sepolia],
  ssr: false, 
})
