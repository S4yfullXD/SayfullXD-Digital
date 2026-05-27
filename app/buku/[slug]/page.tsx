// app/buku/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBooks, getBookBySlug, getRelatedBooks } from '@/lib/books'
import { SYSTEM_CONSTANTS } from '@/lib/constants'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { ShareButton } from '@/components/ui/ShareButton'
import { BookGrid } from '@/components/books/BookGrid'
import { AdBanner } from '@/components/ui/AdBanner'
import { FiBookOpen, FiDownload, FiClock } from 'react-icons/fi'
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
    title: `${book.title} – ${book.author}`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [{ url: `/covers/${book.cover_image}` }],
    },
  }
}

export default function BookDetailPage({ params }: Props) {
  const book = getBookBySlug(params.slug)
  if (!book) notFound()

  const related = getRelatedBooks(book, 4)

  const licenseLabel: Record<string, string> = {
    'public-domain': 'Public Domain',
    'cc-by': 'CC BY',
    'cc-by-sa': 'CC BY-SA',
    'cc0': 'CC0',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-accent-dark transition-colors">
          Beranda
        </Link>
        <span>/</span>
        <Link href="/katalog" className="hover:text-indigo-600 dark:hover:text-accent-dark transition-colors">
          Katalog
        </Link>
        <span>/</span>
        <span className="text-slate-600 dark:text-slate-400 truncate max-w-xs">
          {book.title}
        </span>
      </nav>

      {/* Book info card */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        {/* Cover */}
        <div className="shrink-0">
          <div className="w-44 sm:w-52 aspect-[2/3] relative rounded-xl overflow-hidden
                          bg-slate-100 dark:bg-dark-surface shadow-xl mx-auto sm:mx-0">
            <Image
              src={`/covers/${book.cover_image}`}
              alt={`Cover ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 176px, 208px"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <CategoryBadge category={book.category} size="md" linked />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-3 mb-1 leading-tight">
            {book.title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-4">
            oleh{' '}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {book.author}
            </span>
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-5">
            <span className="flex items-center gap-1.5">
              <FiClock size={14} />
              {book.reading_time_minutes} menit baca
            </span>
            <span className="flex items-center gap-1.5">
              📖 {book.chapters.length} bab
            </span>
            <span className="flex items-center gap-1.5">
              🔖 {licenseLabel[book.license] ?? book.license}
            </span>
            {book.published_year && (
              <span className="flex items-center gap-1.5">
                📅 {book.published_year < 0 ? `${Math.abs(book.published_year)} SM` : book.published_year}
              </span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {book.description}
          </p>

          {/* Tags */}
          {book.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full
                             bg-slate-100 dark:bg-dark-surface
                             text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/buku/${book.slug}/baca`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <FiBookOpen size={18} />
              Baca Sekarang
            </Link>
            <a
              href={`/api/download/${book.download_file}`}
              className="inline-flex items-center gap-2 border dark:border-dark-border
                         text-slate-700 dark:text-slate-300 font-medium px-5 py-3 rounded-xl
                         hover:bg-slate-50 dark:hover:bg-dark-surface transition-colors"
            >
              <FiDownload size={18} />
              Unduh PDF
            </a>
            <ShareButton title={book.title} slug={book.slug} variant="outline" />
          </div>
        </div>
      </div>

      {/* Chapter list */}
      {book.chapters?.length > 0 && (
        <div className="mb-10 bg-surface dark:bg-dark-surface rounded-xl p-6 border dark:border-dark-border">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
            Daftar Isi ({book.chapters.length} bab)
          </h2>
          <ol className="divide-y dark:divide-dark-border">
            {book.chapters.map((ch, idx) => (
              <li key={idx}>
                <Link
                  href={`/buku/${book.slug}/baca?bab=${idx}`}
                  className="flex items-center gap-3 py-3 text-sm group"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-dark-panel
                                   flex items-center justify-center text-xs font-semibold
                                   text-slate-500 dark:text-slate-400 shrink-0">
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-slate-700 dark:text-slate-300
                                   group-hover:text-indigo-600 dark:group-hover:text-accent-dark
                                   transition-colors">
                    {ch}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-400
                                   transition-colors">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      <AdBanner slot="5555555555" format="horizontal" />

      {/* Related books */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
            Buku Serupa
          </h2>
          <BookGrid books={related} />
        </div>
      )}
    </div>
  )
}
