// components/widegets-grid/habits/HabitsSheet.tsx

"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import { CircleButton } from "@/components/custom-components/custom-buttons"
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div>
          <HabitsWidget onHabitsClick={() => setOpen(true)} habits={habits} />
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[100vh] flex flex-col p-0 bg-gradient-orange">
        <SheetHeader>
          <SheetTitle className="m-2 text-title-white">Habits</SheetTitle>
        </SheetHeader>


        <div className="px-2">
          <ChallengeCard
            challenge={challenge}
            setChallenge={setChallenge}
            totalHabits={habits.length}
            isExpanded={isChallengeExpanded}
            setIsExpanded={setIsChallengeExpanded}
          />
        </div>

        <Card className="flex-grow overflow-hidden rounded-t-2xl">
          <CardContent className="p-0 h-[100vh] flex flex-col">
            {/* Date Navigation */}
            <div className="flex justify-between items-center p-2 m-2 mb-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(selectedDate.getDate() - 1)
                  setSelectedDate(newDate)
                }}
                disabled={selectedDate.toDateString() === dates[0].toDateString()}
              >
                <ChevronLeft />
              </Button>

              <div className="text-center">
                <p className="font-medium">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(selectedDate.getDate() + 1)
                  setSelectedDate(newDate)
                }}
                disabled={selectedDate.toDateString() === dates[dates.length - 1].toDateString()}
              >
                <ChevronRight />
              </Button>
            </div>

            {/* Date Dots */}
            <div className="flex justify-center space-x-2 mb-2">
              {dates.map((date) => (
                <button
                  key={date.toISOString()}
                  className={`size-2 rounded-full transition-colors ${
                    date.toDateString() === selectedDate.toDateString() ? "bg-orange-500" : "bg-gray-300"
                  }`}
                  onClick={() => setSelectedDate(date)}
                  aria-label={date.toLocaleDateString()}
                />
              ))}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-row justify-between px-4">
              <div className="">
                <CircleButton 
                  onClick={() => setIsAddingHabit(true)} 
                  variant="plus"
                  className="h-8 w-8"
                  disabled={isAddingHabit}
                />
              </div>
            
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCompleted(!showCompleted)}
                  title={showCompleted ? "Hide completed habits" : "Show completed habits"}
                >
                  {showCompleted ? (
                    <Eye className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-600" />
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Habits List */}
            <HabitList
              habits={habits}
              showCompleted={showCompleted}
              onToggleCompleted={handleToggleCompleted}
              onEditHabit={(habit: Habit) => {
                setEditingHabit(habit)
                setIsSettingsOpen(true)
              }}
            />


            {/* Add Habit Form */}
            {isAddingHabit && (
              <div className="bg-white rounded-2xl p-3 border shadow-md mb-2 mx-4">
                <Input
                  value={newHabitTitle}
                  onChange={(e) => setNewHabitTitle(e.target.value)}
                  placeholder="Enter habit title..."
                  className="mb-2"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAddingHabit(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleAddHabit} disabled={!newHabitTitle.trim()}>
                    Add
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
