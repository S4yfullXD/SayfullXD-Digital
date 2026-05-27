'use client'
// components/ui/ShareButton.tsx
import { useState, useRef, useEffect } from 'react'
import { FiShare2, FiLink, FiMail, FiX } from 'react-icons/fi'
import { Toast } from './Toast'

interface ShareButtonProps {
  title: string
  slug: string
  size?: 'sm' | 'md'
  variant?: 'ghost' | 'outline'
}

export function ShareButton({
  title,
  slug,
  size = 'md',
  variant = 'ghost',
}: ShareButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/buku/${slug}`
      : `/buku/${slug}`

  const shareText = `Baca "${title}" gratis di SayfullXD Digital`

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url })
      } catch {
        // user cancelled – not an error
      }
    } else {
      setShowDropdown(true)
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setToastMessage('Link disalin! 📋')
    } catch {
      setToastMessage('Gagal menyalin link')
    }
    setShowDropdown(false)
  }

  function shareWhatsApp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${url}`)}`,
      '_blank'
    )
    setShowDropdown(false)
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      '_blank'
    )
    setShowDropdown(false)
  }

  function shareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    )
    setShowDropdown(false)
  }

  function shareEmail() {
    window.open(
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n${url}`)}`,
      '_blank'
    )
    setShowDropdown(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  const btnClass =
    variant === 'ghost'
      ? `inline-flex items-center gap-1.5 rounded-lg transition-colors
         text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surface
         hover:text-slate-700 dark:hover:text-slate-200
         ${size === 'sm' ? 'p-1.5 text-xs' : 'px-3 py-2 text-sm'}`
      : `inline-flex items-center gap-1.5 rounded-lg border transition-colors
         text-slate-600 dark:text-slate-400 border-slate-200 dark:border-dark-border
         hover:bg-slate-50 dark:hover:bg-dark-surface
         ${size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-4 py-2 text-sm font-medium'}`

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleShare}
        className={btnClass}
        aria-label="Bagikan buku ini"
        aria-expanded={showDropdown}
      >
        <FiShare2 size={size === 'sm' ? 13 : 15} />
        {size === 'md' && <span>Bagikan</span>}
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-surface
                        border dark:border-dark-border rounded-xl shadow-lg z-50
                        animate-scale-in origin-top-right">
          <div className="flex items-center justify-between px-3 pt-2 pb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Bagikan ke
            </span>
            <button
              onClick={() => setShowDropdown(false)}
              className="p-0.5 hover:text-slate-700 dark:hover:text-white text-slate-400 transition-colors"
              aria-label="Tutup"
            >
              <FiX size={13} />
            </button>
          </div>
          <ul className="p-1.5">
            {[
              { label: '📋 Salin Link', action: copyLink },
              { label: '💬 WhatsApp', action: shareWhatsApp },
              { label: '🐦 Twitter/X', action: shareTwitter },
              { label: '📘 Facebook', action: shareFacebook },
              { label: '📩 Email', action: shareEmail },
            ].map(({ label, action }) => (
              <li key={label}>
                <button
                  onClick={action}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg
                             text-slate-700 dark:text-slate-300
                             hover:bg-slate-100 dark:hover:bg-dark-panel transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  )
}
