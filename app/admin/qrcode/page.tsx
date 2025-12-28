'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCodeGenerator from '@/app/components/QRCodeGenerator';
import { useLanguage } from '@/app/components/ClientLayout';
import { FaQrcode, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminQRCode() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const translations = {
    title: {
      en: 'QR Code Generator',
      fa: 'تولیدکننده QR Code'
    },
    subtitle: {
      en: 'Generate QR codes for PDFs and URLs',
      fa: 'تولید QR Code برای فایل‌های PDF و لینک‌ها'
    },
    backToDashboard: {
      en: 'Back to Dashboard',
      fa: 'بازگشت به داشبورد'
    },
    instructions: {
      en: 'Instructions',
      fa: 'راهنمای استفاده'
    },
    instruction1: {
      en: 'Enter the PDF URL or path (e.g., /pdfs/catalog.pdf)',
      fa: 'آدرس PDF یا مسیر را وارد کنید (مثال: /pdfs/catalog.pdf)'
    },
    instruction2: {
      en: 'Adjust the QR code size if needed',
      fa: 'در صورت نیاز، اندازه QR Code را تنظیم کنید'
    },
    instruction3: {
      en: 'Click "Generate QR Code" to create the QR code',
      fa: 'برای ایجاد QR Code روی "تولید QR Code" کلیک کنید'
    },
    instruction4: {
      en: 'Download the QR code image to use anywhere',
      fa: 'تصویر QR Code را دانلود کنید تا در هر جایی استفاده کنید'
    },
    tip: {
      en: 'Tip',
      fa: 'نکته'
    },
    tipText: {
      en: 'If your PDF is in the /public/pdfs/ folder, use the path /pdfs/filename.pdf',
      fa: 'اگر PDF شما در پوشه /public/pdfs/ است، از مسیر /pdfs/filename.pdf استفاده کنید'
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-laeisaz-title text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`bg-white bg-opacity-20 p-3 rounded-full ${language === 'fa' ? 'ml-4' : 'mr-4'}`}>
                <FaQrcode className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{translations.title[language]}</h1>
                <p className="text-sm text-white text-opacity-90 mt-1">
                  {translations.subtitle[language]}
                </p>
              </div>
            </div>
            <Link
              href="/admin"
              className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors"
              dir={language === 'fa' ? 'rtl' : 'ltr'}
            >
              {language === 'en' ? <FaArrowLeft className="mr-2" /> : null}
              <span>{translations.backToDashboard[language]}</span>
              {language === 'fa' ? <FaArrowLeft className="ml-2" /> : null}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code Generator */}
          <div className="lg:col-span-2">
            <QRCodeGenerator 
              defaultUrl="/pdfs/"
              label={language === 'en' ? 'PDF URL or Path' : 'آدرس PDF یا مسیر'}
            />
          </div>

          {/* Instructions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {translations.instructions[language]}
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li className="text-sm">{translations.instruction1[language]}</li>
                <li className="text-sm">{translations.instruction2[language]}</li>
                <li className="text-sm">{translations.instruction3[language]}</li>
                <li className="text-sm">{translations.instruction4[language]}</li>
              </ol>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <p className="text-sm font-semibold text-blue-800 mb-2">
                  {translations.tip[language]}
                </p>
                <p className="text-xs text-blue-700">
                  {translations.tipText[language]}
                </p>
              </div>

              {/* Example URLs */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  {language === 'en' ? 'Example URLs:' : 'مثال‌های آدرس:'}
                </h3>
                <div className="space-y-2">
                  <div className="text-xs bg-gray-50 p-2 rounded border border-gray-200">
                    <code className="text-gray-800">/pdfs/catalog.pdf</code>
                  </div>
                  <div className="text-xs bg-gray-50 p-2 rounded border border-gray-200">
                    <code className="text-gray-800">/pdfs/product-catalog.pdf</code>
                  </div>
                  <div className="text-xs bg-gray-50 p-2 rounded border border-gray-200">
                    <code className="text-gray-800">https://example.com/file.pdf</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

