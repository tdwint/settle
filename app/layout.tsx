import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const APP_URL = 'https://gigpay.today'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Settle — Free Invoice App for Freelancers & Contractors',
    template: '%s — Settle',
  },
  description: 'Send professional invoices and get paid online in minutes. Free for freelancers, contractors, plumbers, electricians, designers, and more. No chasing required.',
  keywords: [
    'free invoice app', 'invoice software for freelancers', 'invoice app for contractors',
    'invoice for plumbers', 'invoice for electricians', 'invoice for painters',
    'invoice for landscapers', 'invoice for designers', 'invoice for developers',
    'send invoices online', 'get paid online', 'freelance invoicing', 'contractor invoice',
    'small business invoice', 'invoice generator', 'online payment for freelancers',
  ],
  authors: [{ name: 'Botani Productions', url: APP_URL }],
  creator: 'Botani Productions',
  publisher: 'Botani Productions',
  alternates: { canonical: APP_URL },
  verification: { google: '0759d1cdd1df3ed8' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Settle',
    title: 'Settle — Free Invoice App for Freelancers & Contractors',
    description: 'Send professional invoices and get paid online in minutes. Free for freelancers, contractors, plumbers, electricians, designers, and more.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Settle — Free Invoice App for Freelancers & Contractors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settle — Free Invoice App for Freelancers & Contractors',
    description: 'Send professional invoices and get paid online in minutes. Free for freelancers, contractors, and trades.',
    images: ['/opengraph-image.png'],
    creator: '@gigpaytoday',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png',       sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Settle',
  url: APP_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Free invoice app for freelancers, contractors, and trades. Send professional invoices and get paid online via Stripe.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      description: '5 invoices per month, free forever',
    },
    {
      '@type': 'Offer',
      name: 'Pro Monthly',
      price: '12',
      priceCurrency: 'USD',
      description: 'Unlimited invoices, billed monthly',
    },
    {
      '@type': 'Offer',
      name: 'Pro Annual',
      price: '100',
      priceCurrency: 'USD',
      description: 'Unlimited invoices, billed annually',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '47',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4W8Y08LVCV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4W8Y08LVCV');
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
