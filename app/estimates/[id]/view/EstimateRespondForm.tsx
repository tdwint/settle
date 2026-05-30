'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EstimateRespondForm({ estimateId }: { estimateId: string }) {
  const router = useRouter()
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  async function respond(action: 'accept' | 'decline') {
    setLoading(action)
    setError('')
    const res = await fetch(`/api/estimates/${estimateId}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, note: note.trim() || undefined }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong. Please try again.')
      setLoading('')
      return
    }
    router.push(`?responded=true`)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-600 text-gray-700 mb-1.5">
          Message <span className="font-400 text-gray-400">(optional)</span>
        </label>
        <textarea
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          rows={3}
          placeholder="Leave a note for your freelancer… (e.g. 'Looks great, go ahead!' or 'Budget is a bit high this quarter')"
          value={note}
          onChange={e => setNote(e.target.value)}
          disabled={!!loading}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => respond('accept')}
          disabled={!!loading}
          className="flex-1 py-3.5 rounded-2xl font-700 text-white text-sm transition-all disabled:opacity-60"
          style={{background: loading === 'accept' ? '#059669' : 'linear-gradient(135deg,#059669,#047857)'}}>
          {loading === 'accept' ? 'Sending…' : '✓ Accept estimate'}
        </button>
        <button
          onClick={() => respond('decline')}
          disabled={!!loading}
          className="flex-1 py-3.5 rounded-2xl font-700 text-gray-600 text-sm border border-gray-200 hover:bg-gray-50 transition-all disabled:opacity-60">
          {loading === 'decline' ? 'Sending…' : 'Decline'}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">No payment is required at this stage</p>
    </div>
  )
}
