'use client'

import Image from 'next/image'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaIndustry, FaCogs, FaChartLine, FaCheck } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'

export default function NeedlePunchedFelt() {
  const { language } = useLanguage();

  const translations = {
    hero: {
      title: {
        en: 'Needle Punched Felt',
        fa: 'لایی سوزنی'
      },
      description: {
        en: 'High-performance needle punched materials for diverse industrial applications',
        fa: 'مواد لایی سوزنی با عملکرد بالا برای کاربردهای متنوع صنعتی'
      }
    },
    overview: {
      title: {
        en: 'Product Overview',
        fa: 'معرفی محصول'
      },
      description: {
        en: 'Our needle punched felt materials are engineered for superior performance in demanding industrial environments. Through advanced needle punching technology, we create durable, high-strength materials that excel in various applications.',
        fa: 'مواد لایی سوزنی ما برای عملکرد برتر در محیط‌های صنعتی چالش‌برانگیز طراحی شده‌اند. از طریق فناوری پیشرفته سوزن‌زنی، ما موادی بادوام و با استحکام بالا ایجاد می‌کنیم که در کاربردهای مختلف عالی عمل می‌کنند.'
      },
      points: [
        {
          en: 'Advanced needle punching technology',
          fa: 'فناوری پیشرفته سوزن‌زنی'
        },
        {
          en: 'Exceptional durability and strength',
          fa: 'دوام و استحکام استثنایی'
        },
        {
          en: 'Customizable properties',
          fa: 'ویژگی‌های قابل تنظیم'
        },
        {
          en: 'Excellent filtration capabilities',
          fa: 'قابلیت‌های فیلتراسیون عالی'
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
            en: 'Robust Construction',
            fa: 'ساختار مستحکم'
          },
          description: {
            en: 'High-density needle punching ensures superior material integrity',
            fa: 'سوزن‌زنی با چگالی بالا یکپارچگی استثنایی مواد را تضمین می‌کند'
          }
        },
        {
          title: {
            en: 'Customizable Properties',
            fa: 'ویژگی‌های قابل تنظیم'
          },
          description: {
            en: 'Tailored to meet specific application requirements',
            fa: 'سفارشی شده برای برآورده کردن نیازهای خاص کاربرد'
          }
        },
        {
          title: {
            en: 'Excellent Performance',
            fa: 'عملکرد عالی'
          },
          description: {
            en: 'Superior mechanical properties and durability',
            fa: 'خواص مکانیکی برتر و دوام بالا'
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
          value: '100-2000 g/m²'
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
            en: 'Thickness',
            fa: 'ضخامت'
          },
          value: '1-20 mm'
        },
        {
          label: {
            en: 'Tensile Strength',
            fa: 'استحکام کششی'
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
    applications: {
      title: {
        en: 'Applications',
        fa: 'کاربردها'
      },
      items: [
        {
          en: 'Geotextiles',
          fa: 'ژئوتکستایل'
        },
        {
          en: 'Automotive Components',
          fa: 'قطعات خودرو'
        },
        {
          en: 'Industrial Insulation',
          fa: 'عایق صنعتی'
        },
        {
          en: 'Filtration Media',
          fa: 'رسانه فیلتراسیون'
        },
        {
          en: 'Acoustic Insulation',
          fa: 'عایق صوتی'
        },
        {
          en: 'Construction Materials',
          fa: 'مصالح ساختمانی'
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
            en: 'High-Density Material',
            fa: 'ماده با چگالی بالا'
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
      src: '/images/products/needle-punched-felt/1.jpg',
      alt: 'Needle Punched Felt Product 1',
      title: translations.gallery.images[0].title[language]
    },
    {
      src: '/images/products/needle-punched-felt/2.jpg',
      alt: 'Needle Punched Felt Product 2',
      title: translations.gallery.images[1].title[language]
    },
    {
      src: '/images/products/needle-punched-felt/3.jpg',
      alt: 'Needle Punched Felt Product 3',
      title: translations.gallery.images[2].title[language]
    },
    {
      src: '/images/products/needle-punched-felt/4.jpg',
      alt: 'Needle Punched Felt Product 4',
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
                  src="/images/products/needle-punched-felt/main.jpg"
                  alt="Needle Punched Felt Material"
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
                    <FaIndustry className={index === 0 ? 'block' : 'hidden'} />
                    <FaCogs className={index === 1 ? 'block' : 'hidden'} />
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

      {/* Applications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-laeisaz-title text-center mb-16">
              {translations.applications.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translations.applications.items.map((application, index) => (
              <AnimateOnScroll key={index} className={`delay-${index * 100}`}>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-laeisaz-title">{application[language]}</h3>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 