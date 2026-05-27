'use client'
// components/layout/CategoryPanel.tsx
import Link from 'next/link'
import { BookCategory, ALL_CATEGORIES, CATEGORY_META } from '@/types/book'

interface CategoryPanelProps {
  activeCategory?: string | null
  categoryCounts?: Record<string, number>
  onSelect?: (category: BookCategory | null) => void
  mode?: 'sidebar' | 'pills'
}

export function CategoryPanel({
  activeCategory = null,
  categoryCounts = {},
  onSelect,
  mode = 'sidebar',
}: CategoryPanelProps) {
  const items = [
    { name: null, label: 'Semua Buku', icon: '📚' },
    ...ALL_CATEGORIES.map((cat) => ({
      name: cat as BookCategory | null,
      label: cat,
      icon: CATEGORY_META[cat].icon,
    })),
  ]

  function getHref(cat: BookCategory | null): string {
    if (cat === null) return '/katalog'
    return `/kategori/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'dan'))}`
  }

  function isActive(cat: BookCategory | null): boolean {
    if (cat === null) return activeCategory === null || activeCategory === 'semua'
    return activeCategory === cat
  }

  /* ── SIDEBAR MODE (desktop) ── */
  if (mode === 'sidebar') {
    return (
      <nav
        aria-label="Kategori buku"
        className="w-sidebar shrink-0 sticky top-20 self-start hidden lg:block"
      >
        <div className="bg-surface-2 dark:bg-dark-panel rounded-xl p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400
                        dark:text-slate-500 px-3 mb-2">
            Kategori
          </p>
          <ul className="space-y-0.5">
            {items.map(({ name, label, icon }) => (
              <li key={label}>
                {onSelect ? (
                  <button
                    onClick={() => onSelect(name as BookCategory | null)}
                    className={`category-item w-full text-left ${isActive(name) ? 'active' : ''}`}
                  >
                    <span className="text-base leading-none">{icon}</span>
                    <span className="flex-1 truncate">{label}</span>
                    {name && categoryCounts[name] != null && (
                      <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                        {categoryCounts[name]}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={getHref(name)}
                    className={`category-item ${isActive(name) ? 'active' : ''}`}
                  >
                    <span className="text-base leading-none">{icon}</span>
                    <span className="flex-1 truncate">{label}</span>
                    {name && categoryCounts[name] != null && (
                      <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                        {categoryCounts[name]}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  /* ── PILLS MODE (mobile / horizontal) ── */
  return (
    <div
      aria-label="Kategori buku"
      className="flex gap-2 overflow-x-auto py-3 scrollbar-hide snap-x"
    >
      {items.map(({ name, label, icon }) => (
        <div key={label} className="snap-start shrink-0">
          {onSelect ? (
            <button
              onClick={() => onSelect(name as BookCategory | null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                          whitespace-nowrap transition-colors
                          ${isActive(name)
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-border'
                          }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ) : (
            <Link
              href={getHref(name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                          whitespace-nowrap transition-colors
                          ${isActive(name)
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-border'
                          }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
