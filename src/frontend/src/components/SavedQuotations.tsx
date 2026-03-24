import { useState } from "react";
import type { BankDetails, CustomerData } from "../types";
import { formatINR } from "../utils/calculations";

interface SavedQuote {
  id: string;
  savedAt: string;
  customer: CustomerData;
  bank: BankDetails;
}

interface Props {
  onBack: () => void;
  onViewQuote: (customer: CustomerData, bank: BankDetails) => void;
}

function loadQuotes(): SavedQuote[] {
  try {
    return JSON.parse(localStorage.getItem("sas_saved_quotes") || "[]");
  } catch {
    return [];
  }
}

export default function SavedQuotations({ onBack, onViewQuote }: Props) {
  const [quotes, setQuotes] = useState<SavedQuote[]>(loadQuotes);

  const handleDelete = (id: string) => {
    const updated = quotes.filter((q) => q.id !== id);
    localStorage.setItem("sas_saved_quotes", JSON.stringify(updated));
    setQuotes(updated);
  };

  const sectionStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(212,175,55,0.2)",
    borderRadius: "12px",
    padding: "20px",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #0d1f3c 100%)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="SAS Solar"
            className="w-10 h-10 object-contain rounded-full"
          />
          <div>
            <div
              className="font-bold text-sm"
              style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
            >
              SHREE ADISHAKTI SOLAR PVT LTD
            </div>
            <div className="text-xs" style={{ color: "#a0b4c8" }}>
              Saved Quotations
            </div>
          </div>
        </div>
        <button
          type="button"
          data-ocid="saved.back.button"
          onClick={onBack}
          className="text-xs px-4 py-2 rounded-lg font-medium transition-all hover:opacity-80"
          style={{
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#D4AF37",
            background: "rgba(212,175,55,0.08)",
          }}
        >
          ← New Quotation
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-bold"
            style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
          >
            Saved Quotations
          </h2>
          <span
            className="text-sm px-3 py-1 rounded-full"
            style={{
              background: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#D4AF37",
            }}
          >
            {quotes.length} {quotes.length === 1 ? "Quote" : "Quotes"}
          </span>
        </div>

        {quotes.length === 0 ? (
          <div
            data-ocid="saved.empty_state"
            className="text-center py-20"
            style={sectionStyle}
          >
            <div className="text-5xl mb-4">📋</div>
            <div
              className="text-base font-semibold mb-2"
              style={{ color: "#D4AF37" }}
            >
              No saved quotations yet
            </div>
            <div className="text-sm" style={{ color: "#a0b4c8" }}>
              Generate a proposal to save it here. Your quotations will be
              stored locally and available for download anytime.
            </div>
            <button
              type="button"
              data-ocid="saved.new_quote.primary_button"
              onClick={onBack}
              className="mt-6 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #D4AF37, #FF6B35)",
                color: "#0A1628",
              }}
            >
              Create New Quotation
            </button>
          </div>
        ) : (
          <div
            data-ocid="saved.list"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {quotes.map((q, idx) => (
              <div
                key={q.id}
                data-ocid={`saved.item.${idx + 1}`}
                className="rounded-xl p-4 flex flex-col gap-3 transition-all hover:border-yellow-400"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "#ffffff" }}
                    >
                      {q.customer.name || "Unnamed Customer"}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#D4AF37" }}
                    >
                      {q.customer.quotationNumber}
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(104,211,145,0.12)",
                      border: "1px solid rgba(104,211,145,0.3)",
                      color: "#68d391",
                    }}
                  >
                    {q.customer.capacity} kW
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: "#a0b4c8" }}>
                      Sale Price
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#D4AF37" }}
                    >
                      {formatINR(q.customer.salePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: "#a0b4c8" }}>
                      Saved On
                    </span>
                    <span className="text-xs" style={{ color: "#ffffff" }}>
                      {new Date(q.savedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {q.customer.mobile && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: "#a0b4c8" }}>
                        Mobile
                      </span>
                      <span className="text-xs" style={{ color: "#ffffff" }}>
                        {q.customer.mobile}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div
                  className="flex gap-2 mt-auto pt-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <button
                    type="button"
                    data-ocid={`saved.view.button.${idx + 1}`}
                    onClick={() => onViewQuote(q.customer, q.bank)}
                    className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-80"
                    style={{
                      background: "linear-gradient(90deg, #D4AF37, #FF6B35)",
                      color: "#0A1628",
                    }}
                  >
                    View Proposal
                  </button>
                  <button
                    type="button"
                    data-ocid={`saved.delete_button.${idx + 1}`}
                    onClick={() => handleDelete(q.id)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                    style={{
                      background: "rgba(245,101,101,0.12)",
                      border: "1px solid rgba(245,101,101,0.35)",
                      color: "#fc8181",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className="text-center py-6 mt-8"
        style={{ color: "#4a5568", fontSize: "11px" }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#D4AF37" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
