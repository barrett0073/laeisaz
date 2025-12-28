'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn'
  delay?: number
  duration?: number
}

// Animation variants
const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  }
}

export default function AnimateOnScroll({ 
  children, 
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6
}: AnimateOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true // Only animate once
  })

  return (
    <motion.div
      ref={ref}
      variants={animationVariants[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 