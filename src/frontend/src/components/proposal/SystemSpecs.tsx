import type { CustomerData } from "../../types";
import PageHeader from "./PageHeader";

export default function SystemSpecs({ customer }: { customer: CustomerData }) {
  const kw = customer.capacity;
  const panels = Math.ceil((kw * 1000) / 545);
  const dailyGen = (kw * 4.5).toFixed(1);
  const monthlyGen = (kw * 4.5 * 30).toFixed(0);
  const annualGen = (kw * 4.5 * 365).toFixed(0);

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
      qty: "As Required",
      hsn: "85444290",
    },
    {
      name: "AC Power Cables",
      spec: "6mm² FR PVC Cable",
      qty: "As Required",
      hsn: "85444290",
    },
    {
      name: "DC Junction Box / BOS",
      spec: "IP65 Junction Box with SPD & Fuse",
      qty: "1 Set",
      hsn: "85369090",
    },
    {
      name: "Net / Bidirectional Meter",
      spec: "DISCOM Approved Bidirectional Energy Meter",
      qty: "1 No",
      hsn: "-",
    },
    {
      name: "Earthing Kit",
      spec: "Complete GI/Copper Earthing System",
      qty: "1 Set",
      hsn: "-",
    },
    {
      name: "Lightning Arrester",
      spec: "LA with GI Strip & Earth Pit",
      qty: "1 Set",
      hsn: "-",
    },
    {
      name: "Safety Accessories",
      spec: "MC4 Connectors, Cable Ties, Conduit",
      qty: "As Required",
      hsn: "-",
    },
  ];

  const params = [
    ["System Type", "Grid-Tied On-Grid Solar Power System"],
    ["Installed Capacity", `${kw} kWp`],
    ["Location", "Odisha, India"],
    ["Panel Technology", "Mono PERC Half-Cut (545W)"],
    ["Number of Panels", `${panels} Nos`],
    ["Daily Generation", `${dailyGen} kWh / day`],
    ["Monthly Generation", `${monthlyGen} kWh / month`],
    ["Annual Generation", `${annualGen} kWh / year`],
    ["Plant Load Factor", "~19%"],
    ["System Efficiency", "~80%"],
    ["Avg Peak Sun Hours", "5.5 hrs/day (Odisha)"],
    ["Module Warranty", "25 Years Performance"],
    ["Inverter Warranty", "7 Years Product"],
  ];

  return (
    <div className="a4-page">
      <PageHeader
        title="System Specifications"
        subtitle="Technical Details & Components"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            background: "#0A1628",
            borderRadius: "10px",
            padding: "14px",
          }}
        >
          <p
            style={{
              color: "#D4AF37",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2px",
              margin: "0 0 10px",
            }}
          >
            SYSTEM PARAMETERS
          </p>
          {params.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "3px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "#a0b4c8", fontSize: "10px" }}>{k}</span>
              <span
                style={{ color: "#fff", fontSize: "10px", fontWeight: 500 }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "10px",
            padding: "14px",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#0A1628",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2px",
              margin: "0 0 10px",
            }}
          >
            GENERATION SUMMARY
          </p>
          {[
            ["Daily", `${dailyGen} kWh`, "#FF6B35"],
            ["Monthly", `${monthlyGen} kWh`, "#D4AF37"],
            ["Annual", `${annualGen} kWh`, "#68d391"],
          ].map(([label, val, color]) => (
            <div
              key={label}
              style={{
                padding: "8px",
                borderRadius: "6px",
                background: "#fff",
                marginBottom: "8px",
                border: `2px solid ${color}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#2d3748", fontSize: "12px" }}>
                {label} Generation
              </span>
              <span
                style={{
                  color,
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                }}
              >
                {val}
              </span>
            </div>
          ))}
          <div
            style={{
              background: "#fffbf0",
              borderRadius: "6px",
              padding: "8px",
              border: "1px solid #D4AF37",
              marginTop: "4px",
            }}
          >
            <p
              style={{
                color: "#7a6a3a",
                fontSize: "10px",
                margin: 0,
                lineHeight: "1.6",
              }}
            >
              Based on {kw}kW system @ 4.5 units/kW/day in Odisha. Actual
              generation may vary ±10% based on weather, shading, and system
              losses.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p
          style={{
            color: "#0A1628",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "2px",
            margin: "0 0 8px",
          }}
        >
          COMPONENTS LIST
        </p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#0A1628" }}>
              {["#", "Component", "Specification", "Qty", "HSN Code"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "6px 8px",
                      color: "#D4AF37",
                      textAlign: "left",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {components.map((c, i) => (
              <tr
                key={c.name}
                style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff" }}
              >
                <td style={{ padding: "5px 8px", color: "#7a8898" }}>
                  {i + 1}
                </td>
                <td
                  style={{
                    padding: "5px 8px",
                    color: "#0A1628",
                    fontWeight: 600,
                  }}
                >
                  {c.name}
                </td>
                <td style={{ padding: "5px 8px", color: "#4a5568" }}>
                  {c.spec}
                </td>
                <td
                  style={{
                    padding: "5px 8px",
                    color: "#2d3748",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.qty}
                </td>
                <td style={{ padding: "5px 8px", color: "#7a8898" }}>
                  {c.hsn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          style={{
            color: "#a0b4c8",
            fontSize: "9px",
            marginTop: "8px",
            fontStyle: "italic",
          }}
        >
          * Exact specifications may vary based on site assessment and material
          availability. Equivalent or superior make will be provided.
        </p>
      </div>
    </div>
  );
}
