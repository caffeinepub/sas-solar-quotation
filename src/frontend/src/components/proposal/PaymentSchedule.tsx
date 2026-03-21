import type {
  BankDetails,
  CustomerData,
  PaymentScheduleData,
} from "../../types";
import { formatINR } from "../../utils/calculations";
import PageHeader from "./PageHeader";

const QR_CELLS = [
  { id: "c00", on: 1 },
  { id: "c01", on: 1 },
  { id: "c02", on: 1 },
  { id: "c03", on: 0 },
  { id: "c04", on: 1 },
  { id: "c05", on: 1 },
  { id: "c06", on: 1 },
  { id: "c10", on: 1 },
  { id: "c11", on: 0 },
  { id: "c12", on: 1 },
  { id: "c13", on: 0 },
  { id: "c14", on: 1 },
  { id: "c15", on: 0 },
  { id: "c16", on: 1 },
  { id: "c20", on: 1 },
  { id: "c21", on: 1 },
  { id: "c22", on: 1 },
  { id: "c23", on: 0 },
  { id: "c24", on: 1 },
  { id: "c25", on: 1 },
  { id: "c26", on: 1 },
  { id: "c30", on: 0 },
  { id: "c31", on: 0 },
  { id: "c32", on: 0 },
  { id: "c33", on: 1 },
  { id: "c34", on: 0 },
  { id: "c35", on: 0 },
  { id: "c36", on: 0 },
  { id: "c40", on: 1 },
  { id: "c41", on: 0 },
  { id: "c42", on: 1 },
  { id: "c43", on: 0 },
  { id: "c44", on: 1 },
  { id: "c45", on: 0 },
  { id: "c46", on: 1 },
  { id: "c50", on: 0 },
  { id: "c51", on: 1 },
  { id: "c52", on: 0 },
  { id: "c53", on: 1 },
  { id: "c54", on: 0 },
  { id: "c55", on: 1 },
  { id: "c56", on: 0 },
  { id: "c60", on: 1 },
  { id: "c61", on: 1 },
  { id: "c62", on: 1 },
  { id: "c63", on: 0 },
  { id: "c64", on: 1 },
  { id: "c65", on: 1 },
  { id: "c66", on: 1 },
];

export default function PaymentSchedule({
  customer,
  bank,
  payment,
}: {
  customer: CustomerData;
  bank: BankDetails;
  payment: PaymentScheduleData;
}) {
  const schedule = [
    {
      key: "advance",
      milestone: "Booking / Advance Payment",
      condition: "At Order Confirmation",
      pct: payment.advance,
    },
    {
      key: "before",
      milestone: "Before Installation",
      condition: "15 Days Prior to Installation",
      pct: payment.beforeInstallation,
    },
    {
      key: "material",
      milestone: "Material Arrival",
      condition: "At Material Delivery to Site",
      pct: payment.materialArrival,
    },
    {
      key: "post",
      milestone: "Post Installation",
      condition: "After Successful Installation & Testing",
      pct: payment.afterInstallation,
    },
  ];
  const totalPct = schedule.reduce((s, r) => s + r.pct, 0);

  return (
    <div className="a4-page">
      <PageHeader
        title="Payment Terms & Schedule"
        subtitle="Bank Details & Payment Milestones"
      />

      <div style={{ marginBottom: "20px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr style={{ background: "#0A1628" }}>
              {[
                "#",
                "Payment Milestone",
                "Condition / Due Date",
                "Percentage",
                "Amount (\u20b9)",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "8px 10px",
                    color: "#D4AF37",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, idx) => (
              <tr
                key={row.key}
                style={{
                  background: idx % 2 === 0 ? "#f8fafc" : "#fff",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td
                  style={{
                    padding: "8px 10px",
                    color: "#7a8898",
                    fontWeight: 600,
                  }}
                >
                  {idx + 1}
                </td>
                <td
                  style={{
                    padding: "8px 10px",
                    color: "#0A1628",
                    fontWeight: 600,
                  }}
                >
                  {row.milestone}
                </td>
                <td style={{ padding: "8px 10px", color: "#4a5568" }}>
                  {row.condition}
                </td>
                <td
                  style={{
                    padding: "8px 10px",
                    color: "#FF6B35",
                    fontWeight: 700,
                  }}
                >
                  {row.pct}%
                </td>
                <td
                  style={{
                    padding: "8px 10px",
                    color: "#0A1628",
                    fontWeight: 700,
                  }}
                >
                  {formatINR((customer.salePrice * row.pct) / 100)}
                </td>
              </tr>
            ))}
            <tr style={{ background: "#0A1628" }}>
              <td
                colSpan={3}
                style={{
                  padding: "8px 10px",
                  color: "#D4AF37",
                  fontWeight: 700,
                }}
              >
                Total
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  color: "#D4AF37",
                  fontWeight: 700,
                }}
              >
                {totalPct}%
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  color: "#D4AF37",
                  fontWeight: 700,
                }}
              >
                {formatINR((customer.salePrice * totalPct) / 100)}
              </td>
            </tr>
          </tbody>
        </table>
        {totalPct !== 100 && (
          <p
            style={{
              color: "#7a8898",
              fontSize: "9px",
              marginTop: "6px",
              fontStyle: "italic",
            }}
          >
            * Total payment schedule = {totalPct}% of project cost as per agreed
            terms.
          </p>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "20px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            background: "#0A1628",
            borderRadius: "10px",
            padding: "16px",
          }}
        >
          <p
            style={{
              color: "#D4AF37",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2px",
              margin: "0 0 10px",
            }}
          >
            BANK DETAILS
          </p>
          {[
            ["Bank Name", bank.bankName],
            ["Account Name", bank.accountName],
            ["Account No", bank.accountNo],
            ["IFSC Code", bank.ifscCode],
            ["Account Type", "Current Account"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                gap: "8px",
                padding: "5px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                style={{
                  color: "#a0b4c8",
                  fontSize: "11px",
                  minWidth: "100px",
                }}
              >
                {k}:
              </span>
              <span
                style={{ color: "#fff", fontSize: "11px", fontWeight: 500 }}
              >
                {v}
              </span>
            </div>
          ))}
          <p
            style={{
              color: "#a0b4c8",
              fontSize: "10px",
              marginTop: "8px",
              fontStyle: "italic",
            }}
          >
            Cheque payable to: {bank.accountName}
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "16px",
            background: "#f8fafc",
            borderRadius: "10px",
            border: "2px dashed #D4AF37",
            minWidth: "130px",
          }}
        >
          <p
            style={{
              color: "#7a6a3a",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
              margin: "0 0 8px",
            }}
          >
            UPI PAYMENT
          </p>
          <div
            style={{
              width: "90px",
              height: "90px",
              margin: "0 auto 8px",
              background: "#fff",
              border: "2px solid #0A1628",
              borderRadius: "4px",
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: "2px",
              padding: "6px",
            }}
          >
            {QR_CELLS.map((cell) => (
              <div
                key={cell.id}
                style={{
                  borderRadius: "1px",
                  background: cell.on ? "#0A1628" : "transparent",
                }}
              />
            ))}
          </div>
          <p style={{ color: "#4a5568", fontSize: "9px", margin: "0 0 4px" }}>
            Scan to Pay via UPI
          </p>
          <p style={{ color: "#D4AF37", fontSize: "9px", fontWeight: 700 }}>
            sassolar@pnb
          </p>
        </div>
      </div>

      <div
        style={{
          padding: "10px 12px",
          background: "#fffbf0",
          border: "1px solid #D4AF37",
          borderRadius: "8px",
        }}
      >
        <p
          style={{
            color: "#7a6a3a",
            fontSize: "10px",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          <strong>Important:</strong> All payments to be made in favour of{" "}
          <strong>{bank.accountName}</strong>. Cash payments above &#8377;20,000
          are not accepted as per Income Tax regulations. Please share
          UTR/Transaction ID after online payment for confirmation.
        </p>
      </div>
    </div>
  );
}
