import React, { useState } from "react";
import { initialUsers, accessLevels } from "../data/users";

const AccessChangeUndo = () => {
  const [users, setUsers] = useState(initialUsers);
  const [history, setHistory] = useState([]);
  const [selUser, setSelUser] = useState(initialUsers[0].id);
  const [selLevel, setSelLevel] = useState("Admin");

  const makeChange = () => {
    const user = users.find((u) => u.id === selUser);
    if (!user || user.access === selLevel) return;
    const change = {
      id: Date.now(),
      user: user.name,
      from: user.access,
      to: selLevel,
      time: new Date().toLocaleTimeString(),
    };
    setHistory((prev) => [...prev, change]); // PUSH onto stack
    setUsers((prev) => prev.map((u) => (u.id === selUser ? { ...u, access: selLevel } : u)));
  };

  const undoLast = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setUsers((prev) => prev.map((u) => (u.name === last.user ? { ...u, access: last.from } : u)));
    setHistory((prev) => prev.slice(0, -1)); // POP from stack (LIFO)
  };

  return (
    <div className="card" id="access">
      <div className="card-head">
        <div className="card-title">Access Change Undo <span className="tag">Stack (LIFO)</span></div>
        <button className="btn sm" onClick={undoLast} disabled={history.length === 0}>
          ↩ Undo Last Change
        </button>
      </div>

      <div className="toolbar" style={{ marginBottom: 18 }}>
        <select className="input" value={selUser} onChange={(e) => setSelUser(Number(e.target.value))}>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <span className="muted">→</span>
        <select className="input" value={selLevel} onChange={(e) => setSelLevel(e.target.value)}>
          {accessLevels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <button className="btn primary" onClick={makeChange}>Make Change</button>
      </div>

      <div className="stack-wrap">
        <div>
          <div className="stack-top-label">CURRENT PERMISSIONS</div>
          {users.map((u) => (
            <div className="perm-row" key={u.id}>
              <div>
                <div style={{ fontWeight: 600 }}>{u.name}</div>
                <div className="muted" style={{ fontSize: 11 }}>{u.role}</div>
              </div>
              <span className={`badge ${u.access === "Read Only" ? "medium" : "low"}`}>{u.access}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="stack-top-label">CHANGE STACK — TOP IS MOST RECENT ({history.length})</div>
          <div className="stack-frame">
            {history.length > 0 ? (
              history
                .slice()
                .reverse()
                .map((h, i) => (
                  <div className={`stack-item ${i === 0 ? "top" : ""}`} key={h.id}>
                    {i === 0 && <span className="arrow">▼ TOP ▼</span>}
                    <strong>{h.user}</strong>: {h.from} → <strong style={{ color: "var(--warning)" }}>{h.to}</strong>
                    <div className="muted" style={{ fontSize: 10.5 }}>{h.time}</div>
                  </div>
                ))
            ) : (
              <div className="empty">No changes yet. Push a permission change onto the stack.</div>
            )}
          </div>
        </div>
      </div>
      <div className="card-note">Stack behavior: the most recent change (top) is always undone first.</div>
    </div>
  );
};

export default AccessChangeUndo;
