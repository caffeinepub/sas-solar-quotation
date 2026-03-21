import type { Calculations, CustomerData } from "../../types";
import { formatINR } from "../../utils/calculations";
import PageHeader from "./PageHeader";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

export default function FinancialAndSpecs({
  customer,
  calc,
}: { customer: CustomerData; calc: Calculations }) {
  const years = [1, 5, 10, 15, 20, 25];

  const kw = customer.capacity;
  const panels = Math.ceil((kw * 1000) / 545);
  const dailyGen = (kw * 3.5).toFixed(1);
  const monthlyGen = (kw * 3.5 * 30).toFixed(0);
  const annualGen = (kw * 3.5 * 365).toFixed(0);

  const components = [
    {
      name: "Solar PV Modules",
      spec: "545W Mono PERC Half-Cut",
      qty: `${panels} Nos`,
      hsn: "85414011",
    },
    {
      name: "Solar Grid-Tie Inverter",
      spec: `${kw}kW String Inverter`,
      qty: "1 No",
      hsn: "85044090",
    },
    {
      name: "Mounting Structure",
      spec: "Hot-Dip Galvanized MS Structure",
      qty: "1 Set",
      hsn: "73089090",
    },
    {
      name: "DC Solar Cables",
      spec: "4mm² XLPE Solar DC Cable",
      qty: "As Reqd",
      hsn: "85444290",
    },
    {
      name: "AC Power Cables",
      spec: "6mm² FR PVC Cable",
      qty: "As Reqd",
      hsn: "85444290",
    },
    {
      name: "DC Junction Box / BOS",
      spec: "IP65 with SPD & Fuse",
      qty: "1 Set",
      hsn: "85369090",
    },
    {
      name: "Net / Bidirectional Meter",
      spec: "DISCOM Approved",
      qty: "1 No",
      hsn: "-",
    },
    {
      name: "Earthing & Lightning",
      spec: "GI/Copper System + LA",
      qty: "1 Set",
      hsn: "-",
    },
  ];

  return (
    <div className="a4-page">
      <PageHeader
        title="Financial Analysis & System Specifications"
        subtitle="ROI, Projections & Technical Details"
      />

      {/* ─── FINANCIAL ANALYSIS ─── */}
      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "6px",
          marginBottom: "12px",
        }}
      >
        {[
          ["Project Cost", formatINR(customer.salePrice), GREEN],
          ["Total Subsidy", formatINR(calc.totalSubsidy), BLUE],
          ["Net Investment", formatINR(calc.netCost), "#c05621"],
          ["Annual Savings", formatINR(calc.annualSavings), "#276749"],
          ["Payback", `${calc.paybackYears.toFixed(1)} yrs`, "#2b6cb0"],
        ].map(([label, val, color]) => (
          <div
            key={label}
            style={{
              textAlign: "center",
              padding: "8px 4px",
              borderRadius: "6px",
              background: "#f8fafc",
              borderBottom: `3px solid ${color}`,
            }}
          >
            <p
              style={{
                color: "#7a8898",
                fontSize: "8px",
                margin: "0 0 3px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {label}
            </p>
            <p
              style={{
                color,
                fontSize: "11px",
                fontWeight: 700,
                margin: 0,
                fontFamily: "Georgia, serif",
              }}
            >
              {val}
            </p>
          </div>
        ))}
      </div>

      {/* Subsidy + 25yr table side by side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            background: "#E8F5EE",
            border: `1px solid ${GREEN}`,
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <p
            style={{
              color: GREEN,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
              margin: "0 0 6px",
            }}
          >
            SUBSIDY BREAKDOWN
          </p>
          {[
            ["Central Subsidy (PM Surya Ghar)", formatINR(calc.centralSubsidy)],
            ["Odisha State Subsidy", formatINR(calc.stateSubsidy)],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "3px 0",
                borderBottom: "1px solid #c6e8d5",
              }}
            >
              <span style={{ color: "#2d3748", fontSize: "10px" }}>{k}</span>
              <span style={{ color: GREEN, fontWeight: 600, fontSize: "10px" }}>
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 0 0",
            }}
          >
            <span
              style={{ color: "#1A1A1A", fontSize: "11px", fontWeight: 700 }}
            >
              Total Subsidy
            </span>
            <span style={{ color: GREEN, fontWeight: 700, fontSize: "11px" }}>
              {formatINR(calc.totalSubsidy)}
            </span>
          </div>
          <div
            style={{
              marginTop: "10px",
              paddingTop: "8px",
              borderTop: `1px solid ${GREEN}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: BLUE, fontSize: "10px", fontWeight: 700 }}>
                25yr ROI
              </span>
              <span style={{ color: BLUE, fontSize: "12px", fontWeight: 700 }}>
                {calc.roi25Year.toFixed(0)}%
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4px",
              }}
            >
              <span
                style={{ color: "#c05621", fontSize: "10px", fontWeight: 700 }}
              >
                Payback
              </span>
              <span
                style={{ color: "#c05621", fontSize: "12px", fontWeight: 700 }}
              >
                {calc.paybackYears.toFixed(1)} yrs
              </span>
            </div>
          </div>
        </div>

        <div>
          <p
            style={{
              color: "#1A1A1A",
              fontSize: "9px",
              fontWeight: 700,
              margin: "0 0 6px",
              letterSpacing: "1px",
            }}
          >
            25-YEAR PROJECTION
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "9px",
            }}
          >
            <thead>
              <tr style={{ background: GREEN }}>
                {[
                  "Year",
                  "Cumulative Savings",
                  "Net Investment",
                  "Net Profit",
                  "ROI",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "5px 6px",
                      color: "#fff",
                      textAlign: "right",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map((y, i) => {
                const cumSavings = calc.annualSavings * y;
                const netProfit = cumSavings - calc.netCost;
                const roi =
                  calc.netCost > 0 ? (netProfit / calc.netCost) * 100 : 0;
                return (
                  <tr
                    key={y}
                    style={{ background: i % 2 === 0 ? "#E8F5EE" : "#fff" }}
                  >
                    <td
                      style={{
                        padding: "4px 6px",
                        color: GREEN,
                        fontWeight: 600,
                      }}
                    >
                      Year {y}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        textAlign: "right",
                        color: "#2d3748",
                      }}
                    >
                      {formatINR(cumSavings)}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        textAlign: "right",
                        color: "#2d3748",
                      }}
                    >
                      {formatINR(calc.netCost)}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        textAlign: "right",
                        fontWeight: 600,
                        color: netProfit >= 0 ? "#276749" : "#c53030",
                      }}
                    >
                      {netProfit >= 0 ? "+" : ""}
                      {formatINR(netProfit)}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        textAlign: "right",
                        color: roi >= 0 ? "#276749" : "#c53030",
                      }}
                    >
                      {roi.toFixed(0)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── SYSTEM SPECIFICATIONS ─── */}
      <div style={{ borderTop: `2px solid ${BLUE}`, paddingTop: "10px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{ background: BLUE, borderRadius: "6px", padding: "10px" }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              SYSTEM PARAMETERS
            </p>
            {[
              ["Installed Capacity", `${kw} kWp`],
              ["Panel Technology", "Mono PERC Half-Cut (545W)"],
              ["Number of Panels", `${panels} Nos`],
              ["Daily Generation", `${dailyGen} kWh/day`],
              ["Monthly Generation", `${monthlyGen} kWh/month`],
              ["Annual Generation", `${annualGen} kWh/year`],
              ["Module Warranty", "25 Years Performance"],
              ["Inverter Warranty", "7 Years Product"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: "9px" }}
                >
                  {k}
                </span>
                <span
                  style={{ color: "#fff", fontSize: "9px", fontWeight: 500 }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#E8F0FA",
              borderRadius: "6px",
              padding: "10px",
              border: `1px solid ${BLUE}33`,
            }}
          >
            <p
              style={{
                color: BLUE,
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              GENERATION SUMMARY
            </p>
            {[
              ["Daily", `${dailyGen} kWh`, GREEN],
              ["Monthly", `${monthlyGen} kWh`, BLUE],
              ["Annual", `${annualGen} kWh`, "#276749"],
            ].map(([label, val, color]) => (
              <div
                key={label}
                style={{
                  padding: "6px 8px",
                  borderRadius: "5px",
                  background: "#fff",
                  marginBottom: "6px",
                  border: `2px solid ${color}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#2d3748", fontSize: "10px" }}>
                  {label} Generation
                </span>
                <span style={{ color, fontSize: "13px", fontWeight: 700 }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Components table */}
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: "9px" }}
        >
          <thead>
            <tr style={{ background: GREEN }}>
              {["#", "Component", "Specification", "Qty", "HSN"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "5px 6px",
                    color: "#fff",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {components.map((c, i) => (
              <tr
                key={c.name}
                style={{ background: i % 2 === 0 ? "#E8F5EE" : "#fff" }}
              >
                <td style={{ padding: "4px 6px", color: "#7a8898" }}>
                  {i + 1}
                </td>
                <td
                  style={{
                    padding: "4px 6px",
                    color: "#1A1A1A",
                    fontWeight: 600,
                  }}
                >
                  {c.name}
                </td>
                <td style={{ padding: "4px 6px", color: "#4a5568" }}>
                  {c.spec}
                </td>
                <td
                  style={{
                    padding: "4px 6px",
                    color: "#2d3748",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.qty}
                </td>
                <td style={{ padding: "4px 6px", color: "#7a8898" }}>
                  {c.hsn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
