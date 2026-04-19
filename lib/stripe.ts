import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    invoicesPerMonth: 3,
    features: ['5 invoices/month', 'Custom branding', 'Online payments', 'PDF export'],
  },
  pro: {
    name: 'Pro',
    monthlyPriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    annualPriceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID!,
    monthlyPrice: 12,
    annualPrice: 120,
    invoicesPerMonth: Infinity,
    features: ['Unlimited invoices', 'Custom branding', 'Online payments', 'PDF export', 'Client reminders', 'CSV export'],
  },
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}
