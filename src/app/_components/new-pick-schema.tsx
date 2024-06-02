import { z } from "zod";

export const schema = z.object({
  name: z.string().trim().min(1, {
    message: "The name of the product is required.",
  }),
  tldrDescription: z.string().trim().min(1, {
    message: "A short description of the product is required.",
  })
});