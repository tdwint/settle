'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } }
    })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4" style={{background:'linear-gradient(135deg, #080720 0%, #0f0d38 40%, #1e1b6e 100%)'}}>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="logo-mark">
              <span className="text-white font-700">S</span>
            </div>
            <span className="text-xl font-700 text-white tracking-tight">Settle</span>
          </Link>
          <h1 className="font-display text-3xl text-white mb-2">Start getting paid</h1>
          <p className="text-slate-400 text-sm">Free forever · No credit card needed</p>
        </div>

        <div className="auth-card">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">Full name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                className="input" placeholder="Alex Johnson" required />
            </div>
            <div>
              <label className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="input" placeholder="8+ characters" required />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Creating account…</>
              ) : 'Create free account'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-5 pt-4 border-t border-slate-100">
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-600 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
