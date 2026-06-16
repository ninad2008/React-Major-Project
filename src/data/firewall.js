export const initialFirewallRules = [
  { port: 22, service: "SSH", status: "Blocked" },
  { port: 80, service: "HTTP", status: "Allowed" },
  { port: 443, service: "HTTPS", status: "Allowed" },
  { port: 3306, service: "MySQL", status: "Blocked" },
  { port: 8080, service: "Alt-HTTP", status: "Blocked" },
];
