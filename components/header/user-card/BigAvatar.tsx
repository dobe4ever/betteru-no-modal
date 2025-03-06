// components/header/user-card/BigAvatar.tsx

"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

interface BigAvatarProps {
  classnames?: string
}

export function BigAvatar({
  classnames = "flex justify-center aspect-[1/1] size-[70%] border-4 border-orange-300/50 shadow-lg rounded-full",
}: BigAvatarProps) {
  const { user } = useAuth()
  const avatarUrl = user?.user_metadata?.avatar_url || ""
  const username = user?.user_metadata?.username || "User"
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??'
  }
  
  return (
    <div className="w-full flex justify-center">
      <div className={classnames}>
        <Avatar className="w-full h-full">
          <AvatarImage src={avatarUrl} className="object-cover" />
          <AvatarFallback className="text-2xl bg-orange-100 text-orange-500">
            {getInitials(username)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}