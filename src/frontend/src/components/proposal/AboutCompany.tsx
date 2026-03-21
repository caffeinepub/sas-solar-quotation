import PageHeader from "./PageHeader";

export default function AboutCompany() {
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
      desc: "Delivering world-class solar solutions with certified engineers, quality materials, and after-sales support.",
    },
    {
      icon: "🌿",
      title: "Green Energy Mission",
      desc: "Committed to making Odisha energy-independent through clean, affordable, and reliable solar power solutions.",
    },
  ];
  return (
    <div className="a4-page">
      <PageHeader title="About Us" subtitle="Our Story & Commitment" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="Logo"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              marginBottom: "8px",
            }}
          />
          <p
            style={{
              color: "#0A1628",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            SHREE ADISHAKTI
          </p>
          <p style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700 }}>
            SOLAR PVT LTD
          </p>
        </div>
        <div>
          <p
            style={{
              color: "#2d3748",
              fontSize: "13px",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            Shree Adishakti Solar Pvt Ltd is a premier solar energy solutions
            company headquartered in Bhubaneswar, Odisha. As a trusted name in
            the renewable energy sector, we specialize in the design, supply,
            installation, and commissioning of rooftop solar photovoltaic
            systems for residential, commercial, and industrial clients. Our
            mission is to accelerate Odisha's transition to clean energy by
            making solar power accessible, affordable, and reliable for every
            household and business.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {highlights.map((h) => (
          <div
            key={h.title}
            style={{
              padding: "14px",
              borderRadius: "8px",
              background: "#f8fafc",
              borderLeft: "4px solid #D4AF37",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <span style={{ fontSize: "20px" }}>{h.icon}</span>
              <span
                style={{ color: "#0A1628", fontSize: "12px", fontWeight: 700 }}
              >
                {h.title}
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
              {h.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#0A1628",
          borderRadius: "10px",
          padding: "16px 20px",
        }}
      >
        <p
          style={{
            color: "#D4AF37",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            margin: "0 0 12px",
            textAlign: "center",
          }}
        >
          COMPANY DETAILS
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {[
            [
              "Registered Address",
              "472/1561, Lane 4, Basudev Nagar, Basuaghai, TANKAPANI ROAD, Near SAI TEMPLE, Bhubaneswar, Khordha, Odisha 751018",
            ],
            ["Email", "info.sassolar@gmail.com"],
            ["Website", "www.shreeadishaktisolar.com"],
            ["Mobile", "+91 95833 90808"],
            ["GST No", "21ABSCS6348D1Z7"],
            ["PAN No", "ABSCS6348D"],
            ["CIN No", "U35105OD2026PTC052397"],
            ["State", "Odisha (State Code: 21)"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "6px",
              }}
            >
              <span style={{ color: "#a0b4c8", fontSize: "10px" }}>{k}: </span>
              <span style={{ color: "#fff", fontSize: "10px" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
