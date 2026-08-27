-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('FEMALE', 'MALE', 'NON_BINARY', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "BmiCategory" AS ENUM ('UNDERWEIGHT', 'HEALTHY', 'OVERWEIGHT', 'OBESITY');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "heightCm" DECIMAL(6,2) NOT NULL,
    "weightKg" DECIMAL(6,2) NOT NULL,
    "bmi" DECIMAL(5,2) NOT NULL,
    "bmiCategory" "BmiCategory" NOT NULL,
    "lastNameIndex" TEXT NOT NULL,
    "emailIndex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Patient_bmiCategory_idx" ON "Patient"("bmiCategory");

-- CreateIndex
CREATE INDEX "Patient_sex_idx" ON "Patient"("sex");

-- CreateIndex
CREATE INDEX "Patient_createdAt_idx" ON "Patient"("createdAt");

-- CreateIndex
CREATE INDEX "Patient_lastNameIndex_idx" ON "Patient"("lastNameIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_emailIndex_key" ON "Patient"("emailIndex");
