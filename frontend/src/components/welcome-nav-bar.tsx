import { LoginButton } from './ui/button/login-button'
import { ToggleDarkMode } from './ui/button/theme-toggle-button'

export function DefaultNavBar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ToggleDarkMode />
          <LoginButton />
        </div>
      </div>
    </header>
  )
}
