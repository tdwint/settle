import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gigpay.today'
  const now = new Date()

  return [
    { url: base,               lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/signup`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/login`,    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/terms`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/support`,  lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/music-producers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/musicians`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/artists`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/photographers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contractors`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/developers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/plumbers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/electricians`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/painters`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/landscapers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/cabinet-makers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/stop-using-venmo-how-production-pros-invoice-properly`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/musicians-stop-getting-paid-late`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/artists-guide-to-getting-paid`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/photographers-guide-to-getting-paid`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/contractors-how-to-invoice-and-get-paid-faster`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/freelance-developers-guide-to-getting-paid`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/plumbers-invoice-guide-get-paid-on-the-spot`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/electricians-how-to-invoice-and-get-paid-faster`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/painters-invoice-guide-stop-waiting-to-get-paid`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/landscapers-invoice-guide-get-paid-faster`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/cabinet-makers-invoice-guide`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ]
}
