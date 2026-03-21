import type React from "react";
import { useState } from "react";

const GREEN = "#1B6B45";
const BLUE = "#1A4FA0";

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "sassolar123") {
      localStorage.setItem("sas_auth", "true");
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${GREEN} 0%, #145236 60%, #0d3d28 100%)`,
      }}
    >
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <img
            src="/assets/uploads/LOGO-SHREE-ADISHAKTI-SOLAR-1.jpeg"
            alt="Shree Adishakti Solar"
            className="w-28 h-28 mx-auto mb-4 object-contain"
          />
          <h1
            className="text-xl font-bold tracking-widest"
            style={{ color: "#fff", fontFamily: "Georgia, serif" }}
          >
            SHREE ADISHAKTI SOLAR
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            PVT LTD
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}
          >
            PM SURYA GHAR YOJANA | TATA POWER PARTNER
          </p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            className="text-center text-lg font-semibold mb-6"
            style={{ color: "#fff" }}
          >
            Quotation Portal Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="sas-username"
                className="block text-sm mb-1"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Username
              </label>
              <input
                id="sas-username"
                data-ocid="login.input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                }}
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div>
              <label
                htmlFor="sas-password"
                className="block text-sm mb-1"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Password
              </label>
              <input
                id="sas-password"
                data-ocid="login.password_input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                }}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p
                data-ocid="login.error_state"
                className="text-sm text-center"
                style={{ color: "#fca5a5" }}
              >
                {error}
              </p>
            )}

            <button
              data-ocid="login.submit_button"
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: BLUE }}
            >
              Login
            </button>
          </form>
          <p
            className="text-center text-xs mt-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Shree Adishakti Solar Pvt Ltd · Quotation Generator
          </p>
        </div>
      </div>
    </div>
  );
}
