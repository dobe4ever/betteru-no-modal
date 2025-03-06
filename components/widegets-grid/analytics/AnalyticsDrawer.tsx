"use client"

import { useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Widget } from "@/components/widegets-grid/widget"
import { Activity } from 'lucide-react'

export function AnalyticsDrawer() {
  const [open, setOpen] = useState(false)

  const AnalyticsWidget = ({ onAnalyticsClick }: { onAnalyticsClick: () => void }) => (
    <Widget title="Analytics" onClick={onAnalyticsClick} className="flex flex-col gap-4 aspect-[1/1]">
      <div className="flex flex-col items-center">
        <Activity className="w-8 h-8 text-orange-400 mt-2 -mb-1.5" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="text-description-card">Last 7 days</div>
          <div className="text-description-card font-black">80%</div>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full w-3/4 bg-gradient-orange rounded-full"></div>
        </div>
        <div className="flex justify-between">
          <div className="text-description-card">Last 30 days</div>
          <div className="text-description-card font-black">48%</div>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
          <div className="h-full w-1/2 bg-gray-900 rounded-full"></div>
        </div>
      </div>
    </Widget>
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <AnalyticsWidget onAnalyticsClick={() => setOpen(true)} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle className="text-title-white">Analytics</DrawerTitle>
        </DrawerHeader>
        {/* Content will be added here in the future */}
      </DrawerContent>
    </Drawer>
  )
}

