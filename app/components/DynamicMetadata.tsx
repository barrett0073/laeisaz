'use client'

import { useEffect } from 'react'
import { useLanguage } from './ClientLayout'

export default function DynamicMetadata() {
  const { language } = useLanguage()

  useEffect(() => {
    // Update document title
    document.title = language === 'fa' 
      ? 'لایی ساز | برتری در تولید نبافته'
      : 'Laei Saz | Non-Woven Production Excellence'

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute(
        'content',
        language === 'fa'
          ? 'برتری صنعتی در تولید نبافته'
          : 'Industrial Excellence in Non-Woven Production'
      )
    }

    // Update OpenGraph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        language === 'fa'
          ? 'لایی ساز | برتری در تولید نبافته'
          : 'Laei Saz | Non-Woven Production Excellence'
      )
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        language === 'fa'
          ? 'برتری صنعتی در تولید نبافته'
          : 'Industrial Excellence in Non-Woven Production'
      )
    }
  }, [language])

  return null
} 