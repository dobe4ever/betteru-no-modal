// components/widegets-grid/habits/HabitList.tsx

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import { CircleButton } from "@/components/custom-components/custom-buttons"
import { HabitCard } from "./HabitCard"
import { Habit } from "./HabitsData"

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
  habits: Habit[]; 
  showCompleted: boolean; 
  onToggleHabitCompleted: (id: string) => void;
  onToggleCompletedVisibility: (value: boolean) => void;
  onEditHabit: (habit: Habit) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  dates: Date[];
  onAddHabitClick: () => void;
}) {
  const filteredHabits = habits.filter(habit => showCompleted || !habit.completed)

  return (
    <Card className="flex-grow overflow-hidden rounded-t-xl w-full max-w-full">
      <CardContent className="p-0 flex flex-col h-auto max-h-[85vh]">
        {/* Date Navigation */}
        <div className="flex justify-between items-center p-2 mb-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newDate = new Date(selectedDate)
              newDate.setDate(selectedDate.getDate() - 1)
              setSelectedDate(newDate)
            }}
            disabled={selectedDate.toDateString() === dates[0].toDateString()}
            className="min-w-8"
          >
            <ChevronLeft className="h-4 w-4" />
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
            className="min-w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Date Dots */}
        <div className="flex justify-center flex-wrap gap-2 mb-2">
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
        <div className="flex justify-between items-center p-2">
          <div>
            <CircleButton 
              onClick={onAddHabitClick} 
              variant="plus"
              className="h-8 w-8"
            />
          </div>
        
          <div>
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
        </div>

        <Separator />

        {/* Habits List */}
        <ScrollArea className="flex-grow w-full overflow-y-auto">
          <div className="p-2 w-full">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleCompleted={() => onToggleHabitCompleted(habit.id)}
                onEditClick={() => onEditHabit(habit)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
