'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaHospital, FaHardHat, FaCar, FaHome, FaTshirt, FaFilter, FaCheck, FaStar, FaUsers, FaAward, FaGlobe } from 'react-icons/fa'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { useLanguage } from '../components/ClientLayout'

export default function Industries() {
  const { language } = useLanguage()
  const [activeIndustry, setActiveIndustry] = useState('medical')
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [animationShown, setAnimationShown] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)

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
        en: 'Industry Solutions',
        fa: 'راه‌حل‌های صنعتی'
      },
      subtitle: {
        en: 'Specialized Non-Woven Solutions for Every Industry',
        fa: 'راه‌حل‌های تخصصی منسوجات نبافته برای هر صنعت'
      },
      description: {
        en: 'From medical applications to industrial manufacturing, we provide non-woven solutions that meet the unique requirements of each industry sector',
        fa: 'از کاربردهای پزشکی تا تولید صنعتی، ما راه‌حل‌های منسوجات نبافته ارائه می‌دهیم که نیازهای منحصر به فرد هر بخش صنعتی را برآورده می‌کند'
      }
    },
    stats: {
      industries: { en: 'Industries Served', fa: 'صنایع خدمات رسانی' },
      years: { en: 'Years Experience', fa: 'سال تجربه' },
      clients: { en: 'Satisfied Clients', fa: 'مشتریان راضی' },
      countries: { en: 'Countries', fa: 'کشورها' }
    },
    features: {
      title: {
        en: 'Why Choose Our Industry Solutions?',
        fa: 'چرا راه‌حل‌های صنعتی ما را انتخاب کنید؟'
      },
      items: [
        {
          title: { en: 'Industry Expertise', fa: 'تخصص صنعتی' },
          description: { en: 'Deep understanding of industry requirements', fa: 'درک عمیق از نیازمندی‌های صنعت' },
          icon: FaAward
        },
        {
          title: { en: 'Quality Assurance', fa: 'تضمین کیفیت' },
          description: { en: 'Rigorous quality control and compliance', fa: 'کنترل کیفیت دقیق و انطباق' },
          icon: FaCheck
        },
        {
          title: { en: 'Global Reach', fa: 'دسترسی جهانی' },
          description: { en: 'International standards and global supply chain', fa: 'استانداردهای بین‌المللی و زنجیره تامین جهانی' },
          icon: FaGlobe
        },
        {
          title: { en: 'Technical Support', fa: 'پشتیبانی فنی' },
          description: { en: 'Expert guidance and ongoing support', fa: 'راهنمایی تخصصی و پشتیبانی مداوم' },
          icon: FaUsers
        }
      ]
    },
    industries: {
      title: {
        en: 'Our Industry Focus',
        fa: 'تمرکز صنعتی ما'
      },
      subtitle: {
        en: 'Specialized solutions for diverse industry needs',
        fa: 'راه‌حل‌های تخصصی برای نیازهای متنوع صنعتی'
      }
    },
    cta: {
      title: {
        en: 'Ready to Transform Your Industry Applications?',
        fa: 'آماده تحول کاربردهای صنعتی خود هستید؟'
      },
      description: {
        en: 'Partner with us to develop innovative non-woven solutions tailored to your industry needs',
        fa: 'با ما شریک شوید تا راه‌حل‌های نوآورانه منسوجات نبافته متناسب با نیازهای صنعتی شما توسعه دهیم'
      },
      button: {
        en: 'Start Your Project',
        fa: 'شروع پروژه شما'
      }
    }
  }



  const industryData = {
    medical: {
      title: { en: 'Medical & Healthcare', fa: 'پزشکی و بهداشت' },
      icon: FaHospital,
      color: '#008DD4',
      description: {
        en: 'Advanced medical-grade non-woven materials for healthcare applications, ensuring safety, sterility, and performance in critical medical environments.',
        fa: 'مواد منسوجات نبافته پیشرفته درجه پزشکی برای کاربردهای بهداشتی، تضمین ایمنی، استریلیته و عملکرد در محیط‌های پزشکی حساس.'
      },
      image: '/images/industries/medical-main.jpg',
      stats: {
        products: '15+',
        applications: '25+',
        certifications: 'ISO 13485'
      },
      products: [
        {
          name: { en: 'Hospital Pad', fa: 'پد بیمارستانی' },
          description: { en: 'Premium hospital-grade pads for patient care', fa: 'پدهای بیمارستانی با کیفیت بالا برای مراقبت از بیمار' },
          image: '/images/products/hospital-pad.jpg',
          features: { en: ['High absorbency', 'Anti-bacterial', 'Breathable', 'Latex-free'], fa: ['جذب بالا', 'ضد باکتری', 'تنفس‌پذیر', 'بدون لاتکس'] }
        },
        {
          name: { en: 'Surgical Drapes', fa: 'پرده‌های جراحی' },
          description: { en: 'Sterile surgical drapes for operating rooms', fa: 'پرده‌های جراحی استریل برای اتاق عمل' },
          image: '/images/products/surgical-drapes.jpg',
          features: { en: ['Sterile barrier', 'Fluid resistant', 'Breathable', 'Tear resistant'], fa: ['مانع استریل', 'مقاوم در برابر مایعات', 'تنفس‌پذیر', 'مقاوم در برابر پارگی'] }
        },
        {
          name: { en: 'Medical Gowns', fa: 'گان‌های پزشکی' },
          description: { en: 'Protective medical gowns for healthcare workers', fa: 'گان‌های پزشکی محافظ برای کارکنان بهداشتی' },
          image: '/images/products/medical-gowns.jpg',
          features: { en: ['Fluid protection', 'Comfortable fit', 'Breathable fabric', 'Easy disposal'], fa: ['محافظت در برابر مایعات', 'برازش راحت', 'پارچه تنفس‌پذیر', 'دفع آسان'] }
        }
      ],
      applications: {
        en: ['Surgical Procedures', 'Patient Care', 'Medical Packaging', 'Infection Control', 'Emergency Care'],
        fa: ['جراحی', 'مراقبت از بیمار', 'بسته‌بندی پزشکی', 'کنترل عفونت', 'مراقبت اورژانسی']
      },
      href: '/industries/medical'
    },
         clothing: {
       title: { en: 'Clothing & Textiles', fa: 'پوشاک و منسوجات' },
       icon: FaTshirt,
      color: '#0E4B7C',
      description: {
        en: 'Innovative textile solutions for the fashion and clothing industry, providing superior performance and comfort in garment manufacturing.',
        fa: 'راه‌حل‌های نوآورانه نساجی برای صنعت مد و پوشاک، ارائه عملکرد و راحتی برتر در تولید پوشاک.'
      },
      image: '/images/industries/clothing-main.jpg',
      stats: {
        products: '12+',
        applications: '20+',
        certifications: 'OEKO-TEX'
      },
      products: [
        {
          name: { en: 'Adhesive Interlining', fa: 'لایی چسبی' },
          description: { en: 'Premium adhesive interlining for garment stability', fa: 'لایی چسبی پریمیوم برای پایداری پوشاک' },
          image: '/images/products/adhesive-interlining.jpg',
          features: { en: ['Strong bonding', 'Washable', 'Flexible', 'Easy application'], fa: ['پیوند قوی', 'قابل شستشو', 'انعطاف‌پذیر', 'کاربرد آسان'] }
        },
        {
          name: { en: 'Shoulder Pads', fa: 'پد شانه' },
          description: { en: 'Structured shoulder pads for formal wear', fa: 'پدهای شانه ساختاری برای لباس رسمی' },
          image: '/images/products/shoulder-pads.jpg',
          features: { en: ['Shape retention', 'Lightweight', 'Breathable', 'Durable'], fa: ['حفظ شکل', 'سبک', 'تنفس‌پذیر', 'بادوام'] }
        },
        {
          name: { en: 'Embroidery Backing', fa: 'پشت گلدوزی' },
          description: { en: 'Specialized backing for embroidery applications', fa: 'پشت تخصصی برای کاربردهای گلدوزی' },
          image: '/images/products/embroidery-backing.jpg',
          features: { en: ['Tear-away', 'Stabilizing', 'Clean removal', 'Various weights'], fa: ['قابل پاره شدن', 'تثبیت کننده', 'برداشت تمیز', 'وزن‌های مختلف'] }
        }
      ],
      applications: {
        en: ['Fashion Garments', 'Formal Wear', 'Sportswear', 'Accessories', 'Home Textiles'],
        fa: ['پوشاک مد', 'لباس رسمی', 'پوشاک ورزشی', 'لوازم جانبی', 'منسوجات خانگی']
      },
      href: '/industries/clothing'
    },
    bagShoes: {
      title: { en: 'Bags & Shoes', fa: 'کیف و کفش' },
      icon: FaCar,
      color: '#A13603',
      description: {
        en: 'Specialized materials for bag and footwear manufacturing, offering durability, flexibility, and aesthetic appeal for leather goods and accessories.',
        fa: 'مواد تخصصی برای تولید کیف و کفش، ارائه دوام، انعطاف‌پذیری و جذابیت زیبایی برای کالاهای چرمی و لوازم جانبی.'
      },
      image: '/images/industries/bags-shoes-main.jpg',
      stats: {
        products: '10+',
        applications: '15+',
        certifications: 'REACH'
      },
      products: [
        {
          name: { en: 'Venidon Reinforcement', fa: 'تقویت ونیدون' },
          description: { en: 'Reinforcement material for leather goods', fa: 'ماده تقویت کننده برای کالاهای چرمی' },
          image: '/images/products/venidon.jpg',
          features: { en: ['High strength', 'Flexible', 'Durable bonding', 'Moisture resistant'], fa: ['استحکام بالا', 'انعطاف‌پذیر', 'پیوند بادوام', 'مقاوم در برابر رطوبت'] }
        },
        {
          name: { en: 'Shoe Counter Material', fa: 'ماده کانتر کفش' },
          description: { en: 'Counter material for shoe heel support', fa: 'ماده کانتر برای پشتیبانی پاشنه کفش' },
          image: '/images/products/shoe-counter.jpg',
          features: { en: ['Shape retention', 'Heat moldable', 'Lightweight', 'Comfort fit'], fa: ['حفظ شکل', 'قابل قالب‌گیری حرارتی', 'سبک', 'برازش راحت'] }
        },
        {
          name: { en: 'Bag Stiffener', fa: 'سفت کننده کیف' },
          description: { en: 'Stiffening material for bag structure', fa: 'ماده سفت کننده برای ساختار کیف' },
          image: '/images/products/bag-stiffener.jpg',
          features: { en: ['Structural support', 'Lightweight', 'Easy cutting', 'Washable'], fa: ['پشتیبانی ساختاری', 'سبک', 'برش آسان', 'قابل شستشو'] }
        }
      ],
      applications: {
        en: ['Leather Goods', 'Handbags', 'Footwear', 'Accessories', 'Luggage'],
        fa: ['کالاهای چرمی', 'کیف دستی', 'کفش', 'لوازم جانبی', 'چمدان']
      },
      href: '/industries/bag-shoes'
    },
    bedCloths: {
      title: { en: 'Bed & Home Textiles', fa: 'رختخواب و منسوجات خانگی' },
      icon: FaHome,
      color: '#709F3E',
      description: {
        en: 'Comfort-focused solutions for bedding and home textile applications, ensuring softness, durability, and hygiene for residential use.',
        fa: 'راه‌حل‌های متمرکز بر راحتی برای کاربردهای رختخواب و منسوجات خانگی، تضمین نرمی، دوام و بهداشت برای استفاده مسکونی.'
      },
      image: '/images/industries/bedding-main.jpg',
      stats: {
        products: '8+',
        applications: '12+',
        certifications: 'STANDARD 100'
      },
      products: [
        {
          name: { en: 'Pillow Filling', fa: 'پر بالش' },
          description: { en: 'High-quality pillow filling material', fa: 'ماده پر بالش با کیفیت بالا' },
          image: '/images/products/pillow-filling.jpg',
          features: { en: ['Soft comfort', 'Hypoallergenic', 'Breathable', 'Washable'], fa: ['راحتی نرم', 'ضد حساسیت', 'تنفس‌پذیر', 'قابل شستشو'] }
        },
        {
          name: { en: 'Mattress Padding', fa: 'پدینگ تشک' },
          description: { en: 'Comfortable padding for mattress applications', fa: 'پدینگ راحت برای کاربردهای تشک' },
          image: '/images/products/mattress-padding.jpg',
          features: { en: ['Pressure relief', 'Durable', 'Moisture wicking', 'Fire resistant'], fa: ['تسکین فشار', 'بادوام', 'دفع رطوبت', 'مقاوم در برابر آتش'] }
        },
        {
          name: { en: 'Comforter Fill', fa: 'پر لحاف' },
          description: { en: 'Insulating fill for comforters and quilts', fa: 'پر عایق برای لحاف و روتختی' },
          image: '/images/products/comforter-fill.jpg',
          features: { en: ['Thermal insulation', 'Lightweight', 'Loft retention', 'Machine washable'], fa: ['عایق حرارتی', 'سبک', 'حفظ بلندی', 'قابل شستشو در ماشین'] }
        }
      ],
      applications: {
        en: ['Bedding', 'Pillows', 'Mattresses', 'Curtains', 'Upholstery'],
        fa: ['رختخواب', 'بالش', 'تشک', 'پرده', 'روکش']
      },
      href: '/industries/bed-cloths'
    },
    filtration: {
      title: { en: 'Filtration & Industrial', fa: 'فیلتراسیون و صنعتی' },
      icon: FaFilter,
      color: '#207589',
      description: {
        en: 'High-performance filtration solutions for industrial applications, providing superior filtration efficiency and durability in demanding environments.',
        fa: 'راه‌حل‌های فیلتراسیون با عملکرد بالا برای کاربردهای صنعتی، ارائه کارایی فیلتراسیون برتر و دوام در محیط‌های سخت.'
      },
      image: '/images/industries/filtration-main.jpg',
      stats: {
        products: '20+',
        applications: '30+',
        certifications: 'ISO 9001'
      },
      products: [
        {
          name: { en: 'Air Filter Media', fa: 'رسانه فیلتر هوا' },
          description: { en: 'High-efficiency air filtration media', fa: 'رسانه فیلتراسیون هوا با کارایی بالا' },
          image: '/images/products/air-filter.jpg',
          features: { en: ['High efficiency', 'Low pressure drop', 'Dust holding', 'Long lasting'], fa: ['کارایی بالا', 'افت فشار کم', 'نگهداری غبار', 'طولانی مدت'] }
        },
        {
          name: { en: 'Liquid Filter Cloth', fa: 'پارچه فیلتر مایع' },
          description: { en: 'Specialized cloth for liquid filtration', fa: 'پارچه تخصصی برای فیلتراسیون مایع' },
          image: '/images/products/liquid-filter.jpg',
          features: { en: ['Chemical resistance', 'High flow rate', 'Easy cleaning', 'Reusable'], fa: ['مقاومت شیمیایی', 'نرخ جریان بالا', 'تمیز کردن آسان', 'قابل استفاده مجدد'] }
        },
        {
          name: { en: 'Dust Collector Bags', fa: 'کیسه‌های جمع‌آوری غبار' },
          description: { en: 'Industrial dust collection bags', fa: 'کیسه‌های جمع‌آوری غبار صنعتی' },
          image: '/images/products/dust-bags.jpg',
          features: { en: ['High temperature', 'Chemical resistant', 'Long service life', 'Easy installation'], fa: ['دمای بالا', 'مقاوم شیمیایی', 'عمر خدمات طولانی', 'نصب آسان'] }
        }
      ],
      applications: {
        en: ['Air Filtration', 'Water Treatment', 'Industrial Processes', 'Automotive', 'HVAC Systems'],
        fa: ['فیلتراسیون هوا', 'تصفیه آب', 'فرآیندهای صنعتی', 'خودرو', 'سیستم‌های تهویه']
      },
      href: '/industries/filtration'
    }
  }

  const industries = Object.keys(industryData)

  return (
    <div className="bg-laeisaz-background min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-gradient-to-br from-laeisaz-title to-laeisaz-frame text-white overflow-hidden pb-32 md:pb-24 pt-16 md:pt-24">
      <div className="absolute inset-0 bg-[url('/images/background2.png')] bg-[length:380%] bg-center opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
          <AnimateOnScroll>
            <div className="text-center max-w-4xl mx-auto mt-8 md:-mt-8 lg:-mt-12">
              <div className="relative mb-4 md:mb-6 overflow-hidden">
                <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight font-iran-sans relative z-10 ${animationCompleted ? 'text-white' : 'bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'} ${isPageLoaded && !animationShown ? (language === 'fa' ? 'animate-ripple-rtl' : 'animate-ripple-ltr') : ''}`}>
                  {translations.hero.title[language]}
                </h1>
                <div className="absolute inset-0 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight font-iran-sans text-white/5 animate-pulse">
                  {translations.hero.title[language]}
                </div>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 font-light">
                {translations.hero.subtitle[language]}
              </p>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto opacity-90 px-2">
              {translations.hero.description[language]}
            </p>
            </div>
          </AnimateOnScroll>
        </div>
        {/* Bottom Stats */}
        <div className="relative z-10 mt-auto pb-8 md:pb-0 md:absolute md:bottom-16 md:inset-x-0">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold">15+</div>
                <div className="text-xs sm:text-sm md:text-base opacity-90 tracking-wide mt-1">{translations.stats.industries[language]}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold">25+</div>
                <div className="text-xs sm:text-sm md:text-base opacity-90 tracking-wide mt-1">{translations.stats.years[language]}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold">500+</div>
                <div className="text-xs sm:text-sm md:text-base opacity-90 tracking-wide mt-1">{translations.stats.clients[language]}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold">20+</div>
                <div className="text-xs sm:text-sm md:text-base opacity-90 tracking-wide mt-1">{translations.stats.countries[language]}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-laeisaz-title mb-4">
                {translations.features.title[language]}
            </h2>
            </div>
          </AnimateOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {translations.features.items.map((feature, index) => (
              <AnimateOnScroll key={index} className={`delay-${index * 100}`}>
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-laeisaz-title text-white rounded-full mb-4">
                    <feature.icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-laeisaz-title mb-2">
                    {feature.title[language]}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description[language]}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-laeisaz-title mb-4">
                {translations.industries.title[language]}
            </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {translations.industries.subtitle[language]}
              </p>
            </div>
          </AnimateOnScroll>

          {/* Industry Tabs */}
          <div className="flex md:flex-wrap overflow-x-auto md:overflow-visible justify-start md:justify-center gap-2 mb-8 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
            {industries.map((industry) => {
              const data = industryData[industry]
              const IconComponent = data.icon
              return (
                <button
                  key={industry}
                  onClick={() => setActiveIndustry(industry)}
                  className={`shrink-0 snap-start flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeIndustry === industry
                      ? 'bg-laeisaz-title text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="text-lg" />
                  <span className="font-medium">{data.title[language]}</span>
                </button>
              )
            })}
          </div>

          {/* Active Industry Details */}
          <AnimateOnScroll key={activeIndustry}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div 
                className="text-white p-6 sm:p-8" 
                style={{ 
                  backgroundColor: activeIndustry === 'medical' ? '#008DD4' : 
                                   activeIndustry === 'clothing' ? '#0E4B7C' : 
                                   activeIndustry === 'bagShoes' ? '#A13603' : 
                                   activeIndustry === 'bedCloths' ? '#709F3E' : 
                                   activeIndustry === 'filtration' ? '#207589' : '#008DD4',
                  backgroundImage: 'none'
                }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    {React.createElement(industryData[activeIndustry].icon, { className: "text-2xl" })}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {industryData[activeIndustry].title[language]}
                    </h3>
                    <div className="flex flex-wrap gap-3 sm:gap-6 mt-2 text-xs sm:text-sm opacity-90">
                      <span>{industryData[activeIndustry].stats.products} Products</span>
                      <span>{industryData[activeIndustry].stats.applications} Applications</span>
                      <span>{industryData[activeIndustry].stats.certifications}</span>
                    </div>
                  </div>
                </div>
                <p className="text-base sm:text-lg opacity-90">
                  {industryData[activeIndustry].description[language]}
                </p>
              </div>

              <div className="p-8">
                {/* Featured Products */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Featured Products' : 'محصولات ویژه'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {industryData[activeIndustry].products.map((product, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h5 className="text-lg font-bold text-laeisaz-title mb-2">
                          {product.name[language]}
                        </h5>
                        <p className="text-gray-600 mb-4 text-sm">
                          {product.description[language]}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {product.features[language].slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-laeisaz-background text-laeisaz-text px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-laeisaz-title mb-4">
                    {language === 'en' ? 'Applications' : 'کاربردها'}
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {industryData[activeIndustry].applications[language].map((app, index) => (
                      <span key={index} className="bg-laeisaz-background text-laeisaz-text px-3 py-1.5 rounded-full text-sm font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Link
                    href={industryData[activeIndustry].href}
                    className="inline-flex items-center gap-2 bg-laeisaz-title text-white px-8 py-3 rounded-lg font-semibold hover:bg-laeisaz-frame transition-colors"
                  >
                    {language === 'en' ? 'Explore Industry Solutions' : 'کشف راه‌حل‌های صنعتی'}
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-laeisaz-title text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold mb-6">
              {translations.cta.title[language]}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {translations.cta.description[language]}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
                className="bg-white text-laeisaz-title px-6 sm:px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {translations.cta.button[language]}
            </Link>
              <Link
                href="/products"
                className="border border-white text-white px-6 sm:px-8 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-laeisaz-title transition-colors inline-flex items-center justify-center w-full sm:w-auto"
              >
                {language === 'en' ? 'View All Products' : 'مشاهده همه محصولات'}
            </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
} 