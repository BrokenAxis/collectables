'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Search } from 'lucide-react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { useRouter } from 'next/navigation'

export function SearchButton() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [searchText, setSearchText] = React.useState<string>('')

  const [collectables, setCollectables] = React.useState<Collectable[]>([])
  const [users, setUsers] = React.useState<Profile[]>([])
  const [collections, setCollections] = React.useState<Collection[]>([])
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])

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

  const userData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/search/user/${searchText}`,
    fetcher
  )
  const collectableData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/search/collectable/${searchText}`,
    fetcher
  )
  const collectionData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/search/collection/${searchText}`,
    fetcher
  )
  const campaignData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/search/campaign/${searchText}`,
    fetcher
  )

  React.useEffect(() => {
    if (collectableData?.data) {
      setCollectables(collectableData?.data)
    }
    if (userData?.data) {
      setUsers(userData?.data)
    }
    if (collectionData?.data) {
      setCollections(collectionData?.data)
    }
    if (campaignData?.data) {
      console.log(campaignData?.data)
      setCampaigns(campaignData?.data)
    }
  }, [
    collectableData?.data,
    userData?.data,
    collectionData?.data,
    campaignData?.data,
  ])

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[325px]" side="right" align="start">
          <Command
            filter={(value, search) => {
              const tags = [
                ...collectables.map((collectable) => collectable.tags),
                ...campaigns.map((campaign) => campaign.tags),
                ...collections.map((collection) => collection.tags),
              ].flat()

              const matching_tags = tags.some((tag) => tag.includes(search))

              return value.toLowerCase().includes(search.toLowerCase()) ||
                matching_tags
                ? 1
                : 0
            }}
          >
            <CommandInput
              placeholder="Search..."
              onValueChange={setSearchText}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Users">
                {users.map((users) => (
                  <CommandItem
                    key={users.name}
                    value={users.name}
                    onSelect={(value) => {
                      router.push(`/profile/${value}`)
                    }}
                  >
                    <span>{users.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Collectables">
                {collectables.map((collectable) => (
                  <CommandItem
                    key={collectable.name}
                    value={collectable.name}
                    onSelect={(value) => {
                      router.push(`/collectable/${value}`)
                    }}
                  >
                    <span>{collectable.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Campaigns">
                {campaigns.map((campaigns) => (
                  <CommandItem
                    key={campaigns.name}
                    value={campaigns.name}
                    onSelect={(value) => {
                      router.push(`/campaign/${value}`)
                    }}
                  >
                    <span>{campaigns.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Collections">
                {collections.map((collection) => (
                  <CommandItem
                    key={collection.name}
                    value={collection.name}
                    onSelect={(value) => {
                      router.push(`/collection/${value}`)
                    }}
                  >
                    <span>{collection.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
