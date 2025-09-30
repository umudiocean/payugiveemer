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
        className="flex items-center space-x-2 border-squid-grey/30 text-squid-grey hover:border-squid-pink hover:text-squid-pink bg-black/20 backdrop-blur-sm"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-black/90 backdrop-blur-xl border border-squid-grey/20 rounded-2xl shadow-glow z-50 max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-squid-grey px-3 py-2 font-medium">
                Select Language
              </div>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                    i18n.language === language.code
                      ? 'bg-squid-pink/20 text-squid-pink'
                      : 'text-white hover:bg-squid-grey/10 hover:text-squid-pink'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{language.flag}</span>
                    <span className="font-medium">{language.name}</span>
                  </div>
                  {i18n.language === language.code && (
                    <Check className="w-4 h-4 text-squid-pink" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSelector