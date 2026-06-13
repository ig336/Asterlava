"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createPatientAction, type ActionState } from "@/app/actions";

const initialState: ActionState = { ok: false, message: "" };

export function PatientForm() {
  const [state, formAction] = useActionState(createPatientAction, initialState);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("imperial");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">New patient intake</h2>
        <p className="mt-1 text-sm text-slate-600">Demographics are encrypted before they reach the database.</p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" name="firstName" error={state.fieldErrors?.firstName?.[0]} />
          <Field label="Last name" name="lastName" error={state.fieldErrors?.lastName?.[0]} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Date of birth" name="dateOfBirth" type="date" error={state.fieldErrors?.dateOfBirth?.[0]} />
          <Select label="Sex" name="sex" error={state.fieldErrors?.sex?.[0]}>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="NON_BINARY">Non-binary</option>
            <option value="OTHER">Other</option>
            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
          </Select>
        </div>

        <Field label="Email" name="email" type="email" error={state.fieldErrors?.email?.[0]} />
        <div className="grid grid-cols-[1fr_120px] gap-3">
          <Field label="Phone" name="phone" type="tel" error={state.fieldErrors?.phone?.[0]} />
          <Field label="ZIP" name="zipCode" error={state.fieldErrors?.zipCode?.[0]} />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-slate-700">Measurements</legend>
          <div className="grid grid-cols-2 rounded-md border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setUnitSystem("imperial")}
              className={unitButtonClass(unitSystem === "imperial")}
            >
              Imperial
            </button>
            <button
              type="button"
              onClick={() => setUnitSystem("metric")}
              className={unitButtonClass(unitSystem === "metric")}
            >
              Metric
            </button>
          </div>
          <input type="hidden" name="unitSystem" value={unitSystem} />

          {unitSystem === "imperial" ? (
            <div className="grid grid-cols-3 gap-3">
              <Field label="Feet" name="heightFeet" type="number" min="1" max="8" error={state.fieldErrors?.heightFeet?.[0]} />
              <Field
                label="Inches"
                name="heightInches"
                type="number"
                min="0"
                max="11.99"
                step="0.1"
                error={state.fieldErrors?.heightInches?.[0]}
              />
              <Field
                label="Pounds"
                name="weightPounds"
                type="number"
                min="4"
                step="0.1"
                error={state.fieldErrors?.weightPounds?.[0]}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Height cm" name="heightCm" type="number" min="40" step="0.1" error={state.fieldErrors?.heightCm?.[0]} />
              <Field label="Weight kg" name="weightKg" type="number" min="2" step="0.1" error={state.fieldErrors?.weightKg?.[0]} />
            </div>
          )}
        </fieldset>

        {state.message ? (
          <p className={state.ok ? "text-sm font-medium text-teal-700" : "text-sm font-medium text-rose-700"}>
            {state.message}
          </p>
        ) : null}

        <SubmitButton />
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-rose-700">{error}</span> : null}
    </label>
  );
}

function Select({
  label,
  name,
  error,
  children
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        name={name}
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      >
        {children}
      </select>
      {error ? <span className="mt-1 block text-xs font-medium text-rose-700">{error}</span> : null}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "Saving..." : "Save patient"}
    </button>
  );
}

function unitButtonClass(active: boolean) {
  return active
    ? "rounded px-3 py-2 text-sm font-semibold text-teal-900 bg-white shadow-sm"
    : "rounded px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900";
}
