import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cabinet Makers: How to Invoice for Custom Work and Get Paid What It\'s Worth',
  description: 'Custom woodwork is expensive to build and easy to underbill. Here\'s how cabinet makers invoice professionally and protect their margins.',
  alternates: { canonical: 'https://gigpay.today/blog/cabinet-makers-invoice-guide' },
  openGraph: {
    title: 'Cabinet Makers: How to Invoice for Custom Work and Get Paid What It\'s Worth',
    description: 'Custom woodwork is expensive to build and easy to underbill. Here\'s how to fix it.',
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
          <Link href="/cabinet-makers" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Cabinet Makers
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Cabinet Makers: How to Invoice for Custom Work and Get Paid What It's Worth
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You spent weeks designing, building, and installing a custom kitchen. The client walked through and loved every detail. Then came the invoice conversation — and somehow you still walked away feeling underpaid.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>
          <p className="mb-6">Custom woodwork is one of the hardest trades to price and invoice for — because the value is often invisible to the client. They see the finished product, not the design time, the material selection, the shop work, and the hours of hand-fitting. A professional invoice makes all of that visible.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Always collect a substantial deposit</h2>
          <p className="mb-8">Custom cabinet work is material-intensive. You're buying sheet goods, hardware, and finishing products before you've received a dime. A 40–50% deposit on order is not just fair — it's standard practice for any custom fabrication. Make it a non-negotiable part of your process.</p>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>What to itemize on a cabinet invoice</h2>
          <p className="mb-5">Most cabinet makers under-invoice by only billing for the obvious items. A complete invoice includes:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Design and consultation time', desc: 'Measuring, CAD drawings, material selection meetings — this is real work' },
              { label: 'Materials at markup', desc: 'Sheet goods, lumber, hardware, hinges, and drawer slides — marked up appropriately' },
              { label: 'Shop fabrication hours', desc: 'The hours in your shop cutting, assembling, and finishing each unit' },
              { label: 'Finishing and paint', desc: 'Priming, spraying, sanding, and top coat — list each stage' },
              { label: 'Delivery and installation', desc: 'Transport, rigging, and installation labor at the job site' },
              { label: 'Templating and field measuring', desc: 'Return trips to the site for measuring and fitting' },
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

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Invoice at every milestone</h2>
          <div className="space-y-4 mb-8">
            {[
              { n: '1', t: 'Deposit invoice on contract signing', d: '40–50% to cover materials and shop time before fabrication starts.' },
              { n: '2', t: 'Progress invoice at delivery', d: 'Another 40% when you deliver and begin installation. Client can see the work is real.' },
              { n: '3', t: 'Final invoice at punch list completion', d: 'The remaining balance after final adjustments and sign-off.' },
              { n: '4', t: 'Send online, collect by card', d: 'Text or email the invoice link. Client pays immediately — no waiting for a check in the mail.' },
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
            <h3 className="font-display text-2xl text-white mb-3">Custom work deserves a professional invoice.</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <p className="font-semibold" style={{color:'#0f172a'}}>You built something that will last decades. Get paid accordingly.</p>
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
