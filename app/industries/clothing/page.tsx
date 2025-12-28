'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../components/ClientLayout'

export default function Clothing() {
  const { language } = useLanguage()

  const clothingProducts = [
    {
      title: {
        en: 'Thermobond Adhesive Pad',
        fa: 'پد چسبی ترموباند'
      },
      description: {
        en: 'High-quality paper-based adhesive pads designed for clothing applications.',
        fa: 'پدهای چسبی با پایه کاغذ با کیفیت بالا، طراحی شده برای کاربردهای پوشاک.'
      },
      applications: {
        en: ['Clothing', 'Textile', 'Embroidery', 'Fashion'],
        fa: ['پوشاک', 'منسوجات', 'گلدوزی', 'مد']
      },
      features: {
        en: [
          'Paper-based material',
          'Up to 1600mm width',
          'Excellent adhesion',
          'Easy to use'
        ],
        fa: [
          'ماده با پایه کاغذ',
          'عرض تا 1600 میلی‌متر',
          'چسبندگی عالی',
          'استفاده آسان'
        ]
      },
      href: '/industries/clothing/thermobond-pad',
      image: '/images/thermobond-pad.jpg'
    },
    {
      title: {
        en: 'ICP Needle Adhesive Pad',
        fa: 'پد چسبی سوزنی ICP'
      },
      description: {
        en: 'Advanced needle adhesive pads for clothing and textile applications.',
        fa: 'پدهای چسبی سوزنی پیشرفته برای کاربردهای پوشاک و منسوجات.'
      },
      applications: {
        en: ['Clothing', 'Textile', 'Fashion', 'Apparel'],
        fa: ['پوشاک', 'منسوجات', 'مد', 'لباس']
      },
      features: {
        en: [
          'Needle-based technology',
          'Precise bonding',
          'High performance',
          'Versatile applications'
        ],
        fa: [
          'فناوری سوزنی',
          'پیوند دقیق',
          'عملکرد بالا',
          'کاربردهای متنوع'
        ]
      },
      href: '/industries/clothing/icp-pad',
      image: '/images/icp-pad.jpg'
    },
    {
      title: {
        en: 'ILD Needle Adhesive Pad',
        fa: 'پد چسبی سوزنی ILD'
      },
      description: {
        en: 'Specialized needle adhesive pads for clothing manufacturing.',
        fa: 'پدهای چسبی سوزنی تخصصی برای تولید پوشاک.'
      },
      applications: {
        en: ['Clothing', 'Fashion', 'Apparel', 'Textile'],
        fa: ['پوشاک', 'مد', 'لباس', 'منسوجات']
      },
      features: {
        en: [
          'Advanced needle technology',
          'Superior bonding',
          'High quality',
          'Reliable performance'
        ],
        fa: [
          'فناوری سوزنی پیشرفته',
          'پیوند برتر',
          'کیفیت بالا',
          'عملکرد قابل اعتماد'
        ]
      },
      href: '/industries/clothing/ild-pad',
      image: '/images/clothing/ild-pad.jpg'
    },
    {
      title: {
        en: 'Curtain Pad',
        fa: 'پد پردینه'
      },
      description: {
        en: 'Specialized adhesive pads designed for decoration and curtain applications.',
        fa: 'پدهای چسبی تخصصی طراحی شده برای کاربردهای تزئینی و پرده.'
      },
      applications: {
        en: ['Decoration', 'Curtains', 'Home Textile', 'Interior Design'],
        fa: ['تزئین', 'پرده', 'منسوجات خانگی', 'طراحی داخلی']
      },
      features: {
        en: [
          'Decorative applications',
          'Easy installation',
          'Durable material',
          'Versatile use'
        ],
        fa: [
          'کاربردهای تزئینی',
          'نصب آسان',
          'ماده بادوام',
          'استفاده متنوع'
        ]
      },
      href: '/industries/clothing/curtain-pad',
      image: '/images/clothing/curtain-pad.jpg'
    }
  ]

  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const content = {
    hero: {
      title: {
        en: 'Clothing Industry Products',
        fa: 'محصولات صنعت پوشاک'
      },
      description: {
        en: 'High-quality adhesive pads for clothing, textile, and fashion applications',
        fa: 'پدهای چسبی با کیفیت بالا برای کاربردهای پوشاک، منسوجات و مد'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-laeisaz-title">
          <div className="absolute inset-0 bg-[url('/images/optimized/background2.webp')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {content.hero.title[language]}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {content.hero.description[language]}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Alternating Image-Text Sections */}
      {clothingProducts.map((product, index) => (
        <section key={index} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-laeisaz-background'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
              <div className="w-full md:w-1/2">
                <AnimateOnScroll>
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={product.image}
                      alt={product.title[language]}
                      fill
                      className="object-cover"
                    />
                  </div>
                </AnimateOnScroll>
              </div>
              <div className="w-full md:w-1/2">
                <AnimateOnScroll className="delay-200">
                  <h2 className="text-3xl font-bold text-laeisaz-title mb-6">{product.title[language]}</h2>
                  <p className="text-laeisaz-text mb-6">{product.description[language]}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-laeisaz-title mb-2">
                      {language === 'en' ? 'Key Features' : 'ویژگی‌های کلیدی'}
                    </h3>
                    <ul className="list-disc list-inside text-laeisaz-text space-y-1">
                      {product.features[language].map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-laeisaz-title mb-2">
                      {language === 'en' ? 'Applications' : 'کاربردها'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications[language].map((app, idx) => (
                        <span key={idx} className="bg-laeisaz-background text-laeisaz-text px-3 py-1 rounded-full text-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-20 bg-laeisaz-title text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold mb-8">Interested in Our Clothing Products?</h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact our sales team for detailed specifications and pricing
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-300">
            <Link
              href="/contact"
              className="bg-white text-laeisaz-title px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              {language === 'en' ? 'Contact Sales' : 'تماس با فروش'}
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
} 