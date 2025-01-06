import ProgressIndicators from "@/components/app/ProgressIndicators"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { MaterialInput } from "@/components/ui/input"
import { useGetMe } from "@/hooks/auth/useGetMe"
import { useLogout } from "@/hooks/auth/useLogout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form" // Import FormProvider
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters",
  }),
  // email: z.string().email({
  //   message: "Invalid email address",
  // }),
  // checkInTime: z
  //   .string()
  //   .refine((date) => !isNaN(Date.parse(date)), {
  //     message: "Invalid date",
  //   }),
  // checkOutTime: z
  //   .string()
  //   .refine((date) => !isNaN(Date.parse(date)), {
  //     message: "Invalid date",
  //   }),
  // workingHours: z.number().min(1, {
  //   message: "Working hours must be at least 1",
  // }),
  // useCheckIn: z.boolean(),
})

export default function CreateCompany() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      // email: "",
      // checkInTime: new Date().toISOString(), // Convert to string
      // checkOutTime: new Date().toISOString(), // Convert to string
      // workingHours: 8,
      // useCheckIn: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const steps = [
    { label: "Create Company" },
    { label: "Create Branch" },
    { label: "Add Employees" },
  ]

  const { mutate: logout } = useLogout()
  const { mutate: getMe } = useGetMe()

  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div>
      <h1>Create Your Company</h1>
      <div className="w-full flex justify-center item-center">
        <Button onClick={previousStep}>Previous</Button>
        <ProgressIndicators
          steps={steps}
          currentStepIndex={currentStep}
          onStepChange={(stepIndex) => setCurrentStep(stepIndex)}
        />
        <Button onClick={nextStep}>Next</Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <MaterialInput
                    type="text"
                    placeholder="Company Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  ex: Growy
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Button onClick={() => logout()}>Log out</Button>
      <Button onClick={() => getMe()}>get me</Button>

    </div >
  )
}
