'use client'

import { Web3Guard } from '@/components/Web3Guard'
import { useAccount, useReadContract } from 'wagmi'
import { counterAbi } from '@/config/abi/counterAbi'
import { CONTRACTS, type SupportedChainId } from '@/config/contracts'

export default function Dashboard() {
  const { address, chain } = useAccount()

  const contractAddress =
    chain && CONTRACTS[chain.id as SupportedChainId]?.counter

  const { data, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: counterAbi,
    functionName: 'getCount',
    query: {
      enabled: !!contractAddress,
    },
  })

  return (
    <Web3Guard>
      <h1>Dashboard</h1>
      <p>Welcome: {address}</p>

      {isLoading && <p>Loading counter…</p>}
      {error && <p>Error reading contract</p>}

      {data !== undefined && (
        <p>Counter Value: {data.toString()}</p>
      )}
    </Web3Guard>
  )
}
