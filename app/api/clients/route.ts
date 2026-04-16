import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Fetch clients with invoice count + total billed
  const { data: clients, error } = await supabase
    .from('clients')
    .select(`
      *,
      invoices(id, total, status)
    `)
    .eq('user_id', user.id)
    .order('name')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Compute stats per client
  const enriched = (clients ?? []).map(c => ({
    ...c,
    invoice_count: c.invoices?.length ?? 0,
    total_billed: (c.invoices ?? []).reduce((s: number, i: any) => s + (i.total ?? 0), 0),
    total_paid: (c.invoices ?? []).filter((i: any) => i.status === 'paid').reduce((s: number, i: any) => s + (i.total ?? 0), 0),
    invoices: undefined, // strip raw invoices from response
  }))

  return NextResponse.json({ data: enriched })
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  if (!body.name?.trim()) return NextResponse.json({ error: 'Client name is required' }, { status: 400 })
  if (!body.email?.trim()) return NextResponse.json({ error: 'Client email is required' }, { status: 400 })

  // Check for duplicate email for this user
  const { data: existing } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .eq('email', body.email.trim())
    .single()

  if (existing) return NextResponse.json({ error: 'A client with this email already exists' }, { status: 409 })

  const { data, error } = await supabase
    .from('clients')
    .insert({
      user_id: user.id,
      name: body.name.trim(),
      email: body.email.trim(),
      address: body.address?.trim() ?? null,
      phone: body.phone?.trim() ?? null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
