// Public endpoint — no auth required
// Client uses this to accept or decline an estimate
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendEmail, estimateRespondedEmailHtml } from '@/lib/email'
import { NextResponse } from 'next/server'

const supabase = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const { action, note } = body as { action: 'accept' | 'decline'; note?: string }

  if (action !== 'accept' && action !== 'decline') {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  // Fetch the estimate
  const { data: estimate, error: fetchError } = await supabase
    .from('estimates')
    .select('*, profiles(business_name, full_name, email)')
    .eq('id', params.id)
    .single()

  if (fetchError || !estimate) return NextResponse.json({ error: 'Estimate not found' }, { status: 404 })

  if (!['sent', 'viewed'].includes(estimate.status)) {
    return NextResponse.json({ error: 'This estimate has already been responded to' }, { status: 400 })
  }

  // Check if expired
  if (estimate.valid_until && new Date(estimate.valid_until) < new Date()) {
    return NextResponse.json({ error: 'This estimate has expired' }, { status: 400 })
  }

  const now = new Date().toISOString()
  const newStatus = action === 'accept' ? 'accepted' : 'declined'

  // Update estimate
  const updatePayload: Record<string, any> = {
    status: newStatus,
    responded_at: now,
    updated_at: now,
  }
  if (note?.trim()) updatePayload.client_note = note.trim()
  if (!estimate.viewed_at) updatePayload.viewed_at = now

  await supabase.from('estimates').update(updatePayload).eq('id', params.id)

  // Notify the freelancer
  const profile = estimate.profiles as any
  const freelancerEmail = profile?.email
  if (freelancerEmail) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!
    const estimateUrl = `${appUrl}/estimates/${params.id}`
    const amount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(estimate.total)

    const freelancerName = profile?.business_name ?? profile?.full_name ?? 'there'

    await sendEmail({
      to: freelancerEmail,
      subject: `${estimate.client_name} ${newStatus} estimate ${estimate.estimate_number}`,
      html: estimateRespondedEmailHtml({
        freelancerName,
        clientName: estimate.client_name ?? 'Your client',
        estimateNumber: estimate.estimate_number,
        amount,
        currency: estimate.currency,
        action: newStatus as 'accepted' | 'declined',
        clientNote: note?.trim(),
        estimateUrl,
      }),
    })
  }

  return NextResponse.json({ success: true, status: newStatus })
}
