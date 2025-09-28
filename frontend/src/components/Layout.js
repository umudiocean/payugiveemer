import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCountdown } from '../hooks/useCountdown'
import { Circle, Triangle, Square } from 'lucide-react'

const Layout = () => {
  const location = useLocation()
  const { formatted, isEnded } = useCountdown()

  return (
    <div className="min-h-screen bg-black text-white font-inter relative overflow-hidden">
      {/* Enhanced Payu Squid Game Floating Shapes Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large floating shapes */}
        <Circle className="absolute top-20 left-10 w-8 h-8 text-squid-pink/20 animate-float" />
        <Triangle className="absolute top-40 right-20 w-6 h-6 text-squid-teal/20 animate-float" style={{animationDelay: '2s'}} />
        <Square className="absolute bottom-32 left-1/4 w-10 h-10 text-squid-purple/20 animate-float" style={{animationDelay: '4s'}} />
        <Circle className="absolute bottom-20 right-10 w-12 h-12 text-squid-pink/10 animate-float" style={{animationDelay: '1s'}} />
        <Triangle className="absolute top-1/2 left-1/3 w-4 h-4 text-squid-teal/30 animate-float" style={{animationDelay: '3s'}} />
        
        {/* Additional smaller animated shapes */}
        <Square className="absolute top-1/4 right-1/3 w-6 h-6 text-squid-pink/15 animate-float" style={{animationDelay: '5s'}} />
        <Circle className="absolute top-3/4 left-1/2 w-5 h-5 text-squid-teal/25 animate-float" style={{animationDelay: '6s'}} />
        <Triangle className="absolute bottom-1/3 right-1/4 w-7 h-7 text-squid-purple/20 animate-float" style={{animationDelay: '7s'}} />
        <Square className="absolute top-1/3 left-20 w-4 h-4 text-squid-pink/30 animate-float" style={{animationDelay: '8s'}} />
        <Circle className="absolute bottom-1/4 left-1/3 w-9 h-9 text-squid-teal/15 animate-float" style={{animationDelay: '9s'}} />
        
        {/* Very small accent shapes */}
        <Triangle className="absolute top-60 right-40 w-3 h-3 text-squid-purple/25 animate-float" style={{animationDelay: '2.5s'}} />
        <Square className="absolute bottom-40 right-60 w-2 h-2 text-squid-pink/35 animate-float" style={{animationDelay: '3.5s'}} />
        <Circle className="absolute top-2/3 right-1/2 w-3 h-3 text-squid-teal/20 animate-float" style={{animationDelay: '4.5s'}} />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-squid-pink/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-16 w-20 h-20 bg-squid-teal/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/4 left-1/2 w-12 h-12 bg-squid-purple/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-squid-grey/20">
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
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
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
          
          {/* Payu Squid Game Promotional Image */}
          <div className="text-center">
            <div className="relative inline-block max-w-4xl w-full">
              <img 
                src="https://customer-assets.emergentagent.com/job_payu-raffle/artifacts/kv8aacia_photo_2025-09-26_00-56-45.jpg"
                alt="Payu Squid Game Giveaway - 2.5 Trillion Payu Coins"
                className="w-full h-auto rounded-2xl shadow-glow border border-squid-pink/20"
              />
              {/* Floating shapes around promotional image */}
              <Circle className="absolute -top-3 -left-3 w-6 h-6 text-squid-pink/30 animate-float" />
              <Triangle className="absolute -top-2 -right-4 w-5 h-5 text-squid-teal/25 animate-float" style={{animationDelay: '1s'}} />
              <Square className="absolute -bottom-3 -right-3 w-6 h-6 text-squid-purple/30 animate-float" style={{animationDelay: '2s'}} />
              <Circle className="absolute -bottom-2 -left-4 w-4 h-4 text-squid-pink/25 animate-float" style={{animationDelay: '3s'}} />
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Payu Squid Game Mega Giveaway!</h3>
              <p className="text-squid-grey text-lg">
                Join the ultimate crypto adventure with <span className="text-squid-teal font-bold">2.5 Trillion PAYU Coins</span> up for grabs!
              </p>
              <p className="text-squid-pink text-sm mt-2 italic">
                "Every participant receives 250 million PAYU coins instantly"
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout