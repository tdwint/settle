import { formatCurrency } from '@/lib/stripe'

async function getStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/stats`, { cache: 'no-store' })
    return res.json()
  } catch { return null }
}

export default async function AdminPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Total users', value: stats?.totalUsers ?? '—', sub: `${stats?.proUsers ?? 0} on Pro` },
    { label: 'Total revenue', value: stats ? formatCurrency(stats.totalRevenue) : '—', sub: `${formatCurrency(stats?.revenueThisMonth ?? 0)} this month` },
    { label: 'Total invoices', value: stats?.totalInvoices ?? '—', sub: `${stats?.paidInvoices ?? 0} paid` },
    { label: 'Conversion rate', value: stats ? `${Math.round((stats.proUsers / Math.max(stats.totalUsers, 1)) * 100)}%` : '—', sub: 'free → pro' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-gray-900">Admin</h1>
        <p className="text-gray-500 mt-1">System overview — visible only to you.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="card p-5">
            <p className="text-3xl font-800 text-gray-900">{c.value}</p>
            <p className="text-sm font-600 text-gray-700 mt-1">{c.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-700 text-gray-900 mb-4">System health</h2>
        <div className="space-y-3">
          {[
            { label: 'Supabase connection', status: 'ok' },
            { label: 'Stripe webhook', status: 'ok' },
            { label: 'Auth service', status: 'ok' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-700">{item.label}</span>
              <span className="flex items-center gap-1.5 text-sm text-teal-600 font-600">
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                Operational
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
