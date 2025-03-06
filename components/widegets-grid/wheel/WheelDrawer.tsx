"use client"

import { useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Widget } from "@/components/widegets-grid/widget"
import { LoaderPinwheel } from 'lucide-react'

export function WheelDrawer() {
  const [open, setOpen] = useState(false)

  const WheelWidget = ({ onWheelClick }: { onWheelClick: () => void }) => (
    <Widget title="Wheel Tool" onClick={onWheelClick} className="flex flex-col gap-4 aspect-[1/1]">
      <div className="flex flex-col items-center">
        <LoaderPinwheel className="w-8 h-8 text-orange-400 mt-2" />
        <span className="text-xl font-bold mb-2">Score: 73%</span>
        <span className="text-description-card">Visualize progress across all life areas</span>
      </div>
    </Widget>
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <WheelWidget onWheelClick={() => setOpen(true)} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle className="text-title-white">Wheel Tool</DrawerTitle>
        </DrawerHeader>
        {/* Content will be added here in the future */}
      </DrawerContent>
    </Drawer>
  )
}

