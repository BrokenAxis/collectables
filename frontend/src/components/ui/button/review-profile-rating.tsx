'use client'

import * as React from 'react'

import { Rating } from '@smastrom/react-rating'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { ReviewUserForm } from '../form/review-user-form'
import useSWR from 'swr'

export function ReviewProfileRating({ username }: { username: string }) {
  const [open, setOpen] = React.useState(false)
  const [rating, setRating] = React.useState(0) // Change to get request first
  const [userSetRating, setUserSetRating] = React.useState(0)
  const [profileReviews, setProfileReviews] = React.useState<ProfileReview[]>(
    []
  )

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const session = (await supabase.auth.getSession()).data.session
    const token = session?.access_token

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token!,
      },
    })

    if (res?.ok) {
      return await res.json()
    }
  }

  const { data: profileReviewsData, mutate } = useSWR<ProfileReview[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/reviews/profile/${username}`,
    fetcher
  )

  React.useEffect(() => {
    if (profileReviewsData) {
      const averageRating =
        profileReviewsData.reduce((a, b) => a + b.review, 0) /
        profileReviewsData.length

      console.log(averageRating)
      setRating(averageRating)
      setProfileReviews(profileReviewsData)
    }
  }, [profileReviewsData])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Rating
          className="overflow-hidden"
          value={Math.round(rating)}
          onChange={(r: number) => {
            setOpen(true)
            setUserSetRating(r)
          }}
        />
        <span className="text-sm font-medium leading-none">
          ( Reviews: {profileReviews.length} )
        </span>
      </DialogTrigger>
      <DialogContent className="w-auto m-20">
        <DialogHeader>
          <DialogTitle>Review User</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-left">
          <ReviewUserForm
            rating={userSetRating}
            username={username}
            mutate={mutate}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
