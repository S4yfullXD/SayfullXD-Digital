// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-7xl mb-6">📭</div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        Halaman yang kamu cari tidak ada atau sudah dipindah.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                     px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Ke Beranda
        </Link>
        <Link
          href="/katalog"
          className="border dark:border-dark-border text-slate-700 dark:text-slate-300
                     font-medium px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-surface
                     transition-colors text-sm"
        >
          Lihat Katalog
        </Link>
      </div>
    </div>
  )
}
