import React, { createContext, useContext, useState } from "react";
import { initialFirewallRules } from "../data/firewall";

const FirewallContext = createContext(undefined);

export const FirewallProvider = ({ children }) => {
  const [rules, setRules] = useState(initialFirewallRules);

  const toggleRule = (port) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.port === port
          ? { ...rule, status: rule.status === "Allowed" ? "Blocked" : "Allowed" }
          : rule
      )
    );
  };

  const addRule = (port, service, status) => {
    setRules((prev) => {
      if (prev.some((r) => r.port === port)) return prev;
      return [...prev, { port, service, status }];
    });
  };

  const removeRule = (port) => {
    setRules((prev) => prev.filter((r) => r.port !== port));
  };

  return (
    <FirewallContext.Provider value={{ rules, toggleRule, addRule, removeRule }}>
      {children}
    </FirewallContext.Provider>
  );
};

export const useFirewall = () => {
  const context = useContext(FirewallContext);
  if (context === undefined) {
    throw new Error("useFirewall must be used within a FirewallProvider");
  }
  return context;
};
