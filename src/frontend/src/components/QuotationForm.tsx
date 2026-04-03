import type React from "react";
import { useState } from "react";
import type { BankDetails, CustomerData, PaymentScheduleData } from "../types";
import {
  calculate,
  formatINR,
  getDailyGenerationRange,
} from "../utils/calculations";

interface Props {
  onGenerate: (
    data: CustomerData,
    bank: BankDetails,
    payment: PaymentScheduleData,
  ) => void;
  onQrUpload: (dataUrl: string) => void;
  upiQrImage: string;
  onSave: (customer: CustomerData, bank: BankDetails) => void;
  onViewSaved: () => void;
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
  afterInstallation: 0,
};

const PANEL_BRANDS = ["Tata Bifacial", "Waree Bifacial", "Adani Bifacial"];

const PANEL_WATTAGES = [500, 530, 545, 550, 560, 575, 600, 630, 650];

const INVERTER_BRANDS: Record<string, string> = {
  "Tata Bifacial": "Tata",
  "Waree Bifacial": "Waree",
  "Adani Bifacial": "Adani",
};

function getQuotationNumber(): string {
  const stored = localStorage.getItem("sas_quote_counter");
  const next = stored ? Number.parseInt(stored) + 1 : 1;
  localStorage.setItem("sas_quote_counter", String(next));
  return `SAS-2026-${String(next).padStart(4, "0")}`;
}

function getSavedCount(): number {
  try {
    return JSON.parse(localStorage.getItem("sas_saved_quotes") || "[]").length;
  } catch {
    return 0;
  }
}

const bankLabels: Record<keyof BankDetails, string> = {
  bankName: "Bank Name",
  accountName: "Account Name",
  accountNo: "Account No",
  ifscCode: "IFSC Code",
};

// IMPORTANT: Field must be defined OUTSIDE QuotationForm to prevent
// React from unmounting/remounting inputs on every keystroke (which
// causes the "one letter then cursor disappears" bug).
const LABEL_STYLE = { color: "#a0b4c8" };

function Field({
  id,
  label,
  children,
}: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs mb-1 font-medium"
        style={LABEL_STYLE}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function QuotationForm({
  onGenerate,
  onQrUpload,
  upiQrImage,
  onSave,
  onViewSaved,
}: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [customer, setCustomer] = useState<CustomerData>({
    name: "",
    address: "",
    mobile: "",
    email: "",
    consumerNumber: "",
    capacity: 3,
    salePrice: 180000,
    electricityRate: 7,
    quotationNumber: getQuotationNumber(),
    date: today,
    panelBrand: "Tata Bifacial",
    panelWattage: 545,
    inverterBrand: "Tata",
    isChannelPartner: false,
    channelPartnerName: "",
    systemType: "ongrid",
    batteryCapacityKWh: undefined,
    batteryQuantity: 1,
    batteryBackupKWh: undefined,
  });
  const [bank, setBank] = useState<BankDetails>(defaultBank);
  const [payment] = useState<PaymentScheduleData>(defaultPayment);
  const [savedCount] = useState<number>(getSavedCount);

  const calc = calculate(customer);

  const updateCustomer = (
    field: keyof CustomerData,
    value: string | number | boolean | undefined,
  ) => setCustomer((prev) => ({ ...prev, [field]: value }));
  const updateBank = (field: keyof BankDetails, value: string) =>
    setBank((prev) => ({ ...prev, [field]: value }));

  const handlePanelBrandChange = (brand: string) => {
    setCustomer((prev) => ({
      ...prev,
      panelBrand: brand,
      inverterBrand: INVERTER_BRANDS[brand] || brand.split(" ")[0],
    }));
  };

  const handleSystemTypeChange = (type: "ongrid" | "hybrid" | "offgrid") => {
    setCustomer((prev) => ({
      ...prev,
      systemType: type,
      batteryCapacityKWh: type !== "ongrid" ? prev.capacity : undefined,
      batteryBackupKWh: type !== "ongrid" ? prev.capacity : undefined,
      batteryQuantity: type !== "ongrid" ? 1 : prev.batteryQuantity,
    }));
  };

  const handleCapacityChange = (cap: number) => {
    setCustomer((prev) => ({
      ...prev,
      capacity: cap,
      batteryCapacityKWh: prev.systemType !== "ongrid" ? cap : undefined,
      batteryBackupKWh:
        prev.systemType !== "ongrid" ? cap : prev.batteryBackupKWh,
    }));
  };

  const handleGenerate = () => {
    if (!customer.name || !customer.capacity || !customer.salePrice) {
      alert("Please fill in customer name, capacity and project price.");
      return;
    }
    if (customer.isChannelPartner && !customer.channelPartnerName?.trim()) {
      alert("Please enter the channel partner company name.");
      return;
    }
    const effectiveSalePrice =
      customer.salePrice +
      (customer.capacity === 5 && customer.batteryBackupKWh === 10
        ? 160000
        : 0);
    const customerToSave = { ...customer, salePrice: effectiveSalePrice };
    onSave(customerToSave, bank);
    onGenerate(customerToSave, bank, payment);
  };

  const fieldClass =
    "w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400";
  const fieldStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(212,175,55,0.3)",
    color: "#ffffff",
    caretColor: "#ffffff",
  };
  const selectStyle = {
    background: "#1a2a45",
    border: "1px solid rgba(212,175,55,0.3)",
    color: "#ffffff",
  };
  const sectionStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(212,175,55,0.2)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
  };

  const advanceAmt = (customer.salePrice * 5) / 100;
  const preDispatchAmt = (customer.salePrice * 70) / 100;
  const afterInstallAmt = (customer.salePrice * 25) / 100;

  const selectedBrandName = customer.panelBrand.split(" ")[0];
  const inverterOptions = [selectedBrandName];

  const isHybridOrOffGrid =
    customer.systemType === "hybrid" || customer.systemType === "offgrid";
  const batteryKWh = customer.batteryBackupKWh ?? customer.capacity;

  // Effective price shown in live calculations
  const effectiveSalePrice =
    customer.salePrice +
    (customer.capacity === 5 && customer.batteryBackupKWh === 10 ? 160000 : 0);
  const hasBatteryUpgrade =
    customer.capacity === 5 && customer.batteryBackupKWh === 10;

  const systemTypeConfig: Record<
    "ongrid" | "hybrid" | "offgrid",
    { label: string; color: string; activeColor: string }
  > = {
    ongrid: { label: "On-Grid", color: "#22c55e", activeColor: "#22c55e" },
    hybrid: { label: "Hybrid", color: "#3b82f6", activeColor: "#1A4FA0" },
    offgrid: { label: "Off-Grid", color: "#f59e0b", activeColor: "#D97706" },
  };

  // Battery backup options for the selected capacity
  const getBatteryBackupOptions = () => {
    const cap = customer.capacity;
    if (cap === 5) {
      return [
        { value: 5, label: "5 kWh (Standard)" },
        { value: 10, label: "10 kWh (+₹1,60,000)" },
      ];
    }
    return [{ value: cap, label: `${cap} kWh (Fixed)` }];
  };

  const backupOptions = getBatteryBackupOptions();
  const isBackupFixed = backupOptions.length === 1;

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
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="SAS Solar"
            className="w-10 h-10 object-contain rounded-full"
          />
          <div>
            <div
              className="font-bold text-sm"
              style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
            >
              SHREE ADISHAKTI SOLAR PVT LTD
            </div>
            <div className="text-xs" style={{ color: "#a0b4c8" }}>
              Solar Quotation System
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="form.saved_quotations.button"
            onClick={onViewSaved}
            className="relative text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-80"
            style={{
              border: "1px solid rgba(212,175,55,0.5)",
              color: "#D4AF37",
              background: "rgba(212,175,55,0.08)",
            }}
          >
            Saved Quotations
            {savedCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center rounded-full text-white"
                style={{
                  background: "#22c55e",
                  fontSize: "9px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {savedCount > 99 ? "99+" : savedCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("sas_auth");
              window.location.reload();
            }}
            className="text-xs px-3 py-1 rounded"
            style={{
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#a0aec0",
            }}
          >
            Logout
          </button>
        </div>
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
                <Field
                  id="cust-consumer"
                  label="Consumer Number (Electricity Bill)"
                >
                  <input
                    id="cust-consumer"
                    data-ocid="form.consumer_number.input"
                    type="text"
                    value={customer.consumerNumber}
                    onChange={(e) =>
                      updateCustomer("consumerNumber", e.target.value)
                    }
                    className={fieldClass}
                    style={fieldStyle}
                    placeholder="e.g. 1234567890"
                  />
                </Field>

                {/* Channel Partner Toggle */}
                <div
                  style={{
                    borderTop: "1px solid rgba(212,175,55,0.15)",
                    paddingTop: "12px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        updateCustomer(
                          "isChannelPartner",
                          !customer.isChannelPartner,
                        )
                      }
                      style={{
                        width: "40px",
                        height: "22px",
                        borderRadius: "11px",
                        background: customer.isChannelPartner
                          ? "#D4AF37"
                          : "rgba(255,255,255,0.15)",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                        transition: "background 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "3px",
                          left: customer.isChannelPartner ? "21px" : "3px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#fff",
                          transition: "left 0.2s",
                        }}
                      />
                    </button>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: customer.isChannelPartner
                          ? "#D4AF37"
                          : "#a0b4c8",
                      }}
                    >
                      This proposal is for a Channel Partner
                    </span>
                  </div>

                  {customer.isChannelPartner && (
                    <div className="mt-3">
                      <Field
                        id="cp-name"
                        label="Channel Partner Company Name *"
                      >
                        <input
                          id="cp-name"
                          data-ocid="form.channel_partner_name.input"
                          type="text"
                          value={customer.channelPartnerName || ""}
                          onChange={(e) =>
                            updateCustomer("channelPartnerName", e.target.value)
                          }
                          className={fieldClass}
                          style={fieldStyle}
                          placeholder="e.g. S&Yes Consultant"
                        />
                      </Field>
                      {customer.channelPartnerName?.trim() && (
                        <div
                          className="text-xs mt-2 px-3 py-2 rounded"
                          style={{
                            background: "rgba(212,175,55,0.08)",
                            border: "1px solid rgba(212,175,55,0.25)",
                            color: "#D4AF37",
                          }}
                        >
                          ⭐ "{customer.channelPartnerName}" will appear as
                          Official Channel Partner on pages 1 &amp; 7
                        </div>
                      )}
                    </div>
                  )}
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
                {/* System Type Toggle */}
                <div>
                  <p
                    className="block text-xs mb-2 font-medium"
                    style={LABEL_STYLE}
                  >
                    System Type *
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid rgba(212,175,55,0.3)",
                    }}
                  >
                    {(["ongrid", "hybrid", "offgrid"] as const).map((type) => {
                      const cfg = systemTypeConfig[type];
                      const isActive = customer.systemType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          data-ocid={`form.system_type_${type}.toggle`}
                          onClick={() => handleSystemTypeChange(type)}
                          style={{
                            flex: 1,
                            padding: "8px 4px",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                            border: "none",
                            borderRight:
                              type !== "offgrid"
                                ? "1px solid rgba(212,175,55,0.3)"
                                : "none",
                            background: isActive
                              ? cfg.activeColor
                              : "rgba(255,255,255,0.03)",
                            color: isActive ? "#fff" : "#a0b4c8",
                            transition: "all 0.15s",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Battery Info Box — shown only for Hybrid/Off-Grid */}
                {isHybridOrOffGrid && (
                  <div
                    style={{
                      background: "rgba(26,79,160,0.15)",
                      border: "1px solid rgba(26,79,160,0.5)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                    }}
                  >
                    <p
                      style={{
                        color: "#60a5fa",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        margin: "0 0 6px",
                      }}
                    >
                      🔋 BATTERY STORAGE — LITHIUM ION
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "6px",
                        marginBottom: "6px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#a0b4c8",
                            fontSize: "9px",
                            margin: "0 0 1px",
                          }}
                        >
                          Battery Type
                        </p>
                        <p
                          style={{
                            color: "#93c5fd",
                            fontSize: "10px",
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          Lithium Ion (LiFePO4)
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#a0b4c8",
                            fontSize: "9px",
                            margin: "0 0 1px",
                          }}
                        >
                          Capacity
                        </p>
                        <p
                          style={{
                            color: "#93c5fd",
                            fontSize: "10px",
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          {batteryKWh} kWh
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#a0b4c8",
                            fontSize: "9px",
                            margin: "0 0 1px",
                          }}
                        >
                          Backup Duration
                        </p>
                        <p
                          style={{
                            color: "#93c5fd",
                            fontSize: "10px",
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          {batteryKWh >= customer.capacity
                            ? `${batteryKWh / customer.capacity} Hour${batteryKWh / customer.capacity > 1 ? "s" : ""} @ ${customer.capacity}kW Load`
                            : `1 Hour @ ${batteryKWh}kW Load`}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#a0b4c8",
                            fontSize: "9px",
                            margin: "0 0 1px",
                          }}
                        >
                          Warranty
                        </p>
                        <p
                          style={{
                            color: "#93c5fd",
                            fontSize: "10px",
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          5 Years
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(26,79,160,0.25)",
                        borderRadius: "5px",
                        padding: "6px 8px",
                        fontSize: "9px",
                        color: "#bfdbfe",
                        textAlign: "center",
                        fontWeight: 600,
                        marginBottom: "10px",
                      }}
                    >
                      {customer.capacity}kW System → {batteryKWh}kWh Lithium Ion
                      Battery →{" "}
                      {batteryKWh >= customer.capacity
                        ? `${batteryKWh / customer.capacity} Hour${batteryKWh / customer.capacity > 1 ? "s" : ""} Backup at ${customer.capacity}kW Load`
                        : `1 Hour Backup at ${batteryKWh}kW Load`}
                    </div>

                    {/* Battery Quantity Dropdown */}
                    <div style={{ marginBottom: "8px" }}>
                      <label
                        htmlFor="batt-qty"
                        style={{
                          color: "#a0b4c8",
                          fontSize: "9px",
                          display: "block",
                          marginBottom: "4px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Battery Quantity
                      </label>
                      <select
                        id="batt-qty"
                        data-ocid="form.battery_quantity.select"
                        value={customer.batteryQuantity ?? 1}
                        onChange={(e) =>
                          updateCustomer(
                            "batteryQuantity",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className={fieldClass}
                        style={{
                          ...selectStyle,
                          fontSize: "11px",
                          padding: "6px 10px",
                        }}
                      >
                        {[1, 2, 3, 4].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty} {qty === 1 ? "Battery" : "Batteries"}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Battery Backup Dropdown */}
                    <div>
                      <label
                        htmlFor="batt-backup"
                        style={{
                          color: "#a0b4c8",
                          fontSize: "9px",
                          display: "block",
                          marginBottom: "4px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Battery Backup
                      </label>
                      <select
                        id="batt-backup"
                        data-ocid="form.battery_backup.select"
                        value={customer.batteryBackupKWh ?? customer.capacity}
                        disabled={isBackupFixed}
                        onChange={(e) =>
                          updateCustomer(
                            "batteryBackupKWh",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className={fieldClass}
                        style={{
                          ...selectStyle,
                          fontSize: "11px",
                          padding: "6px 10px",
                          opacity: isBackupFixed ? 0.7 : 1,
                          cursor: isBackupFixed ? "not-allowed" : "pointer",
                        }}
                      >
                        {backupOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {hasBatteryUpgrade && (
                        <div
                          style={{
                            marginTop: "6px",
                            background: "rgba(212,175,55,0.12)",
                            border: "1px solid rgba(212,175,55,0.4)",
                            borderRadius: "5px",
                            padding: "5px 8px",
                            fontSize: "9px",
                            color: "#D4AF37",
                            fontWeight: 600,
                          }}
                        >
                          ⚡ Extra 5kWh backup: +₹1,60,000 added to total price
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Field id="sys-capacity" label="Solar Capacity (kW) *">
                    <select
                      id="sys-capacity"
                      data-ocid="form.capacity.select"
                      value={customer.capacity}
                      onChange={(e) =>
                        handleCapacityChange(Number.parseInt(e.target.value))
                      }
                      className={fieldClass}
                      style={selectStyle}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((kw) => (
                        <option key={kw} value={kw}>
                          {kw} kW
                        </option>
                      ))}
                    </select>
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

            {/* Panel & Inverter Selection */}
            <div style={sectionStyle}>
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#FF6B35" }}
              >
                PANEL & INVERTER SELECTION
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field id="panel-brand" label="Solar Panel Brand">
                    <select
                      id="panel-brand"
                      value={customer.panelBrand}
                      onChange={(e) => handlePanelBrandChange(e.target.value)}
                      className={fieldClass}
                      style={selectStyle}
                    >
                      {PANEL_BRANDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="panel-wattage" label="Panel Wattage (Wp)">
                    <select
                      id="panel-wattage"
                      value={customer.panelWattage}
                      onChange={(e) =>
                        updateCustomer(
                          "panelWattage",
                          Number.parseInt(e.target.value),
                        )
                      }
                      className={fieldClass}
                      style={selectStyle}
                    >
                      {PANEL_WATTAGES.map((w) => (
                        <option key={w} value={w}>
                          {w} Wp
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field id="inverter-brand" label="Inverter Brand">
                  <select
                    id="inverter-brand"
                    value={customer.inverterBrand}
                    onChange={(e) =>
                      updateCustomer("inverterBrand", e.target.value)
                    }
                    className={fieldClass}
                    style={selectStyle}
                  >
                    {inverterOptions.map((b) => (
                      <option key={b} value={b}>
                        {b} Inverter
                      </option>
                    ))}
                  </select>
                </Field>
                <div
                  className="text-xs p-2 rounded"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    color: "#a0b4c8",
                    border: "1px solid rgba(212,175,55,0.15)",
                  }}
                >
                  Selected:{" "}
                  <span style={{ color: "#D4AF37" }}>
                    {customer.panelBrand} {customer.panelWattage}Wp Bifacial
                    Panel
                  </span>{" "}
                  +
                  <span style={{ color: "#D4AF37" }}>
                    {" "}
                    {customer.inverterBrand} Inverter
                  </span>
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
            {/* UPI QR Code Upload */}
            <div style={sectionStyle}>
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#FF6B35" }}
              >
                UPI QR CODE
              </h3>
              <p className="text-xs mb-3" style={{ color: "#a0b4c8" }}>
                UPI QR code is permanently set. You can replace it by uploading
                a new image (JPG/PNG).
              </p>
              <div className="flex items-center gap-3">
                <input
                  id="qr-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const result = ev.target?.result;
                        if (typeof result === "string") onQrUpload(result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <button
                  type="button"
                  data-ocid="form.qr.upload_button"
                  onClick={() => document.getElementById("qr-upload")?.click()}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: "rgba(255,107,53,0.15)",
                    border: "1px solid rgba(255,107,53,0.4)",
                    color: "#FF6B35",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Replace QR Code
                </button>
                <img
                  src={upiQrImage}
                  alt="UPI QR Code"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </div>
            </div>

            {/* Payment Schedule - Fixed */}
            <div style={sectionStyle}>
              <h3
                className="text-sm font-bold mb-4 tracking-wider"
                style={{ color: "#FF6B35" }}
              >
                PAYMENT SCHEDULE (Fixed)
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Advance / Booking", pct: 5, amt: advanceAmt },
                  {
                    label: "Pre-Dispatch of Material (70%)",
                    pct: 70,
                    amt: preDispatchAmt,
                  },
                  {
                    label: "After Installation",
                    pct: 25,
                    amt: afterInstallAmt,
                  },
                ].map(({ label, pct, amt }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2 px-3 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(212,175,55,0.15)",
                    }}
                  >
                    <span className="text-xs" style={{ color: "#a0b4c8" }}>
                      {label}
                    </span>
                    <div className="text-right">
                      <span
                        className="text-sm font-bold mr-2"
                        style={{ color: "#D4AF37" }}
                      >
                        {pct}%
                      </span>
                      <span className="text-xs" style={{ color: "#68d391" }}>
                        {formatINR(amt)}
                      </span>
                    </div>
                  </div>
                ))}
                <div
                  className="flex items-center justify-between py-2 px-3 rounded-lg"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.4)",
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#D4AF37" }}
                  >
                    TOTAL
                  </span>
                  <div className="text-right">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#68d391" }}
                    >
                      100% &nbsp;
                    </span>
                    <span className="text-xs" style={{ color: "#68d391" }}>
                      {formatINR(customer.salePrice)}
                    </span>
                  </div>
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
                    `${getDailyGenerationRange(customer.capacity)} units/day`,
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
                {/* Battery upgrade price line */}
                {hasBatteryUpgrade && (
                  <div
                    className="flex justify-between items-center py-1"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      borderTop: "1px solid rgba(212,175,55,0.2)",
                      paddingTop: "6px",
                    }}
                  >
                    <span className="text-xs" style={{ color: "#60a5fa" }}>
                      Effective Price (with battery upgrade)
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#60a5fa" }}
                    >
                      {formatINR(effectiveSalePrice)}
                    </span>
                  </div>
                )}
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
