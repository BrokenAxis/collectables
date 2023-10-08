import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const token = (await supabase.auth.getSession()).data.session?.access_token

  if (!token) {
    NextResponse.redirect(requestUrl.origin, {
      status: 301,
    })
  }

  const backendResponse = await fetch(
    process.env.BACKEND_HOSTNAME + '/profile',
    {
      method: 'GET',
      headers: {
        authorization: token!,
      },
    }
  )

  const profile = await backendResponse.json()

  if (backendResponse.ok) {
    return new NextResponse(JSON.stringify({ profile }), {
      status: 200,
    })
  } else if (backendResponse.status != 401) {
    const createProfileResponse = await fetch(
      process.env.BACKEND_HOSTNAME + '/createUser',
      {
        method: 'POST',
        headers: {
          authorization: token!,
        },
      }
    )

    if (createProfileResponse.ok) {
      return new NextResponse(JSON.stringify({}), {
        status: 200,
      })
    } else {
      return new NextResponse(JSON.stringify({}), {
        status: createProfileResponse.status,
        statusText: createProfileResponse.statusText,
      })
    }
  }
}
