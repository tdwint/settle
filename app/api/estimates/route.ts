import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { CreateEstimatePayload } from '@/lib/types'

export async function GET() {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('estimates')
    .select('*, estimate_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // NO invoice limit check — estimates are unlimited on all plans

  const body: CreateEstimatePayload = await request.json()
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

  const { data: estimate, error: estimateError } = await supabase
    .from('estimates')
    .insert({
      user_id: user.id,
      client_id: body.client_id ?? null,
      client_name: body.client_name,
      client_email: body.client_email,
      client_address: body.client_address ?? null,
      client_phone: body.client_phone ?? null,
      valid_until: body.valid_until ?? null,
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

  if (estimateError) return NextResponse.json({ error: estimateError.message }, { status: 500 })

  const items = body.items.map((item, i) => ({
    estimate_id: estimate.id,
    description: item.description,
    quantity: item.quantity,
    rate: item.rate,
    amount: item.quantity * item.rate,
    sort_order: i,
  }))

  const { error: itemsError } = await supabase.from('estimate_items').insert(items)
  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 })

  // Auto-create client if needed
  if (body.client_email && !body.client_id) {
    const { data: existingClient } = await supabase
      .from('clients')
      .select('id')
      .eq('user_id', user.id)
      .eq('email', body.client_email.trim())
      .single()

    if (!existingClient) {
      const { data: newClient } = await supabase.from('clients').insert({
        user_id: user.id,
        name: body.client_name.trim(),
        email: body.client_email.trim(),
        address: body.client_address?.trim() ?? null,
        phone: body.client_phone?.trim() ?? null,
      }).select().single()
      if (newClient) {
        await supabase.from('estimates').update({ client_id: newClient.id }).eq('id', estimate.id)
      }
    } else {
      await supabase.from('estimates').update({ client_id: existingClient.id }).eq('id', estimate.id)
    }
  }

  return NextResponse.json({ data: estimate }, { status: 201 })
}
