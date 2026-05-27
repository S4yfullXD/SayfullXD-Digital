'use client'
// components/reader/ReaderClient.tsx
import { useState, useEffect, useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { FiChevronLeft, FiChevronRight, FiList } from 'react-icons/fi'
import { FontSizeControl } from '@/components/ui/FontSizeControl'
import { BookmarkButton } from '@/components/books/BookmarkButton'
import { ShareButton } from '@/components/ui/ShareButton'
import { SupportModal } from '@/components/ui/SupportModal'
import { AdBanner } from '@/components/ui/AdBanner'
import { STORAGE_KEYS } from '@/lib/constants'
import { ReadingProgress } from '@/types/book'

interface ReaderClientProps {
  slug: string
  title: string
  author: string
  chapters: string[]
  contentByChapter: string[]
}

type FontSize = 'S' | 'M' | 'L' | 'XL'

const FONT_CLASS: Record<FontSize, string> = {
  S: 'reader-font-s',
  M: 'reader-font-m',
  L: 'reader-font-l',
  XL: 'reader-font-xl',
}

// Support modal muncul setelah bab ke-2 dibaca, sekali per sesi
const SUPPORT_TRIGGER_CHAPTER = 1

export function ReaderClient({
  slug,
  title,
  author,
  chapters,
  contentByChapter,
}: ReaderClientProps) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [fontSize, setFontSize] = useState<FontSize>('M')
  const [showTOC, setShowTOC] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [chaptersRead, setChaptersRead] = useState<Set<number>>(new Set())
  const contentRef = useRef<HTMLDivElement>(null)
  const tocRef = useRef<HTMLDivElement>(null)

  const progressKey = STORAGE_KEYS.readingProgress(slug)

  // Load saved progress on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(progressKey)
      if (raw) {
        const saved: ReadingProgress = JSON.parse(raw)
        if (saved.chaptersRead?.length) {
          setChaptersRead(new Set(saved.chaptersRead))
        }
      }

      // Restore bookmark position
      const bmRaw = localStorage.getItem(STORAGE_KEYS.bookmark(slug))
      if (bmRaw) {
        const bm = JSON.parse(bmRaw)
        if (typeof bm.chapter === 'number') {
          setCurrentChapter(bm.chapter)
        }
      }
    } catch {}
  }, [progressKey, slug])

  // Save progress when chapter changes
  useEffect(() => {
    const newRead = new Set(chaptersRead).add(currentChapter)
    setChaptersRead(newRead)

    const percent = Math.round((newRead.size / Math.max(chapters.length, 1)) * 100)
    try {
      const progress: ReadingProgress = {
        percent,
        chaptersRead: Array.from(newRead),
      }
      localStorage.setItem(progressKey, JSON.stringify(progress))
    } catch {}

    // Scroll to top of content
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Trigger support modal
    if (
      currentChapter >= SUPPORT_TRIGGER_CHAPTER &&
      !sessionStorage.getItem(STORAGE_KEYS.supportModalShown)
    ) {
      setShowSupportModal(true)
    }
  }, [currentChapter]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close TOC on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (tocRef.current && !tocRef.current.contains(e.target as Node)) {
        setShowTOC(false)
      }
    }
    if (showTOC) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showTOC])

  const handleFontChange = useCallback((size: FontSize) => {
    setFontSize(size)
  }, [])

  const progress = Math.round(
    (chaptersRead.size / Math.max(chapters.length, 1)) * 100
  )

  const content = contentByChapter[currentChapter] ?? ''

  return (
    <>
      {/* Support modal */}
      {showSupportModal && (
        <SupportModal
          onClose={() => setShowSupportModal(false)}
          onContinue={() => setShowSupportModal(false)}
        />
      )}

      <div className="max-w-reader mx-auto px-4 py-8">
        {/* Reader toolbar */}
        <div className="sticky top-16 z-30 -mx-4 px-4 py-3 mb-6
                        bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md
                        border-b dark:border-dark-border flex items-center gap-3">
          {/* TOC button */}
          <div className="relative" ref={tocRef}>
            <button
              onClick={() => setShowTOC(!showTOC)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg
                         border dark:border-dark-border text-slate-600 dark:text-slate-400
                         hover:bg-slate-50 dark:hover:bg-dark-surface transition-colors"
              aria-label="Daftar Isi"
              aria-expanded={showTOC}
            >
              <FiList size={14} />
              <span className="hidden sm:inline">Daftar Isi</span>
            </button>

            {/* TOC Dropdown */}
            {showTOC && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-dark-surface
                              border dark:border-dark-border rounded-xl shadow-xl z-50
                              animate-scale-in origin-top-left">
                <div className="p-2 max-h-80 overflow-y-auto">
                  {chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentChapter(idx)
                        setShowTOC(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                        ${idx === currentChapter
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-accent-dark font-medium'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-panel'
                        }`}
                    >
                      <span className="text-xs text-slate-400 mr-2 tabular-nums">
                        {idx + 1}.
                      </span>
                      {ch}
                      {chaptersRead.has(idx) && (
                        <span className="ml-2 text-indigo-400 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chapter indicator */}
          <span className="text-sm text-slate-500 dark:text-slate-400 truncate flex-1">
            <span className="text-slate-400 dark:text-slate-500 text-xs mr-1">
              {currentChapter + 1}/{chapters.length}
            </span>
            {chapters[currentChapter]}
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <FontSizeControl onChange={handleFontChange} />
            <BookmarkButton slug={slug} chapterIndex={currentChapter} />
            <ShareButton title={title} slug={slug} size="sm" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>{title} · {author}</span>
            <span>{progress}% selesai</span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-dark-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Ad – before content (not bab pertama, sesuai aturan) */}
        {currentChapter > 0 && (
          <AdBanner slot="3456789012" format="horizontal" />
        )}

        {/* Content */}
        <div
          ref={contentRef}
          className={`font-serif prose prose-slate dark:prose-invert max-w-none
                      ${FONT_CLASS[fontSize]}
                      prose-headings:font-sans prose-headings:font-semibold
                      prose-a:text-indigo-600 dark:prose-a:text-accent-dark
                      prose-blockquote:border-indigo-300`}
        >
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {content}
          </ReactMarkdown>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t dark:border-dark-border">
          <button
            onClick={() => setCurrentChapter((c) => Math.max(0, c - 1))}
            disabled={currentChapter === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       border dark:border-dark-border transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed
                       enabled:hover:bg-slate-50 dark:enabled:hover:bg-dark-surface
                       text-slate-700 dark:text-slate-300"
          >
            <FiChevronLeft size={16} />
            Sebelumnya
          </button>

          <span className="text-sm text-slate-400">
            {currentChapter + 1} / {chapters.length}
          </span>

          <button
            onClick={() => setCurrentChapter((c) => Math.min(chapters.length - 1, c + 1))}
            disabled={currentChapter === chapters.length - 1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       border dark:border-dark-border transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed
                       enabled:hover:bg-slate-50 dark:enabled:hover:bg-dark-surface
                       text-slate-700 dark:text-slate-300"
          >
            Selanjutnya
            <FiChevronRight size={16} />
          </button>
        </div>

        {/* Ad – after content */}
        <AdBanner slot="4567890123" format="auto" className="mt-8" />
      </div>
    </>
  )
}
