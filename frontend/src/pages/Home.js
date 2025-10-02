import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Coins, Trophy, Users, Zap, Circle, Triangle, Square } from 'lucide-react'
import { Button } from '../components/ui/button'
import CountdownTimer from '../components/CountdownTimer'

const Home = () => {
  const { t } = useTranslation()
  
  return (
    <div className="relative">
      {/* Squid Game Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Advanced Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://customer-assets.emergentagent.com/job_payu-raffle/artifacts/5vvrh75w_Gemini_Generated_Image_vgopsdvgopsdvgop.png"
            alt="Payu Squid Game Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-squid-black/70 via-squid-black/85 to-squid-black"></div>
          
          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {[...Array(96)].map((_, i) => (
                <div key={i} className="border border-squid-red/20 flex items-center justify-center">
                  <span className={`text-xs animate-pulse`} style={{animationDelay: `${i * 0.05}s`}}>
                    {i % 3 === 0 ? '◯' : i % 3 === 1 ? '△' : '⬜'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          
          {/* Enhanced Pepe Squid Game Logo Section */}
          <div className="mb-16 relative flex justify-center">
            <div className="relative">
              {/* Enhanced Background Glow */}
              <div className="absolute -inset-12 bg-gradient-to-r from-squid-red/40 via-squid-pink/40 via-squid-ice-blue/40 to-squid-gold/40 blur-3xl rounded-full animate-squid-glow"></div>
              
              {/* Main Pepe Image Container */}
              <div className="relative">
                <img 
                  src="https://customer-assets.emergentagent.com/job_payu-squid-draw/artifacts/lm7d864d_Gemini_Generated_Image_vgopsdvgopsdvgop.png"
                  alt="Payu Squid Game Pepe"
                  className="relative w-80 h-80 mx-auto rounded-3xl shadow-glow-red border-4 border-squid-red/60 bg-squid-black/90 backdrop-blur-sm animate-squid-glow-gold object-cover"
                />
                
                {/* Enhanced Floating Squid Game Symbols */}
                <div className="absolute -top-8 -left-8 w-12 h-12 squid-circle flex items-center justify-center text-squid-red text-3xl animate-float shadow-glow-red">◯</div>
                <div className="absolute -top-6 -right-10 w-10 h-10 squid-triangle flex items-center justify-center text-squid-ice-blue text-2xl animate-squid-bounce shadow-glow-ice-blue" style={{animationDelay: '1s'}}>△</div>
                <div className="absolute -bottom-8 -right-8 w-12 h-12 squid-square flex items-center justify-center text-squid-gold text-3xl animate-float shadow-glow-gold" style={{animationDelay: '2s'}}>⬜</div>
                <div className="absolute -bottom-6 -left-10 w-8 h-8 squid-circle-pink flex items-center justify-center text-squid-pink text-2xl animate-squid-pulse shadow-glow-pink" style={{animationDelay: '3s'}}>◯</div>
                
                {/* Additional Floating Elements */}
                <div className="absolute top-4 right-4 w-6 h-6 text-squid-gold animate-squid-bounce" style={{animationDelay: '0.5s'}}>✨</div>
                <div className="absolute bottom-4 left-4 w-6 h-6 text-squid-ice-blue animate-squid-pulse" style={{animationDelay: '1.5s'}}>⚡</div>
                <div className="absolute top-1/2 -left-6 w-4 h-4 text-squid-pink animate-float" style={{animationDelay: '2.5s'}}>💎</div>
                <div className="absolute top-1/2 -right-6 w-4 h-4 text-squid-red animate-squid-bounce" style={{animationDelay: '3.5s'}}>🎯</div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-squid-display mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-squid-red via-squid-pink via-squid-ice-blue to-squid-gold bg-clip-text text-transparent animate-glow uppercase">
                {t('hero.title')}
              </span>
              <span className="block bg-gradient-to-r from-squid-gold via-squid-ice-blue to-squid-pink bg-clip-text text-transparent animate-glow-blue text-4xl md:text-6xl font-squid mt-4 uppercase">
                {t('hero.subtitle')}
              </span>
            </h1>
            
            {/* Enhanced Subtitle with Symbols */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <span className="text-squid-red text-3xl animate-squid-pulse">◯</span>
              <p className="text-xl md:text-2xl text-squid-light-grey font-squid max-w-5xl leading-relaxed text-center">
                {t('hero.description')}
              </p>
              <span className="text-squid-ice-blue text-3xl animate-squid-bounce">△</span>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <span className="text-squid-gold text-2xl animate-squid-pulse">⬜</span>
              <span className="text-squid-gold font-squid-display text-xl animate-glow-gold">
                {t('hero.rewardsInstant')}
              </span>
              <span className="text-squid-pink text-2xl animate-squid-bounce">◯</span>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
              
              {/* Primary CTA - Join Giveaway */}
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-squid-red via-squid-pink to-squid-green blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
                <Link to="/join">
                  <button className="relative bg-gradient-to-r from-squid-red to-squid-pink text-white font-squid-display font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow-red text-xl">
                    <span className="flex items-center space-x-3">
                      <span className="text-2xl">◯</span>
                      <span>{t('hero.joinButton')}</span>
                      <ArrowRight className="w-6 h-6" />
                    </span>
                  </button>
                </Link>
              </div>

              {/* Secondary CTA - Connect Wallet */}
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-squid-green to-squid-mint blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                <Link to="/join">
                  <button className="relative border-2 border-squid-green bg-squid-green/10 text-squid-green hover:bg-squid-green hover:text-squid-black font-squid-display font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 text-xl">
                    <span className="flex items-center space-x-3">
                      <span className="text-2xl">△</span>
                      <span>{t('hero.connectButton')}</span>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <CountdownTimer className="mb-16" />
        </div>
      </section>

    </div>
  )
}

export default Home
