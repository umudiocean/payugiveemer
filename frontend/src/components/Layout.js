import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCountdown } from '../hooks/useCountdown'
import { Circle, Triangle, Square } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

const Layout = () => {
  const location = useLocation()
  const { formatted, isEnded } = useCountdown()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-squid-black text-squid-white font-squid-body relative overflow-hidden squid-pattern">
      {/* Squid Game Floating Symbols Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large floating Squid Game symbols */}
        <div className="absolute top-20 left-10 w-12 h-12 squid-circle animate-squid-pulse flex items-center justify-center text-squid-red text-2xl">◯</div>
        <div className="absolute top-40 right-20 w-10 h-10 squid-triangle animate-squid-bounce flex items-center justify-center text-squid-green text-xl">△</div>
        <div className="absolute bottom-32 left-1/4 w-14 h-14 squid-square animate-float flex items-center justify-center text-squid-blue text-2xl">⬜</div>
        
        {/* Medium symbols */}
        <div className="absolute bottom-20 right-10 w-8 h-8 squid-circle animate-float text-squid-pink flex items-center justify-center text-lg" style={{animationDelay: '1s'}}>◯</div>
        <div className="absolute top-1/2 left-1/3 w-6 h-6 squid-triangle animate-squid-pulse text-squid-green flex items-center justify-center text-sm" style={{animationDelay: '3s'}}>△</div>
        <div className="absolute top-1/4 right-1/3 w-10 h-10 squid-square animate-squid-bounce text-squid-blue flex items-center justify-center" style={{animationDelay: '5s'}}>⬜</div>
        
        {/* Small accent symbols */}
        <div className="absolute top-3/4 left-1/2 w-4 h-4 squid-circle animate-squid-pulse text-squid-red text-xs flex items-center justify-center" style={{animationDelay: '6s'}}>◯</div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 squid-triangle animate-float text-squid-mint text-xs flex items-center justify-center" style={{animationDelay: '7s'}}>△</div>
        <div className="absolute top-1/3 left-20 w-6 h-6 squid-square animate-squid-pulse text-squid-navy text-sm flex items-center justify-center" style={{animationDelay: '8s'}}>⬜</div>
        
        {/* Very small symbols */}
        <div className="absolute top-60 right-40 w-3 h-3 text-squid-pink animate-squid-bounce text-xs" style={{animationDelay: '2.5s'}}>◯</div>
        <div className="absolute bottom-40 right-60 w-3 h-3 text-squid-green animate-float text-xs" style={{animationDelay: '3.5s'}}>△</div>
        <div className="absolute top-2/3 right-1/2 w-3 h-3 text-squid-blue animate-squid-pulse text-xs" style={{animationDelay: '4.5s'}}>⬜</div>
        
        {/* Glowing orbs with Squid Game colors */}
        <div className="absolute top-1/2 right-20 w-20 h-20 bg-squid-red/8 rounded-full blur-2xl animate-squid-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-16 w-24 h-24 bg-squid-green/8 rounded-full blur-2xl animate-squid-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-squid-blue/8 rounded-full blur-2xl animate-squid-pulse" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Squid Game Header */}
      <header className="relative z-10 bg-squid-black/90 backdrop-blur-xl border-b border-squid-red/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Squid Game Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-squid-red to-squid-pink rounded-lg flex items-center justify-center border-2 border-squid-red/50 group-hover:border-squid-red transition-all duration-300 animate-squid-pulse">
                <span className="text-squid-white text-xl font-bold">⬜</span>
              </div>
              <span className="text-2xl font-squid-display bg-gradient-to-r from-squid-red via-squid-pink to-squid-green bg-clip-text text-transparent animate-glow">
                PAYU DRAW
              </span>
              <div className="flex space-x-1 opacity-60">
                <span className="text-squid-red text-sm animate-squid-pulse">◯</span>
                <span className="text-squid-green text-sm animate-squid-pulse" style={{animationDelay: '0.3s'}}>△</span>
                <span className="text-squid-blue text-sm animate-squid-pulse" style={{animationDelay: '0.6s'}}>⬜</span>
              </div>
            </Link>

            {/* Squid Game Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`relative group px-4 py-2 rounded-lg font-squid transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'text-squid-red bg-squid-red/10 border border-squid-red/30' 
                    : 'text-squid-grey-light hover:text-squid-red hover:bg-squid-red/5'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-xs">◯</span>
                  <span>{t('nav.home')}</span>
                </span>
              </Link>
              <Link 
                to="/join" 
                className={`relative group px-4 py-2 rounded-lg font-squid transition-all duration-300 ${
                  location.pathname === '/join' 
                    ? 'text-squid-green bg-squid-green/10 border border-squid-green/30' 
                    : 'text-squid-grey-light hover:text-squid-green hover:bg-squid-green/5'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-xs">△</span>
                  <span>{t('nav.joinDraw')}</span>
                </span>
              </Link>
              <Link 
                to="/my" 
                className={`relative group px-4 py-2 rounded-lg font-squid transition-all duration-300 ${
                  location.pathname === '/my' 
                    ? 'text-squid-blue bg-squid-blue/10 border border-squid-blue/30' 
                    : 'text-squid-grey-light hover:text-squid-blue hover:bg-squid-blue/5'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-xs">⬜</span>
                  <span>{t('nav.myEntries')}</span>
                </span>
              </Link>
            </nav>

            {/* Countdown & Language Selector */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-squid-grey">{t('nav.drawStartsIn')}</div>
                <div className="text-sm font-bold text-squid-teal">
                  {isEnded ? 'ENDED' : `${formatted.days}:${formatted.hours}:${formatted.minutes}:${formatted.seconds}`}
                </div>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-squid-grey/20 bg-black/80 backdrop-blur-xl">
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
              <span>{t('footer.slogan')}</span>
              <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
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
              <h3 className="text-2xl font-bold text-white mb-2">{t('footer.giveawayTitle')}</h3>
              <p className="text-squid-grey text-lg">
                {t('footer.giveawayDesc', { amount: '2.5 Trillion PAYU Coins' })}
              </p>
              <p className="text-squid-pink text-sm mt-2 italic">
                "{t('footer.instantReward')}"
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout