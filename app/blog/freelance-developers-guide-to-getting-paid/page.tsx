import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Freelance Developers: The Simple Guide to Getting Paid on Time',
  description: 'Unpaid invoices are the #1 cash flow killer for freelance developers. Here\'s how to invoice professionally and stop letting clients sit on what they owe.',
  alternates: { canonical: 'https://gigpay.today/blog/freelance-developers-guide-to-getting-paid' },
  openGraph: {
    title: 'Freelance Developers: The Simple Guide to Getting Paid on Time',
    description: 'Unpaid invoices are the #1 cash flow killer for freelance developers. Here\'s how to fix it.',
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
          <Link href="/developers" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Developers
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Freelance Developers: The Simple Guide to Getting Paid on Time
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You shipped the feature. You merged the PR. You handed over the repo credentials. Then you sent an invoice and watched it sit in their inbox for three weeks.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>

          <p className="mb-6">Most developers are brilliant at building software and terrible at collecting payment. Not because they don't care — but because the tools and habits for professional billing aren't taught anywhere. Here's what actually works.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>The billing structures that work for developers</h2>

          <p className="mb-5">There's no single right way to bill, but there are some structures that get paid faster than others:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Hourly with weekly invoices', desc: 'Invoice every Friday for hours worked that week. Keeps cash flow steady and amounts manageable' },
              { label: 'Fixed-price with milestone billing', desc: 'Split the project into phases. Invoice at kickoff (30%), mid-project (40%), completion (30%)' },
              { label: 'Monthly retainer', desc: 'For ongoing work — invoice on the 1st of the month, due by the 15th' },
              { label: 'Per-sprint billing', desc: 'Invoice at the end of each sprint. Keeps billing in sync with deliverables' },
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

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>The "never start without a deposit" rule</h2>

          <p className="mb-5">If you're doing fixed-price work, collect 30–50% upfront before writing a single line of code. This does two things: it filters out clients who aren't serious, and it ensures you're not left holding the bag if the project falls apart.</p>

          <p className="mb-8">Most experienced freelance developers won't start without a deposit. Make it your policy and state it clearly in your proposal — you'll rarely lose good clients over it, and you'll lose a lot of bad ones.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>How to invoice so clients actually pay</h2>

          <div className="space-y-4 mb-8">
            {[
              { n: '1', t: 'Invoice on delivery, not "when you get around to it"', d: 'The day you hit a milestone or deliver a sprint is the day you send the invoice.' },
              { n: '2', t: 'Use a real invoice with a due date', d: 'Not a PayPal link. A proper invoice with your business name, line items, and a clear due date.' },
              { n: '3', t: 'Give them a one-click payment option', d: 'The easier it is to pay, the faster it happens. Card payments via invoice link beat bank transfers every time.' },
              { n: '4', t: 'Follow up at 3 days past due, not 3 weeks', d: 'A polite reminder on day 4 is professional. Waiting a month signals that it\'s optional.' },
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
            <h3 className="font-display text-2xl text-white mb-3">Stop letting clients sit on what they owe you.</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Send your first invoice in under 2 minutes. Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>You're running a business, not doing favors</h2>

          <p className="mb-5">The best freelancers aren't just good at code — they're good at the business of freelancing. Invoicing professionally is part of that. It signals to clients that you're serious, sets the right expectations, and keeps your cash flow healthy.</p>

          <p className="font-semibold" style={{color:'#0f172a'}}>You shipped it. Now collect what it's worth.</p>

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
