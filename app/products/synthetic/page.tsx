'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaIndustry, FaCogs, FaChartLine } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'

export default function Synthetic() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const translations = {
    hero: {
      title: {
        en: 'Synthetic Felt',
        fa: 'لایی سنتتیک'
      },
      description: {
        en: 'Advanced synthetic felt with high resistance, softness, and superior formability',
        fa: 'نمد پیشرفته سنتتیک با مقاومت بالا، نرمی و فرم‌پذیری برتر'
      }
    },
    overview: {
      title: {
        en: 'Product Overview',
        fa: 'معرفی محصول'
      },
      description: {
        en: 'A type of advanced felt with high resistance, greater softness and formability compared to Venidon. This felt can be used in the manufacture of military shoes, high-safety shoes, and sometimes in the production of the inner back layer of sandals. Other features of this felt include high tensile resistance against tearing, appropriate abrasion resistance, double-sided nature which makes it suitable for producing seamless bags, absence of lint and odor with permanent sizing, and high flexibility.',
        fa: 'نوعی نمد پیشرفته با مقاومت بالا، نرمی و فرم‌پذیری بیشتر نسبت به ونیدون. این لایی در ساخت کفش‌های نظامی، کفش‌های با ایمنی بالا و بعضا در تولید پشت لایه داخلی صندل قابل استفاده است. از ویژگی‌های دیگر این لایی می‌توان به مقاومت کششی بالا در برابر پارگی، مقاومت سایشی مناسب، دو رو بودن لایی که برای تولید کیف‌های یکپارچه مناسب است، نداشتن پرز و بو با آهار دائمی و انعطاف‌پذیری بالا اشاره کرد.'
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
            en: 'High Resistance',
            fa: 'مقاومت بالا'
          },
          description: {
            en: 'Superior resistance and durability compared to traditional felts',
            fa: 'مقاومت و دوام برتر نسبت به نمدهای سنتی'
          }
        },
        {
          title: {
            en: 'Superior Formability',
            fa: 'فرم‌پذیری برتر'
          },
          description: {
            en: 'Greater softness and formability for various applications',
            fa: 'نرمی و فرم‌پذیری بیشتر برای کاربردهای مختلف'
          }
        },
        {
          title: {
            en: 'Double-Sided',
            fa: 'دو رو'
          },
          description: {
            en: 'Double-sided nature suitable for seamless bag production',
            fa: 'دو رو بودن مناسب برای تولید کیف‌های یکپارچه'
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
            en: 'Material Type',
            fa: 'نوع مواد'
          },
          value: 'Synthetic Felt'
        },
        {
          label: {
            en: 'Tensile Resistance',
            fa: 'مقاومت کششی'
          },
          value: 'High'
        },
        {
          label: {
            en: 'Abrasion Resistance',
            fa: 'مقاومت سایشی'
          },
          value: 'Excellent'
        },
        {
          label: {
            en: 'Flexibility',
            fa: 'انعطاف‌پذیری'
          },
          value: 'High'
        },
        {
          label: {
            en: 'Surface Type',
            fa: 'نوع سطح'
          },
          value: 'Double-Sided'
        },
        {
          label: {
            en: 'Lint & Odor',
            fa: 'پرز و بو'
          },
          value: 'None'
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
          en: 'Military Shoes',
          fa: 'کفش‌های نظامی'
        },
        {
          en: 'Safety Shoes',
          fa: 'کفش‌های ایمنی'
        },
        {
          en: 'Sandals',
          fa: 'صندل‌ها'
        },
        {
          en: 'Seamless Bags',
          fa: 'کیف‌های یکپارچه'
        },
        {
          en: 'Footwear Manufacturing',
          fa: 'تولید کفش'
        },
        {
          en: 'Industrial Applications',
          fa: 'کاربردهای صنعتی'
        }
      ]
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <AnimateOnScroll>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-laeisaz-title">{translations.overview.title[language]}</h2>
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
                  src="/images/products/synthetic-felt.jpg"
                  alt="Synthetic Felt Material"
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



