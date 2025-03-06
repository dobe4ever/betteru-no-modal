import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { CustomSlider } from "@/components/custom-components/custom-slider"
import { Challenge } from "./HabitsData"
import { WEEK_IN_DAYS, MIN_WEEKS, MAX_WEEKS, formatDuration } from "./utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function ChallengeCard({ totalHabits }: { totalHabits: number }) {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [duration, setDuration] = useState(WEEK_IN_DAYS)
  const [habitPercentage, setHabitPercentage] = useState(60)

  const handleStartChallenge = () => {
    const newChallenge = {
      duration,
      minimumHabits: Math.ceil((habitPercentage / 100) * totalHabits),
      totalHabits,
      startDate: new Date(),
      progress: 0,
    }
    setChallenge(newChallenge)
    setIsOpen(false)
  }

  return (
    <Card className="m-3 mt-0">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="p-2">
          <div className="flex justify-between items-center">
            <CardTitle className="ml-2 text-lg font-semibold text-orange-main">
              {challenge ? "Current Challenge" : "Start a Challenge"}
            </CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className={`h-5 w-5 text-orange-main transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent>
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
              <div className="space-y-4">
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

                <p className="text-sm text-gray-500">
                  You'll need to complete at least {Math.ceil((habitPercentage / 100) * totalHabits)} out of{" "}
                  {totalHabits} habits each day for {formatDuration(duration)}.
                </p>
              </div>
            )}
          </CardContent>

          {!challenge && (
            <CardFooter className="p-4 pt-0">
              <Button onClick={handleStartChallenge} className="w-full">
                Start Challenge
              </Button>
            </CardFooter>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}