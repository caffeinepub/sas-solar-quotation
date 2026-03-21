import PageHeader from "./PageHeader";

export default function WorkExecution() {
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
      duration: "Day 3-5",
      desc: "Single-line diagram, structural drawing, panel layout design, shadow simulation, BOM preparation.",
    },
    {
      phase: "Phase 3",
      activity: "Material Procurement",
      duration: "Day 6-15",
      desc: "Ordering of solar panels, inverter, mounting structure, cables, BOS components from approved vendors.",
    },
    {
      phase: "Phase 4",
      activity: "Civil & Structural Work",
      duration: "Day 16-18",
      desc: "Roof preparation, channel cutting for cable routing, earthing pit excavation, lightning arrester installation.",
    },
    {
      phase: "Phase 5",
      activity: "Solar Panel Installation",
      duration: "Day 19-21",
      desc: "Mounting structure erection, solar panel fixing, DC cable routing, MC4 connector crimping & installation.",
    },
    {
      phase: "Phase 6",
      activity: "Electrical Work & Wiring",
      duration: "Day 22-24",
      desc: "Inverter installation, AC cable routing, DB board installation, earthing connections, SPD installation.",
    },
    {
      phase: "Phase 7",
      activity: "System Testing & Commissioning",
      duration: "Day 25-26",
      desc: "Open circuit voltage test, insulation test, polarity check, inverter configuration, trial run & performance verification.",
    },
    {
      phase: "Phase 8",
      activity: "Net Metering Application",
      duration: "Day 27-35",
      desc: "DISCOM net metering application submission, inspection scheduling, bidirectional meter installation by DISCOM.",
    },
    {
      phase: "Phase 9",
      activity: "PM Surya Ghar Registration",
      duration: "Day 28-45",
      desc: "Portal registration, document submission, inspection by empaneled agency, subsidy disbursement processing.",
    },
    {
      phase: "Phase 10",
      activity: "Handover & Customer Training",
      duration: "Day 45",
      desc: "System handover, monitoring app setup, operations training, warranty documentation, AMC agreement signing.",
    },
  ];

  const colors = [
    "#D4AF37",
    "#FF6B35",
    "#68d391",
    "#63b3ed",
    "#b794f4",
    "#D4AF37",
    "#FF6B35",
    "#68d391",
    "#63b3ed",
    "#b794f4",
  ];

  return (
    <div className="a4-page">
      <PageHeader
        title="Work Execution Plan"
        subtitle="Project Timeline & Methodology"
      />

      <div style={{ marginBottom: "16px" }}>
        {phases.map((p, i) => (
          <div
            key={p.phase}
            style={{ display: "flex", gap: "12px", marginBottom: "8px" }}
          >
            {/* Timeline dot */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: colors[i],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#0A1628",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              {i < phases.length - 1 && (
                <div
                  style={{
                    width: "2px",
                    flex: 1,
                    background: `linear-gradient(${colors[i]}, ${colors[i + 1]})`,
                    marginTop: "2px",
                    minHeight: "10px",
                  }}
                />
              )}
            </div>
            {/* Content */}
            <div style={{ flex: 1, paddingBottom: "6px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    color: "#0A1628",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {p.activity}
                </span>
                <span
                  style={{
                    color: colors[i],
                    fontSize: "10px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    marginLeft: "8px",
                  }}
                >
                  {p.duration}
                </span>
              </div>
              <p
                style={{
                  color: "#4a5568",
                  fontSize: "10px",
                  margin: "2px 0 0",
                  lineHeight: "1.5",
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
          background: "#0A1628",
          borderRadius: "10px",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#D4AF37",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "1px",
              margin: "0 0 4px",
            }}
          >
            TOTAL PROJECT COMPLETION
          </p>
          <p style={{ color: "#fff", fontSize: "12px", margin: 0 }}>
            Approximately 45-60 days from order confirmation (subject to DISCOM
            & government processing)
          </p>
        </div>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <p
            style={{
              color: "#D4AF37",
              fontFamily: "Georgia, serif",
              fontSize: "28px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            45-60
          </p>
          <p style={{ color: "#a0b4c8", fontSize: "10px", margin: 0 }}>Days</p>
        </div>
      </div>
    </div>
  );
}
