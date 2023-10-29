import { AvatarButton } from '../button/avatar-button'
import { ChatsButton } from '../button/chats-button'
import { LogoutButton } from '../button/logout-button'
import { SearchButton } from '../button/search-button'
import { ToggleDarkMode } from '../button/theme-toggle-button'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import { ManagerButton } from '../button/manager-button'
import Link from 'next/link'

export function GeneralNavBar() {
  return (
    <header className="w-full border-b bg-background">
      <Link href="/dashboard">
        <IconLogo className="w-10 h-10 mx-auto absolute left-4 top-4 2xl:left-36 md:top-4" />
      </Link>

      <p className="text-2xl font-semibold tracking-tight absolute left-4 top-4 md:left-20 2xl:left-52 md:top-4 invisible md:visible">
        Goomba Market
      </p>
      <div className="container flex h-16 mr-0 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ManagerButton />
          <SearchButton />
          <ToggleDarkMode />
          <ChatsButton />
          <AvatarButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
