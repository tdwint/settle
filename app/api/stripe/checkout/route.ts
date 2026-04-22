import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { priceId, invoiceId } = await request.json()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  const supabase = createClient()

  // ── Subscription checkout (requires auth) ──────────────────
  if (priceId) {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles').select('stripe_customer_id, email').eq('id', user.id).single()

    let customerId = profile?.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({ email: profile?.email ?? user.email! })
      customerId = customer.id
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    let session
    try {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: `${appUrl}/settings?upgraded=true`,
        cancel_url: `${appUrl}/settings`,
        metadata: { userId: user.id },
      })
    } catch (err: any) {
      console.error('[checkout] Stripe error:', err?.message)
      return NextResponse.json({ error: err?.message ?? 'Stripe error' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  }

  // ── Invoice payment checkout (public — no auth required) ───
  if (invoiceId) {
    const { data: invoice } = await supabase
      .from('invoices').select('*, profiles(email, full_name, business_name)')
      .eq('id', invoiceId).single()

    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    if (invoice.status === 'paid') return NextResponse.json({ error: 'Already paid' }, { status: 400 })
    if (!invoice.total || invoice.total <= 0) return NextResponse.json({ error: 'Invoice total must be greater than zero' }, { status: 400 })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: invoice.currency.toLowerCase(),
          product_data: {
            name: `Invoice ${invoice.invoice_number}`,
            description: `From ${invoice.profiles?.business_name ?? invoice.profiles?.full_name}`,
          },
          unit_amount: Math.round(invoice.total * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${appUrl}/invoices/${invoiceId}/pay?paid=true`,
      cancel_url: `${appUrl}/invoices/${invoiceId}/pay`,
      metadata: { invoiceId, freelancerId: invoice.user_id },
    })

    await supabase.from('invoices').update({ stripe_payment_link: session.url }).eq('id', invoiceId)
    return NextResponse.json({ url: session.url })
  }

  return NextResponse.json({ error: 'Missing priceId or invoiceId' }, { status: 400 })
}
