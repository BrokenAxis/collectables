import { BackButton } from './ui/button/back-button'
import { LogoutButton } from './ui/button/logout-button'
import { SettingsButton } from './ui/button/settings-button'
import { ToggleDarkMode } from './ui/button/theme-toggle-button'
import { IconLogo } from '@/components/ui/assets/IconLogo'

export function GeneralNavBar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex items-center space-x-4 sm:justify-left sm:space-x-0">
          <BackButton />
          <IconLogo className="w-10 h-10 mx-auto absolute left-4 top-4 md:left-36 md:top-4"/>
          <p className="text-2xl font-semibold tracking-tight absolute left-4 top-4 md:left-52 md:top-4">
            Goomba Market
          </p>
      </div>
      <div className="container flex mr-0 h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ToggleDarkMode />
          <SettingsButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
