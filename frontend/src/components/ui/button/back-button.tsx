import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ButtonProps {
  color?: string
}

export function BackButton({ ...props }: ButtonProps) {
  return (
    <Link href="/">
      {' '}
      <Button
        variant="outline"
        className={cn('absolute left-4 top-4 md:left-8 md:top-4', props)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </Link>
  )
}
