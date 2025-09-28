import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCountdown } from '../hooks/useCountdown'
import { Circle, Triangle, Square } from 'lucide-react'

const Layout = () => {
  const location = useLocation()
  const { formatted, isEnded } = useCountdown()

  return (
    <div className="min-h-screen bg-squid-dark text-white font-inter relative overflow-hidden">
      {/* Floating Shapes Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Circle className="absolute top-20 left-10 w-8 h-8 text-squid-pink/20 animate-float" />
        <Triangle className="absolute top-40 right-20 w-6 h-6 text-squid-teal/20 animate-float" style={{animationDelay: '2s'}} />
        <Square className="absolute bottom-32 left-1/4 w-10 h-10 text-squid-purple/20 animate-float" style={{animationDelay: '4s'}} />
        <Circle className="absolute bottom-20 right-10 w-12 h-12 text-squid-pink/10 animate-float" style={{animationDelay: '1s'}} />
        <Triangle className="absolute top-1/2 left-1/3 w-4 h-4 text-squid-teal/30 animate-float" style={{animationDelay: '3s'}} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-squid-dark/80 backdrop-blur-xl border-b border-squid-grey/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-squid-pink to-squid-purple rounded-lg flex items-center justify-center">
                <Square className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-squid-pink to-squid-teal bg-clip-text text-transparent">
                PAYU DRAW
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'text-squid-pink' : 'text-squid-grey hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/join" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/join' ? 'text-squid-pink' : 'text-squid-grey hover:text-white'
                }`}
              >
                Join Draw
              </Link>
              <Link 
                to="/my" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/my' ? 'text-squid-pink' : 'text-squid-grey hover:text-white'
                }`}
              >
                My Entries
              </Link>
            </nav>

            {/* Countdown */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-squid-grey">Draw ends in</div>
                <div className="text-sm font-bold text-squid-teal">
                  {isEnded ? 'ENDED' : `${formatted.days}:${formatted.hours}:${formatted.minutes}:${formatted.seconds}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-squid-grey/20 bg-squid-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-squid-pink to-squid-purple rounded-lg flex items-center justify-center">
                <Square className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-squid-pink to-squid-teal bg-clip-text text-transparent">
                PAYU DRAW
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-squid-grey">
              <span>🔳 Scan → 💰 Earn → 🔄 Swap → 😃 Happy</span>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout