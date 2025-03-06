"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { LoginSignup } from "./LoginSignup"

const AuthContext = createContext<{ user: any; signOut: () => Promise<void> } | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user)
      } else {
        setUser(null)
      }
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (!user) {
    return <LoginSignup />
  }

  return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthProvider

