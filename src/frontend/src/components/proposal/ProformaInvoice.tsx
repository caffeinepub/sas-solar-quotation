import type { CustomerData } from "../../types";
import { formatINR, numberToWords } from "../../utils/calculations";
import PageHeader from "./PageHeader";

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

function computeItems(salePrice: number, kw: number): LineItem[] {
  const panels = Math.ceil((kw * 1000) / 545);
  const allocs = [
    {
      key: "pv",
      desc: `Solar PV Modules - 545W Mono PERC (${kw}kW)`,
      hsn: "85414011",
      qty: String(panels),
      unit: "Nos",
      pct: 0.4,
      gst: 5,
    },
    {
      key: "inv",
      desc: `Solar Inverter - ${kw}kW Grid-Tie String Inverter`,
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
      desc: "DC / AC Solar Cables (4mm\u00b2 & 6mm\u00b2)",
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

export default function ProformaInvoice({
  customer,
}: { customer: CustomerData }) {
  const items = computeItems(customer.salePrice, customer.capacity);
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
  const headers = [
    "#",
    "Description",
    "HSN/SAC",
    "Qty",
    "Unit",
    "Base Amt (\u20b9)",
    "GST%",
    "CGST (\u20b9)",
    "SGST (\u20b9)",
    "Total (\u20b9)",
  ];

  return (
    <div className="a4-page" style={{ fontSize: "10px" }}>
      <PageHeader
        title="Proforma Invoice"
        subtitle="For Bank Loan / Government Subsidy Purpose"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            background: "#0A1628",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <p
            style={{
              color: "#D4AF37",
              fontSize: "9px",
              fontWeight: 700,
              margin: "0 0 6px",
              letterSpacing: "1px",
            }}
          >
            SELLER
          </p>
          <p style={{ color: "#fff", fontWeight: 700, margin: "0 0 2px" }}>
            {COMPANY.name}
          </p>
          <p
            style={{
              color: "#a0b4c8",
              fontSize: "9px",
              margin: "0 0 2px",
              whiteSpace: "pre-line",
            }}
          >
            {COMPANY.address}
          </p>
          <p style={{ color: "#a0b4c8", fontSize: "9px", margin: "0 0 2px" }}>
            GST: {COMPANY.gst} | PAN: {COMPANY.pan}
          </p>
          <p style={{ color: "#a0b4c8", fontSize: "9px", margin: 0 }}>
            Mobile: {COMPANY.mobile}
          </p>
        </div>
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "8px",
            padding: "10px",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#0A1628",
              fontSize: "9px",
              fontWeight: 700,
              margin: "0 0 6px",
              letterSpacing: "1px",
            }}
          >
            BILL TO
          </p>
          <p style={{ color: "#0A1628", fontWeight: 700, margin: "0 0 2px" }}>
            {customer.name || "Customer Name"}
          </p>
          <p style={{ color: "#4a5568", fontSize: "9px", margin: "0 0 2px" }}>
            {customer.address || "-"}
          </p>
          <p style={{ color: "#4a5568", fontSize: "9px", margin: "0 0 2px" }}>
            Mobile: {customer.mobile || "-"}
          </p>
          <p style={{ color: "#4a5568", fontSize: "9px", margin: 0 }}>
            Email: {customer.email || "-"}
          </p>
          <div style={{ marginTop: "8px", display: "flex", gap: "16px" }}>
            <div>
              <p style={{ color: "#7a8898", fontSize: "9px", margin: 0 }}>
                Invoice No
              </p>
              <p style={{ color: "#0A1628", fontWeight: 700, margin: 0 }}>
                PI-{customer.quotationNumber}
              </p>
            </div>
            <div>
              <p style={{ color: "#7a8898", fontSize: "9px", margin: 0 }}>
                Date
              </p>
              <p style={{ color: "#0A1628", fontWeight: 700, margin: 0 }}>
                {formatted}
              </p>
            </div>
          </div>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "9px",
          marginBottom: "10px",
        }}
      >
        <thead>
          <tr style={{ background: "#0A1628" }}>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  padding: "5px 6px",
                  color: "#D4AF37",
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
                style={{ background: idx % 2 === 0 ? "#f8fafc" : "#fff" }}
              >
                <td style={{ padding: "5px 6px", color: "#7a8898" }}>
                  {idx + 1}
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    color: "#0A1628",
                    fontWeight: 500,
                  }}
                >
                  {item.desc}
                </td>
                <td style={{ padding: "5px 6px", color: "#7a8898" }}>
                  {item.hsn}
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    textAlign: "right",
                    color: "#2d3748",
                  }}
                >
                  {item.qty}
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    textAlign: "right",
                    color: "#2d3748",
                  }}
                >
                  {item.unit}
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    textAlign: "right",
                    color: "#2d3748",
                  }}
                >
                  {Math.round(item.baseAmount).toLocaleString("en-IN")}
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    textAlign: "right",
                    color: "#2d3748",
                  }}
                >
                  {item.gstRate}%
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    textAlign: "right",
                    color: "#2d3748",
                  }}
                >
                  {Math.round(cgst).toLocaleString("en-IN")}
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    textAlign: "right",
                    color: "#2d3748",
                  }}
                >
                  {Math.round(sgst).toLocaleString("en-IN")}
                </td>
                <td
                  style={{
                    padding: "5px 6px",
                    textAlign: "right",
                    fontWeight: 600,
                    color: "#0A1628",
                  }}
                >
                  {Math.round(total).toLocaleString("en-IN")}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr style={{ background: "#f0f4f8" }}>
            <td
              colSpan={5}
              style={{ padding: "5px 6px", color: "#0A1628", fontWeight: 700 }}
            >
              Sub Total
            </td>
            <td
              style={{
                padding: "5px 6px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(subtotal).toLocaleString("en-IN")}
            </td>
            <td />
            <td
              style={{
                padding: "5px 6px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(totalCGST).toLocaleString("en-IN")}
            </td>
            <td
              style={{
                padding: "5px 6px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(totalSGST).toLocaleString("en-IN")}
            </td>
            <td
              style={{
                padding: "5px 6px",
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              {Math.round(subtotal + totalCGST + totalSGST).toLocaleString(
                "en-IN",
              )}
            </td>
          </tr>
          <tr style={{ background: "#0A1628" }}>
            <td
              colSpan={9}
              style={{
                padding: "6px",
                color: "#D4AF37",
                fontWeight: 700,
                fontSize: "10px",
              }}
            >
              GRAND TOTAL
            </td>
            <td
              style={{
                padding: "6px",
                textAlign: "right",
                color: "#D4AF37",
                fontWeight: 700,
                fontSize: "11px",
              }}
            >
              {Math.round(grandTotal).toLocaleString("en-IN")}
            </td>
          </tr>
        </tfoot>
      </table>

      <div
        style={{
          background: "#fffbf0",
          border: "1px solid #D4AF37",
          borderRadius: "6px",
          padding: "8px 10px",
          marginBottom: "8px",
        }}
      >
        <span style={{ color: "#7a6a3a", fontSize: "9px", fontWeight: 700 }}>
          Amount in Words:{" "}
        </span>
        <span style={{ color: "#0A1628", fontSize: "9px" }}>
          {numberToWords(Math.round(grandTotal))}
        </span>
      </div>

      <div
        style={{
          padding: "8px",
          background: "#f8fafc",
          borderRadius: "6px",
          border: "1px dashed #a0b4c8",
        }}
      >
        <p
          style={{
            color: "#4a5568",
            fontSize: "9px",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          <strong>Note:</strong> This is a Proforma Invoice for bank loan /
          government subsidy purposes only. GST rates: Solar PV Modules &
          Inverter @ 5% (HSN 85414011, 85044090); Others @ 18%. Actual Tax
          Invoice will be raised at the time of supply. GST Reg: {COMPANY.gst}{" "}
          (Odisha, State Code 21).
        </p>
      </div>
    </div>
  );
}
