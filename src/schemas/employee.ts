import { z } from "zod"

const createEmployeeSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  position: z.string().min(3, {
    message: "Position must be at least 3 characters",
  }),
  company_name: z.string().min(3, {
    message: "Company name must be at least 3 characters",
  }),
  branch_name: z.string().min(3, {
    message: "Branch name must be at least 3 characters",
  }),
})


export { createEmployeeSchema }
