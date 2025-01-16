import { z } from "zod"

const createCompanySchema = z.object({
  name: z.string().min(3, {
    message: "Company name must be at least 3 characters",
  }),
  address: z.string().min(3, {
    message: "Company address must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  checkInTime: z
    .date()
    .or(z.string().optional())
    .refine((value) => value instanceof Date || value !== undefined, {
      message: "Check-in time is required",
    }),
  checkOutTime: z.date().optional(),
  workingHours: z.number().optional(),
  useCheckout: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.useCheckout && !data.checkOutTime) {
    ctx.addIssue({
      code: "custom",
      message: "Checkout time is required",
      path: ["checkOutTime"],
    })
  }

  if (!data.useCheckout && !data.workingHours) {
    ctx.addIssue({
      code: "custom",
      message: "Working hours is required",
      path: ["workingHours"],
    })
  }
})

export { createCompanySchema }
