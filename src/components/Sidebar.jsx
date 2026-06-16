import React from "react";

const items = [
  { id: "overview", label: "Dashboard", icon: "◎" },
  { id: "viruses", label: "Virus Database", icon: "☣" },
  { id: "analysis", label: "Threat Analysis", icon: "⚠" },
  { id: "access", label: "Access Control", icon: "🔐" },
  { id: "firewall", label: "Firewall Rules", icon: "🛡" },
  { id: "attackpath", label: "Attack Paths", icon: "⇄" },
  { id: "quickfix", label: "Patch Deployment", icon: "⚙" },
  { id: "reports", label: "Reports", icon: "▤" },
];

const Sidebar = ({ active, setActive }) => {
  const go = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="sidebar">
      <div className="side-label">Navigation</div>
      {items.map((it) => (
        <div
          key={it.id}
          className={`side-item ${active === it.id ? "active" : ""}`}
          onClick={() => go(it.id)}
        >
          <span className="side-icon">{it.icon}</span>
          {it.label}
        </div>
      ))}

      <div className="side-card">
        <div className="t">DSA Concepts</div>
        Array · Stack · Queue
        <br />
        Hash Table · Sorting
        <br />
        Graph + BFS · Priority Queue
      </div>

      <div className="side-card">
        <div className="t">System Status</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="live-dot" style={{ background: "var(--safe)" }}></span>
          All sensors online
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
