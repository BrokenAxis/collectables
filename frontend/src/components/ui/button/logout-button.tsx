'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  async function onSubmit() {
    const logOutResult = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!logOutResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: logOutResult?.statusText,
        variant: 'destructive',
      })
    }

    if (logOutResult?.redirected && logOutResult?.url) {
      // We need to redirect manually as we're using fetch instead of form
      // We aren't using native html forms due to issues with Nextjs Server Actions
      // which are required to make form interactive
      router.push(logOutResult.url)
    }
  }

  return (
    <Button
      onClick={() => onSubmit()}
      variant="outline"
      size="sm"
      className="transition-transform duration-300 transform active:translate-y-3"
    >
      Logout
    </Button>
  )
}
