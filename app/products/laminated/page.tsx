'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaIndustry, FaCogs, FaChartLine } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'

export default function Laminated() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const translations = {
    hero: {
      title: {
        en: 'Laminated Nonwoven',
        fa: 'لایی لمینت'
      },
      description: {
        en: 'Advanced laminated nonwoven materials for medical and industrial applications',
        fa: 'مواد نبافته لمینت پیشرفته برای کاربردهای پزشکی و صنعتی'
      }
    },
    overview: {
      title: {
        en: 'Product Overview',
        fa: 'معرفی محصول'
      },
      description: {
        en: 'The lamination process enables nonwoven textiles to be combined with various reinforcing layers and different additives, producing products with specific characteristics for diverse medical and industrial applications. This process not only increases the efficiency of nonwoven textiles but also significantly expands their range of applications.\n\nLaeisaz Industrial Company, utilizing the most modern and advanced fully automatic machinery from Germany, Italy, and Switzerland, has succeeded in producing a wide range of nonwoven textiles to meet the needs of various industries. Among these products, thermobonding felts and laminated felts play a special role in the medical industry. These products, with features such as:\n• Effective body moisture absorption: helping to maintain dryness and patient comfort during use\n• Soft and flexible: compatible with body movements, without causing sensitivity or abrasion\n• Cost-effective: an economical option for widespread use in medical centers\n• Reduced thermal stress: preventing heat accumulation and increasing thermal comfort\n• High resistance to liquid penetration: especially against blood and other body fluids\n• Capability of heat and moisture exchange: appropriate breathability to maintain thermal balance and prevent sweating\n• Protection against pathogen penetration: an effective barrier against various microbes and transmissible infectious contaminants\n• Capability of lamination with protective layers\nare considered an ideal option for producing various medical equipment and textiles.',
        fa: 'فرآیند لمینت‌سازی این امکان را فراهم می‌کند تا منسوجات نبافته با انواع لایه‌های تقویتی و افزودنی‌های مختلف ترکیب شوند و محصولاتی با ویژگی‌های خاص برای کاربردهای متنوع پزشکی و صنعتی تولید گردد. این فرآیند نه تنها موجب افزایش کارایی منسوجات نبافته می‌شود، بلکه دامنه‌ی کاربرد آن‌ها را نیز به‌طور چشم‌گیری گسترش می‌دهد.\n\nشرکت صنعتی لایی‌ساز با بهره‌گیری از مدرن‌ترین و پیشرفته‌ترین ماشین‌آلات تمام‌اتوماتیک ساخت آلمان، ایتالیا و سوئیس، موفق به تولید طیف گسترده‌ای از منسوجات نبافته برای پاسخ‌گویی به نیاز صنایع مختلف شده است. در میان این محصولات، لایی‌های ترموباندینگ و لایی‌های لمینت نقش ویژه‌ای در صنعت پزشکی ایفا می‌کنند. این محصولات با دارا بودن ویژگی‌هایی چون:\n• جذب مؤثر رطوبت بدن: کمک به حفظ خشکی و راحتی بیمار در طول مدت استفاده\n• نرم و انعطاف‌پذیر: سازگار با حرکات بدن، بدون ایجاد حساسیت یا سایش\n• مقرون‌به‌صرفه: گزینه‌ای اقتصادی برای استفاده گسترده در مراکز درمانی\n• کاهش تنش گرمایی: جلوگیری از تجمع گرما و افزایش سایش حرارتی\n• مقاومت بالا در برابر نفوذ مایعات: به‌ویژه در برابر خون و سایر مایعات بدن\n• قابلیت تبادل گرما و رطوبت: تنفس‌پذیری مناسب برای حفظ تعادل دمایی و جلوگیری از تعریق\n• محافظت در برابر نفوذ عوامل بیماری‌زا: مانعی مؤثر در برابر انواع میکروب‌ها و آلودگی‌های عفونی قابل انتقال\n• قابلیت لمینت با لایه‌های محافظ\nگزینه‌ای ایده‌آل برای تولید انواع تجهیزات و منسوجات پزشکی به‌شمار می‌آیند'
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
            en: 'Medical Grade',
            fa: 'درجه پزشکی'
          },
          description: {
            en: 'High-quality materials suitable for medical applications',
            fa: 'مواد با کیفیت بالا مناسب برای کاربردهای پزشکی'
          }
        },
        {
          title: {
            en: 'Protective Barrier',
            fa: 'سد محافظتی'
          },
          description: {
            en: 'Effective protection against pathogens and contaminants',
            fa: 'محافظت مؤثر در برابر عوامل بیماری‌زا و آلودگی‌ها'
          }
        },
        {
          title: {
            en: 'Versatile Applications',
            fa: 'کاربردهای متنوع'
          },
          description: {
            en: 'Suitable for various medical and industrial uses',
            fa: 'مناسب برای کاربردهای مختلف پزشکی و صنعتی'
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
          value: 'Laminated Nonwoven'
        },
        {
          label: {
            en: 'Applications',
            fa: 'کاربردها'
          },
          value: 'Medical & Industrial'
        },
        {
          label: {
            en: 'Protection Level',
            fa: 'سطح محافظت'
          },
          value: 'High'
        },
        {
          label: {
            en: 'Breathability',
            fa: 'تنفس‌پذیری'
          },
          value: 'Excellent'
        },
        {
          label: {
            en: 'Liquid Resistance',
            fa: 'مقاومت در برابر مایعات'
          },
          value: 'High'
        },
        {
          label: {
            en: 'Customization',
            fa: 'سفارشی‌سازی'
          },
          value: 'Available'
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
          en: 'Medical Equipment',
          fa: 'تجهیزات پزشکی'
        },
        {
          en: 'Surgical Gowns',
          fa: 'گون‌های جراحی'
        },
        {
          en: 'Medical Masks',
          fa: 'ماسک‌های پزشکی'
        },
        {
          en: 'Protective Clothing',
          fa: 'لباس‌های محافظتی'
        },
        {
          en: 'Industrial Filters',
          fa: 'فیلترهای صنعتی'
        },
        {
          en: 'Hygiene Products',
          fa: 'محصولات بهداشتی'
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
                  src="/images/products/laminated-nonwoven.jpg"
                  alt="Laminated Nonwoven Material"
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



