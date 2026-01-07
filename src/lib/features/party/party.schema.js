import { z } from 'zod';

export const phoneSchema = z.object({
  name: z.string()
    .min(1, "Name is required for Phone Number")
    .max(30, "Name must be 30 characters or less in Phone Number"),
  number: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be 15 digits or less")
    .regex(/^[0-9+\-\s()]+$/, "Phone number can only contain digits, plus sign, hyphens, spaces, and parentheses")
});

// Main user schema
// Party validation schema (if you need the full party object)
export const partySchema = z.object({
  name: z.string()
    .min(1, "Party name is required")
    .max(100, "Party name must be 100 characters or less"),
  phone: z.array(phoneSchema)
    .optional()
    .default([]),
  note: z.string()
    .optional()
    .default(''),
  isActive: z.boolean()
    .optional()
    .default(true)
});
