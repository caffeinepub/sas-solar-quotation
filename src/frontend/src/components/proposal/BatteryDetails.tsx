import type { CustomerData } from "../../types";
import PageHeader from "./PageHeader";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";
const AMBER = "#b45309";
const AMBER_LIGHT = "#fef3c7";

const ALL_LITHIUM_BRANDS = [
  {
    name: "Tata Power",
    type: "Lithium Ion (LiFePO4)",
    icon: "⚡",
    key: "tata",
  },
  {
    name: "Waree Energies",
    type: "Lithium Ion (LiFePO4)",
    icon: "⚡",
    key: "waree",
  },
  {
    name: "Adani Solar",
    type: "Lithium Ion (LiFePO4)",
    icon: "⚡",
    key: "adani",
  },
  {
    name: "Luminous",
    type: "Lithium Ion (LiFePO4)",
    icon: "⚡",
    key: "luminous",
  },
  {
    name: "Havells",
    type: "Lithium Ion (LiFePO4)",
    icon: "⚡",
    key: "havells",
  },
  { name: "Exide", type: "Lithium Ion (LiFePO4)", icon: "⚡", key: "exide" },
];

const LEAD_ACID_BRANDS = [
  { name: "Exide", type: "Lead Acid (Tubular/VRLA)", icon: "🔋" },
  { name: "Luminous", type: "Lead Acid (Tubular/VRLA)", icon: "🔋" },
  { name: "Amaron", type: "Lead Acid (Tubular/VRLA)", icon: "🔋" },
  { name: "Su-Kam", type: "Lead Acid (Tubular/VRLA)", icon: "🔋" },
  { name: "Okaya", type: "Lead Acid (Tubular/VRLA)", icon: "🔋" },
];

const LI_ION_ADVANTAGES = [
  "Longer cycle life — 3000+ charge/discharge cycles",
  "Lightweight and compact design",
  "Fast charging capability",
  "Zero maintenance required",
  "Built-in BMS (Battery Management System) protection",
  "High efficiency — 95%+ round-trip efficiency",
  "No memory effect — partial charging is safe",
  "Wide operating temperature range",
];

const LEAD_ACID_POINTS = [
  "Proven and reliable technology",
  "Cost-effective for budget installations",
  "Widely available across India",
  "Easy to replace locally",
  "Available in multiple capacity options",
  "Suitable for moderate backup needs",
  "Recyclable and environment-friendly",
  "Compatible with all solar inverters",
];

interface Props {
  customer: CustomerData;
}

// Returns battery brands with the panel-matched brand first
function getLithiumBrands(panelBrand: string) {
  const brand = panelBrand.toLowerCase();
  let matchKey = "tata"; // default
  if (brand.includes("waree")) matchKey = "waree";
  else if (brand.includes("adani")) matchKey = "adani";
  const matched = ALL_LITHIUM_BRANDS.find((b) => b.key === matchKey);
  const rest = ALL_LITHIUM_BRANDS.filter((b) => b.key !== matchKey);
  return matched ? [matched, ...rest] : ALL_LITHIUM_BRANDS;
}

export default function BatteryDetails({ customer }: Props) {
  const systemKW = customer.capacity;
  const isLeadAcid = customer.batteryType === "lead_acid";
  const lithiumBrands = getLithiumBrands(customer.panelBrand || "");

  // Lithium Ion values
  const backupKWh = customer.batteryBackupKWh ?? systemKW;
  const qty =
    customer.batteryQuantity && customer.batteryQuantity > 1
      ? customer.batteryQuantity
      : 1;
  const backupHours = backupKWh / systemKW;
  const totalKWh = backupKWh * qty;

  // Lead Acid values
  const laAH = customer.leadAcidCapacityAH ?? 150;
  const laQty = customer.batteryQuantity ?? 1;
  const laTotalAH = laAH * laQty;
  const laTotalVoltage = laQty * 12;

  const systemLabel =
    customer.systemType === "hybrid"
      ? "HYBRID SOLAR SYSTEM"
      : "OFF-GRID SOLAR SYSTEM";

  // ─── Lithium Ion Specs ───────────────────────────────────────────────────────
  const lithiumSpecs = [
    { label: "Battery Type", value: "Lithium Ion (LiFePO4)", highlight: true },
    { label: "Capacity", value: `${backupKWh} kWh`, highlight: true },
    {
      label: "Backup Duration",
      value: `${backupHours} Hour${backupHours > 1 ? "s" : ""} at ${systemKW}kW Full Load`,
      highlight: true,
    },
    ...(qty > 1
      ? [
          {
            label: "Quantity",
            value: `${qty}x Batteries (${totalKWh} kWh Total)`,
            highlight: true,
          },
        ]
      : []),
    { label: "Voltage", value: "48V Nominal", highlight: false },
    { label: "Warranty", value: "5 Years", highlight: false },
    { label: "Protection", value: "Built-in BMS", highlight: false },
    {
      label: "Technology",
      value: "Lithium Iron Phosphate (LiFePO4)",
      highlight: false,
    },
    { label: "Efficiency", value: "\u2265 95% Round-Trip", highlight: false },
  ];

  // ─── Lead Acid Specs ─────────────────────────────────────────────────────────
  const leadAcidSpecs = [
    {
      label: "Battery Type",
      value: "Lead Acid (VRLA/Tubular)",
      highlight: true,
    },
    { label: "Capacity", value: `${laAH} AH`, highlight: true },
    { label: "Quantity", value: `${laQty}x Batteries`, highlight: true },
    { label: "Voltage", value: "12V per Battery", highlight: false },
    { label: "Warranty", value: "2 Years", highlight: false },
    { label: "Technology", value: "Tubular / VRLA", highlight: false },
    { label: "Maintenance", value: "Every 3–6 months", highlight: false },
  ];

  if (isLeadAcid) {
    // ═══════════════════════════════════════════════════════════════════════════
    //  LEAD ACID RENDER
    // ═══════════════════════════════════════════════════════════════════════════
    return (
      <div className="a4-page" style={{ fontSize: "10px" }}>
        <PageHeader
          title="Battery Storage System Details"
          subtitle="Lead Acid Battery Specifications"
        />

        {/* System type badge */}
        <div
          style={{
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              background: GREEN,
              color: "#fff",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "1.5px",
              padding: "5px 14px",
              borderRadius: "20px",
            }}
          >
            🔋 {systemLabel}
          </div>
          <div
            style={{
              background: AMBER_LIGHT,
              color: AMBER,
              fontWeight: 700,
              fontSize: "10px",
              padding: "5px 14px",
              borderRadius: "20px",
              border: `1px solid ${AMBER}`,
            }}
          >
            LEAD ACID BATTERY
          </div>
          {laQty > 1 && (
            <div
              style={{
                background: "#E8F0FA",
                color: BLUE,
                fontWeight: 700,
                fontSize: "10px",
                padding: "5px 14px",
                borderRadius: "20px",
                border: `1px solid ${BLUE}`,
              }}
            >
              {laQty}x BATTERIES
            </div>
          )}
        </div>

        {/* Main layout: specs table + capacity info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          {/* Battery Specs Table */}
          <div>
            <p
              style={{
                color: GREEN,
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              BATTERY SPECIFICATIONS
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "9px",
              }}
            >
              <tbody>
                {leadAcidSpecs.map((s, i) => (
                  <tr
                    key={s.label}
                    style={{
                      background: i % 2 === 0 ? "#fef3c7" : "#fff",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <td
                      style={{
                        padding: "5px 8px",
                        color: "#4a5568",
                        fontWeight: 600,
                        width: "45%",
                      }}
                    >
                      {s.label}
                    </td>
                    <td
                      style={{
                        padding: "5px 8px",
                        color: s.highlight ? AMBER : "#1A1A1A",
                        fontWeight: s.highlight ? 700 : 500,
                      }}
                    >
                      {s.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Capacity Info Box */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                background: AMBER,
                borderRadius: "8px",
                padding: "12px",
                color: "#fff",
              }}
            >
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  margin: "0 0 8px",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                BATTERY BANK DETAILS
              </p>
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  padding: "10px",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    margin: "0 0 2px",
                    color: "#fff",
                  }}
                >
                  Total Capacity: {laTotalAH} AH
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    margin: "0 0 4px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  System Voltage: {laTotalVoltage}V
                </p>
                <p
                  style={{
                    fontSize: "8.5px",
                    margin: 0,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  Actual backup depends on load and discharge depth
                </p>
              </div>
              <p
                style={{
                  fontSize: "8.5px",
                  margin: 0,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: "1.5",
                }}
              >
                Each battery is 12V / {laAH}AH. {laQty} batteries connected for
                a {laTotalAH}AH @ {laTotalVoltage}V bank.
              </p>
              <div
                style={{
                  marginTop: "8px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    margin: "0 0 2px",
                    color: "#fff",
                  }}
                >
                  {laQty}x {laAH}AH @ 12V = {laTotalAH}AH Total
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    margin: 0,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  DOD 50% recommended for longer battery life
                </p>
              </div>
            </div>

            <div
              style={{
                background: AMBER_LIGHT,
                border: `2px solid ${AMBER}`,
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: AMBER,
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  margin: "0 0 4px",
                }}
              >
                SYSTEM SUMMARY
              </p>
              <p
                style={{
                  color: "#1A1A1A",
                  fontFamily: "Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  margin: "0 0 2px",
                }}
              >
                {systemKW}kW
              </p>
              <p
                style={{
                  color: AMBER,
                  fontSize: "10px",
                  fontWeight: 600,
                  margin: "0 0 4px",
                }}
              >
                Off-Grid System
              </p>
              <div
                style={{ borderTop: `1px solid ${AMBER}33`, paddingTop: "6px" }}
              >
                <p
                  style={{
                    color: BLUE,
                    fontSize: "9px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {laQty}x {laAH}AH Lead Acid Batteries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Battery Brands Section */}
        <div style={{ marginBottom: "12px" }}>
          <p
            style={{
              color: BLUE,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
              margin: "0 0 8px",
            }}
          >
            APPROVED BATTERY BRANDS WE SUPPLY
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "6px",
              marginBottom: "6px",
            }}
          >
            {LEAD_ACID_BRANDS.map((brand) => (
              <div
                key={brand.name}
                style={{
                  background: "#f8fafc",
                  border: `1px solid ${AMBER}33`,
                  borderRadius: "6px",
                  padding: "8px 6px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "16px", marginBottom: "4px" }}>
                  {brand.icon}
                </div>
                <p
                  style={{
                    color: AMBER,
                    fontWeight: 700,
                    fontSize: "9px",
                    margin: "0 0 2px",
                  }}
                >
                  {brand.name}
                </p>
                <p style={{ color: "#4a5568", fontSize: "8px", margin: 0 }}>
                  {brand.type}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{
              color: "#7a8898",
              fontSize: "8.5px",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            * Brand selection as per availability and customer preference
          </p>
        </div>

        {/* Lead Acid Key Points */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div
            style={{ background: AMBER, borderRadius: "8px", padding: "10px" }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              LEAD ACID BATTERY — KEY POINTS
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {LEAD_ACID_POINTS.map((pt) => (
                <li
                  key={pt}
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "flex-start",
                    padding: "2px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      color: "#FDE68A",
                      fontSize: "10px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      color: "#e2e8f0",
                      fontSize: "9px",
                      lineHeight: "1.5",
                    }}
                  >
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                background: AMBER_LIGHT,
                border: `1px solid ${AMBER}`,
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <p
                style={{
                  color: AMBER,
                  fontSize: "9px",
                  fontWeight: 700,
                  margin: "0 0 6px",
                }}
              >
                BATTERY WARRANTY TERMS
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "14px",
                  color: AMBER,
                  fontSize: "9px",
                  lineHeight: "1.7",
                }}
              >
                <li>2-Year comprehensive battery warranty</li>
                <li>Service check every 6 months</li>
                <li>Electrolyte level check and topping up</li>
                <li>Replacement support within warranty period</li>
              </ul>
            </div>
            <div
              style={{
                background: "#fffbf0",
                border: "1px solid #D4AF37",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <p
                style={{
                  color: "#7a6a3a",
                  fontSize: "9px",
                  fontWeight: 700,
                  margin: "0 0 4px",
                }}
              >
                IMPORTANT NOTE
              </p>
              <p
                style={{
                  color: "#4a5568",
                  fontSize: "8.5px",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Lead Acid batteries require regular maintenance every 3–6
                months. Actual backup duration depends on discharge depth (DOD
                50% recommended for longer battery life). Overcharging and deep
                discharge should be avoided to maximise battery lifespan.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  LITHIUM ION RENDER (unchanged)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="a4-page" style={{ fontSize: "10px" }}>
      <PageHeader
        title="Battery Storage System Details"
        subtitle="Lithium Ion Battery Specifications & Backup Calculation"
      />

      {/* System type badge */}
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            background: customer.systemType === "hybrid" ? BLUE : GREEN,
            color: "#fff",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "1.5px",
            padding: "5px 14px",
            borderRadius: "20px",
          }}
        >
          🔋 {systemLabel}
        </div>
        <div
          style={{
            background: "#E8F5EE",
            color: GREEN,
            fontWeight: 700,
            fontSize: "10px",
            padding: "5px 14px",
            borderRadius: "20px",
            border: `1px solid ${GREEN}`,
          }}
        >
          LITHIUM ION BATTERY
        </div>
        {qty > 1 && (
          <div
            style={{
              background: "#E8F0FA",
              color: BLUE,
              fontWeight: 700,
              fontSize: "10px",
              padding: "5px 14px",
              borderRadius: "20px",
              border: `1px solid ${BLUE}`,
            }}
          >
            {qty}x BATTERIES
          </div>
        )}
      </div>

      {/* Main layout: specs table + backup calc */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        {/* Battery Specs Table */}
        <div>
          <p
            style={{
              color: GREEN,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
              margin: "0 0 6px",
            }}
          >
            BATTERY SPECIFICATIONS
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "9px",
            }}
          >
            <tbody>
              {lithiumSpecs.map((s, i) => (
                <tr
                  key={s.label}
                  style={{
                    background: i % 2 === 0 ? "#E8F5EE" : "#fff",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <td
                    style={{
                      padding: "5px 8px",
                      color: "#4a5568",
                      fontWeight: 600,
                      width: "45%",
                    }}
                  >
                    {s.label}
                  </td>
                  <td
                    style={{
                      padding: "5px 8px",
                      color: s.highlight ? BLUE : "#1A1A1A",
                      fontWeight: s.highlight ? 700 : 500,
                    }}
                  >
                    {s.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Backup Calculation Box */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              background: BLUE,
              borderRadius: "8px",
              padding: "12px",
              color: "#fff",
            }}
          >
            <p
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 8px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              BATTERY BACKUP CALCULATION
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "6px",
                padding: "10px",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  margin: "0 0 4px",
                  color: "#fff",
                }}
              >
                {systemKW}kW Load × {backupHours} Hour
                {backupHours > 1 ? "s" : ""} = {backupKWh}kWh
              </p>
              <p
                style={{
                  fontSize: "9px",
                  margin: 0,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Battery capacity required
              </p>
            </div>
            <p
              style={{
                fontSize: "8.5px",
                margin: 0,
                color: "rgba(255,255,255,0.85)",
                lineHeight: "1.5",
              }}
            >
              Each 1kW of system load requires 1kWh of battery capacity for 1
              hour of backup.
            </p>
            <div
              style={{
                marginTop: "8px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "6px",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  margin: "0 0 2px",
                  color: "#fff",
                }}
              >
                {systemKW}kW System → {backupKWh}kWh Battery
                {qty > 1 ? ` × ${qty}` : ""}
              </p>
              <p
                style={{
                  fontSize: "9px",
                  margin: 0,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                → {backupHours} Hour{backupHours > 1 ? "s" : ""} Backup at{" "}
                {systemKW}kW Load
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#E8F5EE",
              border: `2px solid ${GREEN}`,
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: GREEN,
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 4px",
              }}
            >
              SYSTEM SUMMARY
            </p>
            <p
              style={{
                color: "#1A1A1A",
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                fontWeight: 700,
                margin: "0 0 2px",
              }}
            >
              {systemKW}kW
            </p>
            <p
              style={{
                color: GREEN,
                fontSize: "10px",
                fontWeight: 600,
                margin: "0 0 4px",
              }}
            >
              {systemLabel.split(" ").slice(0, 1).join(" ")} System
            </p>
            <div
              style={{ borderTop: `1px solid ${GREEN}33`, paddingTop: "6px" }}
            >
              <p
                style={{
                  color: BLUE,
                  fontSize: "9px",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {qty > 1
                  ? `${qty}x ${backupKWh}kWh Lithium Ion Batteries (${totalKWh}kWh Total)`
                  : `${backupKWh} kWh Lithium Ion Battery`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Battery Brands Section */}
      <div style={{ marginBottom: "12px" }}>
        <p
          style={{
            color: BLUE,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "1px",
            margin: "0 0 8px",
          }}
        >
          APPROVED BATTERY BRANDS WE SUPPLY
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "6px",
            marginBottom: "6px",
          }}
        >
          {lithiumBrands.map((brand) => (
            <div
              key={brand.name}
              style={{
                background: "#f8fafc",
                border: `1px solid ${GREEN}33`,
                borderRadius: "6px",
                padding: "8px 6px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "16px", marginBottom: "4px" }}>
                {brand.icon}
              </div>
              <p
                style={{
                  color: GREEN,
                  fontWeight: 700,
                  fontSize: "9px",
                  margin: "0 0 2px",
                }}
              >
                {brand.name}
              </p>
              <p style={{ color: "#4a5568", fontSize: "8px", margin: 0 }}>
                {brand.type}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            color: "#7a8898",
            fontSize: "8.5px",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          * Brand selection as per availability and customer preference
        </p>
      </div>

      {/* Lithium Ion Advantages */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <div
          style={{ background: GREEN, borderRadius: "8px", padding: "10px" }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
              margin: "0 0 6px",
            }}
          >
            WHY LITHIUM ION? — KEY ADVANTAGES
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {LI_ION_ADVANTAGES.map((adv) => (
              <li
                key={adv}
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "flex-start",
                  padding: "2px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{ color: "#7FFF7F", fontSize: "10px", flexShrink: 0 }}
                >
                  ✓
                </span>
                <span
                  style={{
                    color: "#e2e8f0",
                    fontSize: "9px",
                    lineHeight: "1.5",
                  }}
                >
                  {adv}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              background: "#E8F0FA",
              border: `1px solid ${BLUE}`,
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <p
              style={{
                color: BLUE,
                fontSize: "9px",
                fontWeight: 700,
                margin: "0 0 6px",
              }}
            >
              BATTERY WARRANTY TERMS
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: "14px",
                color: BLUE,
                fontSize: "9px",
                lineHeight: "1.7",
              }}
            >
              <li>5-Year comprehensive battery warranty</li>
              <li>Quarterly health check and cell balancing</li>
              <li>BMS diagnostics included in AMC</li>
              <li>Replacement support within warranty period</li>
            </ul>
          </div>
          <div
            style={{
              background: "#fffbf0",
              border: "1px solid #D4AF37",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <p
              style={{
                color: "#7a6a3a",
                fontSize: "9px",
                fontWeight: 700,
                margin: "0 0 4px",
              }}
            >
              IMPORTANT NOTE
            </p>
            <p
              style={{
                color: "#4a5568",
                fontSize: "8.5px",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              Battery backup is calculated at full load ({systemKW}kW). Actual
              backup duration increases significantly at partial loads. For 50%
              load, expected backup doubles to approximately {backupHours * 2}{" "}
              hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
