import { PatientForm } from "@/components/PatientForm";
import { PatientFilters } from "@/components/PatientFilters";
import { PatientTable } from "@/components/PatientTable";
import type { PatientView } from "@/lib/patientService";
import { canReachDatabase } from "@/lib/databaseHealth";
import { getPatients } from "@/lib/patientService";
import { patientFilterSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const parsedFilters = patientFilterSchema.parse({
    query: readParam(params.query),
    sex: readParam(params.sex) ?? "ALL",
    bmiCategory: readParam(params.bmiCategory) ?? "ALL"
  });
  let patients: PatientView[] = [];
  let databaseNotice: string | undefined;

  if (!(await canReachDatabase())) {
    databaseNotice = "Database is not reachable. Start PostgreSQL and run migrations to save and review records.";
  } else {
    try {
      patients = await getPatients(parsedFilters);
    } catch {
      databaseNotice = "Database query failed. Check migrations and database credentials.";
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Clinical intake</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Patient BMI registry</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Collect demographics, calculate BMI automatically, and review encrypted patient records with focused
              clinician filters.
            </p>
          </div>
          <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
            PHI fields are encrypted before storage. Exact search uses keyed blind indexes.
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[420px_1fr]">
        <PatientForm />
        <section className="min-w-0">
          {databaseNotice ? (
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
              {databaseNotice}
            </div>
          ) : null}
          <PatientFilters filters={parsedFilters} />
          <PatientTable patients={patients} />
        </section>
      </div>
    </main>
  );
}

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
