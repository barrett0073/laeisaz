'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../components/ClientLayout'

export default function BagShoes() {
  const { language } = useLanguage()
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const bagShoesProducts = [
    {
      title: {
        en: 'Tectex Adhesive Pad',
        fa: 'پد چسبی تکتکس'
      },
      description: {
        en: 'Specialized adhesive pads designed for bag manufacturing and accessories.',
        fa: 'پدهای چسبی تخصصی طراحی شده برای تولید کیف و لوازم جانبی.'
      },
      applications: {
        en: ['Bags', 'Accessories', 'Leather Goods', 'Fashion Items'],
        fa: ['کیف', 'لوازم جانبی', 'کالاهای چرمی', 'اقلام مد']
      },
      features: {
        en: [
          'Fabric-based material',
          'High strength',
          'Flexible application',
          'Durable bonding'
        ],
        fa: [
          'ماده با پایه پارچه',
          'استحکام بالا',
          'کاربرد انعطاف‌پذیر',
          'پیوند بادوام'
        ]
      },
      href: '/industries/bag-shoes/tectex-pad',
      image: '/images/tectex-pad.jpg'
    },
    {
      title: {
        en: 'IVA Fabric Adhesive Pad',
        fa: 'پد چسبی پارچه IVA'
      },
      description: {
        en: 'Premium adhesive pads specifically designed for shoe manufacturing.',
        fa: 'پدهای چسبی با کیفیت بالا که به طور خاص برای تولید کفش طراحی شده‌اند.'
      },
      applications: {
        en: ['Shoes', 'Footwear', 'Leather Products', 'Accessories'],
        fa: ['کفش', 'پاپوش', 'محصولات چرمی', 'لوازم جانبی']
      },
      features: {
        en: [
          'Specialized for footwear',
          'Strong adhesion',
          'Flexible material',
          'High durability'
        ],
        fa: [
          'تخصصی برای پاپوش',
          'چسبندگی قوی',
          'ماده انعطاف‌پذیر',
          'دوام بالا'
        ]
      },
      href: '/industries/bag-shoes/iva-pad',
      image: '/images/iva-pad.jpg'
    }
  ]

  const content = {
    hero: {
      title: {
        en: 'Bag & Shoes Products',
        fa: 'محصولات کیف و کفش'
      },
      description: {
        en: 'Coated and split nonwovens for bags, shoes, and artificial leather industries',
        fa: 'منسوجات نبافته کوت شده و اسپان برای کیف، کفش و صنایع چرم مصنوعی'
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

      {/* Middle Section - Product Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-laeisaz-title mb-6">
                {language === 'en' ? 'Bag & Shoes Applications' : 'کاربردهای کیف و کفش'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'en' 
                  ? 'Our specialized nonwoven materials are designed for various applications in the bag and shoe manufacturing industry, providing durability, flexibility, and aesthetic appeal.'
                  : 'مواد غیربافته تخصصی ما برای کاربردهای مختلف در صنعت تولید کیف و کفش طراحی شده‌اند و دوام، انعطاف‌پذیری و جذابیت زیبایی را فراهم می‌کنند.'}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {/* Tectex Adhesive Pad */}
            <AnimateOnScroll className="delay-200">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={bagShoesProducts[0].image}
                      alt={bagShoesProducts[0].title[language]}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {bagShoesProducts[0].title[language]}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {bagShoesProducts[0].description[language]}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-laeisaz-title mb-3">
                      {language === 'en' ? 'Key Features:' : 'ویژگی‌های کلیدی:'}
                    </h4>
                    <ul className="space-y-2">
                      {bagShoesProducts[0].features[language].map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-laeisaz-title rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-laeisaz-title mb-3">
                      {language === 'en' ? 'Applications:' : 'کاربردها:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {bagShoesProducts[0].applications[language].map((app, idx) => (
                        <span key={idx} className="bg-laeisaz-background text-laeisaz-text px-3 py-1 rounded-full text-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* IVA Fabric Adhesive Pad */}
            <AnimateOnScroll className="delay-300">
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={bagShoesProducts[1].image}
                      alt={bagShoesProducts[1].title[language]}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {bagShoesProducts[1].title[language]}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {bagShoesProducts[1].description[language]}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-laeisaz-title mb-3">
                      {language === 'en' ? 'Key Features:' : 'ویژگی‌های کلیدی:'}
                    </h4>
                    <ul className="space-y-2">
                      {bagShoesProducts[1].features[language].map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-laeisaz-title rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-laeisaz-title mb-3">
                      {language === 'en' ? 'Applications:' : 'کاربردها:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {bagShoesProducts[1].applications[language].map((app, idx) => (
                        <span key={idx} className="bg-laeisaz-background text-laeisaz-text px-3 py-1 rounded-full text-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-laeisaz-title text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold mb-8">
              {language === 'en' ? 'Interested in Our Bag & Shoes Products?' : 'علاقه‌مند به محصولات کیف و کفش ما هستید؟'}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {language === 'en' ? 'Contact our sales team for detailed specifications and pricing' : 'برای دریافت مشخصات فنی و قیمت‌ها با تیم فروش ما تماس بگیرید'}
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