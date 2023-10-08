import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Add settings
  // Don't hardcode. Have an array. Then check all in /dashboard instead of just /dashboard

  if (session && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (session && req.nextUrl.pathname === '/register') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!session && req.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!session && req.nextUrl.pathname === '/settings') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}
