import React, { useState } from "react";
import { initialTimeline } from "../data/timeline";

const extraEvents = [
  { action: "Credential Dumping Detected", severity: "High", malicious: true },
  { action: "New Persistence Mechanism", severity: "Critical", malicious: true },
  { action: "Data Staged for Exfiltration", severity: "Critical", malicious: true },
  { action: "Malicious Script Blocked", severity: "Medium", malicious: false },
];

const HackerTimeline = () => {
  const [events, setEvents] = useState(initialTimeline);

  const add = () => {
    const e = extraEvents[Math.floor(Math.random() * extraEvents.length)];
    setEvents((p) => [
      ...p,
      { ...e, id: Date.now(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
  };

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">Hacker Activity Timeline <span className="tag">Linked List</span></div>
        <button className="btn sm" onClick={add}>+ Simulate Event</button>
      </div>

      <div className="timeline">
        {events.map((e) => (
          <div className={`tl-item ${e.malicious ? "danger" : "safe"}`} key={e.id}>
            <div className="tl-dot">{e.malicious ? "✕" : "✓"}</div>
            <div className="tl-time">{e.time}</div>
            <div className="tl-action">{e.action}</div>
          </div>
        ))}
      </div>
      <div className="card-note">Chronological kill-chain reconstruction. Red icons mark malicious events, green marks defenses.</div>
    </div>
  );
};

export default HackerTimeline;
