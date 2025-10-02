import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCountdown } from '../hooks/useCountdown'
import { Circle, Triangle, Square } from 'lucide-react'

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
              <Link 
                to="/admin" 
                className={`relative group px-4 py-2 rounded-lg font-squid transition-all duration-300 ${
                  location.pathname === '/admin' 
                    ? 'text-squid-gold bg-squid-gold/10 border border-squid-gold/30' 
                    : 'text-squid-grey-light hover:text-squid-gold hover:bg-squid-gold/5'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-xs">👑</span>
                  <span>Admin</span>
                </span>
              </Link>
            </nav>

            {/* Squid Game Countdown & Language Selector */}
            <div className="flex items-center space-x-6">
              <div className="hidden sm:block text-right bg-squid-grey-dark/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-squid-red/20">
                <div className="text-xs text-squid-grey-light font-squid">{t('nav.drawStartsIn')}</div>
                <div className="text-lg font-bold font-squid-display bg-gradient-to-r from-squid-green to-squid-mint bg-clip-text text-transparent animate-glow">
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

      {/* Squid Game Footer */}
      <footer className="relative z-10 mt-20 border-t border-squid-red/30 bg-squid-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Footer Header with Squid Game Symbols */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-squid-red to-squid-pink rounded-lg flex items-center justify-center border-2 border-squid-red/50 animate-squid-pulse">
                <span className="text-squid-white text-xl">⬜</span>
              </div>
              <span className="text-2xl font-squid-display bg-gradient-to-r from-squid-red via-squid-pink to-squid-green bg-clip-text text-transparent">
                PAYU DRAW
              </span>
              <div className="flex space-x-2">
                <span className="text-squid-red animate-squid-pulse">◯</span>
                <span className="text-squid-green animate-squid-pulse" style={{animationDelay: '0.3s'}}>△</span>
                <span className="text-squid-blue animate-squid-pulse" style={{animationDelay: '0.6s'}}>⬜</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-squid-grey-light font-squid">
              <span className="flex items-center space-x-2">
                <span className="text-squid-red">◯</span>
                <span>{t('footer.slogan')}</span>
              </span>
              <Link to="/terms" className="hover:text-squid-green transition-colors flex items-center space-x-1">
                <span className="text-squid-green text-xs">△</span>
                <span>{t('footer.terms')}</span>
              </Link>
              <Link to="/privacy" className="hover:text-squid-blue transition-colors flex items-center space-x-1">
                <span className="text-squid-blue text-xs">⬜</span>
                <span>{t('footer.privacy')}</span>
              </Link>
            </div>
          </div>
          
          {/* Squid Game Promotional Section */}
          <div className="text-center relative">
            <div className="relative inline-block max-w-5xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-squid-red/20 via-squid-green/20 to-squid-blue/20 rounded-3xl blur-xl"></div>
              <img 
                src="https://customer-assets.emergentagent.com/job_payu-raffle/artifacts/kv8aacia_photo_2025-09-26_00-56-45.jpg"
                alt="Payu Squid Game Giveaway - 2.5 Trillion Payu Coins"
                className="relative w-full h-auto rounded-3xl shadow-glow border-2 border-squid-red/40 animate-squid-pulse"
              />
              
              {/* Floating Squid Game symbols around image */}
              <div className="absolute -top-6 -left-6 w-10 h-10 squid-circle flex items-center justify-center text-squid-red text-2xl animate-float">◯</div>
              <div className="absolute -top-4 -right-8 w-8 h-8 squid-triangle flex items-center justify-center text-squid-green text-xl animate-squid-bounce" style={{animationDelay: '1s'}}>△</div>
              <div className="absolute -bottom-6 -right-6 w-10 h-10 squid-square flex items-center justify-center text-squid-blue text-2xl animate-float" style={{animationDelay: '2s'}}>⬜</div>
              <div className="absolute -bottom-4 -left-8 w-6 h-6 squid-circle flex items-center justify-center text-squid-pink text-lg animate-squid-pulse" style={{animationDelay: '3s'}}>◯</div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-squid-display text-squid-white mb-4 animate-glow flex items-center justify-center space-x-3">
                <span className="text-squid-red">◯</span>
                <span>{t('footer.giveawayTitle')}</span>
                <span className="text-squid-green">△</span>
              </h3>
              <p className="text-squid-grey-light text-xl font-squid mb-4">
                {t('footer.giveawayDesc', { amount: '2.5 Trillion PAYU Coins' })}
              </p>
              <div className="inline-flex items-center space-x-2 bg-squid-red/10 border border-squid-red/30 rounded-full px-6 py-3">
                <span className="text-squid-blue text-sm">⬜</span>
                <p className="text-squid-green font-squid italic">
                  "{t('footer.instantReward')}"
                </p>
                <span className="text-squid-red text-sm">◯</span>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="mt-8 flex justify-center space-x-8 opacity-30">
              <span className="text-squid-red text-4xl animate-squid-pulse">◯</span>
              <span className="text-squid-green text-4xl animate-squid-bounce">△</span>
              <span className="text-squid-blue text-4xl animate-float">⬜</span>
              <span className="text-squid-pink text-4xl animate-squid-pulse" style={{animationDelay: '0.5s'}}>◯</span>
              <span className="text-squid-mint text-4xl animate-squid-bounce" style={{animationDelay: '1s'}}>△</span>
              <span className="text-squid-navy text-4xl animate-float" style={{animationDelay: '1.5s'}}>⬜</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout