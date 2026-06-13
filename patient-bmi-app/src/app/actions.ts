"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { patientInputSchema } from "@/lib/validation";
import { canReachDatabase } from "@/lib/databaseHealth";
import { registerPatient } from "@/lib/patientService";

export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function createPatientAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = patientInputSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  if (!(await canReachDatabase())) {
    return { ok: false, message: "Database is not reachable. Start PostgreSQL and run migrations first." };
  }

  try {
    await registerPatient(parsed.data);
    revalidatePath("/");
    return { ok: true, message: "Patient intake saved securely." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, message: "A patient with this email already exists." };
    }

    return { ok: false, message: "Unable to save patient intake. Please try again." };
  }
}
