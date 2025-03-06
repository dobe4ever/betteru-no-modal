"use client"

import { useState } from "react"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger
} from "@/components/ui/sheet"

import { HabitsWidget } from "./HabitsWidget"
import { HabitList } from "./HabitList"
import { ChallengeCard } from "./ChallengeCard"
import { mockHabits } from "./HabitsData"

export function HabitsSheet() {
  const [open, setOpen] = useState(false)
  const [habits, setHabits] = useState(mockHabits)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <HabitsWidget habits={habits} />
        </div>
      </SheetTrigger>

      <SheetContent 
        side="bottom" 
        className="flex flex-col p-0 bg-gradient-orange h-[100vh] rounded-t-xl overflow-hidden [&>button]:text-white [&>button>svg]:stroke-[3]"
      >
        <SheetHeader className="flex flex-row items-center justify-between p-4 pb-0">
          <SheetTitle className="text-title-white">Habits</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <ChallengeCard totalHabits={habits.length} />
          <HabitList habits={habits} setHabits={setHabits} />
        </div>
      </SheetContent>
    </Sheet>
  )
}