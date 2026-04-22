import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Musicians: Stop Getting Paid Late. Here\'s How to Fix It.',
  description: 'Late payments are the norm for working musicians — but they don\'t have to be. Here\'s how invoicing professionally changes everything.',
  alternates: { canonical: 'https://gigpay.today/blog/musicians-stop-getting-paid-late' },
  openGraph: {
    title: 'Musicians: Stop Getting Paid Late. Here\'s How to Fix It.',
    description: 'Late payments are the norm for working musicians — but they don\'t have to be.',
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
          <Link href="/musicians" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Musicians
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Musicians: Stop Getting Paid Late.<br/>Here's How to Fix It.
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You played a great set. The crowd loved it. You packed up your gear at midnight, shook hands with the promoter, and drove home. Then waited two weeks to get paid.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>

          <p className="mb-6">Late payment is so common in the music industry that most musicians have just accepted it as part of the job. Venues that pay net-30. Session clients who "forget." Students who pay when they feel like it. It doesn't have to be this way.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Why musicians get paid late</h2>

          <p className="mb-5">The pattern is almost always the same: the payment conversation was informal. No invoice, no due date, no paper trail. When money changes hands without a formal request, it's easy for the other person to deprioritize it — not out of bad faith, but because life is busy and nothing is prompting them to act.</p>

          <p className="mb-8">A professional invoice changes the dynamic. It signals that you run a real business. It creates a due date. It gives the client a frictionless way to pay on the spot. And psychologically, it reframes the exchange — you're not asking a favor, you're collecting what's owed.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>What working musicians actually get paid for</h2>

          <p className="mb-5">The range of billable work in a musician's career is wider than most people realize:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Session work', desc: 'Studio recordings, overdubs, and tracking sessions' },
              { label: 'Live performances', desc: 'Gigs, shows, residencies, and events' },
              { label: 'Music lessons', desc: 'Weekly students, workshops, and masterclasses' },
              { label: 'Orchestral & event work', desc: 'Weddings, corporate events, private functions' },
              { label: 'Composition', desc: 'Custom scores, arrangements, and original works' },
              { label: 'Voice work', desc: 'Jingles, demos, voiceovers, and features' },
              { label: 'Remote collaboration', desc: 'Contributing tracks and parts for artists worldwide' },
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

          <p className="mb-8">Every single one of these deserves a real invoice — not a text message, not a Venmo handle, not a handshake deal.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>The fastest way to get paid after a gig</h2>

          <p className="mb-5">The best time to send an invoice is before you leave — or at the latest, the morning after. The longer you wait, the harder it gets. Here's the move:</p>

          <div className="space-y-4 mb-8">
            {[
              { n: '1', t: 'Open Settle on your phone', d: 'Takes about 90 seconds to create a new invoice.' },
              { n: '2', t: 'Add the service and your rate', d: '"Live performance — 2 sets @ $300" or however you price your work.' },
              { n: '3', t: 'Send the invoice link', d: 'Text or email it to the client on the spot. They can pay by card immediately.' },
              { n: '4', t: 'Get notified when they pay', d: 'You\'ll get an email the second the payment goes through. No chasing required.' },
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
            <h3 className="font-display text-2xl text-white mb-3">Ready to stop waiting to get paid?</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Send your first invoice in under 2 minutes. Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Your music is a business</h2>

          <p className="mb-5">The musicians who get paid on time aren't the ones with better lawyers or more leverage. They're the ones who treat their work like a business — which starts with sending a proper invoice.</p>

          <p className="font-semibold" style={{color:'#0f172a'}}>You've already done the hard part. Now get paid for it.</p>

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
