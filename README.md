# SayfullXD Digital 📚

Perpustakaan ebook gratis dan legal. Baca ribuan buku public domain langsung di browser.

**"Baca Lebih Banyak, Gratis Selamanya."**

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Fonts**: Outfit (UI) + Lora (reader)
- **Search**: Fuse.js (client-side, no API)
- **Markdown**: react-markdown + rehype-sanitize
- **Theme**: next-themes
- **Deploy**: Vercel Hobby (gratis)

## Struktur Project

```
sayfullxd-digital/
├── _data/
│   └── books/          ← File .md untuk setiap buku
├── app/
│   ├── page.tsx        ← Homepage
│   ├── katalog/        ← Semua buku
│   ├── kategori/       ← Per kategori
│   ├── buku/[slug]/    ← Detail + reader
│   ├── cari/           ← Search
│   └── api/
│       ├── cron/       ← Auto-update harian
│       └── download/   ← Serve file PDF
├── components/
│   ├── layout/         ← Navbar, Footer, CategoryPanel
│   ├── books/          ← BookCard, BookGrid, SearchClient
│   ├── reader/         ← ReaderClient
│   └── ui/             ← ThemeToggle, ShareButton, dll
├── lib/
│   ├── books.ts        ← Core: parsing, querying
│   ├── search.ts       ← Fuse.js helper
│   ├── github.ts       ← GitHub API commit
│   └── sources/        ← Gutenberg + OpenLibrary fetcher
├── public/
│   ├── covers/         ← Cover buku (300×450px, max 150KB)
│   └── books/          ← File PDF/EPUB
└── types/
    └── book.ts         ← TypeScript types
```

## Setup

```bash
# 1. Clone & install
git clone https://github.com/sayfullxd/sayfullxd-digital
cd sayfullxd-digital
npm install

# 2. Konfigurasi environment
cp .env.example .env.local
# Edit .env.local dengan nilai asli

# 3. Jalankan dev server
npm run dev
```

## Menambah Buku Manual

Buat file baru di `_data/books/judul-kebab-namaakhir.md`:

```markdown
---
title: "Judul Buku"
author: "Nama Penulis"
category: "Filsafat"
tags: ["tag1", "tag2"]
description: "Deskripsi singkat buku."
cover_image: "judul-kebab-namaakhir.jpg"
download_file: "judul-kebab-namaakhir.pdf"
reading_time_minutes: 120
chapters:
  - "Bab 1"
  - "Bab 2"
source: "manual"
license: "public-domain"
language: "id"
added_date: "2026-01-01"
---

## Bab 1

Konten bab pertama...

## Bab 2

Konten bab kedua...
```

## Cron Job

Vercel Cron berjalan setiap hari jam 02:00 WIB → memanggil `/api/cron/update-books` → fetch max 5 buku/hari dari Gutenberg → commit ke GitHub.

Set environment variable `CRON_SECRET`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`.

## Kategori yang Tersedia

Filsafat · Komik · Cerita · Sains · Teknologi · Motivasi · Pengembangan Diri · Sejarah · Biografi · Puisi · Agama & Spiritualitas · Drama & Teater · Hukum & Politik · Lainnya

## Lisensi

Kode: MIT. Konten buku: lihat metadata masing-masing buku (public domain / Creative Commons).
