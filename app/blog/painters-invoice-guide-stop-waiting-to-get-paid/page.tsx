import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Painters: Stop Waiting to Get Paid After Every Job',
  description: 'Painting contractors who invoice on the spot get paid same-day instead of same-month. Here\'s the simple system that changes everything.',
  alternates: { canonical: 'https://gigpay.today/blog/painters-invoice-guide-stop-waiting-to-get-paid' },
  openGraph: {
    title: 'Painters: Stop Waiting to Get Paid After Every Job',
    description: 'Painting contractors who invoice on the spot get paid same-day. Here\'s how.',
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
          <Link href="/painters" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Painters
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Painters: Stop Waiting to Get Paid After Every Job
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You spent three days prepping, priming, and painting. The client walked through and loved it. Then you packed your gear and waited two weeks for a check that may or may not arrive.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>
          <p className="mb-6">It's one of the most common frustrations in the painting trade — doing excellent work and then waiting far too long to get paid for it. Here's how to change the pattern starting with your next job.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Collect a deposit before you start</h2>
          <p className="mb-8">The single best thing a painter can do to protect their cash flow is require a deposit before any work begins. 25–50% upfront is standard. It covers your materials, filters out flaky clients, and sets the tone that you run a real business.</p>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>What to include on every painting invoice</h2>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Labor by day or sq ft', desc: 'Break down your time clearly so clients understand what they\'re paying for' },
              { label: 'Paint and materials', desc: 'Primer, paint, tape, drop cloths — list quantities and products' },
              { label: 'Prep work', desc: 'Sanding, patching, caulking, and washing — often the most labor-intensive part' },
              { label: 'Number of coats', desc: 'Specify primer coat, first coat, second coat for clarity' },
              { label: 'Travel / mobilization', desc: 'If you\'re driving to the job, charge for it — especially for larger properties' },
              { label: 'Cleanup', desc: 'Time spent protecting furniture, covering floors, and post-job cleanup' },
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

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Invoice on the last day of the job</h2>
          <div className="space-y-4 mb-8">
            {[
              { n: '1', t: 'Do the walkthrough with the client', d: 'Get their sign-off on the work while you\'re still there together.' },
              { n: '2', t: 'Pull out your phone and build the invoice', d: 'Add labor, materials, and any extras. Takes about 2 minutes.' },
              { n: '3', t: 'Send the link before you leave', d: 'Text it directly to the client. They pay by card on the spot — or you collect before you drive away.' },
              { n: '4', t: 'Get notified instantly', d: 'You\'ll receive an email the second the payment clears. Clean job, clean payment.' },
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
            <h3 className="font-display text-2xl text-white mb-3">Get paid before the paint dries.</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <p className="font-semibold" style={{color:'#0f172a'}}>You painted it perfectly. Now collect what you're owed — before you leave the driveway.</p>
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
