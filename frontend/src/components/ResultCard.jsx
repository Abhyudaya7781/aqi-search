// src/components/ResultCard.jsx

import React from "react";

function classifyAqi(aqi) {
  if (aqi == null || Number.isNaN(aqi)) {
    return { label: "Unknown", color: "#111827" };
  }

  if (aqi <= 50) return { label: "Good", color: "#22c55e" };
  if (aqi <= 100) return { label: "Moderate", color: "#eab308" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "#f97316" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#ef4444" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "#7c3aed" };

  return { label: "Hazardous", color: "#be123c" };
}

// Optional nicer labels for common fields
const pollutantLabels = {
  pm25: "PM2.5",
  pm10: "PM10",
  o3: "O₃",
  no2: "NO₂",
  so2: "SO₂",
  co: "CO",
  t: "Temperature",
  h: "Humidity",
  p: "Pressure",
  w: "Wind",
  wg: "Wind gust",
};

// Format values nicely
function formatValue(key, raw) {
  if (raw == null) return "–";

  const v = Number(raw);
  if (Number.isNaN(v)) return raw;

  // Some custom formatting for certain keys
  if (key === "h") return `${Math.round(v)}%`;          // humidity
  if (key === "t") return `${v.toFixed(1)}°C`;          // temperature
  if (key === "pm25" || key === "pm10") return `${Math.round(v)} µg/m³`;

  // default: 1 decimal max
  return Number.isInteger(v) ? v : v.toFixed(1);
}

function ResultCard({ result }) {
  if (!result) return null;

  const { city, time, source, aqi, dominantPollutant, iaqi } = result;
  const aqiInfo = classifyAqi(aqi);

  return (
    <section className="result-card">
      <div className="result-header">
        <div>
          <div className="result-city">{city}</div>
          <div className="result-meta">
            {time ? `Last updated: ${time}` : "Time: N/A"} ·{" "}
            {source === "cache" ? "from cache" : "live"}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="aqi-value">{aqi ?? "–"}</div>
          <div
            className="aqi-badge"
            style={{
              backgroundColor: aqiInfo.color,
              border: "1px solid #1f2937",
            }}
          >
            {aqiInfo.label}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <span className="chip">
          Dominant pollutant: {dominantPollutant || "N/A"}
        </span>
      </div>

      <div className="pollutant-grid">
        {iaqi &&
          Object.entries(iaqi).map(([key, value]) => {
            const label = pollutantLabels[key] || key.toUpperCase();
            const formatted = formatValue(key, value?.v);

            return (
              <div className="pollutant-card" key={key}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "1.1rem" }}>{formatted}</div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default ResultCard;
