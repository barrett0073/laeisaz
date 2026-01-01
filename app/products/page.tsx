'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaSearch, FaFilter, FaTh, FaList, FaCheck, FaStar } from 'react-icons/fa'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { useLanguage } from '../components/ClientLayout'

export default function Products() {
  const { language } = useLanguage()
  // State management
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [viewportHeight, setViewportHeight] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [animationShown, setAnimationShown] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)

  // Set viewport height on client side
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight)
    }
    
    updateViewportHeight()
    window.addEventListener('resize', updateViewportHeight)
    
    return () => window.removeEventListener('resize', updateViewportHeight)
  }, [])

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
        en: 'Our Products', 
        fa: 'محصولات ما' 
      },
      description: { 
        en: 'Our comprehensive range of high-quality nonwoven products for diverse industrial applications',
        fa: 'مجموعه جامع محصولات نبافته با کیفیت بالا ما را برای کاربردهای صنعتی متنوع'
      }
    },
    filters: {
      search: {
        en: 'Search categories...',
        fa: 'جستجوی دسته‌بندی‌ها...'
      },
      category: {
        en: 'Category',
        fa: 'دسته‌بندی'
      },
      sortBy: {
        en: 'Sort by',
        fa: 'مرتب‌سازی بر اساس'
      },
      viewMode: {
        en: 'View',
        fa: 'نمایش'
      }
    },
    categories: {
      all: { en: 'All Categories', fa: 'همه دسته‌بندی‌ها' },
      felt: { en: 'Needle Punched Felt', fa: 'لایی سوزنی' },
      thermo: { en: 'Thermo Fuse', fa: 'لایی ترموفیوز' },
      coating: { en: 'Coating', fa: 'لایی کوتینگ' },
      interlining: { en: 'Interlining', fa: 'لایی چسب' },
      thermobonding: { en: 'Thermobonding', fa: 'ترموباندینگ' },
      laminated: { en: 'Laminated', fa: 'لایی لمینت' },
      synthetic: { en: 'Synthetic', fa: 'لایی سنتتیک' },
      'fusible-interfacing': { en: 'Fusible Interfacing', fa: 'لایی چسب سوزنی' },
    },
    sortOptions: {
      name: { en: 'Name', fa: 'نام' },
      applications: { en: 'Applications', fa: 'کاربردها' }
    },
    productInfo: {
      specifications: { en: 'Specifications', fa: 'مشخصات' },
      applications: { en: 'Applications', fa: 'کاربردها' },
      features: { en: 'Features', fa: 'ویژگی‌ها' },
      viewDetails: { en: 'View Details', fa: 'مشاهده جزئیات' },
      viewCategory: { en: 'View Category', fa: 'مشاهده دسته‌بندی' },
      downloadSpec: { en: 'Download Spec', fa: 'دانلود مشخصات' },
      contactSales: { en: 'Contact Sales', fa: 'تماس با فروش' },
      closeModal: { en: 'Close', fa: 'بستن' }
    },
    stats: {
      products: { en: 'Products', fa: 'محصولات' },
      categories: { en: 'Categories', fa: 'دسته‌بندی' },
      applications: { en: 'Applications', fa: 'کاربردها' }
    }
  }

  const productCategories = [
    {
      id: 'felt',
      name: {
        en: 'Needle Punched Felt',
        fa: 'لایی سوزنی'
      },
      description: {
        en: 'High-performance needle punched felt products for industrial applications with superior strength and durability',
        fa: 'محصولات لایی سوزنی با عملکرد بالا برای کاربردهای صنعتی با استحکام و دوام برتر'
      },
      image: '/images/products/needle-punched-felt/main.jpg',
      href: '/products/needle-punched-felt',
      productCount: 3,
      applications: {
        en: ['Automotive', 'Filtration', 'Insulation', 'Geotextiles'],
        fa: ['خودروسازی', 'فیلتراسیون', 'عایق‌بندی', 'ژئوتکستایل']
      },
      features: {
        en: ['Superior Strength', 'Chemical Resistance', 'Customizable Density', 'Excellent Stability'],
        fa: ['استحکام برتر', 'مقاومت شیمیایی', 'چگالی قابل تنظیم', 'پایداری عالی']
      }
    },
    {
      id: 'thermo',
      name: {
        en: 'Thermo Fuse',
        fa: 'ترموفیوز'
      },
      description: {
        en: 'Advanced thermo-fusible materials for enhanced bonding applications with excellent thermal properties',
        fa: 'مواد حرارتی پیشرفته برای کاربردهای پیوند بهبود یافته با خواص حرارتی عالی'
      },
      image: '/images/products/thermo-fuse-main.jpg',
      href: '/products/thermo-fuse',
      productCount: 1,
      applications: {
        en: ['Textile Industry', 'Automotive', 'Footwear', 'Furniture'],
        fa: ['صنعت نساجی', 'خودروسازی', 'کفش', 'مبلمان']
      },
      features: {
        en: ['Strong Thermal Bonding', 'Excellent Adhesion', 'Flexible Application', 'Durable Performance'],
        fa: ['پیوند حرارتی قوی', 'چسبندگی عالی', 'کاربرد انعطاف‌پذیر', 'عملکرد بادوام']
      }
    },
    {
      id: 'coating',
      name: {
        en: 'Coating',
        fa: 'لایی کوتینگ'
      },
      description: {
        en: 'High-performance coating for demanding applications with superior barrier properties.',
        fa: 'لایی کوتینگ با عملکرد بالا برای کاربردهای سخت با خواص مانع برتر.'
      },
      image: '/images/products/coating-main.jpg',
      href: '/products/coating',
      productCount: 1,
      applications: {
        en: ['Industrial Protection', 'Marine', 'Construction', 'Packaging'],
        fa: ['محافظت صنعتی', 'دریایی', 'ساختمان', 'بسته‌بندی']
      },
      features: {
        en: ['Superior Barrier Properties', 'Chemical Resistance', 'UV Protection', 'Flexible Coating'],
        fa: ['خواص مانع برتر', 'مقاومت شیمیایی', 'محافظت UV', 'پوشش انعطاف‌پذیر']
      }
    },
    {
      id: 'interlining',
      name: {
        en: 'Interlining',
        fa: 'لایی چسب'
      },
      description: {
        en: 'Interlining materials for high-end textile applications with excellent stability and bonding.',
        fa: 'مواد لایی چسب برای کاربردهای نساجی درجه یک با پایداری و پیوند عالی.'
      },
      image: '/images/products/interlining-main.jpg',
      href: '/products/interlining',
      productCount: 1,
      applications: {
        en: ['Fashion Garments', 'Formal Wear', 'Accessories', 'Home Textiles'],
        fa: ['پوشاک مد', 'لباس رسمی', 'لوازم جانبی', 'منسوجات خانگی']
      },
      features: {
        en: ['Excellent Stability', 'Smooth Application', 'Durable Bonding', 'Wrinkle Resistance'],
        fa: ['پایداری عالی', 'کاربرد صاف', 'پیوند بادوام', 'مقاومت در برابر چروک']
      }
    },
    {
      id: 'thermobonding',
      name: {
        en: 'Thermobonding',
        fa: 'مواد ترموباندینگ'
      },
      description: {
        en: 'Advanced thermobonding for superior fabric consolidation with excellent thermal stability.',
        fa: 'ترموباندینگ پیشرفته برای تحکیم برتر پارچه با پایداری حرارتی عالی.'
      },
      image: '/images/products/thermobonding/main.jpg',
      href: '/products/thermobonding',
      productCount: 1,
      applications: {
        en: ['Automotive Interior', 'Upholstery', 'Mattresses', 'Cushioning'],
        fa: ['داخلی خودرو', 'روکش', 'تشک', 'بالشتک']
      },
      features: {
        en: ['Superior Bonding Strength', 'Excellent Recovery', 'Thermal Stability', 'Consistent Quality'],
        fa: ['استحکام پیوند برتر', 'بازیابی عالی', 'پایداری حرارتی', 'کیفیت یکنواخت']
      }
    },
    {
      id: 'laminated',
      name: {
        en: 'Laminated',
        fa: 'لایی لمینت'
      },
      description: {
        en: 'Advanced laminated nonwoven materials for medical and industrial applications with protective barriers.',
        fa: 'مواد نبافته لمینت پیشرفته برای کاربردهای پزشکی و صنعتی با سدهای محافظتی'
      },
      image: '/images/products/laminated-nonwoven.jpg',
      href: '/products/laminated',
      productCount: 1,
      applications: {
        en: ['Medical Equipment', 'Surgical Gowns', 'Protective Clothing', 'Industrial Filters'],
        fa: ['تجهیزات پزشکی', 'گون‌های جراحی', 'لباس‌های محافظتی', 'فیلترهای صنعتی']
      },
      features: {
        en: ['Medical Grade', 'Protective Barrier', 'Liquid Resistance', 'Breathability'],
        fa: ['درجه پزشکی', 'سد محافظتی', 'مقاومت در برابر مایعات', 'تنفس‌پذیری']
      }
    },
    {
      id: 'synthetic',
      name: {
        en: 'Synthetic',
        fa: 'لایی سنتتیک'
      },
      description: {
        en: 'Advanced synthetic felt with high resistance, softness, and superior formability for footwear and bag manufacturing.',
        fa: 'نمد پیشرفته سنتتیک با مقاومت بالا، نرمی و فرم‌پذیری برتر برای تولید کفش و کیف'
      },
      image: '/images/products/synthetic-felt.jpg',
      href: '/products/synthetic',
      productCount: 1,
      applications: {
        en: ['Military Shoes', 'Safety Shoes', 'Sandals', 'Seamless Bags'],
        fa: ['کفش‌های نظامی', 'کفش‌های ایمنی', 'صندل‌ها', 'کیف‌های یکپارچه']
      },
      features: {
        en: ['High Resistance', 'Superior Formability', 'Double-Sided', 'No Lint & Odor'],
        fa: ['مقاومت بالا', 'فرم‌پذیری برتر', 'دو رو', 'بدون پرز و بو']
      }
    },
    {
      id: 'fusible-interfacing',
      name: {
        en: 'Fusible Interfacing',
        fa: 'لایی چسب سوزنی'
      },
      description: {
        en: 'Specialized needle-punched fusible interfacing for clothing and embroidery applications with excellent fabric compatibility.',
        fa: 'لایی چسب سوزنی تخصصی برای کاربردهای پوشاک و گلدوزی با سازگاری عالی با پارچه'
      },
      image: '/images/products/fusible-interfacing.jpg',
      href: '/products/fusible-interfacing',
      productCount: 1,
      applications: {
        en: ['Clothing Industry', 'Embroidery', 'Doll Production', 'Garment Manufacturing'],
        fa: ['صنعت پوشاک', 'گلدوزی', 'تولید عروسک', 'تولید پوشاک']
      },
      features: {
        en: ['Strength & Shaping', 'Fabric Compatibility', 'Smooth Surface', 'Embroidery Ready'],
        fa: ['استحکام و فرم‌دهی', 'سازگاری با پارچه', 'سطح صاف', 'آماده گلدوزی']
      }
    }
  ]

  // Filter and sort products
  useEffect(() => {
    let filtered = productCategories.filter(category => {
      const matchesSearch = category.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.applications[language].some(app => 
                             app.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort categories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name[language].localeCompare(b.name[language])
        case 'applications':
          return a.applications[language].length - b.applications[language].length
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, sortBy, language])

  // Category Card Component
  const CategoryCard = ({ category }) => {
    return (
      <Link href={category.href} className="block group">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={category.image}
              alt={category.name[language || 'en']}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
          </div>
          
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-laeisaz-title group-hover:text-laeisaz-frame transition-colors line-clamp-2">
                {category.name[language || 'en']}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {category.description[language || 'en']}
            </p>
            
            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {category.features[language || 'en'].slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-laeisaz-background text-laeisaz-text px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Read more */}
            <div className="mt-2">
              <Link
                href={category.href}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-laeisaz-title text-white font-semibold hover:bg-laeisaz-title/90 transition-colors"
              >
                {translations.productInfo.viewDetails[language]}
              </Link>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // Category List Item Component
  const CategoryListItem = ({ category }) => {
    return (
      <Link href={category.href} className="block group">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
          <div className="flex gap-6">
            <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={category.image}
                alt={category.name[language || 'en']}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-laeisaz-title group-hover:text-laeisaz-frame transition-colors">
                  {category.name[language || 'en']}
                </h3>
                
              </div>
              
              <p className="text-gray-600 mb-3">
                {category.description[language || 'en']}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-gray-500 block text-sm">{language === 'en' ? 'Key Features' : 'ویژگی‌های کلیدی'}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {category.features[language || 'en'].slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-laeisaz-background text-laeisaz-text px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 block text-sm">{language === 'en' ? 'Applications' : 'کاربردها'}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {category.applications[language || 'en'].slice(0, 3).map((app, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Read more */}
              <div className="mt-2">
                <Link
                  href={category.href}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-laeisaz-title text-white font-semibold hover:bg-laeisaz-title/90 transition-colors"
                >
                  {translations.productInfo.viewDetails[language]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-laeisaz-background min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-laeisaz-title to-laeisaz-frame text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/background2.png')] bg-[length:380%] bg-center opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimateOnScroll>
            <div className="text-center max-w-4xl mx-auto -mt-6 md:-mt-24">
              <div className="relative mb-6 overflow-hidden">
                <h1 className={`text-5xl md:text-7xl font-bold tracking-tight font-iran-sans relative z-10 ${animationCompleted ? 'text-white' : 'bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'} ${isPageLoaded && !animationShown ? (language === 'fa' ? 'animate-ripple-rtl' : 'animate-ripple-ltr') : ''}`}>
                  {translations.hero.title[language]}
                </h1>
                <div className="absolute inset-0 text-5xl md:text-7xl font-bold tracking-tight font-iran-sans text-white/5 animate-pulse">
                  {translations.hero.title[language]}
                </div>
              </div>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {translations.hero.description[language]}
            </p>
              {/* Stats moved to bottom */}
            </div>
          </AnimateOnScroll>
        </div>
        {/* Bottom Stats */}
        <div className="absolute bottom-16 md:bottom-24 inset-x-0 z-10">
          <div className="max-w-3xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-6 md:gap-10">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold">{productCategories.length}</div>
                <div className="text-sm md:text-base opacity-90 tracking-wide">{translations.stats.categories[language]}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold">20+</div>
                <div className="text-sm md:text-base opacity-90 tracking-wide">{translations.stats.applications[language]}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold">15+</div>
                <div className="text-sm md:text-base opacity-90 tracking-wide">{language === 'en' ? 'Industries' : 'صنایع'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={translations.filters.search[language]}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-laeisaz-title focus:border-transparent"
              />
                      </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-laeisaz-title focus:border-transparent"
              >
                {Object.entries(translations.categories).map(([key, value]) => (
                  <option key={key} value={key}>{value[language]}</option>
                ))}
              </select>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-laeisaz-title focus:border-transparent"
              >
                {Object.entries(translations.sortOptions).map(([key, value]) => (
                  <option key={key} value={key}>{value[language]}</option>
                ))}
              </select>
              
              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                                 <button
                   onClick={() => setViewMode('grid')}
                   className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'}`}
                 >
                   <FaTh />
                 </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
                >
                  <FaList />
                </button>
                        </div>
                      </div>
                    </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {language === 'en' 
              ? `Showing ${filteredProducts.length} of ${productCategories.length} categories`
              : `نمایش ${filteredProducts.length} از ${productCategories.length} دسته‌بندی`
            }
          </div>
        </div>
      </section>

                  {/* Categories Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {language === 'en' ? 'No categories found' : 'دسته‌بندی یافت نشد'}
              </h3>
              <p className="text-gray-500">
                {language === 'en' 
                  ? 'Try adjusting your search or filters'
                  : 'جستجو یا فیلترهای خود را تنظیم کنید'
                }
              </p>
                </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {filteredProducts.map((category, index) => (
                <AnimateOnScroll key={category.id} className={`delay-${(index % 8) * 100}`}>
                  {viewMode === 'grid' ? (
                    <CategoryCard category={category} />
                  ) : (
                    <CategoryListItem category={category} />
                  )}
              </AnimateOnScroll>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-laeisaz-title text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? 'Need Custom Solutions?' : 'به راه‌حل‌های سفارشی نیاز دارید؟'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {language === 'en' 
                ? 'Our technical team can develop customized products to meet your specific requirements'
                : 'تیم فنی ما می‌تواند محصولات سفارشی برای برآورده کردن نیازهای خاص شما توسعه دهد'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-laeisaz-title px-6 sm:px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {translations.productInfo.contactSales[language]}
            </Link>
              <Link
                href="/technical-info"
                className="border border-white text-white px-6 sm:px-8 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-laeisaz-title transition-colors inline-flex items-center justify-center w-full sm:w-auto"
              >
                {language === 'en' ? 'Technical Information' : 'اطلاعات فنی'}
            </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Product Detail Modal */}
      {/* The ProductDetailModal component is no longer needed as the modal is replaced by CategoryCard/ListItem */}
    </div>
  )
} 