// components/header/top-bar/ProfileDropdown.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LogOut, Crown } from "lucide-react"
import { EditProfileDialog } from "./EditProfileDialog"
import { BigAvatar } from "../user-card/BigAvatar"
import { useAuth } from "@/components/auth/AuthProvider"

export function ProfileDropdown() {
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
        <div className="text-md text-gray-500 p-2">{email}</div>
        
        <div className="flex flex-row p-2">
          <div className="flex items-center">
            <BigAvatar classnames="size-10 border-2 rounded-full border-white mr-3" />
            <div className="flex flex-col">
              <div className="text-title-card">{username}</div>
              <p className="text-gray-500 text-sm whitespace-nowrap">Free plan</p>
            </div>
          </div>
        </div>
        
        <DropdownMenuItem className="bg-orange-50 border border-orange-main/20 rounded-xl my-1 hover:bg-orange-100 transition-colors p-3">
          <Crown className="mr-3 text-orange-main"/> 
          <div className="flex flex-col">
            <div className="text-gray-500 font-bold">Upgrade to Premium</div>
            <div className="text-orange-main/60 text-xs">Coming soon</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem asChild>
          <EditProfileDialog />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4 text-orange-main" /> 
          <span className="text-gray-500">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}