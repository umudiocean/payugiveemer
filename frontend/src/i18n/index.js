import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import en from './locales/en.json'
import tr from './locales/tr.json'
import es from './locales/es.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import ru from './locales/ru.json'
import ar from './locales/ar.json'
import zh from './locales/zh.json'
import pt from './locales/pt.json'
import id from './locales/id.json'

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  es: { translation: es },
  de: { translation: de },
  fr: { translation: fr },
  ru: { translation: ru },
  ar: { translation: ar },
  zh: { translation: zh },
  pt: { translation: pt },
  id: { translation: id }
}

// Supported languages whitelist
const supportedLngs = ['en', 'tr', 'es', 'de', 'fr', 'ru', 'ar', 'zh', 'pt', 'id']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs,
    fallbackLng: 'en',
    debug: false,
    load: 'languageOnly',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      // Important: localStorage must be FIRST to respect user's manual selection
      order: ['localStorage', 'querystring', 'navigator'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
      // Convert detected language codes to supported format
      convertDetectedLanguage: (lng) => {
        // Handle cases like 'en-US@posix', 'en-GB', etc.
        const base = lng.split('-')[0].split('@')[0].split('_')[0].toLowerCase()
        return supportedLngs.includes(base) ? base : 'en'
      }
    },
    
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
    }
  })

// RTL languages
export const RTL_LANGUAGES = ['ar']

// Language display names
export const LANGUAGE_NAMES = {
  en: 'English',
  tr: 'Türkçe',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  ru: 'Русский',
  ar: 'العربية',
  zh: '中文',
  pt: 'Português',
  id: 'Bahasa Indonesia'
}

// Expose i18n to window for debugging and global access
if (typeof window !== 'undefined') {
  window.i18next = i18n
}

export default i18n