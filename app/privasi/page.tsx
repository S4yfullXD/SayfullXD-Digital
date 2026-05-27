// app/privasi/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi SayfullXD Digital.',
}

export default function PrivasiPage() {
  const lastUpdated = '15 Januari 2026'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
        Kebijakan Privasi
      </h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-10">
        Terakhir diperbarui: {lastUpdated}
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>1. Data yang Kami Kumpulkan</h2>
        <p>
          SayfullXD Digital <strong>tidak membutuhkan registrasi</strong> dan tidak mengumpulkan
          data pribadi seperti nama atau email. Data yang dikumpulkan bersifat anonim:
        </p>
        <ul>
          <li><strong>Data analitik anonim</strong> melalui Google Analytics (opsional)</li>
          <li><strong>Data iklan</strong> melalui Google AdSense (cookie pihak ketiga)</li>
          <li><strong>Log server</strong> standar (IP anonim, browser, halaman yang diakses)</li>
        </ul>

        <h2>2. Data Lokal (di Perangkatmu)</h2>
        <p>
          Progres membaca, bookmark, dan preferensi tampilan <strong>disimpan di
          localStorage</strong> browser kamu, bukan di server kami. Data ini sepenuhnya
          ada di kendalimu dan bisa dihapus kapan saja melalui pengaturan browser.
        </p>

        <h2>3. Google AdSense</h2>
        <p>
          Kami menggunakan Google AdSense untuk menampilkan iklan. Google mungkin menggunakan
          cookie untuk menampilkan iklan yang relevan. Kamu bisa mengatur preferensi iklan
          melalui <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ad Settings</a>.
        </p>

        <h2>4. Cookie</h2>
        <p>
          Kami menggunakan cookie minimal untuk menyimpan preferensi tema (light/dark mode).
          Cookie pihak ketiga berasal dari Google AdSense.
        </p>

        <h2>5. Keamanan</h2>
        <p>
          Website ini dihosting di Vercel dengan HTTPS. Kami tidak menyimpan data sensitif
          di server.
        </p>

        <h2>6. Kontak</h2>
        <p>
          Untuk pertanyaan tentang privasi, hubungi kami di{' '}
          <a href="mailto:hello@sayfullxd.digital">hello@sayfullxd.digital</a>.
        </p>
      </div>
    </div>
  )
}
