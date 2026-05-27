// app/buku/[slug]/baca/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllBooks, getBookBySlug, splitIntoChapters } from '@/lib/books'
import { SYSTEM_CONSTANTS } from '@/lib/constants'
import { ReaderClient } from '@/components/reader/ReaderClient'
import { FiArrowLeft } from 'react-icons/fi'
import type { Metadata } from 'next'

export const revalidate = SYSTEM_CONSTANTS.ISR_REVALIDATE

export function generateStaticParams() {
  return getAllBooks().map((b) => ({ slug: b.slug }))
}

interface Props {
  params: { slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const book = getBookBySlug(params.slug)
  if (!book) return { title: 'Buku Tidak Ditemukan' }
  return {
    title: `Baca: ${book.title}`,
    description: `Baca ${book.title} oleh ${book.author} gratis di SayfullXD Digital.`,
    robots: { index: false }, // reader page tidak perlu diindex
  }
}

export default function BacaPage({ params }: Props) {
  const book = getBookBySlug(params.slug)
  if (!book) notFound()

  // Split content per bab berdasarkan ## heading
  const rawChapters = splitIntoChapters(book.content)

  // Jika tidak ada pembagian bab, jadikan seluruh konten sebagai 1 bab
  const contentByChapter =
    rawChapters.length > 0
      ? rawChapters
      : [book.content]

  const chapterTitles =
    book.chapters?.length > 0
      ? book.chapters
      : contentByChapter.map((_, i) => `Bagian ${i + 1}`)

  return (
    <div>
      {/* Reader header */}
      <div className="border-b dark:border-dark-border bg-white dark:bg-dark-bg px-4 py-3">
        <div className="max-w-reader mx-auto flex items-center gap-3">
          <Link
            href={`/buku/${book.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400
                       hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft size={15} />
            Kembali
          </Link>
          <span className="text-slate-300 dark:text-dark-border">|</span>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
            {book.title}
          </p>
          <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block shrink-0">
            {book.author}
          </span>
        </div>
      </div>

      {/* Reader */}
      <ReaderClient
        slug={book.slug}
        title={book.title}
        author={book.author}
        chapters={chapterTitles}
        contentByChapter={contentByChapter}
      />
    </div>
  )
}
