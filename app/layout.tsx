import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Settle — Get paid faster',
  description: 'Send professional invoices and get paid online. No chasing required.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-warm-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
