// components/widegets-grid/habits/HabitList.tsx

import { ScrollArea } from "@/components/ui/scroll-area"
import { HabitCard } from "./HabitCard"
import { Habit } from "./HabitsData"

export function HabitList({ 
  habits, 
  showCompleted, 
  onToggleCompleted, 
  onEditHabit 
}: { 
  habits: Habit[]; 
  showCompleted: boolean; 
  onToggleCompleted: (id: string) => void; 
  onEditHabit: (habit: Habit) => void 
}) {
  const filteredHabits = habits.filter(habit => showCompleted || !habit.completed)

  return (
    <ScrollArea className="flex-grow px-4 overflow-y-auto">
      <div className="py-2">
        {filteredHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleCompleted={() => onToggleCompleted(habit.id)}
            onEditClick={() => onEditHabit(habit)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
