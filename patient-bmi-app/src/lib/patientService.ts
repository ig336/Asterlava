import { Prisma } from "@prisma/client";
import { calculateBmi, categorizeBmi, toCentimeters, toKilograms } from "./bmi";
import { decryptField, encryptField, searchIndex } from "./encryption";
import { createPatient, listPatients } from "./patientRepository";
import { PatientFilters, PatientInput } from "./validation";

export type PatientView = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  email: string;
  phone: string;
  zipCode: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: string;
  createdAt: string;
};

export async function registerPatient(input: PatientInput) {
  const heightCm = toCentimeters(input.unitSystem, input.heightCm ?? 0, input.heightFeet, input.heightInches);
  const weightKg = toKilograms(input.unitSystem, input.weightKg ?? 0, input.weightPounds);
  const bmi = calculateBmi(heightCm, weightKg);

  return createPatient({
    firstName: encryptField(input.firstName),
    lastName: encryptField(input.lastName),
    dateOfBirth: encryptField(input.dateOfBirth.toISOString().slice(0, 10)),
    sex: input.sex,
    email: encryptField(input.email),
    phone: encryptField(input.phone),
    zipCode: encryptField(input.zipCode),
    heightCm: new Prisma.Decimal(heightCm.toFixed(2)),
    weightKg: new Prisma.Decimal(weightKg.toFixed(2)),
    bmi: new Prisma.Decimal(bmi.toFixed(2)),
    bmiCategory: categorizeBmi(bmi),
    lastNameIndex: searchIndex(input.lastName),
    emailIndex: searchIndex(input.email)
  });
}

export async function getPatients(filters: PatientFilters): Promise<PatientView[]> {
  const where: Prisma.PatientWhereInput = {};

  if (filters.sex !== "ALL") where.sex = filters.sex;
  if (filters.bmiCategory !== "ALL") where.bmiCategory = filters.bmiCategory;

  const query = filters.query?.trim();
  if (query) {
    where.OR = [{ lastNameIndex: searchIndex(query) }, { emailIndex: searchIndex(query) }];
  }

  const rows = await listPatients(where);

  return rows.map((patient) => ({
    id: patient.id,
    firstName: decryptField(patient.firstName),
    lastName: decryptField(patient.lastName),
    dateOfBirth: decryptField(patient.dateOfBirth),
    sex: patient.sex,
    email: decryptField(patient.email),
    phone: decryptField(patient.phone),
    zipCode: decryptField(patient.zipCode),
    heightCm: Number(patient.heightCm),
    weightKg: Number(patient.weightKg),
    bmi: Number(patient.bmi),
    bmiCategory: patient.bmiCategory,
    createdAt: patient.createdAt.toISOString()
  }));
}
