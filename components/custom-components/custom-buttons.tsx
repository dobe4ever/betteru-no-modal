// components/ui/custom-components/custom-buttons.tsx

import { Check, X, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface CircleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'confirm' | 'cancel' | 'bot' | 'fire' | 'plus'
}

const CircleButton = ({ variant, className, ...props }: CircleButtonProps) => {
  const variants = {
    confirm: {
      style: "border text-green-500",
      content: <Check className="w-8 h-8 stroke-[3]" />
    },
    cancel: {
      style: "border text-red-500",
      content: <X className="w-8 h-8 stroke-[3]" />
    },
    bot: {
      style: "border text-orange-500",
      content: <Bot className="w-8 h-8 stroke-[3]" />
    },
    fire: {
      style: "border text-orange-500",
      content: <span className="text-2xl">🔥</span>
    },
    plus: {
      style: "border text-orange-500",
      content: <span className="text-2xl">➕</span>
    }
  }

  return (
    <button
      className={cn(
        "flex items-center justify-center h-16 w-16 rounded-full shadow-md bg-white",
        variants[variant].style,
        className
      )}
      {...props}
    >
      {variants[variant].content}
    </button>
  )
}

export { CircleButton }

