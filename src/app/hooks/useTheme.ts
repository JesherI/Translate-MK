'use client';

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedTheme = localStorage.getItem('translate-mk-theme') as Theme;
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        setThemeState(savedTheme);
      }
    } catch (e) {
      console.error('Error loading theme:', e);
    }
    setIsLoaded(true);
  }, []);

  // Apply theme to document (client-side only)
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    try {
      localStorage.setItem('translate-mk-theme', theme);
    } catch (e) {
      console.error('Error saving theme:', e);
    }
  }, [theme, isLoaded]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      // Immediate apply and save
      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        if (newTheme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
        try {
          localStorage.setItem('translate-mk-theme', newTheme);
        } catch (e) {
          console.error('Error saving theme:', e);
        }
      }
      return newTheme;
    });
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLoaded,
  };
}
