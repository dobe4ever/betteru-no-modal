import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { HabitCard } from "./HabitCard"
import { HabitSettings } from "./HabitSettings"
import { Habit } from "./HabitsData"
import { formatDate, isToday, getWeekDates } from "./utils"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function HabitList({ habits, setHabits }: { habits: Habit[], setHabits: (habits: Habit[]) => void }) {
  const [showCompleted, setShowCompleted] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [isAddingHabit, setIsAddingHabit] = useState(false)
  const [newHabitTitle, setNewHabitTitle] = useState("")

  const dates = getWeekDates()

  const filteredHabits = habits.filter(habit => showCompleted || !habit.completed)

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
    <Card className="flex-grow overflow-hidden w-full rounded-b">
      <CardHeader className="p-0 space-y-0">
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

        <div className="flex justify-between items-center p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAddingHabit(true)}
            className="h-8 w-8 p-0 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowCompleted(!showCompleted)}
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

      <CardContent className="p-0 h-[calc(85vh-200px)]">
        <ScrollArea className="h-full">
          <div className="p-2">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleCompleted={() => handleToggleCompleted(habit.id)}
                  onEditClick={() => setEditingHabit(habit)}
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
    </Card>
  )
}