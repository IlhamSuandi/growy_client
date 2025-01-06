import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import { Label } from "@radix-ui/react-label"
import { Button } from "../ui/button"
import { DialogHeader, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"

export default function BranchForm() {
  return (
    <div className="w-full h-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">Add Branches</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Branches</DialogTitle>
            <DialogDescription>
              add a new branch to your company. You can add as many branches as you
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Address
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Branch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    // <>
    //   <FormField
    //     control={form.control}
    //     name="branch.name"
    //     render={({ field }) => (
    //       <FormItem>
    //         <FormControl>
    //           <Input
    //             type="text"
    //             placeholder="Branch Name"
    //             {...field}
    //           />
    //         </FormControl>
    //         <FormDescription>ex: Growy</FormDescription>
    //         <FormMessage />
    //       </FormItem>
    //     )}
    //   />
    //   <FormField
    //     control={form.control}
    //     name="branch.address"
    //     render={({ field }) => (
    //       <FormItem>
    //         <FormControl>
    //           <Textarea
    //             placeholder="Branch Address"
    //             {...field}
    //           />
    //         </FormControl>
    //         <FormDescription>ex: 123 main street</FormDescription>
    //         <FormMessage />
    //       </FormItem>
    //     )}
    //   />
    // </>
  )
}
