import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    const { data, error } = await (supabase as any).auth.exchangeCodeForSession(code)

    if (!error && type === 'recovery' && data?.session) {
      // Pass tokens to reset-password page via URL so the client can set the session
      const accessToken = data.session.access_token
      const refreshToken = data.session.refresh_token
      return NextResponse.redirect(
        `${origin}/reset-password#access_token=${accessToken}&refresh_token=${refreshToken}&type=recovery`
      )
    }

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
