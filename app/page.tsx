// app/page.tsx
import Link from 'next/link'
import { FiArrowRight, FiBookOpen, FiDownload, FiUsers } from 'react-icons/fi'
import { getRecentBooks, getPopularBooks, getCategoryCounts } from '@/lib/books'
import { SYSTEM_CONSTANTS } from '@/lib/constants'
import { BookGrid } from '@/components/books/BookGrid'
import { CategoryPanel } from '@/components/layout/CategoryPanel'
import { AdBanner } from '@/components/ui/AdBanner'
import type { Metadata } from 'next'

export const revalidate = SYSTEM_CONSTANTS.ISR_REVALIDATE

export const metadata: Metadata = {
  title: 'SayfullXD Digital – Baca Lebih Banyak, Gratis Selamanya',
  description:
    'Perpustakaan ebook gratis dan legal. Ribuan buku public domain: filsafat, sastra, sains, sejarah. Baca langsung di browser, tanpa registrasi.',
}

export default function HomePage() {
  const recentBooks = getRecentBooks(12)
  const popularBooks = getPopularBooks(8)
  const categoryCounts = getCategoryCounts()
  const totalBooks = recentBooks.length + popularBooks.length

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 rounded-full
                            px-3 py-1 text-xs font-medium mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Semua buku gratis & legal
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Baca Lebih Banyak,{' '}
              <span className="text-yellow-300">Gratis Selamanya</span>
            </h1>
            <p className="text-lg text-indigo-100 leading-relaxed mb-8 max-w-lg">
              Perpustakaan digital dengan ribuan buku klasik dan kontemporer.
              Public domain, tanpa registrasi, tanpa batas.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: <FiBookOpen size={18} />, label: `${Object.values(categoryCounts).reduce((a, b) => a + b, 0)}+ Buku`, desc: 'siap dibaca' },
                { icon: <FiDownload size={18} />, label: 'Gratis', desc: 'unduh & baca' },
                { icon: <FiUsers size={18} />, label: 'Tanpa Akun', desc: 'langsung baca' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg">{icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{label}</p>
                    <p className="text-xs text-indigo-200">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 bg-white text-indigo-600
                           font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50
                           transition-colors shadow-lg shadow-indigo-900/20"
              >
                Jelajah Katalog
                <FiArrowRight size={16} />
              </Link>
              <Link
                href="/cari"
                className="inline-flex items-center gap-2 bg-white/10 text-white
                           font-semibold px-6 py-3 rounded-xl border border-white/20
                           hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Cari Buku
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-8">
          {/* Category Sidebar */}
          <CategoryPanel categoryCounts={categoryCounts} />

          {/* Content area */}
          <div className="flex-1 min-w-0">
            {/* Pills – mobile only */}
            <div className="lg:hidden -mx-4 px-4 mb-6">
              <CategoryPanel mode="pills" categoryCounts={categoryCounts} />
            </div>

            {/* Ad top */}
            <AdBanner slot="1234567890" format="horizontal" />

            {/* Buku Terbaru */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Buku Terbaru
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Baru ditambahkan ke perpustakaan
                  </p>
                </div>
                <Link
                  href="/katalog"
                  className="text-sm text-indigo-600 dark:text-accent-dark font-medium
                             hover:underline flex items-center gap-1"
                >
                  Lihat semua <FiArrowRight size={14} />
                </Link>
              </div>
              <BookGrid books={recentBooks} />
            </section>

            {/* Ad middle */}
            <AdBanner slot="2345678901" />

            {/* Buku Klasik Populer */}
            {popularBooks.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Klasik Populer
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Karya abadi yang wajib dibaca
                    </p>
                  </div>
                </div>
                <BookGrid books={popularBooks} />
              </section>
            )}

            {/* CTA Support */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50
                            dark:from-indigo-950/30 dark:to-violet-950/30
                            border border-indigo-100 dark:border-indigo-900/30 p-6 text-center">
              <p className="text-2xl mb-2">☕</p>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Suka SayfullXD Digital?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Dukung kami agar bisa terus menyediakan buku gratis untuk semua orang.
              </p>
              <Link
                href="/dukung"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                           text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
              >
                Dukung Kami ❤️
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
