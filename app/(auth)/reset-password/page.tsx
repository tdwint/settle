'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [expired, setExpired] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function setupSession() {
      const hash = window.location.hash
      if (!hash) { setExpired(true); return }

      const params = new URLSearchParams(hash.replace('#', ''))
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const type = params.get('type')

      if (type !== 'recovery' || !accessToken || !refreshToken) {
        setExpired(true)
        return
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (error) {
        console.error('Session error:', error)
        setExpired(true)
        return
      }

      setReady(true)
    }

    setupSession()
  }, [])

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false); return }

    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4"
      style={{background:'linear-gradient(135deg, #080720 0%, #0f0d38 40%, #1e1b6e 100%)'}}>
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{background:'rgba(245,158,11,0.1)'}} />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="logo-mark">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Settle</span>
          </Link>
          <h1 className="font-display text-3xl text-white mb-2">Set new password</h1>
          <p className="text-sm" style={{color:'#94a3b8'}}>Choose a strong password for your account</p>
        </div>

        <div className="auth-card">
          {expired ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{background:'#fef2f2'}}>
                <svg className="w-6 h-6" style={{color:'#dc2626'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-bold text-slate-900 mb-2">Link expired or invalid</h2>
              <p className="text-sm mb-6" style={{color:'#64748b'}}>
                Reset links expire after 1 hour. Request a new one below.
              </p>
              <Link href="/forgot-password" className="btn-primary">
                Request new reset link
              </Link>
            </div>
          ) : !ready ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                style={{borderColor:'#f59e0b', borderTopColor:'transparent'}} />
              <p className="text-sm" style={{color:'#64748b'}}>Verifying reset link…</p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{color:'#64748b'}}>New password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="input" placeholder="8+ characters" required />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{color:'#64748b'}}>Confirm password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  className="input" placeholder="Same password again" required />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                {loading ? 'Updating…' : 'Set new password'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm mt-6" style={{color:'#64748b'}}>
          <Link href="/login" className="font-semibold transition-colors" style={{color:'#fbbf24'}}>
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
