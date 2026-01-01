'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useLanguage } from './ClientLayout'
import { FaBell, FaAngleRight, FaUser, FaSpinner, FaChevronDown } from 'react-icons/fa'

interface Event {
  _id: string;
  title: {
    en: string;
    fa: string;
  };
  message: {
    en: string;
    fa: string;
  };
  type: 'info' | 'warning' | 'success' | 'error';
  startDate: string;
  endDate: string;
  isActive: boolean;
  link?: string;
  image?: string;
  priority: number;
  createdAt: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showIndustriesMenu, setShowIndustriesMenu] = useState(false)
  const [showAnnouncementsMenu, setShowAnnouncementsMenu] = useState(false)
  const [activeAnnouncements, setActiveAnnouncements] = useState<Event[]>([])
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnnouncementsLoading, setIsAnnouncementsLoading] = useState(false)
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Set<string>>(new Set())
  const { language, setLanguage } = useLanguage()

  // Navbar entrance animation variants
  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  // Menu items staggered animation
  const menuContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  // Button animation variants
  const buttonVariants: Variants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  // Mobile menu variants
  const mobileMenuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300) // Reduced from 800 to 300ms

    return () => clearTimeout(timer)
  }, [])

  // Fetch active announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsAnnouncementsLoading(true)
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        
        // Filter to only show active events that are within date range
        const now = new Date()
        const active = data.filter((event: Event) => {
          const startDate = new Date(event.startDate)
          const endDate = new Date(event.endDate)
          return event.isActive && startDate <= now && endDate >= now
        })
        
        // Sort by priority (highest first)
        active.sort((a: Event, b: Event) => b.priority - a.priority)
        
        // Take only top 3 announcements for the dropdown
        setActiveAnnouncements(active.slice(0, 3))
        
        // Check if there are announcements the user hasn't seen yet
        const lastSeen = localStorage.getItem('lastSeenAnnouncementTime')
        const latestAnnouncementTime = active.length > 0 ? new Date(active[0].createdAt).getTime() : 0
        
        if (!lastSeen || parseInt(lastSeen) < latestAnnouncementTime) {
          setHasNewAnnouncements(active.length > 0)
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setIsAnnouncementsLoading(false)
      }
    }

    fetchAnnouncements()
    
    // Refresh announcements every 5 minutes
    const interval = setInterval(fetchAnnouncements, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Mark announcements as seen when dropdown is opened
  const handleAnnouncementClick = () => {
    setShowAnnouncementsMenu(!showAnnouncementsMenu)
    
    if (!showAnnouncementsMenu && hasNewAnnouncements) {
      setHasNewAnnouncements(false)
      localStorage.setItem('lastSeenAnnouncementTime', Date.now().toString())
    }
  }

  // Toggle mobile submenu expansion
  const toggleMobileSubmenu = (menuName: string) => {
    const newExpanded = new Set(expandedMobileMenus)
    if (newExpanded.has(menuName)) {
      newExpanded.delete(menuName)
    } else {
      newExpanded.add(menuName)
    }
    setExpandedMobileMenus(newExpanded)
  }

  const menuItems = [
    { 
      name: { en: 'Home', fa: 'خانه' }, 
      path: '/' 
    },
    {
      name: { en: 'Products', fa: 'محصولات' },
      path: '/products',
      submenu: [
        { name: { en: 'Needle Punched Felt', fa: 'لایی سوزنی' }, path: '/products/needle-punched-felt' },
        { name: { en: 'Thermobonding', fa: 'ترموباندینگ' }, path: '/products/thermobonding' },
        { name: { en: 'Interlining', fa: 'لایی چسب' }, path: '/products/interlining' },
        { name: { en: 'Thermo Fuse', fa: 'لایی ترموفیوز' }, path: '/products/thermo-fuse' },
        { name: { en: 'Coating', fa: 'لایی کوتینگ' }, path: '/products/coating' },
        { name: { en: 'Laminated', fa: 'لایی لمینت' }, path: '/products/laminated' },
        { name: { en: 'Synthetic', fa: 'لایی سنتتیک' }, path: '/products/synthetic' },
      ]
    },
    {
      name: { en: 'Industries', fa: 'صنایع' },
      path: '/industries',
      submenu: [
        { name: { en: 'Medical', fa: 'پزشکی' }, path: '/industries/medical' },
        { name: { en: 'Filtration', fa: 'فیلتراسیون' }, path: '/industries/filtration' },
        { name: { en: 'Clothing', fa: 'پوشاک' }, path: '/industries/clothing' },
        { name: { en: 'Bed and Cloths', fa: 'رختخواب و پارچه' }, path: '/industries/bed-cloths' },
        { name: { en: 'Bag and Shoes', fa: 'کیف و کفش' }, path: '/industries/bag-shoes' },
      ]
    },
    { 
      name: { en: 'Technical Info', fa: 'اطلاعات فنی' }, 
      path: '/technical-info' 
    },
    { 
      name: { en: 'Blog', fa: 'بلاگ' }, 
      path: '/blog' 
    },
    { 
      name: { en: 'About', fa: 'درباره ما' }, 
      path: '/about' 
    },
    { 
      name: { en: 'Contact', fa: 'تماس با ما' }, 
      path: '/contact' 
    },
  ]

  // Loading skeleton for announcements
  const AnnouncementSkeleton = () => (
    <div className="px-4 py-3 animate-pulse">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="relative w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 mr-3 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              ))}
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav 
      className="bg-white shadow-lg relative z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center font-iran-sans">
              <div className="relative w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 mr-3">
                <Image
                  src={language === 'fa' ? "/images/logo-farsi.png" : "/images/logo.png"}
                  alt="LaeiSaz Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <motion.div 
            className="hidden md:flex items-center font-iran-sans"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                className="relative"
                variants={menuItemVariants}
                onMouseEnter={() => {
                  if (item.name.en === 'Products') setShowProductsMenu(true)
                  if (item.name.en === 'Industries') setShowIndustriesMenu(true)
                }}
                onMouseLeave={() => {
                  if (item.name.en === 'Products') setShowProductsMenu(false)
                  if (item.name.en === 'Industries') setShowIndustriesMenu(false)
                }}
              >
                <motion.div
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href={item.path}
                    className="ml-8 text-laeisaz-text hover:text-laeisaz-title px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.name[language]}
                  </Link>
                </motion.div>

                {/* Dropdown Menus */}
                {item.submenu && (
                  <AnimatePresence>
                    {((item.name.en === 'Products' && showProductsMenu) ||
                      (item.name.en === 'Industries' && showIndustriesMenu)) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-8 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.div
                            key={subItem.path}
                            initial={{ 
                              opacity: 0, 
                              x: -50,
                              y: 20
                            }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              y: 0
                            }}
                            transition={{ 
                              duration: 0.4, 
                              delay: subIndex * 0.15,
                              type: "spring",
                              stiffness: 200,
                              damping: 20
                            }}
                          >
                            <Link
                              href={subItem.path}
                              className="block px-4 py-2 text-sm text-laeisaz-text hover:text-laeisaz-title hover:bg-gray-50 transition-colors duration-150"
                            >
                              {subItem.name[language]}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
            
            {/* Announcements Icon */}
            <motion.div 
              className="relative ml-4"
              variants={menuItemVariants}
            >
              <motion.button
                onClick={handleAnnouncementClick}
                className="relative p-2 text-laeisaz-text hover:text-laeisaz-title focus:outline-none"
                aria-label="Toggle announcements"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                {isAnnouncementsLoading ? (
                  <FaSpinner className="h-5 w-5 animate-spin" />
                ) : (
                  <FaBell className="h-5 w-5" />
                )}
                {hasNewAnnouncements && !isAnnouncementsLoading && (
                  <motion.span 
                    className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
              
              {/* Announcements Dropdown */}
              <AnimatePresence>
                {showAnnouncementsMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50 ${language === 'en' ? 'right-0' : 'left-0'} max-h-[80vh] overflow-y-auto border border-gray-100`}
                    onMouseLeave={() => setShowAnnouncementsMenu(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Announcements' : 'اطلاعیه‌ها'}
                      </h3>
                    </div>
                    
                    {isAnnouncementsLoading ? (
                      <>
                        <AnnouncementSkeleton />
                        <AnnouncementSkeleton />
                        <AnnouncementSkeleton />
                      </>
                    ) : activeAnnouncements.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        {language === 'en' ? 'No active announcements' : 'اطلاعیه فعالی وجود ندارد'}
                      </div>
                    ) : (
                      <>
                        {activeAnnouncements.map((announcement, index) => (
                          <motion.div
                            key={announcement._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              href={announcement.link || '#'}
                              className={`block px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
                                index < activeAnnouncements.length - 1 ? 'border-b border-gray-100' : ''
                              }`}
                              onClick={() => setShowAnnouncementsMenu(false)}
                            >
                              <div className={`flex items-start ${language === 'fa' ? 'flex-row-reverse text-right' : ''}`}>
                                {announcement.image ? (
                                  <div className={`flex-shrink-0 ${language === 'en' ? 'mr-3' : 'ml-3'}`}>
                                    <Image
                                      src={announcement.image}
                                      alt=""
                                      width={40}
                                      height={40}
                                      className="rounded-full"
                                    />
                                  </div>
                                ) : (
                                  <div className={`flex-shrink-0 ${language === 'en' ? 'mr-3' : 'ml-3'} h-10 w-10 rounded-full flex items-center justify-center ${
                                    announcement.type === 'info' ? 'bg-blue-100 text-blue-500' :
                                    announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                                    announcement.type === 'success' ? 'bg-green-100 text-green-500' :
                                    'bg-red-100 text-red-500'
                                  }`}>
                                    <FaBell className="h-5 w-5" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {announcement.title[language]}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {announcement.message[language]}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                        
                        <div className="px-4 py-2 border-t border-gray-100">
                          <Link
                            href="/announcements"
                            className="flex items-center justify-center text-sm text-laeisaz-title hover:text-laeisaz-title-dark transition-colors duration-150"
                            onClick={() => setShowAnnouncementsMenu(false)}
                          >
                            <span>
                              {language === 'en' ? 'View all announcements' : 'مشاهده همه اطلاعیه‌ها'}
                            </span>
                            {language === 'en' ? <FaAngleRight className="ml-1" /> : <FaAngleRight className="mr-1 rotate-180" />}
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Login Icon */}
            <motion.div 
              className="relative ml-4"
              variants={menuItemVariants}
            >
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/login"
                  className="relative p-2 text-laeisaz-text hover:text-laeisaz-title focus:outline-none transition-colors duration-200"
                  aria-label="Login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaUser className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Language Switcher */}
            <motion.div 
              className="ml-4"
              variants={menuItemVariants}
            >
              <motion.button
                onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
                className="px-4 py-2 rounded-md text-white bg-[#033666] hover:bg-[#033666]/90 transition-all duration-200"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                {language === 'en' ? 'فارسی' : 'English'}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Mobile menu button and controls */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Announcements Icon (Mobile) */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={handleAnnouncementClick}
                className="relative p-3 text-laeisaz-text hover:text-laeisaz-title focus:outline-none rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle announcements"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                {isAnnouncementsLoading ? (
                  <FaSpinner className="h-5 w-5 animate-spin" />
                ) : (
                  <FaBell className="h-5 w-5" />
                )}
                {hasNewAnnouncements && !isAnnouncementsLoading && (
                  <motion.span 
                    className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </motion.div>
            
            {/* Login Icon (Mobile) */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/login"
                  className="relative p-3 text-laeisaz-text hover:text-laeisaz-title focus:outline-none rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaUser className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Language Switcher (Mobile) */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
                className="flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-white bg-[#033666] hover:bg-[#033666]/90 transition-colors duration-200"
                aria-label="Switch language"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                {language === 'en' ? 'فارسی' : 'English'}
              </motion.button>
            </motion.div>
            
            {/* Mobile Menu Toggle Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-laeisaz-text hover:text-laeisaz-title hover:bg-gray-100 transition-colors duration-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {!isOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <motion.div 
              className="px-4 py-4 space-y-2"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {menuItems.map((item, index) => (
                <motion.div 
                  key={item.path}
                  variants={menuItemVariants}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {item.submenu ? (
                    <div>
                      {/* Main menu row: label navigates, chevron toggles submenu */}
                      <div className={`w-full flex items-center justify-between px-4 py-4 rounded-lg transition-all duration-200 hover:bg-gray-50 ${language === 'fa' ? 'flex-row-reverse' : ''}`}>
                        <Link
                          href={item.path}
                          className={`flex-1 text-base font-medium text-laeisaz-text hover:text-laeisaz-title ${language === 'fa' ? 'text-right' : 'text-left'}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name[language]}
                        </Link>
                        <button
                          onClick={() => toggleMobileSubmenu(item.name.en)}
                          aria-label={`Toggle ${item.name.en} submenu`}
                          aria-expanded={expandedMobileMenus.has(item.name.en)}
                          className="p-2 rounded-md text-laeisaz-text hover:text-laeisaz-title hover:bg-gray-100 transition-colors duration-200"
                        >
                          <motion.div
                            animate={{ rotate: expandedMobileMenus.has(item.name.en) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaChevronDown className="h-4 w-4 text-gray-400" />
                          </motion.div>
                        </button>
                      </div>

                      {/* Submenu items */}
                      <AnimatePresence>
                        {expandedMobileMenus.has(item.name.en) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`space-y-1 bg-gray-50 rounded-lg mx-4 mb-2 ${language === 'fa' ? 'pr-6' : 'pl-6'}`}
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.path}
                                initial={{ opacity: 0, x: language === 'fa' ? 10 : -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  href={subItem.path}
                                  className={`block px-4 py-3 text-sm font-medium text-laeisaz-text hover:text-laeisaz-title hover:bg-gray-100 rounded-lg transition-colors duration-200 ${language === 'fa' ? 'text-right' : 'text-left'}`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name[language]}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`block px-4 py-4 text-base font-medium text-laeisaz-text hover:text-laeisaz-title hover:bg-gray-50 rounded-lg transition-colors duration-200 ${language === 'fa' ? 'text-right' : 'text-left'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name[language]}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Announcements Dropdown */}
      <AnimatePresence>
        {showAnnouncementsMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 bg-white shadow-lg z-50 md:hidden max-h-[70vh] overflow-y-auto border-t border-gray-100"
          >
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h3 className="text-base font-medium text-gray-700">
                {language === 'en' ? 'Announcements' : 'اطلاعیه‌ها'}
              </h3>
            </div>
            
            {isAnnouncementsLoading ? (
              <>
                <AnnouncementSkeleton />
                <AnnouncementSkeleton />
                <AnnouncementSkeleton />
              </>
            ) : activeAnnouncements.length === 0 ? (
              <div className="px-4 py-6 text-sm text-gray-500 text-center">
                {language === 'en' ? 'No active announcements' : 'اطلاعیه فعالی وجود ندارد'}
              </div>
            ) : (
              <>
                {activeAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={announcement.link || '#'}
                      className={`block px-4 py-4 hover:bg-gray-50 transition-colors duration-150 ${
                        index < activeAnnouncements.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                      onClick={() => setShowAnnouncementsMenu(false)}
                    >
                      <div className={`flex items-start ${language === 'fa' ? 'flex-row-reverse text-right' : ''}`}>
                        {announcement.image ? (
                          <div className={`flex-shrink-0 ${language === 'en' ? 'mr-3' : 'ml-3'}`}>
                            <Image
                              src={announcement.image}
                              alt=""
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                        ) : (
                          <div className={`flex-shrink-0 ${language === 'en' ? 'mr-3' : 'ml-3'} h-10 w-10 rounded-full flex items-center justify-center ${
                            announcement.type === 'info' ? 'bg-blue-100 text-blue-500' :
                            announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                            announcement.type === 'success' ? 'bg-green-100 text-green-500' :
                            'bg-red-100 text-red-500'
                          }`}>
                            <FaBell className="h-5 w-5" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {announcement.title[language]}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {announcement.message[language]}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <Link
                    href="/announcements"
                    className="flex items-center justify-center text-sm text-laeisaz-title hover:text-laeisaz-title-dark transition-colors duration-150 font-medium"
                    onClick={() => setShowAnnouncementsMenu(false)}
                  >
                    <span>
                      {language === 'en' ? 'View all announcements' : 'مشاهده همه اطلاعیه‌ها'}
                    </span>
                    {language === 'en' ? <FaAngleRight className="ml-2" /> : <FaAngleRight className="mr-2 rotate-180" />}
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar