import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function PUT(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()
  const updateType = request.headers.get('update-type')

  let error
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const token = (await supabase.auth.getSession()).data.session?.access_token

  if (!token) {
    NextResponse.redirect(requestUrl.origin, {
      status: 301,
    })
  }

  if (updateType === 'name') {
    const backendResponse = await fetch(
      process.env.BACKEND_HOSTNAME + '/changeName',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(formData),
      }
    )

    return backendResponse.ok
      ? new NextResponse(JSON.stringify({}), {
          status: 200,
        })
      : new NextResponse(JSON.stringify({}), {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
        })
  } else if (updateType === 'picture') {
    const backendResponse = await fetch(
      process.env.BACKEND_HOSTNAME + '/changeImage',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(formData),
      }
    )

    return backendResponse.ok
      ? new NextResponse(JSON.stringify({}), {
          status: 200,
        })
      : new NextResponse(JSON.stringify({}), {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
        })
  } else if (updateType === 'description') {
    const backendResponse = await fetch(
      process.env.BACKEND_HOSTNAME + '/changeDescription',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(formData),
      }
    )

    return backendResponse.ok
      ? new NextResponse(JSON.stringify({}), {
          status: 200,
        })
      : new NextResponse(JSON.stringify({}), {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
        })
  } else if (updateType === 'email') {
    const supabase_response = await supabase.auth.updateUser({
      email: String(formData.email),
    })
    error = supabase_response.error
  } else if (updateType === 'password') {
    const supabase_response = await supabase.auth.updateUser({
      password: String(formData.password),
    })
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
