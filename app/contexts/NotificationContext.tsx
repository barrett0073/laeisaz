'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'
import Notification, { NotificationType } from '../components/Notification'

interface NotificationContextProps {
  showNotification: (message: string, type: NotificationType) => void
  hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => {},
  hideNotification: () => {}
})

export const useNotification = () => useContext(NotificationContext)

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<NotificationType>('info')

  const showNotification = (newMessage: string, newType: NotificationType) => {
    setMessage(newMessage)
    setType(newType)
    setIsVisible(true)
  }

  const hideNotification = () => {
    setIsVisible(false)
  }

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <Notification
        type={type}
        message={message}
        isVisible={isVisible}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  )
}

export default NotificationProvider 