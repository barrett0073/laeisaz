import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ClientLayout from './components/ClientLayout'
import DynamicMetadata from './components/DynamicMetadata'

export const metadata: Metadata = {
  title: 'Laei Saz | Non-Woven Production Excellence',
  description: 'Industrial Excellence in Non-Woven Production',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Laei Saz | Non-Woven Production Excellence',
    description: 'Industrial Excellence in Non-Woven Production',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans">
        <LoadingScreen />
        <ClientLayout>
          <DynamicMetadata />
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}