'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Estimate } from '@/lib/types'

export default function EstimateActions({ estimate }: { estimate: Estimate }) {
  const router = useRouter()
  const [loading, setLoading] = useState('')

  async function patch(body: object) {
    setLoading('updating')
    await fetch(`/api/estimates/${estimate.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })
    router.refresh()
    setLoading('')
  }

  async function handleConvert() {
    if (!confirm('Convert this estimate to a draft invoice? This will count toward your monthly invoice limit.')) return
    setLoading('converting')
    const res = await fetch(`/api/estimates/${estimate.id}/convert`, { method: 'POST' })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error)
      setLoading('')
      return
    }
    router.push(`/invoices/${data.data.invoice_id}`)
  }

  async function handleDelete() {
    if (!confirm('Delete this estimate? This cannot be undone.')) return
    setLoading('deleting')
    await fetch(`/api/estimates/${estimate.id}`, { method: 'DELETE' })
    router.push('/estimates')
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {estimate.status === 'draft' && (
        <button
          onClick={() => patch({ status: 'sent', sent_at: new Date().toISOString() })}
          disabled={loading === 'updating'}
          className="btn-primary text-sm">
          {loading === 'updating' ? 'Sending…' : 'Send to client'}
        </button>
      )}
      {estimate.status === 'accepted' && (
        <button
          onClick={handleConvert}
          disabled={loading === 'converting'}
          className="btn-primary text-sm"
          style={{background:'linear-gradient(135deg,#059669,#047857)'}}>
          {loading === 'converting' ? 'Converting…' : '→ Convert to invoice'}
        </button>
      )}
      {['sent', 'viewed'].includes(estimate.status) && (
        <button
          onClick={() => patch({ status: 'draft' })}
          disabled={loading === 'updating'}
          className="btn-secondary text-sm">
          {loading === 'updating' ? 'Updating…' : 'Retract'}
        </button>
      )}
      {estimate.status !== 'converted' && (
        <button
          onClick={handleDelete}
          disabled={loading === 'deleting'}
          className="btn-secondary text-sm text-red-500 hover:text-red-600 hover:border-red-200">
          {loading === 'deleting' ? 'Deleting…' : 'Delete'}
        </button>
      )}
    </div>
  )
}
