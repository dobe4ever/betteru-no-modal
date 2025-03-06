"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth/AuthProvider"
import { supabase, upsertProfile } from "@/utils/supabase"

export function EditProfile() {
  const { user } = useAuth()
  const [username, setUsername] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  
  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.username || "")
      setAvatarUrl(user.user_metadata?.avatar_url || "https://i.pravatar.cc/300")
    }
  }, [user])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ text: "", type: "" })
    
    try {
      // Update user metadata in Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: { 
          username,
          avatar_url: avatarUrl 
        }
      })
      
      if (authError) {
        throw authError
      }
      
      setMessage({ text: "Profile updated successfully!", type: "success" })
      
      // Close modal after successful update (after brief delay to show success message)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('close-modal'))
      }, 1500)
      
    } catch (err: any) {
      setMessage({ text: err.message || "An unexpected error occurred", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setIsLoading(true)
    setMessage({ text: "", type: "" })
    
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `avatars/${fileName}`
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file)
        
      if (uploadError) {
        throw uploadError
      }
      
      // Get the public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath)
        
      if (data) {
        setAvatarUrl(data.publicUrl)
      }
    } catch (error: any) {
      setMessage({ text: error.message || "Error uploading image", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = () => {
    window.dispatchEvent(new CustomEvent('close-modal'))
  }
  
  return (
    <div className="bg-white h-full overflow-auto p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        
        {message.text && (
          <div className={`p-3 mb-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full mb-4 overflow-hidden border-4 border-orange-300">
              <img 
                src={avatarUrl || "https://i.pravatar.cc/300"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full">
              <Label htmlFor="avatar" className="block mb-1">Profile Picture</Label>
              <Input 
                id="avatar" 
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="username" className="block mb-1">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div className="pt-4 flex gap-4">
            <Button 
              type="button" 
              variant="outline"
              className="w-full" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

