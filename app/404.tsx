'use client'

import { useLanguage } from './components/ClientLayout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { language } = useLanguage()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#e5f0f3] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-laeisaz-title mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          {language === 'en' ? 'Page Not Found' : 'صفحه یافت نشد'}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {language === 'en' 
            ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
            : 'صفحه ای که به دنبال آن هستید ممکن است حذف شده باشد، نام آن تغییر کرده باشد یا موقتاً در دسترس نباشد.'}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-laeisaz-title text-white px-6 py-3 rounded-lg hover:bg-laeisaz-title/90 transition-colors"
          >
            {language === 'en' ? 'Go Back' : 'بازگشت'}
          </button>
          <Link
            href="/"
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {language === 'en' ? 'Go to Homepage' : 'رفتن به صفحه اصلی'}
          </Link>
        </div>
      </div>
    </div>
  )
} 