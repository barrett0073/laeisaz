'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaSignOutAlt, FaBlog, FaChartLine, FaUsers, FaCog, FaBullhorn, FaImages, FaFileExcel, FaSync, FaQrcode } from 'react-icons/fa'
import { useLanguage } from '../components/ClientLayout'

const AdminDashboard = () => {
  const router = useRouter()
  const { language } = useLanguage()
  const [blogPostCount, setBlogPostCount] = useState(0)
  const [categoryDistribution, setCategoryDistribution] = useState<Record<string, number>>({})
  const [seoImpact, setSeoImpact] = useState(0)
  const [seoMetrics, setSeoMetrics] = useState({ 
    contentScore: 0, 
    postCountScore: 0, 
    baseScore: 0 
  })
  const [visitorCount, setVisitorCount] = useState(0)
  const [visitorGrowth, setVisitorGrowth] = useState(0)
  const [monthlyVisitors, setMonthlyVisitors] = useState<number[]>([])
  const [engagementMetrics, setEngagementMetrics] = useState({
    avgTimeOnPage: 0,
    bounceRate: 0,
    returnRate: 0
  })
  const [dbStatus, setDbStatus] = useState({
    mysql: { connected: false, message: '', responseTime: 0 },
    vercelBlob: { connected: false, message: '', responseTime: 0 },
    overall: 'disconnected'
  })
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  // Authentication check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      fetchDashboardData()
      
      // Set up auto-refresh for analytics data (every 10 seconds)
      const refreshInterval = setInterval(() => {
        fetchDashboardData()
      }, 10000)
      
      // Clean up interval on component unmount
      return () => clearInterval(refreshInterval)
    }
  }, [router])

  const fetchDashboardData = async () => {
    try {
      setIsRefreshing(true)
      
      // Fetch database status first
      const statusResponse = await fetch('/api/status')
      const statusData = await statusResponse.json()
      setDbStatus(statusData)
      
      // Fetch blog posts count and categories
      const blogResponse = await fetch('/api/blog')
      const blogData = await blogResponse.json()
      
      if (Array.isArray(blogData)) {
        setBlogPostCount(blogData.length)
        
        // Calculate category distribution
        const categories = {};
        blogData.forEach(post => {
          const category = post.category || 'uncategorized';
          categories[category] = (categories[category] || 0) + 1;
        });
        setCategoryDistribution(categories);
      }
      
      // Fetch analytics data
      const analyticsResponse = await fetch('/api/analytics')
      const analyticsData = await analyticsResponse.json()
      
      if (analyticsData) {
        // Set SEO data
        setSeoImpact(analyticsData.seo.score || 0)
        setSeoMetrics({
          baseScore: analyticsData.seo.components.technical || 0,
          contentScore: analyticsData.seo.components.content || 0,
          postCountScore: analyticsData.seo.components.authority || 0
        })
        
        // Set visitor data
        setVisitorCount(analyticsData.visitors.total || 0)
        setVisitorGrowth(analyticsData.visitors.growth || 0)
        setMonthlyVisitors(analyticsData.visitors.monthly || [])
        
        // Set engagement metrics
        setEngagementMetrics({
          avgTimeOnPage: analyticsData.engagement.avgTimeOnPage || 0,
          bounceRate: analyticsData.engagement.bounceRate || 0,
          returnRate: analyticsData.engagement.returnRate || 0
        })
      }
      
      setLastRefresh(new Date())
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }
  
  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleLogout = () => {
    // Clear all login data including remember me
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('rememberedUser')
    localStorage.removeItem('rememberMeEnabled')
    router.push('/login')
  }

  const translations = {
    dashboard: {
      en: 'Admin Dashboard',
      fa: 'پنل مدیریت'
    },
    welcome: {
      en: 'Welcome, Admin',
      fa: 'خوش آمدید، ادمین'
    },
    summary: {
      en: 'Dashboard Summary',
      fa: 'خلاصه داشبورد'
    },
    blogPosts: {
      en: 'Blog Posts',
      fa: 'پست‌های بلاگ'
    },
    seoImpact: {
      en: 'SEO Impact',
      fa: 'تأثیر سئو'
    },
    visitors: {
      en: 'Visitors',
      fa: 'بازدیدکنندگان'
    },
    manage: {
      en: 'Manage',
      fa: 'مدیریت'
    },
    logout: {
      en: 'Logout',
      fa: 'خروج'
    },
    loading: {
      en: 'Loading...',
      fa: 'در حال بارگذاری...'
    },
    events: {
      en: 'Events & Announcements',
      fa: 'رویدادها و اطلاعیه‌ها'
    },
    gallery: {
      en: 'Gallery Management',
      fa: 'مدیریت گالری'
    },
    galleryDesc: {
      en: 'Manage gallery images',
      fa: 'مدیریت تصاویر گالری'
    },
    excel: {
      en: 'Excel Analysis',
      fa: 'تحلیل اکسل'
    },
    excelDesc: {
      en: 'Analyze and edit Excel files with AI',
      fa: 'تحلیل و ویرایش فایل‌های اکسل با هوش مصنوعی'
    },
    qrcode: {
      en: 'QR Code Generator',
      fa: 'تولیدکننده QR Code'
    },
    qrcodeDesc: {
      en: 'Generate QR codes for PDFs and URLs',
      fa: 'تولید QR Code برای فایل‌های PDF و لینک‌ها'
    },
    databaseStatus: {
      en: 'Database Status',
      fa: 'وضعیت پایگاه داده'
    },
    mysql: {
      en: 'MySQL',
      fa: 'MySQL'
    },
    vercelBlob: {
      en: 'Vercel Blob',
      fa: 'Vercel Blob'
    },
    connected: {
      en: 'Connected',
      fa: 'متصل'
    },
    disconnected: {
      en: 'Disconnected',
      fa: 'قطع شده'
    },
    responseTime: {
      en: 'ms',
      fa: 'میلی‌ثانیه'
    },
    refreshing: {
      en: 'Refreshing...',
      fa: 'در حال بروزرسانی...'
    },
    lastRefresh: {
      en: 'Last refresh',
      fa: 'آخرین بروزرسانی'
    },
    refresh: {
      en: 'Refresh',
      fa: 'بروزرسانی'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-laeisaz-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-laeisaz-title"></div>
          <p className="mt-4 text-laeisaz-title font-medium">
            {translations.loading[language]}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-laeisaz-title text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`relative h-10 w-10 ${language === 'fa' ? 'ml-4' : 'mr-4'}`}>
                <Image
                  src="/images/logo2.png"
                  alt="Laeisaz Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold">{translations.dashboard[language]}</h1>
            </div>
            
            {/* Database Status Indicators */}
            <div className={`flex items-center ${language === 'fa' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <div className={`hidden sm:flex items-center ${language === 'fa' ? 'space-x-reverse space-x-3' : 'space-x-3'} bg-white bg-opacity-10 px-3 py-2 rounded-lg`}>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{translations.databaseStatus[language]}:</span>
                
                {/* MySQL Status */}
                <div className={`flex items-center ${language === 'fa' ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                  <div 
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${dbStatus.mysql.connected ? 'bg-green-400' : 'bg-red-400'} ${isRefreshing ? 'animate-pulse' : ''}`}
                    title={`${translations.mysql[language]}: ${dbStatus.mysql.connected ? translations.connected[language] : translations.disconnected[language]} - ${dbStatus.mysql.message}`}
                  ></div>
                  <span className="text-xs">{translations.mysql[language]}</span>
                  {dbStatus.mysql.connected && dbStatus.mysql.responseTime > 0 && (
                    <span className="hidden lg:inline text-xs text-gray-200">({dbStatus.mysql.responseTime}ms)</span>
                  )}
                </div>
                
                {/* Vercel Blob Status */}
                <div className={`flex items-center ${language === 'fa' ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                  <div 
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${dbStatus.vercelBlob.connected ? 'bg-green-400' : 'bg-red-400'} ${isRefreshing ? 'animate-pulse' : ''}`}
                    title={`${translations.vercelBlob[language]}: ${dbStatus.vercelBlob.connected ? translations.connected[language] : translations.disconnected[language]} - ${dbStatus.vercelBlob.message}`}
                  ></div>
                  <span className="text-xs">Blob</span>
                  {dbStatus.vercelBlob.connected && dbStatus.vercelBlob.responseTime > 0 && (
                    <span className="hidden lg:inline text-xs text-gray-200">({dbStatus.vercelBlob.responseTime}ms)</span>
                  )}
                </div>

                {/* Refresh Button */}
                <button
                  onClick={fetchDashboardData}
                  disabled={isRefreshing}
                  className={`ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors ${isRefreshing ? 'opacity-50' : ''}`}
                  title={isRefreshing ? translations.refreshing[language] : translations.refresh[language]}
                >
                  <FaSync className={`text-white w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              {/* Mobile Status Indicators - Just dots */}
              <div className="flex sm:hidden items-center space-x-2 bg-white bg-opacity-10 px-2 py-1 rounded">
                <div 
                  className={`w-3 h-3 rounded-full ${dbStatus.mysql.connected ? 'bg-green-400' : 'bg-red-400'}`}
                  title={`MySQL: ${dbStatus.mysql.connected ? translations.connected[language] : translations.disconnected[language]}`}
                ></div>
                <div 
                  className={`w-3 h-3 rounded-full ${dbStatus.vercelBlob.connected ? 'bg-green-400' : 'bg-red-400'}`}
                  title={`Vercel Blob: ${dbStatus.vercelBlob.connected ? translations.connected[language] : translations.disconnected[language]}`}
                ></div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors"
                dir={language === 'fa' ? 'rtl' : 'ltr'}
              >
                {language === 'en' ? <FaSignOutAlt className="mr-2" /> : null}
                <span>{translations.logout[language]}</span>
                {language === 'fa' ? <FaSignOutAlt className="mr-2" /> : null}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8" dir={language === 'fa' ? 'rtl' : 'ltr'}>
          <h2 className={`text-2xl font-semibold text-gray-800 ${language === 'fa' ? 'text-right' : ''}`}>
            {translations.welcome[language]}
          </h2>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Blog Posts Count with Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{translations.blogPosts[language]}</p>
                <h3 className="text-3xl font-bold text-laeisaz-title mt-1">{blogPostCount}</h3>
              </div>
              <div className="bg-laeisaz-title bg-opacity-10 p-3 rounded-full">
                <FaBlog className="h-6 w-6 text-laeisaz-title" />
              </div>
            </div>
            {Object.keys(categoryDistribution).length > 0 && (
              <div className="mt-3 space-y-2">
                {Object.entries(categoryDistribution).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between text-xs">
                    <span className="capitalize text-gray-600">
                      {category === 'technical' ? (language === 'en' ? 'Technical' : 'فنی') : 
                       category === 'industry' ? (language === 'en' ? 'Industry' : 'صنعت') : 
                       category === 'company' ? (language === 'en' ? 'Company' : 'شرکت') : 
                       language === 'en' ? 'Other' : 'سایر'}
                    </span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{count}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-laeisaz-title h-1.5 rounded-full" 
                          style={{ width: `${((count as number) / blogPostCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEO Impact with detailed metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{translations.seoImpact[language]}</p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">{seoImpact}%</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaChartLine className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${seoImpact}%` }}
              ></div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-medium">{seoMetrics.baseScore}%</div>
                <div className="text-gray-500">{language === 'en' ? 'Base' : 'پایه'}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{seoMetrics.contentScore}%</div>
                <div className="text-gray-500">{language === 'en' ? 'Content' : 'محتوا'}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{seoMetrics.postCountScore}%</div>
                <div className="text-gray-500">{language === 'en' ? 'Posts' : 'پست‌ها'}</div>
              </div>
            </div>
          </div>

          {/* Visitors Card with Growth Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{translations.visitors[language]}</p>
                <h3 className="text-3xl font-bold text-blue-600 mt-1">{visitorCount.toLocaleString()}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className={`flex items-center ${visitorGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={visitorGrowth >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                  />
                </svg>
                <span className="text-sm font-medium">{visitorGrowth}%</span>
              </div>
              <span className="text-sm text-gray-500 ml-2">
              {language === 'en' 
                  ? 'compared to previous period' 
                  : 'در مقایسه با دوره قبل'}
              </span>
            </div>
            {monthlyVisitors.length > 0 && (
              <div className="mt-4 h-12">
                <div className="flex items-end justify-between h-full">
                  {monthlyVisitors.map((count, index) => {
                    const max = Math.max(...monthlyVisitors)
                    const height = `${(count / max) * 100}%`
                    return (
                      <div 
                        key={index} 
                        className="bg-blue-200 hover:bg-blue-300 rounded-t w-full mx-0.5"
                        style={{ height }}
                        title={`${count.toLocaleString()} visitors`}
                      ></div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="mt-8">
          <h2 className={`text-lg font-semibold text-gray-700 mb-4 ${language === 'fa' ? 'text-right' : ''}`}>
            {translations.manage[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Management Card */}
            <Link href="/admin/blog" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center" dir={language === 'fa' ? 'rtl' : 'ltr'}>
                <div className="bg-laeisaz-title bg-opacity-10 p-4 rounded-full">
                  <FaBlog className="h-6 w-6 text-laeisaz-title" />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {language === 'en' ? 'Blog Management' : 'مدیریت وبلاگ'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Create and manage blog posts' : 'ایجاد و مدیریت پست‌های وبلاگ'}
                  </p>
                </div>
              </div>
            </Link>
            
            {/* Gallery Management Card */}
            <Link href="/admin/gallery" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center" dir={language === 'fa' ? 'rtl' : 'ltr'}>
                <div className="bg-purple-100 p-4 rounded-full">
                  <FaImages className="h-6 w-6 text-purple-600" />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {translations.gallery[language]}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {translations.galleryDesc[language]}
                  </p>
                </div>
              </div>
            </Link>
            
            {/* Events Management Card */}
            <Link href="/admin/events" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center" dir={language === 'fa' ? 'rtl' : 'ltr'}>
                <div className="bg-yellow-100 p-4 rounded-full">
                  <FaBullhorn className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {translations.events[language]}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Manage site announcements' : 'مدیریت اطلاعیه‌های سایت'}
                  </p>
                </div>
              </div>
            </Link>
            
            {/* Settings Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center" dir={language === 'fa' ? 'rtl' : 'ltr'}>
                <div className="bg-gray-100 p-4 rounded-full">
                  <FaCog className="h-6 w-6 text-gray-600" />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {language === 'en' ? 'Settings' : 'تنظیمات'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Configure site settings' : 'پیکربندی تنظیمات سایت'}
                  </p>
                </div>
              </div>
            </div>

            {/* Excel Analysis Card */}
            <Link href="/admin/excel" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <FaFileExcel className="text-2xl text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">{translations.excel[language]}</h3>
              </div>
              <p className="text-gray-600">{translations.excelDesc[language]}</p>
            </Link>

            {/* QR Code Generator Card */}
            <Link href="/admin/qrcode" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center" dir={language === 'fa' ? 'rtl' : 'ltr'}>
                <div className="bg-indigo-100 p-4 rounded-full">
                  <FaQrcode className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {translations.qrcode[language]}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {translations.qrcodeDesc[language]}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Engagement Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Engagement Metrics' : 'معیارهای مشارکت'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avg Time on Page */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Avg. Time on Page' : 'میانگین زمان در صفحه'}
              </p>
              <h4 className="text-2xl font-bold text-gray-800 mt-1">
                {formatTime(engagementMetrics.avgTimeOnPage)}
              </h4>
            </div>
            
            {/* Bounce Rate */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Bounce Rate' : 'نرخ پرش'}
              </p>
              <h4 className="text-2xl font-bold text-gray-800 mt-1">
                {engagementMetrics.bounceRate.toFixed(1)}%
              </h4>
            </div>
            
            {/* Return Rate */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Return Rate' : 'نرخ بازگشت'}
              </p>
              <h4 className="text-2xl font-bold text-gray-800 mt-1">
                {engagementMetrics.returnRate.toFixed(1)}%
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard 