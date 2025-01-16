import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, onChange, ...props }, _ref) => {
    const [checked, setChecked] = React.useState(!!props.defaultChecked || !!props.value)

    React.useEffect(() => {
      setChecked(!!props.defaultChecked || !!props.value)
    }, [props.defaultChecked, props.value])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(!checked)
      if (onChange) onChange(e)
    }

    return (
      <>
        <button type="button"
          onClick={() => {
            setChecked(!checked)
            handleChange({ target: { value: !checked } } as any)
          }}
          className="flex justify-around items-center w-full h-10 border rounded-xl hover:ring-2 hover:ring-input"
        >
          <div className={cn(
            "w-full h-full text-sm text-gray-400 rounded-xl flex justify-center items-center transition-all duration-100 ease-linear",
            !checked && "bg-[#ec8d00] text-white"
          )}>
            no
          </div>
          <div className={cn(
            "w-full h-full text-sm text-gray-400 rounded-xl flex justify-center items-center transition-all duration-100 ease-linear",
            checked && "bg-[#ec8d00] text-white"
          )}>
            yes
          </div>
        </button>
        <input className={cn(
          "hidden",
          className
        )} type="checkbox" checked={props.checked} defaultChecked={props.defaultChecked} onChange={handleChange} {...props} />
      </>
    )
  }
)

Switch.displayName = "Switch"

export default Switch
