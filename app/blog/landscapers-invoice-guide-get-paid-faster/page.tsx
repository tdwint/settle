import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Landscapers: How to Invoice Clients and Get Paid Faster',
  description: 'Stop chasing homeowners for payment after every mow and every install. Here\'s how landscapers invoice professionally and collect on the job.',
  alternates: { canonical: 'https://gigpay.today/blog/landscapers-invoice-guide-get-paid-faster' },
  openGraph: {
    title: 'Landscapers: How to Invoice Clients and Get Paid Faster',
    description: 'Stop chasing homeowners for payment. Here\'s how landscapers collect on the job.',
    type: 'article',
  },
}

export default function BlogPost() {
  return (
    <div className="min-h-screen font-sans" style={{backgroundColor:'#f8fafc'}}>
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{backgroundColor:'rgba(15,13,56,0.95)', borderColor:'rgba(255,255,255,0.08)'}}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg, #1e1b6e, #0f0d38)'}}>
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-base font-bold text-white tracking-tight">Settle</span>
          </Link>
          <Link href="/signup" className="btn-primary text-sm">Get started free</Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/landscapers" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Landscapers
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Landscapers: How to Invoice Clients and Get Paid Faster
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You mowed the lawn, trimmed the hedges, and blew the driveway clean. You sent a text saying "that's $150." And then you waited to hear back — sometimes for days.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>
          <p className="mb-6">Landscaping is one of the few industries where people regularly do the work first and figure out payment later. But for recurring clients and larger jobs, professional invoicing is what separates the businesses that grow from the ones that constantly struggle with cash flow.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Recurring work vs. project work: invoice differently</h2>
          <p className="mb-5">Landscapers have two types of clients — and they should be billed differently:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Weekly / recurring clients', desc: 'Bill monthly with a recurring invoice, or per-visit at the time of service. Auto-reminders help a lot here.' },
              { label: 'One-time jobs (installs, cleanup, tree work)', desc: 'Invoice the same day, before you load up the truck. Collect deposit upfront for large jobs.' },
              { label: 'Seasonal contracts', desc: 'Bill the full season upfront or in installments. A written invoice makes the agreement feel formal.' },
              { label: 'Snow removal', desc: 'Invoice same-day or per-event. The client just watched you do the work — strike while it\'s fresh.' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{background:'#f8fafc', border:'1px solid #e2e8f0'}}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{color:'#16a34a'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <div>
                  <span className="font-semibold text-sm" style={{color:'#0f172a'}}>{label}</span>
                  <span className="text-sm" style={{color:'#64748b'}}> — {desc}</span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>How to invoice from the job site</h2>
          <div className="space-y-4 mb-8">
            {[
              { n: '1', t: 'Build the invoice on your phone', d: 'Takes 90 seconds. Add services, hours, and any materials used.' },
              { n: '2', t: 'Text the link before you drive away', d: 'If the homeowner is there, send it right then. If not, they\'ll get it on their phone and can pay immediately.' },
              { n: '3', t: 'Accept card payments', d: 'Most homeowners prefer card over writing a check. Give them the option and you\'ll get paid faster, every time.' },
              { n: '4', t: 'Get notified when they pay', d: 'Instant notification. No waiting for mail. No wondering if the check got lost.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-4 p-4 rounded-xl" style={{background:'#f8fafc', border:'1px solid #e2e8f0'}}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style={{background:'linear-gradient(135deg, #0f0d38, #1e1b6e)', color:'#fbbf24'}}>{n}</div>
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{color:'#0f172a'}}>{t}</p>
                  <p className="text-sm" style={{color:'#64748b'}}>{d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8 text-center my-10" style={{background:'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)'}}>
            <h3 className="font-display text-2xl text-white mb-3">Invoice on every property, every visit.</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <p className="font-semibold" style={{color:'#0f172a'}}>You made it look great. Get paid before you leave the property.</p>
        </div>
      </article>

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
