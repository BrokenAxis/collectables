import { LogoutButton } from './ui/button/logout-button'
import { SettingsButton } from './ui/button/settings-button'
import { ToggleDarkMode } from './ui/button/theme-toggle-button'

export function DashboardNavBar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ToggleDarkMode />
          <SettingsButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
