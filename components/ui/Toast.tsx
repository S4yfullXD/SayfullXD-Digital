'use client'
// components/ui/Toast.tsx
import { useEffect } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({ message, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
                 bg-slate-800 dark:bg-slate-700 text-white
                 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium
                 animate-slide-up whitespace-nowrap"
    >
      {message}
    </div>
  )
}
