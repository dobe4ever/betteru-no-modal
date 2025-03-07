// components/widegets-grid/habits/HabitsData.tsx

// Types
export interface Habit {
    id: string
    title: string
    completed: boolean
    pinned?: boolean
    hasAlarm?: boolean
    repeating?: boolean
    time?: string
    days?: string[]
    streak?: number
    notes?: string
  }
  
  export interface Challenge {
    duration: number
    minimumHabits: number
    totalHabits: number
    startDate: Date
    progress: number
  }

  // Mock Data
  export const mockHabits: Habit[] = [
    { 
      id: "1", 
      title: "Morning Meditation", 
      completed: false, 
      streak: 5,
      repeating: true, 
      pinned: true, 
      hasAlarm: true, 
      time: "07:00",
      notes: "Focus on breath for 10 minutes"
    },
    { 
      id: "2", 
      title: "Read for 30 minutes", 
      completed: true, 
      repeating: false, 
      streak: 12 
    },
    { 
      id: "3", 
      title: "Exercise", 
      completed: false, 
      hasAlarm: true, 
      time: "18:00", 
      streak: 3 
    },
    { 
      id: "4", 
      title: "Write in journal", 
      completed: false, 
      pinned: true, 
      streak: 7 
    },
    { 
      id: "5", 
      title: "Drink 8 glasses of water", 
      completed: true, 
      repeating: true, 
      streak: 30 
    },
    {
      id: "6",
      title: "Take vitamins",
      completed: true,
      hasAlarm: true,
      time: "08:00",
      streak: 22
    },
    {
      id: "7",
      title: "Walk 10,000 steps",
      completed: false,
      streak: 4
    },
    {
      id: "8",
      title: "Practice gratitude",
      completed: false,
      notes: "Write down three things I'm grateful for",
      streak: 15
    },
    {
      id: "9",
      title: "Stretch for 10 minutes",
      completed: false,
      repeating: true,
      days: ["Mon", "Tue", "Thu", "Sat"],
      streak: 8
    },
    {
      id: "10",
      title: "No screen time before bed",
      completed: true,
      hasAlarm: true,
      time: "22:00",
      streak: 3
    }
  ]
