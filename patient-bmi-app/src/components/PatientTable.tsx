import clsx from "clsx";
import type { PatientView } from "@/lib/patientService";

export function PatientTable({ patients }: { patients: PatientView[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-lg font-semibold">Clinician review</h2>
        <span className="text-sm font-medium text-slate-500">{patients.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <Th>Patient</Th>
              <Th>DOB</Th>
              <Th>Sex</Th>
              <Th>Contact</Th>
              <Th>Height</Th>
              <Th>Weight</Th>
              <Th>BMI</Th>
              <Th>Entered</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.length ? (
              patients.map((patient) => (
                <tr key={patient.id} className="align-top">
                  <Td>
                    <div className="font-semibold text-slate-900">
                      {patient.lastName}, {patient.firstName}
                    </div>
                    <div className="text-xs text-slate-500">{patient.zipCode}</div>
                  </Td>
                  <Td>{patient.dateOfBirth}</Td>
                  <Td>{formatEnum(patient.sex)}</Td>
                  <Td>
                    <div>{patient.email}</div>
                    <div className="text-xs text-slate-500">{patient.phone}</div>
                  </Td>
                  <Td>{patient.heightCm.toFixed(1)} cm</Td>
                  <Td>{patient.weightKg.toFixed(1)} kg</Td>
                  <Td>
                    <span className={badgeClass(patient.bmiCategory)}>
                      {patient.bmi.toFixed(2)} {formatEnum(patient.bmiCategory)}
                    </span>
                  </Td>
                  <Td>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(patient.createdAt))}</Td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-500">
                  No patient records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="whitespace-nowrap px-4 py-3 text-slate-700">{children}</td>;
}

function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function badgeClass(category: string) {
  return clsx(
    "inline-flex rounded px-2 py-1 text-xs font-semibold",
    category === "HEALTHY" && "bg-teal-100 text-teal-800",
    category === "UNDERWEIGHT" && "bg-sky-100 text-sky-800",
    category === "OVERWEIGHT" && "bg-amber-100 text-amber-800",
    category === "OBESITY" && "bg-rose-100 text-rose-800"
  );
}
