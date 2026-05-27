'use client'
// components/books/SearchClient.tsx
import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiSearch, FiX } from 'react-icons/fi'
import { Book } from '@/types/book'
import { buildSearchIndex, searchBooks } from '@/lib/search'
import { BookGrid } from './BookGrid'
import { SYSTEM_CONSTANTS } from '@/lib/books'

interface SearchClientProps {
  allBooks: Book[]
  initialQuery?: string
}

export function SearchClient({ allBooks, initialQuery = '' }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Book[]>([])
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const fuse = useMemo(() => buildSearchIndex(allBooks), [allBooks])

  // Focus on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Run search when URL query changes
  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    if (q.trim()) {
      setResults(searchBooks(fuse, q))
      setSearched(true)
    } else {
      setResults([])
      setSearched(false)
    }
  }, [searchParams, fuse])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        const res = searchBooks(fuse, value)
        setResults(res)
        setSearched(true)
        router.replace(`/cari?q=${encodeURIComponent(value.trim())}`, { scroll: false })
      } else {
        setResults([])
        setSearched(false)
        router.replace('/cari', { scroll: false })
      }
    }, SYSTEM_CONSTANTS.SEARCH_DEBOUNCE_MS)
  }

  function clear() {
    setQuery('')
    setResults([])
    setSearched(false)
    router.replace('/cari', { scroll: false })
    inputRef.current?.focus()
  }

  return (
    <div>
      {/* Search input */}
      <div className="relative max-w-xl mx-auto mb-8">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          placeholder="Cari judul, penulis, atau topik..."
          className="w-full pl-12 pr-12 py-3.5 rounded-xl border dark:border-dark-border
                     bg-white dark:bg-dark-surface text-slate-900 dark:text-white
                     placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
                     text-base shadow-sm"
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-4 top-1/2 -translate-y-1/2
                       text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            aria-label="Hapus pencarian"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Results */}
      {!searched && (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">Ketik sesuatu untuk mulai mencari</p>
          <p className="text-xs mt-1 text-slate-300 dark:text-slate-600">
            {allBooks.length} buku tersedia
          </p>
        </div>
      )}

      {searched && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Tidak ada buku yang cocok dengan &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Coba kata kunci yang berbeda
          </p>
        </div>
      )}

      {searched && results.length > 0 && (
        <>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {results.length} hasil untuk <strong>&ldquo;{query}&rdquo;</strong>
          </p>
          <BookGrid books={results} />
        </>
      )}
    </div>
  )
}
