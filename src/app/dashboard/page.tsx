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

export default function Dashboard() {
  const { address, chain } = useAccount()

  const contractAddress =
    chain && CONTRACTS[chain.id as SupportedChainId]?.counter

  // 🔹 READ: getCount()
  const {
    data: count,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: counterAbi,
    functionName: 'getCount',
    query: {
      enabled: !!contractAddress,
    },
  })

  // 🔹 WRITE: increment()
  const {
    writeContract,
    data: txHash,
    isPending,
  } = useWriteContract()

  // 🔹 WAIT for transaction confirmation
  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  // 🔹 Refresh data after tx success
  if (isSuccess) {
    refetch()
  }

  return (
    <Web3Guard>
      <h1>Dashboard</h1>
      <p>Welcome: {address}</p>
      <p>Network: {chain?.name}</p>

      <hr />

      <h2>Counter Contract</h2>

      {isReading && <p>Loading counter…</p>}
      {count !== undefined && (
        <p>Current Count: {count.toString()}</p>
      )}

      <button
        onClick={() =>
          writeContract({
            address: contractAddress!,
            abi: counterAbi,
            functionName: 'increment',
          })
        }
        disabled={isPending || isConfirming}
      >
        {isPending
          ? 'Confirm in wallet…'
          : isConfirming
          ? 'Transaction pending…'
          : 'Increment Counter'}
      </button>

      {txHash && (
        <p>
          Tx Hash: {txHash.slice(0, 10)}...
        </p>
      )}

      {isSuccess && <p>✅ Transaction confirmed!</p>}
    </Web3Guard>
  )
}
