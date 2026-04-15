// Run with: npx ts-node stripe/setup.ts
// Creates the Pro plan products and prices in your Stripe account

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

async function setup() {
  console.log('Creating Settle Pro product in Stripe...\n')

  const product = await stripe.products.create({
    name: 'Settle Pro',
    description: 'Unlimited invoices, client reminders, CSV export',
  })

  const monthly = await stripe.prices.create({
    product: product.id,
    currency: 'usd',
    unit_amount: 1200,
    recurring: { interval: 'month' },
    nickname: 'Pro Monthly',
  })

  const annual = await stripe.prices.create({
    product: product.id,
    currency: 'usd',
    unit_amount: 12000,
    recurring: { interval: 'year' },
    nickname: 'Pro Annual',
  })

  console.log('✅ Done! Add these to your .env.local:\n')
  console.log(`STRIPE_PRO_MONTHLY_PRICE_ID=${monthly.id}`)
  console.log(`STRIPE_PRO_ANNUAL_PRICE_ID=${annual.id}`)
}

setup().catch(console.error)
