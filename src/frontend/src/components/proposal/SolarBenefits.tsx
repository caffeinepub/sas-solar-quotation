import type { Calculations, CustomerData } from "../../types";
import { getDailyGenerationRange } from "../../utils/calculations";
import PageHeader from "./PageHeader";

function generateBenefitsSummary(
  data: CustomerData,
  calc: Calculations,
): string {
  const trees = Math.round((calc.co2SavedAnnual / 1000) * 25 * 50);
  const co2Tonnes = ((calc.co2SavedAnnual / 1000) * 25).toFixed(1);
  const savings25 = (calc.annualSavings * 25).toLocaleString("en-IN");
  return `Dear ${data.name || "Valued Customer"}, your ${data.capacity} kW solar power system in Odisha is estimated to generate approximately ${getDailyGenerationRange(data.capacity)} units per day (${calc.annualGeneration.toFixed(0)} units annually), saving you ₹${calc.annualSavings.toLocaleString("en-IN")} every year on your electricity bills. Over 25 years, you stand to save ₹${savings25} and contribute to reducing approximately ${co2Tonnes} tonnes of CO₂ emissions — equivalent to planting ${trees} trees. With Odisha's abundant solar irradiance averaging 5.5 peak sun hours per day, your investment is backed by nature itself. This ${data.capacity} kW system will power your home or business with clean, green energy while insulating you from ever-rising electricity tariffs.`;
}

export default function SolarBenefits({
  customer,
  calc,
}: { customer: CustomerData; calc: Calculations }) {
  const benefits = [
    {
      icon: "💰",
      title: "Financial Freedom",
      color: "#D4AF37",
      desc: `Reduce your electricity bills by up to 90%. With your ${customer.capacity} kW system saving ₹${calc.annualSavings.toLocaleString("en-IN")} annually, the system pays for itself in ${calc.paybackYears.toFixed(1)} years.`,
    },
    {
      icon: "🌟",
      title: "Government Support",
      color: "#FF6B35",
      desc: `Benefit from PM Surya Ghar Yojana subsidies up to ₹${calc.totalSubsidy.toLocaleString("en-IN")} for your system. Odisha also offers state subsidies reducing your net investment significantly.`,
    },
    {
      icon: "🌱",
      title: "Environmental Impact",
      color: "#68d391",
      desc: `Your system will reduce ${(calc.co2SavedAnnual / 1000).toFixed(2)} tonnes of CO₂ per year. Over 25 years, that's equivalent to planting ${Math.round((calc.co2SavedAnnual / 1000) * 25 * 50)} trees.`,
    },
    {
      icon: "🛡️",
      title: "Energy Independence",
      color: "#63b3ed",
      desc: "With a 25-year performance warranty on solar panels and 7-year inverter warranty, your system delivers consistent, reliable energy independent of grid disruptions.",
    },
  ];
  return (
    <div className="a4-page">
      <PageHeader
        title="Solar Energy Benefits"
        subtitle="Why Go Solar in Odisha"
      />

      {/* Dynamic personalized paragraph */}
      <div
        style={{
          background: "linear-gradient(135deg, #fffbf0, #fff8e7)",
          border: "2px solid #D4AF37",
          borderRadius: "10px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            color: "#7a6a3a",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "2px",
            margin: "0 0 8px",
          }}
        >
          PERSONALIZED SOLAR SUMMARY
        </p>
        <p
          style={{
            color: "#2d3748",
            fontSize: "12px",
            lineHeight: "1.8",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {generateBenefitsSummary(customer, calc)}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {benefits.map((b) => (
          <div
            key={b.title}
            style={{
              padding: "16px",
              borderRadius: "8px",
              background: "#f8fafc",
              borderTop: `3px solid ${b.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "22px" }}>{b.icon}</span>
              <span
                style={{ color: "#0A1628", fontSize: "13px", fontWeight: 700 }}
              >
                {b.title}
              </span>
            </div>
            <p
              style={{
                color: "#4a5568",
                fontSize: "11px",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {b.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          background: "#0A1628",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        {[
          [
            "Daily Output",
            `${getDailyGenerationRange(customer.capacity)} units`,
            "kWh per day",
          ],
          [
            "Monthly Output",
            `${calc.monthlyGeneration.toFixed(0)} units`,
            "kWh per month",
          ],
          [
            "Annual Output",
            `${calc.annualGeneration.toFixed(0)} units`,
            "kWh per year",
          ],
          [
            "CO₂ Saved",
            `${(calc.co2SavedAnnual / 1000).toFixed(2)} T`,
            "tonnes per year",
          ],
        ].map(([label, val, sub]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p
              style={{
                color: "#a0b4c8",
                fontSize: "9px",
                margin: "0 0 4px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {label}
            </p>
            <p
              style={{
                color: "#D4AF37",
                fontSize: "16px",
                fontWeight: 700,
                margin: "0 0 2px",
                fontFamily: "Georgia, serif",
              }}
            >
              {val}
            </p>
            <p style={{ color: "#a0b4c8", fontSize: "9px", margin: 0 }}>
              {sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
