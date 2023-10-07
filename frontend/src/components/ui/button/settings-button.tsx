import * as React from 'react'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function SettingsButton() {
  return (
    <Link href="settings">
      {' '}
      <Button variant="outline" size="icon">
        <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </Link>
  )
}
