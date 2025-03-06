// components/widegets-grid/habits/HabitsSheet.tsx

"use client"

import { useState } from "react"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { HabitsWidget } from "./HabitsWidget"
import { HabitList } from "./HabitList"
import { ChallengeCard } from "./ChallengeCard"
import { HabitSettings } from "./HabitSettings"
import { mockHabits, Challenge, Habit } from "./HabitsData"
import { getWeekDates } from "./utils"

export function HabitsSheet() {
  // State management
  const [open, setOpen] = useState(false)
  const [habits, setHabits] = useState<Habit[]>(mockHabits)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCompleted, setShowCompleted] = useState(true)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [isChallengeExpanded, setIsChallengeExpanded] = useState(false)
  const [isAddingHabit, setIsAddingHabit] = useState(false)
  const [newHabitTitle, setNewHabitTitle] = useState("")

  // Get dates for the week navigation
  const dates = getWeekDates()

  // Handlers
  const handleToggleCompleted = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const handleUpdateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ))
    setEditingHabit(null)
  }

  const handleAddHabit = () => {
    if (newHabitTitle.trim()) {
      const newHabit: Habit = { 
        id: Date.now().toString(), 
        title: newHabitTitle, 
        completed: false,
        streak: 0
      }
      setHabits([...habits, newHabit])
      setNewHabitTitle("")
      setIsAddingHabit(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <HabitsWidget habits={habits} />
        </div>
      </SheetTrigger>

      <SheetContent 
        side="bottom" 
        className="flex flex-col p-0 bg-gradient-orange h-[100vh] rounded-t-xl overflow-hidden"
      >
        <SheetHeader className="flex flex-row items-center justify-between p-4 pb-0">
          <SheetTitle className="text-title-white">Habits</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <ChallengeCard
            challenge={challenge}
            setChallenge={setChallenge}
            totalHabits={habits.length}
            isExpanded={isChallengeExpanded}
            setIsExpanded={setIsChallengeExpanded}
          />

          <HabitList
            habits={habits}
            showCompleted={showCompleted}
            onToggleHabitCompleted={handleToggleCompleted}
            onToggleCompletedVisibility={setShowCompleted}
            onEditHabit={setEditingHabit}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dates={dates}
            onAddHabitClick={() => setIsAddingHabit(true)}
          />
        </div>

        {/* Modals & Dialogs */}
        {editingHabit && (
          <HabitSettings
            habit={editingHabit}
            onUpdateHabit={handleUpdateHabit}
            onClose={() => setEditingHabit(null)}
          />
        )}

        <Dialog open={isAddingHabit} onOpenChange={setIsAddingHabit}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Habit</DialogTitle>
            </DialogHeader>
            <div className="py-3">
              <Input
                value={newHabitTitle}
                onChange={(e) => setNewHabitTitle(e.target.value)}
                placeholder="Enter habit title..."
                className="w-full"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingHabit(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddHabit} disabled={!newHabitTitle.trim()}>
                Add Habit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  )
}