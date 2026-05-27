// lib/sources/gutenberg.ts
import { generateSlug, estimateReadingTime } from '@/lib/books'
import { BookCategory } from '@/types/book'

const GUTENDEX_URL = 'https://gutendex.com/books'
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export interface GutenbergBook {
  id: number
  title: string
  authors: { name: string; birth_year?: number; death_year?: number }[]
  subjects: string[]
  formats: Record<string, string>
  download_count: number
  languages: string[]
  copyright: boolean
}

interface FetchOptions {
  limit?: number
  page?: number
  languages?: string
}

export async function fetchGutenberg(
  options: FetchOptions = {}
): Promise<ProcessedBook[]> {
  const { limit = 10, page = 1, languages = 'en' } = options

  try {
    const url = `${GUTENDEX_URL}?copyright=false&languages=${languages}&page=${page}&mime_type=text%2Fplain`
    const res = await fetch(url, {
      next: { revalidate: 0 },
      headers: { 'User-Agent': 'SayfullXD-Digital/1.0 (educational)' },
    })

    if (!res.ok) throw new Error(`Gutendex HTTP ${res.status}`)
    const data = await res.json()

    const results: ProcessedBook[] = []
    for (const book of (data.results as GutenbergBook[]).slice(0, limit)) {
      await delay(2000) // etika: 2 detik antar request
      const processed = processGutenbergBook(book)
      if (processed) results.push(processed)
    }
    return results
  } catch (err) {
    console.error('[Gutenberg] Fetch error:', err)
    return []
  }
}

function processGutenbergBook(book: GutenbergBook): ProcessedBook | null {
  if (book.copyright === true) return null // masih berhak cipta
  if (!book.authors.length) return null
  if (!book.title) return null

  const author = book.authors[0].name.replace(/,\s*/, ' ').trim()
  const slug = generateSlug(book.title, author)

  // Cari format teks untuk konten
  const textUrl =
    book.formats['text/plain; charset=utf-8'] ??
    book.formats['text/plain; charset=us-ascii'] ??
    book.formats['text/plain'] ??
    null

  // Cari cover image
  const coverUrl =
    book.formats['image/jpeg'] ??
    book.formats['image/png'] ??
    null

  // Deteksi kategori dari subjects
  const category = detectCategory(book.subjects)

  return {
    id: String(book.id),
    slug,
    title: book.title,
    author,
    category,
    tags: book.subjects.slice(0, 5).map((s) =>
      s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
    ),
    description: `${book.title} adalah karya klasik ${author}. Salah satu dari koleksi public domain Project Gutenberg.`,
    coverUrl,
    textUrl,
    source: 'gutenberg' as const,
    license: 'public-domain' as const,
    originalId: String(book.id),
    language: book.languages[0] ?? 'en',
    downloadCount: book.download_count,
  }
}

function detectCategory(subjects: string[]): BookCategory {
  const joined = subjects.join(' ').toLowerCase()
  if (joined.includes('philosoph')) return 'Filsafat'
  if (joined.includes('comic') || joined.includes('cartoon')) return 'Komik'
  if (joined.includes('fiction') || joined.includes('novel') || joined.includes('story')) return 'Cerita'
  if (joined.includes('science') || joined.includes('biology') || joined.includes('physics')) return 'Sains'
  if (joined.includes('technology') || joined.includes('computer') || joined.includes('engineering')) return 'Teknologi'
  if (joined.includes('self-help') || joined.includes('motivation')) return 'Motivasi'
  if (joined.includes('history') || joined.includes('historical')) return 'Sejarah'
  if (joined.includes('biography') || joined.includes('autobiograph')) return 'Biografi'
  if (joined.includes('poetry') || joined.includes('poem') || joined.includes('verse')) return 'Puisi'
  if (joined.includes('religion') || joined.includes('spiritual') || joined.includes('theology')) return 'Agama & Spiritualitas'
  if (joined.includes('drama') || joined.includes('play') || joined.includes('theatre')) return 'Drama & Teater'
  if (joined.includes('law') || joined.includes('politics') || joined.includes('government')) return 'Hukum & Politik'
  return 'Lainnya'
}

export interface ProcessedBook {
  id: string
  slug: string
  title: string
  author: string
  category: BookCategory
  tags: string[]
  description: string
  coverUrl: string | null
  textUrl: string | null
  source: 'gutenberg' | 'openlibrary'
  license: 'public-domain' | 'cc-by' | 'cc-by-sa' | 'cc0'
  originalId: string
  language: string
  downloadCount?: number
}

// Generate file .md dari data buku + konten teks
export async function fetchBookContent(
  textUrl: string
): Promise<string | null> {
  try {
    const res = await fetch(textUrl, {
      headers: { 'User-Agent': 'SayfullXD-Digital/1.0 (educational)' },
    })
    if (!res.ok) return null
    const text = await res.text()

    // Ambil 50KB pertama saja (preview), bersihkan header Gutenberg
    const cleaned = cleanGutenbergText(text.slice(0, 50000))
    return cleaned
  } catch {
    return null
  }
}

function cleanGutenbergText(text: string): string {
  // Hapus header/footer Gutenberg yang panjang
  const startMarkers = [
    /\*\*\* START OF .+? \*\*\*/i,
    /\*\*\* THE PROJECT GUTENBERG .+? \*\*\*/i,
  ]
  const endMarkers = [
    /\*\*\* END OF .+? \*\*\*/i,
    /End of the Project Gutenberg/i,
  ]

  let cleaned = text

  for (const marker of startMarkers) {
    const match = marker.exec(cleaned)
    if (match) {
      cleaned = cleaned.slice(match.index + match[0].length)
      break
    }
  }

  for (const marker of endMarkers) {
    const match = marker.exec(cleaned)
    if (match) {
      cleaned = cleaned.slice(0, match.index)
      break
    }
  }

  return cleaned.trim()
}

// Konversi teks ke Markdown dengan struktur bab
export function convertToMarkdown(rawText: string, title: string): string {
  const lines = rawText.split('\n')
  const markdown: string[] = []
  let currentChapter = ''
  let chapterCount = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Deteksi bab (baris ALL CAPS atau diawali CHAPTER)
    const isChapterHeader =
      /^(CHAPTER|BOOK|PART)\s+[\dIVXLCDM]+/i.test(line) ||
      (line.length > 3 && line.length < 60 && line === line.toUpperCase() && /[A-Z]/.test(line))

    if (isChapterHeader && line.length > 3) {
      chapterCount++
      currentChapter = line
        .replace(/^(CHAPTER|BOOK|PART)\s+[\dIVXLCDM]+\.?\s*/i, '')
        .trim() || `Bagian ${chapterCount}`
      markdown.push(`\n## ${currentChapter}\n`)
    } else if (line) {
      markdown.push(line)
    } else {
      markdown.push('')
    }

    // Batasi 200 baris untuk preview
    if (i >= 200) {
      markdown.push('\n\n*[Konten dipotong – unduh untuk baca lengkap]*')
      break
    }
  }

  // Jika tidak ada bab terdeteksi, buat 1 bab default
  if (chapterCount === 0) {
    return `## Pendahuluan\n\n${markdown.join('\n')}`
  }

  return markdown.join('\n').trim()
}

// Generate frontmatter YAML untuk file .md
export function generateMarkdownFile(
  book: ProcessedBook,
  content: string,
  chapters: string[]
): string {
  const frontmatter = {
    title: book.title,
    author: book.author,
    category: book.category,
    tags: book.tags,
    description: book.description,
    cover_image: `${book.slug}.jpg`,
    download_file: `${book.slug}.pdf`,
    reading_time_minutes: estimateReadingTime(content),
    chapters: chapters.length > 0 ? chapters : ['Pendahuluan'],
    source: book.source,
    license: book.license,
    original_id: book.originalId,
    language: book.language,
    added_date: new Date().toISOString().slice(0, 10),
  }

  const yamlLines = [
    '---',
    `title: "${frontmatter.title.replace(/"/g, '\\"')}"`,
    `author: "${frontmatter.author}"`,
    `category: "${frontmatter.category}"`,
    `tags: [${frontmatter.tags.map((t) => `"${t}"`).join(', ')}]`,
    `description: "${frontmatter.description.replace(/"/g, '\\"')}"`,
    `cover_image: "${frontmatter.cover_image}"`,
    `download_file: "${frontmatter.download_file}"`,
    `reading_time_minutes: ${frontmatter.reading_time_minutes}`,
    `chapters:`,
    ...frontmatter.chapters.map((c) => `  - "${c}"`),
    `source: "${frontmatter.source}"`,
    `license: "${frontmatter.license}"`,
    `original_id: "${frontmatter.original_id}"`,
    `language: "${frontmatter.language}"`,
    `added_date: "${frontmatter.added_date}"`,
    '---',
    '',
    content,
  ]

  return yamlLines.join('\n')
}
