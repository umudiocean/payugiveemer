import React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { config } from './config/wagmi'
import Layout from './components/Layout'
import Home from './pages/Home'
import Join from './pages/Join'
import MyEntries from './pages/MyEntries'
import Admin from './pages/Admin'
import './App.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

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
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="join" element={<Join />} />
                <Route path="my" element={<MyEntries />} />
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
