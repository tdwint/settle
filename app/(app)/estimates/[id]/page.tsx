import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/stripe'
import EstimateActions from '@/components/estimates/EstimateActions'
import type { EstimateWithItems } from '@/lib/types'

export default async function EstimatePage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: est, error } = await supabase
    .from('estimates')
    .select('*, estimate_items(*), profiles(business_name, logo_url, business_address, business_phone, email, full_name, tax_id)')
    .eq('id', params.id)
    .eq('user_id', user!.id)
    .single()

  if (error || !est) notFound()
  const estimate = est as EstimateWithItems & { profiles: any }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-gray-900">{estimate.estimate_number}</h1>
          <p className="text-gray-500 mt-1">
            {estimate.status === 'accepted' && estimate.responded_at
              ? `Accepted on ${new Date(estimate.responded_at).toLocaleDateString()}`
              : estimate.status === 'declined' && estimate.responded_at
              ? `Declined on ${new Date(estimate.responded_at).toLocaleDateString()}`
              : estimate.valid_until
              ? `Valid until ${new Date(estimate.valid_until).toLocaleDateString()}`
              : 'No expiry date'}
          </p>
        </div>
        <EstimateActions estimate={estimate} />
      </div>

      {/* CLIENT RESPONSE BANNER */}
      {estimate.status === 'accepted' && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-700 text-teal-800">{estimate.client_name} accepted this estimate</p>
              {estimate.client_note && (
                <p className="text-sm text-teal-700 mt-1">"{estimate.client_note}"</p>
              )}
              <p className="text-xs text-teal-600 mt-1.5">Ready to convert to an invoice when the job is complete.</p>
            </div>
          </div>
        </div>
      )}

      {estimate.status === 'declined' && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">❌</span>
            <div>
              <p className="font-700 text-red-800">{estimate.client_name} declined this estimate</p>
              {estimate.client_note && (
                <p className="text-sm text-red-700 mt-1">"{estimate.client_note}"</p>
              )}
            </div>
          </div>
        </div>
      )}

      {estimate.status === 'converted' && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6">
          <p className="font-700 text-gray-700">✓ Converted to invoice</p>
          {estimate.converted_invoice_id && (
            <a href={`/invoices/${estimate.converted_invoice_id}`} className="text-sm text-blue-600 hover:underline mt-1 inline-block">
              View invoice →
            </a>
          )}
        </div>
      )}

      {/* ESTIMATE PREVIEW */}
      <div className="card p-8 mb-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            {estimate.profiles?.logo_url && (
              <img src={estimate.profiles.logo_url} alt="Logo" className="h-12 mb-3 object-contain" />
            )}
            <p className="font-800 text-xl text-gray-900">{estimate.profiles?.business_name ?? estimate.profiles?.full_name}</p>
            {estimate.profiles?.business_address && <p className="text-sm text-gray-500 mt-1 whitespace-pre-line">{estimate.profiles.business_address}</p>}
            {estimate.profiles?.business_phone && <p className="text-sm text-gray-500">{estimate.profiles.business_phone}</p>}
            {estimate.profiles?.email && <p className="text-sm text-gray-500">{estimate.profiles.email}</p>}
            {estimate.profiles?.tax_id && <p className="text-sm text-gray-500">Tax ID: {estimate.profiles.tax_id}</p>}
          </div>
          <div className="text-right">
            <p className="text-3xl font-800 text-gray-900">ESTIMATE</p>
            <p className="text-gray-500 mt-1">{estimate.estimate_number}</p>
            <p className="text-sm text-gray-400 mt-2">Issued: {new Date(estimate.created_at).toLocaleDateString()}</p>
            {estimate.valid_until && (
              <p className="text-sm text-gray-400">Valid until: {new Date(estimate.valid_until).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Prepared for */}
        <div className="mb-8">
          <p className="text-xs font-600 uppercase tracking-wider text-gray-400 mb-2">Prepared for</p>
          <p className="font-700 text-gray-900">{estimate.client_name}</p>
          <p className="text-sm text-gray-500">{estimate.client_email}</p>
          {estimate.client_address && <p className="text-sm text-gray-500 whitespace-pre-line">{estimate.client_address}</p>}
          {estimate.client_phone && <p className="text-sm text-gray-500">{estimate.client_phone}</p>}
        </div>

        {/* Items */}
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-600 uppercase tracking-wider text-gray-400">
              <th className="text-left pb-3">Description</th>
              <th className="text-right pb-3">Qty</th>
              <th className="text-right pb-3">Rate</th>
              <th className="text-right pb-3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {estimate.estimate_items.map(item => (
              <tr key={item.id}>
                <td className="py-3 text-sm text-gray-700">{item.description}</td>
                <td className="py-3 text-sm text-gray-500 text-right">{item.quantity}</td>
                <td className="py-3 text-sm text-gray-500 text-right">{formatCurrency(item.rate, estimate.currency)}</td>
                <td className="py-3 text-sm font-600 text-gray-900 text-right">{formatCurrency(item.amount, estimate.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span><span>{formatCurrency(estimate.subtotal, estimate.currency)}</span>
            </div>
            {estimate.tax_rate > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax ({estimate.tax_rate}%)</span><span>{formatCurrency(estimate.tax_amount, estimate.currency)}</span>
              </div>
            )}
            {estimate.discount_amount > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount</span><span>-{formatCurrency(estimate.discount_amount, estimate.currency)}</span>
              </div>
            )}
            <div className="flex justify-between font-800 text-gray-900 text-lg pt-2 border-t border-gray-200">
              <span>Estimate total</span><span>{formatCurrency(estimate.total, estimate.currency)}</span>
            </div>
          </div>
        </div>

        {estimate.notes && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-600 uppercase tracking-wider text-gray-400 mb-2">Notes</p>
            <p className="text-sm text-gray-600 whitespace-pre-line">{estimate.notes}</p>
          </div>
        )}
      </div>

      {/* Client link */}
      {['sent', 'viewed'].includes(estimate.status) && (
        <div className="card p-5 bg-blue-50 border-blue-200">
          <p className="text-sm font-600 text-blue-800 mb-1">Estimate link for your client</p>
          <p className="text-xs text-blue-600 font-mono break-all">
            {appUrl}/estimates/{estimate.id}/view
          </p>
        </div>
      )}
    </div>
  )
}
