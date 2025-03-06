"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Plus, Check, Settings, ChevronDown, ChevronRight } from "lucide-react"
import { Widget } from "@/components/widegets-grid/widget"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CustomSlider } from "@/components/custom-components/custom-slider"
import { motion, AnimatePresence } from "framer-motion"

// Types
interface HabitCard {
  id: string
  title: string
  completed: boolean
}

interface Challenge {
  duration: number
  minimumHabits: number
  totalHabits: number
  startDate: Date
  progress: number
}

// Mock data
const mockHabits = [
  { id: "1", title: "Morning Meditation", completed: false },
  { id: "2", title: "Read for 30 minutes", completed: true },
  { id: "3", title: "Exercise", completed: false },
  { id: "4", title: "Write in journal", completed: false },
  { id: "5", title: "Drink 8 glasses of water", completed: true },
  { id: "6", title: "Practice gratitude", completed: false },
  { id: "7", title: "Take vitamins", completed: true },
  { id: "8", title: "Walk 10,000 steps", completed: false },
  { id: "9", title: "Stretch for 10 minutes", completed: false },
  { id: "10", title: "No screen time before bed", completed: true },
]

// Constants
const WEEK_IN_DAYS = 7
const MIN_WEEKS = 1
const MAX_WEEKS = 12

export function HabitsDrawer() {
  // State
  const [open, setOpen] = useState(false)
  const [cards, setCards] = useState<HabitCard[]>(mockHabits)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCompleted, setShowCompleted] = useState(true)
  const [editingHabit, setEditingHabit] = useState<HabitCard | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isDaily, setIsDaily] = useState(true)
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false,
  })
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [duration, setDuration] = useState(WEEK_IN_DAYS)
  const [habitPercentage, setHabitPercentage] = useState(60)
  const [newHabitTitle, setNewHabitTitle] = useState("")
  const [isAddingHabit, setIsAddingHabit] = useState(false)
  const [isChallengeExpanded, setIsChallengeExpanded] = useState(false)

  // Date navigation
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 3 + i)
    return date
  })

  // Handlers
  const handleCompletedChange = (id: string, completed: boolean) => {
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, completed } : card)))
  }

  const handleAddHabit = () => {
    if (newHabitTitle.trim()) {
      setCards([
        ...cards,
        {
          id: String(Date.now()),
          title: newHabitTitle,
          completed: false,
        },
      ])
      setNewHabitTitle("")
      setIsAddingHabit(false)
    }
  }

  const handleDayToggle = (day: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  const handleStartChallenge = () => {
    const newChallenge: Challenge = {
      duration,
      minimumHabits: Math.ceil((habitPercentage / 100) * cards.length),
      totalHabits: cards.length,
      startDate: new Date(),
      progress: 0,
    }
    setChallenge(newChallenge)
    setIsChallengeExpanded(false)
  }

  const formatDuration = (days: number) => {
    const weeks = Math.floor(days / 7)
    if (weeks === 1) return "1 week"
    if (weeks < 4) return `${weeks} weeks`
    const months = Math.floor(weeks / 4)
    return `${months} ${months === 1 ? "month" : "months"}`
  }

  // Trigger component for the drawer
  const HabitsWidget = ({ onHabitsClick }: { onHabitsClick: () => void }) => (
    <Widget title="Today's Habits" onClick={onHabitsClick} className="z-10">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-description-card">Completed</p>
          <p className="text-xl font-bold">
            {cards.filter((card) => card.completed).length}/{cards.length}
          </p>
        </div>
        <p className="text-big-percent-number">
          {Math.round((cards.filter((card) => card.completed).length / cards.length) * 100)}%
        </p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          style={{
            width: `${Math.round((cards.filter((card) => card.completed).length / cards.length) * 100)}%`,
            transition: "width 1s ease-in-out",
          }}
        />
      </div>
    </Widget>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div>
          <HabitsWidget onHabitsClick={() => setOpen(true)} />
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[100vh] bg-orange-500 rounded-t-xl p-0">
        <SheetHeader>
          <SheetTitle className="text-title-white">Habits</SheetTitle>
        </SheetHeader>

        <div className="h-[calc(100vh-56px)] flex flex-col">
          {/* Challenge Card */}
          <div className="px-4 pb-4">
            <ChallengeCard
              challenge={challenge}
              onStartChallenge={handleStartChallenge}
              duration={duration}
              setDuration={setDuration}
              habitPercentage={habitPercentage}
              setHabitPercentage={setHabitPercentage}
              totalHabits={cards.length}
              isExpanded={isChallengeExpanded}
              setIsExpanded={setIsChallengeExpanded}
            />
          </div>

          {/* Habits Section */}
          <Card className="flex-grow overflow-hidden rounded-none">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Date Navigation */}
              <div className="flex justify-between items-center p-2 border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(selectedDate)
                    newDate.setDate(selectedDate.getDate() - 1)
                    setSelectedDate(newDate)
                  }}
                  disabled={selectedDate.toDateString() === dates[0].toDateString()}
                >
                  Previous
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
                >
                  Next
                </Button>
              </div>

              <div className="flex justify-center space-x-2 my-2">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    className={`size-3 rounded-full transition-colors ${
                      date.toDateString() === selectedDate.toDateString() ? "bg-orange-500" : "bg-gray-300"
                    }`}
                    onClick={() => setSelectedDate(date)}
                    aria-label={date.toLocaleDateString()}
                  />
                ))}
              </div>

              {/* Filter */}
              <div className="flex items-center justify-end p-2 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCompleted(!showCompleted)}
                  title={showCompleted ? "Hide completed habits" : "Show completed habits"}
                >
                  {showCompleted ? (
                    <Eye className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-600" />
                  )}
                </Button>
              </div>

              {/* Habits List */}
              <ScrollArea className="flex-grow px-4">
                {cards
                  .filter((card) => showCompleted || !card.completed)
                  .map((card) => (
                    <HabitCardComponent
                      key={card.id}
                      habit={card}
                      onCompletedChange={(completed) => handleCompletedChange(card.id, completed)}
                      onEditClick={() => {
                        setEditingHabit(card)
                        setIsSettingsOpen(true)
                      }}
                    />
                  ))}

                {isAddingHabit && (
                  <div className="bg-white rounded-2xl p-3 border shadow-md mb-2">
                    <Input
                      value={newHabitTitle}
                      onChange={(e) => setNewHabitTitle(e.target.value)}
                      placeholder="Enter habit title..."
                      className="mb-2"
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setIsAddingHabit(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleAddHabit} disabled={!newHabitTitle.trim()}>
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </ScrollArea>

              {/* Add Habit Button */}
              <div className="border-t p-4 mt-auto">
                <Button onClick={() => setIsAddingHabit(true)} className="w-full" disabled={isAddingHabit}>
                  <Plus className="mr-2 h-4 w-4" /> Add Habit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Habit Settings Dialog */}
        {isSettingsOpen && editingHabit && (
          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SheetContent side="bottom" className="h-[90vh] max-h-[90vh] rounded-t-xl">
              <SheetHeader className="border-b pb-2">
                <SheetTitle>Edit Habit</SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-[calc(90vh-80px)] p-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="habit-name">Habit Name</Label>
                    <Input id="habit-name" placeholder="e.g., Morning Meditation" defaultValue={editingHabit.title} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily Habit</p>
                      <p className="text-sm text-gray-500">Repeat this habit every day</p>
                    </div>
                    <Switch checked={isDaily} onCheckedChange={setIsDaily} />
                  </div>

                  {!isDaily && (
                    <div className="space-y-3">
                      <Label>Weekly Schedule</Label>
                      <div className="flex gap-2">
                        {Object.entries(selectedDays).map(([day, isSelected]) => (
                          <Button
                            key={day}
                            onClick={() => handleDayToggle(day as keyof typeof selectedDays)}
                            variant={isSelected ? "default" : "outline"}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            {day.charAt(0).toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="reminder-time">Reminder Time</Label>
                    <Input id="reminder-time" type="time" defaultValue="06:00" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                      placeholder="Add any notes or tips to help you with this habit..."
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button onClick={() => setIsSettingsOpen(false)}>
                      <Check className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        )}
      </SheetContent>
    </Sheet>
  )
}

// HabitCard Component
function HabitCardComponent({
  habit,
  onCompletedChange,
  onEditClick,
}: {
  habit: HabitCard
  onCompletedChange: (completed: boolean) => void
  onEditClick: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [strikes, setStrikes] = useState(0)

  return (
    <div className="bg-white rounded-2xl p-3 border shadow-md mb-2">
      <div className="flex items-center w-full">
        {/* Checkmark */}
        <button
          onClick={() => onCompletedChange(!habit.completed)}
          className={`group flex items-center justify-center w-[40px] h-[40px] stroke-[4] rounded-full border transition-all duration-300 
            ${habit.completed ? "border text-orange-500" : "border text-gray-100"}`}
        >
          <Check
            className={`w-10 h-10 transition-transform duration-300 ${
              habit.completed ? "scale-100" : "scale-50 text-gray-100 group-hover:scale-90"
            }`}
          />
        </button>

        {/* Content */}
        <div className="flex-grow mx-4">
          <span
            className={`text-title-card transition-all duration-300 ${
              habit.completed ? "text-gray-300" : "text-gray-800"
            }`}
          >
            {habit.title}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onEditClick} className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8">
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </Button>

          {/* Strike Counter */}
          <div className="relative aspect-square w-10 cursor-pointer" onClick={() => setStrikes((prev) => prev + 1)}>
            <div className="flex items-center justify-center">
              <span className="text-lg font-bold text-orange-main">🔥{strikes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Separator className="my-3" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Due Date</span>
                <span className="font-medium">Tomorrow, 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Priority</span>
                <Badge variant="outline" className="bg-orange-50 text-orange-600">
                  High
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium">In Progress</span>
              </div>
              <p className="text-gray-600">
                Review the latest design changes for the dashboard interface. Prepare feedback and suggestions for
                improvement.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Challenge Card Component
function ChallengeCard({
  challenge,
  onStartChallenge,
  duration,
  setDuration,
  habitPercentage,
  setHabitPercentage,
  totalHabits,
  isExpanded,
  setIsExpanded,
}: {
  challenge: Challenge | null
  onStartChallenge: () => void
  duration: number
  setDuration: (value: number) => void
  habitPercentage: number
  setHabitPercentage: (value: number) => void
  totalHabits: number
  isExpanded: boolean
  setIsExpanded: (value: boolean) => void
}) {
  const formatDuration = (days: number) => {
    const weeks = Math.floor(days / 7)
    if (weeks === 1) return "1 week"
    if (weeks < 4) return `${weeks} weeks`
    const months = Math.floor(weeks / 4)
    return `${months} ${months === 1 ? "month" : "months"}`
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <h3 className="text-lg font-semibold text-orange-main">
            {challenge ? "Current Challenge" : "Start a Challenge"}
          </h3>
          <ChevronRight
            className={`h-5 w-5 text-orange-main transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
          />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              {challenge ? (
                <div className="space-y-2">
                  <p>Duration: {formatDuration(challenge.duration)}</p>
                  <p>Progress: {challenge.progress}%</p>
                  <p>
                    Minimum daily habits: {challenge.minimumHabits} out of {challenge.totalHabits}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                    <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Duration:</Label>
                      <span className="font-medium">{formatDuration(duration)}</span>
                    </div>
                    <CustomSlider
                      min={MIN_WEEKS * WEEK_IN_DAYS}
                      max={MAX_WEEKS * WEEK_IN_DAYS}
                      step={WEEK_IN_DAYS}
                      value={[duration]}
                      onValueChange={(value) => setDuration(value[0])}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Minimum daily habits:</Label>
                      <span className="font-medium">{habitPercentage}%</span>
                    </div>
                    <CustomSlider
                      min={20}
                      max={100}
                      step={10}
                      value={[habitPercentage]}
                      onValueChange={(value) => setHabitPercentage(value[0])}
                    />
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-gray-500 mb-4">
                      You'll need to complete at least {Math.ceil((habitPercentage / 100) * totalHabits)} out of{" "}
                      {totalHabits} habits each day for {formatDuration(duration)}.
                    </p>

                    <Button onClick={onStartChallenge} className="w-full">
                      Start Challenge
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

