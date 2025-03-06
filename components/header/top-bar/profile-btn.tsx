"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LogOut, Edit, Crown } from "lucide-react"
import { BigAvatar } from "../user-card/BigAvatar"
import { useAuth } from "@/components/auth/AuthProvider"

export function ProfileBtn() {
  const { user, signOut } = useAuth()
  const username = user?.user_metadata?.username || "User"
  const email = user?.email || "email@example.com"
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full size-8 text-white pr-">
          <BigAvatar classnames="size-8 border rounded-full border-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w- p-3">
        <DropdownMenuItem className="text-md text-gray-500 p-2">{email}</DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row">
          <div className="flex items-center">
            <BigAvatar classnames="size-10 border-2 rounded-full border-white mr-3" />
            <div className="flex flex-col">
              <div className="text-title-card">{username}</div>
              <p className="text-gray-500 text-sm whitespace-nowrap">Free plan</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Crown className="mr-2 h-4 w-4" /> Upgrade to Premium
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.dispatchEvent(new CustomEvent('open-edit-profile'))}>
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

