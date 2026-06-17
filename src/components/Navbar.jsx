import React, { useState } from "react";

const Navbar = () => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

  React.useEffect(() => {
    const id = setInterval(
      () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })),
      1000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="navbar">
      <div className="brand">
        <div className="logo-mark">TT</div>
        <div className="brand-text">
          <div className="name">ThreatTrace</div>
          <div className="sub">SOC MONITORING</div>
        </div>
      </div>

      <div className="nav-center">
        <span className="live-dot"></span>
        <span>Live Simulation • 6 Modules Active</span>
      </div>

      <div className="nav-right">
        <div className="profile">
          <div className="avatar">ND</div>
          <div className="who">
            <div className="role-name">Ninad Deodhare</div>
            <div className="role-sub">Security Analyst</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
