// app/dukung/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dukung Kami',
  description: 'Dukung SayfullXD Digital agar bisa terus menyediakan buku gratis.',
}

export default function DukungPage() {
  const trakteerUrl = process.env.NEXT_PUBLIC_TRAKTEER_URL ?? 'https://trakteer.id'
  const saweriaUrl = process.env.NEXT_PUBLIC_SAWERIA_URL ?? 'https://saweria.co'

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="text-6xl mb-6">❤️</div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
        Dukung SayfullXD Digital
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
        Kami menyediakan ribuan buku gratis dan legal untuk semua orang — tanpa biaya langganan,
        tanpa akun, tanpa iklan yang mengganggu. Jika layanan ini membantumu, pertimbangkan
        untuk mendukung kami dengan secangkir kopi virtual ☕
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { value: '100%', label: 'Buku Gratis' },
          { value: '$0', label: 'Biaya Hosting' },
          { value: '∞', label: 'Akses Selamanya' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-slate-50 dark:bg-dark-surface rounded-xl p-4 border dark:border-dark-border"
          >
            <p className="text-2xl font-bold text-indigo-600 dark:text-accent-dark">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Donation buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <a
          href={trakteerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600
                     text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg
                     shadow-orange-200 dark:shadow-none text-lg"
        >
          ☕ Trakteer Kami
        </a>
        <a
          href={saweriaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3
                     border-2 border-yellow-400 text-yellow-600 dark:text-yellow-400
                     hover:bg-yellow-50 dark:hover:bg-yellow-400/10
                     font-bold px-8 py-4 rounded-2xl transition-colors text-lg"
        >
          💛 Saweria
        </a>
      </div>

      {/* How it helps */}
      <div className="text-left bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl p-6
                      border border-indigo-100 dark:border-indigo-900/30">
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">
          Donasikanmu digunakan untuk:
        </h2>
        <ul className="space-y-3">
          {[
            { icon: '🖥️', text: 'Biaya server dan hosting' },
            { icon: '📚', text: 'Menambah koleksi buku baru setiap hari' },
            { icon: '⚡', text: 'Meningkatkan kecepatan dan performa website' },
            { icon: '🛡️', text: 'Menjaga keamanan dan keandalan layanan' },
            { icon: '🌱', text: 'Mengembangkan fitur baru untuk pembaca' },
          ].map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="text-xl">{icon}</span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-slate-400 dark:text-slate-500 mt-8">
        Terima kasih telah mendukung literasi digital Indonesia 🇮🇩
      </p>
    </div>
  )
}
