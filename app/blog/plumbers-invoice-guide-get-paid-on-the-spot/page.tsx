import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Plumbers: Stop Leaving Jobs Without Getting Paid',
  description: 'Most plumbers leave money on the table by not invoicing on the spot. Here\'s how to collect payment before you drive to the next job.',
  alternates: { canonical: 'https://gigpay.today/blog/plumbers-invoice-guide-get-paid-on-the-spot' },
  openGraph: {
    title: 'Plumbers: Stop Leaving Jobs Without Getting Paid',
    description: 'Most plumbers leave money on the table by not invoicing on the spot. Here\'s how to fix it.',
    type: 'article',
  },
}

export default function BlogPost() {
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
          <Link href="/signup" className="btn-primary text-sm">Get started free</Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/plumbers" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Plumbers
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Plumbers: Stop Leaving Jobs Without Getting Paid
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You fixed the leak at 11pm. The homeowner was relieved and grateful. You said you'd send the invoice. By morning, they'd moved on and you were still waiting on payment.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>

          <p className="mb-6">Plumbers are some of the most undervalued tradespeople out there — called in at all hours to solve urgent problems, then left chasing payment. The fix is simpler than most people realize: invoice on the spot, before you leave the driveway.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Everything you can charge for (and often don't)</h2>

          <p className="mb-5">Part of getting paid what you're worth is making sure your invoice captures everything:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Service call fee', desc: 'Charge for the trip, not just the fix — especially for after-hours calls' },
              { label: 'Labor by the hour', desc: 'From the moment you arrive to the moment the water runs clear' },
              { label: 'Materials at markup', desc: 'Parts, fittings, pipe, and supplies — marked up appropriately for your area' },
              { label: 'Diagnostic time', desc: 'Time spent troubleshooting before you identify the fix' },
              { label: 'Emergency / after-hours premium', desc: 'Night calls and weekend calls deserve a premium rate' },
              { label: 'Permit fees', desc: 'Any permits pulled for the job, passed through at cost' },
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

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>How to invoice on the job site</h2>

          <div className="space-y-4 mb-8">
            {[
              { n: '1', t: 'Open the app while you\'re still at the house', d: 'Takes 2 minutes to build the invoice. Do it before you even put your tools away.' },
              { n: '2', t: 'Add every line item', d: 'Service call, parts, labor, emergency premium. Itemized invoices look professional and justify your rate.' },
              { n: '3', t: 'Text the link to the homeowner', d: 'Right there in the kitchen. They can pay by card on their phone while you finish packing up.' },
              { n: '4', t: 'Drive away with payment confirmed', d: 'You get a notification the second it goes through. No check in the mail. No follow-up call.' },
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

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center my-10" style={{background:'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)'}}>
            <h3 className="font-display text-2xl text-white mb-3">Start invoicing on the job site today.</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Send your first invoice in under 2 minutes. Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>You solved their emergency. Get paid like you did.</h2>

          <p className="mb-5">Homeowners call you at midnight because they have no one else. That expertise and availability has real value. Make sure your billing reflects it.</p>

          <p className="font-semibold" style={{color:'#0f172a'}}>Fix it. Invoice it. Get paid before you leave.</p>

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
