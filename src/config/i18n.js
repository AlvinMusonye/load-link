// Load Link Internationalization Configuration
// react-i18next setup for English and Swahili

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from '../i18n/en.json';
import swTranslations from '../i18n/sw.json';

// Language resources
const resources = {
  en: {
    translation: enTranslations,
  },
  sw: {
    translation: swTranslations,
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    
    // Default language
    lng: 'en', // Default to English
    fallbackLng: 'en', // Fallback to English if translation missing
    
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'loadlink_language',
    },
    
    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes values
      formatSeparator: ',',
      format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        if (format === 'capitalize') return value.charAt(0).toUpperCase() + value.slice(1);
        return value;
      },
    },
    
    // Pluralization
    pluralSeparator: '_',
    
    // Key separator
    keySeparator: '.',
    
    // NS separator
    nsSeparator: ':',
    
    // Context separator
    contextSeparator: '_',
    
    // React options
    react: {
      useSuspense: false, // Disable suspense mode for simplicity
      bindI18n: 'languageChanged',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span'],
    },
    
    // Performance
    load: 'languageOnly', // Only load language, not region-specific variants
    simplifyPluralSuffix: true,
    
    // Missing keys
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },
  });

// Export helper functions
export const changeLanguage = (lng) => {
  return i18n.changeLanguage(lng);
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

export const getSupportedLanguages = () => {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  ];
};

export const isLanguageSupported = (lng) => {
  return Object.keys(resources).includes(lng);
};

// Format helpers
export const formatTranslation = (key, values = {}) => {
  return i18n.t(key, values);
};

export const formatCurrency = (amount, currency = 'KES') => {
  return new Intl.NumberFormat(i18n.language === 'sw' ? 'sw-KE' : 'en-KE', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const locale = i18n.language === 'sw' ? 'sw-KE' : 'en-KE';
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};

export const formatNumber = (number, options = {}) => {
  const locale = i18n.language === 'sw' ? 'sw-KE' : 'en-KE';
  return new Intl.NumberFormat(locale, options).format(number);
};

// Translation hooks for common patterns
export const useTranslation = () => {
  const { t } = i18n.useTranslation();
  
  return {
    t,
    // Common translation helpers
    status: (status) => t(`common.status.${status}`),
    button: (button) => t(`common.buttons.${button}`),
    label: (label) => t(`common.labels.${label}`),
    message: (message) => t(`common.messages.${message}`),
    error: (error) => t(`errors.${error}`),
    notification: (notification) => t(`notifications.${notification}`),
    // Feature-specific helpers
    shipment: (key) => t(`shipments.${key}`),
    fleet: (key) => t(`fleet.${key}`),
    billing: (key) => t(`billing.${key}`),
    customer: (key) => t(`customers.${key}`),
    report: (key) => t(`reports.${key}`),
    setting: (key) => t(`settings.${key}`),
    auth: (key) => t(`auth.${key}`),
    navigation: (key) => t(`navigation.${key}`),
    form: (key) => t(`forms.${key}`),
  };
};

// Export i18n instance for direct usage
export default i18n;
