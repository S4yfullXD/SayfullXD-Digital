// app/api/download/[filename]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'

interface Props {
  params: { filename: string }
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { filename } = params

  // Validasi: hanya izinkan alphanumeric, dash, underscore, titik
  if (!/^[a-zA-Z0-9_\-\.]+\.(pdf|epub|txt)$/.test(filename)) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
  }

  const filePath = join(process.cwd(), 'public', 'books', filename)

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  try {
    const fileBuffer = readFileSync(filePath)
    const ext = filename.split('.').pop()

    const contentType =
      ext === 'pdf'
        ? 'application/pdf'
        : ext === 'epub'
        ? 'application/epub+zip'
        : 'text/plain'

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}
