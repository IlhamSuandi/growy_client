import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ColumnDef } from "@tanstack/react-table"

export type Branch = {
  name: string
  address: string
}

export const branchCols: ColumnDef<Branch>[] = [
  {
    id: "No",
    header: "No.",
    cell: ({ row }) => (
      <span className="text-gray-500">{row.index + 1}.</span>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Branch Name",
    minSize: 150,
  },
  {
    accessorKey: "address",
    header: "Branch Address",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="flex items-center gap-1">
            <p className="text-xs line-clamp-2 md:text-sm">{row.original.address}</p>
          </TooltipTrigger>
          <TooltipContent className="bg-white">
            <p>{row.original.address}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    ),
    minSize: 100,
  },

]

