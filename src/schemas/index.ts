import * as z from "zod";

export const debitNodeSchema = z.object({
  supplier: z.string().min(2).max(50),
  date: z.date({
    required_error: "Date is required",
  }),
  reference: z.string().min(2),
});

export type DebitNode = z.infer<typeof debitNodeSchema>;
