import type { BankDetails, CustomerData } from "../../types";
import { formatINR, numberToWords } from "../../utils/calculations";
import PageHeader from "./PageHeader";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

const COMPANY = {
  name: "SHREE ADISHAKTI SOLAR PVT LTD",
  address:
    "472/1561, Lane 4, Basudev Nagar, Basuaghai, TANKAPANI ROAD,\nNear SAI TEMPLE, Bhubaneswar, Khordha, Odisha 751018",
  gst: "21ABSCS6348D1Z7",
  pan: "ABSCS6348D",
  mobile: "+91 95833 90808",
};

interface LineItem {
  key: string;
  desc: string;
  hsn: string;
  qty: string;
  unit: string;
  baseAmount: number;
  gstRate: number;
}

function computeItems(
  salePrice: number,
  kw: number,
  panelBrand = "Tata",
  panelWattage = 545,
  inverterBrand = "Tata",
): LineItem[] {
  const panels = Math.ceil((kw * 1000) / panelWattage);
  const allocs = [
    {
      key: "pv",
      desc: `${panelBrand} Bifacial Solar PV Modules - ${panelWattage}Wp (${kw}kW)`,
      hsn: "85414011",
      qty: String(panels),
      unit: "Nos",
      pct: 0.4,
      gst: 5,
    },
    {
      key: "inv",
      desc: `${inverterBrand} Solar Inverter - ${kw}kW Grid-Tie String Inverter`,
      hsn: "85044090",
      qty: "1",
      unit: "No",
      pct: 0.2,
      gst: 5,
    },
    {
      key: "mnt",
      desc: "Hot-Dip Galvanized Mounting Structure",
      hsn: "73089090",
      qty: "1",
      unit: "Set",
      pct: 0.12,
      gst: 18,
    },
    {
      key: "cbl",
      desc: "DC / AC Solar Cables (4mm² & 6mm²)",
      hsn: "85444290",
      qty: "1",
      unit: "Lot",
      pct: 0.06,
      gst: 18,
    },
    {
      key: "bos",
      desc: "Junction Box / BOS with SPD & Fuses",
      hsn: "85369090",
      qty: "1",
      unit: "Set",
      pct: 0.04,
      gst: 18,
    },
    {
      key: "ins",
      desc: "Installation & Civil Work",
      hsn: "995461",
      qty: "1",
      unit: "Job",
      pct: 0.12,
      gst: 18,
    },
    {
      key: "net",
      desc: "Net Metering & DISCOM Charges",
      hsn: "995461",
      qty: "1",
      unit: "Job",
      pct: 0.06,
      gst: 18,
    },
  ];
  return allocs.map((a) => {
    const totalWithGst = salePrice * a.pct;
    const baseAmount = totalWithGst / (1 + a.gst / 100);
    return {
      key: a.key,
      desc: a.desc,
      hsn: a.hsn,
      qty: a.qty,
      unit: a.unit,
      baseAmount,
      gstRate: a.gst,
    };
  });
}

export default function InvoiceAndPayment({
  customer,
  bank,
  upiQrImage,
}: {
  customer: CustomerData;
  bank: BankDetails;
  upiQrImage?: string;
}) {
  const items = computeItems(
    customer.salePrice,
    customer.capacity,
    customer.panelBrand,
    customer.panelWattage,
    customer.inverterBrand,
  );
  const subtotal = items.reduce((s, item) => s + item.baseAmount, 0);
  const totalCGST = items.reduce(
    (s, item) => s + (item.baseAmount * item.gstRate) / 200,
    0,
  );
  const totalSGST = totalCGST;
  const grandTotal = subtotal + totalCGST + totalSGST;
  const formatted = new Date(customer.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Payment schedule: FIXED at 100% total
  const schedule = [
    {
      key: "advance",
      milestone: "Booking / Advance Payment",
      condition: "At Order Confirmation",
      pct: 5,
    },
    {
      key: "before",
      milestone: "Pre-Dispatch of Material (70%)",
      condition: "Pre-Dispatch of Material",
      pct: 70,
    },
    {
      key: "after",
      milestone: "After Installation",
      condition: "After Successful Installation & Testing",
      pct: 25,
    },
  ];

  return (
    <div className="a4-page" style={{ fontSize: "9px" }}>
      <PageHeader
        title="Proforma Invoice & Payment Terms"
        subtitle="GST Invoice | Payment Schedule | Bank Details"
      />

      {/* Seller / Buyer */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            background: GREEN,
            borderRadius: "6px",
            padding: "8px 10px",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "8px",
              fontWeight: 700,
              margin: "0 0 4px",
              letterSpacing: "1px",
            }}
          >
            SELLER
          </p>
          <p
            style={{
              color: "#fff",
              fontWeight: 700,
              margin: "0 0 2px",
              fontSize: "9px",
            }}
          >
            {COMPANY.name}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "8px",
              margin: "0 0 2px",
              whiteSpace: "pre-line",
            }}
          >
            {COMPANY.address}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "8px",
              margin: 0,
            }}
          >
            GST: {COMPANY.gst} | PAN: {COMPANY.pan}
          </p>
        </div>
        <div
          style={{
            background: "#E8F0FA",
            borderRadius: "6px",
            padding: "8px 10px",
            border: `1px solid ${BLUE}33`,
          }}
        >
          <p
            style={{
              color: BLUE,
              fontSize: "8px",
              fontWeight: 700,
              margin: "0 0 4px",
              letterSpacing: "1px",
            }}
          >
            BILL TO
          </p>
          <p
            style={{
              color: "#1A1A1A",
              fontWeight: 700,
              margin: "0 0 2px",
              fontSize: "9px",
            }}
          >
            {customer.name || "Customer Name"}
          </p>
          <p style={{ color: "#4a5568", fontSize: "8px", margin: "0 0 2px" }}>
            {customer.address || "-"}
          </p>
          <p style={{ color: "#4a5568", fontSize: "8px", margin: 0 }}>
            Mobile: {customer.mobile || "-"} | Email: {customer.email || "-"}
          </p>
          <div style={{ marginTop: "6px", display: "flex", gap: "16px" }}>
            <div>
              <p style={{ color: "#7a8898", fontSize: "8px", margin: 0 }}>
                Invoice No
              </p>
              <p
                style={{
                  color: BLUE,
                  fontWeight: 700,
                  margin: 0,
                  fontSize: "9px",
                }}
              >
                PI-{customer.quotationNumber}
              </p>
            </div>
            <div>
              <p style={{ color: "#7a8898", fontSize: "8px", margin: 0 }}>
                Date
              </p>
              <p
                style={{
                  color: BLUE,
                  fontWeight: 700,
                  margin: 0,
                  fontSize: "9px",
                }}
              >
                {formatted}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "8.5px",
          marginBottom: "6px",
        }}
      >
        <thead>
          <tr style={{ background: GREEN }}>
            {[
              "#",
              "Description",
              "HSN/SAC",
              "Qty",
              "Unit",
              "Base Amt (₹)",
              "GST%",
              "CGST (₹)",
              "SGST (₹)",
              "Total (₹)",
            ].map((h) => (
              <th
                key={h}
                style={{
                  padding: "4px 5px",
                  color: "#fff",
                  textAlign:
                    h === "#" || h === "Description" || h === "HSN/SAC"
                      ? "left"
                      : "right",
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
          {items.map((item, idx) => {
            const cgst = (item.baseAmount * item.gstRate) / 200;
            const sgst = cgst;
            const total = item.baseAmount + cgst + sgst;
            return (
              <tr
                key={item.key}
                style={{ background: idx % 2 === 0 ? "#E8F5EE" : "#fff" }}
              >
                <td style={{ padding: "4px 5px", color: "#7a8898" }}>
                  {idx + 1}
                </td>
                <td
                  style={{
                    padding: "4px 5px",
                    color: "#1A1A1A",
                    fontWeight: 500,
                  }}
                >
                  {item.desc}
                </td>
                <td style={{ padding: "4px 5px", color: "#7a8898" }}>
                  {item.hsn}
                </td>
                <td style={{ padding: "4px 5px", textAlign: "right" }}>
                  {item.qty}
                </td>
                <td style={{ padding: "4px 5px", textAlign: "right" }}>
                  {item.unit}
                </td>
                <td style={{ padding: "4px 5px", textAlign: "right" }}>
                  {Math.round(item.baseAmount).toLocaleString("en-IN")}
                </td>
                <td style={{ padding: "4px 5px", textAlign: "right" }}>
                  {item.gstRate}%
                </td>
                <td style={{ padding: "4px 5px", textAlign: "right" }}>
                  {Math.round(cgst).toLocaleString("en-IN")}
                </td>
                <td style={{ padding: "4px 5px", textAlign: "right" }}>
                  {Math.round(sgst).toLocaleString("en-IN")}
                </td>
                <td
                  style={{
                    padding: "4px 5px",
                    textAlign: "right",
                    fontWeight: 600,
                    color: "#1A1A1A",
                  }}
                >
                  {Math.round(total).toLocaleString("en-IN")}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr style={{ background: "#E8F5EE" }}>
            <td
              colSpan={5}
              style={{ padding: "4px 5px", color: "#1A1A1A", fontWeight: 700 }}
            >
              Sub Total
            </td>
            <td
              style={{
                padding: "4px 5px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(subtotal).toLocaleString("en-IN")}
            </td>
            <td />
            <td
              style={{
                padding: "4px 5px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(totalCGST).toLocaleString("en-IN")}
            </td>
            <td
              style={{
                padding: "4px 5px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(totalSGST).toLocaleString("en-IN")}
            </td>
            <td
              style={{
                padding: "4px 5px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(subtotal + totalCGST + totalSGST).toLocaleString(
                "en-IN",
              )}
            </td>
          </tr>
          <tr style={{ background: GREEN }}>
            <td
              colSpan={9}
              style={{
                padding: "5px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "9px",
              }}
            >
              GRAND TOTAL
            </td>
            <td
              style={{
                padding: "5px",
                textAlign: "right",
                color: "#fff",
                fontWeight: 700,
                fontSize: "10px",
              }}
            >
              {Math.round(grandTotal).toLocaleString("en-IN")}
            </td>
          </tr>
        </tfoot>
      </table>

      <div
        style={{
          background: "#E8F5EE",
          border: `1px solid ${GREEN}`,
          borderRadius: "4px",
          padding: "5px 8px",
          marginBottom: "8px",
        }}
      >
        <span style={{ color: GREEN, fontSize: "8px", fontWeight: 700 }}>
          Amount in Words:{" "}
        </span>
        <span style={{ color: "#1A1A1A", fontSize: "8px" }}>
          {numberToWords(Math.round(grandTotal))}
        </span>
      </div>

      {/* ─── PAYMENT SCHEDULE ─── */}
      <div style={{ borderTop: `2px solid ${BLUE}`, paddingTop: "8px" }}>
        {/* Full-width: Payment Schedule label */}
        <p
          style={{
            color: BLUE,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "1px",
            margin: "0 0 6px",
          }}
        >
          PAYMENT SCHEDULE (100% Total)
        </p>

        {/* Full-width: Payment schedule table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "9px",
            marginBottom: "8px",
          }}
        >
          <thead>
            <tr style={{ background: BLUE }}>
              {[
                "#",
                "Payment Milestone",
                "Condition",
                "Percentage",
                "Amount (₹)",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "5px 7px",
                    color: "#fff",
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
                  background: idx % 2 === 0 ? "#E8F0FA" : "#fff",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td
                  style={{
                    padding: "5px 7px",
                    color: "#7a8898",
                    fontWeight: 600,
                  }}
                >
                  {idx + 1}
                </td>
                <td
                  style={{
                    padding: "5px 7px",
                    color: "#1A1A1A",
                    fontWeight: 600,
                  }}
                >
                  {row.milestone}
                </td>
                <td style={{ padding: "5px 7px", color: "#4a5568" }}>
                  {row.condition}
                </td>
                <td
                  style={{
                    padding: "5px 7px",
                    color: GREEN,
                    fontWeight: 700,
                  }}
                >
                  {row.pct}%
                </td>
                <td
                  style={{
                    padding: "5px 7px",
                    color: "#1A1A1A",
                    fontWeight: 700,
                  }}
                >
                  {formatINR((customer.salePrice * row.pct) / 100)}
                </td>
              </tr>
            ))}
            <tr style={{ background: GREEN }}>
              <td
                colSpan={3}
                style={{
                  padding: "5px 7px",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Total
              </td>
              <td
                style={{
                  padding: "5px 7px",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                100%
              </td>
              <td
                style={{
                  padding: "5px 7px",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {formatINR(customer.salePrice)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Bank details + QR side-by-side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "10px",
          }}
        >
          {/* Bank Details */}
          <div
            style={{
              background: GREEN,
              borderRadius: "6px",
              padding: "8px 10px",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 5px",
              }}
            >
              BANK DETAILS
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
              }}
            >
              {[
                ["Bank Name", bank.bankName],
                ["Account Name", bank.accountName],
                ["Account No", bank.accountNo],
                ["IFSC Code", bank.ifscCode],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: "3px",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "8px",
                    }}
                  >
                    {k}:{" "}
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "8px",
                      fontWeight: 600,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              background: "#E8F5EE",
              borderRadius: "8px",
              border: `2px dashed ${GREEN}`,
              minWidth: "110px",
              alignSelf: "start",
            }}
          >
            <p
              style={{
                color: GREEN,
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              UPI PAYMENT
            </p>
            {upiQrImage ? (
              <img
                src={upiQrImage}
                alt="UPI QR Code"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                  borderRadius: "4px",
                  display: "block",
                  margin: "0 auto 6px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  margin: "0 auto 6px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "#999",
                  textAlign: "center",
                  padding: "4px",
                }}
              >
                Upload QR in form
              </div>
            )}
            <p style={{ color: "#4a5568", fontSize: "8px", margin: "0 0 3px" }}>
              Scan to Pay via UPI
            </p>
            <p style={{ color: GREEN, fontSize: "8px", fontWeight: 700 }}>
              sassolar@pnb
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "6px",
          padding: "6px 8px",
          background: "#E8F5EE",
          border: `1px solid ${GREEN}`,
          borderRadius: "4px",
        }}
      >
        <p
          style={{
            color: "#4a5568",
            fontSize: "8px",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          <strong>Note:</strong> GST rates: Solar PV Modules & Inverter @ 5%
          (HSN 85414011, 85044090); Others @ 18%. All payments in favour of{" "}
          {bank.accountName}. Cash payments above ₹20,000 not accepted as per IT
          regulations.
        </p>
      </div>
    </div>
  );
}
