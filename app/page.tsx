"use client";

import { useState } from "react";

export default function HomePage() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleScan() {
    if (!ip) return;
    setLoading(true);
    try {
      const res = await fetch(`https://leakscanner.onrender.com/ip/${ip}/score`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Fehler beim Abrufen" });
    }
    setLoading(false);
  }

  return (
    <main style={{ backgroundColor: "#111", color: "#fff", padding: "2rem", fontFamily: "Arial", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem" }}>🔍 IP Risiko-Check</h1>
      <input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="IP-Adresse eingeben"
        style={{
          padding: "0.5rem",
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
          border: "1px solid #333",
        }}
      />
      <br />
      <button
        onClick={handleScan}
        disabled={loading}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#1e90ff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "⏳ Scanne..." : "Scan starten"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#222", borderRadius: "10px", width: "100%", maxWidth: "600px" }}>
          {result.error ? (
            <p>❌ Fehler: {result.error}</p>
          ) : (
            <>
              <h2>Ergebnisse für: {result.ip}</h2>
              <p><strong>Abuse Score:</strong> {result.score}{" "}
                {result.score >= 70 ? "🟥" : result.score >= 40 ? "🟧" : "🟩"}
              </p>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Letzte Analyse:</strong> {result.timestamp}</p>
            </>
          )}
        </div>
      )}
    </main>
  );
}
