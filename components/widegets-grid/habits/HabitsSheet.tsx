// components/widegets-grid/habits/HabitsSheet.tsx

"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HabitsWidget } from "./HabitsWidget"
import { HabitList } from "./HabitList"
import { ChallengeCard } from "./ChallengeCard"
import { HabitSettings } from "./HabitSettings"
import { mockHabits, Challenge, Habit } from "./HabitsData"

export function HabitsSheet() {
  const [open, setOpen] = useState(false)
  const [habits, setHabits] = useState<Habit[]>(mockHabits)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCompleted, setShowCompleted] = useState(true)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [isChallengeExpanded, setIsChallengeExpanded] = useState(false)
  const [isAddingHabit, setIsAddingHabit] = useState(false)
  const [newHabitTitle, setNewHabitTitle] = useState("")

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 3 + i)
    return date
  })

  const handleToggleCompleted = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const handleUpdateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ))
    setIsSettingsOpen(false)
  }

  const handleAddHabit = () => {
    if (newHabitTitle.trim()) {
      setHabits([...habits, { id: Date.now().toString(), title: newHabitTitle, completed: false }])
      setNewHabitTitle("")
      setIsAddingHabit(false)
    }
  }

  const handleToggleCompletedVisibility = () => {
    setShowCompleted(!showCompleted)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div>
          <HabitsWidget onHabitsClick={() => setOpen(true)} habits={habits} />
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" className="flex flex-col p-0 bg-gradient-orange max-h-screen overflow-hidden">
        <SheetHeader>
          <SheetTitle className="m-2 text-title-white">Habits</SheetTitle>
        </SheetHeader>

        <div className="px-2 w-full">
          <ChallengeCard
            challenge={challenge}
            setChallenge={setChallenge}
            totalHabits={habits.length}
            isExpanded={isChallengeExpanded}
            setIsExpanded={setIsChallengeExpanded}
          />
        </div>

        <div className="flex-grow overflow-hidden w-full px-2">
          {/* Main Habits List with integrated card, date nav, and action buttons */}
          <HabitList
            habits={habits}
            showCompleted={showCompleted}
            onToggleHabitCompleted={handleToggleCompleted}
            onToggleCompletedVisibility={handleToggleCompletedVisibility}
            onEditHabit={(habit: Habit) => {
              setEditingHabit(habit)
              setIsSettingsOpen(true)
            }}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dates={dates}
            onAddHabitClick={() => setIsAddingHabit(true)}
          />
        </div>

        {/* Add Habit Form */}
        {isAddingHabit && (
          <div className="bg-white rounded-2xl p-3 border shadow-md m-2">
            <Input
              value={newHabitTitle}
              onChange={(e) => setNewHabitTitle(e.target.value)}
              placeholder="Enter habit title..."
              className="mb-2 w-full"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAddingHabit(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddHabit} disabled={!newHabitTitle.trim()}>
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Habit Settings Dialog */}
        {isSettingsOpen && editingHabit && (
          <HabitSettings
            habit={editingHabit}
            onUpdateHabit={handleUpdateHabit}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
