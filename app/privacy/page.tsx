import Link from 'next/link'

export const metadata = { title: 'Privacy Policy — Settle' }

export default function PrivacyPage() {
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#fbbf24' }}>Legal</p>
          <h1 className="font-display text-4xl text-white mb-3">Privacy Policy</h1>
          <p style={{ color: 'rgba(148,163,184,0.9)' }}>Last updated: April 20, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="card p-10 space-y-10 text-sm leading-relaxed" style={{ color: '#475569' }}>

          <section>
            <p>
              Settle ("we", "us", "our") is operated by Botani Productions. This Privacy Policy explains how we collect,
              use, and protect your information when you use Settle at gigpay.today. By using Settle, you agree to the
              practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>1. Information we collect</h2>
            <p className="mb-3"><strong style={{ color: '#1e293b' }}>Account information.</strong> When you sign up, we collect your email address and any profile information you choose to provide, including your name, business name, address, phone number, and tax ID.</p>
            <p className="mb-3"><strong style={{ color: '#1e293b' }}>Invoice data.</strong> We store the invoices you create, including client names, email addresses, billing addresses, phone numbers, and line item details.</p>
            <p className="mb-3"><strong style={{ color: '#1e293b' }}>Payment data.</strong> Payments are processed by Stripe. We do not store card numbers or bank details. We receive confirmation of payments and store invoice payment status.</p>
            <p><strong style={{ color: '#1e293b' }}>Usage data.</strong> We may collect basic usage information such as pages visited and features used to improve the product.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>2. How we use your information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li>Provide and operate the Settle service</li>
              <li>Send invoices and payment notifications on your behalf</li>
              <li>Process subscription payments via Stripe</li>
              <li>Respond to support requests</li>
              <li>Improve the product and fix issues</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>3. Information we share</h2>
            <p className="mb-3">We share your information only in the following circumstances:</p>
            <p className="mb-3"><strong style={{ color: '#1e293b' }}>Stripe.</strong> We use Stripe to process payments. When you or your clients make payments, relevant transaction data is shared with Stripe under their own privacy policy (stripe.com/privacy).</p>
            <p className="mb-3"><strong style={{ color: '#1e293b' }}>Supabase.</strong> Your account and invoice data is stored using Supabase, our database provider.</p>
            <p className="mb-3"><strong style={{ color: '#1e293b' }}>Resend.</strong> Transactional emails (invoice notifications, payment confirmations) are sent via Resend.</p>
            <p>We may disclose your information if required to do so by law or to protect our rights.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>4. Your client's data</h2>
            <p>
              When you add a client to Settle, you are responsible for ensuring you have the right to share their information
              with us for invoicing purposes. We process client data on your behalf solely to provide the service. We do not
              use your clients' data for any other purpose, and we do not contact your clients except to send the invoice
              emails and payment receipts you initiate.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>5. Data retention</h2>
            <p>
              We retain your account and invoice data for as long as your account is active. If you delete your account,
              we will delete your data within 30 days, except where we are required to retain it for legal or financial
              compliance purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>6. Security</h2>
            <p>
              We take reasonable measures to protect your data, including encryption in transit (HTTPS) and at rest.
              Payments are handled exclusively by Stripe, a PCI DSS-compliant payment processor. We never store card
              numbers or sensitive payment credentials.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>7. Cookies</h2>
            <p>
              Settle uses essential cookies to keep you signed in and maintain your session. We do not use advertising
              or tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>8. Your rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your invoice data</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:support@gigpay.today" style={{ color: '#d97706' }}>support@gigpay.today</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we'll update the "Last updated" date at
              the top of this page. Continued use of Settle after changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>10. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:support@gigpay.today" style={{ color: '#d97706' }}>support@gigpay.today</a>.
            </p>
            <p className="mt-2" style={{ color: '#94a3b8' }}>Botani Productions · gigpay.today</p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: '#e2e8f0' }}>
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
