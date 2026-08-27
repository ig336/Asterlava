# Patient BMI Registry

A complete Next.js take-home application for collecting patient demographics, calculating BMI, and letting clinicians review/filter records. The implementation emphasizes clean layers, validation, ORM-backed persistence, and protected health information handling.

## Stack

- Next.js App Router, React, TypeScript
- Prisma ORM with PostgreSQL
- Zod validation at the server boundary
- AES-256-GCM field encryption for PHI
- HMAC blind indexes for exact last-name/email search without storing plaintext identifiers
- Vitest unit tests for BMI domain logic

## Features

- Patient demographic intake form
- Metric and imperial height/weight entry
- Automatic BMI calculation and BMI category assignment
- Clinician review table
- Filters for sex and BMI category
- Exact search by last name or email using keyed blind indexes
- PostgreSQL persistence through Prisma
- Application-layer encryption for PHI fields before database storage
- Graceful database-unavailable state during local setup

## Quick Start

```bash
git clone https://github.com/ig336/BMI-calculator-.git
cd BMI-calculator-
npm install
cp .env.example .env
```

Generate two different 32-byte base64 keys:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Paste one value into `ENCRYPTION_KEY` and another into `SEARCH_INDEX_KEY`, then run:

```bash
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

## Deployment

This is a full-stack Next.js app, so it can be deployed to platforms such as Vercel, Render, Railway, or Fly.io. Use a hosted PostgreSQL provider such as Neon, Supabase, Railway Postgres, or Render Postgres.

Set these production environment variables:

```bash
DATABASE_URL="postgresql://..."
ENCRYPTION_KEY="32-byte-base64-key"
SEARCH_INDEX_KEY="different-32-byte-base64-key"
```

Run the Prisma migration during deployment or release setup:

```bash
npm run db:migrate
```

For production data, do not run the seed script unless sample records are desired.

## Scripts

```bash
npm run dev
npm run build
npm run test
npm run lint
npm run db:migrate
npm run db:seed
npm run db:studio
```
