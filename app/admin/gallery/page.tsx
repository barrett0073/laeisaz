'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaSave, FaTrash, FaImage, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'
import { useNotification } from '../../contexts/NotificationContext'
import Link from 'next/link'

interface GalleryImage {
  id?: string
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
  createdAt: Date
  updatedAt: Date
}

const AdminGallery = () => {
  const router = useRouter()
  const { language } = useLanguage()
  const { showNotification } = useNotification()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [currentImage, setCurrentImage] = useState<GalleryImage>({
    title: { en: '', fa: '' },
    description: { en: '', fa: '' },
    image: '',
    order: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'order' | 'createdAt' | 'updatedAt'>('order')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  const translations = {
    title: {
      en: 'Gallery Management',
      fa: 'مدیریت گالری'
    },
    form: {
      title: {
        en: 'Title',
        fa: 'عنوان'
      },
      description: {
        en: 'Description',
        fa: 'توضیحات'
      },
      image: {
        en: 'Image',
        fa: 'تصویر'
      },
      save: {
        en: 'Save Image',
        fa: 'ذخیره تصویر'
      },
      update: {
        en: 'Update Image',
        fa: 'به‌روزرسانی تصویر'
      },
      delete: {
        en: 'Delete',
        fa: 'حذف'
      },
      sort: {
        en: 'Sort by',
        fa: 'مرتب‌سازی بر اساس'
      },
      sortOptions: {
        order: {
          en: 'Manual Order',
          fa: 'ترتیب دستی'
        },
        createdAt: {
          en: 'Date Added',
          fa: 'تاریخ افزودن'
        },
        updatedAt: {
          en: 'Last Updated',
          fa: 'آخرین به‌روزرسانی'
        }
      },
      dateFilter: {
        en: 'Time Period',
        fa: 'بازه زمانی'
      },
      dateFilterOptions: {
        all: {
          en: 'All Time',
          fa: 'همه'
        },
        today: {
          en: 'Today',
          fa: 'امروز'
        },
        week: {
          en: 'This Week',
          fa: 'این هفته'
        },
        month: {
          en: 'This Month',
          fa: 'این ماه'
        }
      }
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setImages(data)
      } else {
        console.error('Expected an array of images, but got:', data)
        setImages([])
      }
    } catch (error) {
      console.error('Error fetching images:', error)
      setImages([])
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setImagePreview(imageData)
        setCurrentImage(prev => ({ ...prev, image: imageData }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = isEditing 
        ? `/api/gallery/${currentImage.id}`
        : '/api/gallery'
      
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentImage),
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save image')
      }
      
      fetchImages()
      resetForm()
      
      showNotification(
        language === 'en' ? 'Image saved successfully!' : 'تصویر با موفقیت ذخیره شد!', 
        'success'
      )
    } catch (error) {
      console.error('Error saving image:', error)
      showNotification(
        language === 'en' 
        ? `Failed to save image: ${error.message}. Please try again.` 
          : `ذخیره تصویر با خطا مواجه شد: ${error.message}. لطفا دوباره تلاش کنید.`,
        'error'
      )
    }
  }

  const handleDelete = async (id: string) => {
    setImageToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!imageToDelete) return

    try {
      const response = await fetch(`/api/gallery/${imageToDelete}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        fetchImages()
        showNotification(
          language === 'en' ? 'Image deleted successfully!' : 'تصویر با موفقیت حذف شد!', 
          'success'
        )
      } else {
        throw new Error(data.error || 'Failed to delete image')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      showNotification(
        language === 'en' 
          ? `Failed to delete image: ${error.message}. Please try again.` 
          : `حذف تصویر با خطا مواجه شد: ${error.message}. لطفا دوباره تلاش کنید.`,
        'error'
      )
    } finally {
      setShowDeleteConfirm(false)
      setImageToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setImageToDelete(null)
  }

  const resetForm = () => {
    setCurrentImage({
      title: { en: '', fa: '' },
      description: { en: '', fa: '' },
      image: '',
      order: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    setImagePreview('')
    setIsEditing(false)
  }

  const editImage = (image: GalleryImage) => {
    setCurrentImage({
      ...image,
      description: image.description || { en: '', fa: '' }
    })
    setImagePreview(image.image)
    setIsEditing(true)
  }

  const moveImage = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === id)
    if (currentIndex === -1) return
    
    const newImages = [...images]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    if (targetIndex < 0 || targetIndex >= images.length) return
    
    // Swap the images
    const temp = newImages[currentIndex]
    newImages[currentIndex] = newImages[targetIndex]
    newImages[targetIndex] = temp
    
    // Update orders to match new positions
    newImages.forEach((img, index) => {
      img.order = index
    })
    
    // Optimistically update the state
    setImages(newImages)
    
    // Update both images in the database
    try {
      await Promise.all(
        newImages.slice(
          Math.min(currentIndex, targetIndex),
          Math.max(currentIndex, targetIndex) + 1
        ).map(img =>
          fetch(`/api/gallery/${img.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(img)
        })
        )
      )
    } catch (error) {
      console.error('Error reordering images:', error)
      // Revert the state on error
      fetchImages()
      showNotification(
        language === 'en' ? 'Failed to reorder images' : 'تغییر ترتیب تصاویر با خطا مواجه شد',
        'error'
      )
    }
  }

  // Filter images based on date
  const filterImagesByDate = (images: GalleryImage[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    switch (dateFilter) {
      case 'today':
        return images.filter(image => new Date(image.createdAt) >= today)
      case 'week':
        return images.filter(image => new Date(image.createdAt) >= weekAgo)
      case 'month':
        return images.filter(image => new Date(image.createdAt) >= monthAgo)
      default:
        return images
    }
  }

  // Sort images
  const sortImages = (images: GalleryImage[]) => {
    return [...images].sort((a, b) => {
      if (sortBy === 'order') {
        return sortOrder === 'asc' ? a.order - b.order : b.order - a.order
      }
      const dateA = new Date(a[sortBy]).getTime()
      const dateB = new Date(b[sortBy]).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })
  }

  // Get filtered and sorted images
  const getFilteredAndSortedImages = () => {
    return sortImages(filterImagesByDate(images))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-laeisaz-title">
            {translations.title[language]}
          </h1>
          <Link 
            href="/admin" 
            className={`flex items-center ${language === 'fa' ? 'flex-row-reverse' : 'flex-row'} gap-2 bg-laeisaz-title text-white px-4 py-2 rounded-lg hover:bg-laeisaz-title/90 transition-colors justify-center sm:justify-start`}
          >
            <span>{language === 'en' ? 'Back to Dashboard' : 'بازگشت به داشبورد'}</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-laeisaz-title mb-6 sm:mb-8">
            {translations.title[language]}
          </h1>

          {/* Image Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-laeisaz-text mb-2">
                  {translations.form.title.en}
                </label>
                <input
                  type="text"
                  value={currentImage.title.en}
                  onChange={(e) => setCurrentImage({ ...currentImage, title: { ...currentImage.title, en: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-laeisaz-text mb-2">
                  {translations.form.title.fa}
                </label>
                <input
                  type="text"
                  value={currentImage.title.fa}
                  onChange={(e) => setCurrentImage({ ...currentImage, title: { ...currentImage.title, fa: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Description Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-laeisaz-text mb-2">
                  {translations.form.description.en}
                </label>
                <textarea
                  value={currentImage.description?.en || ''}
                  onChange={(e) => setCurrentImage({ ...currentImage, description: { ...currentImage.description, en: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-laeisaz-text mb-2">
                  {translations.form.description.fa}
                </label>
                <textarea
                  value={currentImage.description?.fa || ''}
                  onChange={(e) => setCurrentImage({ ...currentImage, description: { ...currentImage.description, fa: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                  rows={3}
                  dir="rtl"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-laeisaz-text mb-2">
                {translations.form.image[language]}
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="gallery-image"
                />
                <label
                  htmlFor="gallery-image"
                  className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer flex items-center justify-center sm:justify-start"
                >
                  <FaImage className="mr-2" />
                  {language === 'en' ? 'Choose Image' : 'انتخاب تصویر'}
                </label>
                
                {imagePreview && (
                  <div className="relative self-center sm:self-auto">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('')
                        setCurrentImage(prev => ({ ...prev, image: '' }))
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-laeisaz-text hover:text-laeisaz-title order-2 sm:order-1"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-3 bg-laeisaz-title text-white rounded-lg hover:bg-laeisaz-title/90 font-medium transition-colors duration-200 order-1 sm:order-2"
              >
                <FaSave className="mr-2" />
                {isEditing ? translations.form.update[language] : translations.form.save[language]}
              </button>
            </div>
          </form>
        </div>

        {/* Gallery Images List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Sorting and Filtering Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">
                {translations.form.sort[language]}:
              </label>
              <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'order' | 'createdAt' | 'updatedAt')}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm min-w-[140px]"
              >
                {Object.entries(translations.form.sortOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value[language]}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[40px] flex items-center justify-center"
                  title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">
                {translations.form.dateFilter[language]}:
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as 'all' | 'today' | 'week' | 'month')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm min-w-[120px]"
              >
                {Object.entries(translations.form.dateFilterOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {getFilteredAndSortedImages().map((image, index) => (
              <div key={image.id} className="relative group">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={image.image}
                    alt={image.title[language]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-medium truncate text-sm sm:text-base">
                    {image.title[language]}
                  </h3>
                  {image.description && (
                    <p className="text-white/80 text-xs sm:text-sm truncate">
                      {image.description[language]}
                    </p>
                  )}
                  <div className="text-white/60 text-xs mt-1">
                    {language === 'en' ? 'Added: ' : 'افزوده شده: '}
                    {new Date(image.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}
                    {image.updatedAt !== image.createdAt && (
                      <span className="ml-2 hidden sm:inline">
                        {language === 'en' ? '• Updated: ' : '• به‌روزرسانی: '}
                        {new Date(image.updatedAt).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => editImage(image)}
                    className="p-2 sm:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(image.id!)}
                    className="p-2 sm:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <FaTrash className="w-4 h-4 sm:w-4 sm:h-4 text-red-500" />
                  </button>
                </div>

                <div className="absolute top-2 left-2 flex flex-col space-y-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => moveImage(image.id!, 'up')}
                    disabled={index === 0}
                    className={`p-2 sm:p-2 bg-white rounded-full shadow-lg transition-colors duration-200 ${
                      index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaArrowUp className="w-4 h-4 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => moveImage(image.id!, 'down')}
                    disabled={index === images.length - 1}
                    className={`p-2 sm:p-2 bg-white rounded-full shadow-lg transition-colors duration-200 ${
                      index === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaArrowDown className="w-4 h-4 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {language === 'en' 
                ? 'Are you sure you want to delete this image?' 
                : 'آیا از حذف این تصویر اطمینان دارید؟'}
            </h3>
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 order-2 sm:order-1"
              >
                {language === 'en' ? 'Cancel' : 'انصراف'}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 order-1 sm:order-2"
              >
                {language === 'en' ? 'Delete' : 'حذف'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGallery 