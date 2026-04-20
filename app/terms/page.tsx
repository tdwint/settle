import Link from 'next/link'

export const metadata = { title: 'Terms of Service — Settle' }

export default function TermsPage() {
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
          <h1 className="font-display text-4xl text-white mb-3">Terms of Service</h1>
          <p style={{ color: 'rgba(148,163,184,0.9)' }}>Last updated: April 20, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="card p-10 space-y-10 text-sm leading-relaxed" style={{ color: '#475569' }}>

          <section>
            <p>
              These Terms of Service ("Terms") govern your use of Settle, operated by Botani Productions ("we", "us", "our"),
              accessible at gigpay.today. By creating an account or using Settle, you agree to be bound by these Terms.
              If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>1. The service</h2>
            <p className="mb-3">
              Settle is an invoicing and payment platform for freelancers and independent contractors. It allows you to
              create and send invoices, accept online payments via Stripe, and manage client relationships.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable
              notice. We will not be liable to you for any such changes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>2. Accounts</h2>
            <p className="mb-3">
              You must provide accurate and complete information when creating an account. You are responsible for
              maintaining the security of your account and password. Notify us immediately at{' '}
              <a href="mailto:support@gigpay.today" style={{ color: '#d97706' }}>support@gigpay.today</a> if you
              believe your account has been compromised.
            </p>
            <p>
              You may not use Settle if you are under 18 years of age, or if you are prohibited from receiving services
              under applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>3. Acceptable use</h2>
            <p className="mb-3">You agree to use Settle only for lawful purposes. You must not:</p>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li>Use the service to send fraudulent or misleading invoices</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Attempt to access accounts or data that do not belong to you</li>
              <li>Use the service in a way that could harm, disable, or overburden our systems</li>
              <li>Resell or sublicense access to the service without our written consent</li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate your account if we believe you are in violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>4. Payments and billing</h2>
            <p className="mb-3">
              <strong style={{ color: '#1e293b' }}>Subscription fees.</strong> Pro plan subscriptions are billed monthly
              or annually in advance. All fees are non-refundable except where required by law. You may cancel your
              subscription at any time; access continues until the end of the current billing period.
            </p>
            <p className="mb-3">
              <strong style={{ color: '#1e293b' }}>Invoice payments.</strong> Client payments on your invoices are
              processed by Stripe. Stripe's own terms and fees apply to payment processing. We are not responsible for
              payment disputes between you and your clients.
            </p>
            <p>
              <strong style={{ color: '#1e293b' }}>Free plan limits.</strong> Free accounts are limited to 5 invoices
              per month. We reserve the right to change plan limits with reasonable advance notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>5. Your content</h2>
            <p className="mb-3">
              You retain ownership of the content you create in Settle — your invoices, client data, and business information.
              By using Settle, you grant us a limited license to store and process your content solely to provide the service.
            </p>
            <p>
              You are solely responsible for the accuracy of invoices you send and for your compliance with applicable
              tax and invoicing laws in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>6. Intellectual property</h2>
            <p>
              Settle, including its design, code, trademarks, and content, is owned by Botani Productions. Nothing in
              these Terms grants you a right to use our name, logo, or trademarks without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>7. Disclaimer of warranties</h2>
            <p>
              Settle is provided "as is" and "as available" without warranties of any kind, express or implied. We do not
              warrant that the service will be uninterrupted, error-free, or free of harmful components. Use of the service
              is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>8. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Botani Productions shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of Settle, including lost profits, lost data,
              or business interruption. Our total liability to you shall not exceed the amount you paid us in the 12 months
              preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>9. Termination</h2>
            <p>
              You may close your account at any time by contacting us at{' '}
              <a href="mailto:support@gigpay.today" style={{ color: '#d97706' }}>support@gigpay.today</a>. We may
              suspend or terminate your account for violation of these Terms, with or without notice. Upon termination,
              your right to use the service ends immediately.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>10. Governing law</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which Botani Productions operates, without regard
              to conflict of law principles. Any disputes arising from these Terms shall be resolved through binding
              arbitration or in the courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>11. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. We'll notify you of material changes by email or by posting a
              notice in the app. Continued use of Settle after changes take effect constitutes your acceptance of the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#0f172a' }}>12. Contact</h2>
            <p>
              Questions about these Terms? Email us at{' '}
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
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <Link href="/support" className="hover:text-slate-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
