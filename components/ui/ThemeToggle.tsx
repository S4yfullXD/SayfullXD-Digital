'use client'
// components/ui/ThemeToggle.tsx
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-dark-surface animate-skeleton" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surface
                 text-slate-600 dark:text-slate-400 transition-colors"
      aria-label={isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode'}
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}
