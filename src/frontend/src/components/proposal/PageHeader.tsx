const BG = "#1B6B45";
const ACCENT = "#1A4FA0";

interface Props {
  title: string;
  subtitle?: string;
}
export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: BG,
          borderRadius: "8px 8px 0 0",
          padding: "10px 14px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#fff",
              fontFamily: "Georgia, serif",
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "1px",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "10px",
                margin: "2px 0 0",
                letterSpacing: "1px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <img
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="Logo"
            style={{ width: "38px", height: "38px", objectFit: "contain" }}
          />
        </div>
      </div>
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg, ${BG}, ${ACCENT}, transparent)`,
        }}
      />
    </div>
  );
}
