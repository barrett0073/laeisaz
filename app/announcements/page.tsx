'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../components/ClientLayout'
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa'

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
  icon?: string;
  priority: number;
  image?: string;
  clickCount?: number;
  createdAt: string;
}

export default function AnnouncementsPage() {
  const { language } = useLanguage()
  const [announcements, setAnnouncements] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>('active')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        
        // Sort by priority and creation date
        data.sort((a: Event, b: Event) => {
          if (b.priority !== a.priority) {
            return b.priority - a.priority
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        
        setAnnouncements(data)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  // Get filtered announcements
  const getFilteredAnnouncements = () => {
    const now = new Date()
    
    return announcements.filter(announcement => {
      // Filter by status
      const startDate = new Date(announcement.startDate)
      const endDate = new Date(announcement.endDate)
      
      let statusMatch = true
      if (activeFilter === 'active') {
        statusMatch = announcement.isActive && startDate <= now && endDate >= now
      } else if (activeFilter === 'scheduled') {
        statusMatch = announcement.isActive && startDate > now
      } else if (activeFilter === 'expired') {
        statusMatch = endDate < now
      } else if (activeFilter === 'inactive') {
        statusMatch = !announcement.isActive
      }
      
      // Filter by type
      const typeMatch = typeFilter === 'all' || announcement.type === typeFilter
      
      return statusMatch && typeMatch
    })
  }

  // Track announcement click
  const handleAnnouncementClick = async (eventId: string) => {
    try {
      await fetch('/api/events/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      })
    } catch (error) {
      console.error('Error logging announcement click:', error)
    }
  }

  // Get icon for announcement type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />
      case 'success':
        return <FaCheckCircle className="text-green-500" />
      case 'error':
        return <FaTimesCircle className="text-red-500" />
      case 'info':
      default:
        return <FaInfoCircle className="text-blue-500" />
    }
  }

  // Get background color for announcement card
  const getEventBackgroundColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(
      language === 'en' ? 'en-US' : 'fa-IR', 
      { year: 'numeric', month: 'short', day: 'numeric' }
    )
  }

  // Check if announcement is active
  const isAnnouncementActive = (announcement: Event) => {
    const now = new Date()
    const startDate = new Date(announcement.startDate)
    const endDate = new Date(announcement.endDate)
    return announcement.isActive && startDate <= now && endDate >= now
  }

  const translations = {
    title: {
      en: 'Announcements',
      fa: 'اطلاعیه‌ها'
    },
    subtitle: {
      en: 'Stay updated with the latest announcements from Laeisaz',
      fa: 'از آخرین اطلاعیه‌های لائیساز مطلع شوید'
    },
    filters: {
      status: {
        en: 'Status',
        fa: 'وضعیت'
      },
      type: {
        en: 'Type',
        fa: 'نوع'
      },
      all: {
        en: 'All',
        fa: 'همه'
      },
      active: {
        en: 'Active',
        fa: 'فعال'
      },
      scheduled: {
        en: 'Scheduled',
        fa: 'برنامه‌ریزی شده'
      },
      expired: {
        en: 'Expired',
        fa: 'منقضی شده'
      },
      inactive: {
        en: 'Inactive',
        fa: 'غیرفعال'
      },
      info: {
        en: 'Information',
        fa: 'اطلاعات'
      },
      warning: {
        en: 'Warning',
        fa: 'هشدار'
      },
      success: {
        en: 'Success',
        fa: 'موفقیت'
      },
      error: {
        en: 'Error',
        fa: 'خطا'
      }
    },
    noAnnouncements: {
      en: 'No announcements found',
      fa: 'هیچ اطلاعیه‌ای یافت نشد'
    },
    readMore: {
      en: 'Read More',
      fa: 'بیشتر بخوانید'
    },
    validUntil: {
      en: 'Valid until',
      fa: 'معتبر تا'
    }
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {translations.title[language]}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {translations.subtitle[language]}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {translations.filters.status[language]}:
          </label>
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="all">{translations.filters.all[language]}</option>
            <option value="active">{translations.filters.active[language]}</option>
            <option value="scheduled">{translations.filters.scheduled[language]}</option>
            <option value="expired">{translations.filters.expired[language]}</option>
            <option value="inactive">{translations.filters.inactive[language]}</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {translations.filters.type[language]}:
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="all">{translations.filters.all[language]}</option>
            <option value="info">{translations.filters.info[language]}</option>
            <option value="warning">{translations.filters.warning[language]}</option>
            <option value="success">{translations.filters.success[language]}</option>
            <option value="error">{translations.filters.error[language]}</option>
          </select>
        </div>
      </div>

      {/* Announcements Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : getFilteredAnnouncements().length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            {translations.noAnnouncements[language]}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredAnnouncements().map((announcement) => (
            <motion.div
              key={announcement._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg border p-6 shadow-sm ${getEventBackgroundColor(announcement.type)}`}
            >
              <div className="flex items-start space-x-4">
                {announcement.image ? (
                  <div className="flex-shrink-0">
                    <Image
                      src={announcement.image}
                      alt=""
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center bg-white">
                    <span className="text-2xl">{getEventIcon(announcement.type)}</span>
                  </div>
                )}
                
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {announcement.title[language]}
                    {isAnnouncementActive(announcement) && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                        {translations.filters.active[language]}
                      </span>
                    )}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {announcement.message[language]}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      <span>
                        {translations.validUntil[language]}: {formatDate(announcement.endDate)}
                      </span>
                    </div>
                    
                    {announcement.link && (
                      <Link
                        href={announcement.link}
                        className="text-sm flex items-center text-blue-600 hover:text-blue-800"
                        onClick={() => handleAnnouncementClick(announcement._id)}
                      >
                        <span className="mr-1">{translations.readMore[language]}</span>
                        <FaExternalLinkAlt size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
} 