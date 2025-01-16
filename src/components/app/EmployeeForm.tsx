import { useFormContext, useFieldArray } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { Alert } from "@/components/app/Alert"

export default function EmployeeForm() {
  const form = useFormContext()
  const formActions = useFieldArray({
    name: "employees",
    control: form.control,
  })

  const branches = form.getValues("branches")
  const employees = form.getValues("employees")

  useEffect(() => {
    if (branches.length !== 0) {
      const mainBranch = branches.find((branch: { name: string }) => {
        return branch.name === "pusat"
      })

      form.setValue("employee.branch_name", mainBranch.name)
    }
  }, [branches, employees, form])

  return (
    <div>
      <FormField
        control={form.control}
        name="employee.branch_name"
        defaultValue={branches[0]?.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel
              className="text-xs md:text-sm"
              htmlFor="employee.branch_name"
            >
              Select Branch
            </FormLabel>
            <FormControl>
              <Select
                value={field.value || branches[0]?.name}
                onValueChange={(value) => {
                  return field.onChange(value)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup defaultValue={branches[0]?.name}>
                    <SelectLabel>Branches</SelectLabel>
                    {branches.map((branch: { name: string }) => (
                      <SelectItem
                        key={branch.name}
                        value={branch.name}
                      >
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employee.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel
              className="text-xs md:text-sm"
              htmlFor="employee.email"
            >
              Invite Users
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="ex: johndoe@gmail.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employee.position"
        render={({ field }) => (
          <FormItem>
            <FormLabel
              className="text-xs md:text-sm"
              htmlFor="employee.email"
            >
              Position
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="ex: Manager"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          const employee = form.getValues("employee")

          if (employee.email && !employee.branch_name) {
            form.setError("employee.branch_name", {
              type: "manual",
              message: "Branch is required",
            })
            return
          }

          if (!employee.email) {
            form.setError("employee.email", {
              type: "manual",
              message: "Employee email is required",
            })
            return
          }

          if (!/^\S+@\S+\.\S+$/.test(employee.email)) {
            form.setError("employee.email", {
              type: "manual",
              message: "Invalid email address.",
            })
            return
          }

          const isDuplicate = employees.some(
            (existingBranch: { email: string }) =>
              existingBranch.email === employee.email
          )

          if (isDuplicate) {
            form.setError("employee.email", {
              type: "manual",
              message: "employee name already exists",
            })
            return
          }

          const companyName = form.getValues("company.name")
          employee.company_name = companyName

          formActions.append(employee)
          Alert({
            title: "Invite Sent",
            icon: "success",
            timer: 2000,
          })
        }}
      >
        Send Invite
      </Button>
    </div >
  )
}

