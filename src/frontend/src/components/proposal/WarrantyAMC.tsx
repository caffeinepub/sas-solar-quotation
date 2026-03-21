import PageHeader from "./PageHeader";

export default function WarrantyAMC() {
  const warranties = [
    {
      component: "Solar PV Modules",
      type: "Performance Warranty",
      duration: "25 Years",
      detail: "Minimum 80% output guaranteed at 25 years",
      icon: "☀️",
    },
    {
      component: "Solar Inverter",
      type: "Product Warranty",
      duration: "7 Years",
      detail: "Full replacement warranty by manufacturer",
      icon: "⚡",
    },
    {
      component: "Mounting Structure",
      type: "Structural Warranty",
      duration: "5 Years",
      detail: "Against rust, corrosion & structural failure",
      icon: "🛠️",
    },
    {
      component: "Installation Work",
      type: "Workmanship Warranty",
      duration: "5 Years",
      detail: "Against installation defects & electrical faults",
      icon: "🔧",
    },
    {
      component: "AMC Services",
      type: "Annual Maintenance Contract",
      duration: "5 Years",
      detail: "Comprehensive maintenance & monitoring included",
      icon: "📋",
    },
  ];

  const amcServices = [
    "Quarterly on-site inspection and performance check",
    "Solar panel cleaning (2 times per year)",
    "Inverter diagnostics and firmware updates",
    "DC/AC cable and connection integrity check",
    "Earthing and lightning protection system check",
    "Generation report and savings statement",
    "Priority customer support (response within 48 hours)",
    "Minor repairs and replacement of minor components",
  ];

  return (
    <div className="a4-page">
      <PageHeader
        title="Warranty & AMC Details"
        subtitle="Our Commitment to Quality & Service"
      />

      {/* Warranty Table */}
      <div style={{ marginBottom: "20px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr style={{ background: "#0A1628" }}>
              {["", "Component", "Warranty Type", "Duration", "Coverage"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 10px",
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
            {warranties.map((w, i) => (
              <tr
                key={w.component}
                style={{
                  background: i % 2 === 0 ? "#f8fafc" : "#fff",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td style={{ padding: "10px", fontSize: "18px" }}>{w.icon}</td>
                <td
                  style={{
                    padding: "8px 10px",
                    color: "#0A1628",
                    fontWeight: 700,
                  }}
                >
                  {w.component}
                </td>
                <td style={{ padding: "8px 10px", color: "#4a5568" }}>
                  {w.type}
                </td>
                <td style={{ padding: "8px 10px" }}>
                  <span
                    style={{
                      background: "linear-gradient(90deg, #D4AF37, #FF6B35)",
                      color: "#fff",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {w.duration}
                  </span>
                </td>
                <td
                  style={{
                    padding: "8px 10px",
                    color: "#4a5568",
                    fontSize: "10px",
                  }}
                >
                  {w.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AMC Details */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div
          style={{
            background: "#0A1628",
            borderRadius: "10px",
            padding: "16px",
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
            AMC SERVICES INCLUDED
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {amcServices.map((s) => (
              <li
                key={s}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                  padding: "4px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{ color: "#D4AF37", fontSize: "12px", flexShrink: 0 }}
                >
                  ✓
                </span>
                <span
                  style={{
                    color: "#e2e8f0",
                    fontSize: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            style={{
              background: "#fffbf0",
              border: "2px solid #D4AF37",
              borderRadius: "10px",
              padding: "14px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#7a6a3a",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "2px",
                margin: "0 0 8px",
              }}
            >
              SYSTEM LIFE EXPECTANCY
            </p>
            <p
              style={{
                color: "#0A1628",
                fontFamily: "Georgia, serif",
                fontSize: "36px",
                fontWeight: 700,
                margin: "0 0 4px",
              }}
            >
              25+
            </p>
            <p
              style={{
                color: "#D4AF37",
                fontSize: "13px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Years
            </p>
            <p
              style={{ color: "#4a5568", fontSize: "10px", margin: "6px 0 0" }}
            >
              Expected operational life of your solar system
            </p>
          </div>
          <div
            style={{
              background: "#f0fff4",
              border: "1px solid #68d391",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <p
              style={{
                color: "#276749",
                fontSize: "10px",
                fontWeight: 700,
                margin: "0 0 6px",
              }}
            >
              WARRANTY CLAIM PROCESS
            </p>
            <ol
              style={{
                margin: 0,
                paddingLeft: "16px",
                color: "#276749",
                fontSize: "10px",
                lineHeight: "1.7",
              }}
            >
              <li>Contact our support team with issue description</li>
              <li>Site inspection within 48 working hours</li>
              <li>Diagnosis and resolution within 7 working days</li>
              <li>Replacement of components if required under warranty</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
