// components/widegets-grid/habits/ChallengeCard.tsx

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"
import { CustomSlider } from "@/components/custom-components/custom-slider"
import { motion, AnimatePresence } from "framer-motion"
import { Challenge } from "./HabitsData"

// Constants
const WEEK_IN_DAYS = 7
const MIN_WEEKS = 1
const MAX_WEEKS = 12

export function ChallengeCard({ 
  challenge, 
  setChallenge, 
  totalHabits, 
  isExpanded, 
  setIsExpanded 
}: { 
  challenge: Challenge | null; 
  setChallenge: (challenge: Challenge) => void; 
  totalHabits: number; 
  isExpanded: boolean; 
  setIsExpanded: (isExpanded: boolean) => void 
}) {
  const [duration, setDuration] = useState(WEEK_IN_DAYS)
  const [habitPercentage, setHabitPercentage] = useState(60)

  const formatDuration = (days: number) => {
    const weeks = Math.floor(days / 7)
    if (weeks === 1) return "1 week"
    if (weeks < 4) return `${weeks} weeks`
    const months = Math.floor(weeks / 4)
    return `${months} ${months === 1 ? "month" : "months"}`
  }

  const handleStartChallenge = () => {
    const newChallenge = {
      duration,
      minimumHabits: Math.ceil((habitPercentage / 100) * totalHabits),
      totalHabits,
      startDate: new Date(),
      progress: 0,
    }
    setChallenge(newChallenge)
    setIsExpanded(false)
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
                    <div 
                      className="bg-orange-600 h-2.5 rounded-full" 
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
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

                    <Button onClick={handleStartChallenge} className="w-full">
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
