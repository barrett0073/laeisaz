'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSort } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'
import { useNotification } from '../../contexts/NotificationContext'
import Link from 'next/link'

interface Event {
  id?: string;
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
}

const AdminEvents = () => {
  const router = useRouter()
  const { language } = useLanguage()
  const { showNotification } = useNotification()
  
  // State management
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event>({
    title: { en: '', fa: '' },
    message: { en: '', fa: '' },
    type: 'info',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    priority: 1,
    link: '',
    icon: ''
  })
  const [imagePreview, setImagePreview] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterActive, setFilterActive] = useState<boolean | null>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [sortBy, setSortBy] = useState('priority')
  const [sortOrder, setSortOrder] = useState('desc')

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      fetchEvents()
    }
  }, [router])

  // Translations
  const translations = {
    title: {
      en: 'Events & Announcements',
      fa: 'رویدادها و اطلاعیه‌ها'
    },
    form: {
      title: {
        en: 'Title',
        fa: 'عنوان'
      },
      message: {
        en: 'Message',
        fa: 'پیام'
      },
      type: {
        en: 'Type',
        fa: 'نوع'
      },
      startDate: {
        en: 'Start Date',
        fa: 'تاریخ شروع'
      },
      endDate: {
        en: 'End Date',
        fa: 'تاریخ پایان'
      },
      active: {
        en: 'Active',
        fa: 'فعال'
      },
      link: {
        en: 'Link (Optional)',
        fa: 'لینک (اختیاری)'
      },
      icon: {
        en: 'Icon (Optional)',
        fa: 'آیکون (اختیاری)'
      },
      priority: {
        en: 'Priority (1-10)',
        fa: 'اولویت (1-10)'
      },
      image: {
        en: 'Image (Optional)',
        fa: 'تصویر (اختیاری)'
      },
      save: {
        en: 'Save Event',
        fa: 'ذخیره رویداد'
      },
      update: {
        en: 'Update Event',
        fa: 'بروزرسانی رویداد'
      },
      cancel: {
        en: 'Cancel',
        fa: 'لغو'
      }
    },
    list: {
      noEvents: {
        en: 'No events found',
        fa: 'هیچ رویدادی یافت نشد'
      },
      search: {
        en: 'Search events...',
        fa: 'جستجوی رویدادها...'
      },
      add: {
        en: 'Add New Event',
        fa: 'افزودن رویداد جدید'
      },
      edit: {
        en: 'Edit',
        fa: 'ویرایش'
      },
      delete: {
        en: 'Delete',
        fa: 'حذف'
      },
      confirmDelete: {
        en: 'Are you sure you want to delete this event?',
        fa: 'آیا از حذف این رویداد اطمینان دارید؟'
      },
      yes: {
        en: 'Yes, Delete',
        fa: 'بله، حذف کن'
      },
      no: {
        en: 'Cancel',
        fa: 'لغو'
      },
      clickCount: {
        en: 'Clicks',
        fa: 'کلیک‌ها'
      }
    },
    filters: {
      all: {
        en: 'All Types',
        fa: 'همه انواع'
      },
      info: {
        en: 'Info',
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
      },
      active: {
        en: 'Active',
        fa: 'فعال'
      },
      inactive: {
        en: 'Inactive',
        fa: 'غیرفعال'
      },
      allStatus: {
        en: 'All Status',
        fa: 'همه وضعیت‌ها'
      }
    }
  }

  // Fetch all events
  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setEvents(data)
      } else {
        console.error('Expected an array of events, but got:', data)
        setEvents([])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([])
      showNotification(
        language === 'en' ? 'Failed to load events' : 'بارگیری رویدادها ناموفق بود',
        'error'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: keyof Event,
    langKey?: 'en' | 'fa'
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value

    if (langKey) {
      // For multilingual fields
      setCurrentEvent(prev => ({
        ...prev,
        [field]: {
          ...(prev[field] as Record<string, string>),
          [langKey]: value
        }
      }))
    } else {
      // For regular fields
      setCurrentEvent(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setImagePreview(imageData)
        setCurrentEvent(prev => ({ ...prev, image: imageData }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Reset form
  const resetForm = () => {
    setCurrentEvent({
      title: { en: '', fa: '' },
      message: { en: '', fa: '' },
      type: 'info',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true,
      priority: 1,
      link: '',
      icon: ''
    })
    setImagePreview('')
    setIsEditing(false)
  }

  // Edit event
  const editEvent = (event: Event) => {
    setCurrentEvent({
      ...event,
      startDate: new Date(event.startDate).toISOString().split('T')[0],
      endDate: new Date(event.endDate).toISOString().split('T')[0]
    })
    setImagePreview(event.image || '')
    setIsEditing(true)
    setShowForm(true)
  }

  // Save or update event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate form
      if (!currentEvent.title.en || !currentEvent.title.fa || 
          !currentEvent.message.en || !currentEvent.message.fa ||
          !currentEvent.startDate || !currentEvent.endDate) {
        showNotification(
          language === 'en' ? 'Please fill in all required fields' : 'لطفا همه فیلدهای ضروری را پر کنید',
          'error'
        )
        return
      }

      // Validate dates
      const startDate = new Date(currentEvent.startDate)
      const endDate = new Date(currentEvent.endDate)
      if (endDate < startDate) {
        showNotification(
          language === 'en' ? 'End date must be after start date' : 'تاریخ پایان باید بعد از تاریخ شروع باشد',
          'error'
        )
        return
      }
      
      const url = isEditing ? `/api/events/${currentEvent.id}` : '/api/events'
      const method = isEditing ? 'PUT' : 'POST'
      
      console.log('Submitting event data:', currentEvent) // Debug log
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentEvent)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Update UI
        await fetchEvents() // Wait for events to be fetched
        resetForm()
        
        showNotification(
          language === 'en' 
            ? `Event ${isEditing ? 'updated' : 'created'} successfully` 
            : `رویداد با موفقیت ${isEditing ? 'به‌روزرسانی' : 'ایجاد'} شد`,
          'success'
        )
      } else {
        throw new Error(data.error || 'Failed to save event')
      }
    } catch (error) {
      console.error('Error saving event:', error)
      showNotification(
        language === 'en' 
          ? `Failed to save event: ${error.message}` 
          : `ذخیره رویداد ناموفق بود: ${error.message}`,
        'error'
      )
    }
  }

  // Delete event confirmation
  const confirmDelete = async () => {
    if (!eventToDelete) return
    
    try {
      const response = await fetch(`/api/events/${eventToDelete}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setEvents(prev => prev.filter(event => event.id !== eventToDelete))
        showNotification(
          language === 'en' ? 'Event deleted successfully' : 'رویداد با موفقیت حذف شد',
          'success'
        )
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete event')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      showNotification(
        language === 'en' ? error.message || 'Failed to delete event' : 'حذف رویداد ناموفق بود',
        'error'
      )
    } finally {
      setShowDeleteConfirm(false)
      setEventToDelete(null)
    }
  }

  // Request delete confirmation
  const handleDelete = (id: string) => {
    setEventToDelete(id)
    setShowDeleteConfirm(true)
  }

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setEventToDelete(null)
  }

  // Filter events
  const getFilteredEvents = () => {
    return events.filter(event => {
      // Text search
      const searchMatches = 
        searchQuery === '' ||
        event.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.title.fa.includes(searchQuery) ||
        event.message.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.message.fa.includes(searchQuery)
      
      // Active status filter  
      const activeMatches = 
        filterActive === null || 
        event.isActive === filterActive
      
      // Type filter
      const typeMatches = 
        filterType === 'all' || 
        event.type === filterType
      
      return searchMatches && activeMatches && typeMatches
    })
  }

  // Sort events
  const getSortedEvents = () => {
    const filteredEvents = getFilteredEvents()
    
    return [...filteredEvents].sort((a, b) => {
      if (sortBy === 'priority') {
        return sortOrder === 'asc' ? a.priority - b.priority : b.priority - a.priority
      } else if (sortBy === 'startDate') {
        return sortOrder === 'asc' 
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      } else if (sortBy === 'endDate') {
        return sortOrder === 'asc'
          ? new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          : new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      } else if (sortBy === 'clickCount') {
        const aClicks = a.clickCount || 0
        const bClicks = b.clickCount || 0
        return sortOrder === 'asc' ? aClicks - bClicks : bClicks - aClicks
      }
      return 0
    })
  }

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  // Get event status display
  const getEventStatus = (event: Event) => {
    const now = new Date()
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)
    
    if (!event.isActive) {
      return { 
        status: language === 'en' ? 'Inactive' : 'غیرفعال', 
        color: 'bg-gray-100 text-gray-800' 
      }
    } else if (now < startDate) {
      return { 
        status: language === 'en' ? 'Scheduled' : 'برنامه‌ریزی شده', 
        color: 'bg-purple-100 text-purple-800' 
      }
    } else if (now >= startDate && now <= endDate) {
      return { 
        status: language === 'en' ? 'Active' : 'فعال', 
        color: 'bg-green-100 text-green-800' 
      }
    } else {
      return { 
        status: language === 'en' ? 'Expired' : 'منقضی شده', 
        color: 'bg-red-100 text-red-800' 
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-laeisaz-title">
          {translations.title[language]}
        </h1>
          <Link 
            href="/admin" 
            className={`flex items-center ${language === 'fa' ? 'flex-row-reverse' : 'flex-row'} gap-2 bg-laeisaz-title text-white px-4 py-2 rounded-lg hover:bg-laeisaz-title/90 transition-colors`}
          >
            <span>{language === 'en' ? 'Back to Dashboard' : 'بازگشت به داشبورد'}</span>
          </Link>
        </div>

        {/* Events content will go here */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={translations.list.search[language]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                >
                  <option value="all">{translations.filters.all[language]}</option>
                  <option value="info">{translations.filters.info[language]}</option>
                  <option value="warning">{translations.filters.warning[language]}</option>
                  <option value="success">{translations.filters.success[language]}</option>
                  <option value="error">{translations.filters.error[language]}</option>
                </select>

                <select
                  value={filterActive === null ? 'all' : filterActive ? 'active' : 'inactive'}
                  onChange={(e) => {
                  const value = e.target.value
                  setFilterActive(value === 'all' ? null : value === 'active')
                  }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                >
                  <option value="all">{translations.filters.allStatus[language]}</option>
                  <option value="active">{translations.filters.active[language]}</option>
                  <option value="inactive">{translations.filters.inactive[language]}</option>
                </select>
            </div>

            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-laeisaz-title text-white rounded-lg hover:bg-laeisaz-title/90 transition-colors"
            >
              <FaPlus />
              <span>{translations.list.add[language]}</span>
            </button>
        </div>

          {/* Events Form */}
        {showForm && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                  {isEditing ? translations.form.update[language] : translations.form.save[language]}
                </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.title.en}
                    </label>
                    <input
                      type="text"
                      value={currentEvent.title.en}
                      onChange={(e) => handleInputChange(e, 'title', 'en')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.title.fa}
                    </label>
                    <input
                      type="text"
                      value={currentEvent.title.fa}
                      onChange={(e) => handleInputChange(e, 'title', 'fa')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.message.en}
                    </label>
                    <textarea
                      value={currentEvent.message.en}
                      onChange={(e) => handleInputChange(e, 'message', 'en')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.message.fa}
                    </label>
                    <textarea
                      value={currentEvent.message.fa}
                      onChange={(e) => handleInputChange(e, 'message', 'fa')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      rows={3}
                      required
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.type[language]}
                    </label>
                    <select
                      value={currentEvent.type}
                      onChange={(e) => handleInputChange(e, 'type')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    >
                      <option value="info">{translations.filters.info[language]}</option>
                      <option value="warning">{translations.filters.warning[language]}</option>
                      <option value="success">{translations.filters.success[language]}</option>
                      <option value="error">{translations.filters.error[language]}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.startDate[language]}
                    </label>
                    <input
                      type="date"
                      value={currentEvent.startDate}
                      onChange={(e) => handleInputChange(e, 'startDate')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.endDate[language]}
                    </label>
                    <input
                      type="date"
                      value={currentEvent.endDate}
                      onChange={(e) => handleInputChange(e, 'endDate')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.link[language]}
                    </label>
                    <input
                      type="url"
                      value={currentEvent.link}
                      onChange={(e) => handleInputChange(e, 'link')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.priority[language]}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={currentEvent.priority}
                      onChange={(e) => handleInputChange(e, 'priority')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations.form.icon[language]}
                    </label>
                    <input
                      type="text"
                      value={currentEvent.icon}
                      onChange={(e) => handleInputChange(e, 'icon')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    />
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations.form.image[language]}
                  </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-20 w-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={currentEvent.isActive}
                    onChange={(e) => handleInputChange(e, 'isActive')}
                    className="h-4 w-4 text-laeisaz-title focus:ring-laeisaz-title border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    {translations.form.active[language]}
                  </label>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm()
                      setShowForm(false)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {translations.form.cancel[language]}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-laeisaz-title text-white rounded-lg hover:bg-laeisaz-title/90"
                  >
                    {isEditing ? translations.form.update[language] : translations.form.save[language]}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Events List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-laeisaz-title mx-auto"></div>
          </div>
            ) : getSortedEvents().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {translations.list.noEvents[language]}
              </div>
            ) : (
              getSortedEvents().map((event) => {
                const status = getEventStatus(event)
                return (
                  <div
                    key={event.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-medium">
                            {event.title[language]}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
                            {status.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          {event.message[language]}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>
                            {translations.form.startDate[language]}: {new Date(event.startDate).toLocaleDateString()}
                          </span>
                          <span>
                            {translations.form.endDate[language]}: {new Date(event.endDate).toLocaleDateString()}
                          </span>
                          {event.clickCount !== undefined && (
                            <span>
                              {translations.list.clickCount[language]}: {event.clickCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editEvent(event)}
                          className="p-2 text-gray-600 hover:text-laeisaz-title"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id!)}
                          className="p-2 text-red-500 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {translations.list.confirmDelete[language]}
              </h3>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {translations.list.no[language]}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  {translations.list.yes[language]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminEvents 