'use client'

import { useState, useEffect } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes, FaTrash } from 'react-icons/fa'
import { useLanguage } from './ClientLayout'

export type NotificationType = 'success' | 'error' | 'info'

interface NotificationProps {
  type: NotificationType
  message: string
  isVisible: boolean
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

const Notification = ({
  type = 'info',
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000
}: NotificationProps) => {
  const [isExiting, setIsExiting] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, autoClose, duration])

  const handleClose = () => {
    setIsExiting(true)
    const timer = setTimeout(() => {
      setIsExiting(false)
      onClose()
    }, 300) // Match this with the CSS transition duration
    
    return () => clearTimeout(timer)
  }

  if (!isVisible) return null

  const typeStyles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: <FaCheckCircle className="h-5 w-5 text-green-500" />
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: <FaExclamationCircle className="h-5 w-5 text-red-500" />
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: <FaInfoCircle className="h-5 w-5 text-blue-500" />
    }
  }

  const styles = typeStyles[type]

  // For success notifications, use a more elaborate admin panel style
  if (type === 'success') {
    const isFarsi = message.includes('موفقیت');
    const isDeleteMessage = message.includes('deleted') || message.includes('حذف');
    
    // Choose the accent color based on the message type
    const accentColor = isDeleteMessage ? 'bg-red-500' : 'bg-laeisaz-title';
    const iconBgColor = isDeleteMessage ? 'bg-red-100' : 'bg-green-100';
    const iconColor = isDeleteMessage ? 'text-red-500' : 'text-green-500';
    
    // Choose the appropriate icon
    const StatusIcon = isDeleteMessage ? FaTrash : FaCheckCircle;
    
    // Choose the appropriate description
    const description = isDeleteMessage
      ? (isFarsi ? 'مطلب از پایگاه داده حذف شده است.' : 'The post has been removed from the database.')
      : (isFarsi ? 'تغییرات شما در پایگاه داده ذخیره شده‌است.' : 'Your changes have been saved to the database.');

    return (
      <div 
        className={`fixed top-4 right-4 z-50 flex items-center max-w-md bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 ${isExiting ? 'opacity-0 translate-x-3' : 'opacity-100'}`}
        role="alert"
        dir={isFarsi ? 'rtl' : 'ltr'}
      >
        <div className={`${accentColor} h-full w-2`}></div>
        <div className="flex-1 flex items-center p-4">
          <div className={`flex items-center justify-center w-12 h-12 ${iconBgColor} ${iconColor} rounded-full ${isFarsi ? 'ml-4' : 'mr-4'}`}>
            <StatusIcon className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">
              {message.split('!')[0]}!
            </h3>
            <p className="text-sm text-gray-600">
              {description}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className={`${isFarsi ? 'mr-4' : 'ml-4'} hover:bg-gray-200 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 self-start`}
            aria-label="Close"
          >
            <FaTimes className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`fixed top-4 right-4 z-50 flex items-center max-w-sm ${styles.bg} ${styles.text} border-l-4 ${styles.border} p-4 rounded-r shadow-lg transition-all duration-300 ${isExiting ? 'opacity-0 translate-x-3' : 'opacity-100'}`}
      role="alert"
    >
      <div className="mr-3">
        {styles.icon}
      </div>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      <button 
        onClick={handleClose}
        className="ml-4 hover:bg-gray-200 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        aria-label="Close"
      >
        <FaTimes className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Notification 