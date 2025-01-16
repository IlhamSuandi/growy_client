import { Button } from "@/components/ui/button"
import { DialogHeader } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ReactNode, useEffect, useState } from "react"
import { UseFormReturn, FieldValues, UseFieldArrayReturn } from "react-hook-form"

interface BranchDialogPropsBase {
  form: UseFormReturn<FieldValues, any, undefined>;
  formActions: UseFieldArrayReturn<FieldValues, "branches", "id">;
  dialogActions?: "add" | "edit";
  Trigger?: ReactNode
}

interface BranchDialogPropsWithDefaultBranch extends BranchDialogPropsBase {
  dialogActions: "edit"; // This ensures that dialogActions is "edit"
  defaultBranch: { name: string; address: string }; // Make defaultBranch required for "edit"
}

interface BranchDialogPropsWithoutDefaultBranch extends BranchDialogPropsBase {
  dialogActions?: "add"; // If it's "add", defaultBranch is not required
  defaultBranch?: { name: string; address: string }; // Optional for "add"
}

// Union type: If dialogActions is "edit", defaultBranch is required, otherwise it is optional
type BranchDialogProps = BranchDialogPropsWithDefaultBranch | BranchDialogPropsWithoutDefaultBranch;

export default function BranchDialog({ form, formActions, dialogActions = "add", defaultBranch, Trigger }: BranchDialogProps) {
  const [open, setOpen] = useState(false)
  const branches = form.watch("branches")

  if (dialogActions === "edit" && !defaultBranch) {
    throw new Error("defaultBranch is required for 'edit' action")
  }

  useEffect(() => {
    if (defaultBranch) {
      form.setValue("branch.name", defaultBranch.name)
      form.setValue("branch.address", defaultBranch.address)
    }
  }, [defaultBranch, form])

  return (
    <Dialog modal={open} open={open} onOpenChange={(open) => {
      if (open === false) {
        form.setValue("branch", { name: "", address: "" })
        form.clearErrors()
      }
      setOpen(open)
    }}>
      <DialogTrigger asChild>
        {Trigger ?
          (Trigger) :
          <Button size="sm">
            {dialogActions.split("")[0].toUpperCase() + dialogActions.slice(1)} Branch
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Branch</DialogTitle>
          <DialogDescription>
            Add a new branch to your company. Fill in the branch details and save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="branch.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm">
                  Branch Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Branch Name"
                    defaultValue={defaultBranch?.name}
                    onChange={(e) => {
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch Address Field */}
          <FormField
            control={form.control}
            name="branch.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm">
                  Branch Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Branch Address"
                    defaultValue={defaultBranch?.address}
                    onChange={(e) => {
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <DialogFooter> */}
        {dialogActions === "add" ? (
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              const branch = form.getValues("branch")

              if (branch.name === "" || branch.address === "") {
                form.setError("branch.name", {
                  type: "manual",
                  message: "Branch name are required",
                })
                form.setError("branch.address", {
                  type: "manual",
                  message: "Branch address are required",
                })
                return
              }

              const isDuplicate = branches.some(
                (existingBranch: { name: string; address: string }) =>
                  existingBranch.name === branch.name
              )

              if (isDuplicate) {
                form.setError("branch.name", {
                  type: "manual",
                  message: "Branch name already exists",
                })
                return
              }

              formActions.append(branch)
              form.setValue("branch", { name: "", address: "" })
              setOpen(false)
              toast({
                title: "Branch Added",
                description: "Your branch has been added successfully.",
              })
            }}
          >
            Save Branch
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault()
              const branch = form.getValues("branch")

              if (branch.name === "") {
                form.setError("branch.name", {
                  type: "manual",
                  message: "Branch name are required",
                })
                return
              }
              if (branch.address === "") {
                form.setError("branch.address", {
                  type: "manual",
                  message: "Branch address are required",
                })
                return
              }

              const isDuplicate = branches.some(
                (existingBranch: { name: string; address: string }) =>
                  existingBranch.name === branch.name
              )

              if (isDuplicate && defaultBranch?.name !== branch.name) {
                form.setError("branch.name", {
                  type: "manual",
                  message: "Branch name already exists",
                })
                return
              }

              // Check if defaultBranch exists, and if so, find its index
              const branchIndex = branches.findIndex(
                (existingBranch: { name: string; address: string }) =>
                  existingBranch.name === defaultBranch?.name
              )

              // Ensure the branch to be updated exists
              if (branchIndex === -1) {
                toast({
                  title: "Error",
                  description: "Branch to update not found.",
                  variant: "destructive",
                })
                return
              }

              // Replace the branch in the array with the updated one
              formActions.update(branchIndex, branch)
              form.setValue("branch", { name: "", address: "" })
              setOpen(false)
              toast({
                title: "Branch Updated",
                description: "Your branch has been updated successfully.",
              })
            }}
          >
            Save Branch
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}

