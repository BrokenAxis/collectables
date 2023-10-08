import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

// export async function PUT(request: Request) {
//   const requestUrl = new URL(request.url)
//   const formData = await request.json()
//   const username = String(formData.username)

// }

export async function PUT(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()

  let error
    
  if (requestUrl.pathname === '/api/auth/profile/update/username') {}
  else if (requestUrl.pathname === '/api/auth/profile/update/picture') {}
  else if (requestUrl.pathname === '/api/auth/profile/update/description') {}
  else if (requestUrl.pathname === '/api/auth/profile/update/email') {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const supabase_response = await supabase.auth.updateUser({email: String(formData.email)})
    error = supabase_response.error

  }
  else if (requestUrl.pathname === '/api/auth/profile/update/password') {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    const supabase_response = await supabase.auth.updateUser({password: 'new password'})
    error = supabase_response.error
  }
  return error
    ? new NextResponse(error.message, {
        status: error.status,
      })
    : NextResponse.redirect(requestUrl.origin, {
        status: 301,
      })   
}