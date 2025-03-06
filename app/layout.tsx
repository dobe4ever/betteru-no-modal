import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/components/auth/AuthProvider"

const nunito = Nunito({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Better You App",
  description: "An app to help you become a better version of yourself",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

