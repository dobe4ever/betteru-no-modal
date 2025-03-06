// components/widegets-grid/habits/HabitList.tsx

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { HabitCard } from "./HabitCard"
import { Habit } from "./HabitsData"
import { formatDate, isToday } from "./utils"

export function HabitList({ 
  habits, 
  showCompleted, 
  onToggleHabitCompleted, 
  onToggleCompletedVisibility,
  onEditHabit,
  selectedDate,
  setSelectedDate,
  dates,
  onAddHabitClick
}: { 
  habits: Habit[]
  showCompleted: boolean
  onToggleHabitCompleted: (id: string) => void
  onToggleCompletedVisibility: (value: boolean) => void
  onEditHabit: (habit: Habit) => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  dates: Date[]
  onAddHabitClick: () => void
}) {
  const filteredHabits = habits.filter(habit => showCompleted || !habit.completed)

  return (
    <Card className="flex-grow overflow-hidden w-full rounded-b">
      <CardHeader className="p-0 space-y-0">
        {/* Date Navigation */}
        <div className="flex justify-between items-center p-3 pb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newDate = new Date(selectedDate)
              newDate.setDate(selectedDate.getDate() - 1)
              setSelectedDate(newDate)
            }}
            disabled={selectedDate.toDateString() === dates[0].toDateString()}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-center">
            <p className="font-medium">
              {isToday(selectedDate) ? "Today" : formatDate(selectedDate)}
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
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Date Dots */}
        <div className="flex justify-center gap-2 pb-2 px-3">
          {dates.map((date) => (
            <button
              key={date.toISOString()}
              className={`size-2 rounded-full transition-colors ${
                date.toDateString() === selectedDate.toDateString() 
                  ? "bg-orange-500" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setSelectedDate(date)}
              aria-label={date.toLocaleDateString()}
            />
          ))}
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-between items-center p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddHabitClick}
            className="h-8 w-8 p-0 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleCompletedVisibility(!showCompleted)}
            title={showCompleted ? "Hide completed habits" : "Show completed habits"}
            className="h-8 w-8 p-0"
          >
            {showCompleted ? (
              <Eye className="h-4 w-4 text-gray-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-600" />
            )}
          </Button>
        </div>

        <Separator />
      </CardHeader>

      {/* Habits List */}
      <CardContent className="p-0 h-[calc(85vh-200px)]">
        <ScrollArea className="h-full">
          <div className="p-2">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleCompleted={() => onToggleHabitCompleted(habit.id)}
                  onEditClick={() => onEditHabit(habit)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {habits.length > 0 
                  ? "No habits to show. Try showing completed habits."
                  : "No habits yet. Click the + button to add one."}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}