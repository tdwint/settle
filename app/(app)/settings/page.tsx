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
    const supabase = await createClient()
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
        {['profile', 'billing'].map(t => (
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
                <p className="text-sm text-gray-600 mb-6">You're on the Free plan — {profile?.invoices_this_month ?? 0}/3 invoices used this month.</p>
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
    </div>
  )
}
