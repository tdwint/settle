import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/dashboard/LogoutButton'
import MobileNav from '@/components/dashboard/MobileNav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name, email, subscription_tier')
    .eq('id', user.id)
    .single()

  const initials = (profile?.full_name ?? profile?.email ?? 'U')[0].toUpperCase()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    { href: '/clients', label: 'Clients', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )},
    { href: '/settings', label: 'Settings', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )},
  ]

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">

      {/* ── MOBILE TOP BAR ─────────────────────────────────── */}
      <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="logo-mark w-7 h-7 rounded-lg">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-sm font-bold text-slate-900">Settle</span>
        </div>
        <Link href="/invoices/new"
          className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg"
          style={{background:'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          New invoice
        </Link>
      </header>

      <div className="flex flex-1">
        {/* ── DESKTOP SIDEBAR ──────────────────────────────── */}
        <aside style={{width:'232px'}} className="hidden lg:flex fixed h-full flex-col bg-white border-r border-slate-100 z-40">
          <div className="px-5 h-16 flex items-center border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="logo-mark w-8 h-8 rounded-lg">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">Settle</span>
            </div>
          </div>

          <div className="px-4 pt-4 pb-2">
            <Link href="/invoices/new"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98]"
              style={{background:'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow:'0 1px 2px 0 rgba(0,0,0,0.12), 0 4px 12px -2px rgba(245,158,11,0.3)'}}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              New invoice
            </Link>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {profile?.subscription_tier !== 'pro' && (
            <div className="mx-3 mb-3">
              <Link href="/settings?tab=billing"
                className="block rounded-xl p-3 text-center transition-all hover:opacity-90"
                style={{background:'linear-gradient(135deg, #080720 0%, #1e1b6e 100%)'}}>
                <p className="text-xs font-semibold text-amber-400 mb-0.5">Upgrade to Pro</p>
                <p className="text-xs text-slate-400">Unlimited invoices</p>
              </Link>
            </div>
          )}

          <div className="px-3 pb-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 transition-colors mb-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-amber-700 text-sm flex-shrink-0"
                style={{background:'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'}}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">{profile?.business_name ?? profile?.full_name}</p>
                <p className="text-xs text-slate-400 truncate">{profile?.email}</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <main className="flex-1 min-h-screen p-4 lg:p-8 pb-24 lg:pb-8" style={{marginLeft:'0px'}}
          // On desktop, offset for sidebar
          // Using CSS class below instead
        >
          <div className="lg:ml-[232px]">
            {children}
          </div>
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAV ──────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50"
        style={{boxShadow:'0 -1px 12px rgba(0,0,0,0.06)'}}>
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-slate-400 hover:text-slate-700 transition-colors min-w-0">
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
