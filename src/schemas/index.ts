import * as z from "zod";

export const DebitNoteSchema = z.object({
  supplier: z.string().min(2, {
    message: "Please select provider name",
  }),
  date: z.date({
    required_error: "You must select the date",
  }),
  reference: z.string().min(2, { message: "Please provide reference number" }),
  note: z.string().optional(),
  terms: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string(),
      batch: z.string(),
      description: z.string().optional(),
      qty: z.string(),
      rate: z.string(),
      discount: z.string(),
      tax: z.string(),
      sku: z.string(),
    })
  ),
});

export type DebitNote = z.infer<typeof DebitNoteSchema>;
