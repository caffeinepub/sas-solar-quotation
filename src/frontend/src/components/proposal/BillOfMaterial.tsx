import type { CustomerData } from "../../types";
import PageHeader from "./PageHeader";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

export default function BillOfMaterial({
  customer,
}: { customer: CustomerData }) {
  const kw = customer.capacity;
  const wattage = customer.panelWattage || 545;
  const panels = Math.ceil((kw * 1000) / wattage);
  const panelBrand = customer.panelBrand || "Tata Bifacial";
  const inverterBrand = customer.inverterBrand || "Tata";
  const isThreePhase = kw > 5;

  // Get brand name prefix (e.g. "Tata", "Waree", "Adani")
  const brandName = panelBrand.split(" ")[0];

  // Inverter options: always include selected brand first, then other common brands
  const inverterOptions = [
    brandName,
    ...["Goodwe", "Xsolar", "Sofar Solar", "Growatt"].filter(
      (b) => b.split(" ")[0] !== brandName,
    ),
  ];

  const bosList = [
    "DC Cables & Conduits: PolyCab / Star Cable / KEI Cable / Equivalent",
    "AC Cables: PolyCab / Star Cable / KEI Cable / Equivalent",
    `DCDB: ${brandName} Approved (${brandName} Supplied)`,
    `ACDB: ${brandName} Approved (${brandName} Supplied)`,
    "Termination Accessories: Reputed Brand",
    "Earthing (Pits, Strips & Cables): Reputed Make",
    `Lightning Arrestor: ${brandName} Approved (${brandName} Supplied)`,
  ];

  return (
    <div className="a4-page">
      <PageHeader
        title="Bill of Material"
        subtitle="System Components & Specifications"
      />

      {/* Panel Section */}
      <div
        style={{
          marginBottom: "14px",
          borderBottom: `2px solid ${BLUE}`,
          paddingBottom: "12px",
        }}
      >
        <p
          style={{
            color: BLUE,
            fontSize: "13px",
            fontWeight: 700,
            margin: "0 0 8px",
          }}
        >
          Panel
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "11px", color: "#333" }}>
            <span style={{ fontWeight: 600 }}>Watt Peak: </span>
            {wattage} Wp
          </div>
          <div style={{ fontSize: "11px", color: "#333" }}>
            <span style={{ fontWeight: 600 }}>Panel Type: </span>Bifacial
          </div>
          <div style={{ fontSize: "11px", color: "#333" }}>
            <span style={{ fontWeight: 600 }}>Panel Qty: </span>
            {panels} Nos.
          </div>
          <div style={{ fontSize: "11px", color: "#333" }}>
            <span style={{ fontWeight: 600 }}>Brand: </span>
            {panelBrand}
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            background: "#f8fafc",
            borderRadius: "6px",
            border: `1px solid ${BLUE}33`,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "12px", color: BLUE }}>
            {brandName.toUpperCase()} SOLAR
          </div>
          <div style={{ fontSize: "10px", color: "#666" }}>
            {panelBrand} Solar Modules
          </div>
        </div>
      </div>

      {/* Inverter Section */}
      <div
        style={{
          marginBottom: "14px",
          borderBottom: `2px solid ${BLUE}`,
          paddingBottom: "12px",
        }}
      >
        <p
          style={{
            color: BLUE,
            fontSize: "13px",
            fontWeight: 700,
            margin: "0 0 8px",
          }}
        >
          Inverter
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "6px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "11px", color: "#333" }}>
            <span style={{ fontWeight: 600 }}>Size: </span>
            {kw} kW
          </div>
          <div style={{ fontSize: "11px", color: "#333" }}>
            <span style={{ fontWeight: 600 }}>Phase: </span>
            {isThreePhase ? "Three Phase" : "Single Phase"}
          </div>
          <div style={{ fontSize: "11px", color: "#333" }}>
            <span style={{ fontWeight: 600 }}>Type: </span>String
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
          }}
        >
          {inverterOptions.map((brand) => {
            const isSelected =
              brand.split(" ")[0].toLowerCase() ===
              inverterBrand.split(" ")[0].toLowerCase();
            return (
              <div
                key={brand}
                style={{
                  padding: "8px",
                  background: isSelected ? `${GREEN}15` : "#f8fafc",
                  border: `1px solid ${isSelected ? GREEN : "#e2e8f0"}`,
                  borderRadius: "6px",
                  textAlign: "center",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: isSelected ? GREEN : "#555",
                }}
              >
                {brand}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cable & Warranty Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        {/* Cable */}
        <div
          style={{
            border: `1px solid ${BLUE}44`,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ background: BLUE, padding: "6px 10px" }}>
            <p
              style={{
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Cable
            </p>
          </div>
          <div style={{ padding: "10px" }}>
            <p style={{ fontSize: "10px", color: "#333", margin: "0 0 8px" }}>
              <span style={{ fontWeight: 600 }}>Cable Brands: </span>Polycab /
              Star Cables
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div
                style={{
                  padding: "6px 10px",
                  background: "#f8fafc",
                  borderRadius: "4px",
                  border: "1px solid #e2e8f0",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#c41e3a",
                }}
              >
                POLYCAB
              </div>
              <div
                style={{
                  padding: "6px 10px",
                  background: "#f8fafc",
                  borderRadius: "4px",
                  border: "1px solid #e2e8f0",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#c41e3a",
                }}
              >
                STAR CABLES
              </div>
            </div>
          </div>
        </div>

        {/* Warranty */}
        <div
          style={{
            border: `1px solid ${GREEN}44`,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ background: GREEN, padding: "6px 10px" }}>
            <p
              style={{
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Warranty
            </p>
          </div>
          <div style={{ padding: "10px" }}>
            {[
              ["Panel", "10 Year(s)"],
              ["Panel Performance", "25 Year(s)"],
              ["Inverter", "7 Year(s)"],
              ["Balance Of System", "5 Year(s)"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e2e8f0",
                  padding: "3px 0",
                  fontSize: "10px",
                }}
              >
                <span style={{ color: "#555" }}>{k}:</span>
                <span style={{ fontWeight: 600, color: GREEN }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Structure */}
      <div
        style={{
          marginBottom: "14px",
          padding: "10px",
          background: "#E8F5EE",
          borderRadius: "8px",
          border: `1px solid ${GREEN}44`,
        }}
      >
        <p
          style={{
            color: GREEN,
            fontSize: "11px",
            fontWeight: 700,
            margin: "0 0 4px",
          }}
        >
          Structure
        </p>
        <p style={{ fontSize: "11px", color: "#333", margin: 0 }}>
          Structure Size as per Requirement
        </p>
      </div>

      {/* Balance of System */}
      <div
        style={{
          border: `1px solid ${BLUE}44`,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div style={{ background: BLUE, padding: "8px 12px" }}>
          <p
            style={{
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Balance of System
          </p>
        </div>
        <div style={{ padding: "12px" }}>
          {bosList.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  color: GREEN,
                  fontWeight: 700,
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
              >
                •
              </span>
              <span
                style={{ fontSize: "10px", color: "#333", lineHeight: "16px" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
