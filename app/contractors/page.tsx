import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Invoice App for Contractors — General, Remodeling & Trades — Settle' },
  description: 'Stop chasing payment after every job. Settle lets contractors invoice clients professionally, collect deposits, and get paid online in minutes. Free to start.',
  alternates: { canonical: 'https://gigpay.today/contractors' },
  openGraph: {
    title: 'Invoice App for Contractors — Settle',
    description: 'Stop chasing payment after every job. Invoice professionally and get paid online in minutes.',
    type: 'website',
  },
}

const services = [
  { emoji: '🏗️', title: 'General Contracting', desc: 'Full project invoicing with deposits, progress billing, and final payment.' },
  { emoji: '🔨', title: 'Home Remodeling', desc: 'Kitchen, bath, and home remodels. Collect deposits upfront and final payments on completion.' },
  { emoji: '🏠', title: 'New Construction', desc: 'Bill by milestone or phase. Keep a clean record of every stage of the build.' },
  { emoji: '📋', title: 'Progress Billing', desc: 'Invoice at project milestones instead of waiting until the end. Improve cash flow.' },
  { emoji: '📝', title: 'Change Orders', desc: 'Extra work deserves extra pay. Document and invoice every scope change professionally.' },
  { emoji: '👷', title: 'Subcontractor Work', desc: 'Bill GCs and project managers with confidence. Professional invoices every time.' },
  { emoji: '🏢', title: 'Commercial Projects', desc: 'Office build-outs, tenant improvements, and commercial renovations.' },
  { emoji: '🛠️', title: 'Repairs & Handyman', desc: 'One-off repairs and maintenance jobs. Quick invoices sent on the spot.' },
]

export default function ContractorsPage() {
  return (
    <div className="min-h-screen font-sans" style={{backgroundColor:'#f8fafc'}}>

      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{backgroundColor:'rgba(15,13,56,0.95)', borderColor:'rgba(255,255,255,0.08)'}}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg, #1e1b6e, #0f0d38)'}}>
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-base font-bold text-white tracking-tight">Settle</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors" style={{color:'rgba(148,163,184,1)'}}>Sign in</Link>
            <Link href="/signup" className="btn-primary">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{background:'linear-gradient(135deg, #080720 0%, #0f0d38 30%, #16134f 60%, #1e1b6e 100%)', minHeight:'540px'}}>
        <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize:'24px 24px'}} />
        <div className="absolute rounded-full blur-3xl pointer-events-none" style={{top:'-100px', right:'-100px', width:'500px', height:'500px', background:'rgba(245,158,11,0.08)'}} />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border rounded-full px-3 py-1.5 mb-8 text-xs font-semibold uppercase tracking-wider" style={{background:'rgba(255,255,255,0.06)', borderColor:'rgba(255,255,255,0.12)', color:'#fcd34d'}}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#f59e0b'}} />
              Built for contractors
            </div>

            <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(2.2rem, 5vw, 4rem)', color:'#ffffff', letterSpacing:'-0.03em', lineHeight:'1.05'}}>
              Finish the job.<br />
              <span style={{color:'#fbbf24'}}>Get paid</span> before you leave.
            </h1>

            <p className="text-lg leading-relaxed max-w-xl mb-10" style={{color:'rgba(148,163,184,0.9)'}}>
              Whether you're doing a full remodel or a quick repair — stop waiting 30 days to get paid. Send a professional invoice in 2 minutes and let clients pay by card on the job site.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="btn-primary text-base px-7 py-3">
                Start invoicing free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/blog/contractors-how-to-invoice-and-get-paid-faster" className="inline-flex items-center justify-center text-base font-medium px-7 py-3 rounded-xl transition-all" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'white'}}>
                Why it matters →
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{background:'linear-gradient(to bottom, transparent, #f8fafc)'}} />
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-10 border-b" style={{borderColor:'#e2e8f0'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color:'#94a3b8'}}>For every kind of contractor</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['General Contractors', 'Home Remodelers', 'Commercial Contractors', 'Project Managers', 'Subcontractors', 'Handymen', 'Renovation Specialists', 'Build-Out Crews'].map(role => (
              <span key={role} className="text-sm font-medium" style={{color:'#cbd5e1'}}>{role}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#d97706'}}>Every job, properly invoiced</p>
          <h2 className="font-display text-4xl mb-4" style={{color:'#0f172a'}}>Invoice for every phase of the project</h2>
          <p className="max-w-lg mx-auto" style={{color:'#64748b'}}>
            From initial deposit to final walkthrough — every milestone, change order, and labor hour deserves a professional invoice and a fast, easy payment.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map(({ emoji, title, desc }) => (
            <div key={title} className="card p-5">
              <div className="text-2xl mb-3">{emoji}</div>
              <h3 className="font-semibold text-sm mb-1" style={{color:'#0f172a'}}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{color:'#64748b'}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 border-y" style={{background:'rgba(15,13,56,0.02)', borderColor:'#e2e8f0'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#d97706'}}>How it works</p>
            <h2 className="font-display text-4xl mb-4" style={{color:'#0f172a'}}>Invoice on the job site, get paid by morning</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Build your invoice', desc: 'Add materials, labor, and any extras. Itemize exactly what was done — parts and hours down to the penny.' },
              { step: '02', title: 'Send the link', desc: 'Text or email the invoice link on the spot. Clients can pay by card immediately — no app needed.' },
              { step: '03', title: 'Get paid, move on', desc: 'You get an email the second they pay. No follow-up calls, no waiting on a check in the mail.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm mx-auto mb-4" style={{background:'linear-gradient(135deg, #0f0d38, #1e1b6e)', color:'#fbbf24'}}>{step}</div>
                <h3 className="font-semibold mb-2" style={{color:'#0f172a'}}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{color:'#64748b'}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#94a3b8'}}>Also in the trades</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Link href="/plumbers" className="card p-5 hover:-translate-y-0.5 transition-transform duration-200" style={{textDecoration:'none'}}>
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="font-semibold text-sm mb-1" style={{color:'#0f172a'}}>Plumbers</h3>
            <p className="text-xs" style={{color:'#64748b'}}>Parts, labor, and service calls — invoiced fast →</p>
          </Link>
          <Link href="/electricians" className="card p-5 hover:-translate-y-0.5 transition-transform duration-200" style={{textDecoration:'none'}}>
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-sm mb-1" style={{color:'#0f172a'}}>Electricians</h3>
            <p className="text-xs" style={{color:'#64748b'}}>Materials, hourly labor, and commercial work →</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl px-10 py-16 text-center" style={{background:'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)'}}>
          <div className="absolute rounded-full blur-3xl pointer-events-none" style={{top:'-100px', left:'50%', transform:'translateX(-50%)', width:'400px', height:'400px', background:'rgba(245,158,11,0.1)'}} />
          <div className="relative">
            <h2 className="font-display text-4xl text-white mb-4">You built it. Now get paid for it.</h2>
            <p className="mb-8 max-w-md mx-auto" style={{color:'#94a3b8'}}>Free to start. No credit card. First invoice in under 2 minutes.</p>
            <Link href="/signup" className="btn-primary text-base px-8 py-3">
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8" style={{borderColor:'#e2e8f0'}}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg, #1e1b6e, #0f0d38)'}}>
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-semibold" style={{color:'#334155'}}>Settle</span>
          </Link>
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
