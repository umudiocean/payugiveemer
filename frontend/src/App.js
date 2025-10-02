import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import Home from './pages/Home'
import Join from './pages/Join'
import MyEntries from './pages/MyEntries'
import Admin from './pages/Admin'
import './i18n' // Initialize i18n
import './App.css'

function App() {
  return (
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
    </WagmiConfig>
  )
}

export default App;
