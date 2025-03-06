// components/widegets-grid/habits/HabitSettings.tsx

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Check, Calendar, Repeat, Pin, AlarmClock, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const [repeatOption, setRepeatOption] = useState(
    !habit.repeating ? "once" : 
    habit.days && habit.days.length > 0 ? "custom" : "daily"
  )

  const handleDayToggle = (day: string) => {
    const newDays = editedHabit.days?.includes(day)
      ? editedHabit.days.filter(d => d !== day)
      : [...(editedHabit.days || []), day]
    
    setEditedHabit({ ...editedHabit, days: newDays })
  }

  const handleSave = () => {
    // Apply the correct repeat settings based on selected option
    const updatedHabit = {
      ...editedHabit,
      repeating: repeatOption !== "once",
      days: repeatOption === "daily" ? [] : editedHabit.days
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

            {/* Repeat Habit Options */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Repeat Habit</Label>
              
              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={repeatOption === "once" ? "default" : "outline"}
                  className={cn(
                    "flex flex-col items-center justify-center h-24 space-y-2 text-center",
                    repeatOption === "once" ? "border-2 border-orange-500" : ""
                  )}
                  onClick={() => setRepeatOption("once")}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Check className={cn("h-5 w-5", repeatOption === "once" ? "text-orange-500" : "text-gray-400")} />
                  </div>
                  <p className="text-sm font-medium">Only Once</p>
                </Button>
                
                <Button
                  type="button"
                  variant={repeatOption === "daily" ? "default" : "outline"}
                  className={cn(
                    "flex flex-col items-center justify-center h-24 space-y-2 text-center",
                    repeatOption === "daily" ? "border-2 border-orange-500" : ""
                  )}
                  onClick={() => setRepeatOption("daily")}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Repeat className={cn("h-5 w-5", repeatOption === "daily" ? "text-orange-500" : "text-gray-400")} />
                  </div>
                  <p className="text-sm font-medium">Every Day</p>
                </Button>
                
                <Button
                  type="button"
                  variant={repeatOption === "custom" ? "default" : "outline"}
                  className={cn(
                    "flex flex-col items-center justify-center h-24 space-y-2 text-center",
                    repeatOption === "custom" ? "border-2 border-orange-500" : ""
                  )}
                  onClick={() => setRepeatOption("custom")}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Calendar className={cn("h-5 w-5", repeatOption === "custom" ? "text-orange-500" : "text-gray-400")} />
                  </div>
                  <p className="text-sm font-medium">Select Days</p>
                </Button>
              </div>
              
              {/* Weekly Schedule for custom option */}
              {repeatOption === "custom" && (
                <div className="space-y-3 mt-4">
                  <Label>Select days of the week</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <Button
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        variant={editedHabit.days?.includes(day) ? "default" : "outline"}
                        className="w-12 h-12 p-0 rounded-full"
                      >
                        {day.charAt(0).toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reminder Time */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlarmClock className={cn("h-5 w-5", editedHabit.hasAlarm ? "text-orange-500" : "text-gray-400")} />
                  <Label htmlFor="reminder-time" className="text-base font-medium">Set Reminder</Label>
                </div>
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
              <div className="flex items-center gap-2">
                <Pin className={cn("h-5 w-5", editedHabit.pinned ? "text-orange-500" : "text-gray-400")} />
                <div>
                  <p className="font-medium">Pin this habit</p>
                  <p className="text-sm text-gray-500">Prioritize this habit in your list</p>
                </div>
              </div>
              <Switch 
                checked={editedHabit.pinned} 
                onCheckedChange={(checked) => setEditedHabit({ ...editedHabit, pinned: checked })}
              />
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className={cn("h-5 w-5", editedHabit.notes ? "text-orange-500" : "text-gray-400")} />
                <Label htmlFor="notes" className="text-base font-medium">Notes</Label>
              </div>
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
