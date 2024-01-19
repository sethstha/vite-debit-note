import * as z from "zod";

export const debitNodeSchema = z.object({
  supplier: z.string().min(2).max(50),
  date: z.date({
    required_error: "Date is required",
  }),
  reference: z.string().min(2),
  note: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string(),
      batch: z.string(),
      qty: z.string(),
      rate: z.string(),
      discount: z.string(),
      tax: z.string(),
      sku: z.string(),
    })
  ),
});

export type DebitNode = z.infer<typeof debitNodeSchema>;
