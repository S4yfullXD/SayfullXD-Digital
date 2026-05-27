// lib/sources/openlibrary.ts
import { generateSlug, estimateReadingTime } from '@/lib/books'
import { BookCategory } from '@/types/book'
import { ProcessedBook } from './gutenberg'
import { generateMarkdownFile, convertToMarkdown } from './gutenberg'

const OL_API = 'https://openlibrary.org'
const COVERS_API = 'https://covers.openlibrary.org/b/id'
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

interface OLSearchResult {
  key: string
  title: string
  author_name?: string[]
  subject?: string[]
  ia?: string[]
  public_scan_b?: boolean
  cover_i?: number
  first_publish_year?: number
  edition_key?: string[]
}

export async function fetchOpenLibrary(
  options: { limit?: number } = {}
): Promise<ProcessedBook[]> {
  const { limit = 10 } = options

  try {
    const url = `${OL_API}/search.json?q=subject:public_domain&has_fulltext=true&limit=${limit * 2}`
    const res = await fetch(url, {
      next: { revalidate: 0 },
      headers: { 'User-Agent': 'SayfullXD-Digital/1.0 (educational)' },
    })
    if (!res.ok) throw new Error(`OpenLibrary HTTP ${res.status}`)
    const data = await res.json()

    const results: ProcessedBook[] = []
    for (const doc of (data.docs as OLSearchResult[]).slice(0, limit * 2)) {
      if (results.length >= limit) break
      await delay(1000) // etika: 1 detik antar request

      const processed = processOLBook(doc)
      if (processed) results.push(processed)
    }
    return results
  } catch (err) {
    console.error('[OpenLibrary] Fetch error:', err)
    return []
  }
}

function processOLBook(doc: OLSearchResult): ProcessedBook | null {
  // Validasi: harus public scan dan ada penulis
  if (!doc.public_scan_b) return null
  if (!doc.author_name?.length) return null
  if (!doc.title) return null

  const author = doc.author_name[0]
  const slug = generateSlug(doc.title, author)

  const coverUrl = doc.cover_i
    ? `${COVERS_API}/${doc.cover_i}-L.jpg`
    : null

  const category = detectCategoryOL(doc.subject ?? [])

  return {
    id: doc.key,
    slug,
    title: doc.title,
    author,
    category,
    tags: (doc.subject ?? []).slice(0, 5).map((s) =>
      s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
    ),
    description: `${doc.title} oleh ${author}. Tersedia gratis dari Open Library.`,
    coverUrl,
    textUrl: doc.ia?.[0]
      ? `https://archive.org/download/${doc.ia[0]}/${doc.ia[0]}.txt`
      : null,
    source: 'openlibrary' as const,
    license: 'public-domain' as const,
    originalId: doc.key.replace('/works/', ''),
    language: 'en',
  }
}

function detectCategoryOL(subjects: string[]): BookCategory {
  const joined = subjects.join(' ').toLowerCase()
  if (joined.includes('philosoph')) return 'Filsafat'
  if (joined.includes('fiction') || joined.includes('novel')) return 'Cerita'
  if (joined.includes('science')) return 'Sains'
  if (joined.includes('history')) return 'Sejarah'
  if (joined.includes('biography') || joined.includes('autobiograph')) return 'Biografi'
  if (joined.includes('poetry') || joined.includes('poem')) return 'Puisi'
  if (joined.includes('religion') || joined.includes('spiritual')) return 'Agama & Spiritualitas'
  if (joined.includes('drama') || joined.includes('play')) return 'Drama & Teater'
  return 'Lainnya'
}

export { generateMarkdownFile, convertToMarkdown }
