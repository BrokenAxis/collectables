'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Archive } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ArchiveCampaignButton() {
  return (
    <Dialog>
      <DialogTrigger asChild className="hidden group-hover:block">
        <Button className="absolute right-4 top-4">
          <Archive className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want archive this campaign?
          </DialogTitle>
        </DialogHeader>
        <div>yes/no</div>
      </DialogContent>
    </Dialog>
  )
}