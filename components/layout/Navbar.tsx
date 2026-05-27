'use client'
// components/layout/Navbar.tsx
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  FiSearch, FiX, FiMenu, FiBook,
} from 'react-icons/fi'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/cari?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200
        ${isScrolled
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm border-b'
          : 'bg-white dark:bg-dark-bg border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white
                       hover:text-indigo-600 dark:hover:text-accent-dark transition-colors"
          >
            <FiBook className="text-indigo-500" size={22} />
            <span>SayfullXD <span className="text-indigo-500">Digital</span></span>
          </Link>

          {/* Nav Links – desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/katalog"
              className="text-sm font-medium text-slate-600 dark:text-slate-400
                         hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Katalog
            </Link>
            <Link
              href="/kategori/filsafat"
              className="text-sm font-medium text-slate-600 dark:text-slate-400
                         hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Kategori
            </Link>
            <Link
              href="/dukung"
              className="text-sm font-medium text-slate-600 dark:text-slate-400
                         hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Dukung Kami
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 animate-fade-in"
              >
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari buku..."
                  className="w-48 sm:w-64 px-3 py-1.5 text-sm rounded-lg border
                             bg-slate-50 dark:bg-dark-surface dark:border-dark-border
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setQuery('') }}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surface
                             text-slate-500 transition-colors"
                  aria-label="Tutup pencarian"
                >
                  <FiX size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surface
                           text-slate-600 dark:text-slate-400 transition-colors"
                aria-label="Buka pencarian"
              >
                <FiSearch size={18} />
              </button>
            )}

            <ThemeToggle />

            {/* Hamburger – mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surface
                         text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t dark:border-dark-border animate-slide-up">
            <div className="flex flex-col gap-1 pt-3">
              {[
                { href: '/katalog', label: 'Katalog' },
                { href: '/kategori/filsafat', label: 'Kategori' },
                { href: '/dukung', label: 'Dukung Kami' },
                { href: '/tentang', label: 'Tentang' },
                { href: '/bantuan', label: 'Bantuan' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium rounded-lg
                             text-slate-700 dark:text-slate-300
                             hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
