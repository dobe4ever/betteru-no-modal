"use client"

import { useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Widget } from "@/components/widegets-grid/widget"
import { GraduationCap } from 'lucide-react'

export function CoursesDrawer() {
  const [open, setOpen] = useState(false)

  const CoursesWidget = ({ onCoursesClick }: { onCoursesClick: () => void }) => (
    <Widget title="Courses" onClick={onCoursesClick} className="flex flex-col gap-4 aspect-[1/1]">
      <div className="grid grid-cols-3 gap-2 mt-">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className="aspect-square w-9 rounded-lg bg-orange-50 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-orange-400" />
          </div>
        ))}
      </div>
      <span className="text-description-card">Curated learning paths to track your journey</span>
    </Widget>
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <CoursesWidget onCoursesClick={() => setOpen(true)} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle className="text-title-white">Courses</DrawerTitle>
        </DrawerHeader>
        {/* Content will be added here in the future */}
      </DrawerContent>
    </Drawer>
  )
}

