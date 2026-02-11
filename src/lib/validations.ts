import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().refine(
    (val) => !val || /^\+?[\d\s\-().]{7,20}$/.test(val),
    { message: "Invalid phone number" }
  ),
  company: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(20),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
