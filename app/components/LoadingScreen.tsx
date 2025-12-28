'use client'

import { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'

// Separate the inner component that uses useSearchParams
function LoadingScreenInner() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Enhanced configuration for smoother animations
  const config = {
    // How long to show the loading screen (in milliseconds)
    loadingTime: 800, // Reduced from 2000 to 800ms
    
    // Logo size (in pixels)
    logoWidth: 128,
    logoHeight: 128,
    
    // Loading spinner size (in pixels)
    spinnerSize: 48,
    
    // Initial position offset for logos
    leftLogoOffset: 62,
    rightLogoOffset: -62,
    rightLogoVerticalOffset: 0,
    
    // How far logos move when separating (in pixels)
    exitDistance: 300,
    
    // Animation duration (in seconds)
    animationDuration: 0.8
  }

  // Show loading screen when route changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, config.loadingTime)

    return () => clearTimeout(timer)
  // Important: don't depend on the unstable searchParams object itself
  }, [pathname, searchParams.toString(), config.loadingTime])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            transition: { 
              duration: config.animationDuration,
              ease: [0.4, 0, 0.2, 1] // Smooth cubic-bezier easing
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
          }}
        >
          <div className="flex flex-col items-center">
            <motion.div 
              className="relative mb-12" 
              style={{ width: config.logoWidth * 2, height: config.logoHeight }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1], // Smooth bounce effect
                  staggerChildren: 0.1
                }
              }}
              exit={{
                scale: 0.9,
                opacity: 0.8,
                transition: {
                  duration: config.animationDuration,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
            >
              <motion.div
                initial={{ 
                  x: config.leftLogoOffset,
                  scale: 0.8,
                  opacity: 0,
                  rotate: -5
                }}
                animate={{ 
                  x: config.leftLogoOffset,
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1
                  }
                }}
                exit={{ 
                  x: -config.exitDistance,
                  scale: 0.7,
                  opacity: 0,
                  rotate: -15,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.8
                  }
                }}
                className="absolute left-0"
                style={{ width: config.logoWidth, height: config.logoHeight }}
              >
                <Image
                  src="/images/logo-left.png"
                  alt="Logo Left Part"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ 
                  x: config.rightLogoOffset,
                  y: config.rightLogoVerticalOffset,
                  scale: 0.8,
                  opacity: 0,
                  rotate: 5
                }}
                animate={{ 
                  x: config.rightLogoOffset,
                  y: config.rightLogoVerticalOffset,
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1,
                    delay: 0.1 // Slight stagger
                  }
                }}
                exit={{ 
                  x: config.exitDistance,
                  y: config.rightLogoVerticalOffset,
                  scale: 0.7,
                  opacity: 0,
                  rotate: 15,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.8
                  }
                }}
                className="absolute right-0"
                style={{ width: config.logoWidth, height: config.logoHeight }}
              >
                <Image
                  src="/images/logo-right.png"
                  alt="Logo Right Part"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </motion.div>
            </motion.div>
            
            {/* Enhanced loading spinner */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3
                }
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ width: config.spinnerSize, height: config.spinnerSize }}
                className="relative"
              >
                <Image
                  src="/images/loading.png"
                  alt="Loading"
                  width={config.spinnerSize}
                  height={config.spinnerSize}
                  className="object-contain drop-shadow-md"
                />
              </motion.div>

            </motion.div>


          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Wrap the inner component with Suspense
export default function LoadingScreen() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-laeisaz-title"></div>
      </div>
    }>
      <LoadingScreenInner />
    </Suspense>
  )
} 