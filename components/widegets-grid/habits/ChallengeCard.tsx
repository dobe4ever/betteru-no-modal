import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { CustomSlider } from "@/components/custom-components/custom-slider"
import { Challenge } from "./HabitsData"
import { formatDuration } from "./utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Type for daily progress data points
interface DailyProgress {
  day: number
  date: string
  completed: number
  percentage: number
}

export function ChallengeCard({ totalHabits }: { totalHabits: number }) {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [duration, setDuration] = useState(7) // Default to 7 days
  const [habitPercentage, setHabitPercentage] = useState(60)
  const [progressData, setProgressData] = useState<DailyProgress[]>([])

  // Generate mock progress data when challenge is active
  useEffect(() => {
    if (challenge) {
      const mockData: DailyProgress[] = []
      const startDate = challenge.startDate
      const minimumHabits = challenge.minimumHabits
      
      // Generate data points for each day of the challenge
      for (let i = 0; i < challenge.duration; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(currentDate.getDate() + i)
        
        // For days in the past, generate random completion data
        // For future days, leave as 0
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const isInPast = currentDate < today
        const isToday = currentDate.getTime() === today.getTime()
        
        let completed = 0
        if (isInPast || isToday) {
          // Generate a random number of completed habits
          // with higher probability of meeting the minimum
          const rand = Math.random()
          if (rand > 0.2) {
            completed = Math.floor(Math.random() * (totalHabits - minimumHabits + 1)) + minimumHabits
          } else {
            completed = Math.floor(Math.random() * minimumHabits)
          }
        }
        
        mockData.push({
          day: i + 1,
          date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          completed,
          percentage: Math.round((completed / totalHabits) * 100)
        })
      }
      
      setProgressData(mockData)
      
      // Calculate overall progress percentage
      const completedDays = mockData.filter(day => day.completed >= minimumHabits).length
      const elapsedDays = mockData.filter((_, index) => index < getElapsedDays()).length
      const newProgress = elapsedDays > 0 
        ? Math.round((completedDays / elapsedDays) * 100) 
        : 0
        
      setChallenge(prev => prev ? {...prev, progress: newProgress} : null)
    }
  }, [challenge, totalHabits])

  const getElapsedDays = () => {
    if (!challenge) return 0
    
    const startDate = new Date(challenge.startDate)
    const today = new Date()
    const diffTime = today.getTime() - startDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return Math.min(diffDays + 1, challenge.duration)
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
    setIsOpen(false)
  }

  // Function to render progress chart
  const renderProgressChart = () => {
    if (!progressData.length || !challenge) return null
    
    const chartHeight = 100
    const chartWidth = 280
    const padding = { top: 20, right: 10, bottom: 20, left: 20 }
    const availableWidth = chartWidth - padding.left - padding.right
    const availableHeight = chartHeight - padding.top - padding.bottom
    
    // Calculate positions for data points
    const dataPoints = progressData.map((point, index) => {
      const x = padding.left + (index / (progressData.length - 1)) * availableWidth
      const y = padding.top + availableHeight - (point.percentage / 100) * availableHeight
      return { x, y, ...point }
    })
    
    // Only draw lines between existing data points (not future)
    const elapsedDays = getElapsedDays()
    const elapsedDataPoints = dataPoints.slice(0, elapsedDays)
    
    // Generate the path for the line
    let pathData = ''
    elapsedDataPoints.forEach((point, i) => {
      pathData += i === 0 ? `M${point.x},${point.y}` : ` L${point.x},${point.y}`
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const minimumPercentage = (challenge.minimumHabits / challenge.totalHabits) * 100
    const minimumLineY = padding.top + availableHeight - (minimumPercentage / 100) * availableHeight

    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400 font-medium">Progress over time</span>
          <span className="text-xs text-gray-400 font-medium">
            {elapsedDays} <span className="text-gray-300">of</span> {challenge.duration} <span className="text-gray-300">days</span>
          </span>
        </div>
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Minimum required line */}
          <line 
            x1={padding.left} 
            y1={minimumLineY} 
            x2={padding.left + availableWidth} 
            y2={minimumLineY} 
            stroke="#FDA4AF" 
            strokeWidth={1} 
            strokeDasharray="2,2" 
          />
          <text 
            x={padding.left + availableWidth + 2} 
            y={minimumLineY + 3} 
            fontSize="8" 
            fill="#FDA4AF"
          >
            {minimumPercentage.toFixed(0)}%
          </text>
          
          {/* Progress line */}
          <path 
            d={pathData} 
            fill="none" 
            stroke="#f97316" 
            strokeWidth={2.5} 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {dataPoints.map((point, i) => (
            <g key={i}>
              {i < elapsedDays ? (
                <>
                                      <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r={5} 
                    fill={point.percentage >= minimumPercentage ? "#f97316" : "#fbd38d"} 
                    stroke="white" 
                    strokeWidth={1.5}
                  />
                  {i % Math.ceil(progressData.length / 7) === 0 && (
                    <text 
                      x={point.x} 
                      y={chartHeight - 5} 
                      fontSize="8" 
                      textAnchor="middle" 
                      fill="#6b7280"
                    >
                      {point.date}
                    </text>
                  )}
                </>
              ) : (
                i % Math.ceil(progressData.length / 7) === 0 && (
                  <text 
                    x={point.x} 
                    y={chartHeight - 5} 
                    fontSize="8" 
                    textAnchor="middle" 
                    fill="#9ca3af"
                  >
                    {point.date}
                  </text>
                )
              )}
            </g>
          ))}
        </svg>
      </div>
    )
  }

  return (
    <Card className="m-3 mt-0 shadow-md border-0">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="p-2">
          <div className="flex justify-between items-center">
            <CardTitle >
            <h2 className="ml-2 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl text-orange-500">
              {challenge ? "Current Challenge" : "🔥 Start a Challenge"}
              </h2>
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
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1">Duration</p>
                    <p className="text-lg font-bold">{formatDuration(challenge.duration)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium mb-1">Success Rate</p>
                    <p className="text-2xl font-extrabold text-orange-600">{challenge.progress}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium mb-1">Daily Goal</p>
                    <p className="text-lg font-bold">{challenge.minimumHabits} <span className="text-sm text-gray-500 font-normal">of {challenge.totalHabits}</span></p>
                  </div>
                </div>
                
                {renderProgressChart()}
                
                <div className="mt-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">Overall progress</p>
                  <div className="w-full bg-gray-100 rounded-full h-3 dark:bg-gray-700">
                    <div 
                      className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-in-out" 
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium text-gray-700">Duration:</Label>
                    <span className="font-bold text-base">{formatDuration(duration)}</span>
                  </div>
                  <CustomSlider
                    min={1}
                    max={90}
                    step={1}
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium text-gray-700">Minimum daily habits:</Label>
                    <span className="font-bold text-base text-orange-600">{habitPercentage}%</span>
                  </div>
                  <CustomSlider
                    min={25}
                    max={100}
                    step={25}
                    value={[habitPercentage]}
                    onValueChange={(value) => setHabitPercentage(value[0])}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-4 italic">
                  You'll need to complete at least <span className="font-semibold">{Math.ceil((habitPercentage / 100) * totalHabits)}</span> out of{" "}
                  <span className="font-semibold">{totalHabits}</span> habits each day for <span className="font-semibold">{formatDuration(duration)}</span>.
                </p>
              </div>
            )}
          </CardContent>

          {!challenge && (
            <CardFooter className="p-4 pt-0">
              <Button 
                onClick={handleStartChallenge} 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2"
              >
                Start Challenge
              </Button>
            </CardFooter>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}