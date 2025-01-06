import { Separator } from "@/components/ui/separator"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { CircleHelpIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { z } from "zod"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Switch from "@/components/app/Switch"
import { TimePicker } from "@/components/app/TimePickers"

export default function CompanyForm() {
  const form = useFormContext()

  return (
    <div>
      <h2 className="text-base md:text-lg">Company Information</h2>
      <p className="text-xs md:text-sm">Provide the necessary details to register your company.</p>
      <Separator className="h-0.5 mb-5 mt-2" />
      <div className="flex flex-col gap-5 sm:flex-row items-start justify-center">
        {/* Left side columns */}
        <div className="w-full space-y-4">
          <FormField
            control={form.control}
            name="company.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm" htmlFor="company.name">Company Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="ex: Growy"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm" htmlFor="company.email">Company Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="ex: Growy@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm" htmlFor="company.address">Company Address</FormLabel>
                <FormControl>
                  <Textarea
                    spellCheck={false}
                    placeholder="ex: 123 main street"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full space-y-4">
          <FormField
            control={form.control}
            name="company.checkInTime"
            render={({ field }) => (
              <FormItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button" className="flex items-center gap-1">
                      <FormLabel className="text-xs md:text-sm" htmlFor="company.checkInTime">Checkin Time</FormLabel>
                      <CircleHelpIcon className="w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>The time an employee starts their workday. Required to track attendance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <FormControl>
                  <TimePicker
                    setDate={(date) => field.onChange(date)}
                    label="ex: 09:00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company.useCheckout"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm" htmlFor="company.useCheckout">Use Checkout</FormLabel>
                <FormControl>
                  <Switch
                    defaultChecked={field.value}
                    onChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("company.useCheckout") === true ? (
            <FormField
              control={form.control}
              name="company.checkOutTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm" htmlFor="company.checkOutTime">Checkout Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      setDate={(date) => field.onChange(date)}
                      label="ex: 17:00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="company.workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm" htmlFor="company.workingHours">Working Hours</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ex: 8"
                      value={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value || "0"))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}

