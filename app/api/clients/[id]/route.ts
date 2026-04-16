import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  if (body.name !== undefined && !body.name?.trim()) {
    return NextResponse.json({ error: 'Client name cannot be empty' }, { status: 400 })
  }

  const updates: Record<string, string> = {}
  if (body.name) updates.name = body.name.trim()
  if (body.email) updates.email = body.email.trim()
  if (body.address !== undefined) updates.address = body.address?.trim() ?? ''
  if (body.phone !== undefined) updates.phone = body.phone?.trim() ?? ''

  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', params.id)
    .eq('user_id', user.id) // RLS: can only edit own clients
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Check if client has invoices — warn but allow
  const { count } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })
    .eq('client_id', params.id)

  if ((count ?? 0) > 0) {
    // Invoices keep their client_name snapshot, so deletion is safe
    // client_id will be set to NULL via ON DELETE SET NULL in schema
  }

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
