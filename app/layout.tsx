// app/layout.tsx
import type { Metadata } from 'next'
import { Outfit, Lora } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SayfullXD Digital – Baca Lebih Banyak, Gratis Selamanya',
    template: '%s | SayfullXD Digital',
  },
  description:
    'Perpustakaan ebook gratis dan legal. Ribuan buku public domain: filsafat, sastra, sains, sejarah. Baca langsung di browser, tanpa registrasi.',
  keywords: ['buku gratis', 'ebook gratis', 'perpustakaan digital', 'public domain', 'baca online'],
  authors: [{ name: 'SayfullXD' }],
  creator: 'SayfullXD',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sayfullxd-digital.vercel.app'
  ),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'SayfullXD Digital',
    title: 'SayfullXD Digital – Baca Lebih Banyak, Gratis Selamanya',
    description: 'Perpustakaan ebook gratis dan legal. Ribuan buku public domain.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sayfullxd',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${outfit.variable} ${lora.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
