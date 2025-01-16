import { z } from "zod"

const createBranchSchema = z.object({
  name: z.string().min(3, {
    message: "Branch name must be at least 3 characters",
  }),
  address: z.string().min(3, {
    message: "Branch address must be at least 3 characters",
  }),
})

export { createBranchSchema }
