// // components/widegets-grid/habits/HabitCard.tsx
// "use client"

// import { useState } from "react"
// import { ChevronDown, Check, Pin, AlarmClock, Repeat, Settings, Calendar, FileText } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Habit } from "./HabitsData"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"

// export function HabitCard({ 
//   habit, 
//   onToggleCompleted, 
//   onEditClick 
// }: { 
//   habit: Habit
//   onToggleCompleted: () => void
//   onEditClick: () => void 
// }) {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <Card className="mb-2 shadow-sm hover:shadow-md transition-all duration-200">
//       <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
//         <CardContent className="p-2.5">
//           <div className="flex items-stretch w-full gap-2">
//             {/* Col 1: Checkmark */}
//             <div className="border-2 border-blue-300 flex-none w-10 h-10 flex items-center justify-center">
//               <Button
//                 onClick={onToggleCompleted}
//                 className={cn(
//                   "group flex items-center justify-center w-full h-full rounded-full border-2 p-0 transition-all duration-300",
//                   habit.completed 
//                     ? "border-orange-500 text-orange-500 bg-orange-50" 
//                     : "border-gray-200 text-gray-200 hover:border-gray-300 hover:text-gray-300"
//                 )}
//                 variant="ghost"
//                 aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
//               >
//                 <Check
//                   className={cn(
//                     "w-5 h-5 transition-transform duration-300",
//                     habit.completed ? "scale-100" : "scale-75 group-hover:scale-90"
//                   )}
//                 />
//               </Button>
//             </div>

//             {/* Col 2: Title and Icons */}
//             <div className="flex-grow flex flex-col min-w-0 overflow-hidden border-2 border-green-300">
//               {/* Row 1: Title */}
//               <div className="border-2 border-red-300 flex-grow flex items-center">
//                 <h3 
//                   className={cn(
//                     "text-sm font-medium break-words transition-colors duration-300",
//                     habit.completed ? "text-gray-400" : "text-gray-800"
//                   )}
//                 >
//                   {habit.title}
//                 </h3>
//               </div>
              
//               {/* Row 2: Icons */}
//               <div className="flex items-center gap-1 border-2 border-purple-300 whitespace-nowrap">
//                 <Pin className={cn("h-3.5 w-3.5", habit.pinned ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
//                 <AlarmClock className={cn("h-3.5 w-3.5", habit.hasAlarm ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
//                 <Repeat className={cn("h-3.5 w-3.5", habit.repeating && (!habit.days || habit.days.length === 0) ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
//                 <Calendar className={cn("h-3.5 w-3.5", habit.days && habit.days.length > 0 ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
//                 <FileText className={cn("h-3.5 w-3.5", habit.notes ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
//                 {habit.time && habit.hasAlarm && (
//                   <span className="text-xs text-gray-500">{habit.time}</span>
//                 )}
//               </div>
//             </div>

//             {/* Col 3: Controls */}
//             <div className="flex items-center gap-1 border-2 border-yellow-300">
//               <CollapsibleTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
//                   aria-label="Toggle details"
//                 >
//                   <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
//                 </Button>
//               </CollapsibleTrigger>

//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onEditClick}
//                 className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
//                 aria-label="Edit habit settings"
//               >
//                 <Settings className="h-4 w-4" />
//               </Button>

//               <div className="flex items-center">
//                 <span className={cn(
//                   "text-sm font-bold",
//                   (habit.streak || 0) >= 30 ? "text-red-500" : 
//                   (habit.streak || 0) >= 15 ? "text-orange-500" : 
//                   (habit.streak || 0) >= 7 ? "text-amber-500" : "text-gray-400"
//                 )}>
//                   {habit.streak || 0}
//                 </span>
//                 <span className="ml-0.5 text-sm">🔥</span>
//               </div>
//             </div>
//           </div>

//           <CollapsibleContent className="space-y-2 px-1 pt-2 border-t border-gray-100 mt-2">
//             {habit.hasAlarm && (
//               <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
//                 <span className="text-xs font-medium">Reminder Time</span>
//                 <span className="text-xs bg-gray-50 px-2 py-1 rounded-full">
//                   {habit.time || "Not set"}
//                 </span>
//               </div>
//             )}
            
//             {habit.repeating && (
//               <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
//                 <span className="text-xs font-medium">Repeats On</span>
//                 <span className="text-xs bg-gray-50 px-2 py-1 rounded-full overflow-hidden text-ellipsis max-w-full sm:max-w-[70%]">
//                   {habit.days && habit.days.length > 0 ? habit.days.join(", ") : "Every day"}
//                 </span>
//               </div>
//             )}
            
//             {habit.notes && (
//               <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
//                 <span className="text-xs font-medium">Notes</span>
//                 <span className="text-xs bg-gray-50 px-2 py-1 rounded-full overflow-hidden text-ellipsis max-w-full sm:max-w-[70%]">
//                   {habit.notes}
//                 </span>
//               </div>
//             )}
            
//             <div className="flex flex-wrap items-center justify-between text-gray-600 gap-2">
//               <span className="text-xs font-medium">Current Streak</span>
//               <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
//                 {habit.streak || 0} days
//               </span>
//             </div>
//           </CollapsibleContent>

//         </CardContent>
//       </Collapsible>
//     </Card>
//   )
// }

// components/widegets-grid/habits/HabitCard.tsx
"use client"

import { useState } from "react"
import { ChevronDown, Check, Pin, AlarmClock, Repeat, Settings, Calendar, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Habit } from "./HabitsData"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function HabitCard({ 
  habit, 
  onToggleCompleted, 
  onEditClick 
}: { 
  habit: Habit
  onToggleCompleted: () => void
  onEditClick: () => void 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-2 shadow-sm hover:shadow-md transition-all duration-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CardContent className="p-2.5">
          <div className="flex items-stretch w-full gap-2">
            {/* Col 1: Checkmark */}
            <div className="flex-none w-10 h-10 flex items-center justify-center">
              <Button
                onClick={onToggleCompleted}
                className={cn(
                  "group flex items-center justify-center w-full h-full rounded-full border-2 p-0 transition-all duration-300",
                  habit.completed 
                    ? "border-orange-500 text-orange-500 bg-orange-50" 
                    : "border-gray-200 text-gray-200 hover:border-gray-300 hover:text-gray-300"
                )}
                variant="ghost"
                aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    habit.completed ? "scale-100" : "scale-75 group-hover:scale-90"
                  )}
                />
              </Button>
            </div>

            {/* Col 2: Title and Icons */}
            <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
              {/* Row 1: Title */}
              <div className="flex-grow flex items-center">
                <h3 
                  className={cn(
                    "text-sm font-medium break-words transition-colors duration-300",
                    habit.completed ? "text-gray-400" : "text-gray-800"
                  )}
                >
                  {habit.title}
                </h3>
              </div>
              
              {/* Row 2: Icons */}
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Pin className={cn("h-3.5 w-3.5", habit.pinned ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
                <AlarmClock className={cn("h-3.5 w-3.5", habit.hasAlarm ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
                <Repeat className={cn("h-3.5 w-3.5", habit.repeating && (!habit.days || habit.days.length === 0) ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
                <Calendar className={cn("h-3.5 w-3.5", habit.days && habit.days.length > 0 ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
                <FileText className={cn("h-3.5 w-3.5", habit.notes ? "text-orange-500" : "text-gray-300")} aria-hidden="true" />
                {habit.time && habit.hasAlarm && (
                  <span className="text-xs text-gray-500">{habit.time}</span>
                )}
              </div>
            </div>

            {/* Col 3: Controls */}
            <div className="flex items-center gap-1">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
                  aria-label="Toggle details"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>

              <Button
                variant="ghost"
                size="sm"
                onClick={onEditClick}
                className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
                aria-label="Edit habit settings"
              >
                <Settings className="h-4 w-4" />
              </Button>

              <div className="flex items-center">
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
            </div>
          </div>

          {/* Collapsible Content */}
          <CollapsibleContent className="space-y-2 px-1 pt-2 border-t border-gray-100 mt-2">
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
          </CollapsibleContent>

        </CardContent>
      </Collapsible>
    </Card>
  )
}