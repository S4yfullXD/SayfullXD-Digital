// app/bantuan/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bantuan & FAQ',
  description: 'Jawaban untuk pertanyaan umum tentang SayfullXD Digital.',
}

const faqs = [
  {
    q: 'Apakah semua buku benar-benar gratis?',
    a: 'Ya, 100%. Semua buku di perpustakaan kami adalah karya public domain atau berlisensi Creative Commons yang mengizinkan distribusi gratis. Tidak ada biaya tersembunyi.',
  },
  {
    q: 'Apakah saya perlu membuat akun?',
    a: 'Tidak. Kamu bisa langsung membaca dan mengunduh tanpa mendaftar. Bookmark dan progres membaca tersimpan di perangkatmu sendiri via localStorage.',
  },
  {
    q: 'Apakah buku-buku ini legal untuk diunduh?',
    a: 'Ya. Semua buku berasal dari Project Gutenberg atau Open Library, dan hanya mencakup karya public domain atau CC. Kami tidak pernah menyediakan buku yang masih dilindungi hak cipta.',
  },
  {
    q: 'Kenapa ada iklan di website ini?',
    a: 'Iklan dari Google AdSense membantu kami menutup biaya server dan operasional agar layanan ini tetap gratis untuk semua orang. Kami membatasi maksimal 3 unit iklan per halaman.',
  },
  {
    q: 'Bagaimana cara menyimpan progres membaca?',
    a: 'Progres membaca otomatis tersimpan di perangkatmu (localStorage browser). Kamu juga bisa menekan tombol Bookmark untuk menyimpan posisi bab tertentu.',
  },
  {
    q: 'Format apa yang tersedia untuk diunduh?',
    a: 'Saat ini kami menyediakan format PDF untuk diunduh. Format EPUB akan segera hadir.',
  },
  {
    q: 'Bagaimana jika saya menemukan buku yang melanggar hak cipta?',
    a: 'Laporkan segera ke halaman DMCA kami. Kami akan meninjau dan menghapus konten dalam 48 jam.',
  },
  {
    q: 'Bisakah saya request buku tertentu?',
    a: 'Bisa! Kirim request ke halaman Kontak kami. Kami hanya bisa menambahkan buku yang tersedia di Project Gutenberg atau Open Library dengan lisensi yang sesuai.',
  },
]

export default function BantuanPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
        Bantuan & FAQ
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Pertanyaan yang sering ditanyakan tentang SayfullXD Digital.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white dark:bg-dark-surface border dark:border-dark-border
                       rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer
                                font-semibold text-slate-900 dark:text-white text-sm
                                list-none hover:bg-slate-50 dark:hover:bg-dark-panel transition-colors">
              {faq.q}
              <span className="ml-4 text-slate-400 dark:text-slate-500 shrink-0
                               group-open:rotate-180 transition-transform duration-200 text-lg">
                ↓
              </span>
            </summary>
            <div className="px-5 pb-5 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-12 text-center bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl p-8
                      border border-indigo-100 dark:border-indigo-900/30">
        <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">
          Masih ada pertanyaan lain?
        </p>
        <a
          href="/kontak"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                     text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Hubungi Kami
        </a>
      </div>
    </div>
  )
}
