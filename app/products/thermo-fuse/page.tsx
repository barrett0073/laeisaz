'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useLanguage } from '../../components/ClientLayout'

export default function ThermoFuse() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const translations = {
    hero: {
      title: {
        en: 'Thermo Fuse',
        fa: 'ترمو فیوز'
      },
      description: {
        en: 'Advanced thermo fuse solutions for reliable thermal protection',
        fa: 'راه‌حل‌های پیشرفته ترمو فیوز برای محافظت حرارتی قابل اعتماد'
      }
    },
    overview: {
      title: {
        en: 'Product Overview',
        fa: 'معرفی محصول'
      },
      description: {
        en: 'Thermo fuse felts or padded felts (puffy felts) are produced in grammages from 50 to 600 grams per square meter and up to a width of 2350 millimeters. This group of products includes various models such as Swan thermo fuse, Royal thermo fuse, Asa thermo fuse, and Star thermo fuse, which depending on the type, are used in various industries such as clothing, bedding, quilts and sleeping bags, quilting, industrial filters, and other specialized applications. Among the features of this category of felts, we can mention cost-effectiveness and economy, environmental compatibility, ability to produce from recycled fibers, having elastic and recovery properties, compatibility with various covers and surface layers, and reduction of dust and unpleasant odors.',
        fa: 'لایی‌های ترموفیوز یا لایی پفکی (لایی پفی) در گرماژهای ۵۰ تا ۶۰۰ گرم بر مترمربع و تا عرض ۲۳۵۰ میلی‌متر تولید می‌شوند. این گروه از محصولات شامل مدل‌های متنوعی نظیر ترموفیوز قو، ترموفیوز رویال، ترموفیوز آسا و ترموفیوز استار است که بسته به نوع، در صنایع مختلفی همچون پوشاک، کالای خواب، لحاف و کیسه‌خواب، پنبه‌دوزی، فیلترهای صنعتی و سایر کاربردهای تخصصی مورد استفاده قرار می‌گیرند. از ویژگی‌های این دسته لایی‌ها می‌توان به مقرون به صرفه و اقتصادی بودن، سازگاری با محیط زیست، قابلیت تولید از الیاف بازیافتی، داشتن خاصیت ارتجاعی و برگشت پذیری، هماهنگی با انواع روکش‌ها و لایه‌های سطحی و کاهندگی گرد و غبار و بوهای نامطبوع اشاره کرد.'
      },
      readMore: {
        en: 'Read More',
        fa: 'بیشتر بخوانید'
      },
      readLess: {
        en: 'Read Less',
        fa: 'کمتر بخوانید'
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
            en: 'Temperature Control',
            fa: 'کنترل دما'
          },
          description: {
            en: 'Accurate temperature monitoring and protection',
            fa: 'نظارت و محافظت دقیق دما'
          }
        },
        {
          title: {
            en: 'Safety',
            fa: 'ایمنی'
          },
          description: {
            en: 'Ensures safe operation of equipment',
            fa: 'عملکرد ایمن تجهیزات را تضمین می‌کند'
          }
        },
        {
          title: {
            en: 'Durability',
            fa: 'دوام'
          },
          description: {
            en: 'Long-lasting performance in harsh conditions',
            fa: 'عملکرد طولانی مدت در شرایط سخت'
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
            en: 'Temperature Range',
            fa: 'محدوده دما'
          },
          value: '50°C to 200°C'
        },
        {
          label: {
            en: 'Response Time',
            fa: 'زمان پاسخگویی'
          },
          value: '< 5 seconds'
        },
        {
          label: {
            en: 'Voltage Rating',
            fa: 'ولتاژ نامی'
          },
          value: '250V AC/DC'
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
            en: 'Thermo Fuse Components',
            fa: 'اجزای ترمو فیوز'
          },
          image: '/images/products/thermo-fuse-1.jpg'
        },
        {
          title: {
            en: 'Application Example',
            fa: 'نمونه کاربرد'
          },
          image: '/images/products/thermo-fuse-2.jpg'
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <AnimateOnScroll>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-laeisaz-title">
                  {translations.overview.title[language]}
                </h2>
                <div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : '6rem',
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-laeisaz-text whitespace-pre-line">
                      {translations.overview.description[language]}
                    </p>
                  </motion.div>
                  <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 text-laeisaz-title hover:text-laeisaz-frame font-semibold transition-colors duration-200 flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isExpanded ? 'less' : 'more'}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isExpanded ? translations.overview.readLess[language] : translations.overview.readMore[language]}
                      </motion.span>
                    </AnimatePresence>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      ↓
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-200">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/products/thermo-fuse.jpg"
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