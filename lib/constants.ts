// lib/constants.ts
// File ini AMAN diimport di client components (tidak ada 'fs', 'path', dll)

export const SYSTEM_CONSTANTS = {
  MAX_BOOKS_PER_CRON: 5,
  COVER_MAX_SIZE_KB: 150,
  COVER_WIDTH: 300,
  COVER_HEIGHT: 450,
  READER_MAX_WIDTH: 720,
  CATEGORY_PANEL_WIDTH: 240,
  ISR_REVALIDATE: 3600,
  SEARCH_DEBOUNCE_MS: 300,
  READING_SPEED_WPM: 200,
} as const

export const STORAGE_KEYS = {
  bookmark: (slug: string) => `bookmark:${slug}`,
  readingProgress: (slug: string) => `reading-progress:${slug}`,
  fontSizeReader: 'reader-font-size',
  donationBannerDismissed: 'donation-banner-dismissed',
  supportModalShown: 'support_modal_shown',
  themePreference: 'theme',
} as const
