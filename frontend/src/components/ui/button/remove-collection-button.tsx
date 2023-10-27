'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function RemoveCollectionButton() {
  return (
    <Dialog>
      <DialogTrigger asChild className="hidden group-hover:block">
        <Button className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to remove this collection from the campaign?
          </DialogTitle>
        </DialogHeader>
        <div>yes/no</div>
      </DialogContent>
    </Dialog>
  )
}
