import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-100 font-sans">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-cream-100/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="logo-mark">
              <span className="text-white font-700 text-sm">S</span>
            </div>
            <span className="logo-text">Settle</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-500 text-slate-500">
            <a href="#features" className="hover:text-slate-800 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-800 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost">Sign in</Link>
            <Link href="/signup" className="btn-primary">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-navy opacity-[0.97]" />
        <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-[0.06]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-amber-300 text-xs font-600 uppercase tracking-wider px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              Free to start — no credit card required
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Get paid faster.<br />
              <span className="text-amber-400">No chasing</span> required.
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-10">
              Settle makes invoicing effortless for freelancers. Send professional
              invoices in seconds and let clients pay online instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="btn-primary text-base px-7 py-3">
                Start sending invoices
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="#features" className="btn-secondary text-base px-7 py-3 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30">
                See how it works
              </a>
            </div>
          </div>

          {/* HERO INVOICE CARD */}
          <div className="absolute right-6 top-20 hidden lg:block w-80 animate-fade-up-delay-2">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs font-600 uppercase tracking-wider text-slate-400 mb-1">Invoice</p>
                  <p className="text-lg font-700 text-slate-900">INV-0042</p>
                </div>
                <span className="badge-paid">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Paid
                </span>
              </div>

              <div className="space-y-2 mb-5 pb-5 border-b border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Web design · 8h</span>
                  <span className="font-600 text-slate-800">$1,600</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Development · 4h</span>
                  <span className="font-600 text-slate-800">$800</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">Billed to</p>
                  <p className="text-sm font-600 text-slate-800">Acme Corp</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="text-2xl font-700 text-slate-900">$2,400</p>
                </div>
              </div>
            </div>

            {/* Notification popup */}
            <div className="mt-3 bg-emerald-600 text-white rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-lg animate-fade-up-delay-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-base">💸</span>
              </div>
              <div>
                <p className="text-xs font-600">Payment received</p>
                <p className="text-xs text-emerald-200">Acme Corp paid $2,400.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-100 to-transparent" />
      </section>

      {/* ── LOGOS / SOCIAL PROOF ────────────────────────────── */}
      <section className="py-12 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-600 uppercase tracking-widest text-slate-400 mb-6">Trusted by freelancers worldwide</p>
          <div className="flex items-center justify-center gap-12 text-slate-300">
            {['Designers', 'Developers', 'Copywriters', 'Consultants', 'Photographers'].map(role => (
              <span key={role} className="text-sm font-500 text-slate-400">{role}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section id="features" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-600 uppercase tracking-widest text-amber-600 mb-3">Features</p>
          <h2 className="font-display text-4xl text-slate-900 mb-4">Everything you need to get paid</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Built for freelancers who'd rather spend time doing great work than chasing payments.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '✦',
              color: 'bg-amber-50 text-amber-600',
              title: 'Beautiful custom invoices',
              desc: 'Add your logo, business name, and brand. Every invoice looks like it came from a real studio — because it did.',
            },
            {
              icon: '⬡',
              color: 'bg-blue-50 text-blue-600',
              title: 'Online payments via card',
              desc: 'Clients pay directly from the invoice link. Money lands in your account automatically via Stripe.',
            },
            {
              icon: '◉',
              color: 'bg-emerald-50 text-emerald-600',
              title: 'Know the second they pay',
              desc: 'Instant email the moment a client pays. No more refreshing your bank app or sending "just checking in" emails.',
            },
            {
              icon: '⊞',
              color: 'bg-purple-50 text-purple-600',
              title: 'Client management',
              desc: 'Keep all your clients in one place. See total billed, outstanding amounts, and invoice history at a glance.',
            },
            {
              icon: '◎',
              color: 'bg-rose-50 text-rose-600',
              title: 'Tax & discounts built in',
              desc: 'Add tax rates, discounts, and notes to every invoice. Your tax ID prints automatically on every document.',
            },
            {
              icon: '⬟',
              color: 'bg-slate-50 text-slate-600',
              title: 'Multi-currency support',
              desc: 'Bill clients in USD, EUR, GBP, and 5 other currencies. Perfect for international freelancers.',
            },
          ].map((f, i) => (
            <div key={f.title} className={`card-hover p-6 animate-fade-up-delay-${Math.min(i + 1, 4)}`}>
              <div className={`${f.color} w-10 h-10 rounded-xl flex items-center justify-center text-lg font-700 mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-600 text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-slate-900/[0.02] border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-600 uppercase tracking-widest text-amber-600 mb-3">Pricing</p>
            <h2 className="font-display text-4xl text-slate-900 mb-4">Simple, honest pricing</h2>
            <p className="text-slate-500">Start free. Upgrade when you're ready for more.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* FREE */}
            <div className="card p-8">
              <p className="text-xs font-600 uppercase tracking-widest text-slate-400 mb-4">Free</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-700 text-slate-900">$0</span>
              </div>
              <p className="text-sm text-slate-400 mb-8">Forever free, no card needed</p>
              <ul className="space-y-3 mb-8">
                {['3 invoices per month', 'Custom branding', 'Online payments', 'PDF export', 'Client management'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-secondary w-full justify-center">Get started free</Link>
            </div>

            {/* PRO */}
            <div className="relative rounded-2xl p-8 overflow-hidden" style={{background:'linear-gradient(160deg, #0f0d38 0%, #1e1b6e 100%)'}}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-700 px-3 py-1 rounded-full">Most popular</div>

              <p className="text-xs font-600 uppercase tracking-widest text-amber-400/80 mb-4">Pro</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-700 text-white">$12</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <p className="text-sm text-slate-400 mb-8">$120/year — save 2 months</p>

              <ul className="space-y-3 mb-8">
                {['Unlimited invoices', 'Custom branding', 'Online payments', 'PDF export', 'Client management', 'Client reminders', 'CSV export', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-primary w-full justify-center">Start Pro free</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-600 uppercase tracking-widest text-amber-600 mb-3">Testimonials</p>
          <h2 className="font-display text-4xl text-slate-900">Freelancers love Settle</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Maya T.', role: 'Graphic Designer', quote: 'I used to dread invoicing. Now I do it in 2 minutes and clients actually pay on time. The payment link is genius.' },
            { name: 'James R.', role: 'Web Developer', quote: 'The moment I get that "payment received" email is the best feeling. No more checking my bank app every hour.' },
            { name: 'Priya K.', role: 'Copywriter', quote: 'Finally an invoicing tool that doesn\'t feel like filing taxes. Clean, fast, and my clients always comment on how professional it looks.' },
          ].map((t, i) => (
            <div key={t.name} className={`card p-6 animate-fade-up-delay-${i + 1}`}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-gradient-navy flex items-center justify-center font-700 text-amber-400 text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-600 text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl px-10 py-16 text-center" style={{background:'linear-gradient(135deg, #0f0d38 0%, #1e1b6e 100%)'}}>
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="relative">
            <h2 className="font-display text-4xl text-white mb-4">Ready to get paid on time?</h2>
            <p className="text-slate-300 mb-8 max-w-md mx-auto">Join thousands of freelancers who use Settle to invoice clients and get paid faster.</p>
            <Link href="/signup" className="btn-primary text-base px-8 py-3">
              Start for free — no card needed
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="logo-mark w-7 h-7 rounded-lg">
              <span className="text-white font-700 text-xs">S</span>
            </div>
            <span className="text-sm font-600 text-slate-700">Settle</span>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Settle. Built for freelancers.</p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
