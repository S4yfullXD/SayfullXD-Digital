import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#EEF2FF',
          dark: '#818CF8',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          2: '#F1F5F9',
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          panel: '#162032',
          border: '#334155',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
      },
      maxWidth: {
        reader: '720px',
      },
      width: {
        sidebar: '240px',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'skeleton-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'skeleton': 'skeleton-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
