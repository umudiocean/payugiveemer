import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { Button } from './ui/button'

const LanguageSelector = ({ className = '' }) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

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

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode) => {
    console.log('Changing language to:', languageCode)
    i18n.changeLanguage(languageCode)
    
    // Update document direction for RTL languages
    const rtlLanguages = ['ar']
    document.documentElement.dir = rtlLanguages.includes(languageCode) ? 'rtl' : 'ltr'
    document.documentElement.lang = languageCode
    
    // Store language preference
    localStorage.setItem('preferred-language', languageCode)
    
    setIsOpen(false)
  }

  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center space-x-3 border-2 border-squid-red/50 text-squid-light-grey hover:border-squid-red hover:text-squid-red bg-squid-black/80 backdrop-blur-sm font-squid-display font-bold transition-all duration-300 hover:shadow-glow-red px-4 py-2"
      >
        <Globe className="w-5 h-5" />
        <span className="text-base">{currentLanguage.shortName}</span>
        <span className="hidden md:inline text-sm">{currentLanguage.shortName === 'EN' ? 'ENGLISH' : currentLanguage.shortName === 'TR' ? 'TÜRKÇE' : currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-squid-black/20 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Enhanced Dropdown Menu */}
          <div className="absolute right-0 top-full mt-3 w-72 bg-squid-black/95 backdrop-blur-2xl border-2 border-squid-red/50 rounded-3xl shadow-glow-red z-50 max-h-96 overflow-hidden animate-fade-in">
            
            {/* Header */}
            <div className="p-4 border-b border-squid-red/30">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-squid-red" />
                <span className="text-squid-light-grey font-squid-display font-bold text-sm tracking-wider">
                  SELECT LANGUAGE
                </span>
              </div>
            </div>
            
            {/* Language Options */}
            <div className="p-3 max-h-80 overflow-y-auto">
              {languages.map((language, index) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 mb-2 font-squid group ${
                    i18n.language === language.code
                      ? 'bg-gradient-to-r from-squid-red/30 to-squid-pink/30 text-squid-light-grey border-2 border-squid-red/50 shadow-glow-red'
                      : 'text-squid-light-grey hover:bg-squid-red/20 hover:text-squid-red border-2 border-transparent hover:border-squid-red/30 hover:shadow-glow-red'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl transform transition-transform group-hover:scale-110">{language.flag}</span>
                    <div className="text-left">
                      <div className="font-bold text-base tracking-wider">{language.name}</div>
                      <div className={`text-xs ${i18n.language === language.code ? 'text-squid-red' : 'text-squid-grey'}`}>
                        {language.shortName}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {i18n.language === language.code && (
                      <div className="w-2 h-2 bg-squid-red rounded-full animate-squid-pulse"></div>
                    )}
                    {i18n.language === language.code ? (
                      <Check className="w-5 h-5 text-squid-red animate-squid-bounce" />
                    ) : (
                      <div className="w-5 h-5"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-squid-red/30">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-squid-grey text-xs">
                  <span className="text-squid-red animate-squid-pulse">◯</span>
                  <span>PAYU GLOBAL COMMUNITY</span>
                  <span className="text-squid-ice-blue animate-squid-bounce">△</span>
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