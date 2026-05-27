// app/dmca/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DMCA',
  description: 'Prosedur DMCA takedown SayfullXD Digital.',
}

export default function DmcaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
        DMCA Takedown
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        SayfullXD Digital menghormati hak kekayaan intelektual dan merespons setiap
        klaim DMCA yang valid.
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
        <h2>Prosedur Pelaporan</h2>
        <p>
          Jika kamu adalah pemilik hak cipta dan percaya bahwa konten di website ini
          melanggar hakmu, kirim pemberitahuan DMCA ke:
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:dmca@sayfullxd.digital">dmca@sayfullxd.digital</a>
        </p>

        <h2>Informasi yang Harus Disertakan</h2>
        <ol>
          <li>Identifikasi karya berhak cipta yang diklaim dilanggar</li>
          <li>URL halaman yang mengandung konten yang diklaim melanggar</li>
          <li>Informasi kontak lengkap (nama, alamat, email, nomor telepon)</li>
          <li>Pernyataan bahwa kamu adalah pemilik hak cipta atau agen resminya</li>
          <li>Pernyataan di bawah sumpah bahwa informasi yang diberikan akurat</li>
          <li>Tanda tangan elektronik atau fisik</li>
        </ol>

        <h2>Waktu Respons</h2>
        <p>
          Kami akan meninjau dan merespons setiap klaim DMCA yang valid dalam{' '}
          <strong>48 jam</strong>. Konten yang terbukti melanggar akan dihapus segera.
        </p>

        <h2>Counter-Notice</h2>
        <p>
          Jika kontenmu dihapus karena kesalahan, kamu bisa mengirimkan counter-notice
          ke email yang sama dengan menyertakan pernyataan bahwa penghapusan dilakukan
          karena kesalahan atau salah identifikasi.
        </p>
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30
                      rounded-xl p-5 text-sm text-green-700 dark:text-green-400">
        <strong>✅ Komitmen Kami:</strong> Kami hanya menyediakan buku public domain atau CC
        tanpa NC. Jika ada konten yang tidak seharusnya ada di sini, kami akan segera menghapusnya.
      </div>
    </div>
  )
}
