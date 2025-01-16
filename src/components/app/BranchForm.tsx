import { useFieldArray, useFormContext } from "react-hook-form"
import { branchCols } from "./table/branches/columns"
import { BranchDataTable } from "./table/branches/data-table"
import { useEffect } from "react"

export default function BranchForm() {
  const form = useFormContext()
  const formActions = useFieldArray({
    name: "branches",
    control: form.control,
  })

  useEffect(() => {
    const companyAddress = form.getValues("company.address")
    const branches = form.getValues("branches")

    // Find if the "pusat" branch exists
    const existingBranchIndex = branches.findIndex(
      (branch: { address: string, name: string }) => branch.name === "pusat"
    )

    // Handle address change
    if (companyAddress) {
      // If the branch doesn't exist, append it
      if (existingBranchIndex === -1) {
        formActions.insert(0, {
          name: "pusat",
          address: companyAddress,
        })
      } else {
        // If the branch exists and the address has changed, update it
        if (branches[existingBranchIndex].address !== companyAddress) {
          formActions.update(existingBranchIndex, {
            name: "pusat",
            address: companyAddress,
          })
        }
      }
    } else {
      // If address is deleted, remove the "pusat" branch
      if (existingBranchIndex !== -1) {
        formActions.remove(existingBranchIndex)
      }
    }
  }, [form, formActions])

  const branches = form.watch("branches")

  return (
    <div>
      <BranchDataTable
        form={form}
        formActions={formActions}
        columns={branchCols}
        data={branches}
      />
    </div>
  )
}
