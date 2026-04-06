import { useCallback, useEffect, useState } from "react";
import type { QuotationRecord } from "../backend";
import { createActorWithConfig } from "../config";
import type { BankDetails, CustomerData } from "../types";
import { formatINR } from "../utils/calculations";

interface SavedQuote {
  id: string;
  savedAt: string;
  customer: CustomerData;
  bank: BankDetails;
}

interface Props {
  onViewQuote: (customer: CustomerData, bank: BankDetails) => void;
}

function recordToSavedQuote(r: QuotationRecord): SavedQuote {
  let customer: CustomerData;
  let bank: BankDetails;
  try {
    customer = JSON.parse(r.customerDataJson);
  } catch {
    customer = {
      name: r.customerName,
      mobile: r.mobile,
      capacity: Number(r.capacity),
      salePrice: Number(r.salePrice),
      panelBrand: r.panelBrand,
      systemType: r.systemType as CustomerData["systemType"],
      channelPartnerName: r.channelPartnerName,
    } as CustomerData;
  }
  try {
    bank = JSON.parse(r.bankDataJson);
  } catch {
    bank = {} as BankDetails;
  }
  return { id: r.id, savedAt: r.savedAt, customer, bank };
}

function formatSavedAt(savedAt: string): string {
  try {
    const ms = Number(BigInt(savedAt) / 1_000_000n);
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    try {
      return new Date(savedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return savedAt;
    }
  }
}

function systemTypeBadge(type: string) {
  if (!type) return null;
  const map: Record<string, { label: string; color: string; bg: string }> = {
    ongrid: {
      label: "On-Grid",
      color: "#68d391",
      bg: "rgba(104,211,145,0.12)",
    },
    hybrid: { label: "Hybrid", color: "#63b3ed", bg: "rgba(99,179,237,0.12)" },
    offgrid: {
      label: "Off-Grid",
      color: "#f6ad55",
      bg: "rgba(246,173,85,0.12)",
    },
    "On-Grid": {
      label: "On-Grid",
      color: "#68d391",
      bg: "rgba(104,211,145,0.12)",
    },
    Hybrid: { label: "Hybrid", color: "#63b3ed", bg: "rgba(99,179,237,0.12)" },
    "Off-Grid": {
      label: "Off-Grid",
      color: "#f6ad55",
      bg: "rgba(246,173,85,0.12)",
    },
  };
  const s = map[type] ?? {
    label: type,
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.12)",
  };
  return (
    <span
      className="text-xs px-2 py-0.5 rounded font-semibold"
      style={{
        background: s.bg,
        border: `1px solid ${s.color}40`,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
}

export default function PublicDashboard({ onViewQuote }: Props) {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const actor = await createActorWithConfig();
      const records = await actor.getAllQuotations();
      const sorted = [...records].sort((a, b) => {
        const ta = BigInt(a.savedAt);
        const tb = BigInt(b.savedAt);
        return tb > ta ? 1 : tb < ta ? -1 : 0;
      });
      setQuotes(sorted.map(recordToSavedQuote));
    } catch (err) {
      console.error("Failed to load quotations:", err);
      setError("Could not load quotations. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const filtered = quotes.filter((q) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      (q.customer.name || "").toLowerCase().includes(s) ||
      (q.customer.quotationNumber || "").toLowerCase().includes(s) ||
      (q.customer.mobile || "").toLowerCase().includes(s) ||
      String(q.customer.capacity).includes(s)
    );
  });

  const totalCapacity = quotes.reduce(
    (sum, q) => sum + (q.customer.capacity || 0),
    0,
  );
  const totalRevenue = quotes.reduce(
    (sum, q) => sum + (q.customer.salePrice || 0),
    0,
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #0d1f3c 100%)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
              alt="SAS Solar"
              className="w-12 h-12 object-contain rounded-full"
              style={{ border: "2px solid rgba(212,175,55,0.5)" }}
            />
            <div>
              <div
                className="font-bold text-base"
                style={{
                  color: "#D4AF37",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.03em",
                }}
              >
                SHREE ADISHAKTI SOLAR PVT LTD
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#a0b4c8" }}>
                Quotations Dashboard · Public View
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchQuotes}
              className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{
                border: "1px solid rgba(160,180,200,0.3)",
                color: "#a0b4c8",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              ↻ Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Row */}
        {!loading && quotes.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
            >
              <div className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
                {quotes.length}
              </div>
              <div className="text-xs mt-1" style={{ color: "#a0b4c8" }}>
                Total Quotations
              </div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(104,211,145,0.08)",
                border: "1px solid rgba(104,211,145,0.2)",
              }}
            >
              <div className="text-2xl font-bold" style={{ color: "#68d391" }}>
                {totalCapacity.toLocaleString("en-IN")} kW
              </div>
              <div className="text-xs mt-1" style={{ color: "#a0b4c8" }}>
                Total Capacity Quoted
              </div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(99,179,237,0.08)",
                border: "1px solid rgba(99,179,237,0.2)",
              }}
            >
              <div className="text-xl font-bold" style={{ color: "#63b3ed" }}>
                {formatINR(totalRevenue)}
              </div>
              <div className="text-xs mt-1" style={{ color: "#a0b4c8" }}>
                Total Business Value
              </div>
            </div>
          </div>
        )}

        {/* Search + title row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <h2
            className="text-lg font-bold"
            style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
          >
            All Saved Quotations
          </h2>
          <input
            type="text"
            placeholder="Search by name, quotation no, mobile…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "#ffffff",
            }}
          />
        </div>

        {loading ? (
          <div
            className="text-center py-20 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            <div className="text-4xl mb-4">⏳</div>
            <div className="text-sm" style={{ color: "#a0b4c8" }}>
              Loading quotations…
            </div>
          </div>
        ) : error ? (
          <div
            className="text-center py-20 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(245,101,101,0.2)",
            }}
          >
            <div className="text-4xl mb-4">⚠️</div>
            <div
              className="text-base font-semibold mb-2"
              style={{ color: "#fc8181" }}
            >
              {error}
            </div>
            <button
              type="button"
              onClick={fetchQuotes}
              className="mt-4 px-6 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-80"
              style={{
                background: "rgba(212,175,55,0.15)",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
              }}
            >
              Try Again
            </button>
          </div>
        ) : quotes.length === 0 ? (
          <div
            className="text-center py-20 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            <div className="text-5xl mb-4">📋</div>
            <div
              className="text-base font-semibold mb-2"
              style={{ color: "#D4AF37" }}
            >
              No quotations generated yet
            </div>
            <div className="text-sm" style={{ color: "#a0b4c8" }}>
              Quotations generated from any device will appear here
              automatically.
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-sm" style={{ color: "#a0b4c8" }}>
              No results for "{search}"
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((q, _idx) => (
              <div
                key={q.id}
                className="rounded-xl p-4 flex flex-col gap-3 transition-all hover:border-yellow-400"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-bold text-sm truncate"
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
                    className="text-xs px-2 py-0.5 rounded font-bold shrink-0"
                    style={{
                      background: "rgba(104,211,145,0.12)",
                      border: "1px solid rgba(104,211,145,0.3)",
                      color: "#68d391",
                    }}
                  >
                    {q.customer.capacity} kW
                  </span>
                </div>

                {/* System Type Badge */}
                <div className="flex items-center gap-2">
                  {systemTypeBadge(q.customer.systemType)}
                  {q.customer.panelBrand && (
                    <span className="text-xs" style={{ color: "#a0b4c8" }}>
                      {q.customer.panelBrand}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1.5">
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
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: "#a0b4c8" }}>
                      Date
                    </span>
                    <span className="text-xs" style={{ color: "#ffffff" }}>
                      {formatSavedAt(q.savedAt)}
                    </span>
                  </div>
                  {q.customer.isChannelPartner &&
                    q.customer.channelPartnerName && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs" style={{ color: "#a0b4c8" }}>
                          Partner
                        </span>
                        <span className="text-xs" style={{ color: "#63b3ed" }}>
                          {q.customer.channelPartnerName}
                        </span>
                      </div>
                    )}
                </div>

                {/* View Button */}
                <div
                  className="pt-2 mt-auto"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <button
                    type="button"
                    onClick={() => onViewQuote(q.customer, q.bank)}
                    className="w-full py-2 rounded-lg text-xs font-bold transition-all hover:opacity-80"
                    style={{
                      background: "linear-gradient(90deg, #1a5c3a, #1e7a4e)",
                      color: "#ffffff",
                      border: "1px solid rgba(104,211,145,0.3)",
                    }}
                  >
                    View Proposal
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
        style={{
          color: "#4a5568",
          fontSize: "11px",
          borderTop: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <div style={{ color: "#a0b4c8", marginBottom: "4px" }}>
          Shree Adishakti Solar Pvt Ltd · Bright Power for Better Future
        </div>
        © {new Date().getFullYear()}. Built with{" "}
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
