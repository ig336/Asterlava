import type { PatientFilters as Filters } from "@/lib/validation";

export function PatientFilters({ filters }: { filters: Filters }) {
  return (
    <form className="mb-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto] md:items-end">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Exact search</span>
          <input
            name="query"
            defaultValue={filters.query}
            placeholder="Last name or email"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Sex</span>
          <select
            name="sex"
            defaultValue={filters.sex}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          >
            <option value="ALL">All</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="NON_BINARY">Non-binary</option>
            <option value="OTHER">Other</option>
            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">BMI</span>
          <select
            name="bmiCategory"
            defaultValue={filters.bmiCategory}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          >
            <option value="ALL">All</option>
            <option value="UNDERWEIGHT">Underweight</option>
            <option value="HEALTHY">Healthy</option>
            <option value="OVERWEIGHT">Overweight</option>
            <option value="OBESITY">Obesity</option>
          </select>
        </label>
        <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Filter
        </button>
      </div>
    </form>
  );
}
