import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/stripe'
import InvoiceActions from '@/components/invoices/InvoiceActions'
import type { InvoiceWithItems } from '@/lib/types'

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: inv, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*), profiles(business_name, logo_url, business_address, business_phone, email, full_name, tax_id)')
    .eq('id', params.id)
    .eq('user_id', user!.id)
    .single()

  if (error || !inv) notFound()
  const invoice = inv as InvoiceWithItems & { profiles: any }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-gray-900">{invoice.invoice_number}</h1>
          <p className="text-gray-500 mt-1">
            {invoice.status === 'paid' ? `Paid on ${new Date(invoice.paid_at!).toLocaleDateString()}` :
             invoice.due_date ? `Due ${new Date(invoice.due_date).toLocaleDateString()}` : 'No due date'}
          </p>
        </div>
        <InvoiceActions invoice={invoice} />
      </div>

      {/* INVOICE PREVIEW */}
      <div className="card p-8 mb-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            {invoice.profiles?.logo_url && (
              <img src={invoice.profiles.logo_url} alt="Logo" className="h-12 mb-3 object-contain" />
            )}
            <p className="font-800 text-xl text-gray-900">{invoice.profiles?.business_name ?? invoice.profiles?.full_name}</p>
            {invoice.profiles?.business_address && <p className="text-sm text-gray-500 mt-1 whitespace-pre-line">{invoice.profiles.business_address}</p>}
            {invoice.profiles?.business_phone && <p className="text-sm text-gray-500">{invoice.profiles.business_phone}</p>}
            {invoice.profiles?.email && <p className="text-sm text-gray-500">{invoice.profiles.email}</p>}
            {invoice.profiles?.tax_id && <p className="text-sm text-gray-500">Tax ID: {invoice.profiles.tax_id}</p>}
          </div>
          <div className="text-right">
            <p className="text-3xl font-800 text-gray-900">INVOICE</p>
            <p className="text-gray-500 mt-1">{invoice.invoice_number}</p>
            <p className="text-sm text-gray-400 mt-2">Issued: {new Date(invoice.issue_date).toLocaleDateString()}</p>
            {invoice.due_date && <p className="text-sm text-gray-400">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>}
          </div>
        </div>

        {/* Bill to */}
        <div className="mb-8">
          <p className="text-xs font-600 uppercase tracking-wider text-gray-400 mb-2">Billed to</p>
          <p className="font-700 text-gray-900">{invoice.client_name}</p>
          <p className="text-sm text-gray-500">{invoice.client_email}</p>
          {invoice.client_address && <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.client_address}</p>}
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
            {invoice.invoice_items.map(item => (
              <tr key={item.id}>
                <td className="py-3 text-sm text-gray-700">{item.description}</td>
                <td className="py-3 text-sm text-gray-500 text-right">{item.quantity}</td>
                <td className="py-3 text-sm text-gray-500 text-right">{formatCurrency(item.rate, invoice.currency)}</td>
                <td className="py-3 text-sm font-600 text-gray-900 text-right">{formatCurrency(item.amount, invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span><span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            {invoice.tax_rate > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax ({invoice.tax_rate}%)</span><span>{formatCurrency(invoice.tax_amount, invoice.currency)}</span>
              </div>
            )}
            {invoice.discount_amount > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount</span><span>-{formatCurrency(invoice.discount_amount, invoice.currency)}</span>
              </div>
            )}
            <div className="flex justify-between font-800 text-gray-900 text-lg pt-2 border-t border-gray-200">
              <span>Total</span><span>{formatCurrency(invoice.total, invoice.currency)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-600 uppercase tracking-wider text-gray-400 mb-2">Notes</p>
            <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Payment link */}
      {invoice.status === 'sent' && (
        <div className="card p-5 bg-blue-50 border-blue-200">
          <p className="text-sm font-600 text-blue-800 mb-1">Payment link for your client</p>
          <p className="text-xs text-blue-600 font-mono break-all">
            {process.env.NEXT_PUBLIC_APP_URL}/invoices/{invoice.id}/pay
          </p>
        </div>
      )}
    </div>
  )
}
