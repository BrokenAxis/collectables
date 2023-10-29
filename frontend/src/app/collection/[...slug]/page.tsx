'use client'

import * as React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { Carousel } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { RemoveCollectableFromCollectionButton } from '@/components/ui/button/remove-collectable-from-collection-button'
import { LoadingScreen } from '@/components/ui/page/loading-page'
import { Skeleton } from '@/components/ui/skeleton'
import { EditCampaignButton } from '@/components/ui/button/edit-campaign-button'
import { AddCollectionToCampaignButton } from '@/components/ui/button/add-collection-to-campaign-button'
import { Role } from '@/lib/utils'

const default_img =
  'https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'

export default function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
  const [collection, setCollection] = React.useState<Collection>()
  const [role, setRole] = React.useState<Role>()

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

  const { data: collectionResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection/${params.slug}`,
    fetcher
  )

  const { data: roleResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role`,
    fetcher
  )

  React.useEffect(() => {
    if (collectionResult) {
      setCollection(collectionResult)
    }
    if (roleResult?.role) {
      setRole((roleResult?.role as Role) ?? Role.NULL)
    }
  }, [collectionResult, roleResult, params.slug])

  return collection ? (
    <>
      <GeneralNavBar />
      <section className="container flex flex-col lg:flex-row max-w-screen pt-3">
        <div className="container flex flex-col gap-2 w-fit">
          <div className="flex flex-row">
            <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 w-auto mr-3 ml-3">
              {collection?.image ? (
                <Image
                  src={collection.image}
                  width={702}
                  height={528}
                  className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                  alt="Campaign Image"
                />
              ) : (
                <Skeleton className="object-cover h-full w-full rounded-2xl" />
              )}
            </div>
            <div className="pt-4">
              {role === Role.MANAGER && (
                <EditCampaignButton></EditCampaignButton>
              )}
            </div>
          </div>
          <h2 className="text-2xl font-semibold truncate">
            {collection?.name}
          </h2>
          <hr />
          <div className="flex flex-row flex-wrap gap-2 pb-3">
            <p className="text-sm font-normal break-words pt-1">Tags:</p>
            {collection?.tags.map((tag, i) => {
              return (
                <p
                  key={i}
                  className="bg-secondary pl-2 pr-2 pb-1 pt-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {tag}
                </p>
              )
            })}
          </div>
        </div>

        <div className="container border rounded-2xl pt-3 lg:max-w-[calc(100vw-600px)]">
          <div className="flex flex-row">
            <h2 className="grow text-lg md:text-2xl font-semibold break-word">
              Collections Within {collection.name}
            </h2>
            {role === Role.MANAGER && (
              <AddCollectionToCampaignButton></AddCollectionToCampaignButton>
            )}
          </div>
          <Carousel>
            {collection.collectables.map(({ image, name }, i) => {
              return (
                <div key={i} className="">
                  <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
                    <Link href={`/collectable/${name}`}>
                      <Image
                        src={image!}
                        layout="fill"
                        className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                        alt="alt"
                      />
                      {role === Role.MANAGER && (
                        <div
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <RemoveCollectableFromCollectionButton></RemoveCollectableFromCollectionButton>
                        </div>
                      )}
                    </Link>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </section>
    </>
  ) : (
    <LoadingScreen />
  )

  //   return collection ? (
  //     <>
  //       <GeneralNavBar />
  //       <section className="pt-6 md:pt-10">
  //         <div className="relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
  //           <Image
  //             src={collection.image!}
  //             width={500}
  //             height={500}
  //             className="object-cover w-full"
  //             alt="Campaign Image"
  //           />
  //         </div>
  //         <div className="container flex flex-row flex-wrap gap-4">
  //           <div className="flex flex-col order-last gap-2 md:order-none w-screen md:w-fit">
  //             <h2 className="text-2xl font-semibold truncate">
  //               {collection?.name}
  //             </h2>
  //             <hr />
  //             <p className="text-sm font-normal break-words md:max-w-[400px] lg:max-w-[600px]">
  //               Tags: {collection?.tags.join(', ')}
  //             </p>
  //           </div>
  //           <EditCollectionButton></EditCollectionButton>
  //         </div>

  //         <div className="container gap-4 pb-6">
  //           <div className="flex pb-3 md:pb-6 pt-3 md:pt-6"></div>
  //           <div className="container border rounded-2xl pt-3 pb-3">
  //             <div className="flex flex-row">
  //               <h2 className="grow text-lg md:text-2xl font-semibold truncate">
  //                 Collectables within &quot;{collection.name}&quot;
  //               </h2>
  //               <AddCollectableToCollection></AddCollectableToCollection>
  //             </div>
  //             <Carousel>
  //               {collection.collectables.map(({ image, name }, i) => {
  //                 return (
  //                   <div key={i} className="">
  //                     <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
  //                       <Link href={`/collectable/${name}`}>
  //                         <Image
  //                           src={image}
  //                           layout="fill"
  //                           className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
  //                           alt="alt"
  //                         />
  //                         <div
  //                           onClick={(e) => {
  //                             e.preventDefault()
  //                           }}
  //                         >
  //                           <RemoveCollectableFromCollectionButton></RemoveCollectableFromCollectionButton>
  //                         </div>
  //                       </Link>
  //                     </div>
  //                   </div>
  //                 )
  //               })}
  //             </Carousel>
  //           </div>
  //         </div>
  //       </section>
  //     </>
  //   ) : (
  //     <>
  //       <GeneralNavBar />
  //       <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
  //         <Loader2 className="h-10 w-10 animate-spin" />
  //       </div>
  //     </>
  //   )
}
