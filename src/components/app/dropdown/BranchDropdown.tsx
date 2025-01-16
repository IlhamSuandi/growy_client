import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, SettingsIcon, TrashIcon } from "lucide-react"
import { UseFormReturn, FieldValues, UseFieldArrayReturn } from "react-hook-form"
import { Row } from "@tanstack/react-table"
import BranchDialog from "@/components/app/dialog/BranchDialogForm"
import { Trigger } from "@radix-ui/react-dialog"

interface BranchDropdownProps<TData> {
  form: UseFormReturn<FieldValues, any, undefined>;
  formActions: UseFieldArrayReturn<FieldValues, "branches", "id">;
  row: Row<TData>
}
export default function BranchDropdown({ form, formActions, row }: BranchDropdownProps<any>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => formActions.remove(row.index)}
          className="text-red-500"
        >
          <TrashIcon className="w-4 h-4" />
          Delete Branch
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <BranchDialog
          form={form}
          formActions={formActions}
          defaultBranch={row.original}
          dialogActions="edit"
          Trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <SettingsIcon className="w-4 h-4" />
              Edit Branch
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

