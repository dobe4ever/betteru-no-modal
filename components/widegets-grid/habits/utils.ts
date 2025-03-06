// components/widegets-grid/habits/utils.ts

import { Habit } from "./HabitsData"

// Format date helpers
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

// Format duration helper for challenges
export const formatDuration = (days: number): string => {
  const weeks = Math.floor(days / 7)
  if (weeks === 1) return "1 week"
  if (weeks < 4) return `${weeks} weeks`
  const months = Math.floor(weeks / 4)
  return `${months} ${months === 1 ? "month" : "months"}`
}

// Get week dates (for date navigation)
export const getWeekDates = (): Date[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 3 + i)
    return date
  })
}

// Common constants
export const WEEK_IN_DAYS = 7
export const MIN_WEEKS = 1
export const MAX_WEEKS = 12