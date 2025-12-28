'use client'

import Link from 'next/link'
import { useLanguage } from './components/ClientLayout'

export default function NotFound() {
  const { language } = useLanguage();

  const translations = {
    title: {
      en: 'Page Not Found',
      fa: 'صفحه یافت نشد'
    },
    description: {
      en: 'The page you are looking for does not exist.',
      fa: 'صفحه ای که به دنبال آن هستید وجود ندارد.'
    },
    returnHome: {
      en: 'Return Home',
      fa: 'بازگشت به صفحه اصلی'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5f0f3] text-[#0a335f]">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-8">{translations.title[language]}</h2>
        <p className="mb-8">{translations.description[language]}</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-[#e65300] text-white rounded-md hover:bg-[#e65300]/90 transition-colors"
        >
          {translations.returnHome[language]}
        </Link>
      </div>
    </div>
  )
} 