import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

const MaterialTextArea = React.forwardRef<HTMLTextAreaElement, React.InputHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, onFocus, onBlur, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    React.useEffect(() => {
      setHasValue(!!props.defaultValue || !!props.value)
    }, [props.defaultValue, props.value])

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      if (onFocus) onFocus(e) // Call the user-provided handler
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value !== "")
      if (onBlur) onBlur(e) // Call the user-provided handler
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(e.target.value !== "")
      if (onChange) onChange(e) // Call the user-provided handler
    }

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            isFocused || hasValue ? "pt-4" : "",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder=""
          {...props}
        />
        <label
          className={cn(
            "absolute left-3 top-[5px] bg-background px-1 text-sm transition-all duration-200 ease-in-out",
            isFocused || hasValue
              ? "-translate-y-3 scale-100 text-xs text-gray-400 opacity-100 z-10"
              : "opacity-0 -z-10"
          )}
        >
          {props.placeholder}
        </label>
      </div>
    )
  }
)
MaterialTextArea.displayName = "MaterialTextArea"

export { Textarea, MaterialTextArea }
