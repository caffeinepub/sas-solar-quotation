import type { Calculations, CustomerData } from "../types";

export function calculateSubsidy(
  capacityKW: number,
  systemType?: string,
): {
  central: number;
  state: number;
} {
  // Off-Grid systems are NOT eligible for government subsidy
  if (systemType === "offgrid") return { central: 0, state: 0 };
  if (capacityKW <= 2) return { central: 60000, state: 50000 }; // total 110000
  return { central: 78000, state: 60000 }; // total 138000
}

/**
 * Daily generation @ 4–5 kWh per kW per day
 * All capacities: mid value = kW * 4.5
 */
export function getDailyGeneration(capacityKW: number): number {
  return capacityKW * 4.5;
}

export function getDailyGenerationRange(capacityKW: number): string {
  const min = Math.round(capacityKW * 4);
  const max = Math.round(capacityKW * 5);
  return `${min}-${max}`;
}

export function calculate(data: CustomerData): Calculations {
  const { central: centralSubsidy, state: stateSubsidy } = calculateSubsidy(
    data.capacity,
    data.systemType,
  );
  const totalSubsidy = centralSubsidy + stateSubsidy;
  const netCost = Math.max(0, data.salePrice - totalSubsidy);
  const dailyGeneration = getDailyGeneration(data.capacity);
  const monthlyGeneration = dailyGeneration * 30;
  const annualGeneration = dailyGeneration * 365;
  const annualSavings = annualGeneration * data.electricityRate;
  const paybackYears = annualSavings > 0 ? netCost / annualSavings : 0;
  const totalProfit25Year = annualSavings * 25 - netCost;
  const roi25Year = netCost > 0 ? (totalProfit25Year / netCost) * 100 : 0;
  const co2SavedAnnual = annualGeneration * 0.82;
  return {
    centralSubsidy,
    stateSubsidy,
    totalSubsidy,
    netCost,
    dailyGeneration,
    monthlyGeneration,
    annualGeneration,
    annualSavings,
    paybackYears,
    roi25Year,
    totalProfit25Year,
    co2SavedAnnual,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function numberToWords(num: number): string {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const n = Math.round(num);
  if (n === 0) return "Zero";
  const toWords = (x: number): string => {
    if (x < 20) return a[x];
    if (x < 100)
      return `${b[Math.floor(x / 10)]}${x % 10 ? ` ${a[x % 10]}` : ""}`;
    if (x < 1000)
      return `${a[Math.floor(x / 100)]} Hundred${x % 100 ? ` ${toWords(x % 100)}` : ""}`;
    if (x < 100000)
      return `${toWords(Math.floor(x / 1000))} Thousand${x % 1000 ? ` ${toWords(x % 1000)}` : ""}`;
    if (x < 10000000)
      return `${toWords(Math.floor(x / 100000))} Lakh${x % 100000 ? ` ${toWords(x % 100000)}` : ""}`;
    return `${toWords(Math.floor(x / 10000000))} Crore${x % 10000000 ? ` ${toWords(x % 10000000)}` : ""}`;
  };
  return `${toWords(n)} Rupees Only`;
}
