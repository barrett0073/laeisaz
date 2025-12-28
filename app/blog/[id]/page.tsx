'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '../../components/ClientLayout'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface BlogPost {
  _id: string
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

const BlogPostPage = () => {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/404')
            return
          }
          throw new Error('Failed to fetch blog post')
        }
        const data = await response.json()
        // Ensure author has both language values
        if (data.author) {
          data.author = {
            en: data.author.en || data.author.fa || 'Admin',
            fa: data.author.fa || data.author.en || 'ادمین'
          }
        } else {
          data.author = {
            en: 'Admin',
            fa: 'ادمین'
          }
        }
        
        // Initialize images array if it doesn't exist
        if (!data.images || !Array.isArray(data.images)) {
          data.images = data.image ? [data.image] : []
        }
        
        setPost(data)
      } catch (error) {
        console.error('Error fetching blog post:', error)
        router.push('/404')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id, router])

  // Function to navigate to the next image with transition
  const nextImage = () => {
    if (!post?.images?.length || isTransitioning) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === post.images!.length - 1 ? 0 : prevIndex + 1
      )
      setTimeout(() => setIsTransitioning(false), 50)
    }, 200)
  }

  // Function to navigate to the previous image with transition
  const prevImage = () => {
    if (!post?.images?.length || isTransitioning) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? post.images!.length - 1 : prevIndex - 1
      )
      setTimeout(() => setIsTransitioning(false), 50)
    }, 200)
  }

  // Function to directly select an image with transition
  const selectImage = (index: number) => {
    if (isTransitioning || currentImageIndex === index) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 200)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-laeisaz-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-laeisaz-title mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-laeisaz-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-laeisaz-title">
              {language === 'en' ? 'Post not found' : 'مطلب یافت نشد'}
            </h1>
          </div>
        </div>
      </div>
    )
  }

  // Ensure we have images to display
  const images = post.images && post.images.length > 0 ? post.images : [post.image]
  const currentImage = images[currentImageIndex]

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="p-8">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className={`flex items-center bg-laeisaz-title text-white px-4 py-2 rounded-full hover:bg-laeisaz-title/90 transition-colors mb-6 ${
                language === 'fa' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {language === 'en' ? 'Back to Blog' : 'بازگشت به بلاگ'}
            </button>

            {/* Title */}
            <h1 className="text-4xl font-bold text-laeisaz-title mb-6">
              {post.title[language]}
            </h1>

            {/* Author and Date Section */}
            <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="inline-block bg-laeisaz-title/10 text-laeisaz-title px-3 py-1 rounded-full font-medium">
                  {post.category}
                </span>
                <span className={`${language === 'fa' ? 'mr-4' : 'ml-4'}`}>
                  {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}
                </span>
              </div>
              <div>
                {language === 'en' ? 'By' : 'نویسنده'} {post.author[language]}
              </div>
            </div>

            {/* Minimal Image Gallery Section */}
            <div className="mb-10">
              {/* Main Image */}
              <div className="relative aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <Image
                    src={currentImage}
                    alt={post.title[language]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Minimal Navigation Arrows - only show if multiple images */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-0 top-0 bottom-0 w-1/5 flex items-center justify-start px-4 bg-gradient-to-r from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="text-white drop-shadow-lg" size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-end px-4 bg-gradient-to-l from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="text-white drop-shadow-lg" size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Minimal Gallery Thumbnails - only show if multiple images */}
              {images.length > 1 && (
                <div className="flex justify-center mt-4 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`relative flex-shrink-0 h-16 w-16 rounded-md overflow-hidden transition-all duration-300 mx-1 ${
                        currentImageIndex === index 
                          ? 'ring-2 ring-laeisaz-title opacity-100 transform scale-110' 
                          : 'opacity-60 hover:opacity-90 hover:scale-105 border border-gray-200'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8">
              {post.description[language]}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content[language] }} />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}

export default BlogPostPage 