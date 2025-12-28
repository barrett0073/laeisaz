import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Optimize tailwind by disabling future and experimental features
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Only add the variants we need
  safelist: [
    'rtl',
    'ltr',
    'hardware-accelerated',
    'will-change-opacity',
    'will-change-transform',
    'animate-fade-in',
  ],
  theme: {
    extend: {
      fontFamily: {
        'iran-sans': ['IranSansX', 'sans-serif'],
      },
      colors: {
        'laeisaz': {
          background: '#e5f0f4',
          text: '#033666',
          title: '#033666',
          frame: '#033666',
        },
        'laeisaz-title': '#033666',
        'laeisaz-text': '#033666',
        'laeisaz-background': '#ffffff',
        'laeisaz-frame': '#033666',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config 