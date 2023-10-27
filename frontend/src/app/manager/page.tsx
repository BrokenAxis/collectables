'use client'
import * as React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'
import { Carousel } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { AddCampaignButton } from '@/components/ui/button/add-campaign-button'
import { Database } from '@/lib/database.types'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Dashboard() {
  const [collections, setCollections] = React.useState<Collectable[]>([])

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
    } else {
      console.log('not pog')
    }
  }

  const { data: result } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection`,
    fetcher
  )

  //console.log(img)

  React.useEffect(() => {
    if (result) {
      console.log('zzzzzzzzz')
      console.log(result)
      setCollections(result?.data)
    }
  }, [result])

  return (
    <div className="flex flex-col min-h-screen">
      {/* <GeneralNavBar /> */}

      <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
        <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
          <div className="flex flex-row">
            <div className="grow">
              <TypographyH2 text="Your Campaigns" />
            </div>
            <div>
              <AddCampaignButton></AddCampaignButton>
            </div>
          </div>
          <Carousel>
            {img.map((src, i) => {
              return (
                <div key={i} className="">
                  <div className="relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
                    <Link href="/campaign">
                      <Image
                        src={src}
                        layout="fill"
                        className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                        alt="alt"
                      />
                    </Link>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </section>

      <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
        <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
          <TypographyH2 text="Archived Campaigns" />
          <Carousel>
            {collections.map((src, i) => {
              return (
                <div key={i} className="">
                  <div className="relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
                    <Image
                      src={src}
                      layout="fill"
                      className=" grayscale object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                      alt="alt"
                    />
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </section>
    </div>
  )
}
