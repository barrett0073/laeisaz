'use client'

import Image from 'next/image'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useLanguage } from '../../components/ClientLayout'

export default function Coating() {
  const { language } = useLanguage();

  const translations = {
    hero: {
      title: {
        en: 'Coating',
        fa: 'لایی کوتینگ'
      },
      description: {
        en: 'Advanced coating solutions for superior surface protection',
        fa: 'راه‌حل‌های پیشرفته لایی کوتینگ برای محافظت سطحی برتر'
      }
    },
    overview: {
      title: {
        en: 'Product Overview',
        fa: 'معرفی محصول'
      },
      description: {
        en: 'Our coating products provide excellent surface protection and enhancement for various materials and applications.',
        fa: 'محصولات لایی کوتینگ ما محافظت و بهبود سطح عالی برای مواد و کاربردهای مختلف ارائه می‌دهند.'
      },
      points: {
        en: [
          'Superior surface protection',
          'Enhanced durability',
          'Chemical resistance',
          'Easy application',
          'Wide range of finishes'
        ],
        fa: [
          'محافظت سطحی برتر',
          'دوام بهبود یافته',
          'مقاومت شیمیایی',
          'کاربرد آسان',
          'محدوده گسترده پرداخت‌ها'
        ]
      }
    },
    features: {
      title: {
        en: 'Key Features',
        fa: 'ویژگی‌های کلیدی'
      },
      items: [
        {
          title: {
            en: 'Surface Protection',
            fa: 'محافظت سطحی'
          },
          description: {
            en: 'Provides excellent protection against wear and corrosion',
            fa: 'محافظت عالی در برابر سایش و خوردگی ارائه می‌دهد'
          }
        },
        {
          title: {
            en: 'Durability',
            fa: 'دوام'
          },
          description: {
            en: 'Long-lasting performance in harsh environments',
            fa: 'عملکرد طولانی مدت در محیط‌های سخت'
          }
        },
        {
          title: {
            en: 'Versatility',
            fa: 'تنوع'
          },
          description: {
            en: 'Suitable for various materials and applications',
            fa: 'مناسب برای مواد و کاربردهای مختلف'
          }
        }
      ]
    },
    specifications: {
      title: {
        en: 'Technical Specifications',
        fa: 'مشخصات فنی'
      },
      items: [
        {
          label: {
            en: 'Thickness',
            fa: 'ضخامت'
          },
          value: '10-100 microns'
        },
        {
          label: {
            en: 'Curing Time',
            fa: 'زمان پخت'
          },
          value: '24-48 hours'
        },
        {
          label: {
            en: 'Temperature Range',
            fa: 'محدوده دما'
          },
          value: '-40°C to 150°C'
        }
      ]
    },
    gallery: {
      title: {
        en: 'Product Gallery',
        fa: 'گالری محصول'
      },
      items: [
        {
          title: {
            en: 'Coating Application',
            fa: 'کاربرد لایی کوتینگ'
          },
          image: '/images/products/coating-1.jpg'
        },
        {
          title: {
            en: 'Finished Surface',
            fa: 'سطح نهایی'
          },
          image: '/images/products/coating-2.jpg'
        }
      ]
    }
  };

  return (
    <div className="bg-laeisaz-background">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-white">
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

      {/* Product Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-laeisaz-title">
                  {translations.overview.title[language]}
                </h2>
                <p className="text-laeisaz-text">
                  {translations.overview.description[language]}
                </p>
                <ul className="space-y-3">
                  {translations.overview.points[language].map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-laeisaz-title mr-2">•</span>
                      <span className="text-laeisaz-text">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-200">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/products/coating-main.jpg"
                  alt={translations.hero.title[language]}
                  fill
                  className="object-cover"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-laeisaz-title text-center mb-12">
              {translations.features.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {translations.features.items.map((feature, index) => (
              <AnimateOnScroll key={index} className={`delay-${(index + 1) * 200}`}>
                <div className="bg-laeisaz-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-laeisaz-title mb-3">
                    {feature.title[language]}
                  </h3>
                  <p className="text-laeisaz-text">
                    {feature.description[language]}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-laeisaz-title text-center mb-12">
              {translations.specifications.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                {translations.specifications.items.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="font-medium text-laeisaz-title">
                      {spec.label[language]}
                    </span>
                    <span className="text-laeisaz-text">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 