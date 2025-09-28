import { createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { injected, walletConnect } from '@wagmi/connectors'

const projectId = 'c1814df663b82b65bb5927ad59566843'

export const config = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [bsc.id]: http('https://bsc-dataseed.binance.org')
  },
})

// Contract configuration
export const CONTRACT_ADDRESS = '0x17A0D20Fc22c30a490FB6F186Cf2c31d738B5567'
export const REGISTRATION_FEE = '980000000000000' // 0.00098 BNB in wei

// Contract ABI - Only the functions we need
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "register",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "isRegistered",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "indexOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "index", "type": "uint256"},
      {"indexed": false, "internalType": "bytes32", "name": "seed", "type": "bytes32"},
      {"indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "Registered",
    "type": "event"
  }
]