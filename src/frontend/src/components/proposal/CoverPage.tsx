import type { CustomerData } from "../../types";

const COMPANY = {
  name: "SHREE ADISHAKTI SOLAR PVT LTD",
  address:
    "472/1561, Lane 4, Basudev Nagar, Basuaghai, TANKAPANI ROAD, Near SAI TEMPLE, Bhubaneswar, Khordha, Odisha 751018",
  mobile: "+91 95833 90808",
  email: "info.sassolar@gmail.com",
  website: "www.shreeadishaktisolar.com",
};

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

export default function CoverPage({ customer }: { customer: CustomerData }) {
  const formatted = new Date(customer.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div
      className="a4-page"
      style={{
        background: "#fff",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top Green Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${GREEN} 0%, #145236 60%, #0d3d28 100%)`,
          padding: "16px 40px 12px",
          flex: "0 0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <img
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="Logo"
            style={{
              width: "72px",
              height: "72px",
              objectFit: "contain",
              filter: "brightness(1.1)",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "#fff",
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              letterSpacing: "3px",
              margin: 0,
              fontWeight: 700,
            }}
          >
            {COMPANY.name}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "11px",
              marginTop: "4px",
              letterSpacing: "1.5px",
            }}
          >
            BRIGHT POWER FOR BETTER FUTURE | PM SURYA GHAR YOJANA
          </p>
        </div>
      </div>

      {/* Blue accent bar */}
      <div
        style={{
          height: "6px",
          background: `linear-gradient(90deg, ${GREEN}, ${BLUE}, ${GREEN})`,
        }}
      />

      {/* PM Surya Ghar Yojana Section */}
      <div
        style={{
          background: `linear-gradient(135deg, ${BLUE} 0%, #153b7a 100%)`,
          padding: "10px 40px",
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "2px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          🇮🇳
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontFamily: "Georgia, serif",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "1px",
              marginBottom: "2px",
            }}
          >
            PM Surya Ghar Muft Bijli Yojana
          </div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px" }}>
            Authorized Partner | Rooftop Solar Subsidy Scheme by Government of
            India
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "5px",
              flexWrap: "wrap",
            }}
          >
            {[
              "Free electricity up to 300 units/month",
              "Central subsidy up to ₹78,000",
              "1 crore households targeted",
            ].map((item) => (
              <span
                key={item}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "10px",
                  padding: "3px 8px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Proposal For Section */}
      <div
        style={{
          background: "#E8F5EE",
          padding: "14px 40px",
          textAlign: "center",
          flex: "0 0 auto",
          borderBottom: `2px solid ${GREEN}`,
        }}
      >
        <p
          style={{
            color: GREEN,
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            margin: 0,
            fontWeight: 600,
          }}
        >
          Solar Energy Proposal Prepared For
        </p>
        <h2
          style={{
            color: "#1A1A1A",
            fontFamily: "Georgia, serif",
            fontSize: "24px",
            fontWeight: 700,
            margin: "6px 0 4px",
          }}
        >
          {customer.name || "Customer Name"}
        </h2>
        <p style={{ color: "#4a5568", fontSize: "13px", margin: 0 }}>
          {customer.address || "Customer Address"}
        </p>
        {customer.mobile && (
          <p style={{ color: "#4a5568", fontSize: "12px", marginTop: "3px" }}>
            {customer.mobile} {customer.email ? `| ${customer.email}` : ""}
          </p>
        )}
        {customer.consumerNumber && (
          <p style={{ color: "#4a5568", fontSize: "12px", marginTop: "3px" }}>
            Consumer No: <strong>{customer.consumerNumber}</strong>
          </p>
        )}
      </div>

      {/* Decorative center */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: "#fff",
          padding: "10px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Solar icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 10px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${BLUE}22 0%, ${GREEN}22 60%, transparent 80%)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "18px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${BLUE}44, ${GREEN}44)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "32px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${GREEN}, ${BLUE})`,
              }}
            />
          </div>
          <p
            style={{
              color: "#1A1A1A",
              fontSize: "14px",
              fontFamily: "Georgia, serif",
              fontWeight: 600,
              margin: "0 0 4px",
            }}
          >
            Harnessing the Power of the Sun
          </p>
          <p style={{ color: GREEN, fontSize: "12px", margin: 0 }}>
            Clean · Affordable · Sustainable Energy for Odisha
          </p>
        </div>
      </div>

      {/* Bottom Details */}
      <div
        style={{
          background: `linear-gradient(135deg, ${GREEN}, #145236)`,
          padding: "12px 40px 14px",
          flex: "0 0 auto",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            textAlign: "center",
          }}
        >
          {[
            [
              "SYSTEM CAPACITY",
              `${customer.capacity} kW`,
              "Solar Power System",
            ],
            ["QUOTATION NO", customer.quotationNumber, "Reference Number"],
            ["DATE", formatted, "Issue Date"],
          ].map(([label, val, sub]) => (
            <div
              key={label}
              style={{
                padding: "8px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "8px",
                  margin: "0 0 4px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                  margin: 0,
                  fontFamily: "Georgia, serif",
                }}
              >
                {val}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "8px",
                  margin: "2px 0 0",
                }}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "8px",
            paddingTop: "7px",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "9px",
              margin: 0,
            }}
          >
            {COMPANY.address}
            <br />
            {COMPANY.mobile} | {COMPANY.email} | {COMPANY.website}
          </p>
        </div>
      </div>
    </div>
  );
}
