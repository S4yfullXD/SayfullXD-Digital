'use client'
// components/ui/AdBanner.tsx
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

export function AdBanner({
  slot,
  format = 'auto',
  className = '',
}: AdBannerProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    if (!client) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense not loaded yet
    }
  }, [client])

  if (!client) {
    // Dev placeholder
    return (
      <div
        className={`overflow-hidden my-6 rounded-lg border-2 border-dashed border-slate-200
                    dark:border-dark-border flex items-center justify-center
                    bg-slate-50 dark:bg-dark-surface ${className}`}
        style={{ minHeight: '90px' }}
      >
        <span className="text-xs text-slate-400">
          [AdSense – Slot: {slot}]
        </span>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
