'use client';

import { useState, useEffect, useCallback } from 'react';
import { translations, Language } from '../i18n/translations';

export function useI18n() {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedLang = localStorage.getItem('translate-mk-language') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error('Error loading language:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when language changes (client-side only)
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('translate-mk-language', language);
    } catch (e) {
      console.error('Error saving language:', e);
    }
  }, [language, isLoaded]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let value: unknown = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Fallback to English if key not found
          let fallback: unknown = translations.en;
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              fallback = (fallback as Record<string, unknown>)[fk];
            } else {
              return key; // Return key as-is if not found
            }
          }
          return fallback as string || key;
        }
      }
      
      return value as string || key;
    },
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => {
      const newLang = prev === 'en' ? 'es' : 'en';
      // Immediate save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('translate-mk-language', newLang);
        } catch (e) {
          console.error('Error saving language:', e);
        }
      }
      return newLang;
    });
  }, []);

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isLoaded,
  };
}
