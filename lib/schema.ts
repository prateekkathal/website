import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "name must be at least 2 characters")
    .max(80, "that name is a bit long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "email is required")
    .max(160, "that email is too long")
    .email("enter a valid email"),
  message: z
    .string()
    .trim()
    .min(10, "add a little more detail (10+ characters)")
    .max(3000, "keep it under 3000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<keyof ContactInput, string>>;
};
