import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Photographers: How to Stop Waiting Weeks to Get Paid',
  description: 'Most photographers send invoices too late and too informally. Here\'s exactly how to change that and get paid faster after every shoot.',
  alternates: { canonical: 'https://gigpay.today/blog/photographers-guide-to-getting-paid' },
  openGraph: {
    title: 'Photographers: How to Stop Waiting Weeks to Get Paid',
    description: 'Most photographers send invoices too late and too informally. Here\'s how to fix it.',
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
          <Link href="/photographers" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Photographers
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Photographers: How to Stop Waiting Weeks to Get Paid
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You delivered a gallery of 400 perfectly edited images. The client loved them. You sent a PayPal request. Then waited two weeks — and sent it again.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>

          <p className="mb-6">Late payment is the silent tax on every freelance photographer's business. It doesn't show up in your pricing — it shows up in your stress, your cash flow, and the hours you spend following up instead of shooting.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Why photographers get paid late</h2>

          <p className="mb-5">The root cause is almost always the same: the payment process was informal. A PayPal.me link in an email. A Venmo handle texted after the shoot. No official invoice, no due date, no sense of urgency for the client.</p>

          <p className="mb-8">When you send a professional invoice — with your business name, a line-item breakdown, a due date, and an online payment link — everything changes. The client sees you as a professional. The invoice creates a clear obligation. And paying becomes frictionless instead of something they'll "get to later."</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>What photographers actually bill for</h2>

          <p className="mb-5">One of the biggest invoicing mistakes is under-billing because you only listed the obvious item. A comprehensive invoice covers everything:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Session fee', desc: 'Your time on the day of the shoot' },
              { label: 'Editing & post-processing', desc: 'Hours of retouching, color grading, and export' },
              { label: 'Travel & mileage', desc: 'Distance, parking, and transit costs' },
              { label: 'Licensing fees', desc: 'Commercial usage rights beyond personal use' },
              { label: 'Rush delivery', desc: 'Expedited turnaround when clients need it fast' },
              { label: 'Albums & prints', desc: 'Physical products ordered after the session' },
              { label: 'Second shooter', desc: 'Subcontractor cost passed through to the client' },
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

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>The one rule that changes everything: invoice immediately</h2>

          <p className="mb-5">The best time to send an invoice is the same day as the shoot — or the day you deliver the gallery. The longer you wait, the more the client's excitement fades and the easier it becomes to deprioritize paying you.</p>

          <div className="space-y-4 mb-8">
            {[
              { n: '1', t: 'Open Settle right after the shoot', d: 'Takes about 90 seconds to build a new invoice from your phone.' },
              { n: '2', t: 'Add your line items', d: '"Portrait session — 2 hours @ $250" plus editing, travel, and any extras.' },
              { n: '3', t: 'Set a due date', d: 'Net 7 or Net 14 is standard. Having a date makes it real for the client.' },
              { n: '4', t: 'Send the link', d: 'Text or email it. Client pays by card in 60 seconds — no app, no friction.' },
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
            <h3 className="font-display text-2xl text-white mb-3">Ready to get paid faster after every shoot?</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Send your first invoice in under 2 minutes. Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Your photography is a business</h2>

          <p className="mb-5">The photographers who get paid on time aren't the ones with the best contracts or the most experience. They're the ones who treat invoicing like part of the job — not an afterthought.</p>

          <p className="font-semibold" style={{color:'#0f172a'}}>Your work is worth more than a PayPal request. Invoice like you know it.</p>

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
