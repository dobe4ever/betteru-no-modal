"use client"

import { useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Widget } from "@/components/widegets-grid/widget"
import { Trophy } from 'lucide-react'

export function BadgesDrawer() {
  const [open, setOpen] = useState(false)

  const BadgesWidget = ({ onBadgesClick }: { onBadgesClick: () => void }) => (
    <Widget title="Badges" onClick={onBadgesClick} className="flex flex-col gap-4 aspect-[1/1]">
      <div className="flex flex-col items-center">
        <Trophy className="w-8 h-8 text-orange-400 mt-2" />
        <span className="text-xl font-bold mb-2">85 Total</span>
        <span className="text-description-card">Earn rewards by hitting milestones</span>
      </div>
    </Widget>
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <BadgesWidget onBadgesClick={() => setOpen(true)} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle className="text-title-white">Badges</DrawerTitle>
        </DrawerHeader>
        {/* Content will be added here in the future */}
      </DrawerContent>
    </Drawer>
  )
}

