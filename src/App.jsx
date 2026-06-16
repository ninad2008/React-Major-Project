import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BeginnerDashboard from "./pages/BeginnerDashboard";
import Footer from "./components/Footer";
import { FirewallProvider } from "./context/FirewallContext";

const App = () => {
  // Toggle between the polished 'pro' dashboard and the beginner-explanation version.
  // Beginners: leave this as 'beginner' for a clean single-page view with inline DSA notes.
  // Pros: switch to 'pro' to see the full sidebar + event-feed layout.
  const [mode, setMode] = useState("beginner");

  return (
    <FirewallProvider>
      <div className="app">
        <Navbar />

        {/* Top-bar mode toggle - visible to everyone */}
        <div
          style={{
            background: "#0E1626",
            borderBottom: "1px solid #25324A",
            padding: "10px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span className="live-dot" style={{ background: "#00D084" }}></span>
            <span style={{ color: "#AAB7C7" }}>View mode:</span>
            <div
              style={{
                display: "inline-flex",
                background: "#0B1220",
                border: "1px solid #25324A",
                borderRadius: 8,
                padding: 3,
                gap: 3,
              }}
            >
              <button
                onClick={() => setMode("beginner")}
                style={{
                  background: mode === "beginner" ? "#1c3a5e" : "transparent",
                  border: "none",
                  color: mode === "beginner" ? "#E6EDF7" : "#AAB7C7",
                  padding: "5px 11px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Beginner
              </button>
              <button
                onClick={() => setMode("pro")}
                style={{
                  background: mode === "pro" ? "#1c3a5e" : "transparent",
                  border: "none",
                  color: mode === "pro" ? "#E6EDF7" : "#AAB7C7",
                  padding: "5px 11px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Pro (Full)
              </button>
            </div>
            {mode === "beginner" && (
              <span style={{ color: "#AAB7C7", fontSize: 12, marginLeft: 8 }}>
                Single-page version with inline DSA explanations
              </span>
            )}
          </div>
        </div>

        {mode === "beginner" ? (
          <BeginnerDashboard />
        ) : (
          <>
            <div className="layout">
              <Sidebar active="overview" setActive={() => {}} />
              <Dashboard />
            </div>
            <Footer />
          </>
        )}
      </div>
    </FirewallProvider>
  );
};

export default App;
