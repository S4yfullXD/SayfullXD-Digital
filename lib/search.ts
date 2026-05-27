// lib/search.ts
import Fuse from 'fuse.js'
import { Book } from '@/types/book'

let fuseInstance: Fuse<Book> | null = null

export function buildSearchIndex(books: Book[]): Fuse<Book> {
  fuseInstance = new Fuse(books, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'author', weight: 0.3 },
      { name: 'description', weight: 0.2 },
      { name: 'tags', weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  })
  return fuseInstance
}

export function searchBooks(fuse: Fuse<Book>, query: string): Book[] {
  if (!query.trim()) return []
  return fuse.search(query).map((r) => r.item)
}

export function getOrBuildIndex(books: Book[]): Fuse<Book> {
  if (!fuseInstance) {
    fuseInstance = buildSearchIndex(books)
  }
  return fuseInstance
}
