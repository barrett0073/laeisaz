'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from './components/AnimateOnScroll'
import { useLanguage } from './components/ClientLayout'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface GalleryImage {
  id: string
  title: {
    en: string
    fa: string
  }
  description?: {
    en: string
    fa: string
  }
  image: string
  order: number
  isActive: boolean
}

export default function Home() {
  const { language } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [animationShown, setAnimationShown] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Touch/swipe gesture state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Enhanced gallery state
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    fetchGalleryImages();
    
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
  }, []);

  // Mark client-side mount so we can safely use portals
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Lock page scroll when lightbox is open so it always stays centered in the viewport
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalOverflow = document.body.style.overflow;

    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }

    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, [isLightboxOpen]);

  const fetchGalleryImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/gallery');
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        // Sort images by order
        const sortedImages = [...data].sort((a, b) => a.order - b.order);
        setGalleryImages(sortedImages);
        // Reset active image index if current index is out of bounds
        if (activeImage >= sortedImages.length) {
          setActiveImage(0);
        }
      } else {
        console.error('Expected an array of images, but got:', data);
        setGalleryImages([]);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setGalleryImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle touch start
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end - determine if swipe occurred
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && galleryImages.length > 0) {
      // Swipe left - next image
      setActiveImage(activeImage === galleryImages.length - 1 ? 0 : activeImage + 1);
    }
    if (isRightSwipe && galleryImages.length > 0) {
      // Swipe right - previous image  
      setActiveImage(activeImage === 0 ? galleryImages.length - 1 : activeImage - 1);
    }
  };

  // Navigation functions
  const goToPrevious = () => {
    setIsImageLoading(true);
    setActiveImage(activeImage === 0 ? galleryImages.length - 1 : activeImage - 1);
  };

  const goToNext = () => {
    setIsImageLoading(true);
    setActiveImage(activeImage === galleryImages.length - 1 ? 0 : activeImage + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (galleryImages.length > 1) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            goToPrevious();
            break;
          case 'ArrowRight':
            e.preventDefault();
            goToNext();
            break;
        }
      }

      if (isLightboxOpen && e.key === 'Escape') {
        e.preventDefault();
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryImages.length, activeImage, isLightboxOpen]);

  // Image preloading
  useEffect(() => {
    if (galleryImages.length === 0) return;

    const preloadImage = (index: number) => {
      if (preloadedImages.has(index)) return;

      const img = document.createElement('img');
      img.src = galleryImages[index].image;
      img.onload = () => {
        setPreloadedImages(prev => new Set(Array.from(prev).concat(index)));
      };
    };

    // Preload current, next, and previous images
    const currentIndex = activeImage;
    const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;

    preloadImage(currentIndex);
    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [activeImage, galleryImages, preloadedImages]);

  // Handle image load complete
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };



  const translations = {
    hero: {
      title: {
        en: 'Industrial Excellence in Non-Woven Production',
        fa: 'تولید برتر منسوجات نبافته'
      },
      description: {
        en: 'LaeiSaz Industrial Company is one of the largest non-woven fabric producers in the Middle East',
        fa: 'شرکت صنعتی لایی ساز یکی از بزرگترین تولیدکنندگان منسوجات نبافته در خاورمیانه'
      },
      exploreProducts: {
        en: 'Explore Our Products',
        fa: 'محصولات ما'
      },
      getInTouch: {
        en: 'Contact Sales',
        fa: 'تماس با فروش'
      }
    },
    capabilities: {
      title: {
        en: 'Industrial Capabilities',
        fa: 'توانایی‌های صنعتی'
      },
      items: [
        {
          title: {
            en: 'Advanced Facilities',
            fa: 'تاسیسات پیشرفته'
          },
          description: {
            en: '100,000 m² production plant with 15 state-of-the-art production lines',
            fa: 'کارخانه تولیدی ۱۰۰,۰۰۰ متر مربعی با ۱۵ خط تولید پیشرفته'
          }
        },
        {
          title: {
            en: 'Quality Certified',
            fa: 'گواهینامه کیفیت'
          },
          description: {
            en: 'Quality Certifications\nISO 9001:2015,ISO 14001:2015,ISO 45001:2018,ISO 10002:2018',
            fa: 'دارای گواهینامه های کیفیت\nISO 9001:2015,ISO 14001:2015,ISO 45001:2018,ISO 10002:2018'
          }
        },
        {
          title: {
            en: 'High Production',
            fa: 'ظرفیت تولید بالا'
          },
          description: {
            en: '14,000 tons annual production capacity with advanced Swiss, German, and Italian machinery',
            fa: 'ظرفیت تولید سالانه ۱۴,۰۰۰ تن با ماشین‌آلات پیشرفته سوئیسی، آلمانی و ایتالیایی'
          }
        }
      ]
    },
    gallery: {
      title: {
        en: 'Gallery',
        fa: 'گالری'
      }
    },
    applications: {
      title: {
        en: 'Industrial Applications',
        fa: 'کاربردهای صنعتی'
      },
      items: [
        { 
          id: 'خودرو',
          title: { en: 'Automotive', fa: 'خودرو' } 
        },
        { 
          id: 'فیلتراسیون',
          title: { en: 'Filtration', fa: 'فیلتراسیون' } 
        },
        { 
          id: 'پوشاک',
          title: { en: 'Clothing', fa: 'پوشاک' } 
        },
        { 
          id: 'پزشکی',
          title: { en: 'Medical', fa: 'پزشکی' } 
        },
        { 
          id: 'کالای خواب',
          title: { en: 'Bed & Cloths', fa: 'کالای خواب' } 
        },
        { 
          id: 'کیف و کفش',
          title: { en: 'Bag & Shoes', fa: 'کیف و کفش' } 
        }
      ]
    },
    cta: {
      title: {
        en: 'Ready to Partner with Us?',
        fa: 'آماده همکاری با ما هستید؟'
      },
      description: {
        en: 'Join our network of satisfied industrial clients and experience the LaeiSaz difference',
        fa: 'به شبکه مشتریان راضی صنعتی ما بپیوندید و تفاوت لایی‌ساز را تجربه کنید'
      },
      button: {
        en: 'Get in Touch',
        fa: 'تماس بگیرید'
      }
    }
  };

  return (
    <div className="bg-laeisaz-background">
      {/* Hero Section with Industrial Background */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center bg-[url('/images/optimized/background.webp')] bg-[length:380%] bg-center bg-no-repeat">    
       {/* Fullscreen background minus navbar height */}
        <div className="absolute inset-0 bg-[#033666]/80" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <AnimateOnScroll animation="slideUp" delay={0.2}>
            <div className="relative mb-6 overflow-hidden">
              <h1 className={`text-5xl md:text-7xl font-bold tracking-tight font-iran-sans relative z-10 ${language === 'fa' ? 'leading-relaxed md:leading-tight' : 'leading-tight'} ${animationCompleted ? 'text-white' : 'bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'} ${isPageLoaded && !animationShown ? (language === 'fa' ? 'animate-ripple-rtl' : 'animate-ripple-ltr') : ''}`}>
                {translations.hero.title[language]}
              </h1>
              <div className={`absolute inset-0 text-5xl md:text-7xl font-bold tracking-tight font-iran-sans text-white/5 animate-pulse ${language === 'fa' ? 'leading-relaxed md:leading-tight' : 'leading-tight'}`}>
                {translations.hero.title[language]}
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slideUp" delay={0.4}>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {translations.hero.description[language]}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slideUp" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/products"
                  className="bg-laeisaz-frame hover:bg-laeisaz-frame/90 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-lg text-lg font-semibold w-fit sm:w-auto transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  {translations.hero.exploreProducts[language]}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/contact"
                  className="bg-white text-laeisaz-title px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105 hover:-translate-y-1"
                >
                  {translations.hero.getInTouch[language]}
                </Link>
              </motion.div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Industrial Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slideUp" delay={0.2}>
            <h2 className="text-4xl font-bold text-laeisaz-title text-center mb-16">
              {translations.capabilities.title[language]}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {translations.capabilities.items.map((capability, index) => (
              <AnimateOnScroll 
                key={index} 
                animation="scaleIn" 
                delay={0.2 + (index * 0.2)}
                duration={0.8}
              >
                <motion.div 
                  className="text-center"
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <motion.div 
                    className="relative w-32 h-32 mx-auto mb-6"
                    whileHover={{ 
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Image
                      src={`/icon/${index === 0 ? 'افتخارات.jpg' : index === 1 ? 'درباره ما.jpg' : 'نمایشگاه‌ها.jpg'}`}
                      alt={capability.title[language]}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-laeisaz-title mb-4">{capability.title[language]}</h3>
                  <p className="text-laeisaz-text whitespace-pre-line">{capability.description[language]}</p>
                </motion.div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-6 md:py-8 bg-gradient-to-b from-white to-laeisaz-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h3 className="text-3xl font-bold text-laeisaz-title text-center mb-6 md:mb-8">
              {translations.gallery.title[language]}
            </h3>
          </AnimateOnScroll>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-laeisaz-title"></div>
              <p className="mt-4 text-gray-500">
                {language === 'en' ? 'Loading gallery...' : 'در حال بارگذاری گالری...'}
              </p>
            </div>
          ) : galleryImages.length > 0 ? (
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] md:gap-4 lg:gap-6 items-stretch">
              {/* Main Image Container */}
              <AnimateOnScroll>
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 border-2 border-laeisaz-title/10 h-full">
                  <div 
                    className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-[320px] lg:h-[400px] w-full cursor-pointer select-none group"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    {/* Loading Spinner */}
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-laeisaz-title"></div>
                      </div>
                    )}

                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={galleryImages[activeImage].image}
                        alt={galleryImages[activeImage].title[language]}
                        fill
                        className="object-cover transition-all duration-700 hover:brightness-110"
                        priority
                        onLoad={handleImageLoad}
                      />
                    </motion.div>
                    
                    
                    {/* Mobile Navigation Arrows - Enhanced */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={goToPrevious}
                          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10 hover:scale-110"
                          aria-label="Previous image"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10 hover:scale-110"
                          aria-label="Next image"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </>
                    )}
                    
                    {/* Enhanced Image Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide mb-1">
                            {galleryImages[activeImage].title[language]}
                          </h4>
                          {galleryImages[activeImage].description && (
                            <p className="text-sm sm:text-base mt-1 opacity-90 line-clamp-2">
                              {galleryImages[activeImage].description[language]}
                            </p>
                          )}
                        </div>
                        {/* Image opener icon */}
                        <button
                          type="button"
                          onClick={() => setIsLightboxOpen(true)}
                          className="shrink-0 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/30 text-white transition-colors duration-200"
                          aria-label={language === 'fa' ? 'باز کردن تصویر در نمای بزرگ' : 'Open image viewer'}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 9h6v6M9 15l6-6M5 5h4M5 9V5m10 10h4m-4 4h4m0-4v4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Enhanced Image Counter */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/40 text-white px-3 py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm font-medium">
                      {activeImage + 1} / {galleryImages.length}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
              
              {/* Thumbnails & Info - shown to the right on larger screens */}
              <AnimateOnScroll className="delay-200">
                <div className="space-y-3 md:space-y-4">
                  {/* Horizontal Scroll Thumbnails for Mobile */}
                  <div className="block sm:hidden">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                    {galleryImages.map((image, index) => (
                      <button
                          key={image.id}
                          onClick={() => setActiveImage(index)}
                          className={`flex-shrink-0 relative w-24 h-18 rounded-lg overflow-hidden transition-all duration-300 snap-center ${
                          activeImage === index 
                              ? 'ring-3 ring-laeisaz-title scale-105 shadow-lg' 
                              : 'ring-1 ring-gray-200 opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <Image
                          src={image.image}
                          alt={image.title[language]}
                          fill
                          className={`object-cover transition-all duration-500 ${
                              activeImage === index ? 'brightness-110' : 'brightness-90'
                            }`}
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-laeisaz-title/20 transition-opacity duration-300 ${
                            activeImage === index ? 'opacity-0' : 'opacity-50'
                          }`}></div>
                          {/* Loading indicator for thumbnails */}
                          {!preloadedImages.has(index) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200/80">
                              <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid Thumbnails for Tablet and Desktop */}
                  <div className="hidden sm:block">
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 lg:gap-4">
                      {galleryImages.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setActiveImage(index)}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 group ${
                            activeImage === index 
                              ? 'ring-3 ring-laeisaz-title scale-105 shadow-lg z-10' 
                              : 'ring-1 ring-gray-200 opacity-80 hover:opacity-100 hover:shadow-md hover:scale-105'
                          }`}
                        >
                          <Image
                            src={image.image}
                            alt={image.title[language]}
                            fill
                            className={`object-cover transition-all duration-500 ${
                              activeImage === index ? 'brightness-110' : 'brightness-90 group-hover:brightness-105'
                            }`}
                            loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-laeisaz-title/20 transition-opacity duration-300 ${
                            activeImage === index ? 'opacity-0' : 'opacity-40 group-hover:opacity-10'
                        }`}></div>
                          {/* Loading indicator for thumbnails */}
                          {!preloadedImages.has(index) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200/80">
                              <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                          {/* Hover overlay with index */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded">
                              {index + 1}
                            </span>
                          </div>
                      </button>
                    ))}
                    </div>
                  </div>
                  
                  {/* Image Information Card - Mobile Optimized */}
                  <div className="bg-white rounded-xl shadow-lg border border-laeisaz-title/10 p-3 sm:p-5 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-base sm:text-lg font-semibold text-laeisaz-title flex-1">
                      {galleryImages[activeImage].title[language]}
                    </h4>
                      <div className="ml-3 flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">
                          {activeImage + 1}/{galleryImages.length}
                        </span>
                      </div>
                    </div>
                    {galleryImages[activeImage].description && (
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                        {galleryImages[activeImage].description[language]}
                      </p>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-400">
                        {language === 'en' ? 'Use ← → keys or swipe to navigate' : 'از کلیدهای ← → یا کشیدن انگشت استفاده کنید'}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Mobile Dot Indicators */}
                  <div className="flex justify-center gap-2 sm:hidden">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative transition-all duration-300 ${
                          activeImage === index 
                            ? 'w-6 h-2 bg-laeisaz-title rounded-full' 
                            : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-125'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                  </div>
                </AnimateOnScroll>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {language === 'en' ? 'No gallery images available.' : 'تصویری در گالری موجود نیست.'}
            </div>
          )}
        </div>
      </section>



      {/* Industrial Applications */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${language === 'fa' ? '#033666' : '#033666'} 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-laeisaz-title mb-4">
                {translations.applications.title[language]}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Discover how our non-woven solutions serve diverse industrial sectors with innovative applications and superior quality materials.'
                  : 'بیابید که چگونه راه‌حل‌های منسوجات نبافته ما با کاربردهای نوآورانه و مواد با کیفیت برتر، بخش‌های صنعتی متنوع را پوشش می‌دهند.'
                }
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-laeisaz-title/5 rounded-full blur-xl opacity-60" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-laeisaz-title/5 rounded-full blur-xl opacity-60" />
            {translations.applications.items.map((app, index) => {
              // Map industry IDs to their specific routes
              const getIndustryRoute = (id: string) => {
                const routeMap: { [key: string]: string } = {
                  'خودرو': '/industries/automotive',
                  'فیلتراسیون': '/industries/filtration', 
                  'پوشاک': '/industries/clothing',
                  'پزشکی': '/industries/medical',
                  'کالای خواب': '/industries/bed-cloths',
                  'کیف و کفش': '/industries/bag-shoes'
                };
                return routeMap[id] || '/industries';
              };

              return (
                <AnimateOnScroll key={index} animation="scaleIn" delay={0.1 * (index + 1)}>
                  <Link
                    href={getIndustryRoute(app.id)}
                    className="group block rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:shadow-2xl hover:ring-laeisaz-title/30 transition-all duration-500 hover:-translate-y-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-laeisaz-title/50 transform hover:scale-105 relative overflow-hidden"
                  >
                  <div className="flex flex-col items-center text-center relative z-10">
                    {/* Icon Container with Enhanced Styling */}
                    <div className="relative mb-6">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full p-[3px] bg-gradient-to-br from-laeisaz-title/40 via-laeisaz-title/20 to-transparent shadow-lg group-hover:shadow-2xl transition-all duration-500">
                        <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgba(3,54,102,0.12)] group-hover:shadow-[0_20px_40px_rgba(3,54,102,0.15)] transition-all duration-500">
                          <Image
                            src={`/icon/${app.id}.jpg`}
                            alt={app.title[language]}
                            fill
                            className="object-contain p-4 sm:p-5 rounded-full group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                          />
                        </div>
                        {/* Glow effect on hover */}
                        <div className="pointer-events-none absolute -inset-3 rounded-full bg-laeisaz-title/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-laeisaz-title/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse" />
                      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-laeisaz-title/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:animate-bounce" />
                    </div>
                    
                    {/* Title with Enhanced Typography */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-laeisaz-title leading-tight mb-2 group-hover:text-laeisaz-title/80 transition-colors duration-300">
                      {app.title[language]}
                    </h3>
                    
                    {/* Subtle description placeholder */}
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-laeisaz-title/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                    
                    {/* Hover indicator */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <div className="flex items-center gap-2 text-sm text-laeisaz-title/70">
                        <span>{language === 'en' ? 'Learn More' : 'بیشتر بدانید'}</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced hover overlay effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-laeisaz-title/5 via-laeisaz-title/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-laeisaz-title/20 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300" />
                </Link>
              </AnimateOnScroll>
              );
            })}
          </div>
          
          {/* Call to Action for Industries */}
          <AnimateOnScroll animation="slideUp" delay={0.8}>
            <div className="text-center mt-20">
              <div className="relative inline-block">
                <Link
                  href="/industries"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-laeisaz-title to-laeisaz-title/90 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-laeisaz-title/90 hover:to-laeisaz-title transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl relative overflow-hidden"
                >
                  {/* Button background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative z-10">{language === 'en' ? 'Explore All Industries' : 'مشاهده تمام صنایع'}</span>
                  <svg className={`w-6 h-6 transform ${language === 'fa' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'} transition-transform duration-500 relative z-10`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-laeisaz-title/50 via-laeisaz-title/30 to-laeisaz-title/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
              
              <p className="text-gray-600 mt-4 text-sm">
                {language === 'en' 
                  ? 'Find comprehensive solutions for every industry'
                  : 'راه‌حل‌های جامع برای هر صنعت را پیدا کنید'
                }
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-laeisaz-title text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold mb-8">{translations.cta.title[language]}</h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {translations.cta.description[language]}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-300">
            <Link
              href="/contact"
              className="bg-white text-laeisaz-title px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 transform hover:scale-105 hover:-translate-y-1"
            >
              {translations.cta.button[language]}
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Lightbox viewer rendered via portal so it's always viewport-centered */}
      {isClient &&
        isLightboxOpen &&
        galleryImages.length > 0 &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            {/* Click outside to close */}
            <button
              type="button"
              aria-label={language === 'fa' ? 'بستن نمایش تصویر' : 'Close image viewer'}
              className="absolute inset-0 w-full h-full cursor-default"
              onClick={() => setIsLightboxOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 flex items-center justify-center max-w-5xl w-[92%] md:w-[80%] max-h-[82vh]"
            >
              <div className="relative w-full h-full min-h-[55vh] rounded-2xl overflow-hidden">
                {/* Fullscreen image with smooth transition on change */}
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[activeImage].image}
                    alt={galleryImages[activeImage].title[language]}
                    fill
                    className="object-contain bg-black"
                    priority
                  />
                </motion.div>

                {/* Close button inside image */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg transition-colors duration-150"
                  aria-label={language === 'fa' ? 'بستن' : 'Close'}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Next / Previous buttons inside image */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg transition-colors duration-150"
                      aria-label={language === 'fa' ? 'تصویر قبلی' : 'Previous image'}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg transition-colors duration-150"
                      aria-label={language === 'fa' ? 'تصویر بعدی' : 'Next image'}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Title and counter over image bottom */}
                <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold truncate">
                      {galleryImages[activeImage].title[language]}
                    </h4>
                    {galleryImages[activeImage].description && (
                      <p className="mt-1 text-xs sm:text-sm text-white/85 line-clamp-2">
                        {galleryImages[activeImage].description[language]}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs sm:text-sm bg-black/60 px-3 py-1 rounded-full">
                    {activeImage + 1}/{galleryImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  )
} 