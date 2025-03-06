"use client"

import { useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Widget } from "@/components/widegets-grid/widget"
import { Bot } from 'lucide-react'

export function CheckinDrawer() {
  const [open, setOpen] = useState(false)

  const CheckinWidget = ({ onCheckinClick }: { onCheckinClick: () => void }) => (
    <Widget title="AI Check-in" onClick={onCheckinClick} className="flex flex-col gap-4 aspect-[1/1]">
      <div className="flex flex-col items-center">
        <Bot className="w-8 h-8 text-orange-400 mt-2" />
        <span className="text-xl font-bold mb-2">24/7</span>
        <span className="text-description-card">24/7 AI guidance and support</span>
      </div>
    </Widget>
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <CheckinWidget onCheckinClick={() => setOpen(true)} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle className="text-title-white">AI Check-in</DrawerTitle>
        </DrawerHeader>
        {/* Content will be added here in the future */}
      </DrawerContent>
    </Drawer>
  )
}

