import { describe, expect, it } from "vitest";
import { calculateBmi, categorizeBmi, toCentimeters, toKilograms } from "./bmi";

describe("BMI domain helpers", () => {
  it("calculates BMI rounded to two decimals", () => {
    expect(calculateBmi(180, 81)).toBe(25);
  });

  it("categorizes BMI using CDC-style cutoffs", () => {
    expect(categorizeBmi(18.4)).toBe("UNDERWEIGHT");
    expect(categorizeBmi(18.5)).toBe("HEALTHY");
    expect(categorizeBmi(25)).toBe("OVERWEIGHT");
    expect(categorizeBmi(30)).toBe("OBESITY");
  });

  it("converts imperial units", () => {
    expect(toCentimeters("imperial", 0, 5, 10)).toBeCloseTo(177.8);
    expect(toKilograms("imperial", 0, 180)).toBeCloseTo(81.65, 2);
  });
});
