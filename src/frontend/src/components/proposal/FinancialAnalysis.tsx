import type { Calculations, CustomerData } from "../../types";
import { formatINR } from "../../utils/calculations";
import PageHeader from "./PageHeader";

export default function FinancialAnalysis({
  customer,
  calc,
}: { customer: CustomerData; calc: Calculations }) {
  const years = [1, 3, 5, 10, 15, 20, 25];
  const maxSavings = calc.annualSavings * 25;

  return (
    <div className="a4-page">
      <PageHeader
        title="Financial Analysis"
        subtitle="ROI, Savings & 25-Year Projection"
      />

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {[
          ["Project Cost", formatINR(customer.salePrice), "#0A1628"],
          ["Total Subsidy", formatINR(calc.totalSubsidy), "#D4AF37"],
          ["Net Investment", formatINR(calc.netCost), "#FF6B35"],
          ["Annual Savings", formatINR(calc.annualSavings), "#68d391"],
          ["Payback", `${calc.paybackYears.toFixed(1)} yrs`, "#63b3ed"],
        ].map(([label, val, color]) => (
          <div
            key={label}
            style={{
              textAlign: "center",
              padding: "10px 6px",
              borderRadius: "8px",
              background: "#f8fafc",
              borderBottom: `3px solid ${color}`,
            }}
          >
            <p
              style={{
                color: "#7a8898",
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
                color,
                fontSize: "13px",
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

      {/* Subsidy Breakdown */}
      <div
        style={{
          marginBottom: "16px",
          background: "#fffbf0",
          border: "1px solid #D4AF37",
          borderRadius: "8px",
          padding: "12px",
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
          SUBSIDY BREAKDOWN
        </p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "4px 0", color: "#2d3748" }}>
                Central Government Subsidy (PM Surya Ghar)
              </td>
              <td
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  color: "#D4AF37",
                }}
              >
                {formatINR(calc.centralSubsidy)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", color: "#2d3748" }}>
                Odisha State Government Subsidy
              </td>
              <td
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  color: "#D4AF37",
                }}
              >
                {formatINR(calc.stateSubsidy)}
              </td>
            </tr>
            <tr style={{ borderTop: "2px solid #D4AF37" }}>
              <td
                style={{ padding: "6px 0", color: "#0A1628", fontWeight: 700 }}
              >
                Total Government Support
              </td>
              <td
                style={{
                  textAlign: "right",
                  fontWeight: 700,
                  color: "#0A1628",
                  fontSize: "13px",
                }}
              >
                {formatINR(calc.totalSubsidy)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 25-Year Projection Table */}
      <div style={{ marginBottom: "16px" }}>
        <p
          style={{
            color: "#0A1628",
            fontSize: "11px",
            fontWeight: 700,
            margin: "0 0 8px",
            letterSpacing: "1px",
          }}
        >
          25-YEAR PROJECTION
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
              {[
                "Year",
                "Cumulative Savings",
                "Net Investment",
                "Net Profit / (Loss)",
                "ROI",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "6px 8px",
                    color: "#D4AF37",
                    textAlign: "right",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
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
                  style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff" }}
                >
                  <td
                    style={{
                      padding: "5px 8px",
                      color: "#0A1628",
                      fontWeight: 600,
                    }}
                  >
                    Year {y}
                  </td>
                  <td
                    style={{
                      padding: "5px 8px",
                      textAlign: "right",
                      color: "#2d3748",
                    }}
                  >
                    {formatINR(cumSavings)}
                  </td>
                  <td
                    style={{
                      padding: "5px 8px",
                      textAlign: "right",
                      color: "#2d3748",
                    }}
                  >
                    {formatINR(calc.netCost)}
                  </td>
                  <td
                    style={{
                      padding: "5px 8px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: netProfit >= 0 ? "#38a169" : "#e53e3e",
                    }}
                  >
                    {netProfit >= 0 ? "+" : ""}
                    {formatINR(netProfit)}
                  </td>
                  <td
                    style={{
                      padding: "5px 8px",
                      textAlign: "right",
                      color: roi >= 0 ? "#38a169" : "#e53e3e",
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

      {/* CSS Bar Chart */}
      <div>
        <p
          style={{
            color: "#0A1628",
            fontSize: "11px",
            fontWeight: 700,
            margin: "0 0 10px",
            letterSpacing: "1px",
          }}
        >
          SAVINGS VS INVESTMENT CHART
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
            height: "80px",
          }}
        >
          {[5, 10, 15, 20, 25].map((y) => {
            const savings = calc.annualSavings * y;
            const savH = Math.round((savings / maxSavings) * 70);
            const invH = Math.round((calc.netCost / maxSavings) * 70);
            return (
              <div
                key={y}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "3px",
                    alignItems: "flex-end",
                    height: "70px",
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: `${savH}px`,
                      background: "#D4AF37",
                      borderRadius: "2px 2px 0 0",
                    }}
                  />
                  <div
                    style={{
                      width: "14px",
                      height: `${invH}px`,
                      background: "#0A1628",
                      borderRadius: "2px 2px 0 0",
                      opacity: 0.6,
                    }}
                  />
                </div>
                <span style={{ fontSize: "9px", color: "#7a8898" }}>
                  Yr {y}
                </span>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginLeft: "8px",
              alignSelf: "flex-end",
            }}
          >
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <div
                style={{ width: "10px", height: "10px", background: "#D4AF37" }}
              />
              <span style={{ fontSize: "9px", color: "#7a8898" }}>Savings</span>
            </div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#0A1628",
                  opacity: 0.6,
                }}
              />
              <span style={{ fontSize: "9px", color: "#7a8898" }}>
                Investment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "12px",
          padding: "10px",
          background: "#0A1628",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#a0b4c8", fontSize: "9px", margin: 0 }}>
            25-Year Total Profit
          </p>
          <p
            style={{
              color: "#D4AF37",
              fontSize: "15px",
              fontWeight: 700,
              margin: "2px 0 0",
              fontFamily: "Georgia, serif",
            }}
          >
            {formatINR(calc.totalProfit25Year)}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#a0b4c8", fontSize: "9px", margin: 0 }}>
            25-Year ROI
          </p>
          <p
            style={{
              color: "#68d391",
              fontSize: "15px",
              fontWeight: 700,
              margin: "2px 0 0",
              fontFamily: "Georgia, serif",
            }}
          >
            {calc.roi25Year.toFixed(0)}%
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#a0b4c8", fontSize: "9px", margin: 0 }}>
            Payback Period
          </p>
          <p
            style={{
              color: "#FF6B35",
              fontSize: "15px",
              fontWeight: 700,
              margin: "2px 0 0",
              fontFamily: "Georgia, serif",
            }}
          >
            {calc.paybackYears.toFixed(1)} Years
          </p>
        </div>
      </div>
    </div>
  );
}
