import React from "react";

const StatCard = ({ icon, title, value, color, trend, trendDir }) => (
  <div className="stat-card">
    <div className="stat-top">
      <div className={`stat-icon ${color}`}>{icon}</div>
      {trend && (
        <span className={`trend ${trendDir}`}>
          {trendDir === "up" ? "▲" : "▼"} {trend}
        </span>
      )}
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{title}</div>
  </div>
);

const DashboardCards = ({ stats }) => (
  <div className="stat-grid" id="overview">
    <StatCard icon="☣" title="Threats Detected" value={stats.threats} color="danger" trend="12%" trendDir="up" />
    <StatCard icon="⚠" title="Active Alerts" value={stats.alerts} color="warning" trend="4%" trendDir="up" />
    <StatCard icon="✕" title="Compromised Systems" value={stats.compromised} color="danger" trend="2" trendDir="down" />
    <StatCard icon="⛔" title="Blocked Servers" value={stats.blocked} color="safe" trend="9%" trendDir="up" />
    <StatCard icon="🛡" title="Firewall Rules" value={stats.firewall} color="highlight" />
    <StatCard icon="✓" title="Patches Applied" value={stats.patches} color="safe" trend="6%" trendDir="up" />
  </div>
);

export default DashboardCards;
