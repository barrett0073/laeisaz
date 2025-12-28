'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaHospital, FaShieldAlt, FaSyringe, FaUserMd, FaProcedures, FaArrowRight, FaIndustry, FaChevronLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../components/ClientLayout'

// Custom Icons
const ThermoBondIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="32" height="24" rx="4" stroke="#1E3A8A" strokeWidth="2"/>
    <path d="M16 20H32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 24H32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 28H32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const BehbondIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L36 16V32L24 40L12 32V16L24 8Z" stroke="#1E3A8A" strokeWidth="2"/>
    <path d="M24 16V32" stroke="#1E3A8A" strokeWidth="2"/>
    <path d="M16 20L32 28" stroke="#1E3A8A" strokeWidth="2"/>
    <path d="M16 28L32 20" stroke="#1E3A8A" strokeWidth="2"/>
  </svg>
)

const TakbondIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="4" stroke="#1E3A8A" strokeWidth="2"/>
    <path d="M16 16H32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 24H32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 32H32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 16V32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M40 16V32" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function Medical() {
  const { language } = useLanguage()
  const medicalProducts = [
    {
      title: {
        en: 'Thermo-Bond Pad',
        fa: 'پد ترمو باند'
      },
      description: {
        en: 'High-quality thermo-bonded medical pads designed for superior absorption and comfort.',
        fa: 'پدهای پزشکی ترمو باند با کیفیت بالا، طراحی شده برای جذب و راحتی عالی.'
      },
      applications: {
        en: ['Surgical Procedures', 'Wound Care', 'Patient Care', 'Medical Dressings'],
        fa: ['جراحی', 'مراقبت از زخم', 'مراقبت از بیمار', 'پانسمان پزشکی']
      },
      features: {
        en: [
          'Excellent absorption capacity',
          'Soft and comfortable texture',
          'Hypoallergenic material',
          'Sterile packaging'
        ],
        fa: [
          'ظرفیت جذب عالی',
          'بافت نرم و راحت',
          'ماده ضد حساسیت',
          'بسته‌بندی استریل'
        ]
      },
      Icon: FaHospital,
      href: '/industries/medical/thermo-bond-pad',
      image: '/images/thermo-bond-pad.jpg'
    },
    {
      title: {
        en: 'Hospital Pad',
        fa: 'پد بیمارستانی'
      },
      description: {
        en: 'Premium hospital-grade pads engineered for maximum protection and patient comfort.',
        fa: 'پدهای بیمارستانی با کیفیت بالا، طراحی شده برای حفاظت حداکثری و راحتی بیمار.'
      },
      applications: {
        en: ['Patient Care', 'Surgical Use', 'Emergency Care', 'General Medical Use'],
        fa: ['مراقبت از بیمار', 'استفاده جراحی', 'مراقبت اورژانسی', 'استفاده پزشکی عمومی']
      },
      features: {
        en: [
          'High absorbency rate',
          'Anti-bacterial properties',
          'Breathable material',
          'Latex-free composition'
        ],
        fa: [
          'نرخ جذب بالا',
          'خواص ضد باکتری',
          'ماده قابل تنفس',
          'ترکیب بدون لاتکس'
        ]
      },
      Icon: FaShieldAlt,
      href: '/industries/medical/hospital-pad',
      image: '/images/hospital-pad.jpg'
    },
    {
      title: {
        en: 'Laminated Nonwoven',
        fa: 'غیربافته لمینت شده'
      },
      description: {
        en: 'Advanced laminated nonwoven materials for medical and healthcare applications.',
        fa: 'مواد غیربافته لمینت شده پیشرفته برای کاربردهای پزشکی و بهداشتی.'
      },
      applications: {
        en: ['Medical Packaging', 'Surgical Drapes', 'Protective Clothing', 'Medical Covers'],
        fa: ['بسته‌بندی پزشکی', 'پرده‌های جراحی', 'لباس محافظ', 'پوشش‌های پزشکی']
      },
      features: {
        en: [
          'Barrier protection',
          'Water-resistant properties',
          'High tensile strength',
          'Customizable specifications'
        ],
        fa: [
          'محافظت مانع',
          'خواص ضد آب',
          'استحکام کششی بالا',
          'مشخصات قابل تنظیم'
        ]
      },
      Icon: FaProcedures,
      href: '/industries/medical/laminated-nonwoven',
      image: '/images/laminated-nonwoven.jpg'
    },
    {
      title: {
        en: 'Medical Gown',
        fa: 'لباس پزشکی'
      },
      description: {
        en: 'High-performance medical gowns designed for optimal protection and comfort.',
        fa: 'لباس‌های پزشکی با عملکرد بالا، طراحی شده برای حفاظت و راحتی بهینه.'
      },
      applications: {
        en: ['Surgical Procedures', 'Patient Care', 'Isolation Protection', 'General Medical Use'],
        fa: ['جراحی', 'مراقبت از بیمار', 'محافظت ایزوله', 'استفاده پزشکی عمومی']
      },
      features: {
        en: [
          'Fluid-resistant material',
          'Breathable fabric',
          'Comfortable fit',
          'Multiple size options'
        ],
        fa: [
          'ماده مقاوم در برابر مایعات',
          'پارچه قابل تنفس',
          'اندازه راحت',
          'گزینه‌های اندازه متعدد'
        ]
      },
      Icon: FaUserMd,
      href: '/industries/medical/medical-gown',
      image: '/images/medical-gown.jpg'
    },
    {
      title: {
        en: 'Medilon',
        fa: 'مدیلون'
      },
      description: {
        en: 'Specialized medical nonwoven fabric for various healthcare applications.',
        fa: 'پارچه غیربافته پزشکی تخصصی برای کاربردهای مختلف بهداشتی و درمانی.'
      },
      applications: {
        en: ['Medical Packaging', 'Surgical Supplies', 'Healthcare Products', 'Medical Equipment'],
        fa: ['بسته‌بندی پزشکی', 'تجهیزات جراحی', 'محصولات بهداشتی', 'تجهیزات پزشکی']
      },
      features: {
        en: [
          'High-quality material',
          'Consistent performance',
          'Medical-grade standards',
          'Versatile applications'
        ],
        fa: [
          'ماده با کیفیت بالا',
          'عملکرد یکنواخت',
          'استانداردهای پزشکی',
          'کاربردهای متنوع'
        ]
      },
      Icon: FaSyringe,
      href: '/industries/medical/medilon',
      image: '/images/medilon.jpg'
    }
  ]

  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    // Set a delay to ensure the page content is loaded
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const content = {
    hero: {
      title: {
        en: 'Medical Products',
        fa: 'محصولات پزشکی'
      },
      description: {
        en: 'Premium medical-grade nonwoven products for healthcare applications',
        fa: 'محصولات غیربافته با کیفیت پزشکی برای کاربردهای بهداشتی و درمانی'
      },
      getInTouch: {
        en: 'Contact Sales',
        fa: 'تماس با فروش'
      }
    },
    buttons: {
      back: {
        en: 'Back',
        fa: 'بازگشت'
      },
      startOver: {
        en: 'Start Over',
        fa: 'شروع مجدد'
      },
      contactUs: {
        en: 'Contact Us',
        fa: 'تماس با ما'
      }
    },
    findProduct: {
      title: {
        en: 'Find the Right Product',
        fa: 'پیدا کردن محصول مناسب'
      },
      thermoBond: {
        title: {
          en: 'Thermo Bond',
          fa: 'ترمو باند'
        },
        description: {
          en: 'Medical & Filtration Industries',
          fa: 'صنایع پزشکی و فیلتراسیون'
        }
      },
      laminatedLayers: {
        title: {
          en: 'Laminated Layers',
          fa: 'لایه‌های لمینت شده'
        },
        description: {
          en: 'Medical & Cellulose Industries',
          fa: 'صنایع پزشکی و سلولزی'
        }
      },
      behbond: {
        title: {
          en: 'Behbond',
          fa: 'بهباند'
        },
        description: {
          en: 'Medical Industries',
          fa: 'صنایع پزشکی'
        },
        applications: {
          title: {
            en: 'Behbond is ideal for medical industries, including:',
            fa: 'بهباند برای صنایع پزشکی مناسب است، از جمله:'
          },
          items: {
            en: [
              'Surgical gowns',
              'Medical masks',
              'Healthcare protective equipment',
              'Medical drapes and covers'
            ],
            fa: [
              'لباس‌های جراحی',
              'ماسک‌های پزشکی',
              'تجهیزات محافظتی بهداشتی',
              'پوشش‌ها و پرده‌های پزشکی'
            ]
          }
        }
      },
      takbond: {
        title: {
          en: 'Takbond',
          fa: 'تکباند'
        },
        description: {
          en: 'Filtration Industries',
          fa: 'صنایع فیلتراسیون'
        },
        applications: {
          title: {
            en: 'Takbond is perfect for filtration applications, including:',
            fa: 'تکباند برای کاربردهای فیلتراسیون مناسب است، از جمله:'
          },
          items: {
            en: [
              'Air filtration systems',
              'Liquid filtration',
              'HVAC filters',
              'Industrial filtration'
            ],
            fa: [
              'سیستم‌های فیلتراسیون هوا',
              'فیلتراسیون مایعات',
              'فیلترهای HVAC',
              'فیلتراسیون صنعتی'
            ]
          }
        }
      },
      medigown: {
        title: {
          en: 'Medigown',
          fa: 'مدی گان'
        },
        description: {
          en: 'Medical Protective Wear',
          fa: 'پوشش محافظتی پزشکی'
        },
        applications: {
          title: {
            en: 'Medigown is designed for medical protective wear, including:',
            fa: 'مدی گان برای پوشش محافظتی پزشکی طراحی شده است، از جمله:'
          },
          items: {
            en: [
              'Medical gowns',
              'Surgical drapes',
              'Protective clothing',
              'Healthcare uniforms'
            ],
            fa: [
              'لباس‌های پزشکی',
              'پرده‌های جراحی',
              'لباس‌های محافظتی',
              'لباس‌های فرم بهداشتی'
            ]
          }
        }
      },
      medicoat: {
        title: {
          en: 'Medicoat',
          fa: 'مدی کوت'
        },
        description: {
          en: 'Medical Coating Solutions',
          fa: 'راهکارهای پوشش پزشکی'
        },
        applications: {
          title: {
            en: 'Medicoat provides specialized coating solutions for:',
            fa: 'مدی کوت راهکارهای پوشش تخصصی برای موارد زیر ارائه می‌دهد:'
          },
          items: {
            en: [
              'Medical device coatings',
              'Protective barriers',
              'Antimicrobial surfaces',
              'Medical packaging'
            ],
            fa: [
              'پوشش تجهیزات پزشکی',
              'موانع محافظتی',
              'سطوح ضد میکروبی',
              'بسته‌بندی پزشکی'
            ]
          }
        }
      },
      medilon: {
        title: {
          en: 'Medilon',
          fa: 'مدیلون'
        },
        description: {
          en: 'Medical & Cellulose Products',
          fa: 'محصولات پزشکی و سلولزی'
        },
        applications: {
          title: {
            en: 'Medilon offers solutions for medical and cellulose industries:',
            fa: 'مدیلون راهکارهایی برای صنایع پزشکی و سلولزی ارائه می‌دهد:'
          },
          items: {
            en: [
              'Medical nonwovens',
              'Cellulose-based products',
              'Healthcare materials',
              'Medical packaging'
            ],
            fa: [
              'غیربافته‌های پزشکی',
              'محصولات مبتنی بر سلولز',
              'مواد بهداشتی',
              'بسته‌بندی پزشکی'
            ]
          }
        }
      },
      buttons: {
        back: {
          en: 'Back',
          fa: 'بازگشت'
        },
        startOver: {
          en: 'Start Over',
          fa: 'شروع مجدد'
        },
        contactUs: {
          en: 'Contact Us',
          fa: 'تماس با ما'
        }
      }
    },
    cta: {
      title: {
        en: 'Interested in Our Medical Products?',
        fa: 'علاقه‌مند به محصولات پزشکی ما هستید؟'
      },
      description: {
        en: 'Contact our sales products team for detailed specifications and pricing',
        fa: 'برای دریافت مشخصات فنی و قیمت‌ها با تیم فروش محصولات تماس بگیرید'
      },
      button: {
        en: 'Get in Touch',
        fa: 'تماس با ما'
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

      {/* Alternating Image-Text Sections */}
      {medicalProducts.map((product, index) => (
        <section key={index} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-laeisaz-background'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
              <div className="w-full md:w-1/2">
                <AnimateOnScroll>
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={product.image}
                      alt={product.title[language]}
                      fill
                      className="object-cover"
                    />
                  </div>
                </AnimateOnScroll>
              </div>
              <div className="w-full md:w-1/2">
                <AnimateOnScroll className="delay-200">
                  <h2 className="text-3xl font-bold text-laeisaz-title mb-6">{product.title[language]}</h2>
                  <p className="text-laeisaz-text mb-6">{product.description[language]}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-laeisaz-title mb-2">
                      {language === 'en' ? 'Key Features' : 'ویژگی‌های کلیدی'}
                    </h3>
                    <ul className="list-disc list-inside text-laeisaz-text space-y-1">
                      {product.features[language].map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-laeisaz-title mb-2">
                      {language === 'en' ? 'Applications' : 'کاربردها'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications[language].map((app, idx) => (
                        <span key={idx} className="bg-laeisaz-background text-laeisaz-text px-3 py-1 rounded-full text-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-20 bg-laeisaz-title text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold mb-8">{content.cta.title[language]}</h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {content.cta.description[language]}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-300">
            <Link
              href="/contact"
              className="bg-white text-laeisaz-title px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              {content.hero.getInTouch[language]}
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
} 