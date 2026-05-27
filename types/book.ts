// types/book.ts

export type BookCategory =
  | 'Filsafat'
  | 'Komik'
  | 'Cerita'
  | 'Sains'
  | 'Teknologi'
  | 'Motivasi'
  | 'Pengembangan Diri'
  | 'Sejarah'
  | 'Biografi'
  | 'Puisi'
  | 'Agama & Spiritualitas'
  | 'Drama & Teater'
  | 'Hukum & Politik'
  | 'Lainnya'

export type BookSource = 'gutenberg' | 'openlibrary' | 'manual'
export type BookLicense = 'public-domain' | 'cc-by' | 'cc-by-sa' | 'cc0'

export interface Book {
  slug: string
  title: string
  author: string
  category: BookCategory
  tags: string[]
  description: string
  cover_image: string
  download_file: string
  reading_time_minutes: number
  chapters: string[]
  source: BookSource
  license: BookLicense
  original_id?: string
  published_year?: number
  language?: string
  added_date: string
  content: string
}

export interface Bookmark {
  chapter: number
  scrollY: number
  lastRead: string
}

export interface ReadingProgress {
  percent: number
  chaptersRead: number[]
}

export const CATEGORY_META: Record<
  BookCategory,
  { icon: string; color: string }
> = {
  'Filsafat': { icon: '🏛️', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  'Komik': { icon: '🎨', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  'Cerita': { icon: '📖', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  'Sains': { icon: '🔬', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  'Teknologi': { icon: '💻', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  'Motivasi': { icon: '⚡', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
  'Pengembangan Diri': { icon: '🌱', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  'Sejarah': { icon: '📜', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  'Biografi': { icon: '👤', color: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300' },
  'Puisi': { icon: '✍️', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  'Agama & Spiritualitas': { icon: '🕌', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  'Drama & Teater': { icon: '🎭', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  'Hukum & Politik': { icon: '⚖️', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  'Lainnya': { icon: '📦', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300' },
}

export const ALL_CATEGORIES: BookCategory[] = [
  'Filsafat', 'Komik', 'Cerita', 'Sains', 'Teknologi',
  'Motivasi', 'Pengembangan Diri', 'Sejarah', 'Biografi',
  'Puisi', 'Agama & Spiritualitas', 'Drama & Teater',
  'Hukum & Politik', 'Lainnya',
]
