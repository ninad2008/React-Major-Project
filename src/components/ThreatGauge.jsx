import React from "react";

const ThreatGauge = ({ value }) => {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const level =
    value <= 30 ? { label: "SAFE", color: "var(--safe)" } :
    value <= 70 ? { label: "WARNING", color: "var(--warning)" } :
    { label: "CRITICAL", color: "var(--danger)" };

  return (
    <div className="card" id="analysis">
      <div className="card-head">
        <div className="card-title">
          Threat Level Gauge <span className="tag">Real-time</span>
        </div>
      </div>

      <div className="gauge-wrap">
        <div className="gauge">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle className="gauge-track" cx="80" cy="80" r={radius} fill="none" strokeWidth="12" />
            <circle
              className="gauge-val"
              cx="80" cy="80" r={radius}
              fill="none" strokeWidth="12"
              stroke={level.color}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="gauge-center">
            <div className="gauge-num" style={{ color: level.color }}>{value}%</div>
            <div className="gauge-label" style={{ color: level.color }}>{level.label}</div>
          </div>
        </div>

        <div className="gauge-legend">
          <span><span className="legend-dot" style={{ background: "var(--safe)" }}></span>0–30 Safe</span>
          <span><span className="legend-dot" style={{ background: "var(--warning)" }}></span>31–70 Warning</span>
          <span><span className="legend-dot" style={{ background: "var(--danger)" }}></span>71–100 Critical</span>
        </div>
      </div>
      <div className="card-note">
        Aggregated overall threat level computed across all monitored systems.
      </div>
    </div>
  );
};

export default ThreatGauge;
