// components/layout/Footer.tsx
import Link from 'next/link'
import { FiBook, FiHeart } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="border-t dark:border-dark-border bg-surface dark:bg-dark-surface mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-base mb-3">
              <FiBook className="text-indigo-500" size={20} />
              <span>SayfullXD <span className="text-indigo-500">Digital</span></span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Perpustakaan digital gratis dengan ribuan buku public domain untuk semua orang.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
              &ldquo;Baca Lebih Banyak, Gratis Selamanya.&rdquo;
            </p>
          </div>

          {/* Jelajah */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-slate-200">
              Jelajah
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/katalog', label: 'Semua Buku' },
                { href: '/kategori/filsafat', label: 'Filsafat' },
                { href: '/kategori/sains', label: 'Sains' },
                { href: '/kategori/cerita', label: 'Cerita & Fiksi' },
                { href: '/cari', label: 'Cari Buku' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 dark:text-slate-400
                               hover:text-indigo-600 dark:hover:text-accent-dark transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-slate-200">
              Informasi
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/tentang', label: 'Tentang Kami' },
                { href: '/bantuan', label: 'Bantuan & FAQ' },
                { href: '/kontak', label: 'Kontak' },
                { href: '/dukung', label: 'Dukung Kami' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 dark:text-slate-400
                               hover:text-indigo-600 dark:hover:text-accent-dark transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-slate-200">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/privasi', label: 'Kebijakan Privasi' },
                { href: '/syarat', label: 'Syarat Penggunaan' },
                { href: '/dmca', label: 'DMCA' },
                { href: '/sitemap', label: 'Sitemap' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 dark:text-slate-400
                               hover:text-indigo-600 dark:hover:text-accent-dark transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t dark:border-dark-border flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Semua buku adalah karya public domain atau berlisensi Creative Commons.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            Dibuat dengan <FiHeart className="text-red-400" size={12} /> oleh SayfullXD
          </p>
        </div>
      </div>
    </footer>
  )
}
