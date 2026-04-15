import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

export async function GET() {
  const authClient = createServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Use service role for admin queries
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const [{ count: totalUsers }, { data: invoices }, { data: proUsers }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('invoices').select('total, status, created_at'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('subscription_tier', 'pro'),
  ])

  const paidInvoices = invoices?.filter(i => i.status === 'paid') ?? []
  const totalRevenue = paidInvoices.reduce((sum, i) => sum + (i.total ?? 0), 0)
  const thisMonth = new Date(); thisMonth.setDate(1); thisMonth.setHours(0,0,0,0)
  const revenueThisMonth = paidInvoices
    .filter(i => new Date(i.created_at) >= thisMonth)
    .reduce((sum, i) => sum + (i.total ?? 0), 0)

  return NextResponse.json({
    totalUsers: totalUsers ?? 0,
    proUsers: (proUsers as any)?.count ?? 0,
    totalRevenue,
    revenueThisMonth,
    totalInvoices: invoices?.length ?? 0,
    paidInvoices: paidInvoices.length,
  })
}
