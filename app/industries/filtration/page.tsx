'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaIndustry, FaRoad, FaCar, FaTshirt, FaBed, FaUtensils, FaChevronLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../components/ClientLayout'

export default function Filtration() {
  const { language } = useLanguage()
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
        en: 'Filtration Products',
        fa: 'محصولات فیلتراسیون'
      },
      description: {
        en: 'High-quality needle pads for various industrial applications',
        fa: 'لایی‌های سوزنی با کیفیت بالا برای کاربردهای صنعتی مختلف'
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

      {/* Middle Section - Needle Pads Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-laeisaz-title mb-6">
                {language === 'en' ? 'Needle Pads Applications' : 'کاربردهای لایی سوزنی'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'en' 
                  ? 'Needle pads are type of products that are manufactured from 80 to 700 grams per square meter and up to a width of 5200 mm. Automotive industries, filtration, insulation, medical equipment, geotextile, carpet, clothing, etc. are some of the consumer markets for this product.'
                  : 'لایی‌های سوزنی محصولاتی هستند که با وزن 80 تا 700 گرم در متر مربع و عرض تا 5200 میلی‌متر تولید می‌شوند. صنایع خودروسازی، فیلتراسیون، عایق‌بندی، تجهیزات پزشکی، ژئوتکستایل، فرش، پوشاک و غیره از جمله بازارهای مصرفی این محصول هستند.'}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-32">
            {/* Car Filter */}
            <AnimateOnScroll className="delay-200">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/car-filter.jpg"
                      alt={language === 'en' ? 'Car Filter' : 'فیلتر خودرو'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Car Filter' : 'فیلتر خودرو'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'Needle pads are crucial components in automotive filtration systems, including air filters, cabin filters, and oil filters. Our high-performance needle pads ensure optimal engine protection by effectively filtering dust, pollen, and contaminants. These automotive filters provide superior airflow while maintaining excellent filtration efficiency for enhanced vehicle performance and passenger comfort.'
                      : 'لایی‌های سوزنی اجزای حیاتی در سیستم‌های فیلتراسیون خودرو هستند، شامل فیلترهای هوا، فیلترهای کابین و فیلترهای روغن. لایی‌های سوزنی با عملکرد بالا ما محافظت بهینه موتور را با فیلتراسیون مؤثر غبار، گرده و آلاینده‌ها تضمین می‌کنند. این فیلترهای خودرویی جریان هوای برتر را در حین حفظ کارایی فیلتراسیون عالی برای بهبود عملکرد خودرو و راحتی مسافران فراهم می‌کنند.'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Tea Filter */}
            <AnimateOnScroll className="delay-300">
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/tea-filter.jpg"
                      alt={language === 'en' ? 'Tea Filter' : 'فیلتر چای'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Tea Filter' : 'فیلتر چای'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'Needle pads are extensively used in tea filtration systems to ensure pure and clean tea extraction. Our high-quality needle pads provide excellent filtration efficiency, removing fine particles while maintaining the natural flavor and aroma of tea. These specialized filters are designed for both commercial tea production and premium brewing applications.'
                      : 'لایی‌های سوزنی به طور گسترده در سیستم‌های فیلتراسیون چای برای تضمین استخراج چای خالص و تمیز استفاده می‌شوند. لایی‌های سوزنی با کیفیت بالا ما کارایی فیلتراسیون عالی ارائه می‌دهند، ذرات ریز را حذف می‌کنند در حالی که طعم و عطر طبیعی چای را حفظ می‌کنند. این فیلترهای تخصصی برای تولید تجاری چای و کاربردهای دم‌آوری درجه یک طراحی شده‌اند.'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Filtration */}
            <AnimateOnScroll className="delay-400">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/filtration.jpg"
                      alt={language === 'en' ? 'Filtration' : 'فیلتراسیون'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Filtration' : 'فیلتراسیون'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'Needle pads are essential in filtration systems, providing efficient air and liquid filtration solutions for various industrial and environmental applications.'
                      : 'لایی‌های سوزنی در سیستم‌های فیلتراسیون ضروری هستند و راهکارهای کارآمد برای فیلتراسیون هوا و مایعات در کاربردهای صنعتی و محیطی مختلف ارائه می‌دهند.'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Car Manufacturing */}
            <AnimateOnScroll className="delay-500">
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/automotive.jpg"
                      alt={language === 'en' ? 'Car Manufacturing' : 'تولید خودرو'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Car Manufacturing' : 'تولید خودرو'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'In the automotive industry, needle pads are used for various applications including sound insulation, thermal protection, and interior components manufacturing.'
                      : 'در صنعت خودروسازی، لایی‌های سوزنی برای کاربردهای مختلف از جمله عایق‌بندی صوتی، محافظت حرارتی و تولید قطعات داخلی استفاده می‌شوند.'}
                  </p>
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
            <h2 className="text-4xl font-bold mb-8">Interested in Our Filtration Products?</h2>
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