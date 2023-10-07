import { LogoutButton } from './ui/button/logout-button'
import { SettingsButton } from './ui/button/settings-button'
import { ToggleDarkMode } from './ui/button/theme-toggle-button'
import { IconLogo } from '@/components/ui/assets/IconLogo'

export function DashboardNavBar() {
  return (
    <header className="w-full border-b bg-background">
      <IconLogo className="w-10 h-10 mx-auto absolute left-4 top-4 md:left-36 md:top-4"/>
      <p className="text-2xl font-semibold tracking-tight absolute left-4 top-4 md:left-52 md:top-4">
        Goomba Market
      </p>
      <div className="container flex h-16 mr-0 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ToggleDarkMode />
          <SettingsButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
