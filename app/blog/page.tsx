'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { useLanguage } from '../components/ClientLayout'

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
  featured: boolean
}

const Blog = () => {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        // Ensure each post has proper author data
        const postsWithAuthor = data.map((post: any) => ({
          ...post,
          author: {
            en: post.author?.en || post.author?.fa || 'Admin',
            fa: post.author?.fa || post.author?.en || 'ادمین'
          }
        }))
        setPosts(postsWithAuthor)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const translations = {
    hero: {
      title: {
        en: 'Blog',
        fa: 'بلاگ'
      },
      description: {
        en: 'Stay updated with the latest industry news, technical insights, and company updates',
        fa: 'با آخرین اخبار صنعت، بینش‌های فنی و به‌روزرسانی‌های شرکت همراه باشید'
      }
    },
    search: {
      placeholder: {
        en: 'Search articles...',
        fa: 'جستجوی مقالات...'
      }
    },
    categories: {
      title: {
        en: 'Categories',
        fa: 'دسته‌بندی‌ها'
      },
      all: {
        en: 'All Posts',
        fa: 'همه مطالب'
      },
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
    },
    featured: {
      title: {
        en: 'Featured Posts',
        fa: 'مطالب برجسته'
      }
    },
    recent: {
      title: {
        en: 'Recent Posts',
        fa: 'مطالب اخیر'
      }
    },
    noPosts: {
      en: 'No blog posts found',
      fa: 'هیچ مطلبی یافت نشد'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === 'en' 
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const filteredPosts = posts.filter(post => {
    // Apply search filter
    const matchesSearch = 
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-laeisaz-background">
      {/* Language Tag */}
      {/* Language tag section removed */}

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={translations.search.placeholder[language]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className={`absolute ${language === 'fa' ? 'left-3' : 'right-3'} top-3 text-gray-400`} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-laeisaz-title mb-4">
                  {translations.categories.title[language]}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => handleCategoryClick('all')}
                      className={`w-full text-left cursor-pointer ${selectedCategory === 'all' ? 'text-laeisaz-title font-bold' : 'text-laeisaz-text'} hover:text-laeisaz-title transition duration-200`}
                    >
                      {translations.categories.all[language]}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategoryClick('technical')}
                      className={`w-full text-left cursor-pointer ${selectedCategory === 'technical' ? 'text-laeisaz-title font-bold' : 'text-laeisaz-text'} hover:text-laeisaz-title transition duration-200`}
                    >
                      {translations.categories.technical[language]}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategoryClick('industry')}
                      className={`w-full text-left cursor-pointer ${selectedCategory === 'industry' ? 'text-laeisaz-title font-bold' : 'text-laeisaz-text'} hover:text-laeisaz-title transition duration-200`}
                    >
                      {translations.categories.industry[language]}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategoryClick('company')}
                      className={`w-full text-left cursor-pointer ${selectedCategory === 'company' ? 'text-laeisaz-title font-bold' : 'text-laeisaz-text'} hover:text-laeisaz-title transition duration-200`}
                    >
                      {translations.categories.company[language]}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-laeisaz-title">
                    {translations.noPosts[language]}
                  </h2>
                </div>
              ) : (
                <>
                  {/* Featured Posts */}
                  {filteredPosts.filter(post => post.featured).length > 0 && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold text-laeisaz-title mb-6">
                        {translations.featured.title[language]}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPosts
                          .filter(post => post.featured)
                          .map(post => (
                            <AnimateOnScroll key={post._id}>
                              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                                <div className="relative h-64 w-full">
                                  <Image
                                    src={post.image}
                                    alt={post.title[language]}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                  <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                      <FaCalendarAlt className={`${language === 'fa' ? 'ml-2' : 'mr-2'}`} />
                                      <span>{formatDate(post.date)}</span>
                                    </div>
                                  </div>
                                  <h3 className="text-xl font-bold text-laeisaz-title mb-2 line-clamp-2">
                                    {post.title[language]}
                                  </h3>
                                  <p className="text-laeisaz-text mb-4 flex-1 line-clamp-3">
                                    {post.description[language]}
                                  </p>
                                  <div className="flex justify-between items-center mt-auto">
                                    <div className="flex items-center space-x-4">
                                      <span className="text-sm text-gray-500">
                                        {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}
                                      </span>
                                    </div>
                                    <Link
                                      href={`/blog/${post._id}`}
                                      className="inline-flex items-center text-laeisaz-title hover:text-laeisaz-title/80"
                                    >
                                      {language === 'en' ? 'Read More' : 'ادامه مطلب'}
                                      <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d={language === 'en' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                                        />
                                      </svg>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </AnimateOnScroll>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Posts */}
                  <div>
                    <h2 className="text-2xl font-bold text-laeisaz-title mb-6">
                      {translations.recent.title[language]}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPosts
                        .filter(post => !post.featured)
                        .map(post => (
                          <AnimateOnScroll key={post._id}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                              <div className="relative h-52 w-full">
                                <Image
                                  src={post.image}
                                  alt={post.title[language]}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                  <div className="flex items-center">
                                    <FaCalendarAlt className={`${language === 'fa' ? 'ml-2' : 'mr-2'}`} />
                                    <span>{formatDate(post.date)}</span>
                                  </div>
                                </div>
                                <h3 className="text-xl font-bold text-laeisaz-title mb-2 line-clamp-2">
                                  {post.title[language]}
                                </h3>
                                <p className="text-laeisaz-text mb-4 flex-1 line-clamp-3">
                                  {post.description[language]}
                                </p>
                                <div className="flex justify-between items-center mt-auto">
                                  <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">
                                      {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}
                                    </span>
                                  </div>
                                  <Link
                                    href={`/blog/${post._id}`}
                                    className="inline-flex items-center text-laeisaz-title hover:text-laeisaz-title/80"
                                  >
                                    {language === 'en' ? 'Read More' : 'ادامه مطلب'}
                                    <svg
                                      className="w-4 h-4 ml-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={language === 'en' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                                      />
                                    </svg>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </AnimateOnScroll>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog 