'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { toast } from '../use-toast'

export function ConfirmTradeButton({
  tradeId,
  mutate,
}: {
  tradeId: string
  mutate: () => void
}) {
  const confirmTrade = async () => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/trade/status/${tradeId}/ACCEPTED`,
      {
        method: 'PUT',
        headers: {
          authorization: token!,
        },
      }
    )

    if (!res?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: res?.statusText,
        variant: 'destructive',
      })
    }

    mutate()

    return toast({
      title: 'Success!',
      description: 'Trade was successfully confirmed!',
      variant: 'default',
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-fit pl-2 pr-2"
      onClick={confirmTrade}
    >
      Confirm Trade
    </Button>
  )
}
