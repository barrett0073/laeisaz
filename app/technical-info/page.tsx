'use client'

import Image from 'next/image'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { FaCheck, FaFlask, FaCertificate, FaIndustry, FaCog, FaChartLine, FaAward, FaTools, FaShieldAlt, FaClipboardCheck } from 'react-icons/fa'
import { useLanguage } from '../components/ClientLayout'
import { useState, useEffect } from 'react'

export default function TechnicalInfo() {
  const { language } = useLanguage();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [animationShown, setAnimationShown] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Page load animation logic
  useEffect(() => {
    // Wait for page to completely load
    const handlePageLoad = () => {
      // Add a small delay to ensure everything is rendered
      setTimeout(() => {
        setIsPageLoaded(true);
        // Set animation as shown after the animation duration (3.5s)
        setTimeout(() => {
          setAnimationShown(true);
          setAnimationCompleted(true);
        }, 3500);
      }, 100);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, [])

  const translations = {
    hero: {
      title: {
        en: 'Technical Information',
        fa: 'اطلاعات فنی'
      },
      description: {
        en: 'Detailed technical specifications and manufacturing capabilities',
        fa: 'مشخصات فنی و قابلیت‌های تولید'
      }
    },
    overview: {
      title: {
        en: 'Technical Overview',
        fa: 'نمای کلی فنی'
      },
      stats: [
        {
          number: '100,000',
          unit: 'm²',
          label: {
            en: 'Production Facility',
            fa: 'تاسیسات تولید'
          }
        },
        {
          number: '15',
          unit: '',
          label: {
            en: 'Production Lines',
            fa: 'خط تولید'
          }
        },
        {
          number: '40+',
          unit: '',
          label: {
            en: 'Years Experience',
            fa: 'سال تجربه'
          }
        },
        {
          number: '50+',
          unit: '',
          label: {
            en: 'Countries Served',
            fa: 'کشور خدمات'
          }
        }
      ]
    },
    manufacturing: {
      title: {
        en: 'Manufacturing Excellence',
        fa: 'برتری تولید'
      },
      subtitle: {
        en: 'State-of-the-Art Production Facilities',
        fa: 'تاسیسات تولید پیشرفته'
      },
      items: [
        {
          en: '100,000 m² production plant with climate control',
          fa: 'کارخانه تولیدی ۱۰۰,۰۰۰ متر مربعی با کنترل آب و هوا'
        },
        {
          en: '15 specialized production lines for different materials',
          fa: '۱۵ خط تولید تخصصی برای مواد مختلف'
        },
        {
          en: 'Advanced Swiss, German, and Italian machinery',
          fa: 'ماشین‌آلات پیشرفته سوئیسی، آلمانی و ایتالیایی'
        },
        {
          en: 'Real-time quality monitoring and control systems',
          fa: 'سیستم‌های نظارت و کنترل کیفیت بلادرنگ'
        },
        {
          en: 'Automated material handling and packaging',
          fa: 'حمل و نقل و بسته‌بندی خودکار مواد'
        },
        {
          en: 'Energy-efficient production processes',
          fa: 'فرآیندهای تولید انرژی‌کارا'
        }
      ]
    },
    equipment: {
      title: {
        en: 'Production Equipment',
        fa: 'تجهیزات تولید'
      },
      categories: [
        {
          name: {
            en: 'Carding Machines',
            fa: 'ماشین‌های کاردینگ'
          },
          description: {
            en: 'High-speed carding systems for fiber preparation',
            fa: 'سیستم‌های کاردینگ پرسرعت برای آماده‌سازی فیبر'
          },
          icon: FaCog
        },
        {
          name: {
            en: 'Needle Punching',
            fa: 'سوزن‌زنی'
          },
          description: {
            en: 'Precision needle punching for mechanical bonding',
            fa: 'سوزن‌زنی دقیق برای اتصال مکانیکی'
          },
          icon: FaTools
        },
        {
          name: {
            en: 'Thermal Bonding',
            fa: 'اتصال حرارتی'
          },
          description: {
            en: 'Advanced thermal bonding technology',
            fa: 'تکنولوژی پیشرفته اتصال حرارتی'
          },
          icon: FaIndustry
        },
        {
          name: {
            en: 'Chemical Bonding',
            fa: 'اتصال شیمیایی'
          },
          description: {
            en: 'Controlled chemical bonding processes',
            fa: 'فرآیندهای کنترل‌شده اتصال شیمیایی'
          },
          icon: FaFlask
        }
      ]
    },
    testing: {
      title: {
        en: 'Testing & Quality Assurance',
        fa: 'آزمایش و تضمین کیفیت'
      },
      items: [
        {
          category: {
            en: 'Physical Properties',
            fa: 'خواص فیزیکی'
          },
          icon: FaTools,
          tests: [
            {
              en: 'Tensile Strength (MD/CD)',
              fa: 'استحکام کششی (MD/CD)'
            },
            {
              en: 'Tear Resistance (Elmendorf)',
              fa: 'مقاومت پارگی (المندورف)'
            },
            {
              en: 'Bursting Strength',
              fa: 'استحکام انفجار'
            },
            {
              en: 'Puncture Resistance',
              fa: 'مقاومت سوراخ شدن'
            },
            {
              en: 'Compression Recovery',
              fa: 'بازیابی فشردگی'
            },
            {
              en: 'Thickness & Weight',
              fa: 'ضخامت و وزن'
            }
          ]
        },
        {
          category: {
            en: 'Chemical Analysis',
            fa: 'تحلیل شیمیایی'
          },
          icon: FaFlask,
          tests: [
            {
              en: 'pH Value Testing',
              fa: 'آزمایش مقدار pH'
            },
            {
              en: 'Chemical Resistance',
              fa: 'مقاومت شیمیایی'
            },
            {
              en: 'Thermal Stability',
              fa: 'پایداری حرارتی'
            },
            {
              en: 'UV Resistance',
              fa: 'مقاومت UV'
            },
            {
              en: 'Aging & Weathering',
              fa: 'پیری و هوازدگی'
            },
            {
              en: 'Flammability Testing',
              fa: 'آزمایش قابلیت اشتعال'
            }
          ]
        },
        {
          category: {
            en: 'Performance Testing',
            fa: 'آزمایش عملکرد'
          },
          icon: FaChartLine,
          tests: [
            {
              en: 'Air Permeability',
              fa: 'نفوذپذیری هوا'
            },
            {
              en: 'Water Resistance',
              fa: 'مقاومت آب'
            },
            {
              en: 'Thermal Conductivity',
              fa: 'هدایت حرارتی'
            },
            {
              en: 'Sound Absorption',
              fa: 'جذب صدا'
            },
            {
              en: 'Filtration Efficiency',
              fa: 'کارایی فیلتراسیون'
            },
            {
              en: 'Abrasion Resistance',
              fa: 'مقاومت سایش'
            }
          ]
        }
      ]
    },
    specifications: {
      title: {
        en: 'Technical Specifications',
        fa: 'مشخصات فنی'
      },
      ranges: [
        {
          parameter: {
            en: 'Weight Range',
            fa: 'محدوده وزن'
          },
          value: '15-2000 g/m²',
          description: {
            en: 'Wide range of fabric weights for various applications',
            fa: 'محدوده وسیعی از وزن پارچه برای کاربردهای مختلف'
          }
        },
        {
          parameter: {
            en: 'Width Range',
            fa: 'محدوده عرض'
          },
          value: '1.5-6.0 m',
          description: {
            en: 'Flexible width options for different requirements',
            fa: 'گزینه‌های عرض انعطاف‌پذیر برای نیازهای مختلف'
          }
        },
        {
          parameter: {
            en: 'Thickness',
            fa: 'ضخامت'
          },
          value: '0.2-50 mm',
          description: {
            en: 'From ultra-thin to thick industrial materials',
            fa: 'از مواد فوق‌نازک تا مواد صنعتی ضخیم'
          }
        },
        {
          parameter: {
            en: 'Production Capacity',
            fa: 'ظرفیت تولید'
          },
          value: '50,000 tons/year',
          description: {
            en: 'High-volume production capability',
            fa: 'قابلیت تولید با حجم بالا'
          }
        }
      ]
    },
    certifications: {
      title: {
        en: 'Certifications & Standards',
        fa: 'گواهینامه‌ها و استانداردها'
      },
      items: [
        {
          title: {
            en: 'ISO 9001:2015',
            fa: 'ISO 9001:2015'
          },
          description: {
            en: '',
            fa: ''
          },
          icon: FaCertificate
        },
        {
          title: {
            en: 'ISO 14001:2015',
            fa: 'ISO 14001:2015'
          },
          description: {
            en: '',
            fa: ''
          },
          icon: FaShieldAlt
        },
        {
          title: {
            en: 'ISO 45001:2018',
            fa: 'ISO 45001:2018'
          },
          description: {
            en: '',
            fa: ''
          },
          icon: FaAward
        },
        {
          title: {
            en: 'ISO 10002:2018',
            fa: 'ISO 10002:2018'
          },
          description: {
            en: '',
            fa: ''
          },
          icon: FaClipboardCheck
        }
      ]
    },
    quality: {
      title: {
        en: 'Quality Control Process',
        fa: 'فرآیند کنترل کیفیت'
      },
      steps: [
        {
          title: {
            en: 'Raw Material Inspection',
            fa: 'بازرسی مواد خام'
          },
          description: {
            en: 'Thorough inspection of all incoming raw materials',
            fa: 'بازرسی کامل تمام مواد خام ورودی'
          }
        },
        {
          title: {
            en: 'In-Process Monitoring',
            fa: 'نظارت حین فرآیند'
          },
          description: {
            en: 'Continuous monitoring during production processes',
            fa: 'نظارت مستمر در طول فرآیندهای تولید'
          }
        },
        {
          title: {
            en: 'Final Product Testing',
            fa: 'آزمایش محصول نهایی'
          },
          description: {
            en: 'Comprehensive testing of finished products',
            fa: 'آزمایش جامع محصولات تمام‌شده'
          }
        },
        {
          title: {
            en: 'Documentation & Traceability',
            fa: 'مستندسازی و ردیابی'
          },
          description: {
            en: 'Complete documentation and batch traceability',
            fa: 'مستندسازی کامل و ردیابی دسته‌ای'
          }
        }
      ]
    }
  };

  return (
    <div className="bg-laeisaz-background">
      {/* Hero Section - Fullscreen with Technical Overview Stats */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-laeisaz-title">
          <div className="absolute inset-0 bg-[url('/images/background2.png')] bg-[length:380%] bg-center opacity-40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <AnimateOnScroll>
            <div className="relative mb-6 overflow-hidden">
              <h1 className={`text-5xl md:text-7xl font-bold tracking-tight font-iran-sans relative z-10 ${animationCompleted ? 'text-white' : 'bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'} ${isPageLoaded && !animationShown ? (language === 'fa' ? 'animate-ripple-rtl' : 'animate-ripple-ltr') : ''}`}>
                {translations.hero.title[language]}
              </h1>
              <div className="absolute inset-0 text-5xl md:text-7xl font-bold tracking-tight font-iran-sans text-white/5 animate-pulse">
                {translations.hero.title[language]}
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              {translations.hero.description[language]}
            </p>
          </AnimateOnScroll>
          
          {/* Technical Overview Stats */}
          <AnimateOnScroll className="delay-400">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {translations.overview.stats.map((stat, index) => (
                <AnimateOnScroll key={index} className={`delay-${600 + (index * 100)}`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {stat.number}
                      <span className="text-lg">{stat.unit}</span>
                    </div>
                    <div className="text-sm opacity-90">{stat.label[language]}</div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>



      {/* Manufacturing Excellence */}
      <section className="py-20 bg-laeisaz-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold text-laeisaz-title text-center mb-4">
              {translations.manufacturing.title[language]}
            </h2>
            <p className="text-xl text-center text-gray-600 mb-16">
              {translations.manufacturing.subtitle[language]}
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/production-line.jpg"
                  alt="Production Line"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Modern Production Line</h3>
                  <p className="text-sm opacity-90">State-of-the-art manufacturing facility</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="delay-200">
              <div className="space-y-6">
                {translations.manufacturing.items.map((item, index) => (
                  <div key={index} className={`flex items-start ${language === 'fa' ? 'space-x-reverse space-x-4' : 'space-x-4'} bg-white p-4 rounded-lg shadow-sm`}>
                    <div className="flex-shrink-0 w-8 h-8 bg-laeisaz-title rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-laeisaz-text font-medium">{item[language]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Production Equipment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold text-laeisaz-title text-center mb-16">
              {translations.equipment.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {translations.equipment.categories.map((category, index) => (
              <AnimateOnScroll key={index} className={`delay-${index * 100}`}>
                <div className="bg-gradient-to-br from-laeisaz-background to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-laeisaz-title text-white rounded-full mb-4">
                      <category.icon className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-laeisaz-title mb-3">
                      {category.name[language]}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description[language]}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-laeisaz-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold text-laeisaz-title text-center mb-16">
              {translations.specifications.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {translations.specifications.ranges.map((spec, index) => (
              <AnimateOnScroll key={index} className={`delay-${index * 100}`}>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-laeisaz-title">
                      {spec.parameter[language]}
                    </h3>
                    <span className="text-2xl font-bold text-laeisaz-frame">
                      {spec.value}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {spec.description[language]}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testing & Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold text-laeisaz-title text-center mb-16">
              {translations.testing.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {translations.testing.items.map((capability, index) => (
              <AnimateOnScroll key={index} className={`delay-${index * 200}`}>
                <div className="bg-gradient-to-br from-laeisaz-background to-white rounded-xl shadow-lg p-6 h-full">
                  <div className={`flex items-center mb-6 ${language === 'fa' ? 'space-x-reverse' : ''}`}>
                    <div className={`w-12 h-12 bg-laeisaz-title rounded-lg flex items-center justify-center ${language === 'fa' ? 'ml-4' : 'mr-4'}`}>
                      <capability.icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-laeisaz-title">
                      {capability.category[language]}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {capability.tests.map((test, idx) => (
                      <li key={idx} className="flex items-start">
                        <FaCheck className={`text-laeisaz-title mt-1 flex-shrink-0 text-sm ${language === 'fa' ? 'ml-3' : 'mr-3'}`} />
                        <span className="text-laeisaz-text text-sm">{test[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="py-20 bg-laeisaz-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold text-laeisaz-title text-center mb-16">
              {translations.certifications.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {translations.certifications.items.map((cert, index) => (
              <AnimateOnScroll key={index} className={`delay-${index * 100}`}>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-laeisaz-title to-laeisaz-frame text-white rounded-full mb-4">
                    <cert.icon className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-laeisaz-title mb-3">
                    {cert.title[language]}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {cert.description[language]}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold text-laeisaz-title text-center mb-16">
              {translations.quality.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="relative">
            {/* Process Flow Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-laeisaz-title to-laeisaz-frame transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {translations.quality.steps.map((step, index) => (
                <AnimateOnScroll key={index} className={`delay-${index * 200}`}>
                  <div className="relative">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-gradient-to-br from-laeisaz-title to-laeisaz-frame text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold relative z-10">
                      {index + 1}
                    </div>
                    
                    {/* Step Content */}
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                      <h3 className="text-lg font-bold text-laeisaz-title mb-3">
                        {step.title[language]}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description[language]}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 