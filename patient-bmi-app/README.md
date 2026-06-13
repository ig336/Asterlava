# Patient BMI Registry

A complete Next.js take-home application for collecting patient demographics, calculating BMI, and letting clinicians review/filter records. The implementation emphasizes clean layers, validation, ORM-backed persistence, and protected health information handling.

## Stack

- Next.js App Router, React, TypeScript
- Prisma ORM with PostgreSQL
- Zod validation at the server boundary
- AES-256-GCM field encryption for PHI
- HMAC blind indexes for exact last-name/email search without storing plaintext identifiers
- Vitest unit tests for BMI domain logic

## Quick Start

```bash
cd patient-bmi-app
cp .env.example .env
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Paste different generated values into `ENCRYPTION_KEY` and `SEARCH_INDEX_KEY`, then run:

```bash
npm install
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000.

## Architecture

- `src/app/actions.ts` is the communication boundary for form submissions.
- `src/lib/validation.ts` owns input schemas and validation messages.
- `src/lib/bmi.ts` contains pure domain logic and is unit tested.
- `src/lib/patientService.ts` coordinates validation-ready inputs, BMI calculation, encryption, and view-model mapping.
- `src/lib/patientRepository.ts` is the Prisma data-access layer.
- `src/lib/encryption.ts` encrypts PHI fields and creates keyed search indexes.

## Security Notes

This demo encrypts patient demographic fields before database insertion. It stores BMI, sex, timestamps, and keyed search indexes in queryable form so clinicians can filter records without exposing names, email, phone, DOB, or ZIP as plaintext in PostgreSQL.

For production, add authentication/authorization, audit logs, TLS-only deployment, managed secret rotation, backups with separate keys, and row-level access policies. True browser-to-clinician end-to-end encryption would require a key-sharing design and would limit server-side filtering; this version uses application-layer encryption at rest, which fits the take-home's clinician review requirement.

## Scripts

```bash
npm run dev
npm run build
npm run test
npm run db:migrate
npm run db:studio
```
