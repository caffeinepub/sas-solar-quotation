import PageHeader from "./PageHeader";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

interface Props {
  systemType?: string;
  batteryType?: string;
  leadAcidCapacityAH?: number;
}

export default function WarrantyAndExecution({
  systemType,
  batteryType,
  leadAcidCapacityAH,
}: Props) {
  const isHybridOrOffGrid = systemType === "hybrid" || systemType === "offgrid";
  const isLeadAcid = systemType === "offgrid" && batteryType === "lead_acid";

  const warranties = [
    {
      component: "Solar PV Modules",
      type: "Performance Warranty",
      duration: "25 Years",
      detail: "Min 80% output at 25 years",
      icon: "☀️",
      hybridBadge: null,
    },
    {
      component: "Solar Inverter",
      type: "Product Warranty",
      duration: "7 Years",
      detail: "Full replacement by manufacturer",
      icon: "⚡",
      hybridBadge: null,
    },
    {
      component: "Mounting Structure",
      type: "Structural Warranty",
      duration: "5 Years",
      detail: "Against rust, corrosion & failure",
      icon: "🛠️",
      hybridBadge: null,
    },
    {
      component: "Installation Work",
      type: "Workmanship Warranty",
      duration: "5 Years",
      detail: "Against installation defects",
      icon: "🔧",
      hybridBadge: null,
    },
    ...(isHybridOrOffGrid
      ? [
          {
            component: isLeadAcid ? "Lead Acid Battery" : "Lithium Ion Battery",
            type: "Battery Warranty",
            duration: isLeadAcid ? "2 Years" : "5 Years",
            detail: isLeadAcid
              ? `${leadAcidCapacityAH || ""}Ah | Manufacturer warranty against defects`
              : "Cell balancing & BMS protection included",
            icon: "🔋",
            hybridBadge: "BATTERY",
          },
        ]
      : []),
    {
      component: "AMC Services",
      type: isHybridOrOffGrid
        ? "Hybrid System AMC"
        : "Annual Maintenance Contract",
      duration: "5 Years",
      detail: isHybridOrOffGrid
        ? "Comprehensive Hybrid System Maintenance"
        : "Comprehensive maintenance included",
      icon: "📋",
      hybridBadge: isHybridOrOffGrid ? "HYBRID AMC" : null,
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
    ...(isHybridOrOffGrid
      ? ["Battery health check and cell balancing (quarterly)"]
      : []),
  ];

  const phases = [
    {
      phase: "Phase 1",
      activity: "Site Survey & Assessment",
      duration: "Day 1-2",
      desc: "Structural assessment, roof measurement, shadow analysis, load evaluation, DISCOM feasibility check.",
    },
    {
      phase: "Phase 2",
      activity: "System Design & Engineering",
      duration: "Day 2-4",
      desc: "SLD, structural drawing, panel layout, BOM preparation.",
    },
    {
      phase: "Phase 3",
      activity: "Material Procurement",
      duration: "Day 4-12",
      desc: "Ordering panels, inverter, structure, cables, BOS from approved vendors.",
    },
    {
      phase: "Phase 4",
      activity: "Civil & Structural Work",
      duration: "Day 12-14",
      desc: "Roof preparation, cable routing, earthing pit, lightning arrester installation.",
    },
    {
      phase: "Phase 5",
      activity: "Solar Panel Installation",
      duration: "Day 14-16",
      desc: "Mounting structure erection, panel fixing, DC cable routing & MC4 connectors.",
    },
    {
      phase: "Phase 6",
      activity: "Electrical Work & Wiring",
      duration: "Day 16-18",
      desc: "Inverter installation, AC cable routing, DB board, earthing, SPD.",
    },
    {
      phase: "Phase 7",
      activity: "System Testing & Commissioning",
      duration: "Day 18-20",
      desc: "OCV test, insulation test, polarity check, inverter config, performance verification.",
    },
    {
      phase: "Phase 8",
      activity: "Net Metering Application",
      duration: "Day 20-25",
      desc: "DISCOM application, inspection, bidirectional meter installation.",
    },
    {
      phase: "Phase 9",
      activity: "PM Surya Ghar Registration",
      duration: "Day 22-28",
      desc: "Portal registration, document submission, subsidy disbursement processing.",
    },
    {
      phase: "Phase 10",
      activity: "Handover & Customer Training",
      duration: "Day 28-30",
      desc: "System handover, monitoring app setup, warranty docs, AMC signing.",
    },
  ];

  const phaseColors = [
    GREEN,
    BLUE,
    GREEN,
    BLUE,
    GREEN,
    BLUE,
    GREEN,
    BLUE,
    GREEN,
    BLUE,
  ];

  return (
    <div className="a4-page">
      <PageHeader
        title="Warranty, AMC & Work Execution Plan"
        subtitle="Our Service Commitment & Project Timeline"
      />

      {/* ─── WARRANTY TABLE ─── */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "10px",
          marginBottom: "10px",
        }}
      >
        <thead>
          <tr style={{ background: GREEN }}>
            {["", "Component", "Warranty Type", "Duration", "Coverage"].map(
              (h) => (
                <th
                  key={h}
                  style={{
                    padding: "6px 8px",
                    color: "#fff",
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
                background: i % 2 === 0 ? "#E8F5EE" : "#fff",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <td style={{ padding: "5px 8px", fontSize: "14px" }}>{w.icon}</td>
              <td
                style={{
                  padding: "5px 8px",
                  color: "#1A1A1A",
                  fontWeight: 700,
                }}
              >
                {w.component}
              </td>
              <td style={{ padding: "5px 8px", color: "#4a5568" }}>{w.type}</td>
              <td style={{ padding: "5px 8px" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <span
                    style={{
                      background: GREEN,
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                  >
                    {w.duration}
                  </span>
                  {w.hybridBadge && (
                    <span
                      style={{
                        background: BLUE,
                        color: "#fff",
                        padding: "2px 6px",
                        borderRadius: "20px",
                        fontSize: "8px",
                        fontWeight: 700,
                      }}
                    >
                      {w.hybridBadge}
                    </span>
                  )}
                </div>
              </td>
              <td
                style={{
                  padding: "5px 8px",
                  color: "#4a5568",
                  fontSize: "9px",
                }}
              >
                {w.detail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* AMC services + system life */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "12px",
        }}
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
            AMC SERVICES INCLUDED
            {isHybridOrOffGrid && (
              <span
                style={{
                  marginLeft: "6px",
                  background: BLUE,
                  color: "#fff",
                  padding: "1px 5px",
                  borderRadius: "10px",
                  fontSize: "8px",
                }}
              >
                HYBRID
              </span>
            )}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {amcServices.map((s) => (
              <li
                key={s}
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
                    color: "rgba(255,255,255,0.9)",
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
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
              SYSTEM LIFE EXPECTANCY
            </p>
            <p
              style={{
                color: "#1A1A1A",
                fontFamily: "Georgia, serif",
                fontSize: "30px",
                fontWeight: 700,
                margin: "0 0 2px",
              }}
            >
              25+
            </p>
            <p
              style={{
                color: GREEN,
                fontSize: "11px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Years
            </p>
          </div>
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
                margin: "0 0 4px",
              }}
            >
              WARRANTY CLAIM PROCESS
            </p>
            <ol
              style={{
                margin: 0,
                paddingLeft: "14px",
                color: BLUE,
                fontSize: "9px",
                lineHeight: "1.6",
              }}
            >
              <li>Contact support with issue description</li>
              <li>Site inspection within 48 working hours</li>
              <li>Diagnosis & resolution within 7 days</li>
              <li>Component replacement under warranty</li>
            </ol>
          </div>
        </div>
      </div>

      {/* ─── WORK EXECUTION PLAN ─── */}
      <div style={{ borderTop: `2px solid ${BLUE}`, paddingTop: "8px" }}>
        <p
          style={{
            color: BLUE,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "1px",
            margin: "0 0 8px",
          }}
        >
          WORK EXECUTION PLAN — PROJECT TIMELINE
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 16px",
          }}
        >
          {phases.map((p, i) => (
            <div
              key={p.phase}
              style={{ display: "flex", gap: "8px", marginBottom: "6px" }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: phaseColors[i],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      color: "#1A1A1A",
                      fontSize: "9.5px",
                      fontWeight: 700,
                    }}
                  >
                    {p.activity}
                  </span>
                  <span
                    style={{
                      color: phaseColors[i],
                      fontSize: "8.5px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      marginLeft: "6px",
                    }}
                  >
                    {p.duration}
                  </span>
                </div>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "8.5px",
                    margin: "1px 0 0",
                    lineHeight: "1.4",
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: GREEN,
            borderRadius: "6px",
            padding: "8px 12px",
            marginTop: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "9px",
              margin: 0,
            }}
          >
            Total project completion: Approximately 20-30 days (subject to
            DISCOM & government processing)
          </p>
          <div
            style={{ textAlign: "center", flexShrink: 0, marginLeft: "12px" }}
          >
            <p
              style={{
                color: "#fff",
                fontFamily: "Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              20-30
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "9px",
                margin: 0,
              }}
            >
              Days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
