import * as React from "react"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  date?: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string;
}

export function TimePicker({ date, setDate, label = "Select time" }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)

  const [hour, setHour] = React.useState<number | undefined>(date?.getHours())
  const [minute, setMinute] = React.useState<number | undefined>(date?.getMinutes())
  const [isFocused, setIsFocused] = React.useState(false)

  // Track the previous values for hour and minute
  const prevHourRef = React.useRef(hour)
  const prevMinuteRef = React.useRef(minute)

  // Update date only if the values have changed
  const updateDate = React.useCallback(() => {
    if (hour === undefined || minute === undefined) {
      if (date !== undefined) {
        setDate(undefined) // Only set to undefined if it wasn't already undefined
      }
    } else {
      const newDate = new Date()
      newDate.setHours(hour)
      newDate.setMinutes(minute)

      // Only update if the hour or minute has actually changed
      if (
        prevHourRef.current !== hour ||
        prevMinuteRef.current !== minute
      ) {
        setDate(newDate)
        prevHourRef.current = hour
        prevMinuteRef.current = minute
      }
    }
  }, [hour, minute, setDate, date])

  React.useEffect(() => {
    updateDate()
  }, [hour, minute, updateDate]) // Trigger update when hour or minute change

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHour = e.target.value === "" ? undefined : parseInt(e.target.value, 10)
    if (newHour !== undefined && isNaN(newHour)) return
    setHour(newHour === undefined ? undefined : Math.max(0, Math.min(23, newHour)))
    if (newHour !== undefined && newHour > 2) {
      minuteRef.current?.focus()
    }
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinute = e.target.value === "" ? undefined : parseInt(e.target.value, 10)
    if (newMinute !== undefined && isNaN(newMinute)) return
    setMinute(newMinute === undefined ? undefined : Math.max(0, Math.min(59, newMinute)))
  }

  const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (minute !== undefined && e.key === "Enter") {
      setIsFocused(false)
    }
  }

  return (
    <Popover open={isFocused} onOpenChange={(open) => setIsFocused(open)}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button
            type="button"
            variant={"outline"}
            className={cn(
              "h-9 w-full justify-between text-left font-normal hover:bg-transparent shadow-none bg-transparent",
              !date && "text-gray-400",
              hour !== undefined && minute !== undefined && "text-black"
            )}
          >
            {date
              ? date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
              : hour !== undefined && minute !== undefined
                ? `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
                : label}
            <Clock className="h-4 w-4 opacity-50 absolute right-3 bottom-1/2 translate-y-1/2" />
          </Button>
          <label
            className={cn(
              "absolute left-3 bottom-1/2 translate-y-1/2 text-gray-400 px-1 text-sm transition-all duration-200 ease-in-out -z-10",
              hour !== undefined || minute !== undefined
                ? "hidden"
                : "text-sm text-muted-foreground"
            )}
          >
            {label}
          </label>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-end p-3">
          <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs">
              Hours
            </Label>
            <Input
              id="hours"
              className="w-[64px] text-center"
              value={hour?.toString().padStart(2, "0") ?? ""}
              onChange={handleHourChange}
              ref={hourRef}
              min={0}
              max={23}
            />
          </div>
          <div className="mx-2 text-2xl">:</div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs">
              Minutes
            </Label>
            <Input
              id="minutes"
              className="w-[64px] text-center"
              value={minute?.toString().padStart(2, "0") ?? ""}
              onChange={handleMinuteChange}
              ref={minuteRef}
              min={0}
              max={59}
              onKeyDown={handleMinuteKeyDown}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
