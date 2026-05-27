'use client'
// components/books/BookCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { FiBookOpen, FiDownload } from 'react-icons/fi'
import { Book } from '@/types/book'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { ShareButton } from '@/components/ui/ShareButton'
import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const [progress, setProgress] = useState<number | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.readingProgress(book.slug))
      if (raw) {
        const data = JSON.parse(raw)
        setProgress(data.percent ?? null)
      }
    } catch {
      // localStorage unavailable
    }
  }, [book.slug])

  const coverSrc = `/covers/${book.cover_image}`

  return (
    <article className="group flex flex-col bg-surface dark:bg-dark-surface rounded-xl overflow-hidden
                         border border-slate-100 dark:border-dark-border
                         hover:shadow-lg dark:hover:shadow-dark-border/20
                         hover:-translate-y-0.5 transition-all duration-200">
      {/* Cover */}
      <Link href={`/buku/${book.slug}`} className="block overflow-hidden aspect-[2/3] relative bg-slate-100 dark:bg-dark-panel">
        <Image
          src={coverSrc}
          alt={`Cover buku ${book.title} oleh ${book.author}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          onError={(e) => {
            // Fallback ke placeholder jika cover tidak ada
            const img = e.target as HTMLImageElement
            img.style.display = 'none'
          }}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Reading progress bar */}
        {progress !== null && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full bg-indigo-500 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3">
        <CategoryBadge category={book.category} linked />
        <Link href={`/buku/${book.slug}`}>
          <h3 className="mt-1.5 font-semibold text-sm leading-snug text-slate-900 dark:text-white
                          line-clamp-2 hover:text-indigo-600 dark:hover:text-accent-dark transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
          {book.author}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t dark:border-dark-border">
          <Link
            href={`/buku/${book.slug}`}
            className="flex items-center gap-1 flex-1 justify-center py-1.5 px-2
                       bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold
                       rounded-lg transition-colors"
          >
            <FiBookOpen size={12} />
            <span>Baca</span>
          </Link>
          <a
            href={`/api/download/${book.download_file}`}
            className="flex items-center gap-1 py-1.5 px-2
                       border dark:border-dark-border text-slate-600 dark:text-slate-400
                       hover:bg-slate-50 dark:hover:bg-dark-panel text-xs font-medium
                       rounded-lg transition-colors"
            aria-label={`Unduh ${book.title}`}
          >
            <FiDownload size={12} />
          </a>
          <ShareButton title={book.title} slug={book.slug} size="sm" />
        </div>
      </div>
    </article>
  )
}
