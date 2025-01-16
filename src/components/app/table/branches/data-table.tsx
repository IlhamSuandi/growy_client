import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import {
  FieldValues,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form"
import BranchDialog from "@/components/app/dialog/BranchDialogForm"
import BranchDropdown from "@/components/app/dropdown/BranchDropdown"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  form: UseFormReturn<FieldValues, any, undefined>
  formActions: UseFieldArrayReturn<FieldValues, "branches", "id">
}

export function BranchDataTable<TData, TValue>({
  form,
  formActions,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    defaultColumn: {
      maxSize: 200,
    },
    state: {
      pagination,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      style={{
                        minWidth: header.getSize(),
                      }}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      style={{
                        minWidth: cell.column.getSize(),
                        maxWidth: table._getDefaultColumnDef().maxSize
                      }}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {row.original.name !== "pusat" ? (
                    <TableCell className="w-8">
                      <BranchDropdown row={row} formActions={formActions} form={form} />
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No Branches.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <BranchDialog
          form={form}
          formActions={formActions}
        />
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
          {table.getPageCount() > 1 ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
