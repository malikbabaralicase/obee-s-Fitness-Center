import { z } from "zod";

/**
 * Shared contact-form schema — imported by BOTH the client form
 * (react-hook-form resolver) and the server route (re-validation).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is a little too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "That phone number is too long.")
    .regex(/^[0-9+()\-\s]+$/, "Only digits and + ( ) - are allowed."),
  plan: z.enum(["monthly", "quarterly", "yearly", "not-sure"], {
    errorMap: () => ({ message: "Please choose a plan." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters).")
    .max(1000, "Please keep it under 1000 characters."),
  // Honeypot — must stay empty. Bots fill it; humans never see it.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const PLAN_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
  { value: "not-sure", label: "Not sure yet" },
] as const;
