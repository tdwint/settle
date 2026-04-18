'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4" style={{background:'linear-gradient(135deg, #080720 0%, #0f0d38 40%, #1e1b6e 100%)'}}>
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="logo-mark">
              <span className="text-white font-700">S</span>
            </div>
            <span className="text-xl font-700 text-white tracking-tight">Settle</span>
          </Link>
          <h1 className="font-display text-3xl text-white mb-2">Reset password</h1>
          <p className="text-slate-400 text-sm">We'll send you a secure reset link</p>
        </div>

        <div className="auth-card">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{background:'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'}}>
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-600 text-slate-900 mb-2">Check your email</h2>
              <p className="text-slate-500 text-sm mb-6">We sent a reset link to <strong>{email}</strong></p>
              <Link href="/login" className="btn-primary">Back to sign in</Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input" placeholder="you@example.com" required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-600 transition-colors">← Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
