'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Invoice } from '@/lib/types'

export default function InvoiceActions({ invoice }: { invoice: Invoice }) {
  const router = useRouter()
  const [loading, setLoading] = useState('')

  async function patch(body: object) {
    setLoading('updating')
    await fetch(`/api/invoices/${invoice.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })
    router.refresh()
    setLoading('')
  }

  async function handleDelete() {
    if (!confirm('Delete this invoice? This cannot be undone.')) return
    setLoading('deleting')
    await fetch(`/api/invoices/${invoice.id}`, { method: 'DELETE' })
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center gap-2">
      {invoice.status === 'draft' && (
        <button onClick={() => patch({ status: 'sent', sent_at: new Date().toISOString() })}
          disabled={loading === 'updating'} className="btn-primary text-sm">
          {loading === 'updating' ? 'Sending…' : 'Send to client'}
        </button>
      )}
      {invoice.status === 'sent' && (
        <button onClick={() => patch({ status: 'paid', paid_at: new Date().toISOString() })}
          disabled={loading === 'updating'} className="btn-primary text-sm bg-teal-500 hover:bg-teal-600">
          {loading === 'updating' ? 'Updating…' : 'Mark as paid'}
        </button>
      )}
      <button onClick={handleDelete} disabled={loading === 'deleting'}
        className="btn-secondary text-sm text-red-500 hover:text-red-600 hover:border-red-200">
        {loading === 'deleting' ? 'Deleting…' : 'Delete'}
      </button>
    </div>
  )
}
