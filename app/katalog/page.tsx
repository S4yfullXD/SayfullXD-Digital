// app/katalog/page.tsx
import { getAllBooks, getCategoryCounts, SYSTEM_CONSTANTS } from '@/lib/books'
import { BookGrid } from '@/components/books/BookGrid'
import { CategoryPanel } from '@/components/layout/CategoryPanel'
import { AdBanner } from '@/components/ui/AdBanner'
import type { Metadata } from 'next'

export const revalidate = SYSTEM_CONSTANTS.ISR_REVALIDATE

export const metadata: Metadata = {
  title: 'Katalog Buku',
  description: 'Jelajahi semua buku gratis di perpustakaan SayfullXD Digital.',
}

export default function KatalogPage() {
  const books = getAllBooks()
  const categoryCounts = getCategoryCounts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Semua Buku
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {books.length} buku tersedia, gratis untuk dibaca & diunduh
        </p>
      </div>

      <div className="flex gap-8">
        <CategoryPanel categoryCounts={categoryCounts} activeCategory={null} />

        <div className="flex-1 min-w-0">
          {/* Pills – mobile */}
          <div className="lg:hidden -mx-4 px-4 mb-6">
            <CategoryPanel mode="pills" categoryCounts={categoryCounts} activeCategory={null} />
          </div>

          <AdBanner slot="1111111111" format="horizontal" />
          <BookGrid books={books} emptyMessage="Belum ada buku di katalog." />
          <AdBanner slot="2222222222" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
