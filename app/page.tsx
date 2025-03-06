// app/page.tsx

"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header/Header"
import { StickyTop } from "@/components/sticky-top/StickyTop"
import { WidgetsGrid } from "@/components/widegets-grid/WidgetsGrid"
import { ChatbotDrawer } from "@/components/chatbot/ChatbotDrawer"
import { AuthProvider } from "@/components/auth/AuthProvider"

export default function Home() {
  const [fadePercentage, setFadePercentage] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY
        const headerHeight = headerRef.current.offsetHeight
        const newFadePercentage = Math.max(0, Math.min(100, (scrollPosition / headerHeight) * 100))
        setFadePercentage(newFadePercentage)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AuthProvider>
      <div className="relative max-h-screen w-full bg-gradient-orange">
        <ChatbotDrawer />

        <div ref={headerRef} className="relative z-10">
          <Header />
          <div
            className="absolute top-0 w-full h-[450px] bg-white pointer-events-none"
            style={{ opacity: fadePercentage / 100, zIndex: 20 }}
          />
        </div>

        <div className="sticky top-0 z-30">
          <StickyTop />
        </div>

        <div className="relative z-20">
          <WidgetsGrid />
        </div>

      </div>
    </AuthProvider>
  )
}

