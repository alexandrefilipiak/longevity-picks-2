import { z } from "zod";

export const schema = z.object({
  title: z.string().trim().min(1, {
    message: "The title of the product is required.",
  }),
  tldr_description: z.string().trim().min(1, {
    message: "A short description of the product is required.",
  })
});