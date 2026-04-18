'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4" style={{background:'linear-gradient(135deg, #080720 0%, #0f0d38 40%, #1e1b6e 100%)'}}>
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="logo-mark">
              <span className="text-white font-700">S</span>
            </div>
            <span className="text-xl font-700 text-white tracking-tight">Settle</span>
          </Link>
          <h1 className="font-display text-3xl text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 text-sm">Sign in to your account</p>
        </div>

        <div className="auth-card">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input" placeholder="you@example.com" required />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-600 uppercase tracking-wider text-slate-500">Password</label>
                <Link href="/forgot-password" className="text-xs text-amber-600 hover:text-amber-500 font-500 transition-colors">Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="input" placeholder="••••••••" required />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Signing in…</>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-600 transition-colors">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
