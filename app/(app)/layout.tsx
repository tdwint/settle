import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/dashboard/LogoutButton'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name, email')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-warm-50 flex">
      {/* SIDEBAR */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-coral-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-800">S</span>
            </div>
            <span className="text-lg font-800 text-gray-900">Settle</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/dashboard', label: 'Dashboard', icon: '◈' },
            { href: '/invoices/new', label: 'New invoice', icon: '+' },
            { href: '/clients', label: 'Clients', icon: '👥' },
            { href: '/settings', label: 'Settings', icon: '⚙' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-600 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-coral-100 rounded-full flex items-center justify-center font-700 text-coral-600 text-sm">
              {(profile?.full_name ?? profile?.email ?? 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-600 text-gray-900 truncate">{profile?.business_name ?? profile?.full_name}</p>
              <p className="text-xs text-gray-400 truncate">{profile?.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-60 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
