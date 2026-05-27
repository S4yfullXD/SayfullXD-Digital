// components/ui/CategoryBadge.tsx
import Link from 'next/link'
import { BookCategory, CATEGORY_META } from '@/types/book'

interface CategoryBadgeProps {
  category: BookCategory
  size?: 'sm' | 'md'
  linked?: boolean
}

export function CategoryBadge({
  category,
  size = 'sm',
  linked = false,
}: CategoryBadgeProps) {
  const meta = CATEGORY_META[category]
  const cls = `inline-flex items-center gap-1 rounded-full font-medium
    ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}
    ${meta.color}`

  const content = (
    <>
      <span>{meta.icon}</span>
      <span>{category}</span>
    </>
  )

  if (linked) {
    const href = `/kategori/${encodeURIComponent(
      category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'dan')
    )}`
    return (
      <Link href={href} className={`${cls} hover:opacity-80 transition-opacity`}>
        {content}
      </Link>
    )
  }

  return <span className={cls}>{content}</span>
}
