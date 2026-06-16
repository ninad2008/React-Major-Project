import React, { useState } from "react";
import { useFirewall } from "../context/FirewallContext";

const FirewallSettingHub = () => {
  const { rules, toggleRule, addRule, removeRule } = useFirewall();
  const [port, setPort] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("Blocked");

  const handleAdd = () => {
    const p = Number(port);
    if (!p || !service.trim()) return;
    addRule(p, service.trim(), status);
    setPort("");
    setService("");
  };

  return (
    <div className="card" id="firewall">
      <div className="card-head">
        <div className="card-title">Firewall Setting Hub <span className="tag">Shared State (Context)</span></div>
        <div className="muted" style={{ fontSize: 12 }}>{rules.length} rules</div>
      </div>

      <div className="toolbar" style={{ marginBottom: 16 }}>
        <input
          className="input"
          placeholder="Port (e.g. 21)"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          style={{ maxWidth: 110 }}
        />
        <input
          className="input"
          placeholder="Service name"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ maxWidth: 130 }}
        >
          <option value="Blocked">Blocked</option>
          <option value="Allowed">Allowed</option>
        </select>
        <button className="btn primary" onClick={handleAdd}>+ Add Rule</button>
      </div>

      {rules.map((r) => (
        <div className="fw-rule" key={r.port}>
          <div>
            <span className="mono" style={{ fontWeight: 700 }}>Port {r.port}</span>
            <span className="muted" style={{ marginLeft: 10 }}>{r.service}</span>
            <span className={`badge ${r.status === "Blocked" ? "blocked" : "allowed"}`} style={{ marginLeft: 10 }}>
              {r.status}
            </span>
          </div>
          <div className="row">
            <div className={`toggle ${r.status === "Allowed" ? "on" : ""}`} onClick={() => toggleRule(r.port)} title="Toggle" />
            <button className="btn sm danger" onClick={() => removeRule(r.port)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="card-note">
        Centralized firewall configuration stored in React Context — toggle, add or remove a rule and it instantly applies across the entire dashboard.
      </div>
    </div>
  );
};

export default FirewallSettingHub;
