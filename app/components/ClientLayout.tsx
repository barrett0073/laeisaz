'use client';

import React, { useState, ReactNode, useEffect, memo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationProvider from '../contexts/NotificationContext';

type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Memoize children components to avoid unnecessary re-renders
const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fa');

  // Initialize language from localStorage or cookie - with enhanced performance
  useEffect(() => {
    const getInitialLanguage = () => {
      // First check localStorage
      try {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage === 'en' || savedLanguage === 'fa') {
          return savedLanguage;
        }
        
        // Then check cookie
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('language='))
          ?.split('=')[1];
          
        if (cookieValue === 'en' || cookieValue === 'fa') {
          localStorage.setItem('language', cookieValue);
          return cookieValue as Language;
        }
      } catch (e) {
        console.error('Error reading language preference:', e);
      }
      
      return 'fa'; // Default language for first-time visitors
    };
    
    setLanguage(getInitialLanguage());
  }, []);

  // Update document lang attribute and direction when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    }
  }, [language]);

  // Update localStorage and cookie when language changes - with debouncing
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    
    // Use requestIdleCallback for non-critical operations
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      // @ts-ignore - TypeScript doesn't recognize requestIdleCallback
      window.requestIdleCallback(() => {
        try {
          localStorage.setItem('language', lang);
          document.cookie = `language=${lang}; path=/; max-age=31536000; sameSite=lax`;
        } catch (e) {
          console.error('Error saving language preference:', e);
        }
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        try {
          localStorage.setItem('language', lang);
          document.cookie = `language=${lang}; path=/; max-age=31536000; sameSite=lax`;
        } catch (e) {
          console.error('Error saving language preference:', e);
        }
      }, 0);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      <NotificationProvider>
      <div dir={language === 'fa' ? 'rtl' : 'ltr'} className="hardware-accelerated">
        <MemoizedNavbar />
        <main className="hardware-accelerated">{children}</main>
        <MemoizedFooter />
      </div>
      </NotificationProvider>
    </LanguageContext.Provider>
  );
} 