import React, { useState } from "react";
import DashboardCards from "../components/DashboardCards";
import VirusPatternList from "../components/VirusPatternList";
import AlertProcessingLine from "../components/AlertProcessingLine";
import BannedServerChecker from "../components/BannedServerChecker";
import CompromiseRiskSorter from "../components/CompromiseRiskSorter";
import QuickAttackPathFinder from "../components/QuickAttackPathFinder";
import FirewallSettingHub from "../components/FirewallSettingHub";
import QuickFixDeployer from "../components/QuickFixDeployer";
import { useFirewall } from "../context/FirewallContext";
import AccessChangeUndo from "../components/AccessChangeUndo";

const Dashboard = () => {
  const { rules } = useFirewall();
  const [stats, setStats] = useState({
    threats: 147,
    alerts: 32,
    compromised: 11,
    blocked: 72,
    firewall: rules.length,
    patches: 89,
  });

  // Keep threat level calculation stable
  const displayStats = { ...stats, firewall: rules.length };
  const handleDetect = (v) => {
    setStats((prev) => ({
      ...prev,
      threats: prev.threats + 1,
      alerts: prev.alerts + 1,
      compromised: v.severity === "Critical" ? prev.compromised + 1 : prev.compromised,
    }));
  };
  const threatLevel = Math.min(99, 71 + Math.floor((stats.threats - 147) / 2 + (stats.alerts - 32) / 4));

  return (
    <main className="main">
      <div className="page-title" style={{ marginBottom: 6 }}>
        <h1>Security Operations Center</h1>
        <p>Real-time threat monitoring simulation • powered by Data Structures &amp; Algorithms</p>
      </div>

      <DashboardCards stats={displayStats} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 0 }}>
      </div>

      <VirusPatternList onDetect={handleDetect} />
      <AccessChangeUndo />
      <AlertProcessingLine />
      <BannedServerChecker />
      <CompromiseRiskSorter />
      <QuickAttackPathFinder />
      <FirewallSettingHub />
      <QuickFixDeployer />

      <div className="card" id="reports">
        <div className="card-head">
          <div className="card-title">Daily Security Report <span className="tag">Summary</span></div>
        </div>
        <div className="stack-wrap">
          <div>
            <div className="qfix-item"><div className="mono">threats.detected</div><div className="muted">{stats.threats} events</div></div>
            <div className="qfix-item"><div className="mono">alerts.active</div><div className="muted">{stats.alerts} queued</div></div>
            <div className="qfix-item"><div className="mono">systems.compromised</div><div className="muted">{stats.compromised} hosts</div></div>
          </div>
          <div>
            <div className="qfix-item"><div className="mono">servers.blocked</div><div className="muted">{stats.blocked} IPs</div></div>
            <div className="qfix-item"><div className="mono">firewall.rules</div><div className="muted">{rules.length} active</div></div>
            <div className="qfix-item"><div className="mono">patches.applied</div><div className="muted">{stats.patches} systems</div></div>
          </div>
        </div>
        <div className="card-note">Auto-generated from the live dashboard state above.</div>
      </div>
    </main>
  );
};

export default Dashboard;
