// components/widegets-grid/habits/HabitCard.tsx

import { useState } from "react"
import { ChevronDown, Check, Pin, AlarmClock, Repeat, Settings, Calendar, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Habit } from "./HabitsData"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HabitCard({ 
  habit, 
  onToggleCompleted, 
  onEditClick 
}: { 
  habit: Habit
  onToggleCompleted: () => void
  onEditClick: () => void 
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mb-2 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-2.5">
        <div className="flex items-center w-full gap-2 flex-wrap sm:flex-nowrap">
          {/* Checkmark */}
          <Button
            onClick={onToggleCompleted}
            className={cn(
              "group flex-none flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 p-0 transition-all duration-300",
              habit.completed 
                ? "border-orange-500 text-orange-500 bg-orange-50" 
                : "border-gray-200 text-gray-200 hover:border-gray-300 hover:text-gray-300"
            )}
            variant="ghost"
            aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <Check
              className={cn(
                "w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300",
                habit.completed ? "scale-100" : "scale-75 group-hover:scale-90"
              )}
            />
          </Button>

          {/* Title and feature indicators */}
          <div className="flex-grow flex flex-col justify-center min-w-0 overflow-hidden">
            <h3 
              className={cn(
                "text-sm font-medium break-words transition-colors duration-300",
                habit.completed ? "text-gray-400" : "text-gray-800"
              )}
            >
              {habit.title}
            </h3>
            
            <div className="flex items-center flex-wrap gap-1 mt-0.5">
              <Pin className={cn("h-3.5 w-3.5", habit.pinned ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
              <AlarmClock className={cn("h-3.5 w-3.5", habit.hasAlarm ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
              <Repeat className={cn("h-3.5 w-3.5", habit.repeating && (!habit.days || habit.days.length === 0) ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
              <Calendar className={cn("h-3.5 w-3.5", habit.days && habit.days.length > 0 ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
              <FileText className={cn("h-3.5 w-3.5", habit.notes ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
              {habit.time && habit.hasAlarm && (
                <span className="text-xs text-gray-500 truncate">{habit.time}</span>
              )}
            </div>
          </div>

          {/* Controls and Streak */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Streak counter */}
            <div className="flex items-center mr-0.5">
              <span className={cn(
                "text-sm font-bold",
                (habit.streak || 0) >= 30 ? "text-red-500" : 
                (habit.streak || 0) >= 15 ? "text-orange-500" : 
                (habit.streak || 0) >= 7 ? "text-amber-500" : "text-gray-400"
              )}>
                {habit.streak || 0}
              </span>
              <span className="ml-0.5 text-sm">🔥</span>
            </div>
            
            {/* Settings button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditClick}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
              aria-label="Edit habit settings"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            {/* Expand button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              <ChevronDown
                className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Expandable Content */}
        <div 
          className={cn(
            "overflow-hidden transition-all duration-300 w-full",
            isExpanded ? "max-h-96 opacity-100 mt-2 pt-2 border-t border-gray-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-2 px-1">
            {habit.hasAlarm && (
              <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
                <span className="text-xs font-medium">Reminder Time</span>
                <span className="text-xs bg-gray-50 px-2 py-1 rounded-full">
                  {habit.time || "Not set"}
                </span>
              </div>
            )}
            
            {habit.repeating && (
              <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
                <span className="text-xs font-medium">Repeats On</span>
                <span className="text-xs bg-gray-50 px-2 py-1 rounded-full overflow-hidden text-ellipsis max-w-full sm:max-w-[70%]">
                  {habit.days && habit.days.length > 0 ? habit.days.join(", ") : "Every day"}
                </span>
              </div>
            )}
            
            {habit.notes && (
              <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
                <span className="text-xs font-medium">Notes</span>
                <span className="text-xs bg-gray-50 px-2 py-1 rounded-full overflow-hidden text-ellipsis max-w-full sm:max-w-[70%]">
                  {habit.notes}
                </span>
              </div>
            )}
            
            <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
              <span className="text-xs font-medium">Current Streak</span>
              <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
                {habit.streak || 0} days
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}