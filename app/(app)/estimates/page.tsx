import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatCurrency } from '@/lib/stripe'
import type { Estimate } from '@/lib/types'

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  viewed: 'bg-purple-100 text-purple-700',
  accepted: 'bg-teal-100 text-teal-700',
  declined: 'bg-red-100 text-red-700',
  expired: 'bg-orange-100 text-orange-700',
  converted: 'bg-gray-100 text-gray-400',
}

function effectiveStatus(est: Estimate): string {
  if (['sent', 'viewed'].includes(est.status) && est.valid_until) {
    if (new Date(est.valid_until) < new Date()) return 'expired'
  }
  return est.status
}

export default async function EstimatesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: estimates } = await supabase
    .from('estimates')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const allEstimates = (estimates ?? []) as Estimate[]
  const pendingCount = allEstimates.filter(e => ['sent', 'viewed'].includes(e.status)).length
  const acceptedCount = allEstimates.filter(e => e.status === 'accepted').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-gray-900">Estimates</h1>
          <p className="text-gray-500 mt-1">Unlimited on all plans.</p>
        </div>
        <Link href="/estimates/new" className="btn-primary">+ New estimate</Link>
      </div>

      {/* STATS */}
      {allEstimates.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-5">
            <p className="text-2xl font-800 text-blue-600">{pendingCount}</p>
            <p className="text-sm font-600 text-gray-700 mt-0.5">Awaiting response</p>
          </div>
          <div className="card p-5">
            <p className="text-2xl font-800 text-teal-600">{acceptedCount}</p>
            <p className="text-sm font-600 text-gray-700 mt-0.5">Accepted</p>
            {acceptedCount > 0 && <p className="text-xs text-teal-500 mt-0.5">Ready to convert</p>}
          </div>
          <div className="card p-5">
            <p className="text-2xl font-800 text-gray-700">{allEstimates.length}</p>
            <p className="text-sm font-600 text-gray-700 mt-0.5">Total</p>
          </div>
        </div>
      )}

      {/* ACCEPTED BANNER */}
      {acceptedCount > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="font-700 text-teal-800">
              {acceptedCount} estimate{acceptedCount !== 1 ? 's' : ''} accepted — ready to invoice
            </p>
            <p className="text-sm text-teal-600 mt-0.5">Open each accepted estimate to convert it into a draft invoice.</p>
          </div>
        </div>
      )}

      {/* LIST */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-700 text-gray-900">All estimates</h2>
        </div>

        {allEstimates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-700 text-gray-900 mb-2">No estimates yet</h3>
            <p className="text-gray-500 text-sm mb-6">Create an estimate for a prospective client — free and unlimited.</p>
            <Link href="/estimates/new" className="btn-primary">Create your first estimate</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {allEstimates.map((est) => {
              const status = effectiveStatus(est)
              return (
                <Link key={est.id} href={`/estimates/${est.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-600 text-gray-900 text-sm">{est.estimate_number}</p>
                      <p className="text-xs text-gray-400">{est.client_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-sm text-gray-400 hidden md:block">
                      {est.valid_until
                        ? `Valid until ${new Date(est.valid_until).toLocaleDateString()}`
                        : 'No expiry'}
                    </p>
                    <p className="font-700 text-gray-900">{formatCurrency(est.total, est.currency)}</p>
                    <span className={`text-xs font-600 px-2.5 py-1 rounded-full ${STATUS_STYLES[status] ?? STATUS_STYLES.draft}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
