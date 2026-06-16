import React, { useState } from "react";

const blocked = {
  "192.168.1.15": "Malware C2 server",
  "10.0.0.55": "Brute-force source",
  "172.16.45.102": "Botnet node",
  "45.33.12.88": "Port scanner",
  "203.0.113.7": "Ransomware host",
};
const allowed = {
  "192.168.1.1": true,
  "8.8.8.8": true,
  "10.0.0.1": true,
};

const bannedList = [
  { ip: "192.168.1.15", reason: "Malware C2 server" },
  { ip: "10.0.0.55", reason: "Brute-force source" },
  { ip: "172.16.45.102", reason: "Botnet node" },
  { ip: "45.33.12.88", reason: "Port scanner" },
  { ip: "203.0.113.7", reason: "Ransomware host" },
];

const BannedServerChecker = () => {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);

  const check = (value) => {
    const target = value.trim();
    if (!target) return;
    if (blocked[target]) setResult({ status: "blocked", ip: target });
    else if (allowed[target]) setResult({ status: "safe", ip: target });
    else setResult({ status: "unknown", ip: target });
  };

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">Banned Server Checker <span className="tag">Hash Table O(1)</span></div>
      </div>

      <div className="toolbar">
        <input
          className="input"
          placeholder="Enter IP address (e.g. 192.168.1.15)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check(ip)}
        />
        <button className="btn primary" onClick={() => check(ip)}>Check IP</button>
      </div>

      {result && (
        <div className={`ip-result ${result.status}`}>
          {result.status === "blocked" ? "⛔" : result.status === "safe" ? "✅" : "❔"}
          {result.ip} →{" "}
          {result.status === "blocked"
            ? "BLOCKED — immediate ban active"
            : result.status === "safe"
            ? "SAFE — on allow-list"
            : "UNKNOWN — no record found"}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <div className="stack-top-label">BLOCKED SERVER LIST</div>
        <table className="table">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bannedList.map((b) => (
              <tr key={b.ip}>
                <td className="mono">{b.ip}</td>
                <td className="muted">{b.reason}</td>
                <td><span className="badge blocked">Blocked</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          {["192.168.1.15", "8.8.8.8", "203.0.113.99"].map((s) => (
            <span
              key={s}
              className="mono"
              onClick={() => {
                setIp(s);
                check(s);
              }}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                padding: "3px 9px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannedServerChecker;
