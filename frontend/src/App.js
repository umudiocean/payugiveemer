import React from 'react'
import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { config, chains } from './config/wagmi'
import Layout from './components/Layout'
import Home from './pages/Home'
import Join from './pages/Join'
import MyEntries from './pages/MyEntries'
import Admin from './pages/Admin'
// i18n removed - English only
import './App.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          chains={chains}
          theme={darkTheme({
            accentColor: '#FF2A6D',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/join" element={<Join />} />
                <Route path="/my-entries" element={<MyEntries />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Layout>
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
    </WagmiConfig>
  )
}

export default App;
