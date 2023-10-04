import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function GetStartedButton() {
  return (
    <Link href="/register">
      <Button
        size="lg"
        className="transition-transform duration-300 transform active:translate-y-3"
      >
        Get Started
      </Button>
    </Link>
  )
}
