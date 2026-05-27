// app/kontak/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi tim SayfullXD Digital.',
}

export default function KontakPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
        Kontak
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Ada pertanyaan, saran, atau request buku? Kami senang mendengar dari kamu.
      </p>

      <div className="space-y-4 mb-10">
        {[
          {
            icon: '📧',
            label: 'Email',
            value: 'hello@sayfullxd.digital',
            href: 'mailto:hello@sayfullxd.digital',
          },
          {
            icon: '🐦',
            label: 'Twitter/X',
            value: '@sayfullxd',
            href: 'https://twitter.com/sayfullxd',
          },
          {
            icon: '⚖️',
            label: 'DMCA / Laporan Pelanggaran',
            value: 'Formulir DMCA',
            href: '/dmca',
          },
        ].map(({ icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-4 p-4 bg-white dark:bg-dark-surface
                       border dark:border-dark-border rounded-xl
                       hover:border-indigo-300 dark:hover:border-indigo-700
                       hover:shadow-sm transition-all group"
          >
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
              <p className="font-medium text-slate-900 dark:text-white
                            group-hover:text-indigo-600 dark:group-hover:text-accent-dark
                            transition-colors">
                {value}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30
                      rounded-xl p-5 text-sm text-amber-700 dark:text-amber-400">
        <strong>⏱ Waktu Respons:</strong> Kami biasanya merespons dalam 1–3 hari kerja.
        Untuk laporan DMCA, respons diberikan dalam 48 jam.
      </div>
    </div>
  )
}
