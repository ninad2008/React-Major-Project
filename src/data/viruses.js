const viruses = [
  {
    id: 1,
    name: "Trojan.Generic",
    signature: "A3D45F12B9",
    type: "Trojan",
    severity: "High",
    status: "Active",
    threat: 78,
    firstSeen: "2026-02-14",
    description:
      "Disguises itself as legitimate software to gain backdoor access and steal credentials.",
  },
  {
    id: 2,
    name: "Worm.AutoRun",
    signature: "B8K76P23E1",
    type: "Worm",
    severity: "Critical",
    status: "Active",
    threat: 94,
    firstSeen: "2026-02-15",
    description:
      "Self-replicating worm that spreads through removable drives and network shares.",
  },
  {
    id: 3,
    name: "Ransom.LockX",
    signature: "C9M88Q417A",
    type: "Ransomware",
    severity: "Critical",
    status: "Active",
    threat: 97,
    firstSeen: "2026-02-16",
    description:
      "Encrypts user files and demands cryptocurrency payment for the decryption key.",
  },
  {
    id: 4,
    name: "Spy.Agent",
    signature: "D4N12R67C3",
    type: "Spyware",
    severity: "Medium",
    status: "Quarantined",
    threat: 61,
    firstSeen: "2026-02-12",
    description:
      "Silently collects browsing habits and sends data to a remote command server.",
  },
  {
    id: 5,
    name: "Keylogger.Pro",
    signature: "E7P99S14F8",
    type: "Keylogger",
    severity: "High",
    status: "Active",
    threat: 84,
    firstSeen: "2026-02-17",
    description:
      "Records every keystroke to capture passwords, card numbers and private messages.",
  },
  {
    id: 6,
    name: "Adware.Popup",
    signature: "F2Q55T882D",
    type: "Adware",
    severity: "Low",
    status: "Neutralized",
    threat: 22,
    firstSeen: "2026-02-10",
    description:
      "Injects unwanted advertisements and redirects browser traffic for ad revenue.",
  },
];

export default viruses;
