import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/invoices', '/clients', '/settings', '/admin', '/api/'],
      },
    ],
    sitemap: 'https://gigpay.today/sitemap.xml',
  }
}
