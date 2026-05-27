// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllBooks } from '@/lib/books'
import { ALL_CATEGORIES } from '@/types/book'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sayfullxd-digital.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const books = getAllBooks()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/katalog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/cari`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/dukung`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/bantuan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]

  const categoryPages: MetadataRoute.Sitemap = ALL_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/kategori/${cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'dan')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const bookPages: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${BASE_URL}/buku/${book.slug}`,
    lastModified: new Date(book.added_date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...bookPages]
}
