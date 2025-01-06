import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-muted-foreground flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-input focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const MaterialInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, onFocus, onBlur, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    React.useEffect(() => {
      setHasValue(!!props.defaultValue || !!props.value)
    }, [props.defaultValue, props.value])

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (onFocus) onFocus(e) // Call the user-provided handler
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value !== "")
      if (onBlur) onBlur(e) // Call the user-provided handler
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== "")
      if (onChange) onChange(e) // Call the user-provided handler
    }

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
            "absolute left-3 top-1 bg-background px-1 text-sm transition-all duration-200 ease-in-out",
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
MaterialInput.displayName = "MaterialInput"

export { Input, MaterialInput }
