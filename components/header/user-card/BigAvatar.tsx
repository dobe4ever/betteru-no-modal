"use client"

import { useAuth } from "@/components/auth/AuthProvider"

interface BigAvatarProps {
  classnames?: string
}

export function BigAvatar({
  classnames = "flex justify-center aspect-[1/1] size-[75%] border-4 border-orange-300/50 shadow-lg rounded-full",
}: BigAvatarProps) {
  const { user } = useAuth()
  const avatarUrl = user?.user_metadata?.avatar_url || "https://i.pravatar.cc/300"
  
  return (
    <div className="w-full flex justify-center z-">
      <div className={classnames}>
        <img 
          src={avatarUrl} 
          className="overflow-hidden rounded-full w-full h-full object-cover" 
          alt="Profile"
        />
      </div>
    </div>
  )
}

