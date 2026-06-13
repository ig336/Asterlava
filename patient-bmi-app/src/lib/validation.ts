import { z } from "zod";

const requiredText = z.string().trim().min(1, "Required").max(100, "Too long");

export const patientInputSchema = z
  .object({
    firstName: requiredText,
    lastName: requiredText,
    dateOfBirth: z.coerce.date().max(new Date(), "Date of birth cannot be in the future"),
    sex: z.enum(["FEMALE", "MALE", "NON_BINARY", "OTHER", "PREFER_NOT_TO_SAY"]),
    email: z.string().trim().email("Enter a valid email address").max(255),
    phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
    zipCode: z.string().trim().min(3, "Enter a valid ZIP/postal code").max(12),
    unitSystem: z.enum(["metric", "imperial"]),
    heightCm: z.coerce.number().min(40).max(260).optional(),
    weightKg: z.coerce.number().min(2).max(500).optional(),
    heightFeet: z.coerce.number().int().min(1).max(8).optional(),
    heightInches: z.coerce.number().min(0).max(11.99).optional(),
    weightPounds: z.coerce.number().min(4).max(1100).optional()
  })
  .superRefine((value, ctx) => {
    if (value.unitSystem === "metric") {
      if (!value.heightCm) ctx.addIssue({ code: "custom", path: ["heightCm"], message: "Height is required" });
      if (!value.weightKg) ctx.addIssue({ code: "custom", path: ["weightKg"], message: "Weight is required" });
    }

    if (value.unitSystem === "imperial") {
      if (!value.heightFeet) ctx.addIssue({ code: "custom", path: ["heightFeet"], message: "Feet is required" });
      if (value.heightInches === undefined) {
        ctx.addIssue({ code: "custom", path: ["heightInches"], message: "Inches is required" });
      }
      if (!value.weightPounds) {
        ctx.addIssue({ code: "custom", path: ["weightPounds"], message: "Weight is required" });
      }
    }
  });

export const patientFilterSchema = z.object({
  query: z.string().trim().optional(),
  sex: z
    .enum(["ALL", "FEMALE", "MALE", "NON_BINARY", "OTHER", "PREFER_NOT_TO_SAY"])
    .default("ALL"),
  bmiCategory: z.enum(["ALL", "UNDERWEIGHT", "HEALTHY", "OVERWEIGHT", "OBESITY"]).default("ALL")
});

export type PatientInput = z.infer<typeof patientInputSchema>;
export type PatientFilters = z.infer<typeof patientFilterSchema>;
