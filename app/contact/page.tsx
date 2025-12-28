'use client'

import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { useLanguage } from '../components/ClientLayout'

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const translations = {
    hero: {
      title: {
        en: 'Contact Us',
        fa: 'تماس با ما'
      },
      description: {
        en: 'Get in touch with our team for any inquiries or support',
        fa: 'برای هرگونه سوال یا پشتیبانی با تیم ما تماس بگیرید'
      }
    },
    form: {
      name: {
        en: 'Name',
        fa: 'نام'
      },
      email: {
        en: 'Email',
        fa: 'ایمیل'
      },
      phone: {
        en: 'Phone',
        fa: 'تلفن'
      },
      subject: {
        en: 'Subject',
        fa: 'موضوع'
      },
      message: {
        en: 'Message',
        fa: 'پیام'
      },
      submit: {
        en: 'Send Message',
        fa: 'ارسال پیام'
      }
    },
    contactInfo: {
      title: {
        en: 'Contact Information',
        fa: 'اطلاعات تماس'
      },
      address: {
        en: 'Address',
        fa: 'آدرس'
      },
      addressValue: {
        en: 'No. 202, South Sohrevardi Ave., Tehran 1578764616, Iran',
        fa: 'تهران، خیابان سهروردی جنوبی، پلاک ۲۰۲، کدپستی ۱۵۷۸۷۶۴۶۱۶'
      },
      phone: {
        en: 'Phone',
        fa: 'تلفن'
      },
      phoneValue: {
        en: '+98 (21) 42756, +98 (21) 88843090',
        fa: '۰۲۱-۴۲۷۵۶، ۰۲۱-۸۸۸۴۳۰۹۰'
      },
      fax: {
        en: 'Fax',
        fa: 'فکس'
      },
      faxValue: {
        en: '+98 (21) 88305420',
        fa: '۰۲۱-۸۸۳۰۵۴۲۰'
      },
      email: {
        en: 'Email',
        fa: 'ایمیل'
      },
      hours: {
        en: 'Business Hours',
        fa: 'ساعات کاری'
      },
      hoursValue: {
        en: 'Saturday - Wednesday: 9:00 AM - 5:00 PM',
        fa: 'شنبه تا چهارشنبه: ۹:۰۰ صبح تا ۵:۰۰ بعد از ظهر'
      }
    }
  };

  // Use short link for clickthrough, and an embeddable URL for the iframe
  const googleMapsShortUrl = 'https://maps.app.goo.gl/hvVamgnXA9DUDNrWA';
  const googleMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    'PCFP+C3F, Tehran, Tehran Province, Iran'
  )}&output=embed`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-laeisaz-background">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-laeisaz-title">
          <div className="absolute inset-0 bg-[url('/images/optimized/background2.webp')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {translations.hero.title[language]}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {translations.hero.description[language]}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimateOnScroll>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-laeisaz-title mb-6">
                  {language === 'en' ? 'Send us a message' : 'پیام خود را ارسال کنید'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-laeisaz-text mb-2">
                      {translations.form.name[language]}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-laeisaz-text mb-2">
                      {translations.form.email[language]}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-laeisaz-text mb-2">
                      {translations.form.phone[language]}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-laeisaz-text mb-2">
                      {translations.form.subject[language]}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-laeisaz-text mb-2">
                      {translations.form.message[language]}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-laeisaz-title text-white py-3 px-6 rounded-md hover:bg-laeisaz-title/90 transition-colors"
                  >
                    {translations.form.submit[language]}
                  </button>
                </form>
              </div>
            </AnimateOnScroll>

            {/* Contact Information */}
            <AnimateOnScroll className="delay-200">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-laeisaz-title mb-6">
                  {translations.contactInfo.title[language]}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className={`text-laeisaz-title text-xl mt-1 ${language === 'fa' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-laeisaz-text mb-1">
                        {translations.contactInfo.address[language]}
                      </h3>
                      <p className="text-laeisaz-text">
                        <a
                          href={googleMapsShortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline hover:text-laeisaz-title"
                        >
                          {translations.contactInfo.addressValue[language]}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className={`text-laeisaz-title text-xl mt-1 ${language === 'fa' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-laeisaz-text mb-1">
                        {translations.contactInfo.phone[language]}
                      </h3>
                      <p className="text-laeisaz-text">
                        <a href="tel:+982142756" className="no-underline hover:no-underline">
                          {language === 'fa' ? '۰۲۱-۴۲۷۵۶' : '+98 (21) 42756'}
                        </a>
                        <span className="mx-2">,</span>
                        <a href="tel:+982188843090" className="no-underline hover:no-underline">
                          {language === 'fa' ? '۰۲۱-۸۸۸۴۳۰۹۰' : '+98 (21) 88843090'}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className={`text-laeisaz-title text-xl mt-1 ${language === 'fa' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-laeisaz-text mb-1">
                        {translations.contactInfo.fax[language]}
                      </h3>
                      <p className="text-laeisaz-text">
                        <a href="tel:+982188305420" className="no-underline hover:no-underline">
                          {language === 'fa' ? '۰۲۱-۸۸۳۰۵۴۲۰' : '+98 (21) 88305420'}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className={`text-laeisaz-title text-xl mt-1 ${language === 'fa' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-laeisaz-text mb-1">
                        {translations.contactInfo.email[language]}
                      </h3>
                      <p className="text-laeisaz-text">
                        <a href="mailto:info@laeisaz.com" className="no-underline hover:no-underline">info@laeisaz.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaClock className={`text-laeisaz-title text-xl mt-1 ${language === 'fa' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-laeisaz-text mb-1">
                        {translations.contactInfo.hours[language]}
                      </h3>
                      <p className="text-laeisaz-text">
                        {translations.contactInfo.hoursValue[language]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Embedded Google Map */}
                <div className="mt-8">
                  <div className="h-64 w-full overflow-hidden rounded-lg border border-gray-200">
                    <iframe
                      title="Company location map"
                      src={googleMapEmbedUrl}
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="mt-3 text-right">
                    <a
                      href={googleMapsShortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-laeisaz-title hover:underline"
                    >
                      {language === 'fa' ? 'باز کردن در گوگل مپ' : 'Open in Google Maps'}
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  )
} 