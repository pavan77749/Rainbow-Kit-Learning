'use client'

import { Web3Guard } from '@/components/Web3Guard'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { counterAbi } from '@/config/abi/counterAbi'
import { CONTRACTS, type SupportedChainId } from '@/config/contracts'
import { useState } from 'react'

export default function Dashboard() {
  const { address, chain } = useAccount()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const contractAddress =
    chain && CONTRACTS[chain.id as SupportedChainId]?.counter

  const { data: count, refetch } = useReadContract({
    address: contractAddress,
    abi: counterAbi,
    functionName: 'getCount',
    query: { enabled: !!contractAddress },
  })

  const {
    writeContract,
    data: txHash,
    isPending,
    error: writeError,
  } = useWriteContract()

  const { isSuccess, isLoading: isConfirming } =
    useWaitForTransactionReceipt({
      hash: txHash,
    })

  // 🔹 Handle write errors
  if (writeError && !errorMessage) {
    setErrorMessage(
      writeError.message || 'Transaction failed. Please try again.'
    )
  }

  // 🔹 Refetch on success
  if (isSuccess) {
    refetch()
  }

  return (
    <Web3Guard>
      <h1>Dashboard</h1>
      <p>Welcome: {address}</p>

      <h2>Counter</h2>
      <p>Value: {count?.toString()}</p>

      <button
        onClick={() => {
          setErrorMessage(null)
          writeContract({
            address: contractAddress!,
            abi: counterAbi,
            functionName: 'increment',
          })
        }}
        disabled={isPending || isConfirming}
      >
        {isPending
          ? 'Confirm in wallet…'
          : isConfirming
          ? 'Transaction pending…'
          : 'Increment'}
      </button>

      {/* 🔴 Error UI */}
      {errorMessage && (
        <p style={{ color: 'red' }}>
          ❌ {errorMessage}
        </p>
      )}

      {/* ✅ Success UI */}
      {isSuccess && (
        <p style={{ color: 'green' }}>
          ✅ Transaction confirmed!
        </p>
      )}
    </Web3Guard>
  )
}
