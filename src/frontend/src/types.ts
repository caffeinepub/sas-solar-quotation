export interface CustomerData {
  name: string;
  address: string;
  mobile: string;
  email: string;
  consumerNumber: string;
  capacity: number;
  salePrice: number;
  electricityRate: number;
  quotationNumber: string;
  date: string;
  panelBrand: string;
  panelWattage: number;
  inverterBrand: string;
  isChannelPartner?: boolean;
  channelPartnerName?: string;
  systemType: "ongrid" | "hybrid" | "offgrid";
  batteryCapacityKWh?: number;
  batteryQuantity?: number;
  batteryBackupKWh?: number;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNo: string;
  ifscCode: string;
}

export interface PaymentScheduleData {
  advance: number;
  beforeInstallation: number;
  materialArrival: number;
  afterInstallation: number;
}

export interface Calculations {
  centralSubsidy: number;
  stateSubsidy: number;
  totalSubsidy: number;
  netCost: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  annualGeneration: number;
  annualSavings: number;
  paybackYears: number;
  roi25Year: number;
  totalProfit25Year: number;
  co2SavedAnnual: number;
}
