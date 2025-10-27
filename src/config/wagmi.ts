import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { bsc } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = '0c4a5b51a6f9f2c8a7e2b3d4c5e6f7a8'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'GrokPay Proxy',
  description: 'x402 Payment Protocol for AI Services',
  url: 'https://grokpay.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [bsc],
  projectId,
  metadata,
  ssr: false,
  storage: createStorage({
    storage: cookieStorage
  }),
})
