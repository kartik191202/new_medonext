import { z } from "zod";
import {
  BLOOD_GROUPS,
  GENDERS,
  GOVT_ID_TYPES,
  MARITAL_STATUS,
  PAYMENT_MODES,
  PREFIXES,
  REGISTRATION_CATEGORIES,
  RELATIONSHIPS,
  TRIAGE_LEVELS,
  VISIT_TYPES,
} from "@/lib/data/hospitalData";

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const PINCODE_REGEX = /^\d{6}$/;
const AADHAAR_REGEX = /^\d{4}\s?\d{4}\s?\d{4}$/;
const PASSPORT_REGEX = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return NaN;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function calculateDobFromAge(age: number): string {
  const today = new Date();
  const birthDate = new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
  const year = birthDate.getFullYear();
  const month = String(birthDate.getMonth() + 1).padStart(2, "0");
  const day = String(birthDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const patientRegistrationSchema = z
  .object({
    // Section 1 — Patient Identification & Core Demographics
    registrationCategory: z.enum(
      REGISTRATION_CATEGORIES.map((c) => c.value) as [string, ...string[]],
      { message: "Select a registration category" }
    ),
    prefix: z.enum(PREFIXES, { message: "Select a title" }),
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long")
      .regex(/^[A-Za-z.\s]+$/, "First name may only contain letters"),
    lastName: z
      .string()
      .trim()
      .max(50, "Name is too long")
      .regex(/^[A-Za-z.\s]*$/, "May only contain letters")
      .optional()
      .or(z.literal("")),
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine((v) => !Number.isNaN(new Date(v).getTime()), "Enter a valid date")
      .refine((v) => new Date(v).getTime() <= Date.now(), "Date of birth cannot be in the future")
      .refine((v) => calculateAge(v) <= 120, "Enter a realistic date of birth"),
    gender: z.enum(GENDERS, { message: "Select a gender" }),
    bloodGroup: z.enum(BLOOD_GROUPS).optional().or(z.literal("")),
    mobile: z
      .string()
      .trim()
      .regex(INDIAN_MOBILE_REGEX, "Enter a valid 10-digit mobile number"),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address")
      .optional()
      .or(z.literal("")),
    maritalStatus: z.enum(MARITAL_STATUS).optional().or(z.literal("")),
    govtIdType: z.enum(GOVT_ID_TYPES, { message: "Select an ID proof type" }),
    govtIdNumber: z.string().trim().min(1, "ID proof number is required"),
    abhaAddress: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9._]+@[a-zA-Z]+$/, "Format: name@provider (e.g. rajesh.sharma@abdm)")
      .optional()
      .or(z.literal("")),
    occupation: z.string().trim().max(60, "Too long").optional().or(z.literal("")),
    nationality: z.string().trim().min(2, "Nationality is required").max(40, "Too long"),

    // Section 2 — Residential Address & Next-of-Kin
    address: z.string().trim().min(5, "Enter the full street address"),
    city: z.string().trim().min(2, "City / district is required"),
    state: z.string().trim().min(1, "Select a state / UT"),
    pincode: z.string().trim().regex(PINCODE_REGEX, "Enter a valid 6-digit PIN code"),
    country: z.string().trim().min(2, "Country is required"),
    emergencyContactName: z.string().trim().min(2, "Emergency contact name is required"),
    relationship: z.enum(RELATIONSHIPS, { message: "Select a relationship" }),
    emergencyContactMobile: z
      .string()
      .trim()
      .regex(INDIAN_MOBILE_REGEX, "Enter a valid 10-digit mobile number"),

    // Section 3 — Triage Vitals & Chief Complaints (vitals optional, complaint required)
    bloodPressure: z
      .string()
      .trim()
      .regex(/^\d{2,3}\/\d{2,3}$/, "Format: systolic/diastolic e.g. 120/80")
      .optional()
      .or(z.literal("")),
    pulse: z.coerce
      .number()
      .int()
      .min(30, "Out of expected range")
      .max(220, "Out of expected range")
      .optional()
      .or(z.nan())
      .or(z.literal(undefined)),
    spo2: z.coerce
      .number()
      .min(50, "Out of expected range")
      .max(100, "SpO2 cannot exceed 100%")
      .optional()
      .or(z.nan())
      .or(z.literal(undefined)),
    bodyTemp: z.coerce
      .number()
      .min(90, "Out of expected range (°F)")
      .max(110, "Out of expected range (°F)")
      .optional()
      .or(z.nan())
      .or(z.literal(undefined)),
    weight: z.coerce
      .number()
      .positive("Must be greater than 0")
      .max(400, "Out of expected range")
      .optional()
      .or(z.nan())
      .or(z.literal(undefined)),
    height: z.coerce
      .number()
      .positive("Must be greater than 0")
      .max(250, "Out of expected range")
      .optional()
      .or(z.nan())
      .or(z.literal(undefined)),
    rbsGlucose: z.coerce
      .number()
      .positive("Must be greater than 0")
      .max(600, "Out of expected range")
      .optional()
      .or(z.nan())
      .or(z.literal(undefined)),
    chiefComplaint: z
      .string()
      .trim()
      .min(5, "Describe the reason for visit (min 5 characters)")
      .max(300, "Keep it under 300 characters"),
    allergies: z.string().trim().max(200, "Keep it under 200 characters").optional().or(z.literal("")),

    // Section 4 — OPD Department, Clinic & Doctor Assignment
    department: z.string().trim().min(1, "Select a medical department"),
    clinicRoom: z.string().trim().min(1, "Select a clinic unit / room"),
    doctor: z.string().trim().min(1, "Select an attending consultant"),
    visitType: z.enum(
      VISIT_TYPES.map((v) => v.value) as [string, ...string[]],
      { message: "Select a visit category" }
    ),
    triageLevel: z.enum(TRIAGE_LEVELS),

    // Section 5 — OPD Tariff, Insurance / TPA & Payment
    investigations: z
      .array(
        z.object({
          code: z.string().trim().min(1),
          remark: z.string().trim().max(200, "Remark must be 200 characters or less").default(""),
        })
      )
      .default([]),
    paymentMode: z.enum(PAYMENT_MODES, { message: "Select a payment mode" }),
    transactionRef: z.string().trim().optional().or(z.literal("")),
    discountRemarks: z.string().trim().max(120, "Too long").optional().or(z.literal("")),
    autoPrint: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    // Govt ID format depends on the selected proof type
    if (data.govtIdType === "Aadhaar" && data.govtIdNumber && !AADHAAR_REGEX.test(data.govtIdNumber)) {
      ctx.addIssue({
        code: "custom",
        path: ["govtIdNumber"],
        message: "Enter a valid 12-digit Aadhaar number",
      });
    }
    if (data.govtIdType === "Passport" && data.govtIdNumber && !PASSPORT_REGEX.test(data.govtIdNumber)) {
      ctx.addIssue({
        code: "custom",
        path: ["govtIdNumber"],
        message: "Enter a valid passport number (e.g. A1234567)",
      });
    }

    // Transaction reference required for non-cash payments
    if (data.paymentMode !== "Cash" && !data.transactionRef) {
      ctx.addIssue({
        code: "custom",
        path: ["transactionRef"],
        message: "Transaction / Txn ID is required for this payment mode",
      });
    }

    // Emergency contact should not exactly match the patient's own mobile
    if (data.mobile && data.emergencyContactMobile && data.mobile === data.emergencyContactMobile) {
      ctx.addIssue({
        code: "custom",
        path: ["emergencyContactMobile"],
        message: "Emergency contact number should differ from the patient's number",
      });
    }
  });

// react-hook-form works with the *input* shape (before zod coercion/defaults run),
// while the value passed to onSubmit is the *output* shape (after parsing).
export type PatientRegistrationFormValues = z.input<typeof patientRegistrationSchema>;
export type PatientRegistrationFormOutput = z.output<typeof patientRegistrationSchema>;
export { calculateAge, calculateDobFromAge };




