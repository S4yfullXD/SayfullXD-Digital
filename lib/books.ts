// lib/books.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Book, BookCategory } from '@/types/book'

const booksDir = path.join(process.cwd(), '_data', 'books')

export function getAllBooks(): Book[] {
  if (!fs.existsSync(booksDir)) return []

  return fs
    .readdirSync(booksDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const raw = fs.readFileSync(path.join(booksDir, filename), 'utf8')
      const { data, content } = matter(raw)
      return { slug, ...data, content } as Book
    })
    .sort(
      (a, b) =>
        new Date(b.added_date).getTime() - new Date(a.added_date).getTime()
    )
}

export function getBookBySlug(slug: string): Book | undefined {
  try {
    const raw = fs.readFileSync(
      path.join(booksDir, `${slug}.md`),
      'utf8'
    )
    const { data, content } = matter(raw)
    return { slug, ...data, content } as Book
  } catch {
    return undefined
  }
}

export function getBooksByCategory(category: BookCategory): Book[] {
  return getAllBooks().filter((b) => b.category === category)
}

export function getRelatedBooks(book: Book, limit = 4): Book[] {
  return getAllBooks()
    .filter((b) => b.slug !== book.slug && b.category === book.category)
    .slice(0, limit)
}

export function getRecentBooks(limit = 12): Book[] {
  return getAllBooks().slice(0, limit)
}

export function getPopularBooks(limit = 8): Book[] {
  return getAllBooks()
    .filter((b) => b.published_year)
    .sort((a, b) => (a.published_year ?? 9999) - (b.published_year ?? 9999))
    .slice(0, limit)
}

export function getCategoryCounts(): Record<string, number> {
  const books = getAllBooks()
  const counts: Record<string, number> = {}
  for (const book of books) {
    counts[book.category] = (counts[book.category] ?? 0) + 1
  }
  return counts
}

export function splitIntoChapters(content: string): string[] {
  const parts = content.split(/^(?=## )/m).filter(Boolean)
  return parts
}

export function estimateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export function generateSlug(title: string, author: string): string {
  const lastName = author.split(' ').pop() ?? author
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 5)
    .join('-')
  const authorSlug = lastName.toLowerCase().replace(/[^a-z0-9]/g, '')
  return `${titleSlug}-${authorSlug}`
}

// CATATAN: SYSTEM_CONSTANTS dan STORAGE_KEYS ada di lib/constants.ts
// Import dari sana langsung untuk client components.
