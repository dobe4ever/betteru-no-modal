// components/widegets-grid/habits/HabitsWidget.tsx

import { Widget } from "@/components/widegets-grid/widget"
import { Habit } from "./HabitsData"

export function HabitsWidget({ habits }: { habits: Habit[] }) {
  const completedCount = habits.filter(habit => habit.completed).length
  const completionPercentage = habits.length > 0 
    ? Math.round((completedCount / habits.length) * 100) 
    : 0

  return (
    <Widget title="Today's Habits" className="z-10">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-description-card">Completed</p>
          <p className="text-xl font-bold">{completedCount}/{habits.length}</p>
        </div>
        <p className="text-big-percent-number">{completionPercentage}%</p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          style={{
            width: `${completionPercentage}%`,
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
    </Widget>
  )
}