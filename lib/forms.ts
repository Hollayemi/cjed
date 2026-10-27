import { z } from "zod";
import type { NextRequest } from "next/server";
import { ORGANISATION_TYPES, VOLUNTEER_LEVELS } from "./form-options";

const required = (label: string, max: number) =>
  z.string().trim().min(2, `Enter ${label}`).max(max, `Keep this under ${max} characters`);

const email = z
  .string()
  .trim()
  .toLowerCase()
  .max(200)
  .pipe(z.email("Enter a valid email address"));

const phone = z
  .string()
  .trim()
  .max(30, "Enter a valid phone number")
  .regex(/^[+\d\s()-]*$/, "Enter a valid phone number")
  .default("");

const message = z
  .string()
  .trim()
  .min(10, "Please write a little more (at least 10 characters)")
  .max(5000, "Keep your message under 5,000 characters");

// A hidden field real visitors never fill in. Bots do, and get a quiet "success" that sends nothing.
const honeypot = z.string().max(500).default("");

export const contactSchema = z.object({
  name: required("your full name", 120),
  email,
  phone,
  enquiryType: z.string().trim().max(80).default(""),
  message,
  website: honeypot,
});

export const partnerSchema = z.object({
  organisation: required("your organisation's name", 160),
  contactPerson: required("a contact person", 120),
  email,
  phone,
  organisationType: z.enum(ORGANISATION_TYPES, "Choose your organisation type"),
  message,
  website: honeypot,
});

export const volunteerSchema = z.object({
  fullName: required("your full name", 120),
  institution: required("your school or institution", 160),
  level: z.enum(VOLUNTEER_LEVELS, "Choose your level"),
  website: honeypot,
});

export function parseForm<S extends z.ZodType>(schema: S, raw: unknown) {
  const result = schema.safeParse(raw);
  if (result.success) return { data: result.data as z.output<S> };
  const fields: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fields[key] ??= issue.message;
  }
  return { fields };
}

export const clientIp = (req: NextRequest) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
