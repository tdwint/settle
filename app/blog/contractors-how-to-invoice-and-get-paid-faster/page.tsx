import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contractors: Stop Waiting 30 Days to Get Paid. Here\'s How.',
  description: 'Net-30 isn\'t inevitable. Contractors who invoice professionally get paid faster, have better cash flow, and spend less time chasing clients.',
  alternates: { canonical: 'https://gigpay.today/blog/contractors-how-to-invoice-and-get-paid-faster' },
  openGraph: {
    title: 'Contractors: Stop Waiting 30 Days to Get Paid. Here\'s How.',
    description: 'Net-30 isn\'t inevitable. Here\'s how to invoice like a pro and get paid faster.',
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
          <Link href="/contractors" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Contractors
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Contractors: Stop Waiting 30 Days to Get Paid. Here's How.
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You finished the job on time, cleaned up, and handed over the keys. Then you sent an invoice by email, waited two weeks, and started wondering if they forgot about you.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>

          <p className="mb-6">For contractors, late payment is often treated as just part of the business. But it doesn't have to be. The contractors who get paid fastest aren't the ones with the best lawyers — they're the ones with the best invoicing habits.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Why contractors get paid late</h2>

          <p className="mb-5">The biggest culprit is informal payment requests. A text message asking to "settle up." An email with a PDF attachment that sits unread. No due date, no payment link, no friction-free way to pay. The client isn't always trying to avoid paying — they're just busy, and nothing is prompting them to act.</p>

          <p className="mb-8">A professional invoice changes that. It communicates that you're running a real business, creates a concrete due date, and gives the client a one-click way to pay. The psychology shift is real: you're not asking for a favor, you're collecting what was agreed.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Invoice in phases, not just at the end</h2>

          <p className="mb-5">One of the most powerful changes contractors can make is moving to milestone-based billing instead of waiting until the job is fully complete. This protects your cash flow and reduces the risk of getting stiffed on a large final payment.</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Deposit (25–50%)', desc: 'Collected before materials are purchased or work begins' },
              { label: 'Mid-project invoice', desc: 'Sent at a defined milestone — framing complete, rough-in done, etc.' },
              { label: 'Substantial completion', desc: 'When the project is mostly done but punch list remains' },
              { label: 'Final payment', desc: 'After the final walkthrough and punch list sign-off' },
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
              { n: '1', t: 'Build the invoice on your phone', d: 'Add labor, materials, and any extras. Takes about 2 minutes from a job site.' },
              { n: '2', t: 'Add the due date', d: 'Net 7 or "due on receipt" for smaller jobs. Net 14 or Net 30 for larger projects.' },
              { n: '3', t: 'Text the link on the spot', d: 'Client gets a professional invoice link they can pay by card immediately — from their phone.' },
              { n: '4', t: 'Get notified when they pay', d: 'Instant email notification. No checking your bank, no calling to confirm the check is coming.' },
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
            <h3 className="font-display text-2xl text-white mb-3">Ready to get paid faster on every job?</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Send your first invoice in under 2 minutes. Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Your contracting business deserves professional billing</h2>

          <p className="mb-5">You built it, managed it, and delivered it. The invoicing part shouldn't be the hardest part of the job.</p>

          <p className="font-semibold" style={{color:'#0f172a'}}>Invoice on the job site. Get paid before you leave. That's how the best contractors operate.</p>

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
