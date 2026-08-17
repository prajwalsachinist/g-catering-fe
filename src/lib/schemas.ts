import { z } from "zod";

import { eventTypes } from "@/data/categories";

const eventSlugs = eventTypes.map((event) => event.slug) as [
  string,
  ...string[],
];

/** Today at midnight, so "today" is a valid event date but yesterday is not. */
function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name")
    .max(80, "That name is a little too long"),

  // Accepts the ways people actually type an Indian mobile number:
  // 9822012345, 09822012345, +91 98220 12345, 91-98220-12345.
  phone: z
    .string()
    .trim()
    .min(1, "We need a phone number to call you back")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      const local = digits.replace(/^(0|91)/, "");
      return local.length === 10 && /^[6-9]/.test(local);
    }, "Enter a valid 10-digit Indian mobile number"),

  // Optional on purpose: most catering enquiries in Pune arrive by phone,
  // and forcing an email address costs more enquiries than it gains.
  email: z
    .union([z.literal(""), z.string().trim().email("That email looks off")])
    .optional(),

  eventType: z.enum(eventSlugs, {
    errorMap: () => ({ message: "Choose the kind of event" }),
  }),

  eventDate: z
    .string()
    .min(1, "When is the event?")
    .refine((value) => !Number.isNaN(Date.parse(value)), "That date is not valid")
    .refine(
      (value) => new Date(value) >= startOfToday(),
      "Please pick today or a future date",
    ),

  guestCount: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .int("Whole guests only")
    .min(10, "We cater for 10 guests and up")
    .max(5000, "For over 5,000 guests, please call us directly"),

  city: z
    .string()
    .trim()
    .min(2, "Which city or area?")
    .max(60, "That is a long place name"),

  message: z
    .string()
    .trim()
    .max(1000, "Please keep it under 1,000 characters")
    .optional(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
