import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { CreateInvoicePayload } from '@/lib/types'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Plan gating: free users max 3 invoices/month
  const { data: profile } = await supabase
    .from('profiles').select('subscription_tier, invoices_this_month, invoices_month_reset').eq('id', user.id).single()

  const now = new Date()
  const resetDate = new Date(profile?.invoices_month_reset)
  let invoicesThisMonth = profile?.invoices_this_month ?? 0

  if (now >= resetDate) {
    invoicesThisMonth = 0
    await supabase.from('profiles').update({
      invoices_this_month: 0,
      invoices_month_reset: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()
    }).eq('id', user.id)
  }

  if (profile?.subscription_tier !== 'pro' && invoicesThisMonth >= 3) {
    return NextResponse.json({ error: 'Free plan limit reached. Upgrade to Pro for unlimited invoices.' }, { status: 403 })
  }

  const body: CreateInvoicePayload = await request.json()
  if (!body.client_name || !body.client_email) {
    return NextResponse.json({ error: 'Client name and email are required' }, { status: 400 })
  }
  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: 'At least one line item is required' }, { status: 400 })
  }

  const subtotal = body.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const taxAmount = subtotal * ((body.tax_rate ?? 0) / 100)
  const discount = body.discount_amount ?? 0
  const total = subtotal + taxAmount - discount

  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      user_id: user.id,
      client_id: body.client_id ?? null,
      client_name: body.client_name,
      client_email: body.client_email,
      client_address: body.client_address ?? null,
      due_date: body.due_date ?? null,
      currency: body.currency,
      tax_rate: body.tax_rate ?? 0,
      tax_amount: taxAmount,
      discount_amount: discount,
      subtotal,
      total,
      notes: body.notes ?? null,
      status: 'draft',
    })
    .select()
    .single()

  if (invoiceError) return NextResponse.json({ error: invoiceError.message }, { status: 500 })

  const items = body.items.map((item, i) => ({
    invoice_id: invoice.id,
    description: item.description,
    quantity: item.quantity,
    rate: item.rate,
    amount: item.quantity * item.rate,
    sort_order: i,
  }))

  const { error: itemsError } = await supabase.from('invoice_items').insert(items)
  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 })

  await supabase.from('profiles').update({ invoices_this_month: invoicesThisMonth + 1 }).eq('id', user.id)

  return NextResponse.json({ data: invoice }, { status: 201 })
}
