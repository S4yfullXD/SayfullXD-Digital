// app/syarat/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat Penggunaan',
  description: 'Syarat dan ketentuan penggunaan SayfullXD Digital.',
}

export default function SyaratPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
        Syarat Penggunaan
      </h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-10">
        Terakhir diperbarui: 15 Januari 2026
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>1. Penerimaan Syarat</h2>
        <p>
          Dengan mengakses SayfullXD Digital, kamu menyetujui syarat penggunaan ini.
          Jika tidak setuju, mohon hentikan penggunaan layanan.
        </p>

        <h2>2. Penggunaan yang Diizinkan</h2>
        <ul>
          <li>Membaca buku secara online untuk keperluan pribadi dan pendidikan</li>
          <li>Mengunduh buku untuk penggunaan pribadi, non-komersial</li>
          <li>Berbagi tautan ke halaman buku</li>
        </ul>

        <h2>3. Penggunaan yang Dilarang</h2>
        <ul>
          <li>Mendistribusikan ulang buku untuk tujuan komersial</li>
          <li>Scraping massal konten tanpa izin</li>
          <li>Menggunakan konten untuk melatih model AI tanpa izin eksplisit</li>
          <li>Melanggar hak cipta pihak ketiga yang mungkin masih berlaku pada terjemahan atau adaptasi</li>
        </ul>

        <h2>4. Lisensi Konten</h2>
        <p>
          Buku yang tersedia adalah karya public domain atau Creative Commons.
          Kode sumber website ini berlisensi MIT. Desain dan merek SayfullXD Digital
          adalah milik eksklusif pengembang.
        </p>

        <h2>5. Penafian</h2>
        <p>
          Layanan disediakan &ldquo;sebagaimana adanya&rdquo; tanpa jaminan apapun.
          Kami berupaya memastikan akurasi konten tetapi tidak bertanggung jawab atas
          kesalahan atau ketidaklengkapan.
        </p>

        <h2>6. Perubahan Syarat</h2>
        <p>
          Kami berhak memperbarui syarat ini kapan saja. Penggunaan berkelanjutan
          setelah perubahan dianggap sebagai penerimaan syarat baru.
        </p>
      </div>
    </div>
  )
}
