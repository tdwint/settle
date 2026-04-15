'use client'
import { useUser } from './useUser'

export function useSubscription() {
  const { profile, loading } = useUser()
  const tier = profile?.subscription_tier ?? 'free'
  const status = profile?.subscription_status ?? 'free'
  const isActive = tier === 'pro' && (status === 'active' || status === 'trialing')
  const isPro = isActive
  const invoicesThisMonth = profile?.invoices_this_month ?? 0
  const canCreateInvoice = isPro || invoicesThisMonth < 3

  return { tier, status, isActive, isPro, canCreateInvoice, invoicesThisMonth, loading }
}
