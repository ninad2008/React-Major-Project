import React, { useState } from "react";
import initialAlerts from "../data/alerts";

const pool = ["Malware Detected", "Failed Login", "Privilege Escalation", "Suspicious Download", "Port Scan", "Ransomware Activity"];
const severities = ["Low", "Medium", "High", "Critical"];

const AlertProcessingLine = () => {
  const [queue, setQueue] = useState(initialAlerts);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);

  const enqueue = () => {
    const a = {
      id: Date.now(),
      message: pool[Math.floor(Math.random() * pool.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setQueue((prev) => [...prev, a]);
  };

  const dequeue = () => {
    if (queue.length === 0 || busy) return;
    setBusy(true);
    const [next, ...rest] = queue;
    setTimeout(() => {
      setLog((prev) => [next, ...prev].slice(0, 6));
      setQueue(rest);
      setBusy(false);
    }, 600);
  };

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">Alert Processing Line <span className="tag">Queue (FIFO)</span></div>
        <div className="row">
          <button className="btn sm" onClick={enqueue}>+ Add Alert</button>
          <button className="btn sm safe" onClick={dequeue} disabled={queue.length === 0 || busy}>
            {busy ? "Processing..." : "Process Next"}
          </button>
        </div>
      </div>

      <div className="queue-rail">
        <span className="queue-marker">FRONT</span>
        {queue.length > 0 ? (
          queue.map((a, i) => (
            <React.Fragment key={a.id}>
              <div className="queue-block">
                <span className={`badge ${a.severity.toLowerCase()}`} style={{ padding: "1px 6px" }}>{a.severity}</span>
                {a.message}
              </div>
              {i < queue.length - 1 && <span className="queue-arrow">→</span>}
            </React.Fragment>
          ))
        ) : (
          <span className="muted">Queue empty</span>
        )}
        <span className="queue-marker">REAR</span>
      </div>

      <div className="stack-wrap">
        <div>
          <div className="stack-top-label">PROCESSED LOG</div>
          {log.length > 0 ? (
            log.map((a) => (
              <div className="queue-block" key={a.id} style={{ borderLeft: "3px solid var(--safe)", width: "100%" }}>
                <span className="badge safe">✓ {a.severity}</span>
                {a.message}
                <span className="muted" style={{ marginLeft: "auto", fontSize: 11 }}>{a.time}</span>
              </div>
            ))
          ) : (
            <div className="empty">No alerts processed yet.</div>
          )}
        </div>
        <div className="muted" style={{ fontSize: 12.5 }}>
          <strong style={{ color: "var(--text)" }}>How it works:</strong>
          <br />
          Alerts enter at the <strong>REAR</strong> and are processed from the <strong>FRONT</strong> —
          first in, first out. This guarantees security alerts are handled in exact arrival order.
        </div>
      </div>
    </div>
  );
};

export default AlertProcessingLine;
