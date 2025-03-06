// components/header/top-bar/EditProfileDialog.tsx

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth/AuthProvider"
import { supabase } from "@/utils/supabase"
import { Camera, Loader2, Trash2, Edit, X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog" 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function EditProfileDialog() {
  const { user } = useAuth()
  const [username, setUsername] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.username || "")
      setAvatarUrl(user.user_metadata?.avatar_url || "")
    }
  }, [user])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ text: "", type: "" })
    
    try {
      const { error: authError } = await supabase.auth.updateUser({
        data: { 
          username,
          avatar_url: avatarUrl 
        }
      })
      
      if (authError) throw authError
      
      setMessage({ text: "Profile updated successfully!", type: "success" })
      
    } catch (err: any) {
      setMessage({ text: err.message || "An unexpected error occurred", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleFileUpload = async (file: File) => {
    if (!file) return
    
    setUploading(true)
    setMessage({ text: "", type: "" })
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `avatars/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file)
        
      if (uploadError) throw uploadError
      
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath)
        
      if (data) {
        setAvatarUrl(data.publicUrl)
        setMessage({ text: "Image uploaded successfully!", type: "success" })
        setTimeout(() => {
          setMessage({ text: "", type: "" })
        }, 3000)
      }
    } catch (error: any) {
      setMessage({ text: error.message || "Error uploading image", type: "error" })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveAvatar = async () => {
    setUploading(true)
    setMessage({ text: "", type: "" })
    
    try {
      const { error: authError } = await supabase.auth.updateUser({
        data: { 
          avatar_url: "" 
        }
      })
      
      if (authError) throw authError
      
      setAvatarUrl("")
      setMessage({ text: "Profile picture removed!", type: "success" })
      setTimeout(() => {
        setMessage({ text: "", type: "" })
      }, 3000)
    } catch (error: any) {
      setMessage({ text: error.message || "Error removing image", type: "error" })
    } finally {
      setUploading(false)
    }
  }
  
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??'
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Edit className="mr-2 h-4 w-4 text-orange-main" /> 
          <span className="text-gray-500">Edit Profile</span>
        </div>
      </DialogTrigger>
      <DialogContent className="dialog-wrapper">
        <DialogHeader className="dialog-header">
          <DialogTitle className="dialog-title">Edit Profile</DialogTitle>
          <DialogClose className="dialog-close-btn">
            <X className="w-5 h-5" />
          </DialogClose>
        </DialogHeader>
        
        {message.text && (
          <div className={`p-3 mb-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <Avatar className="w-full h-full border-4 border-orange-300">
                <AvatarImage src={avatarUrl} className="object-cover" />
                <AvatarFallback className="text-2xl bg-orange-100 text-orange-500">
                  {getInitials(username)}
                </AvatarFallback>
              </Avatar>
              
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
              
              {/* Camera circle */}
              <div 
                className="absolute right-0 bottom-1 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white cursor-pointer shadow-md"
                onClick={handleAvatarClick}
              >
                <Camera className="text-white w-5 h-5" />
              </div>

              {/* Remove avatar button - only show if there's an avatar */}
              {avatarUrl && (
                <div 
                  className="absolute left-0 bottom-1 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white cursor-pointer shadow-md"
                  onClick={handleRemoveAvatar}
                >
                  <Trash2 className="text-white w-5 h-5" />
                </div>
              )}
            </div>
            
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
          </div>
          
          <div>
            <Label htmlFor="username" className="block mb-1">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-3xl"
            />
          </div>
          
          <DialogFooter className="dialog-footer">
            <div className="flex w-full gap-4">
              <DialogClose asChild>
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full rounded-3xl" 
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="dialog-submit-btn rounded-3xl" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}