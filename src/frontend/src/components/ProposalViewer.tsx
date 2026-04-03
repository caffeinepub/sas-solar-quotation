import type { BankDetails, CustomerData } from "../types";
import { calculate } from "../utils/calculations";
import AboutAndBenefits from "./proposal/AboutAndBenefits";
import BatteryDetails from "./proposal/BatteryDetails";
import BillOfMaterial from "./proposal/BillOfMaterial";
import CoverPage from "./proposal/CoverPage";
import FinancialAndSpecs from "./proposal/FinancialAndSpecs";
import InvoiceAndPayment from "./proposal/InvoiceAndPayment";
import ThanksPage from "./proposal/ThanksPage";
import WarrantyAndExecution from "./proposal/WarrantyAndExecution";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

interface Props {
  customer: CustomerData;
  bank: BankDetails;
  onBack: () => void;
  upiQrImage?: string;
}

export default function ProposalViewer({
  customer,
  bank,
  onBack,
  upiQrImage,
}: Props) {
  const calc = calculate(customer);
  const isHybridOrOffGrid =
    customer.systemType === "hybrid" || customer.systemType === "offgrid";

  return (
    <div style={{ background: "#E8F5EE", minHeight: "100vh" }}>
      <div
        className="no-print"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: GREEN,
          borderBottom: `2px solid ${BLUE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="Logo"
            style={{ width: "36px", height: "36px", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "Georgia, serif",
              }}
            >
              Solar Proposal
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>
              {customer.name} - {customer.quotationNumber}
              {isHybridOrOffGrid && (
                <span
                  style={{
                    marginLeft: "8px",
                    background: BLUE,
                    color: "#fff",
                    fontSize: "9px",
                    padding: "1px 6px",
                    borderRadius: "10px",
                    fontWeight: 700,
                  }}
                >
                  {customer.systemType === "hybrid" ? "HYBRID" : "OFF-GRID"}
                </span>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            data-ocid="viewer.back.button"
            onClick={onBack}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.4)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Back to Form
          </button>
          <button
            type="button"
            data-ocid="viewer.print.primary_button"
            onClick={() => window.print()}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              background: BLUE,
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "13px",
              border: "none",
            }}
          >
            🖨️ Print / Export PDF
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 0" }}>
        <CoverPage customer={customer} />
        <AboutAndBenefits customer={customer} calc={calc} />
        <FinancialAndSpecs customer={customer} calc={calc} />
        <BillOfMaterial customer={customer} />
        {isHybridOrOffGrid && <BatteryDetails customer={customer} />}
        <InvoiceAndPayment
          customer={customer}
          bank={bank}
          upiQrImage={upiQrImage}
        />
        <WarrantyAndExecution systemType={customer.systemType} />
        <ThanksPage customer={customer} />
      </div>
    </div>
  );
}
