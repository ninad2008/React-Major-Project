import React, { useState } from "react";
import { networkNodes, networkEdges } from "../data/attackGraph";

const NetworkMap = () => {
  const [hovered, setHovered] = useState(null);

  const byId = (id) => networkNodes.find((n) => n.id === id);

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">Network Visualization <span className="tag">Pure CSS + SVG</span></div>
        <div className="muted" style={{ fontSize: 12 }}>Hover a node for details</div>
      </div>

      <div className="netmap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {networkEdges.map((e, i) => {
            const a = byId(e.from);
            const b = byId(e.to);
            const hot = a.underAttack || b.underAttack;
            return (
              <line
                key={i}
                className={`net-line ${hot ? "hl" : ""}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {networkNodes.map((n) => (
          <div
            key={n.id}
            className={`net-node ${n.threat.toLowerCase()} ${n.underAttack ? "attacking" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="nn-name">{n.label}</span>
            <span
              className="nn-risk"
              style={{
                color: n.risk >= 75 ? "var(--danger)" : n.risk >= 50 ? "var(--warning)" : "var(--safe)",
              }}
            >
              {n.risk}%
            </span>
          </div>
        ))}

        {hovered && (
          <div className="net-tooltip" style={{ left: `${hovered.x}%`, top: `${hovered.y - 8}%` }}>
            <strong>{hovered.label}</strong> · Risk {hovered.risk}%
            <div className="muted" style={{ fontSize: 10.5 }}>Ports: {hovered.ports.join(", ")}</div>
          </div>
        )}
      </div>

      <div className="row" style={{ marginTop: 12, gap: 16, fontSize: 12 }}>
        <span className="muted">●</span>
        <span className="muted">Critical</span>
        <span style={{ color: "var(--danger)" }}>●</span>
        <span className="muted">Under Attack (pulsing)</span>
        <span style={{ color: "var(--safe)" }}>●</span>
        <span className="muted">Stable</span>
      </div>
      <div className="card-note">Lateral-movement map. Nodes under active attack pulse in red; edges carrying malicious traffic are highlighted.</div>
    </div>
  );
};

export default NetworkMap;
