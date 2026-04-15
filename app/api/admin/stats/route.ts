import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [{ count: totalUsers }, { data: invoices }, { count: proUsers }] = await Promise.all([
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
    proUsers: proUsers ?? 0,
    totalRevenue,
    revenueThisMonth,
    totalInvoices: invoices?.length ?? 0,
    paidInvoices: paidInvoices.length,
  })
}
