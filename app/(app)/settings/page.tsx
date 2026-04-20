'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PLANS } from '@/lib/stripe'
import { useUser } from '@/lib/hooks/useUser'
import { useSearchParams } from 'next/navigation'

export default function SettingsPage() {
  const { profile, loading } = useUser()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') ?? 'profile')
  const [mfaEnrolling, setMfaEnrolling] = useState(false)
  const [mfaFactorId, setMfaFactorId] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [totpSecret, setTotpSecret] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [mfaError, setMfaError] = useState('')
  const [mfaSuccess, setMfaSuccess] = useState('')
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [billingLoading, setBillingLoading] = useState('')

  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessPhone, setBusinessPhone] = useState('')
  const [taxId, setTaxId] = useState('')
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '')
      setBusinessName(profile.business_name ?? '')
      setBusinessAddress(profile.business_address ?? '')
      setBusinessPhone(profile.business_phone ?? '')
      setTaxId(profile.tax_id ?? '')
      setCurrency(profile.currency)
    }
  }, [profile])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    await supabase.from('profiles').update({ full_name: fullName, business_name: businessName, business_address: businessAddress, business_phone: businessPhone, tax_id: taxId, currency }).eq('id', profile!.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function handleUpgrade(priceId: string) {
    setBillingLoading(priceId)
    const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId }) })
    const { url } = await res.json()
    window.location.href = url
  }

  async function handlePortal() {
    setBillingLoading('portal')
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    window.location.href = url
  }

  if (loading) return <div className="text-gray-400 text-sm">Loading…</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-800 text-gray-900 mb-8">Settings</h1>

      {searchParams.get('upgraded') && (
        <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-2xl px-5 py-4 mb-6 font-600">
          🎉 You're now on Pro! Enjoy unlimited invoices.
        </div>
      )}

      <div className="flex gap-1 mb-8 bg-gray-100 rounded-xl p-1 w-fit">
        {['profile', 'billing', 'security'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-600 transition-all ${tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <form onSubmit={handleSave} className="card p-6 space-y-4">
          <h2 className="font-700 text-gray-900 mb-2">Your profile</h2>
          {[
            { label: 'Full name', value: fullName, setter: setFullName, placeholder: 'Alex Johnson' },
            { label: 'Business name', value: businessName, setter: setBusinessName, placeholder: 'Alex Johnson Design' },
            { label: 'Business address', value: businessAddress, setter: setBusinessAddress, placeholder: '123 Main St, City, Country' },
            { label: 'Phone', value: businessPhone, setter: setBusinessPhone, placeholder: '+1 555 000 0000' },
            { label: 'Tax ID / VAT number', value: taxId, setter: setTaxId, placeholder: 'Optional' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-600 text-gray-700 mb-1.5">{f.label}</label>
              <input className="input" value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1.5">Default currency</label>
            <select className="input" value={currency} onChange={e => setCurrency(e.target.value)}>
              {['USD','EUR','GBP','CAD','AUD','JPY','CHF','INR'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save changes'}</button>
            {saved && <span className="text-teal-600 text-sm font-600">✓ Saved</span>}
          </div>
        </form>
      )}

      {tab === 'billing' && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-700 text-gray-900">Current plan</h2>
              <span className={`text-sm font-700 px-3 py-1 rounded-full ${profile?.subscription_tier === 'pro' ? 'bg-coral-100 text-coral-700' : 'bg-gray-100 text-gray-600'}`}>
                {profile?.subscription_tier === 'pro' ? 'Pro' : 'Free'}
              </span>
            </div>
            {profile?.subscription_tier === 'pro' ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  {profile.subscription_period_end
                    ? `Renews ${new Date(profile.subscription_period_end).toLocaleDateString()}`
                    : 'Active subscription'}
                </p>
                <button onClick={handlePortal} disabled={billingLoading === 'portal'} className="btn-secondary text-sm">
                  {billingLoading === 'portal' ? 'Opening…' : 'Manage billing & cancel'}
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-6">You're on the Free plan — {profile?.invoices_this_month ?? 0}/5 invoices used this month.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-2xl p-4">
                    <p className="font-700 text-gray-900 mb-1">Monthly</p>
                    <p className="text-2xl font-800 text-gray-900">$12<span className="text-sm font-400 text-gray-400">/mo</span></p>
                    <button onClick={() => handleUpgrade(PLANS.pro.monthlyPriceId)} disabled={!!billingLoading}
                      className="btn-primary w-full mt-4 text-sm">
                      {billingLoading === PLANS.pro.monthlyPriceId ? 'Loading…' : 'Upgrade monthly'}
                    </button>
                  </div>
                  <div className="border-2 border-coral-400 rounded-2xl p-4 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral-500 text-white text-xs font-700 px-3 py-1 rounded-full">Best value</div>
                    <p className="font-700 text-gray-900 mb-1">Annual</p>
                    <p className="text-2xl font-800 text-gray-900">$10<span className="text-sm font-400 text-gray-400">/mo</span></p>
                    <p className="text-xs text-gray-400">Billed $120/year</p>
                    <button onClick={() => handleUpgrade(PLANS.pro.annualPriceId)} disabled={!!billingLoading}
                      className="btn-primary w-full mt-4 text-sm">
                      {billingLoading === PLANS.pro.annualPriceId ? 'Loading…' : 'Upgrade annual'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {tab === 'security' && (
        <div className="card p-6 space-y-6">
          <div>
            <h2 className="font-bold text-slate-900 mb-1">Two-factor authentication</h2>
            <p className="text-sm text-slate-500 mb-4">
              Add an extra layer of security. After enabling, you'll need your authenticator
              app (Google Authenticator, Authy, etc.) when signing in.
            </p>

            {mfaSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 mb-4">
                {mfaSuccess}
              </div>
            )}
            {mfaError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
                {mfaError}
              </div>
            )}

            {!mfaEnrolling ? (
              <button
                onClick={async () => {
                  setMfaEnrolling(true)
                  setMfaError('')
                  const { createClient } = await import('@/lib/supabase/client')
                  const supabase = createClient()
                  // Clean up any stale unverified factors from previous attempts
                  const { data: existing } = await supabase.auth.mfa.listFactors()
                  for (const factor of existing?.totp ?? []) {
                    if (factor.status !== 'verified') {
                      await supabase.auth.mfa.unenroll({ factorId: factor.id })
                    }
                  }
                  const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Authenticator app' })
                  if (error) { setMfaError(error.message); setMfaEnrolling(false); return }
                  setMfaFactorId(data.id)
                  setQrCode(data.totp.qr_code)
                  setTotpSecret(data.totp.secret)
                }}
                className="btn-primary"
              >
                Set up authenticator app
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  1. Open your authenticator app and scan this QR code:
                </p>
                {qrCode && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 inline-block">
                    <img src={qrCode} alt="QR Code" className="w-40 h-40" />
                  </div>
                )}
                {totpSecret && (
                  <p className="text-xs text-slate-400">
                    Or enter manually: <span className="font-mono font-semibold text-slate-600">{totpSecret}</span>
                  </p>
                )}
                <p className="text-sm text-slate-600">2. Enter the 6-digit code from your app:</p>
                <div className="flex gap-3 items-center">
                  <input
                    className="input w-40 text-center text-lg font-mono tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    value={totpCode}
                    onChange={e => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  />
                  <button
                    onClick={async () => {
                      setMfaError('')
                      const { createClient } = await import('@/lib/supabase/client')
                      const supabase = createClient()
                      const factorId = mfaFactorId
                      if (!factorId) { setMfaError('Setup failed — please try again'); return }
                      const { data: challenge } = await supabase.auth.mfa.challenge({ factorId })
                      if (!challenge) { setMfaError('Challenge failed'); return }
                      const { error } = await supabase.auth.mfa.verify({ factorId, challengeId: challenge.id, code: totpCode })
                      if (error) { setMfaError('Invalid code — try again'); return }
                      setMfaSuccess('Two-factor authentication enabled!')
                      setMfaEnrolling(false)
                      setMfaEnabled(true)
                    }}
                    disabled={totpCode.length !== 6}
                    className="btn-primary"
                  >
                    Verify & enable
                  </button>
                  <button onClick={() => setMfaEnrolling(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-1">Passkey (Face ID / Touch ID)</h3>
            <p className="text-sm text-slate-500 mb-4">
              Sign in with Face ID or Touch ID instead of a password.
              Available on supported devices and browsers.
            </p>
            <button
              onClick={async () => {
                const { createClient } = await import('@/lib/supabase/client')
                const supabase = createClient()
                const { error } = await (supabase.auth as any).signInWithPasskey?.() ?? {}
                if (error) setMfaError('Passkey setup failed: ' + error.message)
                else setMfaSuccess('Passkey registered successfully!')
              }}
              className="btn-secondary"
            >
              Register passkey
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
