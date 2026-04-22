import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Settle — Free Invoice App for Freelancers, Contractors, Trades & Creatives',
  description: 'Send professional invoices and get paid online in minutes. Free invoice software for freelancers, plumbers, electricians, designers, musicians, producers, artists, and more. No credit card required.',
  alternates: { canonical: 'https://gigpay.today' },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans" style={{backgroundColor:'#f8fafc'}}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{backgroundColor:'rgba(15,13,56,0.95)', borderColor:'rgba(255,255,255,0.08)'}}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="logo-mark">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-base font-bold text-white tracking-tight">Settle</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{color:'rgba(148,163,184,1)'}}>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors" style={{color:'rgba(148,163,184,1)'}}>Sign in</Link>
            <Link href="/signup" className="btn-primary">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{background:'linear-gradient(135deg, #080720 0%, #0f0d38 30%, #16134f 60%, #1e1b6e 100%)', minHeight:'600px'}}>

        {/* Dot grid overlay */}
        <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize:'24px 24px'}} />

        {/* Glow orbs */}
        <div className="absolute rounded-full blur-3xl pointer-events-none" style={{top:'-100px', right:'-100px', width:'500px', height:'500px', background:'rgba(245,158,11,0.08)'}} />
        <div className="absolute rounded-full blur-3xl pointer-events-none" style={{bottom:'-100px', left:'-100px', width:'400px', height:'400px', background:'rgba(99,102,241,0.08)'}} />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-32">
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 border rounded-full px-3 py-1.5 mb-8 text-xs font-semibold uppercase tracking-wider" style={{background:'rgba(255,255,255,0.06)', borderColor:'rgba(255,255,255,0.12)', color:'#fcd34d'}}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#f59e0b'}} />
              Free to start — no credit card required
            </div>

            {/* Headline */}
            <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(2.5rem, 5vw, 4.5rem)', color:'#ffffff', letterSpacing:'-0.03em', lineHeight:'1.05'}}>
              Get paid faster.<br />
              <span style={{color:'#fbbf24'}}>No chasing</span> required.
            </h1>

            <p className="text-lg leading-relaxed max-w-xl mb-10" style={{color:'rgba(148,163,184,0.9)'}}>
              Settle makes invoicing effortless for freelancers. Send professional
              invoices in seconds and let clients pay online instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="btn-primary text-base px-7 py-3">
                Start sending invoices
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="#features" className="inline-flex items-center justify-center text-base font-medium px-7 py-3 rounded-xl transition-all" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'white'}}>
                See how it works
              </a>
            </div>
          </div>

          {/* HERO INVOICE CARD */}
          <div className="absolute right-6 top-16 hidden lg:block w-80">
            <div className="bg-white rounded-2xl p-6" style={{boxShadow:'0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'}}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{color:'#94a3b8'}}>Invoice</p>
                  <p className="text-lg font-bold" style={{color:'#0f172a'}}>INV-0042</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{background:'#f0fdf4', color:'#15803d', border:'1px solid #bbf7d0'}}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Paid
                </span>
              </div>
              <div className="space-y-2 mb-5 pb-5" style={{borderBottom:'1px solid #f1f5f9'}}>
                <div className="flex justify-between text-sm">
                  <span style={{color:'#64748b'}}>Web design · 8h</span>
                  <span className="font-semibold" style={{color:'#1e293b'}}>$1,600</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{color:'#64748b'}}>Development · 4h</span>
                  <span className="font-semibold" style={{color:'#1e293b'}}>$800</span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs mb-1" style={{color:'#94a3b8'}}>Billed to</p>
                  <p className="text-sm font-semibold" style={{color:'#1e293b'}}>Acme Corp</p>
                </div>
                <div className="text-right">
                  <p className="text-xs mb-1" style={{color:'#94a3b8'}}>Total</p>
                  <p className="text-2xl font-bold" style={{color:'#0f172a'}}>$2,400</p>
                </div>
              </div>
            </div>

            {/* Notification */}
            <div className="mt-3 rounded-xl px-4 py-2.5 flex items-center gap-3" style={{background:'#059669', boxShadow:'0 10px 25px -5px rgba(5,150,105,0.4)'}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:'rgba(255,255,255,0.2)'}}>
                <span className="text-base">💸</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Payment received</p>
                <p className="text-xs" style={{color:'rgba(167,243,208,1)'}}>Acme Corp paid $2,400.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to cream */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{background:'linear-gradient(to bottom, transparent, #f8fafc)'}} />
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────── */}
      <section className="py-10 border-b" style={{borderColor:'#e2e8f0'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color:'#94a3b8'}}>Used by freelancers, trades &amp; creatives across the US</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['Designers', 'Developers', 'Copywriters', 'Consultants', 'Photographers', 'Musicians', 'Producers', 'Artists', 'Plumbers', 'Electricians', 'Painters', 'Landscapers', 'Cabinet Makers'].map(role => (
              <span key={role} className="text-sm font-medium" style={{color:'#cbd5e1'}}>{role}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section id="features" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#d97706'}}>Features</p>
          <h2 className="font-display text-4xl mb-4" style={{color:'#0f172a'}}>Everything you need to get paid</h2>
          <p className="max-w-lg mx-auto" style={{color:'#64748b'}}>Built for freelancers who'd rather spend time doing great work than chasing payments.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon:'✦', bg:'#fffbeb', color:'#d97706', title:'Beautiful custom invoices', desc:'Add your logo, business name, and brand. Every invoice looks like it came from a real studio — because it did.' },
            { icon:'⬡', bg:'#eff6ff', color:'#2563eb', title:'Online payments via card', desc:'Clients pay directly from the invoice link. Money lands in your account automatically via Stripe.' },
            { icon:'◉', bg:'#f0fdf4', color:'#16a34a', title:'Know the second they pay', desc:'Instant email the moment a client pays. No more refreshing your bank app.' },
            { icon:'⊞', bg:'#faf5ff', color:'#9333ea', title:'Client management', desc:'Keep all your clients in one place. See total billed, outstanding amounts, and invoice history at a glance.' },
            { icon:'◎', bg:'#fff1f2', color:'#e11d48', title:'Tax & discounts built in', desc:'Add tax rates, discounts, and notes to every invoice. Your tax ID prints automatically.' },
            { icon:'⬟', bg:'#f8fafc', color:'#475569', title:'Multi-currency support', desc:'Bill clients in USD, EUR, GBP, and 5 other currencies. Perfect for international freelancers.' },
          ].map(f => (
            <div key={f.title} className="card p-6 transition-all duration-200 hover:-translate-y-0.5" style={{cursor:'default'}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mb-4" style={{background:f.bg, color:f.color}}>{f.icon}</div>
              <h3 className="font-semibold mb-2" style={{color:'#0f172a'}}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{color:'#64748b'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section id="pricing" className="py-24 border-y" style={{background:'rgba(15,13,56,0.02)', borderColor:'#e2e8f0'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#d97706'}}>Pricing</p>
            <h2 className="font-display text-4xl mb-4" style={{color:'#0f172a'}}>Simple, honest pricing</h2>
            <p style={{color:'#64748b'}}>Start free. Upgrade when you're ready for more.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* FREE */}
            <div className="card p-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'#94a3b8'}}>Free</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold" style={{color:'#0f172a'}}>$0</span>
              </div>
              <p className="text-sm mb-8" style={{color:'#94a3b8'}}>Forever free, no card needed</p>
              <ul className="space-y-3 mb-8">
                {['5 invoices per month', 'Custom branding', 'Online payments', 'PDF export', 'Client management'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{color:'#475569'}}>
                    <svg className="w-4 h-4 flex-shrink-0" style={{color:'#16a34a'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-secondary w-full justify-center">Get started free</Link>
            </div>
            {/* PRO */}
            <div className="relative rounded-2xl p-8 overflow-hidden" style={{background:'linear-gradient(160deg, #080720 0%, #1e1b6e 100%)'}}>
              <div className="absolute rounded-full blur-2xl pointer-events-none" style={{top:'-50px', right:'-50px', width:'200px', height:'200px', background:'rgba(245,158,11,0.12)'}} />
              <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full" style={{background:'#f59e0b', color:'white'}}>Most popular</div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'rgba(251,191,36,0.7)'}}>Pro</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">$12</span>
                <span className="mb-1" style={{color:'#64748b'}}>/month</span>
              </div>
              <p className="text-sm mb-8" style={{color:'#64748b'}}>$100/year — save $44</p>
              <ul className="space-y-3 mb-8">
                {['Unlimited invoices', 'Custom branding', 'Online payments', 'PDF export', 'Client management', 'Client reminders', 'CSV export', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{color:'#cbd5e1'}}>
                    <svg className="w-4 h-4 flex-shrink-0" style={{color:'#fbbf24'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#d97706'}}>Testimonials</p>
          <h2 className="font-display text-4xl" style={{color:'#0f172a'}}>Freelancers love Settle</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name:'Maya T.', role:'Graphic Designer', quote:'I used to dread invoicing. Now I do it in 2 minutes and clients actually pay on time. The payment link is genius.' },
            { name:'James R.', role:'Web Developer', quote:'The moment I get that "payment received" email is the best feeling. No more checking my bank app every hour.' },
            { name:'Priya K.', role:'Copywriter', quote:'Finally an invoicing tool that doesn\'t feel like filing taxes. Clean, fast, and my clients always comment on how professional it looks.' },
          ].map(t => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" style={{color:'#f59e0b'}} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{color:'#475569'}}>"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4" style={{borderTop:'1px solid #f1f5f9'}}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{background:'linear-gradient(135deg, #0f0d38 0%, #1e1b6e 100%)', color:'#fbbf24'}}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{color:'#1e293b'}}>{t.name}</p>
                  <p className="text-xs" style={{color:'#94a3b8'}}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRADES SECTION ──────────────────────────────────── */}
      <section className="py-24 border-y" style={{background:'#f8fafc', borderColor:'#e2e8f0'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#d97706'}}>Built for the trades too</p>
            <h2 className="font-display text-4xl mb-4" style={{color:'#0f172a'}}>Invoice software for contractors &amp; trades</h2>
            <p className="max-w-xl mx-auto" style={{color:'#64748b'}}>
              Whether you're a plumber finishing a job, an electrician wrapping up a project, or a landscaper billing for the season —
              Settle makes it fast and professional.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🔧', trade: 'Plumbers', desc: 'Bill for parts, labor, and service calls in one clean invoice.', href: null },
              { emoji: '⚡', trade: 'Electricians', desc: 'Itemize materials and hourly labor. Get paid on the spot.', href: null },
              { emoji: '🎨', trade: 'Painters', desc: 'Quote by room or sq ft. Collect deposits and final payments online.', href: null },
              { emoji: '🌿', trade: 'Landscapers', desc: 'Recurring or one-time — invoice for mowing, installs, and cleanups.', href: null },
              { emoji: '🪟', trade: 'Cabinet Makers', desc: 'Custom work deserves a professional invoice. Send it before you leave.', href: null },
              { emoji: '🏗️', trade: 'Contractors', desc: 'Progress billing, final invoices, change orders — all in one place.', href: null },
              { emoji: '📷', trade: 'Photographers', desc: 'Bill per session or package. Accept card payments from any client.', href: null },
              { emoji: '💻', trade: 'Developers', desc: 'Hourly or project-based. Multi-currency for international clients.', href: null },
              { emoji: '🎵', trade: 'Musicians', desc: 'Invoice for gigs, sessions, and lessons. Get paid before you pack up.', href: '/musicians' },
              { emoji: '🎬', trade: 'Producers', desc: 'Bill for beats, mixes, videos, and content. One link, instant payment.', href: '/music-producers' },
              { emoji: '🎨', trade: 'Artists', desc: 'Commission work, prints, murals — invoice professionally every time.', href: '/artists' },
            ].map(({ emoji, trade, desc, href }) => {
              const inner = (
                <>
                  <div className="text-2xl mb-3">{emoji}</div>
                  <h3 className="font-semibold text-sm mb-1" style={{color:'#0f172a'}}>{trade}</h3>
                  <p className="text-xs leading-relaxed" style={{color:'#64748b'}}>{desc}</p>
                  {href && <p className="text-xs font-semibold mt-2" style={{color:'#d97706'}}>Learn more →</p>}
                </>
              )
              return href ? (
                <Link key={trade} href={href} className="card p-5 hover:-translate-y-0.5 transition-transform duration-200" style={{textDecoration:'none'}}>
                  {inner}
                </Link>
              ) : (
                <div key={trade} className="card p-5">
                  {inner}
                </div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/signup" className="btn-primary">
              Start invoicing free — no card needed
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl px-10 py-16 text-center" style={{background:'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)'}}>
          <div className="absolute rounded-full blur-3xl pointer-events-none" style={{top:'-100px', left:'50%', transform:'translateX(-50%)', width:'400px', height:'400px', background:'rgba(245,158,11,0.1)'}} />
          <div className="relative">
            <h2 className="font-display text-4xl text-white mb-4">Ready to get paid on time?</h2>
            <p className="mb-8 max-w-md mx-auto" style={{color:'#94a3b8'}}>Join thousands of freelancers who use Settle to invoice clients and get paid faster.</p>
            <div className="flex justify-center">
              <Link href="/signup" className="btn-primary text-base px-8 py-3">
                Start for free — no card needed
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t py-8" style={{borderColor:'#e2e8f0'}}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="logo-mark w-7 h-7 rounded-lg">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-semibold" style={{color:'#334155'}}>Settle</span>
          </div>
          <p className="text-xs" style={{color:'#94a3b8'}}>© {new Date().getFullYear()} Settle. Built for freelancers.</p>
          <div className="flex gap-6 text-xs" style={{color:'#94a3b8'}}>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
            <Link href="/support" className="hover:text-slate-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
