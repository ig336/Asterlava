import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export type CreatePatientRecord = Prisma.PatientCreateInput;

export async function createPatient(data: CreatePatientRecord) {
  return prisma.patient.create({ data });
}

export async function listPatients(where: Prisma.PatientWhereInput) {
  return prisma.patient.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100
  });
}
