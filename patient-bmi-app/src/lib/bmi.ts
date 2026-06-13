export type BmiCategory = "UNDERWEIGHT" | "HEALTHY" | "OVERWEIGHT" | "OBESITY";

export function calculateBmi(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error("Height and weight must be positive numbers.");
  }

  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(2));
}

export function categorizeBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return "UNDERWEIGHT";
  if (bmi < 25) return "HEALTHY";
  if (bmi < 30) return "OVERWEIGHT";
  return "OBESITY";
}

export function toCentimeters(unit: "metric" | "imperial", centimeters: number, feet?: number, inches?: number) {
  if (unit === "metric") return centimeters;
  return ((feet ?? 0) * 12 + (inches ?? 0)) * 2.54;
}

export function toKilograms(unit: "metric" | "imperial", kilograms: number, pounds?: number) {
  if (unit === "metric") return kilograms;
  return (pounds ?? 0) * 0.45359237;
}
