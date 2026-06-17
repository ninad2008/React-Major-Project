import React, { useState, useEffect } from "react";
import { useFirewall } from "../context/FirewallContext";
import virusesData from "../data/viruses";
import { initialUsers, accessLevels } from "../data/users";
import initialAlerts from "../data/alerts";
import systemFiles from "../data/systems";
import { attackGraph } from "../data/attackGraph";
import { initialTimeline } from "../data/timeline";

const IST_TIMEZONE = "Asia/Kolkata";

const fmtISTTime = (d = new Date()) =>
  d.toLocaleTimeString("en-IN", {
    timeZone: IST_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

const fmtISTClock = (d = new Date()) =>
  d.toLocaleTimeString("en-IN", {
    timeZone: IST_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const fmtISTDate = (d = new Date()) =>
  d.toLocaleDateString("en-IN", {
    timeZone: IST_TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Badge = ({ kind }) => {
  const map = {
    Critical: "bk-bad red", High: "bk-bad orange", Medium: "bk-bad blue", Low: "bk-bad green",
    Active: "bk-bad red", Quarantined: "bk-bad blue", Neutralized: "bk-bad green",
    Allowed: "bk-bad green", Blocked: "bk-bad red",
  };
  return <span className={map[kind] || "bk-bad"}>{kind}</span>;
};

const BeginnerDashboard = () => {
  const { rules } = useFirewall();
  const [istNow, setIstNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setIstNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const [threats, setThreats] = useState(147);
  const [alerts, setAlerts] = useState(32);
  const [patched, setPatched] = useState(89);

  const [virusSearch, setVirusSearch] = useState("");
  const [virusSev, setVirusSev] = useState("All");
  const [virusPreview, setVirusPreview] = useState(null);

  const filteredViruses = virusesData.filter((v) => {
    if (virusSev !== "All" && v.severity !== virusSev) return false;
    const s = virusSearch.toLowerCase();
    return v.name.toLowerCase().includes(s) || v.signature.toLowerCase().includes(s);
  });

  const detectVirus = (_v) => {
    setThreats((t) => t + 1);
    setAlerts((a) => a + 1);
    alert("Threat detected! Counts increased.");
  };

  const [users, setUsers] = useState(initialUsers);
  const [history, setHistory] = useState([]);
  const [pickUser, setPickUser] = useState(1);
  const [pickLevel, setPickLevel] = useState("Admin");

  const pushChange = () => {
    const user = users.find((u) => u.id === pickUser);
    if (!user || user.access === pickLevel) return;
    setHistory((prev) => [
      ...prev,
      { id: Date.now(), user: user.name, from: user.access, to: pickLevel, time: fmtISTTime() },
    ]);
    setUsers((prev) => prev.map((u) => (u.id === pickUser ? { ...u, access: pickLevel } : u)));
  };

  const popChange = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setUsers((prev) => prev.map((u) => (u.name === last.user ? { ...u, access: last.from } : u)));
    setHistory((prev) => prev.slice(0, -1));
  };

  const [alertQueue, setAlertQueue] = useState(initialAlerts);
  const [alertLog, setAlertLog] = useState([]);
  const [busy, setBusy] = useState(false);

  const enqueue = () => {
    const messages = ["Malware Detected", "Failed Login", "Privilege Escalation", "Suspicious Download", "Port Scan"];
    const sev = ["Low", "Medium", "High", "Critical"];
    const a = {
      id: Date.now(),
      message: messages[Math.floor(Math.random() * messages.length)],
      severity: sev[Math.floor(Math.random() * sev.length)],
      time: fmtISTClock(new Date()),
    };
    setAlertQueue((q) => [...q, a]);
  };

  const dequeue = () => {
    if (alertQueue.length === 0 || busy) return;
    setBusy(true);
    const [first, ...rest] = alertQueue;
    setTimeout(() => {
      setAlertLog((l) => [first, ...l].slice(0, 5));
      setAlertQueue(rest);
      setBusy(false);
    }, 600);
  };

  const blocked = {
    "192.168.1.15": "Malware C2 server",
    "10.0.0.55": "Brute-force source",
    "172.16.45.102": "Botnet node",
    "45.33.12.88": "Port scanner",
    "203.0.113.7": "Ransomware host",
  };
  const [ipInput, setIpInput] = useState("");
  const [ipResult, setIpResult] = useState("");

  const checkIP = (ip) => {
    if (blocked[ip]) setIpResult("🚫 BLOCKED — Reason: " + blocked[ip]);
    else setIpResult("✅ SAFE — No record");
  };

  const [files, setFiles] = useState(systemFiles);
  const [sortMode, setSortMode] = useState("risk-desc");

  const sortFiles = (mode) => {
    setSortMode(mode);
    setFiles((prev) => {
      const copy = [...prev];
      if (mode === "risk-desc") copy.sort((a, b) => b.risk - a.risk);
      if (mode === "risk-asc") copy.sort((a, b) => a.risk - b.risk);
      if (mode === "name") copy.sort((a, b) => a.name.localeCompare(b.name));
      return copy;
    });
  };

  const nodes = Object.keys(attackGraph);
  const [fromNode, setFromNode] = useState("Internet");
  const [toNode, setToNode] = useState("Database");
  const [path, setPath] = useState([]);

  const runBFS = () => {
    const queue = [[fromNode]];
    const visited = new Set([fromNode]);
    while (queue.length > 0) {
      const cur = queue.shift();
      const top = cur[cur.length - 1];
      if (top === toNode) { setPath(cur); return; }
      for (const next of attackGraph[top] || []) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push([...cur, next]);
        }
      }
    }
    setPath([]);
  };

  const [pending, setPending] = useState([...systemFiles].sort((a, b) => b.risk - a.risk));
  const [deployLog, setDeployLog] = useState([]);
  const [deploying, setDeploying] = useState(false);

  const deployFixes = () => {
    if (deploying) return;
    setDeploying(true);
    setDeployLog(["> Starting patch deployment..."]);
    const queue = [...pending];
    setPending([]);
    let i = 0;
    const id = setInterval(() => {
      if (i >= queue.length) {
        clearInterval(id);
        setDeployLog((p) => [...p, "> All systems patched ✓"]);
        setDeploying(false);
        setPatched((x) => x + queue.length);
        return;
      }
      const s = queue[i];
      setDeployLog((p) => [...p, `> Patching ${s.name} (risk ${s.risk}%) → ✓ Done`]);
      i++;
    }, 700);
  };

  const [events, setEvents] = useState(initialTimeline);
  const addEvent = () => {
    const actions = ["Credential Dumping", "Persistence Installed", "Data Staged for Exfil", "Malicious Script Blocked"];
    const e = {
      id: Date.now(),
      time: fmtISTClock(new Date()),
      action: actions[Math.floor(Math.random() * actions.length)],
      severity: "High",
      malicious: true,
    };
    setEvents((p) => [...p, e]);
  };

  const threatLevel = Math.min(99, 71 + Math.floor((threats - 147) / 2 + (alerts - 32) / 4));

  return (
    <main className="bk-main">
      <div className="bk-banner">
        <h1>🔐 ThreatTrace - Beginner Edition</h1>
        <p>A simple cybersecurity dashboard built to learn Data Structures &amp; Algorithms (DSA) with React.</p>
        <p style={{ fontSize: 13 }}>Every feature below uses a different DSA concept. Hover or read the blue notes to understand each one.</p>

        <div className="bk-clock">
          <span className="bk-clock-flag">🇮🇳 IST</span>
          <div className="bk-clock-time">
            <span className="bk-clock-digits">{fmtISTClock(istNow)}</span>
            <span className="bk-clock-seconds">{fmtISTTime(istNow).slice(-3)}</span>
          </div>
          <span className="bk-clock-date">{fmtISTDate(istNow)}</span>
        </div>
      </div>

      <div className="bk-stats">
        <div className="bk-stat"><b>{threats}</b><span>Threats Detected</span></div>
        <div className="bk-stat"><b>{alerts}</b><span>Active Alerts</span></div>
        <div className="bk-stat"><b>11</b><span>Compromised Systems</span></div>
        <div className="bk-stat"><b>72</b><span>Blocked Servers</span></div>
        <div className="bk-stat"><b>{rules.length}</b><span>Firewall Rules</span></div>
        <div className="bk-stat"><b>{patched}</b><span>Patches Applied</span></div>
      </div>

      <section className="bk-card">
        <h3 className="bk-h">1. Virus Pattern List <span className="bk-tag">DSA: Array + Linear Search</span></h3>
        <p className="bk-explain">💡 We store all viruses in an array (list). When you type in the search box, we check every item one by one to see if it matches - that's linear search.</p>
        <input className="bk-input" placeholder="Search e.g. 'Trojan'" value={virusSearch} onChange={(e) => setVirusSearch(e.target.value)} />
        <select className="bk-input" value={virusSev} onChange={(e) => setVirusSev(e.target.value)} style={{ maxWidth: 160, marginLeft: 8 }}>
          <option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
        <table className="bk-table">
          <thead><tr><th>Virus Name</th><th>Signature</th><th>Type</th><th>Severity</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filteredViruses.map((v) => (
              <tr key={v.id}>
                <td><b>{v.name}</b></td>
                <td style={{ color: "#AAB7C7", fontSize: 12 }}>{v.signature}</td>
                <td>{v.type}</td>
                <td><Badge kind={v.severity} /></td>
                <td><Badge kind={v.status} /></td>
                <td>
                  <button className="bk-btn danger" onClick={() => detectVirus(v)}>Detect</button>
                  <button className="bk-btn" style={{ marginLeft: 6 }} onClick={() => setVirusPreview(v)}>Info</button>
                </td>
              </tr>
            ))}
            {filteredViruses.length === 0 && <tr><td colSpan={6} className="bk-empty">No viruses match. Try another search.</td></tr>}
          </tbody>
        </table>
        {virusPreview && (
          <div className="bk-modal" onClick={() => setVirusPreview(null)}>
            <div className="bk-modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>{virusPreview.name}</h3>
              <p style={{ color: "#AAB7C7" }}>{virusPreview.description}</p>
              <p><b>Threat:</b> <span style={{ color: "#FF4D4D" }}>{virusPreview.threat}/100</span></p>
              <button className="bk-btn" onClick={() => setVirusPreview(null)}>Close</button>
            </div>
          </div>
        )}
      </section>

      <section className="bk-card">
        <h3 className="bk-h">2. Access Change Undo <span className="bk-tag">DSA: Stack (LIFO)</span></h3>
        <p className="bk-explain">💡 A stack is like a pile of plates - you add to the top and remove from the top. Here, every permission change is pushed onto the stack. The Undo button pops the most recent change.</p>
        <div className="bk-row">
          <select className="bk-input" value={pickUser} onChange={(e) => setPickUser(Number(e.target.value))}>
            {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <span style={{ color: "#AAB7C7" }}>→</span>
          <select className="bk-input" value={pickLevel} onChange={(e) => setPickLevel(e.target.value)}>
            {accessLevels.map((l) => <option key={l}>{l}</option>)}
          </select>
          <button className="bk-btn blue" onClick={pushChange}>Make Change</button>
          <button className="bk-btn" onClick={popChange} disabled={history.length === 0}>↩ Undo Last</button>
        </div>
        <div className="bk-grid-2">
          <div>
            <h4 className="bk-h4">Current Permissions</h4>
            {users.map((u) => (
              <div key={u.id} className="bk-perm"><b>{u.name}</b><span style={{ background: "#25324A", padding: "3px 8px", borderRadius: 4 }}>{u.access}</span></div>
            ))}
          </div>
          <div>
            <h4 className="bk-h4">Stack (Top → Bottom)</h4>
            {history.length === 0 ? (
              <div className="bk-empty">No changes yet. Push a permission change above.</div>
            ) : (
              [...history].reverse().map((c, i) => (
                <div key={c.id} className={"bk-stack-item " + (i === 0 ? "top" : "")}>
                  {i === 0 && <span style={{ color: "#FF4D4D", fontSize: 11 }}>▼ TOP ▼</span>}
                  <div><b>{c.user}</b>: {c.from} → <b style={{ color: "#FFB020" }}>{c.to}</b></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bk-card">
        <h3 className="bk-h">3. Alert Processing Line <span className="bk-tag">DSA: Queue (FIFO)</span></h3>
        <p className="bk-explain">💡 A queue is like a line at a ticket counter - the first person in line is the first person served. Security alerts are processed in the exact order they arrive.</p>
        <div className="bk-queue-rail">
          <span className="bk-queue-label">FRONT</span>
          {alertQueue.length === 0 ? (
            <span style={{ color: "#AAB7C7" }}>Queue is empty</span>
          ) : (
            alertQueue.map((a, i) => (
              <React.Fragment key={a.id}>
                <span className="bk-queue-box">{a.message}</span>
                {i < alertQueue.length - 1 && <span>→</span>}
              </React.Fragment>
            ))
          )}
          <span className="bk-queue-label">REAR</span>
        </div>
        <div className="bk-row">
          <button className="bk-btn blue" onClick={enqueue}>+ Add Alert</button>
          <button className="bk-btn green" onClick={dequeue} disabled={busy || alertQueue.length === 0}>
            {busy ? "Processing..." : "Process Next"}
          </button>
        </div>
        <h4 className="bk-h4">Recently Processed</h4>
        {alertLog.length === 0 ? (
          <div className="bk-empty">No alerts processed yet.</div>
        ) : (
          alertLog.map((a) => (
            <div key={a.id} className="bk-perm" style={{ background: "#0E1F14", borderLeft: "3px solid #00D084" }}>
              ✓ {a.message} <span style={{ color: "#AAB7C7", marginLeft: "auto", fontSize: 12 }}>{a.time}</span>
            </div>
          ))
        )}
      </section>

      <section className="bk-card">
        <h3 className="bk-h">4. Banned Server Checker <span className="bk-tag">DSA: Hash Table</span></h3>
        <p className="bk-explain">💡 A hash table is like a phone book - give it a name and it instantly gives you the number. We store banned IPs as keys. Checking an IP takes only 1 step: blocked[ip].</p>
        <div className="bk-row">
          <input className="bk-input" placeholder="Enter IP (e.g. 192.168.1.15)" value={ipInput} onChange={(e) => setIpInput(e.target.value)} style={{ maxWidth: 320 }} />
          <button className="bk-btn blue" onClick={() => checkIP(ipInput)}>Check IP</button>
        </div>
        {ipResult && <p className="bk-result">{ipResult}</p>}
        <h4 className="bk-h4">Quick test IPs (click to check):</h4>
        <div className="bk-row" style={{ gap: 6 }}>
          {Object.keys(blocked).map((ip) => (
            <button key={ip} className="bk-btn" onClick={() => { setIpInput(ip); checkIP(ip); }}>{ip}</button>
          ))}
          <button className="bk-btn" onClick={() => { setIpInput("8.8.8.8"); checkIP("8.8.8.8"); }}>8.8.8.8</button>
        </div>
      </section>

      <section className="bk-card">
        <h3 className="bk-h">5. Compromise Risk Sorter <span className="bk-tag">DSA: Sorting</span></h3>
        <p className="bk-explain">💡 Sorting algorithms (like Bubble Sort or Quick Sort) rearrange items. Here, we sort files by their risk score so the most dangerous ones are on top.</p>
        <div className="bk-row">
          <button className={"bk-btn blue " + (sortMode === "risk-desc" ? "active" : "")} onClick={() => sortFiles("risk-desc")}>Risk ↓ (High to Low)</button>
          <button className={"bk-btn " + (sortMode === "risk-asc" ? "blue active" : "")} onClick={() => sortFiles("risk-asc")}>Risk ↑ (Low to High)</button>
          <button className={"bk-btn " + (sortMode === "name" ? "blue active" : "")} onClick={() => sortFiles("name")}>Name A-Z</button>
        </div>
        {files.map((f) => (
          <div key={f.id} className="bk-perm">
            <b style={{ minWidth: 130, display: "inline-block" }}>{f.name}</b>
            <div style={{ flex: 1, height: 8, background: "#25324A", borderRadius: 4, margin: "0 10px", overflow: "hidden" }}>
              <div style={{ width: `${f.risk}%`, height: "100%", background: f.risk >= 75 ? "#FF4D4D" : f.risk >= 50 ? "#FFB020" : "#00D084" }} />
            </div>
            <span style={{ fontWeight: 800, color: f.risk >= 75 ? "#FF4D4D" : f.risk >= 50 ? "#FFB020" : "#00D084" }}>{f.risk}%</span>
          </div>
        ))}
      </section>

      <section className="bk-card">
        <h3 className="bk-h">6. Firewall Setting Hub <span className="bk-tag">DSA: Shared State (Context)</span></h3>
        <p className="bk-explain">💡 Instead of passing rules through many components, we store them in one central place (React Context). Any change here updates everywhere automatically.</p>
        {rules.map((r) => (
          <div key={r.port} className="bk-perm">
            <b>Port {r.port}</b> <span style={{ color: "#AAB7C7", fontSize: 13 }}>{r.service}</span>
            <span style={{ marginLeft: "auto" }}><Badge kind={r.status} /></span>
          </div>
        ))}
        <p className="bk-explain" style={{ marginTop: 8 }}>💡 The full Firewall Hub component (with add/remove/toggle) lives in the same context — see <code>FirewallSettingHub.jsx</code>.</p>
      </section>

      <section className="bk-card">
        <h3 className="bk-h">7. Quick Attack Path Finder <span className="bk-tag">DSA: Graph + BFS</span></h3>
        <p className="bk-explain">💡 The network is a graph. Breadth-First Search (BFS) explores neighbors level by level, which always finds the shortest path.</p>
        <div className="bk-row">
          <select className="bk-input" value={fromNode} onChange={(e) => setFromNode(e.target.value)}>
            {nodes.map((n) => <option key={n}>{n}</option>)}
          </select>
          <span style={{ color: "#AAB7C7" }}>→</span>
          <select className="bk-input" value={toNode} onChange={(e) => setToNode(e.target.value)}>
            {nodes.map((n) => <option key={n}>{n}</option>)}
          </select>
          <button className="bk-btn blue" onClick={runBFS}>Find Shortest Path</button>
        </div>
        {path.length > 0 ? (
          <div className="bk-path">
            {path.map((n, i) => (
              <React.Fragment key={n}>
                <span className="bk-path-node">{n}</span>
                {i < path.length - 1 && <span className="bk-path-arrow">↓</span>}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="bk-empty">Click the button above to find the shortest path.</div>
        )}
      </section>

      <section className="bk-card">
        <h3 className="bk-h">8. Quick Fix Deployer <span className="bk-tag">DSA: Priority Queue</span></h3>
        <p className="bk-explain">💡 A priority queue always serves the most important item first. We sort the patch list by risk so the highest-risk systems get patched before safer ones.</p>
        <button className="bk-btn green" onClick={deployFixes} disabled={deploying || pending.length === 0}>
          {deploying ? "Deploying..." : `Deploy Fixes (${pending.length} pending)`}
        </button>
        <div className="bk-grid-2" style={{ marginTop: 12 }}>
          <div>
            <h4 className="bk-h4">Pending (highest risk first)</h4>
            {pending.length === 0 ? (
              <div className="bk-empty">All systems patched ✓</div>
            ) : (
              pending.map((s) => (
                <div key={s.id} className="bk-perm">
                  <b style={{ minWidth: 130 }}>{s.name}</b>
                  <div style={{ flex: 1, height: 8, background: "#25324A", borderRadius: 4, margin: "0 10px" }}>
                    <div style={{ width: `${s.risk}%`, height: "100%", background: "linear-gradient(90deg,#FF4D4D,#FFB020)" }} />
                  </div>
                  <span style={{ fontWeight: 800, color: "#FF4D4D" }}>{s.risk}</span>
                </div>
              ))
            )}
          </div>
          <div>
            <h4 className="bk-h4">Deployment Console</h4>
            <div className="bk-console">
              {deployLog.length === 0 ? <div style={{ color: "#5e6c82" }}>Awaiting command...</div> : deployLog.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
        </div>
      </section>

      <footer className="bk-footer">
        <p style={{ margin: 0, fontSize: 13 }}>ThreatTrace - Beginner Edition</p>
        <p style={{ margin: 0, fontSize: 12, color: "#AAB7C7" }}>Built with React.js + CSS • Data Structures &amp; Algorithms project</p>
        <p className="bk-author">Created By: Ninad N. Deodhare</p>
        <p className="bk-tz-note">All times shown in Indian Standard Time (IST, UTC+5:30) 🇮🇳</p>
      </footer>
    </main>
  );
};

export default BeginnerDashboard;
