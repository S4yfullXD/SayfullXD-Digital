'use client'
// components/books/BookmarkButton.tsx
import { useState, useEffect } from 'react'
import { FiBookmark } from 'react-icons/fi'
import { STORAGE_KEYS } from '@/lib/books'
import { Bookmark } from '@/types/book'

interface BookmarkButtonProps {
  slug: string
  chapterIndex: number
  scrollY?: number
  size?: 'sm' | 'md'
}

export function BookmarkButton({
  slug,
  chapterIndex,
  scrollY = 0,
  size = 'md',
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)

  const key = STORAGE_KEYS.bookmark(slug)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const bm: Bookmark = JSON.parse(raw)
        setBookmarked(bm.chapter === chapterIndex)
      }
    } catch {}
  }, [key, chapterIndex])

  function toggle() {
    try {
      if (bookmarked) {
        localStorage.removeItem(key)
        setBookmarked(false)
      } else {
        const bm: Bookmark = {
          chapter: chapterIndex,
          scrollY,
          lastRead: new Date().toISOString(),
        }
        localStorage.setItem(key, JSON.stringify(bm))
        setBookmarked(true)
      }
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-lg transition-colors
        ${bookmarked
          ? 'text-indigo-600 dark:text-accent-dark bg-indigo-50 dark:bg-indigo-900/30'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surface'
        }
        ${size === 'sm' ? 'p-1.5 text-xs' : 'px-3 py-2 text-sm'}`}
      aria-label={bookmarked ? 'Hapus bookmark' : 'Tambah bookmark'}
      aria-pressed={bookmarked}
    >
      <FiBookmark
        size={size === 'sm' ? 13 : 15}
        fill={bookmarked ? 'currentColor' : 'none'}
      />
      {size === 'md' && <span>{bookmarked ? 'Tersimpan' : 'Bookmark'}</span>}
    </button>
  )
}
