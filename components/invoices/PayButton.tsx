'use client'
import { useState } from 'react'

export default function PayButton({ invoiceId }: { invoiceId: string }) {
  const [loading, setLoading] = useState(false)

  async function handlePay() {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId }),
    })
    const { url, error } = await res.json()
    if (error) { alert(error); setLoading(false); return }
    window.location.href = url
  }

  return (
    <button onClick={handlePay} disabled={loading}
      className="w-full bg-coral-500 hover:bg-coral-600 active:scale-95 text-white font-700 text-lg py-4 rounded-2xl transition-all disabled:opacity-50">
      {loading ? 'Redirecting to payment…' : '💳 Pay now'}
    </button>
  )
}
