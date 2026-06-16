import React, { useState } from "react";
import { attackGraph } from "../data/attackGraph";

// Breadth-First Search: shortest path in an unweighted graph
const bfs = (graph, from, to) => {
  if (from === to) return [from];
  const queue = [[from]];
  const visited = new Set([from]);

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];
    for (const neighbor of graph[node] || []) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      const next = [...path, neighbor];
      if (neighbor === to) return next;
      queue.push(next);
    }
  }
  return [];
};

const QuickAttackPathFinder = () => {
  const nodes = Object.keys(attackGraph);
  const [from, setFrom] = useState("Internet");
  const [to, setTo] = useState("Database");
  const [path, setPath] = useState([]);

  const find = () => setPath(bfs(attackGraph, from, to));

  return (
    <div className="card" id="attackpath">
      <div className="card-head">
        <div className="card-title">Quick Attack Path Finder <span className="tag">Graph + BFS</span></div>
      </div>

      <div className="toolbar">
        <div>
          <div className="muted" style={{ fontSize: 11, marginBottom: 4 }}>SOURCE</div>
          <select className="input" value={from} onChange={(e) => setFrom(e.target.value)}>
            {nodes.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <span className="muted" style={{ paddingTop: 20 }}>→</span>
        <div>
          <div className="muted" style={{ fontSize: 11, marginBottom: 4 }}>TARGET</div>
          <select className="input" value={to} onChange={(e) => setTo(e.target.value)}>
            {nodes.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <button className="btn primary" style={{ marginTop: 18 }} onClick={find}>
          Find Shortest Path
        </button>
      </div>

      {path.length > 0 ? (
        <>
          <div className="path-flow">
            {path.map((n, i) => (
              <React.Fragment key={n}>
                <div className="path-node hl">
                  {n}
                  <span className="muted" style={{ fontSize: 11 }}>
                    {i === 0 ? "(source)" : i === path.length - 1 ? "(target)" : ""}
                  </span>
                </div>
                {i < path.length - 1 && <div className="path-down">↓</div>}
              </React.Fragment>
            ))}
          </div>
          <div className="card-note">
            Shortest path found in {path.length - 1} hop(s) using BFS traversal of the attack graph.
          </div>
        </>
      ) : (
        <div className="empty" style={{ marginTop: 6 }}>
          Select source &amp; target, then find the shortest attacker route.
        </div>
      )}
    </div>
  );
};

export default QuickAttackPathFinder;
