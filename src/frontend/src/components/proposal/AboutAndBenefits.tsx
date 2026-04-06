import type { Calculations, CustomerData } from "../../types";
import { formatINR } from "../../utils/calculations";
import PageHeader from "./PageHeader";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

export default function AboutAndBenefits({
  customer,
  calc,
}: { customer: CustomerData; calc: Calculations }) {
  const highlights = [
    {
      icon: "⚡",
      title: "TATA Power Partner",
      desc: "Authorized Channel Partner of TATA Power for TPCODL, NODL, SODL & WODL DISCOMs across Odisha.",
    },
    {
      icon: "☀️",
      title: "PM Surya Ghar Yojana",
      desc: "Authorized installer under Pradhan Mantri Surya Ghar Muft Bijli Yojana for residential solar installations.",
    },
    {
      icon: "🏆",
      title: "Professional Excellence",
      desc: "Delivering world-class solar solutions with certified engineers and quality after-sales support.",
    },
    {
      icon: "🌿",
      title: "Green Energy Mission",
      desc: "Committed to making Odisha energy-independent through clean, affordable, and reliable solar power.",
    },
  ];

  const unitsYear = (customer.capacity * 3.5 * 365).toFixed(0);
  const co2 = calc.co2SavedAnnual.toFixed(0);
  const trees = Math.round(calc.co2SavedAnnual / 21.7);

  return (
    <div className="a4-page">
      <PageHeader
        title="About Us & Solar Benefits"
        subtitle="Our Story, Credentials & Your Personalized Savings"
      />

      {/* ─── ABOUT COMPANY (top half) ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "90px 1fr",
          gap: "16px",
          marginBottom: "14px",
          alignItems: "start",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
              marginBottom: "4px",
            }}
          />
          <p
            style={{
              color: GREEN,
              fontSize: "9px",
              fontWeight: 700,
              margin: 0,
              lineHeight: "1.4",
            }}
          >
            SHREE ADISHAKTI
            <br />
            SOLAR PVT LTD
          </p>
        </div>
        <div>
          <p
            style={{
              color: "#2d3748",
              fontSize: "11.5px",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            Shree Adishakti Solar Pvt Ltd is a premier solar energy solutions
            company headquartered in Bhubaneswar, Odisha. As a trusted name in
            the renewable energy sector, we specialize in design, supply,
            installation, and commissioning of rooftop solar PV systems for
            residential, commercial, and industrial clients. Our mission is to
            accelerate Odisha's transition to clean energy by making solar power
            accessible, affordable, and reliable.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        {highlights.map((h) => (
          <div
            key={h.title}
            style={{
              padding: "10px 12px",
              borderRadius: "6px",
              background: "#E8F5EE",
              borderLeft: `3px solid ${GREEN}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "3px",
              }}
            >
              <span style={{ fontSize: "16px" }}>{h.icon}</span>
              <span style={{ color: GREEN, fontSize: "11px", fontWeight: 700 }}>
                {h.title}
              </span>
            </div>
            <p
              style={{
                color: "#4a5568",
                fontSize: "10px",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              {h.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Company Details strip */}
      <div
        style={{
          background: GREEN,
          borderRadius: "6px",
          padding: "10px 14px",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
          }}
        >
          {[
            [
              "Address",
              "472/1561, Lane 4, Basudev Nagar, Bhubaneswar, Khordha, Odisha 751018",
            ],
            ["GST", "21ABSCS6348D1Z7 | PAN: ABSCS6348D"],
            ["Mobile", "+91 95833 90808"],
            ["Email", "info.sassolar@gmail.com"],
            ["Website", "www.shreeadishaktisolar.com"],
            ["CIN", "U35105OD2026PTC052397"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "4px",
              }}
            >
              <span
                style={{ color: "rgba(255,255,255,0.65)", fontSize: "9px" }}
              >
                {k}:{" "}
              </span>
              <span style={{ color: "#fff", fontSize: "9px" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SOLAR BENEFITS (bottom half) ─── */}
      <div
        style={{
          borderTop: `2px solid ${BLUE}`,
          paddingTop: "12px",
        }}
      >
        <p
          style={{
            color: BLUE,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            margin: "0 0 10px",
            textTransform: "uppercase",
          }}
        >
          Your Personalized Solar Benefits
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          {[
            ["Annual Savings", formatINR(calc.annualSavings), "💰", GREEN],
            [`${unitsYear} kWh`, "Units Generated / Year", "⚡", BLUE],
            [`${co2} kg`, "CO₂ Saved / Year", "🌿", "#1B6B45"],
            [`${trees} Trees`, "Equivalent Trees Planted", "🌳", "#2d8a54"],
          ].map(([val, label, icon, color]) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                padding: "10px 6px",
                borderRadius: "8px",
                background: "#E8F5EE",
                border: `1px solid ${color}33`,
              }}
            >
              <div style={{ fontSize: "22px", marginBottom: "4px" }}>
                {icon}
              </div>
              <p
                style={{
                  color,
                  fontSize: "14px",
                  fontWeight: 700,
                  margin: "0 0 2px",
                  fontFamily: "Georgia, serif",
                }}
              >
                {val}
              </p>
              <p style={{ color: "#4a5568", fontSize: "9px", margin: 0 }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
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
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              25-YEAR FINANCIAL SUMMARY
            </p>
            {(customer.systemType === "offgrid"
              ? [
                  ["Project Cost", formatINR(customer.salePrice)],
                  ["Net Investment", formatINR(customer.salePrice)],
                  ["Total Savings (25yr)", formatINR(calc.annualSavings * 25)],
                ]
              : [
                  ["Project Cost", formatINR(customer.salePrice)],
                  ["Total Subsidy", formatINR(calc.totalSubsidy)],
                  ["Net Investment", formatINR(calc.netCost)],
                  ["Total Savings (25yr)", formatINR(calc.annualSavings * 25)],
                ]
            ).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "3px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)" }}
                >
                  {k}
                </span>
                <span style={{ fontSize: "10px", fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#E8F0FA",
              borderRadius: "8px",
              padding: "12px",
              border: `1px solid ${BLUE}33`,
            }}
          >
            <p
              style={{
                color: BLUE,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              PAYBACK & ROI
            </p>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <span
                style={{
                  color: GREEN,
                  fontSize: "28px",
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                }}
              >
                {calc.paybackYears.toFixed(1)}
              </span>
              <span style={{ color: GREEN, fontSize: "12px" }}>
                {" "}
                yrs payback
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  color: BLUE,
                  fontSize: "24px",
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                }}
              >
                {calc.roi25Year.toFixed(0)}%
              </span>
              <span style={{ color: BLUE, fontSize: "11px" }}>
                {" "}
                25-year ROI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
