// components/widegets-grid/habits/HabitsWidget.tsx

import { Widget } from "@/components/widegets-grid/widget"

import { Habit } from "./HabitsData"

export function HabitsWidget({ onHabitsClick, habits }: { onHabitsClick: () => void; habits: Habit[] }) {
  const completedCount = habits.filter(habit => habit.completed).length

  return (
    <Widget title="Today's Habits" onClick={onHabitsClick} className="z-10">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-description-card">Completed</p>
          <p className="text-xl font-bold">{completedCount}/{habits.length}</p>
        </div>
        <p className="text-big-percent-number">
          {Math.round((completedCount / habits.length) * 100)}%
        </p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          style={{
            width: `${Math.round((completedCount / habits.length) * 100)}%`,
            transition: "width 1s ease-in-out",
          }}
        />
      </div>
    </Widget>
  )
}
