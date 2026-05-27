// app/cari/page.tsx
import { Suspense } from 'react'
import { getAllBooks } from '@/lib/books'
import { SearchClient } from '@/components/books/SearchClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cari Buku',
  description: 'Cari buku gratis di perpustakaan SayfullXD Digital.',
  robots: { index: false },
}

interface Props {
  searchParams: { q?: string }
}

export default function CariPage({ searchParams }: Props) {
  const books = getAllBooks()
  const q = searchParams.q ?? ''

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Cari Buku
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Cari dari {books.length} buku berdasarkan judul, penulis, atau topik
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-16 text-slate-400">Loading...</div>}>
        <SearchClient allBooks={books} initialQuery={q} />
      </Suspense>
    </div>
  )
}
