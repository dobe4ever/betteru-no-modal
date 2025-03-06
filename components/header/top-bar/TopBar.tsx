// components/header/top-bar/TopBar.tsx
import { MenuDropdown } from "./MenuDropdown"
import { LogoWhite } from "./logo"
import { NotificationsDropdown } from "./NotificationsDropdown"
import { ProfileDropdown } from "./ProfileDropdown"

export function TopBar() {
  return (
    <div className="relative pl-1 p-2 pr-2 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <MenuDropdown />
          <LogoWhite />
        </div>
        <div className="flex items-center gap-3">
          <NotificationsDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  )
}

