import { stripe } from '@/lib/stripe'
import { sendEmail, invoicePaidEmailHtml } from '@/lib/email'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // ── Invoice payment completed ──────────────────────────
      if (session.metadata?.invoiceId) {
        const invoiceId = session.metadata.invoiceId

        await supabase.from('invoices').update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          stripe_payment_intent_id: session.payment_intent as string,
        }).eq('id', invoiceId)

        // Fetch invoice + line items + freelancer profile for email
        const { data: invoice } = await supabase
          .from('invoices')
          .select('*, invoice_items(*), profiles(email, full_name, business_name)')
          .eq('id', invoiceId)
          .single()

        // Notify freelancer the moment their client pays
        if (invoice?.profiles?.email) {
          const freelancerName = invoice.profiles.business_name ?? invoice.profiles.full_name ?? 'there'
          const amount = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2, maximumFractionDigits: 2,
          }).format(invoice.total)

          const items = (invoice.invoice_items ?? []).map((item: any) => ({
            description: item.description,
            amount: item.amount,
          }))

          await sendEmail({
            to: invoice.profiles.email,
            subject: `💸 ${invoice.client_name} paid ${invoice.invoice_number} — ${amount} ${invoice.currency}`,
            html: invoicePaidEmailHtml({
              freelancerName,
              clientName: invoice.client_name,
              invoiceNumber: invoice.invoice_number,
              amount,
              currency: invoice.currency,
              invoiceUrl: `${process.env.NEXT_PUBLIC_APP_URL}/invoices/${invoiceId}`,
              items,
            }),
          })
        }
      }

      // ── Subscription started ───────────────────────────────
      if (session.metadata?.userId && session.mode === 'subscription') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        await supabase.from('profiles').update({
          subscription_status: subscription.status,
          subscription_tier: 'pro',
          subscription_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
          stripe_customer_id: session.customer as string,
        }).eq('id', session.metadata.userId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customer = await stripe.customers.retrieve(subscription.customer as string)
      if (customer.deleted) break
      await supabase.from('profiles').update({
        subscription_status: subscription.status,
        subscription_tier: subscription.status === 'active' ? 'pro' : 'free',
        subscription_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      }).eq('stripe_customer_id', subscription.customer)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabase.from('profiles').update({
        subscription_status: 'cancelled',
        subscription_tier: 'free',
        subscription_period_end: null,
      }).eq('stripe_customer_id', subscription.customer)
      break
    }
  }

  return NextResponse.json({ received: true })
}
