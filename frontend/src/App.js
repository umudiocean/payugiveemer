import React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { 
  injectedWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { bsc } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'
import Layout from './components/Layout'
import Home from './pages/Home'
import Join from './pages/Join'
import MyEntries from './pages/MyEntries'
import Admin from './pages/Admin'
import './i18n' // Initialize i18n
import './App.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()
const projectId = 'c1814df663b82b65bb5927ad59566843'

// Sadece injected wallets kullanacağız (MetaMask SDK yok)
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet(), // MetaMask otomatik algılanır 
        walletConnectWallet({ projectId }),
        coinbaseWallet({ appName: 'Payu Giveaway' }),
      ],
    },
  ],
  { appName: 'Payu Giveaway', projectId }
)

const config = createConfig({
  connectors,
  chains: [bsc],
  transports: {
    [bsc.id]: http('https://bsc-dataseed.binance.org'),
  },
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#FF2A6D',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          appInfo={{
            appName: 'Payu Giveaway',
            learnMoreUrl: 'https://payu.io',
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="join" element={<Join />} />
                <Route path="my" element={<MyEntries />} />
                <Route path="admin" element={<Admin />} />
              </Route>
            </Routes>
            <Toaster 
              theme="dark"
              position="top-right"
              toastOptions={{
                style: {
                  background: '#0B0F14',
                  border: '1px solid #A7AAB3',
                  color: 'white',
                },
              }}
            />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App;
