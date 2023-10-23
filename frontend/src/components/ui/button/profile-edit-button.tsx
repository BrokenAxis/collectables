'use client'

import * as React from 'react'
import Link from 'next/link'
import { UserCog } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ProfileEditButton() {
  return (
    <Link href="/settings">
      {' '}
      <Button variant="outline" size="icon">
        <UserCog className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </Link>
  )
}
