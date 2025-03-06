"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Widget } from "@/components/widegets-grid/widget"

export function TodosDrawer() {
  const [open, setOpen] = useState(false)

  const TodosWidget = ({ onTodosClick }: { onTodosClick: () => void }) => (
    <Widget title="Today's Todos" onClick={onTodosClick}>
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-description-card">Completed</p>
          <p className="text-xl font-bold">3/12</p>
        </div>
        <p className="text-big-percent-number">29%</p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          style={{ width: "29%", transition: "width 1s ease-in-out" }}
        />
      </div>
    </Widget>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div>
          <TodosWidget onTodosClick={() => setOpen(true)} />
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[100vh] rounded-t-xl">
        <SheetHeader className="border-b pb-2">
          <SheetTitle className="text-title-white">Todos</SheetTitle>
        </SheetHeader>
        {/* Content will be added here in the future */}
      </SheetContent>
    </Sheet>
  )
}

