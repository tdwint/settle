import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Artist\'s Guide to Getting Paid — Without the Awkward Conversations',
  description: 'Talking about money is uncomfortable for most artists. Here\'s how invoicing professionally removes the awkwardness and gets you paid faster.',
  alternates: { canonical: 'https://gigpay.today/blog/artists-guide-to-getting-paid' },
  openGraph: {
    title: 'The Artist\'s Guide to Getting Paid — Without the Awkward Conversations',
    description: 'Talking about money is uncomfortable for most artists. Here\'s how to fix that.',
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
          <Link href="/artists" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6" style={{background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a'}}>
            Artists
          </Link>
          <h1 className="font-display leading-tight mb-6" style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)', color:'#0f172a', letterSpacing:'-0.02em', lineHeight:'1.15'}}>
            The Artist's Guide to Getting Paid —<br/>Without the Awkward Conversations.
          </h1>
          <p className="text-lg leading-relaxed" style={{color:'#64748b'}}>
            You finished the commission. It took three weeks, four revisions, and more patience than you knew you had. Now comes the part most artists dread: asking to get paid.
          </p>
        </div>

        <div style={{color:'#334155', lineHeight:'1.8', fontSize:'1.0625rem'}}>

          <p className="mb-6">For a lot of artists, the money conversation feels uncomfortable — even when the money is clearly owed. There's a fear of seeming too transactional, too pushy, or worse, losing the relationship entirely. So they wait. And wait. And sometimes just don't follow up at all.</p>

          <p className="mb-8">A professional invoice removes all of that. It's not a confrontation — it's a document. It takes the emotion out of the exchange and makes getting paid feel routine, because it is.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>The real reason clients delay payment</h2>

          <p className="mb-5">Most clients who pay late aren't doing it on purpose. They're busy. They have their own bills to pay and their own priorities. When there's no invoice with a clear due date sitting in their inbox, your payment just doesn't make the list.</p>

          <p className="mb-8">Send a proper invoice and two things happen: it signals that this is a professional transaction, and it gives them an easy, frictionless way to pay right now — with a card, in 30 seconds, without having to find their checkbook or remember their Venmo password.</p>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>What artists should always invoice for</h2>

          <p className="mb-5">Every creative service you provide is billable. Don't leave any of these off the table:</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { label: 'Commissions', desc: 'Portraits, custom pieces, character art — always collect a deposit upfront' },
              { label: 'Murals & installations', desc: 'Bill for design, surface prep, materials, and labor separately' },
              { label: 'Illustration work', desc: 'Editorial, book, and brand illustration — invoice per deliverable' },
              { label: 'Graphic design', desc: 'Logos, branding, identity work — bill for concepts and revisions' },
              { label: 'Concept art', desc: 'Game, film, and media work — milestone billing keeps projects on track' },
              { label: 'Prints & digital art', desc: 'Every sale is a transaction — treat it like one' },
              { label: 'Set & prop design', desc: 'Theater and film work — detailed invoices protect you on big projects' },
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

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Always collect a deposit</h2>

          <p className="mb-5">This is the single biggest change most artists can make. For any commission or custom work, ask for 50% upfront before you start. Here's why it works:</p>

          <div className="space-y-3 mb-8 pl-5" style={{borderLeft:'3px solid #e2e8f0'}}>
            <p><span className="font-semibold" style={{color:'#0f172a'}}>It filters out bad clients.</span> Anyone unwilling to pay a deposit is a red flag. Professional clients expect it.</p>
            <p><span className="font-semibold" style={{color:'#0f172a'}}>It covers your materials.</span> Never spend your own money on a client project before you've been paid something.</p>
            <p><span className="font-semibold" style={{color:'#0f172a'}}>It signals your value.</span> Artists who charge deposits are taken more seriously. It's that simple.</p>
            <p><span className="font-semibold" style={{color:'#0f172a'}}>It removes the final payment awkwardness.</span> When you've already collected half, asking for the rest feels natural.</p>
          </div>

          <hr className="my-10" style={{borderColor:'#e2e8f0'}} />

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center my-10" style={{background:'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)'}}>
            <h3 className="font-display text-2xl text-white mb-3">Start invoicing like a professional.</h3>
            <p className="text-sm mb-6" style={{color:'#94a3b8'}}>Free to start. No credit card. First invoice in under 2 minutes.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{background:'#f59e0b', color:'white'}}>
              Start invoicing free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <h2 className="font-display text-2xl mb-5 mt-10" style={{color:'#0f172a'}}>Your work deserves professional treatment</h2>

          <p className="mb-5">The artists who get paid consistently aren't the ones with the most followers or the biggest client list. They're the ones who treat their work like a business — who send invoices, set due dates, and make it easy for clients to pay.</p>

          <p className="font-semibold" style={{color:'#0f172a'}}>The awkward payment conversation disappears the moment you send a proper invoice. Try it once and you'll never go back.</p>

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
