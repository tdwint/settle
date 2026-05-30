import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Fetch the estimate with items
  const { data: estimate, error: fetchError } = await supabase
    .from('estimates')
    .select('*, estimate_items(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !estimate) return NextResponse.json({ error: 'Estimate not found' }, { status: 404 })
  if (estimate.status !== 'accepted') {
    return NextResponse.json({ error: 'Only accepted estimates can be converted to invoices' }, { status: 400 })
  }

  // Check invoice limit (converting counts as creating an invoice)
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier, invoices_this_month, invoices_month_reset')
    .eq('id', user.id)
    .single()

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

  if (profile?.subscription_tier !== 'pro' && invoicesThisMonth >= 5) {
    return NextResponse.json({
      error: 'Free plan limit reached. Upgrade to Pro to convert this estimate to an invoice.'
    }, { status: 403 })
  }

  // Create the invoice from estimate data
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      user_id: user.id,
      client_id: estimate.client_id ?? null,
      client_name: estimate.client_name,
      client_email: estimate.client_email,
      client_address: estimate.client_address ?? null,
      client_phone: estimate.client_phone ?? null,
      currency: estimate.currency,
      tax_rate: estimate.tax_rate,
      tax_amount: estimate.tax_amount,
      discount_amount: estimate.discount_amount,
      subtotal: estimate.subtotal,
      total: estimate.total,
      notes: estimate.notes ?? null,
      status: 'draft',
    })
    .select()
    .single()

  if (invoiceError) return NextResponse.json({ error: invoiceError.message }, { status: 500 })

  // Copy estimate items to invoice items
  const invoiceItems = (estimate.estimate_items ?? []).map((item: any) => ({
    invoice_id: invoice.id,
    description: item.description,
    quantity: item.quantity,
    rate: item.rate,
    amount: item.amount,
    sort_order: item.sort_order,
  }))

  if (invoiceItems.length > 0) {
    const { error: itemsError } = await supabase.from('invoice_items').insert(invoiceItems)
    if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  // Mark estimate as converted
  await supabase
    .from('estimates')
    .update({ status: 'converted', converted_invoice_id: invoice.id, updated_at: new Date().toISOString() })
    .eq('id', params.id)

  // Increment invoice count
  await supabase
    .from('profiles')
    .update({ invoices_this_month: invoicesThisMonth + 1 })
    .eq('id', user.id)

  return NextResponse.json({ data: { invoice_id: invoice.id } }, { status: 201 })
}
