// components/header/user-card/BigDate.tsx
"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/components/auth/AuthProvider"

export function BigDate() {
  const { user } = useAuth()
  const username = user?.user_metadata?.username || "User"
  
  // Format current date
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 10 }}
      transition={{ delay: 0.1, duration: 0.2 }}
      className="text-center"
    >
      <h2 className="text-white text-xl font-bold mb-1">Welcome, {username}!</h2>
      <p className="text-orange-main">
        <span className="tracking-tighter font-bold text-title-orange">{formattedDate}</span>
      </p>
    </motion.div>
  )
}

