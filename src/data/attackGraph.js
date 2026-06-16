export const attackGraph = {
  Internet: ["Gateway"],
  Gateway: ["UserPC", "Server"],
  UserPC: ["Workstation", "Database"],
  Server: ["Database", "FileServer"],
  Workstation: ["FileServer"],
  FileServer: ["Database"],
  Database: [],
};

export const networkNodes = [
  { id: "Internet", label: "Internet", risk: 100, ports: [80, 443], threat: "Critical", x: 50, y: 8, underAttack: true },
  { id: "Gateway", label: "Gateway", risk: 55, ports: [22, 80], threat: "Medium", x: 50, y: 32, underAttack: false },
  { id: "UserPC", label: "User PC", risk: 41, ports: [445, 3389], threat: "Medium", x: 20, y: 56, underAttack: false },
  { id: "Server", label: "Web Server", risk: 73, ports: [22, 80, 443], threat: "High", x: 80, y: 56, underAttack: true },
  { id: "Database", label: "Database", risk: 88, ports: [3306, 5432], threat: "Critical", x: 50, y: 86, underAttack: true },
];

export const networkEdges = [
  { from: "Internet", to: "Gateway" },
  { from: "Gateway", to: "UserPC" },
  { from: "Gateway", to: "Server" },
  { from: "UserPC", to: "Database" },
  { from: "Server", to: "Database" },
];
