import { createClient } from '@/lib/supabase/server'
import { sendEmail, estimateSentEmailHtml } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('estimates')
    .select('*, estimate_items(*), profiles(business_name, logo_url, business_address, business_phone, email, full_name, tax_id)')
    .eq('id', params.id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Estimate not found' }, { status: 404 })

  // Public can only see non-draft estimates
  if (!user && data.status === 'draft') {
    return NextResponse.json({ error: 'Estimate not found' }, { status: 404 })
  }

  // Authenticated users can only see their own
  if (user && data.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json({ data })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  const { data, error } = await supabase
    .from('estimates')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select('*, estimate_items(*), profiles(business_name, logo_url, email, full_name)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send estimate email to client when status changes to 'sent'
  if (body.status === 'sent' && data.client_email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!
    const viewUrl = `${appUrl}/estimates/${params.id}/view`
    const amount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(data.total)

    const profile = (data as any).profiles
    const freelancerName = profile?.business_name ?? profile?.full_name ?? 'Your freelancer'
    const validUntil = data.valid_until
      ? new Date(data.valid_until).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : undefined

    await sendEmail({
      to: data.client_email,
      subject: `Estimate ${data.estimate_number} from ${freelancerName} — ${amount} ${data.currency}`,
      html: estimateSentEmailHtml({
        freelancerName,
        clientName: data.client_name ?? 'there',
        estimateNumber: data.estimate_number,
        amount,
        currency: data.currency,
        viewUrl,
        validUntil,
        items: (data.estimate_items ?? []).map((i: any) => ({
          description: i.description,
          amount: i.amount,
        })),
      }),
    })
  }

  return NextResponse.json({ data })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('estimates')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
