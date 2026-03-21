import type { BankDetails, CustomerData } from "../types";
import { calculate } from "../utils/calculations";
import AboutAndBenefits from "./proposal/AboutAndBenefits";
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
}

export default function ProposalViewer({ customer, bank, onBack }: Props) {
  const calc = calculate(customer);

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
            src="/assets/generated/sas-solar-logo-transparent.dim_400x400.png"
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
        <InvoiceAndPayment customer={customer} bank={bank} />
        <WarrantyAndExecution />
        <ThanksPage />
      </div>
    </div>
  );
}
