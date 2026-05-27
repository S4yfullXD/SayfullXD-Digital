'use client'
// components/ui/FontSizeControl.tsx
import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'

type FontSize = 'S' | 'M' | 'L' | 'XL'

interface FontSizeControlProps {
  onChange: (size: FontSize) => void
}

const SIZES: FontSize[] = ['S', 'M', 'L', 'XL']

export function FontSizeControl({ onChange }: FontSizeControlProps) {
  const [current, setCurrent] = useState<FontSize>('M')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.fontSizeReader) as FontSize | null
    if (saved && SIZES.includes(saved)) {
      setCurrent(saved)
      onChange(saved)
    }
  }, [onChange])

  function select(size: FontSize) {
    setCurrent(size)
    localStorage.setItem(STORAGE_KEYS.fontSizeReader, size)
    onChange(size)
  }

  return (
    <div
      className="flex items-center gap-1 bg-slate-100 dark:bg-dark-surface rounded-lg p-1"
      role="group"
      aria-label="Ukuran font reader"
    >
      {SIZES.map((size) => (
        <button
          key={size}
          onClick={() => select(size)}
          className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors min-w-[28px]
            ${current === size
              ? 'bg-white dark:bg-dark-border text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          aria-pressed={current === size}
          aria-label={`Ukuran font ${size}`}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
