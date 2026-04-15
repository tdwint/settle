import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/stripe'
import PayButton from '@/components/invoices/PayButton'
import type { InvoiceWithItems } from '@/lib/types'

export default async function PaymentPage({ params, searchParams }: { params: { id: string }, searchParams: { paid?: string } }) {
  // Use service role for public access
  const supabase = await createClient()

  const { data: inv, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*), profiles(business_name, logo_url, business_address, email, full_name, tax_id)')
    .eq('id', params.id)
    .single()

  if (error || !inv || !['sent', 'paid'].includes(inv.status)) notFound()
  const invoice = inv as InvoiceWithItems & { profiles: any }

  const justPaid = searchParams.paid === 'true'

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-warm-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-coral-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-800">S</span>
            </div>
            <span className="text-xl font-800 text-gray-900">Settle</span>
          </div>
        </div>

        {justPaid ? (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-800 text-gray-900 mb-3">Payment received!</h1>
            <p className="text-gray-500 text-lg">Thank you — {invoice.profiles?.business_name ?? invoice.profiles?.full_name} has been notified.</p>
            <p className="text-gray-400 text-sm mt-2">{invoice.invoice_number} · {formatCurrency(invoice.total, invoice.currency)}</p>
          </div>
        ) : (
          <div className="card p-8">
            {/* Sender */}
            <div className="flex justify-between items-start mb-8">
              <div>
                {invoice.profiles?.logo_url && <img src={invoice.profiles.logo_url} alt="" className="h-10 mb-3 object-contain" />}
                <p className="font-800 text-xl text-gray-900">{invoice.profiles?.business_name ?? invoice.profiles?.full_name}</p>
                {invoice.profiles?.business_address && <p className="text-sm text-gray-400 whitespace-pre-line">{invoice.profiles.business_address}</p>}
                {invoice.profiles?.email && <p className="text-sm text-gray-400">{invoice.profiles.email}</p>}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Invoice</p>
                <p className="font-700 text-gray-900">{invoice.invoice_number}</p>
                {invoice.due_date && <p className="text-sm text-gray-400 mt-1">Due {new Date(invoice.due_date).toLocaleDateString()}</p>}
              </div>
            </div>

            {/* Bill to */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-xs font-600 uppercase tracking-wider text-gray-400 mb-1">Billed to</p>
              <p className="font-700 text-gray-900">{invoice.client_name}</p>
              <p className="text-sm text-gray-500">{invoice.client_email}</p>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-6">
              {invoice.invoice_items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.description} <span className="text-gray-400">× {item.quantity}</span></span>
                  <span className="font-600 text-gray-900">{formatCurrency(item.amount, invoice.currency)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-100 pt-4 mb-8">
              {invoice.tax_rate > 0 && (
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Tax ({invoice.tax_rate}%)</span><span>{formatCurrency(invoice.tax_amount, invoice.currency)}</span>
                </div>
              )}
              {invoice.discount_amount > 0 && (
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Discount</span><span>-{formatCurrency(invoice.discount_amount, invoice.currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-800 text-gray-900 text-2xl">
                <span>Total due</span>
                <span className="text-coral-500">{formatCurrency(invoice.total, invoice.currency)}</span>
              </div>
            </div>

            {invoice.status === 'paid' ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
                <p className="font-700 text-teal-700">✓ This invoice has been paid</p>
              </div>
            ) : (
              <PayButton invoiceId={invoice.id} />
            )}

            {invoice.notes && (
              <p className="text-xs text-gray-400 mt-6 text-center whitespace-pre-line">{invoice.notes}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
