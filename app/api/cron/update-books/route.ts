// app/api/cron/update-books/route.ts
// Dipanggil oleh Vercel Cron tiap hari jam 02:00 WIB (19:00 UTC sebelumnya)
import { NextRequest, NextResponse } from 'next/server'
import { fetchGutenberg, fetchBookContent, convertToMarkdown, generateMarkdownFile } from '@/lib/sources/gutenberg'
import { fileExists, uploadFile } from '@/lib/github'
import { SYSTEM_CONSTANTS } from '@/lib/constants'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET(req: NextRequest) {
  // Verifikasi cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const log: string[] = []
  const added: string[] = []
  const skipped: string[] = []
  const errors: string[] = []

  log.push(`[${new Date().toISOString()}] Cron start`)

  try {
    // Fetch kandidat buku dari Gutenberg
    const candidates = await fetchGutenberg({
      limit: SYSTEM_CONSTANTS.MAX_BOOKS_PER_CRON * 3, // Ambil lebih, filter duplikat
      languages: 'en',
    })

    log.push(`Fetched ${candidates.length} candidates from Gutenberg`)

    let addedCount = 0

    for (const book of candidates) {
      if (addedCount >= SYSTEM_CONSTANTS.MAX_BOOKS_PER_CRON) {
        log.push(`Reached daily limit (${SYSTEM_CONSTANTS.MAX_BOOKS_PER_CRON}), stopping`)
        break
      }

      const mdPath = `_data/books/${book.slug}.md`

      // Skip jika sudah ada
      if (await fileExists(mdPath)) {
        skipped.push(book.slug)
        log.push(`Skip (exists): ${book.slug}`)
        await delay(300)
        continue
      }

      // Validasi lisensi – CC-BY-NC dilarang karena ada AdSense
      if (!['public-domain', 'cc-by', 'cc-by-sa', 'cc0'].includes(book.license)) {
        skipped.push(book.slug)
        log.push(`Skip (license: ${book.license}): ${book.slug}`)
        continue
      }

      try {
        // Fetch konten teks
        let content = ''
        if (book.textUrl) {
          const raw = await fetchBookContent(book.textUrl)
          if (raw) {
            content = convertToMarkdown(raw, book.title)
          }
        }

        if (!content) {
          content = `## Pendahuluan\n\nKonten buku sedang diproses. Unduh file untuk membaca lengkap.`
        }

        // Deteksi bab dari konten
        const chapters = (content.match(/^## .+$/gm) ?? [])
          .map((h) => h.replace('## ', '').trim())
          .slice(0, 20)

        if (!chapters.length) chapters.push('Pendahuluan')

        // Generate file .md
        const mdContent = generateMarkdownFile(book, content, chapters)

        // Commit ke GitHub
        await uploadFile(
          mdPath,
          mdContent,
          `[auto] Add book: ${book.title} by ${book.author}`
        )

        // Upload cover jika ada
        if (book.coverUrl) {
          try {
            const coverRes = await fetch(book.coverUrl)
            if (coverRes.ok) {
              const coverBuffer = Buffer.from(await coverRes.arrayBuffer())
              if (coverBuffer.length <= SYSTEM_CONSTANTS.COVER_MAX_SIZE_KB * 1024) {
                await uploadFile(
                  `public/covers/${book.slug}.jpg`,
                  coverBuffer,
                  `[auto] Cover: ${book.slug}`
                )
              }
            }
          } catch {
            log.push(`Cover upload failed for ${book.slug} (non-fatal)`)
          }
        }

        added.push(book.slug)
        addedCount++
        log.push(`Added: ${book.slug}`)

        await delay(1000) // Rate limit courtesy
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        errors.push(`${book.slug}: ${msg}`)
        log.push(`Error (${book.slug}): ${msg}`)
      }
    }

    const summary = {
      timestamp: new Date().toISOString(),
      added: added.length,
      skipped: skipped.length,
      errors: errors.length,
      addedSlugs: added,
      errorDetails: errors,
      log,
    }

    log.push(`Cron done. Added: ${added.length}, Skipped: ${skipped.length}, Errors: ${errors.length}`)

    return NextResponse.json(summary, { status: 200 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: 'Cron failed', message: msg, log },
      { status: 500 }
    )
  }
}
