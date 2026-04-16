'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSubscription } from '@/lib/hooks/useSubscription'
import Link from 'next/link'

interface LineItem { description: string; quantity: number; rate: number }

export default function NewInvoicePage() {
  const router = useRouter()
  const { canCreateInvoice, invoicesThisMonth } = useSubscription()

  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [taxRate, setTaxRate] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<LineItem[]>([{ description: '', quantity: 1, rate: 0 }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addItem() { setItems([...items, { description: '', quantity: 1, rate: 0 }]) }
  function removeItem(i: number) { setItems(items.filter((_, idx) => idx !== i)) }
  function updateItem(i: number, field: keyof LineItem, value: string | number) {
    setItems(items.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }

  const subtotal = items.reduce((s, i) => s + i.quantity * i.rate, 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount - discount

  async function handleSubmit(e: React.FormEvent, action: 'draft' | 'send') {
    e.preventDefault()
    if (!canCreateInvoice) return
    setError('')
    setLoading(true)

    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_name: clientName, client_email: clientEmail, client_address: clientAddress, due_date: dueDate || undefined, currency, tax_rate: taxRate, discount_amount: discount, notes, items }),
    })

    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }

    if (action === 'send') {
      await fetch(`/api/invoices/${data.data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'sent', sent_at: new Date().toISOString() }),
      })
    }

    router.push('/dashboard')
    router.refresh()
  }

  if (!canCreateInvoice) {
    return (
      <div className="max-w-xl mx-auto text-center py-24">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-2xl font-800 text-gray-900 mb-3">You've used all 3 free invoices this month</h2>
        <p className="text-gray-500 mb-8">Upgrade to Pro for unlimited invoices, client reminders, and more.</p>
        <Link href="/settings?tab=billing" className="btn-primary text-base px-8 py-3">Upgrade to Pro — $12/mo</Link>
        <p className="mt-4 text-sm text-gray-400">Or wait until next month to use your 3 free invoices again.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-gray-900">New invoice</h1>
          <p className="text-gray-500 mt-1">Fill in the details below and send or save as draft.</p>
        </div>
        <Link href="/dashboard" className="btn-secondary text-sm">Cancel</Link>
      </div>

      <form onSubmit={(e) => handleSubmit(e, 'draft')} className="space-y-6">
        {/* CLIENT */}
        <div className="card p-6">
          <h2 className="font-700 text-gray-900 mb-4">Client details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-600 text-gray-700 mb-1.5">Client name *</label>
              <input className="input" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Acme Corp" required />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-600 text-gray-700 mb-1.5">Client email *</label>
              <input className="input" type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="billing@acme.com" required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-600 text-gray-700 mb-1.5">Client address</label>
              <input className="input" value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder="123 Main St, City, Country" />
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="card p-6">
          <h2 className="font-700 text-gray-900 mb-4">Invoice details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-600 text-gray-700 mb-1.5">Due date</label>
              <input className="input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-600 text-gray-700 mb-1.5">Currency</label>
              <select className="input" value={currency} onChange={e => setCurrency(e.target.value)}>
                {['USD','EUR','GBP','CAD','AUD','JPY','CHF','INR'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* LINE ITEMS */}
        <div className="card p-6">
          <h2 className="font-700 text-gray-900 mb-4">Line items</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-xs font-600 text-gray-400 uppercase tracking-wider px-1">
              <span className="col-span-6">Description</span>
              <span className="col-span-2 text-right">Qty</span>
              <span className="col-span-2 text-right">Rate</span>
              <span className="col-span-2 text-right">Amount</span>
            </div>
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <input className="input col-span-6 text-sm" placeholder="Design work..." value={item.description}
                  onChange={e => updateItem(i, 'description', e.target.value)} required />
                <input className="input col-span-2 text-sm text-right" type="number" min="0.01" step="0.01" value={item.quantity}
                  onChange={e => updateItem(i, 'quantity', parseFloat(e.target.value) || 0)} />
                <input className="input col-span-2 text-sm text-right" type="number" min="0" step="0.01" value={item.rate}
                  onChange={e => updateItem(i, 'rate', parseFloat(e.target.value) || 0)} />
                <div className="col-span-1 text-right text-sm font-600 text-gray-700">
                  {(item.quantity * item.rate).toFixed(2)}
                </div>
                <button type="button" onClick={() => removeItem(i)} className="col-span-1 text-gray-300 hover:text-red-400 transition-colors text-center">×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addItem} className="mt-4 text-sm text-coral-500 hover:text-coral-600 font-600">+ Add line item</button>

          {/* TOTALS */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span><span>{subtotal.toFixed(2)} {currency}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>Tax</span>
                <input className="w-14 px-2 py-1 text-xs border border-gray-200 rounded-lg text-right" type="number" min="0" max="100" step="0.1"
                  value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value) || 0)} />
                <span className="text-xs">%</span>
              </div>
              <span>{taxAmount.toFixed(2)} {currency}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>Discount</span>
                <input className="w-20 px-2 py-1 text-xs border border-gray-200 rounded-lg text-right" type="number" min="0" step="0.01"
                  value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} />
              </div>
              <span>-{discount.toFixed(2)} {currency}</span>
            </div>
            <div className="flex justify-between font-800 text-gray-900 text-lg pt-2 border-t border-gray-100">
              <span>Total</span><span>{total.toFixed(2)} {currency}</span>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="card p-6">
          <label className="block text-sm font-600 text-gray-700 mb-1.5">Notes (optional)</label>
          <textarea className="input resize-none" rows={3} value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Payment terms, bank details, thank you message..." />
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

        <div className="flex gap-3 justify-end pb-8">
          <button type="submit" disabled={loading} className="btn-secondary">
            {loading ? 'Saving…' : 'Save as draft'}
          </button>
          <button type="button" disabled={loading} onClick={(e) => handleSubmit(e as any, 'send')} className="btn-primary">
            {loading ? 'Sending…' : 'Send to client →'}
          </button>
        </div>
      </form>
    </div>
  )
}
