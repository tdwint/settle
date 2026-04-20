export type SubscriptionTier = 'free' | 'pro'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  business_name: string | null
  business_address: string | null
  business_phone: string | null
  logo_url: string | null
  tax_id: string | null
  currency: string
  stripe_customer_id: string | null
  stripe_account_id: string | null
  subscription_status: string
  subscription_tier: SubscriptionTier
  subscription_period_end: string | null
  invoices_this_month: number
  invoices_month_reset: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  email: string
  address: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  description: string
  quantity: number
  rate: number
  amount: number
  sort_order: number
  created_at: string
}

export interface Invoice {
  id: string
  user_id: string
  client_id: string | null
  invoice_number: string
  status: InvoiceStatus
  issue_date: string
  due_date: string | null
  currency: string
  subtotal: number
  tax_rate: number
  tax_amount: number
  discount_amount: number
  total: number
  notes: string | null
  client_name: string | null
  client_email: string | null
  client_address: string | null
  client_phone: string | null
  stripe_payment_intent_id: string | null
  stripe_payment_link: string | null
  paid_at: string | null
  sent_at: string | null
  created_at: string
  updated_at: string
  invoice_items?: InvoiceItem[]
  profiles?: Profile
}

export interface InvoiceWithItems extends Invoice {
  invoice_items: InvoiceItem[]
}

export interface DashboardStats {
  totalRevenue: number
  paidInvoices: number
  pendingInvoices: number
  overdueInvoices: number
  invoicesThisMonth: number
}

export interface CreateInvoicePayload {
  client_id?: string
  client_name: string
  client_email: string
  client_address?: string
  client_phone?: string
  due_date?: string
  tax_rate?: number
  discount_amount?: number
  notes?: string
  currency: string
  items: { description: string; quantity: number; rate: number }[]
}
