import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatCurrency } from '@/lib/stripe'
import type { Invoice } from '@/lib/types'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    sent: 'bg-blue-100 text-blue-700',
    paid: 'bg-teal-100 text-teal-700',
    overdue: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-400',
  }
  return (
    <span className={`text-xs font-600 px-2.5 py-1 rounded-full ${styles[status] ?? styles.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: invoices } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name, invoices_this_month, subscription_tier')
    .eq('id', user!.id)
    .single()

  const allInvoices = (invoices ?? []) as Invoice[]
  const totalRevenue = allInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)
  const pending = allInvoices.filter(i => i.status === 'sent')
  const overdue = allInvoices.filter(i => i.status === 'overdue')
  const pendingAmount = pending.reduce((s, i) => s + i.total, 0)

  const stats = [
    { label: 'Total earned', value: formatCurrency(totalRevenue), sub: 'all time', color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Awaiting payment', value: formatCurrency(pendingAmount), sub: `${pending.length} invoice${pending.length !== 1 ? 's' : ''}`, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Overdue', value: String(overdue.length), sub: overdue.length > 0 ? 'needs attention' : 'all clear ✓', color: overdue.length > 0 ? 'text-red-600' : 'text-gray-500', bg: overdue.length > 0 ? 'bg-red-50' : 'bg-gray-50' },
    { label: 'This month', value: String(profile?.invoices_this_month ?? 0), sub: profile?.subscription_tier === 'pro' ? 'unlimited plan' : 'of 5 free', color: 'text-coral-600', bg: 'bg-coral-50' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-gray-900">
            Hey, {profile?.business_name ?? profile?.full_name ?? 'there'} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your invoices.</p>
        </div>
        <Link href="/invoices/new" className="btn-primary">+ New invoice</Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="card p-5">
            <div className={`${s.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <span className={`text-lg font-800 ${s.color}`}>#</span>
            </div>
            <p className={`text-2xl font-800 ${s.color}`}>{s.value}</p>
            <p className="text-sm font-600 text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* FREE PLAN BANNER */}
      {profile?.subscription_tier !== 'pro' && (profile?.invoices_this_month ?? 0) >= 2 && (
        <div className="bg-coral-50 border border-coral-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="font-700 text-coral-800">You've used {profile?.invoices_this_month}/3 free invoices this month</p>
            <p className="text-sm text-coral-600 mt-0.5">Upgrade to Pro for unlimited invoices — just $12/month.</p>
          </div>
          <Link href="/settings?tab=billing" className="btn-primary whitespace-nowrap text-sm">Upgrade →</Link>
        </div>
      )}

      {/* INVOICE LIST */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-700 text-gray-900">Invoices</h2>
        </div>

        {allInvoices.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="font-700 text-gray-900 mb-2">No invoices yet</h3>
            <p className="text-gray-500 text-sm mb-6">Create your first invoice and get paid today.</p>
            <Link href="/invoices/new" className="btn-primary">Create your first invoice</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {allInvoices.map((inv) => (
              <Link key={inv.id} href={`/invoices/${inv.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-600 text-gray-900 text-sm">{inv.invoice_number}</p>
                    <p className="text-xs text-gray-400">{inv.client_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-sm text-gray-400">{inv.due_date ? `Due ${new Date(inv.due_date).toLocaleDateString()}` : 'No due date'}</p>
                  <p className="font-700 text-gray-900">{formatCurrency(inv.total, inv.currency)}</p>
                  <StatusBadge status={inv.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
