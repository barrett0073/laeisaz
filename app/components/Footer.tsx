'use client'

import Link from 'next/link'
import { useLanguage } from './ClientLayout'

const Footer = () => {
  const { language } = useLanguage();

  const translations = {
    company: {
      title: {
        en: 'LaeiSaz Industrial Company',
        fa: 'شرکت صنعتی لایی‌ساز'
      },
      description: {
        en: 'Established in 1983, LaeiSaz is one of the biggest nonwoven producers in the Middle East region, specializing in non-woven and fusible interlinings production.',
        fa: 'تاسیس شده در سال ۱۳۶۲، لایی‌ساز یکی از بزرگترین تولیدکنندگان منسوجات نبافته در خاورمیانه است که در تولید منسوجات نبافته و لایی چسب تخصص دارد.'
      }
    },
    quickLinks: {
      title: {
        en: 'Quick Links',
        fa: 'دسترسی سریع'
      },
      products: {
        en: 'Products',
        fa: 'محصولات'
      },
      industries: {
        en: 'Industries',
        fa: 'صنایع'
      },
      technicalInfo: {
        en: 'Technical Info',
        fa: 'اطلاعات فنی'
      },
      about: {
        en: 'About',
        fa: 'درباره ما'
      },
      contactUs: {
        en: 'Contact Us',
        fa: 'تماس با ما'
      }
    },
    contact: {
      title: {
        en: 'Contact',
        fa: 'تماس با ما'
      },
      email: {
        en: 'Email',
        fa: 'ایمیل'
      },
      emailValue: {
        en: 'info@laeisaz.com',
        fa: 'info@laeisaz.com'
      },
      phone: {
        en: 'Phone',
        fa: 'تلفن'
      },
      phoneValue: {
        en: '+98 (21) 42756, +98 (21) 88843090',
        fa: '۴۲۷۵۶-۰۲۱، ۸۸۸۴۳۰۹۰-۰۲۱'
      },
      fax: {
        en: 'Fax',
        fa: 'فکس'
      },
      faxValue: {
        en: '+98 (21) 88305420',
        fa: '۸۸۳۰۵۴۲۰-۰۲۱'
      },
      address: {
        en: 'Address',
        fa: 'آدرس'
      },
      addressValue: {
        en: 'No. 202, South Sohrevardi Ave., Tehran 1578764616, Iran',
        fa: 'تهران، خیابان سهروردی جنوبی، پلاک ۲۰۲، کدپستی ۱۵۷۸۷۶۴۶۱۶'
      }
    },
    copyright: {
      en: '© {year} LaeiSaz Industrial Company. All rights reserved.',
      fa: '© {year} شرکت صنعتی لایی‌ساز. تمامی حقوق محفوظ است.'
    }
  };

  // Use provided Google Maps short link for the address
  const googleMapsUrl = 'https://maps.app.goo.gl/hvVamgnXA9DUDNrWA';
  const isFA = language === 'fa';

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-laeisaz-title mb-4">{translations.company.title[language]}</h3>
            <p className="text-laeisaz-text mb-4">
              {translations.company.description[language]}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-laeisaz-title mb-4">{translations.quickLinks.title[language]}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-laeisaz-text hover:text-laeisaz-title transition-colors duration-200">
                  {translations.quickLinks.products[language]}
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-laeisaz-text hover:text-laeisaz-title transition-colors duration-200">
                  {translations.quickLinks.industries[language]}
                </Link>
              </li>
              <li>
                <Link href="/technical-info" className="text-laeisaz-text hover:text-laeisaz-title transition-colors duration-200">
                  {translations.quickLinks.technicalInfo[language]}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-laeisaz-text hover:text-laeisaz-title transition-colors duration-200">
                  {translations.quickLinks.about[language]}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-laeisaz-text hover:text-laeisaz-title transition-colors duration-200">
                  {translations.quickLinks.contactUs[language]}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-laeisaz-title mb-4">{translations.contact.title[language]}</h4>
            <ul className="space-y-2 text-laeisaz-text">
              <li>
                {translations.contact.email[language]}: 
                <a
                  href={`mailto:${translations.contact.emailValue[language]}`}
                  className={`text-laeisaz-text hover:text-laeisaz-title no-underline ${isFA ? 'mr-1' : 'ml-1'} transition-colors duration-200`}
                >
                  {translations.contact.emailValue[language]}
                </a>
              </li>
              <li>
                {translations.contact.phone[language]}: 
                {translations.contact.phoneValue[language]
                  .split(',')
                  .map((p, idx, arr) => (
                    <span key={idx}>
                      <a
                        href={`tel:${p.replace(/[^+0-9]/g, '')}`}
                        className={`text-laeisaz-text hover:text-laeisaz-title no-underline ${isFA ? 'mr-1' : 'ml-1'} transition-colors duration-200`}
                      >
                        {p.trim()}
                      </a>
                      {idx < arr.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </li>
              <li>
                {translations.contact.fax[language]}: 
                <a
                  href={`tel:${translations.contact.faxValue[language].replace(/[^+0-9]/g, '')}`}
                  className={`text-laeisaz-text hover:text-laeisaz-title no-underline ${isFA ? 'mr-1' : 'ml-1'} transition-colors duration-200`}
                >
                  {translations.contact.faxValue[language]}
                </a>
              </li>
              <li>
                {translations.contact.address[language]}:
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-laeisaz-text hover:text-laeisaz-title no-underline ${isFA ? 'mr-1' : 'ml-1'} transition-colors duration-200`}
                >
                  {translations.contact.addressValue[language]}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-laeisaz-text mb-4 md:mb-0">
              {translations.copyright[language].replace('{year}', new Date().getFullYear().toString())}
            </p>
            {/* <div className="flex items-center gap-2">
              <img 
                src="/images/loading.png" 
                alt="Loading" 
                className="w-4 h-4 animate-spin" 
                style={{ animationDuration: '2s' }}
              />
              <a 
                href="https://adifystudio.ir" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center md:text-right hover:text-laeisaz-title transition-colors"
              >
                Created by Adify Studio
              </a>
              <img 
                src="/images/loading.png" 
                alt="Loading" 
                className="w-4 h-4 animate-spin" 
                style={{ animationDuration: '2s' }}
              />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 