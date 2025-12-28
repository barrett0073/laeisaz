'use client'

import Image from 'next/image'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaFire, FaIndustry, FaChartLine, FaCheck } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'

export default function Thermobonding() {
  const { language } = useLanguage();

  const translations = {
    hero: {
      title: {
        en: 'Thermobonding Materials',
        fa: 'مواد ترموباندینگ'
      },
      description: {
        en: 'High-performance thermally bonded nonwoven materials for demanding industrial applications',
        fa: 'مواد نبافته ترموباندینگ با عملکرد بالا برای کاربردهای صنعتی چالش‌برانگیز'
      }
    },
    overview: {
      title: {
        en: 'Product Overview',
        fa: 'معرفی محصول'
      },
      description: {
        en: 'Our thermobonding materials represent the pinnacle of nonwoven technology, offering superior bonding strength and versatility for various industrial applications. Through advanced thermal processing, we create materials that maintain exceptional structural integrity while meeting specific performance requirements.',
        fa: 'مواد ترموباندینگ ما نمایانگر اوج فناوری منسوجات نبافته هستند که استحکام پیوندی برتر و تنوع پذیری را برای کاربردهای مختلف صنعتی ارائه می‌دهند. از طریق پردازش حرارتی پیشرفته، ما موادی ایجاد می‌کنیم که در عین برآورده کردن نیازهای عملکردی خاص، یکپارچگی ساختاری استثنایی را حفظ می‌کنند.'
      },
      points: [
        {
          en: 'Advanced thermal bonding technology',
          fa: 'فناوری پیشرفته پیوند حرارتی'
        },
        {
          en: 'Consistent quality and performance',
          fa: 'کیفیت و عملکرد یکنواخت'
        },
        {
          en: 'Customizable specifications',
          fa: 'مشخصات قابل تنظیم'
        },
        {
          en: 'Excellent dimensional stability',
          fa: 'پایداری ابعادی عالی'
        },
        {
          en: 'Wide range of applications',
          fa: 'محدوده وسیعی از کاربردها'
        }
      ]
    },
    features: {
      title: {
        en: 'Key Features',
        fa: 'ویژگی‌های کلیدی'
      },
      items: [
        {
          title: {
            en: 'Superior Bonding',
            fa: 'پیوند برتر'
          },
          description: {
            en: 'Advanced thermal bonding technology ensures exceptional material integrity',
            fa: 'فناوری پیشرفته پیوند حرارتی یکپارچگی استثنایی مواد را تضمین می‌کند'
          }
        },
        {
          title: {
            en: 'Versatile Applications',
            fa: 'کاربردهای متنوع'
          },
          description: {
            en: 'Suitable for various industrial applications including automotive and construction',
            fa: 'مناسب برای کاربردهای مختلف صنعتی از جمله خودرو و ساختمان'
          }
        },
        {
          title: {
            en: 'High Performance',
            fa: 'عملکرد بالا'
          },
          description: {
            en: 'Excellent dimensional stability and mechanical properties',
            fa: 'پایداری ابعادی و خواص مکانیکی عالی'
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
            en: 'Weight Range',
            fa: 'محدوده وزن'
          },
          value: '30-500 g/m²'
        },
        {
          label: {
            en: 'Width',
            fa: 'عرض'
          },
          value: 'Up to 3.2 meters'
        },
        {
          label: {
            en: 'Temperature Resistance',
            fa: 'مقاومت در برابر دما'
          },
          value: '-40°C to +150°C'
        },
        {
          label: {
            en: 'Bonding Strength',
            fa: 'استحکام پیوند'
          },
          value: 'High'
        },
        {
          label: {
            en: 'Color Options',
            fa: 'گزینه‌های رنگ'
          },
          value: 'Customizable'
        },
        {
          label: {
            en: 'Material Composition',
            fa: 'ترکیب مواد'
          },
          value: 'Synthetic Fibers'
        }
      ]
    },
    gallery: {
      title: {
        en: 'Product Gallery',
        fa: 'گالری محصول'
      },
      images: [
        {
          title: {
            en: 'High-Performance Material',
            fa: 'ماده با عملکرد بالا'
          }
        },
        {
          title: {
            en: 'Industrial Application',
            fa: 'کاربرد صنعتی'
          }
        },
        {
          title: {
            en: 'Quality Testing',
            fa: 'آزمایش کیفیت'
          }
        },
        {
          title: {
            en: 'Manufacturing Process',
            fa: 'فرآیند تولید'
          }
        }
      ]
    }
  };

  const images = [
    {
      src: '/images/products/thermobonding/1.jpg',
      alt: 'Thermobonding Product 1',
      title: translations.gallery.images[0].title[language]
    },
    {
      src: '/images/products/thermobonding/2.jpg',
      alt: 'Thermobonding Product 2',
      title: translations.gallery.images[1].title[language]
    },
    {
      src: '/images/products/thermobonding/3.jpg',
      alt: 'Thermobonding Product 3',
      title: translations.gallery.images[2].title[language]
    },
    {
      src: '/images/products/thermobonding/4.jpg',
      alt: 'Thermobonding Product 4',
      title: translations.gallery.images[3].title[language]
    }
  ]

  return (
    <div className="bg-laeisaz-background">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-laeisaz-title">
          <div className="absolute inset-0 bg-[url('/images/optimized/background2.webp')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-laeisaz-title">{translations.overview.title[language]}</h2>
                <p className="text-laeisaz-text">
                  {translations.overview.description[language]}
                </p>
                <ul className="space-y-4">
                  {translations.overview.points.map((point, index) => (
                    <li key={index} className="flex items-center text-laeisaz-text">
                      <FaCheck className="text-laeisaz-title mr-2" />
                      {point[language]}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-200">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/products/thermobonding/main.jpg"
                  alt="Thermobonding Material"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-laeisaz-title text-center mb-16">
              {translations.features.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {translations.features.items.map((feature, index) => (
              <AnimateOnScroll key={index} className={`delay-${(index + 1) * 200}`}>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4 text-laeisaz-title flex justify-center">
                    <FaFire className={index === 0 ? 'block' : 'hidden'} />
                    <FaIndustry className={index === 1 ? 'block' : 'hidden'} />
                    <FaChartLine className={index === 2 ? 'block' : 'hidden'} />
                  </div>
                  <h3 className="text-xl font-bold text-laeisaz-title mb-4">{feature.title[language]}</h3>
                  <p className="text-laeisaz-text">{feature.description[language]}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-laeisaz-title text-center mb-16">
              {translations.specifications.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="max-w-3xl mx-auto">
            <div className="bg-laeisaz-background rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {translations.specifications.items.map((spec, index) => (
                  <AnimateOnScroll key={index} className={`delay-${index * 100}`}>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-laeisaz-text mb-1">{spec.label[language]}</div>
                      <div className="text-lg font-semibold text-laeisaz-title">{spec.value}</div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 