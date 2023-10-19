import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const token = (await supabase.auth.getSession()).data.session?.access_token

  if (!token) {
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    })
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_HOSTNAME}/chat/${formData.name}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(formData),
      }
    )

    console.log(response)
    console.log(response.ok)
    const data = await response.json()
    console.log(data)
    console.log(response.ok)

    if (!response.ok || response.status === 500) {
      throw new Error('Cannot create chat')
    }
  } catch {
    return NextResponse.redirect(requestUrl.origin)
  }

  return new NextResponse(JSON.stringify({}), {
    status: 200,
  })
}
