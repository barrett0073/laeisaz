'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '../components/ClientLayout'

// Add TypeScript interface for the window object with logout property
declare global {
  interface Window {
    logout?: () => void;
  }
}

const LoginPage = () => {
  const router = useRouter()
  const { language } = useLanguage()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (isLoggedIn) {
      router.push('/admin')
    }
  }, [router])

  // Add a logout function to the global window object
  useEffect(() => {
    // Define the logout function
    const logout = () => {
      localStorage.removeItem('isLoggedIn')
      // Only keep rememberedUser if it was explicitly saved
      if (!localStorage.getItem('rememberMeEnabled')) {
        localStorage.removeItem('rememberedUser')
      }
      router.push('/login')
    }
    
    // Attach to window for global access
    window.logout = logout
    
    return () => {
      // Clean up when component unmounts
      delete window.logout
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Get environment variables
      const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

      // Validate environment variables
      if (!adminUsername || !adminPassword) {
        console.error('Admin credentials not properly configured')
        throw new Error('Admin credentials not properly configured')
      }

      // Check credentials
      if (username === adminUsername && password === adminPassword) {
      // Set login state
      localStorage.setItem('isLoggedIn', 'true')
      
      // Store username if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedUser', username)
        localStorage.setItem('rememberMeEnabled', 'true')
      } else {
        localStorage.removeItem('rememberedUser')
        localStorage.removeItem('rememberMeEnabled')
      }
      
      router.push('/admin')
    } else {
      setError(language === 'en' ? 'Invalid username or password' : 'نام کاربری یا رمز عبور نامعتبر است')
      }
    } catch (error) {
      setError(language === 'en' ? 'An error occurred. Please try again.' : 'خطایی رخ داد. لطفا دوباره تلاش کنید.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load remembered username if available
  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser')
    const rememberMeEnabled = localStorage.getItem('rememberMeEnabled') === 'true'
    
    if (rememberedUser && rememberMeEnabled) {
      setUsername(rememberedUser)
      setRememberMe(true)
    } else {
      setRememberMe(false)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image/Brand section */}
      <div className="hidden md:flex md:w-1/2 bg-laeisaz-title items-center justify-center">
        <div className="p-12 max-w-md">
          <div className="relative h-16 w-16 mb-8">
            <Image
              src="/images/logo2.png"
              alt="Laeisaz Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            {language === 'en' ? 'Welcome to Laeisaz Admin' : 'به پنل مدیریت لایی ساز خوش آمدید'}
          </h1>
          <p className="text-white/80">
            {language === 'en' 
              ? 'Access your dashboard to manage content, blog posts, and more.' 
              : 'به داشبورد خود دسترسی پیدا کنید تا محتوا، پست‌های وبلاگ و موارد دیگر را مدیریت کنید.'}
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="relative h-16 w-16">
              <Image
                src="/images/logo2.png"
                alt="Laeisaz Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div dir={language === 'fa' ? 'rtl' : 'ltr'}>
            <h2 className={`text-3xl font-bold text-gray-900 mb-2 ${language === 'fa' ? 'text-right' : 'text-center md:text-left'}`}>
              {language === 'en' ? 'Admin Login' : 'ورود ادمین'}
            </h2>
            <p className={`text-gray-600 mb-8 ${language === 'fa' ? 'text-right' : 'text-center md:text-left'}`}>
              {language === 'en' ? 'Sign in to your account' : 'وارد حساب کاربری خود شوید'}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded" dir={language === 'fa' ? 'rtl' : 'ltr'}>
              <p className={`text-red-700 text-sm ${language === 'fa' ? 'text-right' : ''}`}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Username' : 'نام کاربری'}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title focus:border-laeisaz-title transition duration-150"
                placeholder={language === 'en' ? 'Enter your username' : 'نام کاربری خود را وارد کنید'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                dir={language === 'fa' ? 'rtl' : 'ltr'}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Password' : 'رمز عبور'}
                </label>
                <a href="#" className="text-sm text-laeisaz-title hover:underline">
                  {language === 'en' ? 'Forgot password?' : 'رمز عبور را فراموش کرده‌اید؟'}
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-laeisaz-title focus:border-laeisaz-title transition duration-150"
                placeholder={language === 'en' ? 'Enter your password' : 'رمز عبور خود را وارد کنید'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir={language === 'fa' ? 'rtl' : 'ltr'}
              />
            </div>

            <div className="flex items-center gap-2" dir={language === 'fa' ? 'rtl' : 'ltr'}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-laeisaz-title focus:ring-laeisaz-title border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="block text-sm text-gray-700">
                {language === 'en' ? 'Remember me' : 'مرا به خاطر بسپار'}
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-laeisaz-title hover:bg-laeisaz-title/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-laeisaz-title transition duration-150 relative"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span>{language === 'en' ? 'Sign in' : 'ورود'}</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? 'Admin access only. Unauthorized access is prohibited.' 
                : 'فقط دسترسی ادمین. دسترسی غیرمجاز ممنوع است.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage 