"use client"

import { useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Widget } from "@/components/widegets-grid/widget"
import { Store } from 'lucide-react'

export function ShopDrawer() {
  const [open, setOpen] = useState(false)

  const ShopWidget = ({ onShopClick }: { onShopClick: () => void }) => (
    <Widget title="Shop" onClick={onShopClick} className="flex flex-col gap-4 aspect-[1/1]">
      <div className="flex flex-col items-center">
        <Store className="w-8 h-8 text-orange-400 mt-2" />
        <span className="text-2xl font-bold mb-2">98 Items</span>
        <span className="text-description-card">Explore products and services all in one place</span>
      </div>
    </Widget>
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <ShopWidget onShopClick={() => setOpen(true)} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle className="text-title-white">Shop</DrawerTitle>
        </DrawerHeader>
        {/* Content will be added here in the future */}
      </DrawerContent>
    </Drawer>
  )
}

