import type { CustomerData } from "../../types";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

const COMPANY = {
  name: "SHREE ADISHAKTI SOLAR PVT LTD",
  address:
    "472/1561, Lane 4, Basudev Nagar, Basuaghai, TANKAPANI ROAD, Near SAI TEMPLE, Bhubaneswar, Khordha, Odisha 751018",
  mobile: "+91 95833 90808",
  email: "info.sassolar@gmail.com",
  website: "www.shreeadishaktisolar.com",
  gst: "21ABSCS6348D1Z7",
};

export default function ThanksPage({ customer }: { customer?: CustomerData }) {
  const showPartner =
    customer?.isChannelPartner && customer?.channelPartnerName?.trim();

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
      {/* Top green header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${GREEN} 0%, #145236 100%)`,
          padding: "40px 40px 30px",
          textAlign: "center",
          flex: "0 0 auto",
        }}
      >
        <img
          src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
          alt="Logo"
          style={{
            width: "90px",
            height: "90px",
            objectFit: "contain",
            marginBottom: "12px",
          }}
        />
        <h1
          style={{
            color: "#fff",
            fontFamily: "Georgia, serif",
            fontSize: "20px",
            letterSpacing: "3px",
            margin: "0 0 6px",
            fontWeight: 700,
          }}
        >
          {COMPANY.name}
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "11px",
            margin: 0,
            letterSpacing: "1px",
          }}
        >
          BRIGHT POWER FOR BETTER FUTURE | PM SURYA GHAR YOJANA
        </p>
      </div>

      {/* Blue accent */}
      <div
        style={{
          height: "5px",
          background: `linear-gradient(90deg, ${GREEN}, ${BLUE}, ${GREEN})`,
        }}
      />

      {/* Main Thank You section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${GREEN}, ${BLUE})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            marginBottom: "24px",
            boxShadow: `0 8px 24px ${GREEN}44`,
          }}
        >
          🙏
        </div>

        <h2
          style={{
            color: GREEN,
            fontFamily: "Georgia, serif",
            fontSize: "32px",
            fontWeight: 700,
            margin: "0 0 10px",
          }}
        >
          Thank You!
        </h2>
        <p
          style={{
            color: "#1A1A1A",
            fontSize: "17px",
            fontFamily: "Georgia, serif",
            fontWeight: 600,
            margin: "0 0 8px",
          }}
        >
          Thank you for choosing Shree Adishakti Solar Pvt Ltd
        </p>
        <p
          style={{
            color: "#4a5568",
            fontSize: "13px",
            maxWidth: "480px",
            lineHeight: "1.7",
            margin: "0 0 32px",
          }}
        >
          We are honoured by your trust in us. Our team is committed to
          delivering a seamless solar installation experience and ensuring your
          system performs optimally for decades to come. Together, let's build a
          cleaner, greener Odisha.
        </p>

        {/* Tagline banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${GREEN}, ${BLUE})`,
            borderRadius: "12px",
            padding: "18px 36px",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: "16px",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "1px",
            }}
          >
            ☀️ Bright Power for Better Future ☀️
          </p>
        </div>

        {/* Channel Partner Badge — only shown when enabled */}
        {showPartner && (
          <div
            style={{
              background: "#FFF8E7",
              border: "2px solid #D4A017",
              borderRadius: "10px",
              padding: "14px 32px",
              marginBottom: "28px",
              minWidth: "320px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#7a5c00",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              ⭐ Official Channel Partner
            </p>
            <p
              style={{
                margin: "6px 0 2px",
                fontSize: "16px",
                color: "#1A1A1A",
                fontWeight: 700,
                fontFamily: "Georgia, serif",
              }}
            >
              {customer?.channelPartnerName}
            </p>
            <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
              Officially Authorised Channel Partner of Shree Adishakti Solar Pvt
              Ltd
            </p>
          </div>
        )}

        {/* Contact cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            width: "100%",
            maxWidth: "500px",
            marginBottom: "24px",
          }}
        >
          {[
            {
              icon: "📞",
              label: "Call Us",
              value: COMPANY.mobile,
              color: GREEN,
            },
            { icon: "✉️", label: "Email Us", value: COMPANY.email, color: BLUE },
            {
              icon: "🌐",
              label: "Website",
              value: COMPANY.website,
              color: GREEN,
            },
            { icon: "🏛️", label: "GST No", value: COMPANY.gst, color: BLUE },
          ].map(({ icon, label, value, color }) => (
            <div
              key={label}
              style={{
                background: "#f8fafc",
                borderRadius: "8px",
                padding: "12px 14px",
                borderLeft: `3px solid ${color}`,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "3px",
                }}
              >
                <span style={{ fontSize: "16px" }}>{icon}</span>
                <span
                  style={{
                    color: color,
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  {label.toUpperCase()}
                </span>
              </div>
              <p
                style={{
                  color: "#1A1A1A",
                  fontSize: "11px",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            color: "#7a8898",
            fontSize: "11px",
            margin: 0,
            lineHeight: "1.6",
            maxWidth: "500px",
          }}
        >
          {COMPANY.address}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          background: `linear-gradient(135deg, ${GREEN}, #145236)`,
          padding: "16px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "11px",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} {COMPANY.name} · All Rights Reserved
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "10px",
            margin: "4px 0 0",
          }}
        >
          Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
