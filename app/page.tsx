import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-warm-50/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-coral-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-800">S</span>
            </div>
            <span className="text-xl font-800 text-gray-900">Settle</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-600 text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">Sign in</Link>
            <Link href="/signup" className="btn-primary text-sm py-2 px-4">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-sm font-600 px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
          Free to start — no credit card needed
        </div>
        <h1 className="text-5xl md:text-6xl font-800 text-gray-900 leading-tight mb-6">
          Get paid faster.<br />
          <span className="text-coral-500">No chasing required.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Settle makes invoicing effortless for freelancers — send professional invoices in seconds
          and let clients pay online instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn-primary text-base px-8 py-3">
            Start sending invoices →
          </Link>
          <a href="#features" className="btn-secondary text-base px-8 py-3">See how it works</a>
        </div>

        {/* HERO CARD MOCKUP */}
        <div className="mt-16 relative max-w-3xl mx-auto">
          <div className="card p-6 text-left shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-600">Invoice</p>
                <p className="text-lg font-700 text-gray-900">INV-0042</p>
              </div>
              <span className="bg-teal-100 text-teal-700 text-sm font-600 px-3 py-1 rounded-full">Paid ✓</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-500 mb-1">Billed to</p>
                <p className="font-600 text-gray-900">Acme Corp</p>
                <p className="text-sm text-gray-500">sarah@acmecorp.com</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="text-3xl font-800 text-gray-900">$2,400.00</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Web design & development · 12h @ $200</span>
                <span className="font-600 text-gray-900">$2,400</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-teal-500 text-white rounded-2xl px-4 py-2 text-sm font-700 shadow-lg">
            💸 Payment received!
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-800 text-gray-900 mb-4">Everything you need to get paid</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Built for freelancers who'd rather spend time doing great work than chasing payments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '✨', color: 'bg-coral-50', title: 'Beautiful custom invoices', desc: 'Add your logo, business name, and brand colors. Every invoice looks like it came from a real studio.' },
              { icon: '💳', color: 'bg-teal-50', title: 'Online payments via card', desc: 'Clients pay directly from the invoice — card or bank transfer. Money lands in your account automatically.' },
              { icon: '🔔', color: 'bg-warm-100', title: 'Know the second they pay', desc: 'Instant notifications when a client views or pays your invoice. No more "did you get it?" emails.' },
            ].map(f => (
              <div key={f.title} className="card p-6">
                <div className={`${f.color} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4`}>{f.icon}</div>
                <h3 className="font-700 text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-800 text-gray-900 mb-4">Simple, honest pricing</h2>
          <p className="text-lg text-gray-500">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* FREE */}
          <div className="card p-8">
            <p className="font-700 text-gray-900 text-lg mb-1">Free</p>
            <p className="text-4xl font-800 text-gray-900 mb-1">$0<span className="text-lg font-500 text-gray-400">/mo</span></p>
            <p className="text-gray-500 text-sm mb-6">Forever free</p>
            <ul className="space-y-3 mb-8">
              {['3 invoices per month', 'Custom branding', 'Online payments', 'PDF export'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-teal-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="btn-secondary w-full text-center block">Get started free</Link>
          </div>
          {/* PRO */}
          <div className="card p-8 border-coral-200 bg-gradient-to-b from-coral-50 to-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-coral-500 text-white text-xs font-700 px-3 py-1 rounded-full">Popular</div>
            <p className="font-700 text-gray-900 text-lg mb-1">Pro</p>
            <p className="text-4xl font-800 text-gray-900 mb-1">$12<span className="text-lg font-500 text-gray-400">/mo</span></p>
            <p className="text-gray-500 text-sm mb-6">$120/year — save 2 months</p>
            <ul className="space-y-3 mb-8">
              {['Unlimited invoices', 'Custom branding', 'Online payments', 'PDF export', 'Client reminders', 'CSV export'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-teal-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="btn-primary w-full text-center block">Start Pro free</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-800 text-gray-900 text-center mb-16">Freelancers love Settle</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Maya T.', role: 'Graphic Designer', quote: 'I used to dread sending invoices. Now I do it in 2 minutes and clients actually pay on time.' },
              { name: 'James R.', role: 'Web Developer', quote: 'The payment link on the invoice is a game changer. No more PayPal back-and-forth.' },
              { name: 'Priya K.', role: 'Copywriter', quote: 'Finally an invoicing tool that doesn\'t feel like filing taxes. Clean, fast, and my clients love it.' },
            ].map(t => (
              <div key={t.name} className="card p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center font-700 text-coral-600">{t.name[0]}</div>
                  <div>
                    <p className="font-700 text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-6xl mx-auto px-6 text-center">
        <div className="bg-coral-500 rounded-3xl px-8 py-16">
          <h2 className="text-4xl font-800 text-white mb-4">Ready to get paid on time?</h2>
          <p className="text-coral-100 text-lg mb-8 max-w-xl mx-auto">Join thousands of freelancers who use Settle to send invoices and get paid faster.</p>
          <Link href="/signup" className="inline-block bg-white text-coral-600 font-700 px-8 py-3 rounded-xl hover:bg-coral-50 transition-colors">
            Start for free — no card needed →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-coral-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-800 text-xs">S</span>
            </div>
            <span className="font-600 text-gray-600">Settle</span>
          </div>
          <p>© {new Date().getFullYear()} Settle. Built for freelancers.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
