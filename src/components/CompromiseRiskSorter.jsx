import React, { useState } from "react";
import systemFiles from "../data/systems";

const CompromiseRiskSorter = () => {
  const [key, setKey] = useState("risk-desc");

  const sorted = [...systemFiles].sort((a, b) => {
    switch (key) {
      case "risk-desc": return b.risk - a.risk;
      case "risk-asc": return a.risk - b.risk;
      case "name-desc": return b.name.localeCompare(a.name);
      case "name-asc": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const riskColor = (r) =>
    r >= 75 ? "var(--danger)" : r >= 50 ? "var(--warning)" : "var(--safe)";

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">Compromise Risk Sorter <span className="tag">Sorting</span></div>
        <div className="seg">
          <button className={key === "risk-desc" ? "active" : ""} onClick={() => setKey("risk-desc")}>Risk ↓</button>
          <button className={key === "risk-asc" ? "active" : ""} onClick={() => setKey("risk-asc")}>Risk ↑</button>
          <button className={key === "name-asc" ? "active" : ""} onClick={() => setKey("name-asc")}>Name A-Z</button>
          <button className={key === "name-desc" ? "active" : ""} onClick={() => setKey("name-desc")}>Name Z-A</button>
        </div>
      </div>

      {sorted.map((f) => (
        <div className="qfix-item" key={f.id}>
          <div style={{ minWidth: 130 }}>
            <div className="mono" style={{ fontWeight: 700 }}>{f.name}</div>
            <div className="muted" style={{ fontSize: 11 }}>{f.type}</div>
          </div>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${f.risk}%`, background: riskColor(f.risk) }} />
          </div>
          <div style={{ fontWeight: 800, minWidth: 44, textAlign: "right", color: riskColor(f.risk) }}>
            {f.risk}%
          </div>
        </div>
      ))}

      <div className="card-note">
        Systems ranked by compromise risk using comparison-based sorting (Quick / Merge sort style).
      </div>
    </div>
  );
};

export default CompromiseRiskSorter;
