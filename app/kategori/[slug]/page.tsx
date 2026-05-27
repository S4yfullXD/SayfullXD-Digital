// app/kategori/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getBooksByCategory, getCategoryCounts, SYSTEM_CONSTANTS } from '@/lib/books'
import { ALL_CATEGORIES, CATEGORY_META, BookCategory } from '@/types/book'
import { BookGrid } from '@/components/books/BookGrid'
import { CategoryPanel } from '@/components/layout/CategoryPanel'
import { AdBanner } from '@/components/ui/AdBanner'
import type { Metadata } from 'next'

export const revalidate = SYSTEM_CONSTANTS.ISR_REVALIDATE

// Pre-generate semua kategori
export function generateStaticParams() {
  return ALL_CATEGORIES.map((cat) => ({
    slug: cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'dan'),
  }))
}

function resolveCategory(slug: string): BookCategory | null {
  return (
    ALL_CATEGORIES.find(
      (cat) =>
        cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'dan') === slug
    ) ?? null
  )
}

interface Props {
  params: { slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = resolveCategory(params.slug)
  if (!cat) return { title: 'Kategori Tidak Ditemukan' }
  const meta = CATEGORY_META[cat]
  return {
    title: `Buku ${cat}`,
    description: `Koleksi buku ${cat} gratis di SayfullXD Digital. ${meta.icon}`,
  }
}

export default function KategoriPage({ params }: Props) {
  const category = resolveCategory(params.slug)
  if (!category) notFound()

  const books = getBooksByCategory(category)
  const categoryCounts = getCategoryCounts()
  const meta = CATEGORY_META[category]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 flex items-center gap-3">
        <span className="text-4xl">{meta.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {category}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
            {books.length} buku · gratis
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        <CategoryPanel categoryCounts={categoryCounts} activeCategory={category} />

        <div className="flex-1 min-w-0">
          {/* Pills – mobile */}
          <div className="lg:hidden -mx-4 px-4 mb-6">
            <CategoryPanel
              mode="pills"
              categoryCounts={categoryCounts}
              activeCategory={category}
            />
          </div>

          <AdBanner slot="3333333333" format="horizontal" />
          <BookGrid
            books={books}
            emptyMessage={`Belum ada buku kategori ${category}.`}
          />
          <AdBanner slot="4444444444" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
