'use client'
// components/ui/SupportModal.tsx
import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { STORAGE_KEYS } from '@/lib/constants'

interface SupportModalProps {
  onClose: () => void
  onContinue: () => void
}

export function SupportModal({ onClose, onContinue }: SupportModalProps) {
  const trakteerUrl = process.env.NEXT_PUBLIC_TRAKTEER_URL ?? 'https://trakteer.id'
  const saweriaUrl = process.env.NEXT_PUBLIC_SAWERIA_URL ?? 'https://saweria.co'

  useEffect(() => {
    // Tandai sudah muncul di sesi ini
    sessionStorage.setItem(STORAGE_KEYS.supportModalShown, 'true')

    // Close on ESC
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleContinue()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleContinue() {
    onContinue()
    onClose()
  }

  function handleSupport(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
    onContinue()
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dukung SayfullXD Digital"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={handleContinue}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[400px] bg-white dark:bg-dark-surface
                      rounded-2xl shadow-2xl p-6 animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleContinue}
          className="absolute top-4 right-4 p-1 rounded-lg
                     text-slate-400 hover:text-slate-700 dark:hover:text-white
                     hover:bg-slate-100 dark:hover:bg-dark-panel transition-colors"
          aria-label="Tutup"
        >
          <FiX size={16} />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-4xl mb-3">❤️</div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Dukung SayfullXD Digital
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            Kami menyediakan ribuan buku gratis untuk semua orang.
            Jika ini membantumu, dukung dengan secangkir kopi virtual ☕
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleSupport(trakteerUrl)}
              className="w-full flex items-center justify-center gap-2 py-3 px-6
                         bg-orange-500 hover:bg-orange-600 text-white font-semibold
                         rounded-xl transition-colors"
            >
              ☕ Support via Trakteer
            </button>
            <button
              onClick={() => handleSupport(saweriaUrl)}
              className="w-full flex items-center justify-center gap-2 py-3 px-6
                         border-2 border-yellow-400 hover:bg-yellow-400/10
                         text-yellow-600 dark:text-yellow-400 font-semibold
                         rounded-xl transition-colors"
            >
              💛 Support via Saweria
            </button>
            <button
              onClick={handleContinue}
              className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300
                         transition-colors py-1"
            >
              Lanjutkan Membaca →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
