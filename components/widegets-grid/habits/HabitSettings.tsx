// components/widegets-grid/habits/HabitSettings.tsx

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"

import { Habit } from "./HabitsData"

export function HabitSettings({ 
  habit, 
  onUpdateHabit, 
  onClose 
}: { 
  habit: Habit; 
  onUpdateHabit: (habit: Habit) => void; 
  onClose: () => void 
}) {
  const [editedHabit, setEditedHabit] = useState({ ...habit })
  const [isDaily, setIsDaily] = useState(!habit.repeating)

  const handleDayToggle = (day: string) => {
    const newDays = editedHabit.days?.includes(day)
      ? editedHabit.days.filter(d => d !== day)
      : [...(editedHabit.days || []), day]
    
    setEditedHabit({ ...editedHabit, days: newDays })
  }

  const handleSave = () => {
    // Apply daily/repeating status
    const updatedHabit = {
      ...editedHabit,
      repeating: !isDaily
    }
    
    onUpdateHabit(updatedHabit)
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] max-h-[90vh] rounded-t-xl">
        <SheetHeader className="border-b pb-2">
          <SheetTitle>Edit Habit</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)] p-4">
          <div className="space-y-6">
            {/* Habit Name Input */}
            <div className="space-y-2">
              <Label htmlFor="habit-name">Habit Name</Label>
              <Input 
                id="habit-name" 
                placeholder="e.g., Morning Meditation" 
                value={editedHabit.title}
                onChange={(e) => setEditedHabit({ ...editedHabit, title: e.target.value })}
              />
            </div>

            {/* Daily Habit Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Habit</p>
                <p className="text-sm text-gray-500">Repeat this habit every day</p>
              </div>
              <Switch 
                checked={isDaily} 
                onCheckedChange={setIsDaily}
              />
            </div>

            {/* Weekly Schedule */}
            {!isDaily && (
              <div className="space-y-3">
                <Label>Weekly Schedule</Label>
                <div className="flex gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <Button
                      key={day}
                      onClick={() => handleDayToggle(day)}
                      variant={editedHabit.days?.includes(day) ? "default" : "outline"}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      {day.charAt(0).toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Reminder Time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reminder-time">Set Reminder</Label>
                <Switch 
                  checked={editedHabit.hasAlarm} 
                  onCheckedChange={(checked) => setEditedHabit({ ...editedHabit, hasAlarm: checked })}
                />
              </div>
              {editedHabit.hasAlarm && (
                <Input
                  id="reminder-time"
                  type="time"
                  value={editedHabit.time || "06:00"}
                  onChange={(e) => setEditedHabit({ ...editedHabit, time: e.target.value })}
                  className="mt-2"
                />
              )}
            </div>


            {/* Pin Habit */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pin this habit</p>
                <p className="text-sm text-gray-500">Prioritize this habit in your list</p>
              </div>
              <Switch 
                checked={editedHabit.pinned} 
                onCheckedChange={(checked) => setEditedHabit({ ...editedHabit, pinned: checked })}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                placeholder="Add any notes or tips to help you with this habit..."
                value={editedHabit.notes || ""}
                onChange={(e) => setEditedHabit({ ...editedHabit, notes: e.target.value })}
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
