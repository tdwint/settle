import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/stripe'
import EstimateRespondForm from './EstimateRespondForm'
import type { EstimateWithItems } from '@/lib/types'

export default async function EstimateViewPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { responded?: string }
}) {
  const supabase = createClient()

  const { data: est, error } = await supabase
    .from('estimates')
    .select('*, estimate_items(*), profiles(business_name, logo_url, business_address, email, full_name, tax_id)')
    .eq('id', params.id)
    .single()

  if (error || !est || est.status === 'draft') notFound()
  const estimate = est as EstimateWithItems & { profiles: any }

  // Mark as viewed (server-side, first time only)
  if (estimate.status === 'sent') {
    // fire-and-forget — use service role via fetch to our own API
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/estimates/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      // This needs auth — instead we'll just handle it in the respond endpoint
      // For now we'll skip auto-view tracking on page load (the respond endpoint sets viewed_at)
    }).catch(() => {})
  }

  const isExpired = estimate.valid_until && new Date(estimate.valid_until) < new Date()
  const canRespond = ['sent', 'viewed'].includes(estimate.status) && !isExpired
  const justResponded = searchParams.responded === 'true'

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background:'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f0fdf4 100%)'}}>
      <div className="w-full max-w-2xl">
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{background:'linear-gradient(135deg,#f59e0b,#d97706)'}}>
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-800 text-gray-900">Settle</span>
          </div>
        </div>

        {/* Already responded */}
        {['accepted', 'declined', 'converted'].includes(estimate.status) && !justResponded ? (
          <div className="card p-10 text-center">
            <div className="text-5xl mb-4">{estimate.status === 'accepted' || estimate.status === 'converted' ? '✅' : '❌'}</div>
            <h2 className="text-2xl font-800 text-gray-900 mb-2">
              {estimate.status === 'declined' ? 'Estimate declined' : 'Estimate accepted'}
            </h2>
            <p className="text-gray-500">You already responded to this estimate. No further action needed.</p>
          </div>
        ) : justResponded ? (
          <div className="card p-10 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{background:'#f0fdf4'}}>
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-800 text-gray-900 mb-2">Response sent!</h2>
            <p className="text-gray-500">
              {estimate.profiles?.business_name ?? estimate.profiles?.full_name} has been notified.
            </p>
          </div>
        ) : (
          <div className="card p-8">
            {/* Sender */}
            <div className="flex justify-between items-start mb-8">
              <div>
                {estimate.profiles?.logo_url && (
                  <img src={estimate.profiles.logo_url} alt="" className="h-10 mb-3 object-contain" />
                )}
                <p className="font-800 text-xl text-gray-900">
                  {estimate.profiles?.business_name ?? estimate.profiles?.full_name}
                </p>
                {estimate.profiles?.business_address && (
                  <p className="text-sm text-gray-400 whitespace-pre-line">{estimate.profiles.business_address}</p>
                )}
                {estimate.profiles?.email && (
                  <p className="text-sm text-gray-400">{estimate.profiles.email}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Estimate</p>
                <p className="font-700 text-gray-900">{estimate.estimate_number}</p>
                {estimate.valid_until && (
                  <p className="text-sm mt-1" style={{color: isExpired ? '#dc2626' : '#94a3b8'}}>
                    {isExpired ? '⚠ Expired' : `Valid until ${new Date(estimate.valid_until).toLocaleDateString()}`}
                  </p>
                )}
              </div>
            </div>

            {/* Prepared for */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-xs font-600 uppercase tracking-wider text-gray-400 mb-1">Prepared for</p>
              <p className="font-700 text-gray-900">{estimate.client_name}</p>
              <p className="text-sm text-gray-500">{estimate.client_email}</p>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-6">
              {estimate.estimate_items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.description} <span className="text-gray-400">× {item.quantity}</span></span>
                  <span className="font-600 text-gray-900">{formatCurrency(item.amount, estimate.currency)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-100 pt-4 mb-8">
              {estimate.tax_rate > 0 && (
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Tax ({estimate.tax_rate}%)</span><span>{formatCurrency(estimate.tax_amount, estimate.currency)}</span>
                </div>
              )}
              {estimate.discount_amount > 0 && (
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Discount</span><span>-{formatCurrency(estimate.discount_amount, estimate.currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-800 text-gray-900 text-2xl">
                <span>Estimate total</span>
                <span style={{color:'#0f172a'}}>{formatCurrency(estimate.total, estimate.currency)}</span>
              </div>
            </div>

            {estimate.notes && (
              <p className="text-xs text-gray-400 mb-6 whitespace-pre-line">{estimate.notes}</p>
            )}

            {/* Response form or expired message */}
            {isExpired ? (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
                <p className="font-700 text-orange-700">This estimate has expired</p>
                <p className="text-sm text-orange-600 mt-1">Please contact {estimate.profiles?.business_name ?? estimate.profiles?.full_name} for an updated estimate.</p>
              </div>
            ) : (
              <EstimateRespondForm estimateId={estimate.id} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
