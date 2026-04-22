import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stop Using Venmo. Here\'s How Production Pros Invoice Properly.',
  description: 'Most freelance producers, sound designers, and mixing engineers are leaving money on the table. Here\'s how to invoice professionally and get paid faster.',
  alternates: { canonical: 'https://gigpay.today/blog/stop-using-venmo-how-production-pros-invoice-properly' },
  openGraph: {
    title: 'Stop Using Venmo. Here\'s How Production Pros Invoice Properly.',
    description: 'Most freelance producers, sound designers, and mixing engineers are leaving money on the table. Here\'s how to invoice professionally and get paid faster.',
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

      {/* ARTICLE */}
      <article className="max-w-2xl mx-auto px-6 py-20">

        {/* Meta */}
        <div className="mb-8">
          <Link href="/music-producers" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Music Production
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            Stop Using Venmo.<br/>Here's How Production Pros Invoice Properly.
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You spent 14 hours on that mix. You tuned every vocal, automated every filter, and dialed in the low end until it hit right. Then you sent the file — and waited.
          </p>
          <p className="text-lg leading-relaxed mt-4" style={{color:'#64748b'}}>
            A week later: <em>"Can you send me your Venmo?"</em>
          </p>
        </div>

        <div className="prose-content" style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>

          <p className="mb-6">Sound familiar? Most freelance producers, sound designers, and mixing engineers are leaving money on the table — not because they're undercharging, but because the way they collect payment is informal, forgettable, and unprofessional. Venmo is for splitting dinner. Not for a $400 mix session.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>The Real Cost of Informal Payments</h2>

          <p className="mb-5">When you invoice over text or collect via Venmo, a few things happen:</p>

          <div className="space-y-5 mb-8 pl-5" style={{borderLeft:'3px solid #e2e8f0'}}>
            <div>
              <p className="font-semibold mb-1" style={{color:'#0f172a'}}>Clients forget.</p>
              <p>Without a formal invoice, there's no paper trail, no due date, and no psychological trigger that says "this is a real bill." It blurs into conversation.</p>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{color:'#0f172a'}}>You undervalue your work.</p>
              <p>A Venmo request for $350 looks the same as splitting a Lyft. A professional invoice for $350 itemizing "Vocal Tuning — 3 hours @ $75/hr + Mixing — 5 hours @ $45/hr" looks like a business transaction. Which one gets paid first?</p>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{color:'#0f172a'}}>You lose track.</p>
              <p>Three clients, four projects, two partial payments. Without proper invoicing you're doing math in your head at midnight trying to figure out who still owes you.</p>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{color:'#0f172a'}}>There's no record come tax time.</p>
              <p>Venmo transactions are not invoices. If you're earning real money from production work, the IRS will eventually care.</p>
            </div>
          </div>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>What Production Freelancers Actually Bill For</h2>

          <p className="mb-5">The music production world has a wide range of billable services that deserve proper invoices:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Sound design', desc: 'Custom patches, texture beds, one-shots built to spec' },
              { label: 'VST preset building', desc: 'Serum, Massive, Vital, Omnisphere preset packs for producers' },
              { label: 'Arrangement', desc: 'Taking a sketch to a full arrangement, transitions, builds' },
              { label: 'Automation', desc: 'Filter sweeps, volume rides, modulation passes' },
              { label: 'Mixing', desc: 'Stem mixing, full mix, revision rounds' },
              { label: 'Mastering', desc: 'Final loudness, stereo width, format delivery' },
              { label: 'Sample creation', desc: 'Commissioned drum kits, loop packs, foley' },
              { label: 'Vocal optimization', desc: 'Tuning, timing, stacking, doubling, production' },
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

          <p className="mb-8">Every one of these is a real service worth a real invoice.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>What a Professional Invoice Looks Like</h2>

          <p className="mb-5">A proper invoice for production work should include:</p>

          <ul className="space-y-2 mb-8 pl-5">
            {[
              'Your business name and contact',
              'The client\'s name',
              'A clear itemized list of services — be specific, not just "beats"',
              'The rate and hours or flat fee for each item',
              'A due date',
              'A way to pay online — directly from the invoice',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:'#d97706'}} />
                {item}
              </li>
            ))}
          </ul>

          <p className="mb-8">That last part is key. The easier you make it to pay, the faster you get paid. A "Pay Now" button on the invoice beats a Venmo handle every time.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          {/* CTA Block */}
          <div className="rounded-2xl p-8 text-center my-10" style={{background:'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)'}}>
            <h3 className="font-display text-2xl text-white mb-3">Ready to get paid properly?</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Send your first invoice in under 2 minutes. Free to start — no card needed.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>The Bottom Line</h2>

          <p className="mb-5">Your skills are worth professional treatment. Sound designers, mix engineers, and session producers are running real freelance businesses — they just haven't always been treated that way by the tools available to them.</p>

          <p className="mb-5">That changes when you start invoicing properly. Clients take you more seriously. Payments come faster. And you stop doing mental math at midnight.</p>

          <p className="font-semibold" style={{color:'#0f172a'}}>Stop using Venmo for your production work. You've earned better than that.</p>

        </div>
      </article>

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
