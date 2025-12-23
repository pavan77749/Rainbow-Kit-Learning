export const CONTRACTS = {
  11155111: {
    counter: '0x851cD155DD205d869d4284e807464ee97A4E7adb',
  },
} as const


export type SupportedChainId = keyof typeof CONTRACTS
