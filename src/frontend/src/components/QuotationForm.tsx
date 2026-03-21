import type React from "react";
import { useState } from "react";
import type { BankDetails, CustomerData, PaymentScheduleData } from "../types";
import { calculate, formatINR } from "../utils/calculations";

interface Props {
  onGenerate: (
    data: CustomerData,
    bank: BankDetails,
    payment: PaymentScheduleData,
  ) => void;
}

const defaultBank: BankDetails = {
  bankName: "PUNJAB NATIONAL BANK, JANPATH BRANCH",
  accountName: "SHREE ADISHAKTI SOLAR PVT LTD",
  accountNo: "1438102100000811",
  ifscCode: "PUNB0143810",
};

const defaultPayment: PaymentScheduleData = {
  advance: 5,
  beforeInstallation: 70,
  materialArrival: 25,
  afterInstallation: 5,
};

function getQuotationNumber(): string {
  const stored = localStorage.getItem("sas_quote_counter");
  const next = stored ? Number.parseInt(stored) + 1 : 1;
  localStorage.setItem("sas_quote_counter", String(next));
  return `SAS-2026-${String(next).padStart(4, "0")}`;
}

const bankLabels: Record<keyof BankDetails, string> = {
  bankName: "Bank Name",
  accountName: "Account Name",
  accountNo: "Account No",
  ifscCode: "IFSC Code",
};

const paymentLabels: Record<keyof PaymentScheduleData, string> = {
  advance: "Advance / Booking (%)",
  beforeInstallation: "Before Installation (%)",
  materialArrival: "Material Arrival (%)",
  afterInstallation: "After Installation (%)",
};

export default function QuotationForm({ onGenerate }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [customer, setCustomer] = useState<CustomerData>({
    name: "",
    address: "",
    mobile: "",
    email: "",
    capacity: 3,
    salePrice: 180000,
    electricityRate: 7,
    quotationNumber: getQuotationNumber(),
    date: today,
  });
  const [bank, setBank] = useState<BankDetails>(defaultBank);
  const [payment, setPayment] = useState<PaymentScheduleData>(defaultPayment);

  const calc = calculate(customer);
  const paymentTotal =
    payment.advance +
    payment.beforeInstallation +
    payment.materialArrival +
    payment.afterInstallation;

  const updateCustomer = (field: keyof CustomerData, value: string | number) =>
    setCustomer((prev) => ({ ...prev, [field]: value }));
  const updateBank = (field: keyof BankDetails, value: string) =>
    setBank((prev) => ({ ...prev, [field]: value }));
  const updatePayment = (field: keyof PaymentScheduleData, value: number) =>
    setPayment((prev) => ({ ...prev, [field]: value }));

  const handleGenerate = () => {
    if (!customer.name || !customer.capacity || !customer.salePrice) {
      alert("Please fill in customer name, capacity and project price.");
      return;
    }
    onGenerate(customer, bank, payment);
  };

  const fieldClass =
    "w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400";
  const fieldStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(212,175,55,0.3)",
    color: "#fff",
  };
  const labelStyle = { color: "#a0b4c8" };
  const sectionStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(212,175,55,0.2)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
  };

  const Field = ({
    id,
    label,
    children,
  }: { id: string; label: string; children: React.ReactNode }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-xs mb-1 font-medium"
        style={labelStyle}
      >
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #0d1f3c 100%)",
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/sas-solar-logo-transparent.dim_400x400.png"
            alt="SAS Solar"
            className="w-10 h-10 object-contain"
          />
          <div>
            <div
              className="font-bold text-sm"
              style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
            >
              SHREE ADISHAKTI SOLAR
            </div>
            <div className="text-xs" style={{ color: "#a0aec0" }}>
              Solar Quotation Generator
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("sas_auth");
            window.location.reload();
          }}
          className="text-xs px-3 py-1 rounded"
          style={{ border: "1px solid rgba(212,175,55,0.3)", color: "#a0aec0" }}
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2
          className="text-lg font-bold mb-6"
          style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
        >
          New Solar Quotation
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {/* Customer Details */}
            <div style={sectionStyle}>
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#FF6B35" }}
              >
                CUSTOMER DETAILS
              </h3>
              <div className="space-y-3">
                <Field id="cust-name" label="Customer Name *">
                  <input
                    id="cust-name"
                    data-ocid="form.customer_name.input"
                    type="text"
                    value={customer.name}
                    onChange={(e) => updateCustomer("name", e.target.value)}
                    className={fieldClass}
                    style={fieldStyle}
                    placeholder="Full Name"
                  />
                </Field>
                <Field id="cust-addr" label="Address">
                  <textarea
                    id="cust-addr"
                    value={customer.address}
                    onChange={(e) => updateCustomer("address", e.target.value)}
                    className={fieldClass}
                    style={{ ...fieldStyle, resize: "vertical" }}
                    rows={2}
                    placeholder="Customer Address"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field id="cust-mobile" label="Mobile">
                    <input
                      id="cust-mobile"
                      type="tel"
                      value={customer.mobile}
                      onChange={(e) => updateCustomer("mobile", e.target.value)}
                      className={fieldClass}
                      style={fieldStyle}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </Field>
                  <Field id="cust-email" label="Email">
                    <input
                      id="cust-email"
                      type="email"
                      value={customer.email}
                      onChange={(e) => updateCustomer("email", e.target.value)}
                      className={fieldClass}
                      style={fieldStyle}
                      placeholder="email@example.com"
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* System Details */}
            <div style={sectionStyle}>
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#FF6B35" }}
              >
                SYSTEM & PRICING
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field id="sys-capacity" label="Solar Capacity (kW) *">
                    <input
                      id="sys-capacity"
                      data-ocid="form.capacity.input"
                      type="number"
                      min="1"
                      max="500"
                      step="0.5"
                      value={customer.capacity}
                      onChange={(e) =>
                        updateCustomer(
                          "capacity",
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </Field>
                  <Field id="sys-rate" label="Electricity Rate (&#8377;/unit)">
                    <input
                      id="sys-rate"
                      type="number"
                      min="1"
                      step="0.5"
                      value={customer.electricityRate}
                      onChange={(e) =>
                        updateCustomer(
                          "electricityRate",
                          Number.parseFloat(e.target.value) || 7,
                        )
                      }
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </Field>
                </div>
                <Field id="sys-price" label="Final Project Price (&#8377;) *">
                  <input
                    id="sys-price"
                    data-ocid="form.sale_price.input"
                    type="number"
                    min="0"
                    step="1000"
                    value={customer.salePrice}
                    onChange={(e) =>
                      updateCustomer(
                        "salePrice",
                        Number.parseFloat(e.target.value) || 0,
                      )
                    }
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field id="sys-qno" label="Quotation Number">
                    <input
                      id="sys-qno"
                      type="text"
                      value={customer.quotationNumber}
                      onChange={(e) =>
                        updateCustomer("quotationNumber", e.target.value)
                      }
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </Field>
                  <Field id="sys-date" label="Date">
                    <input
                      id="sys-date"
                      type="date"
                      value={customer.date}
                      onChange={(e) => updateCustomer("date", e.target.value)}
                      className={fieldClass}
                      style={{ ...fieldStyle, colorScheme: "dark" }}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div style={sectionStyle}>
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#FF6B35" }}
              >
                BANK DETAILS (Editable)
              </h3>
              <div className="space-y-3">
                {(Object.keys(bankLabels) as (keyof BankDetails)[]).map(
                  (field) => (
                    <Field
                      key={field}
                      id={`bank-${field}`}
                      label={bankLabels[field]}
                    >
                      <input
                        id={`bank-${field}`}
                        type="text"
                        value={bank[field]}
                        onChange={(e) => updateBank(field, e.target.value)}
                        className={fieldClass}
                        style={fieldStyle}
                      />
                    </Field>
                  ),
                )}
              </div>
            </div>
          </div>

          <div>
            {/* Payment Schedule */}
            <div style={sectionStyle}>
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#FF6B35" }}
              >
                PAYMENT SCHEDULE (Editable)
              </h3>
              <div className="space-y-3">
                {(
                  Object.keys(paymentLabels) as (keyof PaymentScheduleData)[]
                ).map((field) => (
                  <div key={field} className="flex items-center gap-3">
                    <label
                      htmlFor={`pay-${field}`}
                      className="flex-1 text-xs"
                      style={labelStyle}
                    >
                      {paymentLabels[field]}
                    </label>
                    <input
                      id={`pay-${field}`}
                      type="number"
                      min="0"
                      max="100"
                      value={payment[field]}
                      onChange={(e) =>
                        updatePayment(
                          field,
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-20 px-3 py-2 rounded-lg text-sm text-center outline-none"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(212,175,55,0.3)",
                        color: "#fff",
                      }}
                    />
                    <span
                      className="text-xs w-24 text-right"
                      style={{ color: "#D4AF37" }}
                    >
                      {formatINR((customer.salePrice * payment[field]) / 100)}
                    </span>
                  </div>
                ))}
                <div
                  className="flex items-center gap-3 pt-2"
                  style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <span
                    className="flex-1 text-xs font-bold"
                    style={{ color: "#D4AF37" }}
                  >
                    Total
                  </span>
                  <span
                    className={`text-sm font-bold ${paymentTotal > 105 ? "text-red-400" : ""}`}
                    style={{
                      color: paymentTotal === 105 ? "#68d391" : undefined,
                    }}
                  >
                    {paymentTotal}%
                  </span>
                </div>
              </div>
            </div>

            {/* Live Calculations */}
            <div
              style={{
                ...sectionStyle,
                background: "rgba(212,175,55,0.05)",
                border: "1px solid rgba(212,175,55,0.4)",
              }}
            >
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#D4AF37" }}
              >
                LIVE CALCULATIONS
              </h3>
              <div className="space-y-2">
                {[
                  ["Central Subsidy", formatINR(calc.centralSubsidy)],
                  ["State Subsidy", formatINR(calc.stateSubsidy)],
                  ["Total Subsidy", formatINR(calc.totalSubsidy)],
                  ["Net Cost (after subsidy)", formatINR(calc.netCost)],
                  [
                    "Daily Generation",
                    `${calc.dailyGeneration.toFixed(1)} units`,
                  ],
                  [
                    "Annual Generation",
                    `${calc.annualGeneration.toFixed(0)} units`,
                  ],
                  ["Annual Savings", formatINR(calc.annualSavings)],
                  ["Payback Period", `${calc.paybackYears.toFixed(1)} years`],
                  ["25-Year Total Profit", formatINR(calc.totalProfit25Year)],
                  ["25-Year ROI", `${calc.roi25Year.toFixed(0)}%`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-1"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-xs" style={{ color: "#a0b4c8" }}>
                      {label}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#D4AF37" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              data-ocid="form.generate.primary_button"
              onClick={handleGenerate}
              className="w-full py-4 rounded-xl font-bold text-lg tracking-wider transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #D4AF37, #FF6B35)",
                color: "#0A1628",
              }}
            >
              GENERATE PROPOSAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
