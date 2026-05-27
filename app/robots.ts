// app/robots.ts
import { MetadataRoute } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sayfullxd-digital.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/buku/*/baca'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
