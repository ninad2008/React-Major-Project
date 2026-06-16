import React, { useState } from "react";
import viruses from "../data/viruses";

const VirusPatternList = ({ onDetect }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("threat");
  const [selected, setSelected] = useState(null);

  let list = viruses.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.signature.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || v.severity === filter;
    return matchSearch && matchFilter;
  });

  list = list.sort((a, b) =>
    sort === "threat" ? b.threat - a.threat : a.name.localeCompare(b.name)
  );

  return (
    <div className="card" id="viruses">
      <div className="card-head">
        <div className="card-title">Virus Pattern List <span className="tag">Array + Search</span></div>
        <div className="muted" style={{ fontSize: 12 }}>{list.length} signatures</div>
      </div>

      <div className="toolbar">
        <input
          className="input"
          placeholder="🔍 Search name or signature hash..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ maxWidth: 140 }}
        >
          <option value="All">All Severity</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div className="seg">
          <button className={sort === "threat" ? "active" : ""} onClick={() => setSort("threat")}>
            Threat ↓
          </button>
          <button className={sort === "name" ? "active" : ""} onClick={() => setSort("name")}>
            Name A-Z
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Virus Name</th>
            <th>Signature Hash</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((v) => (
              <tr key={v.id} className="clickable" onClick={() => setSelected(v)}>
                <td style={{ fontWeight: 700 }}>{v.name}</td>
                <td className="mono muted">{v.signature}</td>
                <td>{v.type}</td>
                <td><span className={`badge ${v.severity.toLowerCase()}`}>{v.severity}</span></td>
                <td><span className={`badge ${v.status.toLowerCase()}`}>{v.status}</span></td>
                <td>
                  <button className="btn sm danger" onClick={(e) => { e.stopPropagation(); onDetect(v); }}>
                    Detect
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={6} className="empty">No matching virus signatures found.</td></tr>
          )}
        </tbody>
      </table>

      <div className="card-note">Linear search over an array of known signatures. Click any row for full details.</div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <div className="muted" style={{ fontSize: 13 }}>
              {selected.type} • first seen {selected.firstSeen}
            </div>
            <div className="modal-desc">{selected.description}</div>
            <div className="modal-grid">
              <div className="modal-field">
                <div className="lbl">Signature</div>
                <div className="val mono">{selected.signature}</div>
              </div>
              <div className="modal-field">
                <div className="lbl">Severity</div>
                <div className="val"><span className={`badge ${selected.severity.toLowerCase()}`}>{selected.severity}</span></div>
              </div>
              <div className="modal-field">
                <div className="lbl">Threat Score</div>
                <div className="val" style={{ color: "var(--danger)" }}>{selected.threat}/100</div>
              </div>
              <div className="modal-field">
                <div className="lbl">Status</div>
                <div className="val">
                  <span className={`badge ${selected.status.toLowerCase()}`}>{selected.status}</span>
                </div>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "flex-end" }}>
              <button className="btn" onClick={() => setSelected(null)}>Close</button>
              <button className="btn danger" onClick={() => { onDetect(selected); setSelected(null); }}>
                Mark as Detected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirusPatternList;
