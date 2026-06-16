import React, { useState, useRef } from "react";
import systemFiles from "../data/systems";

const QuickFixDeployer = () => {
  const sorted = () => [...systemFiles].sort((a, b) => b.risk - a.risk);
  const [pending, setPending] = useState(sorted());
  const [log, setLog] = useState([]);
  const [phase, setPhase] = useState("idle");
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  React.useEffect(() => () => clearTimers(), []);

  const deploy = () => {
    if (phase === "scanning" || phase === "patching") return;
    clearTimers();
    const work = sorted();
    setPending(work);
    setLog([{ text: "> Initiating vulnerability scan...", cls: "ln-info" }]);
    setPhase("scanning");

    timers.current.push(
      setTimeout(() => {
        setLog((p) => [...p, { text: "> Scan complete. Prioritizing by risk (priority queue).", cls: "ln-muted" }]);
        setPhase("patching");

        work.forEach((sys, i) => {
          timers.current.push(
            setTimeout(() => {
              setLog((p) => [
                ...p,
                { text: `> Patching ${sys.name} (risk ${sys.risk}%)...`, cls: "ln-warn" },
                { text: `  ✓ ${sys.name} patched successfully.`, cls: "ln-ok" },
              ]);
              setPending((prev) => prev.filter((s) => s.id !== sys.id));
              if (i === work.length - 1) {
                timers.current.push(
                  setTimeout(() => {
                    setLog((p) => [...p, { text: "> All systems secured. Deployment completed.", cls: "ln-ok" }]);
                    setPhase("done");
                  }, 450)
                );
              }
            }, 600 * (i + 1))
          );
        });
      }, 900)
    );
  };

  const reset = () => {
    clearTimers();
    setPending(sorted());
    setLog([]);
    setPhase("idle");
  };

  const statusLabel =
    phase === "scanning" ? "Scanning..." :
    phase === "patching" ? "Patching..." :
    phase === "done" ? "Completed" : "Idle";

  return (
    <div className="card" id="quickfix">
      <div className="card-head">
        <div className="card-title">Quick Fix Deployer <span className="tag">Priority Queue</span></div>
        <div className="row">
          <span className={`badge ${phase === "done" ? "low" : phase === "idle" ? "medium" : "high"}`}>
            {statusLabel}
          </span>
          <button className="btn sm safe" onClick={deploy} disabled={phase === "scanning" || phase === "patching"}>
            Deploy Fixes
          </button>
          <button className="btn sm" onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="stack-wrap">
        <div>
          <div className="stack-top-label">PRIORITY QUEUE (highest risk first) — {pending.length} left</div>
          {pending.length > 0 ? (
            pending.map((s) => (
              <div className="qfix-item" key={s.id}>
                <div className="mono" style={{ fontWeight: 700, minWidth: 120 }}>{s.name}</div>
                <div className="bar">
                  <div className="bar-fill" style={{ width: `${s.risk}%` }} />
                </div>
                <div style={{ fontWeight: 800, minWidth: 40, textAlign: "right", color: "var(--danger)" }}>
                  {s.risk}
                </div>
              </div>
            ))
          ) : (
            <div className="empty">All high-risk systems have been patched. ✓</div>
          )}
        </div>

        <div>
          <div className="stack-top-label">DEPLOYMENT CONSOLE</div>
          <div className="console">
            {log.length > 0 ? (
              log.map((l, i) => (
                <div key={i} className={l.cls}>{l.text}</div>
              ))
            ) : (
              <div className="ln-muted">Awaiting deployment command...</div>
            )}
            {(phase === "scanning" || phase === "patching") && <div className="ln-muted">_</div>}
          </div>
        </div>
      </div>
      <div className="card-note">
        Priority queue dequeues the highest-risk system first, then patches each one in order.
      </div>
    </div>
  );
};

export default QuickFixDeployer;
