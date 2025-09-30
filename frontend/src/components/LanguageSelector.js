import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown, Check } from 'lucide-react'

const LanguageSelector = ({ className = '' }) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(i18n.language)

  const languages = [
    { code: 'en', name: 'ENGLISH', shortName: 'EN', flag: '🇺🇸' },
    { code: 'tr', name: 'TÜRKÇE', shortName: 'TR', flag: '🇹🇷' },
    { code: 'es', name: 'ESPAÑOL', shortName: 'ES', flag: '🇪🇸' },
    { code: 'de', name: 'DEUTSCH', shortName: 'DE', flag: '🇩🇪' },
    { code: 'fr', name: 'FRANÇAIS', shortName: 'FR', flag: '🇫🇷' },
    { code: 'ru', name: 'РУССКИЙ', shortName: 'RU', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', shortName: 'AR', flag: '🇸🇦' },
    { code: 'zh', name: '中文', shortName: 'ZH', flag: '🇨🇳' },
    { code: 'pt', name: 'PORTUGUÊS', shortName: 'PT', flag: '🇧🇷' },
    { code: 'id', name: 'BAHASA INDONESIA', shortName: 'ID', flag: '🇮🇩' }
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  const handleLanguageChange = async (languageCode) => {
    console.log('🌐 Changing language to:', languageCode)
    
    try {
      // Close dropdown first
      setIsOpen(false)
      
      // Update document direction for RTL languages
      const rtlLanguages = ['ar']
      document.documentElement.dir = rtlLanguages.includes(languageCode) ? 'rtl' : 'ltr'
      document.documentElement.lang = languageCode
      
      // Store language preference FIRST (before changeLanguage)
      localStorage.setItem('i18nextLng', languageCode)
      
      // Change language in i18n
      await i18n.changeLanguage(languageCode)
      
      // Update local state
      setCurrentLang(languageCode)
      
      // Force reload the page to ensure all components update
      window.location.reload()
      
    } catch (error) {
      console.error('❌ Error changing language:', error)
    }
  }

  // Listen to i18n language change events
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      console.log('🔄 i18n language changed to:', lng)
      setCurrentLang(lng)
    }

    i18n.on('languageChanged', handleLanguageChanged)

    // Set initial language
    setCurrentLang(i18n.language)

    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Custom Button - No shadcn/ui Button component */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border-2 border-squid-ice-blue/60 text-squid-white hover:border-squid-ice-blue hover:text-squid-ice-blue bg-squid-black/90 backdrop-blur-sm font-squid-display font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,191,255,0.5)] px-4 py-2.5 rounded-xl"
      >
        <Globe className="w-5 h-5 text-squid-ice-blue" />
        <span className="text-base tracking-wider text-squid-white">{currentLanguage.flag}</span>
        <span className="text-base tracking-wider text-squid-white">{currentLanguage.shortName}</span>
        <ChevronDown className={`w-4 h-4 text-squid-ice-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Enhanced Backdrop with higher z-index */}
          <div 
            className="fixed inset-0 z-[9998] bg-squid-black/30 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Enhanced Dropdown Menu with even higher z-index */}
          <div className="absolute right-0 top-full mt-3 w-80 bg-gradient-to-b from-squid-black via-squid-black/98 to-squid-black/95 backdrop-blur-2xl border-2 border-squid-ice-blue/60 rounded-2xl shadow-[0_0_40px_rgba(0,191,255,0.4)] z-[9999] max-h-[32rem] overflow-hidden">
            
            {/* Header with better contrast */}
            <div className="p-4 border-b-2 border-squid-ice-blue/40 bg-gradient-to-r from-squid-ice-blue/10 to-squid-pink/10">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-squid-ice-blue animate-squid-pulse" />
                <span className="text-squid-white font-squid-display font-bold text-lg tracking-widest">
                  SELECT LANGUAGE
                </span>
              </div>
            </div>
            
            {/* Language Options with improved contrast */}
            <div className="p-4 max-h-[24rem] overflow-y-auto custom-scrollbar">
              {languages.map((language) => {
                const isSelected = currentLang === language.code
                
                return (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 mb-2.5 font-squid-display group relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-r from-squid-ice-blue/25 to-squid-pink/25 text-squid-white border-2 border-squid-ice-blue/70 shadow-[0_0_20px_rgba(0,191,255,0.4)]'
                        : 'text-squid-light-grey hover:bg-gradient-to-r hover:from-squid-ice-blue/15 hover:to-squid-pink/15 hover:text-squid-white border-2 border-squid-ice-blue/20 hover:border-squid-ice-blue/50 hover:shadow-[0_0_15px_rgba(0,191,255,0.3)]'
                    }`}
                  >
                    {/* Animated background glow on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isSelected ? 'bg-gradient-to-r from-squid-ice-blue/10 to-squid-pink/10' : ''
                    }`}></div>
                    
                    <div className="flex items-center space-x-4 relative z-10">
                      <span className="text-3xl transform transition-transform group-hover:scale-125 drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
                        {language.flag}
                      </span>
                      <div className="text-left">
                        <div className={`font-bold text-lg tracking-wide ${
                          isSelected ? 'text-squid-white' : 'text-squid-light-grey group-hover:text-squid-white'
                        }`}>
                          {language.name}
                        </div>
                        <div className={`text-sm font-normal tracking-wider ${
                          isSelected ? 'text-squid-ice-blue' : 'text-squid-grey group-hover:text-squid-ice-blue'
                        }`}>
                          {language.shortName}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 relative z-10">
                      {isSelected && (
                        <>
                          <div className="w-2.5 h-2.5 bg-squid-ice-blue rounded-full animate-squid-pulse shadow-[0_0_10px_rgba(0,191,255,0.8)]"></div>
                          <Check className="w-6 h-6 text-squid-ice-blue animate-squid-bounce drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]" />
                        </>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
            
            {/* Footer with Squid Game symbols */}
            <div className="p-4 border-t-2 border-squid-ice-blue/40 bg-gradient-to-r from-squid-pink/10 to-squid-ice-blue/10">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 text-squid-light-grey text-sm font-bold tracking-wider">
                  <span className="text-squid-pink animate-squid-pulse text-lg">◯</span>
                  <span className="text-squid-white">PAYU GLOBAL</span>
                  <span className="text-squid-gold animate-squid-bounce text-lg">△</span>
                  <span className="text-squid-white">COMMUNITY</span>
                  <span className="text-squid-ice-blue animate-squid-pulse text-lg">⬜</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSelector