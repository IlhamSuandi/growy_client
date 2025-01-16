import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ProgressItem {
  label: string
}

interface ProgressIndicatorsProps {
  steps: ProgressItem[]
  currentStepIndex?: number
  onStepChange?: (stepIndex: number) => void
  disabled?: boolean
}

export interface ProgressIndicatorsRef {
  nextStep: () => void
  previousStep: () => void
}

export default function ProgressIndicators({
  steps,
  currentStepIndex = 0,
  onStepChange,
  disabled = false,
}: ProgressIndicatorsProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(currentStepIndex)

  // Sync internal state with parent prop
  useEffect(() => {
    setCurrentIndex(currentStepIndex)
  }, [currentStepIndex])

  // Handle step change and notify parent
  const handleStepClick = (index: number) => {
    setCurrentIndex(index)
    onStepChange?.(index)
  }

  return (
    <div className="w-full max-w-2xl">
      <div className={cn(
        "w-full h-28 px-5 py-2 justify-between flex items-start relative z-10 overflow-x-hidden",
      )}>
        {steps.map((item, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isUpcoming = index > currentIndex

          return (
            <div
              key={index}
              className={cn(
                "relative w-full flex justify-center items-center",
                index !== steps.length - 1 && "after:content-[''] after:absolute after:h-1 after:w-full after:rounded-full after:inset-0 after:-z-10 after:top-1/2 after:left-0 after:translate-x-1/2 after:-translate-y-1/2 after:bg-[#ec8d00]",
                isCurrent && "after:bg-gray-300",
                isUpcoming && "after:bg-gray-300"
              )}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => handleStepClick(index)}
                className={cn(
                  "h-8 aspect-square rounded-full text-center flex justify-center items-center relative transition-all duration-300 ease-linear",
                  isCurrent &&
                  "ring-4 ring-[#ec8d00] bg-white after:!bg-gray-300",
                  isCompleted && "ring-4 ring-[#ec8d00] bg-[#ec8d00]",
                  isUpcoming &&
                  "ring-4 ring-gray-300 bg-white"
                )}
              >
                <p className={cn(
                  "text-gray-300 transition-all duration-300 ease-linear",
                  isCurrent && "text-[#ec8d00]",
                  isCompleted && "text-white",
                  isUpcoming && "text-gray-300"
                )}>{index + 1}</p>

                <TooltipProvider key={item.label}>
                  <Tooltip>
                    <TooltipTrigger
                      asChild
                      className={cn(
                        "absolute -bottom-10 line-clamp-2 text-center text-xs text-gray-400 transition-colors duration-300 ease-linear",
                        isCompleted && "text-[#ec8d00]",
                        isCurrent && "text-[#ec8d00]",
                        isUpcoming && "text-gray-400"
                      )}>
                      <p>{item.label}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

