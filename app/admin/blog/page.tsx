'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaSave, FaTrash, FaImage, FaPlus, FaTimesCircle, FaSearch, FaFilter, FaSort } from 'react-icons/fa'
import { useLanguage } from '../../components/ClientLayout'
import { useNotification } from '../../contexts/NotificationContext'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), {
  ssr: false
})

interface BlogPost {
  id?: string
  title: {
    en: string
    fa: string
  }
  description: {
    en: string
    fa: string
  }
  content: {
    en: string
    fa: string
  }
  category: string
  date: string
  author: {
    en: string
    fa: string
  }
  image: string
  images?: string[]
  featured: boolean
}

const AdminBlog = () => {
  const router = useRouter()
  const { language } = useLanguage()
  const { showNotification } = useNotification()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    title: { en: '', fa: '' },
    description: { en: '', fa: '' },
    content: { en: '', fa: '' },
    category: 'technical',
    date: new Date().toISOString().split('T')[0],
    author: { en: '', fa: '' },
    image: '',
    images: [],
    featured: false
  })
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showPreview, setShowPreview] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  const translations = {
    title: {
      en: 'Blog Management',
      fa: 'مدیریت بلاگ'
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
      content: {
        en: 'Content',
        fa: 'محتوا'
      },
      category: {
        en: 'Category',
        fa: 'دسته‌بندی'
      },
      date: {
        en: 'Date',
        fa: 'تاریخ'
      },
      author: {
        en: 'Author',
        fa: 'نویسنده'
      },
      image: {
        en: 'Images',
        fa: 'تصاویر'
      },
      featured: {
        en: 'Featured Post',
        fa: 'مطلب برجسته'
      },
      save: {
        en: 'Save Post',
        fa: 'ذخیره مطلب'
      },
      update: {
        en: 'Update Post',
        fa: 'به‌روزرسانی مطلب'
      },
      delete: {
        en: 'Delete',
        fa: 'حذف'
      },
      addMore: {
        en: 'Add More Images',
        fa: 'افزودن تصاویر بیشتر'
      }
    },
    categories: {
      technical: {
        en: 'Technical Insights',
        fa: 'بینش‌های فنی'
      },
      industry: {
        en: 'Industry News',
        fa: 'اخبار صنعت'
      },
      company: {
        en: 'Company Updates',
        fa: 'به‌روزرسانی‌های شرکت'
      }
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setPosts(data)
      } else {
        console.error('Expected an array of posts, but got:', data)
        setPosts([])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setImagePreview(imageData)
        
        // Update the main image and add it to the images array if it doesn't exist already
        setCurrentPost(prev => {
          const newImages = [...(prev.images || []), imageData]
          return {
            ...prev,
            image: imageData,
            images: newImages
          }
        })
        
        // Update the image previews
        setImagePreviews(prev => [...prev, imageData])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageData = reader.result as string
          
          // Add the new image to the images array
          setCurrentPost(prev => {
            const newImages = [...(prev.images || []), imageData]
            
            // If this is the first image, also set it as the main image
            if (!prev.image) {
              return { ...prev, image: imageData, images: newImages }
            }
            
            return { ...prev, images: newImages }
          })
          
          // Update the image previews
          setImagePreviews(prev => [...prev, imageData])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setCurrentPost(prev => {
      const newImages = [...(prev.images || [])]
      newImages.splice(index, 1)
      
      // If we removed the main image, update it to the first available image
      const newMainImage = index === 0 && newImages.length > 0 ? newImages[0] : prev.image
      
      return {
        ...prev,
        image: newMainImage,
        images: newImages
      }
    })
    
    setImagePreviews(prev => {
      const newPreviews = [...prev]
      newPreviews.splice(index, 1)
      return newPreviews
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = isEditing 
        ? `/api/blog/${currentPost.id}`
        : '/api/blog'
      
      const method = isEditing ? 'PUT' : 'POST'
      const date = new Date(currentPost.date).toISOString()
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentPost,
          date,
          images: Array.isArray(currentPost.images) ? currentPost.images : []
        }),
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save post')
      }
      
      fetchPosts()
      resetForm()
      
      showNotification(
        language === 'en' ? 'Post saved successfully!' : 'مطلب با موفقیت ذخیره شد!', 
        'success'
      )
    } catch (error) {
      console.error('Error saving post:', error)
      showNotification(
        language === 'en' 
        ? `Failed to save post: ${error.message}. Please try again.` 
          : `ذخیره مطلب با خطا مواجه شد: ${error.message}. لطفا دوباره تلاش کنید.`,
        'error'
      )
    }
  }

  const handleDelete = async (id: string) => {
    setPostToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!postToDelete) return

    try {
      const response = await fetch(`/api/blog/${postToDelete}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
        showNotification(
          language === 'en' ? 'Post deleted successfully!' : 'مطلب با موفقیت حذف شد!', 
          'success'
        )
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      showNotification(
        language === 'en' 
          ? `Failed to delete post: ${error.message}` 
          : `حذف مطلب با خطا مواجه شد: ${error.message}`,
        'error'
      )
    } finally {
      setShowDeleteConfirm(false)
      setPostToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setPostToDelete(null)
  }

  const resetForm = () => {
    setCurrentPost({
      title: { en: '', fa: '' },
      description: { en: '', fa: '' },
      content: { en: '', fa: '' },
      category: 'technical',
      date: new Date().toISOString().split('T')[0],
      author: { en: '', fa: '' },
      image: '',
      images: [],
      featured: false
    })
    setImagePreview('')
    setImagePreviews([])
    setIsEditing(false)
  }

  const editPost = (post: BlogPost) => {
    // Initialize the post with a default empty images array if not present
    const processedImages = post.images || []
    
    // Ensure images is always an array
    const postWithImages = {
      ...post,
      images: Array.isArray(processedImages) ? processedImages : []
    }
    
    console.log('Editing post with images:', postWithImages.images)
    
    setCurrentPost(postWithImages)
    setImagePreview(post.image)
    
    // Set image previews for all images
    const previews = Array.isArray(postWithImages.images) && postWithImages.images.length > 0 
      ? postWithImages.images 
      : (post.image ? [post.image] : [])
    
    setImagePreviews(previews)
    setIsEditing(true)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description[language].toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    }
    if (sortBy === 'title') {
      return sortOrder === 'desc'
        ? b.title[language].localeCompare(a.title[language])
        : a.title[language].localeCompare(b.title[language])
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-laeisaz-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-laeisaz-title">
            {translations.title[language]}
          </h1>
          <div className="flex gap-4">
          <Link 
            href="/admin" 
              className={`flex items-center ${language === 'fa' ? 'flex-row-reverse' : 'flex-row'} gap-2 bg-laeisaz-title text-white px-4 py-2 rounded-lg hover:bg-laeisaz-title/90 transition-colors`}
          >
            <span>{language === 'en' ? 'Back to Dashboard' : 'بازگشت به داشبورد'}</span>
          </Link>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 bg-white text-laeisaz-title px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-laeisaz-title"
            >
              {showPreview 
                ? (language === 'en' ? 'Hide Preview' : 'مخفی کردن پیش‌نمایش')
                : (language === 'en' ? 'Show Preview' : 'نمایش پیش‌نمایش')}
            </button>
          </div>
        </div>

        {/* Blog Post Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-laeisaz-title">English Content</h3>
                <div>
                  <label className="block text-sm font-medium text-laeisaz-text mb-2">
                    {translations.form.title[language]}
                  </label>
                  <input
                    type="text"
                    value={currentPost.title.en}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: { ...currentPost.title, en: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-laeisaz-text mb-2">
                    {translations.form.description[language]}
                  </label>
                  <textarea
                    value={currentPost.description.en}
                    onChange={(e) => setCurrentPost({ ...currentPost, description: { ...currentPost.description, en: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-laeisaz-text mb-2">
                    {translations.form.content[language]}
                  </label>
                  <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl w-full">
                    <RichTextEditor
                    value={currentPost.content.en}
                      onChange={(content) => {
                        // Clean up any remaining class attributes from pasted content
                        const cleanContent = content.replace(/ class="[^"]*"/g, '').trim()
                        setCurrentPost({ 
                          ...currentPost, 
                          content: { 
                            ...currentPost.content, 
                            en: cleanContent 
                          } 
                        })
                      }}
                      language="en"
                    />
                  </div>
                </div>
              </div>

              {/* Farsi Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-laeisaz-title">Farsi Content</h3>
                <div>
                  <label className="block text-sm font-medium text-laeisaz-text mb-2">
                    {translations.form.title[language]}
                  </label>
                  <input
                    type="text"
                    value={currentPost.title.fa}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: { ...currentPost.title, fa: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-laeisaz-text mb-2">
                    {translations.form.description[language]}
                  </label>
                  <textarea
                    value={currentPost.description.fa}
                    onChange={(e) => setCurrentPost({ ...currentPost, description: { ...currentPost.description, fa: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-laeisaz-text mb-2">
                    {translations.form.content[language]}
                  </label>
                  <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl w-full">
                    <RichTextEditor
                    value={currentPost.content.fa}
                      onChange={(content) => {
                        // Clean up any remaining class attributes from pasted content
                        const cleanContent = content.replace(/ class="[^"]*"/g, '').trim()
                        setCurrentPost({ 
                          ...currentPost, 
                          content: { 
                            ...currentPost.content, 
                            fa: cleanContent 
                          } 
                        })
                      }}
                      language="fa"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-laeisaz-text mb-2">
                  {translations.form.category[language]}
                </label>
                <select
                  value={currentPost.category}
                  onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                >
                  {Object.entries(translations.categories).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-laeisaz-text mb-2">
                  {translations.form.date[language]}
                </label>
                <input
                  type="date"
                  value={currentPost.date}
                  onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-laeisaz-text mb-2">
                  {translations.form.author[language]}
                </label>
                <input
                  type="text"
                  value={currentPost.author[language]}
                  onChange={(e) => setCurrentPost({ ...currentPost, author: { ...currentPost.author, [language]: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-laeisaz-text mb-2">
                {translations.form.image[language]}
              </label>
              
              {/* Main Image Upload */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-4">
                  <label className={`cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50`} dir={language === 'fa' ? 'rtl' : 'ltr'}>
                    {language === 'en' ? <FaImage className="mr-3" /> : null}
                    <span>{language === 'en' ? 'Upload Main Image' : 'آپلود تصویر اصلی'}</span>
                    {language === 'fa' ? <FaImage className="mr-3" /> : null}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="hidden" 
                    />
                  </label>
                </div>
                
                {/* Additional Images Upload */}
                <div className="flex items-center mb-6">
                  <label className={`cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ml-0 md:ml-2`} dir={language === 'fa' ? 'rtl' : 'ltr'}>
                    {language === 'en' ? <FaPlus className="mr-3" /> : null}
                    <span>{translations.form.addMore[language]}</span>
                    {language === 'fa' ? <FaPlus className="mr-3" /> : null}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAdditionalImageChange} 
                      multiple
                      className="hidden" 
                    />
                  </label>
                </div>
                
                {/* Image Previews Gallery */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-40 w-full">
                          <Image 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            fill
                            className="object-cover rounded-lg" 
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-700"
                        >
                          <FaTimesCircle />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-laeisaz-title text-white text-xs py-1 text-center">
                            {language === 'en' ? 'Main Image' : 'تصویر اصلی'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Featured Post Checkbox */}
            <div className="flex items-center gap-2" dir={language === 'fa' ? 'rtl' : 'ltr'}>
              <input
                type="checkbox"
                checked={currentPost.featured}
                onChange={(e) => setCurrentPost({ ...currentPost, featured: e.target.checked })}
                className="h-4 w-4 text-laeisaz-title focus:ring-laeisaz-title border-gray-300 rounded"
              />
              <label className="block text-sm text-laeisaz-text">
                {translations.form.featured[language]}
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 mt-8">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-laeisaz-text hover:text-laeisaz-title"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-laeisaz-title text-white rounded-lg hover:bg-laeisaz-title/90 font-medium transition-colors duration-200"
                dir={language === 'fa' ? 'rtl' : 'ltr'}
              >
                {language === 'en' ? <FaSave className="mr-3" /> : null}
                {isEditing ? translations.form.update[language] : translations.form.save[language]}
                {language === 'fa' ? <FaSave className="mr-3" /> : null}
              </button>
            </div>
          </form>
        </div>

        {/* Blog Posts List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-laeisaz-title">
            {language === 'en' ? 'Blog Posts' : 'مطالب بلاگ'}
          </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search posts...' : 'جستجوی مطالب...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full md:w-64 px-4 ${language === 'fa' ? 'pl-10 pr-4' : 'pr-10 pl-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title`}
                  dir={language === 'fa' ? 'rtl' : 'ltr'}
                />
                <FaSearch className={`absolute top-3 ${language === 'fa' ? 'left-3' : 'right-3'} text-gray-400`} />
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
              >
                <option value="all">{language === 'en' ? 'All Categories' : 'همه دسته‌بندی‌ها'}</option>
                {Object.entries(translations.categories).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value[language]}
                  </option>
                ))}
              </select>
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                >
                  <option value="date">{language === 'en' ? 'Date' : 'تاریخ'}</option>
                  <option value="title">{language === 'en' ? 'Title' : 'عنوان'}</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FaSort className={sortOrder === 'asc' ? 'transform rotate-180' : ''} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => (
                                      <div key={post.id} className="border-b border-gray-200 pb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    {/* Blog Post Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500">
                          {translations.categories[post.category][language]}
                        </span>
                        {post.featured && (
                          <span className="text-xs bg-laeisaz-title text-white px-2 py-1 rounded">
                            {language === 'en' ? 'Featured' : 'برجسته'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-laeisaz-title">
                        {post.title[language]}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')} • {post.author[language]}
                      </p>
                      <div 
                        className="prose prose-sm max-w-none mt-2"
                        dangerouslySetInnerHTML={{ __html: post.description[language] || '' }}
                        dir={language === 'fa' ? 'rtl' : 'ltr'}
                      />
                      <div 
                        className="prose prose-sm max-w-none mt-4"
                        dangerouslySetInnerHTML={{ __html: post.content[language] || '' }}
                        dir={language === 'fa' ? 'rtl' : 'ltr'}
                      />
                    </div>
                    {post.image && (
                      <div className="relative w-full md:w-48 h-32">
                        <Image
                          src={post.image}
                          alt={post.title[language]}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => editPost(post)}
                        className="text-laeisaz-title hover:text-laeisaz-title/80 flex items-center"
                        dir={language === 'fa' ? 'rtl' : 'ltr'}
                      >
                        {language === 'en' ? (
                          <>
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </>
                        ) : (
                          <>
                            ویرایش
                            <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </>
                        )}
                      </button>
                      <button
                                                    onClick={() => post.id && handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                        dir={language === 'fa' ? 'rtl' : 'ltr'}
                      >
                        {language === 'en' ? <FaTrash className="mr-3" /> : null}
                        {translations.form.delete[language]}
                        {language === 'fa' ? <FaTrash className="mr-3" /> : null}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                {language === 'en' ? 'No blog posts found' : 'هیچ مطلبی یافت نشد'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-laeisaz-title mb-4">
              {language === 'en' ? 'Delete Post' : 'حذف مطلب'}
            </h3>
            <p className="text-laeisaz-text mb-6">
              {language === 'en' 
                ? 'Are you sure you want to delete this post? This action cannot be undone.' 
                : 'آیا از حذف این مطلب اطمینان دارید؟ این عمل قابل بازگشت نیست.'}
            </p>
            <div className="flex justify-end space-x-4" dir={language === 'fa' ? 'rtl' : 'ltr'}>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-laeisaz-text hover:text-laeisaz-title"
              >
                {language === 'en' ? 'Cancel' : 'انصراف'}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
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

export default AdminBlog 