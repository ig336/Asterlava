import { PrismaClient } from "@prisma/client";
import { calculateBmi, categorizeBmi } from "../src/lib/bmi";
import { encryptField, searchIndex } from "../src/lib/encryption";

const prisma = new PrismaClient();

const patients = [
  {
    firstName: "Maya",
    lastName: "Patel",
    dateOfBirth: "1988-04-12",
    sex: "FEMALE" as const,
    email: "maya.patel@example.com",
    phone: "415-555-0182",
    zipCode: "94107",
    heightCm: 165.1,
    weightKg: 62.3
  },
  {
    firstName: "Jordan",
    lastName: "Lee",
    dateOfBirth: "1976-11-30",
    sex: "NON_BINARY" as const,
    email: "jordan.lee@example.com",
    phone: "510-555-0149",
    zipCode: "94612",
    heightCm: 177.8,
    weightKg: 88.4
  }
];

async function main() {
  for (const patient of patients) {
    const bmi = calculateBmi(patient.heightCm, patient.weightKg);
    await prisma.patient.upsert({
      where: { emailIndex: searchIndex(patient.email) },
      update: {},
      create: {
        firstName: encryptField(patient.firstName),
        lastName: encryptField(patient.lastName),
        dateOfBirth: encryptField(patient.dateOfBirth),
        sex: patient.sex,
        email: encryptField(patient.email),
        phone: encryptField(patient.phone),
        zipCode: encryptField(patient.zipCode),
        heightCm: patient.heightCm,
        weightKg: patient.weightKg,
        bmi,
        bmiCategory: categorizeBmi(bmi),
        lastNameIndex: searchIndex(patient.lastName),
        emailIndex: searchIndex(patient.email)
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
