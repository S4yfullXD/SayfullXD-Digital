// app/tentang/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Tentang SayfullXD Digital — perpustakaan buku gratis dan legal.',
}

export default function TentangPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Tentang SayfullXD Digital
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
        Perpustakaan digital gratis yang percaya bahwa setiap orang berhak mendapatkan akses
        ke pengetahuan tanpa batas finansial.
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Misi Kami</h2>
        <p>
          SayfullXD Digital didirikan dengan satu misi sederhana: <strong>membuat literasi
          terjangkau untuk semua orang</strong>. Kami mengumpulkan, mengkurasi, dan menyajikan
          karya-karya terbaik dari Project Gutenberg dan Open Library — semua dalam format yang
          nyaman dibaca di perangkat apapun.
        </p>

        <h2>Sumber Konten</h2>
        <p>Semua buku di perpustakaan kami berasal dari sumber yang sah dan terpercaya:</p>
        <ul>
          <li>
            <strong>Project Gutenberg</strong> — lebih dari 70.000 buku public domain
          </li>
          <li>
            <strong>Open Library</strong> — digitalisasi koleksi dari Internet Archive
          </li>
          <li>
            <strong>Kontribusi manual</strong> — buku berlisensi Creative Commons yang dikurasi tim kami
          </li>
        </ul>

        <h2>Lisensi</h2>
        <p>
          Setiap buku yang kami sediakan adalah karya <strong>public domain</strong> atau
          berlisensi <strong>Creative Commons</strong> yang mengizinkan distribusi bebas.
          Kami tidak pernah menyediakan buku yang masih dilindungi hak cipta aktif.
        </p>

        <h2>Privasi</h2>
        <p>
          Kami tidak membutuhkan registrasi. Bookmark dan progres membaca tersimpan lokal
          di perangkatmu, bukan di server kami. Kami menggunakan Google AdSense untuk
          mendukung biaya operasional.
        </p>
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          href="/kontak"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                     px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Hubungi Kami
        </Link>
        <Link
          href="/dukung"
          className="border dark:border-dark-border text-slate-700 dark:text-slate-300
                     font-medium px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-surface
                     transition-colors text-sm"
        >
          Dukung Kami ❤️
        </Link>
      </div>
    </div>
  )
}
