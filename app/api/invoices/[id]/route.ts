import { createClient } from '@/lib/supabase/server'
import { sendEmail, invoiceSentEmailHtml } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*), profiles(business_name, logo_url, business_address, business_phone, email, full_name, tax_id)')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  if (!user && !['sent', 'paid'].includes(data.status)) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

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
    .from('invoices')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select('*, invoice_items(*), profiles(business_name, logo_url, email, full_name)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send invoice email to client when status changes to 'sent'
  if (body.status === 'sent' && data.client_email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!
    const paymentUrl = `${appUrl}/invoices/${params.id}/pay`
    const amount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(data.total)

    const profile = (data as any).profiles
    const freelancerName = profile?.business_name ?? profile?.full_name ?? 'Your freelancer'

    await sendEmail({
      to: data.client_email,
      subject: `Invoice ${data.invoice_number} from ${freelancerName} — ${amount} ${data.currency}`,
      html: invoiceSentEmailHtml({
        freelancerName,
        clientName: data.client_name,
        invoiceNumber: data.invoice_number,
        amount,
        currency: data.currency,
        paymentUrl,
        items: (data.invoice_items ?? []).map((i: any) => ({
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
    .from('invoices')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
