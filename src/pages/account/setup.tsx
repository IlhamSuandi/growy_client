import ProgressIndicators from "@/components/app/ProgressIndicators"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import CompanyForm from "@/components/app/CompanyForm"
import BranchForm from "@/components/app/BranchForm"
import { useLogout } from "@/hooks/auth/useLogout"
import EmployeeForm from "@/components/app/EmployeeForm"
import { createCompanySchema } from "@/schemas/company"
import { createBranchSchema } from "@/schemas/branch"
import { createEmployeeSchema } from "@/schemas/employee"

const formSchema = z.object({
  company: createCompanySchema,
  branches: z.array(
    createBranchSchema
  ),
  employees: z.array(
    createEmployeeSchema
  )
})

const steps = [
  { label: "Create Company", name: "company", component: CompanyForm },
  { label: "Add Branch", name: "branch", component: BranchForm },
  { label: "Invite Employees", name: "employees", component: EmployeeForm },
]

export default function Setup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: {
        name: "",
        address: "",
        email: "",
        checkInTime: undefined,
        checkOutTime: undefined,
        workingHours: 0,
        useCheckout: true,
      },
      branches: [],
      employees: [],
    },
    mode: "onChange"
  })

  const [currentStep, setCurrentStep] = useState(0)

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const onError = (errors: typeof form.formState.errors) => {
    console.log(errors)

    // Helper function to find the first error field in a nested object
    const getFirstErrorField = (errorObj: any, path: string[] = []): string | undefined => {
      for (const key in errorObj) {
        if (errorObj[key]?.message) {
          // Found a field with an error
          return [...path, key].join(".")
        } else if (typeof errorObj[key] === "object") {
          // Recurse into nested objects
          const nestedField = getFirstErrorField(errorObj[key], [...path, key])
          if (nestedField) return nestedField
        }
      }
    }

    // Get the first error field
    const firstErrorField = getFirstErrorField(errors)

    if (firstErrorField) {
      if (firstErrorField.includes("company")) {
        setCurrentStep(0)
      } else if (firstErrorField.includes("branch")) {
        setCurrentStep(1)
      }
      // Focus the first error field
      form.setFocus(firstErrorField as any)
    }
  }

  const { mutate: logout } = useLogout()

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl min-h-screen flex flex-col px-5 sm:px-20 py-5 pb-10">
        <div className="w-full sticky top-0 bg-white z-50 bg-opacity-70 backdrop-filter backdrop-blur-sm backdrop-saturate-150">
          <h1 className="text-center text-lg font-semibold">Setup Your Account</h1>
          {/* Progress Indicators */}
          <div className="w-full flex justify-center items-center">
            <ProgressIndicators
              steps={steps}
              currentStepIndex={currentStep}
              onStepChange={(stepIndex) => setCurrentStep(stepIndex)}
              disabled={!form.formState.isValid}
            />
          </div>
        </div>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="w-full flex flex-col justify-between flex-grow space-y-8 overflow-x-hidden transition-all duration-300 ease-linear"
          >
            <div className="w-full flex">
              {steps.map(({ component: Component }, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-full flex-shrink-0 px-4",
                    currentStep !== index && "hidden"
                  )}
                >
                  <Component />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="w-full z-50 flex justify-between gap-4 mt-4">
              <Button
                className="w-full bg-[#405059] text-white"
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button
                  className="w-full bg-[#405059] text-white"
                  type="button"
                  disabled={!form.formState.isValid}
                  onClick={(event) => {
                    event.preventDefault() // Prevents accidental form submission
                    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-green-500 text-white"
                >
                  Submit
                </Button>
              )}
              <Button
                className="w-full bg-[#405059] text-white"
                type="button"
                onClick={() => logout()}
              >
                logout
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
