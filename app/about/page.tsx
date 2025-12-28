'use client'

import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { useLanguage } from '../components/ClientLayout'
import { FaCheckCircle, FaIndustry, FaGlobe, FaUsers, FaChartLine } from 'react-icons/fa'

export default function About() {
  const { language } = useLanguage();

  const translations = {
    hero: {
      title: {
        en: 'About LaeiSaz',
        fa: 'درباره لایی‌ساز'
      },
      description: {
        en: 'LaeiSaz Industrial Company is one of the largest non-woven fabric producers in the Middle East',
        fa: 'شرکت صنعتی لایی ساز یکی از بزرگترین تولیدکنندگان منسوجات نبافته در خاورمیانه'
      }
    },
    stats: {
      years: {
        en: 'Years of Excellence',
        fa: 'سال تجربه'
      },
      countries: {
        en: 'Countries Served',
        fa: 'کشور تحت پوشش'
      },
      employees: {
        en: 'Team Members',
        fa: 'اعضای تیم'
      },
      growth: {
        en: 'Annual Growth',
        fa: 'رشد سالانه'
      }
    },
    history: {
      title: {
        en: 'Our Journey of Excellence',
        fa: 'مسیر تعالی ما'
      },
      subtitle: {
        en: 'From humble beginnings to industry leadership',
        fa: 'از آغازی ساده تا رهبری صنعت'
      },
      paragraphs: [
        {
          en: 'LaeiSaz Industrial Company was registered in 1983 and began its operations in 1990 with the efforts of domestic and foreign specialists, on a land area of 100,000 square meters with a built-up area of more than 25,000 square meters. The company, utilizing world-class technology and having more than 15 advanced production lines, is today recognized as one of the largest non-woven fabric producers in the Middle East.',
          fa: 'شرکت صنعتی لایی‌ساز در سال ۱۳۶۲ به ثبت رسید و فعالیت خود را در سال ۱۳۶۹ با تلاش متخصصان داخلی و خارجی، در زمینی به مساحت ۱۰۰٬۰۰۰ متر مربع و با زیربنایی بیش از ۲۵٬۰۰۰ متر مربع آغاز کرد. این شرکت با بهره‌گیری از فناوری روز دنیا و برخورداری از بیش از ۱۵ خط تولید پیشرفته، امروز به‌عنوان یکی از بزرگ‌ترین تولیدکنندگان منسوجات نبافته در خاورمیانه شناخته می‌شود.'
        }
      ]
    },
    missionVision: {
      mission: {
        title: {
          en: 'Our Mission',
          fa: 'ماموریت ما'
        },
        description: {
          en: 'To provide high-quality non-woven fabrics that meet the evolving needs of our customers while maintaining sustainable and ethical manufacturing practices.',
          fa: 'ارائه منسوجات نبافته با کیفیت بالا که نیازهای در حال تحول مشتریان ما را برآورده می‌کند و در عین حال شیوه‌های تولید پایدار و اخلاقی را حفظ می‌کند.'
        }
      },
      vision: {
        title: {
          en: 'Our Vision',
          fa: 'چشم‌انداز ما'
        },
        description: {
          en: 'To be the leading innovator in non-woven manufacturing, setting industry standards for quality, sustainability, and customer satisfaction.',
          fa: 'تبدیل شدن به نوآور پیشرو در تولید منسوجات نبافته، تعیین استانداردهای صنعت برای کیفیت، پایداری و رضایت مشتری.'
        }
      }
    },
    values: {
      title: {
        en: 'Our Core Values',
        fa: 'ارزش‌های اصلی ما'
      },
      subtitle: {
        en: 'The principles that guide our every decision',
        fa: 'اصولی که هر تصمیم ما را هدایت می‌کند'
      },
      items: [
        {
          title: {
            en: 'Quality Excellence',
            fa: 'تعالی کیفیت'
          },
          description: {
            en: 'Committed to maintaining the highest standards in our products and processes',
            fa: 'متعهد به حفظ بالاترین استانداردها در محصولات و فرآیندهای ما'
          }
        },
        {
          title: {
            en: 'Continuous Innovation',
            fa: 'نوآوری مستمر'
          },
          description: {
            en: 'Continuously developing new solutions and improving our manufacturing capabilities',
            fa: 'توسعه مستمر راه‌حل‌های جدید و بهبود قابلیت‌های تولیدی ما'
          }
        },
        {
          title: {
            en: 'Sustainable Future',
            fa: 'آینده پایدار'
          },
          description: {
            en: 'Implementing eco-friendly practices throughout our production process',
            fa: 'اجرای شیوه‌های دوستدار محیط زیست در سراسر فرآیند تولید ما'
          }
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight transform transition-all duration-1000 opacity-0 translate-y-8 animate-fade-in">
              {translations.hero.title[language]}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto transform transition-all duration-1000 opacity-0 translate-y-8 animate-fade-in">
              {translations.hero.description[language]}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimateOnScroll>
              <div className="text-center transform transition-all duration-700 opacity-0 scale-95 translate-y-4 animate-fade-in hover:scale-105">
                <div className="text-4xl font-bold text-laeisaz-title mb-2 transform transition-all duration-500">40+</div>
                <div className="text-laeisaz-text">{translations.stats.years[language]}</div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-200">
              <div className="text-center transform transition-all duration-700 opacity-0 scale-95 translate-y-4 animate-fade-in hover:scale-105">
                <div className="text-4xl font-bold text-laeisaz-title mb-2 transform transition-all duration-500">25+</div>
                <div className="text-laeisaz-text">{translations.stats.countries[language]}</div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-300">
              <div className="text-center transform transition-all duration-700 opacity-0 scale-95 translate-y-4 animate-fade-in hover:scale-105">
                <div className="text-4xl font-bold text-laeisaz-title mb-2 transform transition-all duration-500">200+</div>
                <div className="text-laeisaz-text">{translations.stats.employees[language]}</div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-400">
              <div className="text-center transform transition-all duration-700 opacity-0 scale-95 translate-y-4 animate-fade-in hover:scale-105">
                <div className="text-4xl font-bold text-laeisaz-title mb-2 transform transition-all duration-500">15%</div>
                <div className="text-laeisaz-text">{translations.stats.growth[language]}</div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gradient-to-br from-white to-laeisaz-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16 transform transition-all duration-1000 opacity-0 translate-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-laeisaz-title mb-4">
                {translations.history.title[language]}
              </h2>
              <p className="text-xl text-laeisaz-text">
                {translations.history.subtitle[language]}
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700 opacity-0 -translate-x-8 animate-fade-in">
                <Image
                  src="/images/factory.jpg"
                  alt="LaeiSaz Factory"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 hover:opacity-80" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-200">
              <div className="space-y-6 transform transition-all duration-1000 opacity-0 translate-x-8 animate-fade-in">
                {translations.history.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-laeisaz-text text-lg leading-relaxed transform transition-all duration-500 hover:translate-x-2">
                    {paragraph[language]}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimateOnScroll>
              <div className="bg-gradient-to-br from-laeisaz-title to-laeisaz-frame p-8 rounded-2xl shadow-xl text-white transform transition-all duration-800 opacity-0 -translate-y-8 animate-fade-in hover:scale-105 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 transform transition-all duration-300">
                  {translations.missionVision.mission.title[language]}
                </h3>
                <p className="text-lg opacity-90 leading-relaxed transform transition-all duration-300">
                  {translations.missionVision.mission.description[language]}
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-200">
              <div className="bg-gradient-to-br from-laeisaz-frame to-laeisaz-title p-8 rounded-2xl shadow-xl text-white transform transition-all duration-800 opacity-0 translate-y-8 animate-fade-in hover:scale-105 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 transform transition-all duration-300">
                  {translations.missionVision.vision.title[language]}
                </h3>
                <p className="text-lg opacity-90 leading-relaxed transform transition-all duration-300">
                  {translations.missionVision.vision.description[language]}
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-laeisaz-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16 transform transition-all duration-1000 opacity-0 translate-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-laeisaz-title mb-4">
                {translations.values.title[language]}
              </h2>
              <p className="text-xl text-laeisaz-text">
                {translations.values.subtitle[language]}
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {translations.values.items.map((value, index) => (
              <AnimateOnScroll key={index} className={`delay-${(index + 1) * 200}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform opacity-0 translate-y-8 animate-fade-in hover:scale-105 hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <FaCheckCircle className={`text-laeisaz-title text-2xl ${language === 'fa' ? 'ml-3' : 'mr-3'} transform transition-all duration-300 hover:scale-110 hover:text-blue-600`} />
                    <h3 className="text-xl font-bold text-laeisaz-title transform transition-all duration-300">
                      {value.title[language]}
                    </h3>
                  </div>
                  <p className="text-laeisaz-text leading-relaxed transform transition-all duration-300">
                    {value.description[language]}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 