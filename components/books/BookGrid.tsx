// components/books/BookGrid.tsx
import { Book } from '@/types/book'
import { BookCard } from './BookCard'

interface BookGridProps {
  books: Book[]
  emptyMessage?: string
}

export function BookGrid({ books, emptyMessage = 'Belum ada buku.' }: BookGridProps) {
  if (!books.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">📭</span>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <BookCard key={book.slug} book={book} />
      ))}
    </div>
  )
}
