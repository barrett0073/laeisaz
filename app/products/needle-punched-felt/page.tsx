'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaIndustry, FaCogs, FaChartLine, FaCheck } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'

export default function NeedlePunchedFelt() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

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
        en: 'Needle punched felts are produced in various models and thicknesses from 80 to 550 grams per square meter and up to a maximum width of 4500 millimeters, depending on the product\'s grammage, and are used in various industries such as the automotive industry, filtration industry, insulation and isolation industry, and home furnishings and furniture industry.\n\nSome products in this category, which can be produced in various colors and grammages, are used extensively in the automotive industry. Light weight, high sound absorption, non-toxicity and odorlessness, flexibility and adaptability, low flammability compared to other insulators, resistance to moisture, formability, moldability and easy installation, low heat loss, no dust and sensitivity generation, resistance to decay and insect attack, recyclability, reasonable cost and favorable cost-benefit ratio are among the features of these felts that lead to their use in various parts of vehicles such as engine cover insulation, roof covering, rear shelf covering, trunk sealing, and more.\n\nSome other needle punched felts are used in the clothing industry to increase the strength of parts of men\'s clothing such as coat collars, overcoats and thick garments.\n\nIn addition, another category of needle punched felts plays an effective role in the filtration industry due to reducing suspended particles and unwanted odors, environmental compatibility, uniformity and consistency with surface materials, ability to use recycled fibers, reduced final cost, and reduced fuel consumption. These products, with their fiber structure and high density, have the ability to absorb fine particles, dust and suspended pollutants, so that particles get trapped in the felt structure and do not accumulate on its surface. These felts prevent pressure drop due to their unique structure and allow air to pass through easily. For this reason, they are used in the manufacture of bag filters, respiratory masks, vacuum cleaner and automotive filters, and media filters.\n\nAnother application of needle punched felts is their use in the bag and shoe manufacturing industry. This category of felts, considering the type of shoe, by bonding uncalendered, single-sided calendered, and double-sided calendered needle punched felts to the back of leather, provide firmness and strength to the leather.\n\nNeedle punched felts are mainly used in applications where the final filter thickness must be less than 5 millimeters. Laeisaz Company produces and supplies needle punched felts in various types as follows.',
        fa: 'لایی‌های سوزنی در مدل‌ها و ضخامت‌های متنوعی از ۸۰ تا ۵۵۰ گرم در مترمربع و حداکثر تا عرض ۴۵۰۰ میلیمتر که بستگی به گرماژ محصول دارد، تولید می‌گردند و در صنایع مختلفی نظیر صنعت خودرو‌سازی، صنعت فیلتراسیون، صنعت عایق‌کاری و ایزولاسیون و صنعت لوازم منزل و مبلمان کاربرد دارند.\n\nبرخی از محصولات این دسته که در رنگ‌ و گرماژ‌های مختلف قابل تولید می‌باشد، در بخش‌های گسترده‌ای از صنعت خودرو‌سازی مورد استفاده قرار می‌گیرند. وزن سبک، جذب صوت بالا، غیر سمی بودن و نداشتن بو، انعطاف‌ و تطبیق‌پذیری، پایین بودن سطح اشتعال نسبت به سایر عایق‌ها، مقاوت در مقابل رطوبت، قابلیت شکل‌گیری، قالب‌پذیری و نصب آسان، میزان پایین از دست دادن حرارت، عدم ایجاد گرد و حساسیت، مقاومت در مقابل فساد و حمله حشرات، امکان بازیافت، هزینه‌ی معقول و نرخ مناسب هزینه - فایده از جمله ویژگی‌های این لایی‌ها محسوب می‌شود که سبب به کارگیری آن‌ها در بخش‌های مختلف خودرو نظیر پوشش عایق درب موتور، پوشش سقف، پوشش طاقچه عقب، روگلگیری‌های صندوق عقب و … می‌باشد.\n\nاز برخی دیگر از لایی‌های سوزنی به منظور افزایش استحکام بخش‌هایی از لباس‌های مردانه مانند یقه کت، پالتو و لباس‌های ضخیم، در صنعت پوشاک استفاده می‌شوند.\n\nعلاوه بر این، دسته دیگری از لایی‌های سوزنی به دلیل کاهش ذرات معلق و بوهای ناخواسته، سازگاری با محیط زیست، همسانی و هم شکلی با مواد سطح، قابلیت استفاده از الیاف بازیافتی، کاهش قیمت تمام شده، کاهش مصرف سوخت نقش مؤثری در صنعت فیلتراسیون ایفا می‌کند. این دسته از محصولات با توجه به ساختار الیاف و تراکم بالا، قابلیت جذب ذرات ریز، گرد و غبار و آلودگی‌های معلق را دارا هستند، به‌گونه‌ای که ذرات در بافت لایی گیر افتاده و بر سطح آن تجمع نمی‌یابند. این لایی‌ها به دلیل داشتن ساختار منحصر به فرد خود از افت فشار جلوگیری کرده و اجازه می‌دهند که هوا به راحتی از آن عبور کند. به همین دلیل در ساخت فیلتر‌های کیسه‌ای، ماسک‌های تنفسی، فیلتر‌های جاروبرقی و خودرو و مدیا فیلتر‌ها کاربرد دارند.\n\nاز کاربرد دیگر لایی‌های سوزنی می‌توان به استفاده آن‌ها در صنعت تولید کیف و کفش اشاره کرد. این دسته از لایی ها با در نظر گرفتن نوع کفش با چسباندن لایی سوزنی بدون کلندر، یکرو کلندر و دو رو کلندر به پشت چرم باعث قوام و استحکام چرم می‌شوند.\n\nلایی‌های سوزنی عمدتاً در کاربردهایی استفاده می‌شوند که ضخامت نهایی فیلتر باید کمتر از ۵ میلی‌متر باشد. شرکت لایی‌ساز لایی‌های سوزنی را در انواع مختلف زیر تولید و به بازار عرضه می‌دارد.'
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
          value: '80-550 g/m²'
        },
        {
          label: {
            en: 'Width',
            fa: 'عرض'
          },
          value: 'Up to 4500 mm'
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
                  src="/images/products/needle-punched-felt.jpg"
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