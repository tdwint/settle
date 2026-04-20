import Link from 'next/link'

export const metadata = { title: 'Support — Settle' }

export default function SupportPage() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#f8fafc' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(15,13,56,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="logo-mark">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-base font-bold text-white tracking-tight">Settle</span>
          </Link>
          <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors" style={{ color: 'rgba(148,163,184,1)' }}>
            Sign in
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b" style={{ background: 'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#fbbf24' }}>Help Center</p>
          <h1 className="font-display text-4xl text-white mb-3">Customer Support</h1>
          <p style={{ color: 'rgba(148,163,184,0.9)' }}>We're here to help. Reach out anytime.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Contact */}
        <section className="card p-8">
          <h2 className="font-display text-2xl mb-2" style={{ color: '#0f172a' }}>Contact us</h2>
          <p className="text-sm mb-6" style={{ color: '#64748b' }}>
            For billing questions, account issues, or anything else — email us and we'll respond within one business day.
          </p>
          <a
            href="mailto:support@gigpay.today"
            className="btn-primary inline-flex"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@gigpay.today
          </a>
          <p className="text-xs mt-4" style={{ color: '#94a3b8' }}>
            Operated by Botani Productions · Response time: within 1 business day
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-display text-2xl mb-6" style={{ color: '#0f172a' }}>Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I send an invoice?',
                a: 'From your dashboard, click "New invoice", fill in your client details and line items, then click "Send". Your client will receive an email with a payment link.'
              },
              {
                q: 'How do clients pay?',
                a: 'Clients receive a payment link by email. They can pay securely by card via Stripe — no account required. Funds are deposited to your connected bank account.'
              },
              {
                q: 'When do I receive my money?',
                a: 'Payouts follow Stripe\'s standard schedule — typically 2 business days after a payment is made. You can check your payout status in your Stripe dashboard.'
              },
              {
                q: 'What\'s the difference between Free and Pro?',
                a: 'Free gives you 5 invoices per month. Pro ($12/mo or $10/mo billed annually) gives you unlimited invoices, client reminders, CSV export, and priority support.'
              },
              {
                q: 'How do I cancel my Pro subscription?',
                a: 'Go to Settings → Billing → Manage billing & cancel. You\'ll keep Pro access until the end of your billing period.'
              },
              {
                q: 'Can I use my own branding on invoices?',
                a: 'Yes — upload your logo and set your business name in Settings → Profile. These appear on all your invoices and client emails.'
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. All data is encrypted in transit and at rest. Payments are processed by Stripe, a PCI-compliant payment processor. We never store card details.'
              },
              {
                q: 'What currencies are supported?',
                a: 'Settle supports USD, EUR, GBP, CAD, AUD, JPY, CHF, and INR. You can set your default currency in Settings → Profile.'
              },
            ].map(({ q, a }) => (
              <div key={q} className="card p-6">
                <h3 className="font-semibold mb-2" style={{ color: '#0f172a' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Still need help */}
        <section className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)' }}>
          <h2 className="font-display text-2xl text-white mb-2">Still need help?</h2>
          <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
            Can't find your answer above? Send us an email and we'll get back to you.
          </p>
          <a href="mailto:support@gigpay.today" className="btn-primary">
            Email support@gigpay.today
          </a>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t py-8 mt-8" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: '#94a3b8' }}>© {new Date().getFullYear()} Settle · Botani Productions</p>
          <div className="flex gap-6 text-xs" style={{ color: '#94a3b8' }}>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="/support" className="hover:text-slate-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
