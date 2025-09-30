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
          
          {/* Logo Section with Squid Game Enhancement */}
          <div className="mb-12 relative">
            <div className="relative inline-block">
              {/* Main Logo Container */}
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-squid-red/30 via-squid-pink/30 to-squid-green/30 blur-2xl rounded-full animate-squid-pulse"></div>
                <img 
                  src="https://customer-assets.emergentagent.com/job_payu-raffle/artifacts/1j2sod6t_image.png"
                  alt="Payu Logo"
                  className="relative w-40 h-40 mx-auto rounded-3xl shadow-glow-red border-4 border-squid-red/50 bg-squid-black/80 backdrop-blur-sm p-3 animate-squid-glow"
                />
              </div>
              
              {/* Floating Squid Game Symbols */}
              <div className="absolute -top-6 -left-6 w-10 h-10 squid-circle flex items-center justify-center text-squid-red text-2xl animate-float">◯</div>
              <div className="absolute -top-4 -right-8 w-8 h-8 squid-triangle flex items-center justify-center text-squid-green text-xl animate-squid-bounce" style={{animationDelay: '1s'}}>△</div>
              <div className="absolute -bottom-6 -right-6 w-10 h-10 squid-square flex items-center justify-center text-squid-blue text-2xl animate-float" style={{animationDelay: '2s'}}>⬜</div>
              <div className="absolute -bottom-4 -left-8 w-6 h-6 squid-circle flex items-center justify-center text-squid-pink text-lg animate-squid-pulse" style={{animationDelay: '3s'}}>◯</div>
            </div>
          </div>

          {/* Main Title with Squid Game Typography */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-squid-display mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-squid-red via-squid-pink to-squid-green bg-clip-text text-transparent animate-glow">
                {t('hero.title')}
              </span>
              <span className="block text-squid-white text-4xl md:text-6xl font-squid mt-4">
                {t('hero.subtitle')}
              </span>
            </h1>
            
            {/* Subtitle with Symbols */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-squid-red text-2xl animate-squid-pulse">◯</span>
              <p className="text-xl md:text-2xl text-squid-grey-light font-squid max-w-4xl leading-relaxed">
                {t('hero.description')}
              </p>
              <span className="text-squid-green text-2xl animate-squid-bounce">△</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <span className="text-squid-blue text-lg">⬜</span>
              <span className="text-squid-green font-squid-display text-lg">
                {t('hero.rewardsInstant')}
              </span>
              <span className="text-squid-red text-lg">◯</span>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
              
              {/* Primary CTA - Join Draw */}
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

      {/* Squid Game Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-squid-black to-squid-black/90 relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-6 h-full w-full">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="border border-squid-red/20 flex items-center justify-center">
                <span className={`text-xs animate-pulse`} style={{animationDelay: `${i * 0.1}s`}}>
                  {i % 3 === 0 ? '◯' : i % 3 === 1 ? '△' : '⬜'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-squid-red text-3xl animate-squid-pulse">◯</span>
              <h2 className="text-5xl md:text-6xl font-squid-display text-white animate-glow">
                {t('howItWorks.title')}
              </h2>
              <span className="text-squid-green text-3xl animate-squid-bounce">△</span>
            </div>
            <p className="text-squid-grey-light text-xl font-squid max-w-3xl mx-auto leading-relaxed">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          {/* Game Steps Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Game 1: Circle */}
            <div className="group relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-squid-red/20 to-squid-pink/20 blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-squid-pulse"></div>
              
              <div className="relative bg-squid-black/80 border-2 border-squid-red/50 rounded-3xl p-8 backdrop-blur-xl overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:border-squid-red">
                
                {/* Card Background Symbol */}
                <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                  <span className="text-squid-red text-9xl animate-squid-pulse">◯</span>
                </div>
                
                <div className="relative z-10 text-center">
                  {/* Game Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-squid-red text-white rounded-full mb-6 font-squid-display font-bold text-lg">
                    01
                  </div>
                  
                  {/* Game Symbol */}
                  <div className="w-28 h-28 mx-auto mb-8 bg-squid-red/10 border-4 border-squid-red rounded-full flex items-center justify-center group-hover:animate-squid-bounce backdrop-blur-sm">
                    <span className="text-squid-red text-5xl font-bold">◯</span>
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-2xl font-squid-display text-white mb-4">
                    {t('howItWorks.step1Title')}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-squid-grey-light text-base font-squid leading-relaxed">
                    {t('howItWorks.step1Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Game 2: Triangle */}
            <div className="group relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-squid-green/20 to-squid-mint/20 blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-squid-pulse" style={{animationDelay: '0.5s'}}></div>
              
              <div className="relative bg-squid-black/80 border-2 border-squid-green/50 rounded-3xl p-8 backdrop-blur-xl overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:border-squid-green">
                
                {/* Card Background Symbol */}
                <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                  <span className="text-squid-green text-9xl animate-squid-bounce">△</span>
                </div>
                
                <div className="relative z-10 text-center">
                  {/* Game Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-squid-green text-squid-black rounded-full mb-6 font-squid-display font-bold text-lg">
                    02
                  </div>
                  
                  {/* Game Symbol */}
                  <div className="w-28 h-28 mx-auto mb-8 bg-squid-green/10 border-4 border-squid-green flex items-center justify-center group-hover:animate-squid-bounce backdrop-blur-sm" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
                    <span className="text-squid-green text-4xl font-bold">△</span>
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-2xl font-squid-display text-white mb-4">
                    {t('howItWorks.step2Title')}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-squid-grey-light text-base font-squid leading-relaxed">
                    {t('howItWorks.step2Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Game 3: Square */}
            <div className="group relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-squid-blue/20 to-squid-navy/20 blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-squid-pulse" style={{animationDelay: '1s'}}></div>
              
              <div className="relative bg-squid-black/80 border-2 border-squid-blue/50 rounded-3xl p-8 backdrop-blur-xl overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:border-squid-blue">
                
                {/* Card Background Symbol */}
                <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                  <span className="text-squid-blue text-9xl animate-float">⬜</span>
                </div>
                
                <div className="relative z-10 text-center">
                  {/* Game Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-squid-blue text-white rounded-full mb-6 font-squid-display font-bold text-lg">
                    03
                  </div>
                  
                  {/* Game Symbol */}
                  <div className="w-28 h-28 mx-auto mb-8 bg-squid-blue/10 border-4 border-squid-blue rounded-2xl flex items-center justify-center group-hover:animate-squid-bounce backdrop-blur-sm">
                    <span className="text-squid-blue text-5xl font-bold">⬜</span>
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-2xl font-squid-display text-white mb-4">
                    {t('howItWorks.step3Title')}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-squid-grey-light text-base font-squid leading-relaxed">
                    {t('howItWorks.step3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center space-x-8 opacity-40">
              <span className="text-squid-red text-4xl animate-squid-pulse">◯</span>
              <span className="text-squid-green text-4xl animate-squid-bounce">△</span>
              <span className="text-squid-blue text-4xl animate-float">⬜</span>
            </div>
          </div>
        </div>
      </section>

      {/* Squid Game Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-squid-black/60 relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-4 h-full w-full">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="border border-squid-grey-dark/30 flex items-center justify-center">
                <span className={`text-xs animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}>
                  {i % 3 === 0 ? '●' : i % 3 === 1 ? '▲' : '■'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Stat 1: PAYU Tokens */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-squid-green/20 to-squid-mint/20 blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-squid-black/80 border-2 border-squid-green/40 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-4 bg-squid-green/10 border-2 border-squid-green rounded-full flex items-center justify-center">
                  <span className="text-squid-green text-2xl font-bold">△</span>
                </div>
                <div className="text-5xl font-squid-display font-bold text-squid-green mb-3 animate-glow">250M</div>
                <div className="text-squid-grey-light font-squid">{t('stats.payuTokens')}</div>
              </div>
            </div>

            {/* Stat 2: Days to Enter */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-squid-blue/20 to-squid-navy/20 blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-squid-black/80 border-2 border-squid-blue/40 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-4 bg-squid-blue/10 border-2 border-squid-blue rounded-lg flex items-center justify-center">
                  <span className="text-squid-blue text-2xl font-bold">⬜</span>
                </div>
                <div className="text-5xl font-squid-display font-bold text-squid-blue mb-3 animate-glow">44</div>
                <div className="text-squid-grey-light font-squid">{t('stats.daysToEnter')}</div>
              </div>
            </div>

            {/* Stat 3: Network */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-squid-red/20 to-squid-pink/20 blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-squid-black/80 border-2 border-squid-red/40 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-4 bg-squid-red/10 border-2 border-squid-red rounded-full flex items-center justify-center">
                  <span className="text-squid-red text-2xl font-bold">◯</span>
                </div>
                <div className="text-5xl font-squid-display font-bold text-white mb-3 animate-glow">BSC</div>
                <div className="text-squid-grey-light font-squid">{t('stats.network')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Squid Game Style */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-squid-black via-squid-red/5 to-squid-black relative overflow-hidden">
        
        {/* Dramatic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="border border-squid-red/30 flex items-center justify-center">
                <span className={`text-2xl animate-pulse`} style={{animationDelay: `${i * 0.3}s`}}>
                  {i % 3 === 0 ? '◯' : i % 3 === 1 ? '△' : '⬜'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Main CTA Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-6 mb-8">
              <span className="text-squid-red text-4xl animate-squid-pulse">◯</span>
              <h2 className="text-5xl md:text-7xl font-squid-display text-white animate-glow">
                {t('cta.readyTitle')}
              </h2>
              <span className="text-squid-green text-4xl animate-squid-bounce">△</span>
            </div>
            
            <p className="text-squid-grey-light text-xl font-squid max-w-3xl mx-auto leading-relaxed mb-8">
              {t('cta.readyDesc')}
            </p>
            
            <div className="flex items-center justify-center space-x-3">
              <span className="text-squid-blue text-2xl">⬜</span>
              <span className="text-squid-red font-squid text-lg">Enter the Game Now</span>
              <span className="text-squid-red text-2xl">◯</span>
            </div>
          </div>
          
          {/* Final CTA Button */}
          <div className="group relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-squid-red via-squid-pink via-squid-green to-squid-blue blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-700 animate-squid-pulse"></div>
            <Link to="/join">
              <button className="relative bg-gradient-to-r from-squid-red via-squid-pink to-squid-green text-white font-squid-display font-bold py-8 px-16 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:shadow-glow-red text-2xl">
                <span className="flex items-center space-x-4">
                  <span className="text-3xl animate-squid-bounce">◯</span>
                  <span>{t('cta.getStarted')}</span>
                  <ArrowRight className="w-8 h-8 animate-squid-pulse" />
                  <span className="text-3xl animate-squid-bounce">△</span>
                </span>
              </button>
            </Link>
          </div>
          
          {/* Bottom symbols decoration */}
          <div className="mt-16 flex items-center justify-center space-x-12 opacity-30">
            <span className="text-squid-red text-5xl animate-squid-pulse">●</span>
            <span className="text-squid-green text-5xl animate-squid-bounce">▲</span>
            <span className="text-squid-blue text-5xl animate-float">■</span>
            <span className="text-squid-pink text-5xl animate-squid-pulse" style={{animationDelay: '0.5s'}}>●</span>
            <span className="text-squid-mint text-5xl animate-squid-bounce" style={{animationDelay: '1s'}}>▲</span>
            <span className="text-squid-navy text-5xl animate-float" style={{animationDelay: '1.5s'}}>■</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home