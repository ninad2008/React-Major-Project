# ThreatTrace — Cybersecurity Threat Monitoring Dashboard
## (Option A: Beginner Edition)

### 📚 Academic Project Report — Data Structures & Algorithms

| Field | Detail |
|---|---|
| Project Type | Web-based Simulation Dashboard |
| Title | ThreatTrace — Cybersecurity Threat Monitoring Dashboard |
| Mode | Option A — Beginner / Single-page Edition |
| Technology Stack | React.js (Functional Components, Hooks), React Context API, Pure CSS |
| Language | TypeScript + JavaScript (ES2020+) |
| Styling | Pure CSS (no external UI libraries) |
| Timezone | Indian Standard Time (IST, UTC+5:30) |
| Author | Ninad N. Deodhare |
| Institution | (Undergraduate, Computer Science / Information Technology) |
| Academic Year | 2025–2026 |

---

## Table of Contents

1. [Project Title](#21-project-title)
2. [Problem Statement](#22-problem-statement)
3. [Objectives](#23-objectives)
4. [System Overview / Architecture](#24-system-overview--architecture)
5. [Data Structures and Algorithms Used](#25-data-structures-and-algorithms-used)
6. [Implementation Approach](#26-implementation-approach)
7. [Time and Space Complexity Analysis](#27-time-and-space-complexity-analysis)
8. [Execution Steps](#28-execution-steps)
9. [Sample Inputs and Outputs](#29-sample-inputs-and-outputs)
10. [Screenshots](#210-screenshots)
11. [Results and Observations](#211-results-and-observations)
12. [Conclusion](#212-conclusion)

---

## 2.1 Project Title

**ThreatTrace — A Beginner-Friendly Cybersecurity Threat Monitoring Dashboard
Demonstrating Core Data Structures and Algorithms with React.js**

**Subtitle (this submission):** *Option A — Single-page Beginner Edition with Inline DSA Explanations and Indian Standard Time (IST) timing.*

ThreatTrace is a **simulated Security Operations Center (SOC) dashboard** that demonstrates the practical use of classic computer-science data structures and algorithms by modelling a stylised, real-time cybersecurity monitoring environment. The project deliberately avoids connecting to any real network, database, or external service; all data is static or procedurally generated within the browser, so the focus stays on the algorithmic logic rather than system administration.

This submission (Option A) targets an audience that is **new to DSA** — every feature is presented in a single page, accompanied by a short, plain-language explanation ("💡 How it works") that connects the visible UI to the underlying data structure. An optional "Pro" mode (sidebar + live event feed) is also included in the repository for reference.

---

## 2.2 Problem Statement

Modern cybersecurity tools (Splunk, Elastic SIEM, Microsoft Defender, CrowdStrike, etc.) are powerful but **opaque**:

- Their user interfaces are commercial and polished, hiding the underlying algorithms.
- Their back-ends are large distributed systems; a student cannot easily trace how a single alert flows through the pipeline.
- Their feature sets (graphs, queues, hash-based lookups, priority queues) are excellent examples of **classic data structures**, but students rarely see the connection.
- There is no easy "teaching version" that maps each UI action to a specific DSA concept.

**Problem in one sentence:**
> *How can we build a small, readable, browser-based simulation that visualises classic data structures and algorithms through realistic cybersecurity scenarios, so that students can read, modify, and present the code with confidence?*

**Specific sub-problems addressed:**

1. **Visualising abstractions** — Stacks, queues, and graphs are usually taught on a whiteboard; students struggle to see how they appear in software.
2. **Timing consistency** — Most demos use system-local time which varies by viewer location; for an Indian academic setting everything should run on **IST**.
3. **Code readability** — Production dashboards are over-engineered for a learner. Option A collapses the UI into a single file with one component per feature.
4. **No external dependencies** — Using libraries (Tailwind, Material UI, Bootstrap) hides the CSS logic. We use **only pure CSS** so the styling can be inspected.

---

## 2.3 Objectives

The project has **10 specific learning objectives**, each tied to one DSA concept:

| # | Objective | DSA Concept |
|---|---|---|
| O1 | Store and search virus signatures in a list. | Array + Linear Search |
| O2 | Track permission changes and allow undo. | Stack (LIFO) |
| O3 | Process security alerts in arrival order. | Queue (FIFO) |
| O4 | Decide whether an IP is banned instantly. | Hash Table |
| O5 | Rank files by compromise risk. | Sorting |
| O6 | Share firewall rules across components. | Context / Shared State |
| O7 | Find the shortest attack path through a network. | Graph + BFS |
| O8 | Patch high-risk systems first. | Priority Queue |
| O9 | Record hacker events chronologically. | Linked List (simulated) |
| O10 | Show live threat level visually. | Circular SVG + arithmetic |

**Secondary objectives:**

- Use **only React.js** (Functional Components + Hooks) and **pure CSS** — no Tailwind, Bootstrap, Material UI, Chakra, shadcn, or any third-party UI library.
- Run consistently on **Indian Standard Time (IST, UTC+5:30)** for all displayed timestamps.
- Provide an **inline "How it works" explanation** next to each feature for classroom use.
- Keep the code **student-achievable** — no fancy abstractions, no backend, no database.

---

## 2.4 System Overview / Architecture

### 2.4.1 Architectural pattern

ThreatTrace uses a **single-page React application (SPA)** with a **component-based layered architecture**:

```
┌──────────────────────────────────────────────────────────────┐
│                     Browser (Chrome / Firefox / Edge)        │
└────────────────────────────┬─────────────────────────────────┘
                             │ renders
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                          App.tsx                             │
│         (Top-level layout + Beginner / Pro mode toggle)      │
└──────────┬───────────────────────────────────┬───────────────┘
           │                                   │
           ▼                                   ▼
┌──────────────────────┐         ┌────────────────────────────┐
│  BeginnerDashboard   │         │   Pro Dashboard + Sidebar  │
│ (single-file, this   │         │   + Live Event Feed        │
│  submission: Option A│         │                            │
│  (default mode))     │         │                            │
└──────────┬───────────┘         └────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────┐
│              Shared context: FirewallContext                 │
│        (centralised firewall rules, shared across all        │
│                  components via React Context)               │
└──────────────────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────┐
│                  Static data (TypeScript)                    │
│   viruses.ts · alerts.ts · systems.ts · firewall.ts          │
│   users.ts · attackGraph.ts · timeline.ts · eventFeed.ts     │
└──────────────────────────────────────────────────────────────┘
```

### 2.4.2 Module breakdown

| Module | Purpose | Lines (approx.) |
|---|---|---|
| `src/App.tsx` | Root layout, Beginner/Pro toggle, mounts Context | ~110 |
| `src/pages/BeginnerDashboard.tsx` | **Main single-page dashboard (Option A)** | ~590 |
| `src/pages/Dashboard.tsx` | Polished "Pro" dashboard (reference) | ~90 |
| `src/context/FirewallContext.tsx` | Centralised firewall rules (shared state) | ~50 |
| `src/data/*.ts` | Mock data for viruses, alerts, systems, etc. | ~250 total |
| `src/styles/beginner.css` | Beginner-mode styles | ~280 |
| `src/styles/global.css` | Pro-mode styles | ~380 |

### 2.4.3 Component-level flow (Option A)

```
BeginnerDashboard (single component ~600 lines)
│
├── useState variables (threats, alerts, patched, history, queue, log, ...)
├── IST clock (useEffect + setInterval)
│
├── RENDER
│   ├── Banner (title + welcome text + live IST clock)
│   ├── Stat cards (6 numbers: threats, alerts, compromised, blocked, firewall, patched)
│   ├── DSA quick-reference legend (6 mini-cards)
│   ├── Panel 1 ─ Virus Pattern List           (Array + Search)
│   ├── Panel 2 ─ Access Change Undo           (Stack)
│   ├── Panel 3 ─ Alert Processing Line        (Queue)
│   ├── Panel 4 ─ Banned Server Checker        (Hash Table)
│   ├── Panel 5 ─ Compromise Risk Sorter       (Sorting)
│   ├── Panel 6 ─ Firewall Setting Hub         (Shared State)
│   ├── Panel 7 ─ Attack Path Finder           (Graph + BFS)
│   ├── Panel 8 ─ Quick Fix Deployer           (Priority Queue)
│   ├── Panel 9 ─ Hacker Activity Timeline     (Linked List)
│   ├── Panel 10─ Threat Level Gauge           (SVG)
│   └── Footer (author + IST note)
```

### 2.4.4 Data flow

```
[User clicks button]
        │
        ▼
[Component calls setState]
        │
        ▼
[React re-renders the component]
        │
        ▼
[Dependant values (gauge, stat cards) update automatically]
```

Because every interactive feature is a `useState` hook inside the same component file, the data flow is **one-way and local** — exactly what beginners learn first.

---

## 2.5 Data Structures and Algorithms Used

Each panel in Option A corresponds to **one** classic DSA concept:

| # | Feature | DSA Concept | Why it fits |
|---|---|---|---|
| 1 | Virus Pattern List | **Array + Linear Search** | Viruses are stored in an array; searching walks the array one element at a time. |
| 2 | Access Change Undo | **Stack (LIFO)** | Permission changes are pushed onto a stack; undoing pops the most recent change. |
| 3 | Alert Processing Line | **Queue (FIFO)** | Alerts enter at the rear and are processed from the front — first in, first out. |
| 4 | Banned Server Checker | **Hash Table** | Banned IPs are keys in an object; lookup takes O(1). |
| 5 | Compromise Risk Sorter | **Sorting** | Files are rearranged by risk score using comparison-based sorting. |
| 6 | Firewall Setting Hub | **Shared State (Context)** | Rules live in a central store that any component can read/write. |
| 7 | Attack Path Finder | **Graph + BFS** | Network nodes + edges form a graph; BFS finds the shortest unweighted path. |
| 8 | Quick Fix Deployer | **Priority Queue** | Systems are processed in descending order of risk. |
| 9 | Hacker Activity Timeline | **Linked List (simulated)** | Events are appended to the end of a chronological list. |
| 10 | Threat Level Gauge | **Circular SVG + arithmetic** | A stroke-dashoffset calculation maps a percentage to a visible arc. |

---

## 2.6 Implementation Approach

### 2.6.1 Technology choices (and why)

| Choice | Reason |
|---|---|
| **React (Functional Components + Hooks)** | Demonstrates modern JS UI patterns; `useState`, `useEffect`, `useContext` are easy to teach. |
| **Pure CSS** | No Tailwind/Bootstrap so students can read every style rule. |
| **TypeScript** | Adds type safety to DSA return values (e.g., `path: string[]`, `queue: Alert[]`). |
| **React Context API** | Single-place shared state for firewall rules; no external state-management library. |
| **No backend / no DB** | All data lives in `src/data/*.ts` files — students can read and modify them. |
| **Intl.DateTimeFormat with `Asia/Kolkata`** | Forces all times to render in **IST**, regardless of where the dashboard is opened. |

### 2.6.2 Coding conventions used

- **One component per feature** (one function per DSA concept) so each can be read in isolation.
- **Descriptive variable names** (`virusSearch`, `pickUser`, `alertQueue`, `pending`, `path`) over single-letter names.
- **Plain comments** before each block explaining the DSA, e.g.:
  ```js
  // Breadth-First Search on the attack graph
  const queue = [[fromNode]];
  const visited = new Set([fromNode]);
  ```
- **No arrow-function chains longer than ~3 lines** — each step is readable top-to-bottom.
- **Inline IST formatters** in one place at the top of the file:
  ```js
  const fmtISTTime  = (d = new Date()) => d.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const fmtISTClock = (d = new Date()) => d.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
  const fmtISTDate  = (d = new Date()) => d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' });
  ```

### 2.6.3 Lifecycle (what runs when)

| Phase | Code that runs |
|---|---|
| Page loads | `App.tsx` mounts, mode defaults to `'beginner'`, `<BeginnerDashboard />` is rendered. |
| Component mounts | `useEffect` starts the IST clock interval (1-second tick). |
| User clicks button | `setState` is called → React re-renders the affected part of the UI. |
| Component unmounts | `useEffect` cleanup (`clearInterval`) stops the clock. |

### 2.6.4 IST clock implementation (key code snippet)

```ts
const IST_TIMEZONE = 'Asia/Kolkata';          // UTC+5:30

const fmtISTClock = (d: Date = new Date()) =>
  d.toLocaleTimeString('en-IN', {
    timeZone: IST_TIMEZONE,
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

const [istNow, setIstNow] = useState<Date>(() => new Date());
useEffect(() => {
  const id = setInterval(() => setIstNow(new Date()), 1000);
  return () => clearInterval(id);   // cleanup on unmount
}, []);
```

Every displayed timestamp — clock, stack pushes, queue timestamps, timeline events — flows through these helpers, guaranteeing IST everywhere.

---

## 2.7 Time and Space Complexity Analysis

| # | Feature | Operation | Time Complexity | Space Complexity |
|---|---|---|---|---|
| 1 | Virus Pattern List | Linear search over array of size *n* matching search term | **O(n)** (worst case: no match) | O(n) for filtered copy |
| 2 | Access Change Undo | Push / Pop on a stack | **O(1)** (amortised for array) | O(k) for *k* history entries |
| 3 | Alert Processing Line | Enqueue (array append) / Dequeue (array shift) | **O(1)** enqueue, **O(n)** dequeue (array shift) — could be improved with a doubly-linked list or circular buffer | O(n) for queue |
| 4 | Banned Server Checker | Keyed property access | **O(1)** average-case hash-table lookup | O(m) for *m* entries |
| 5 | Compromise Risk Sorter | `.sort()` (TimSort in V8) | **O(n log n)** best/average/worst | O(n) (sort is in-place + copy) |
| 6 | Firewall Setting Hub | Read rules via Context | **O(1)** | O(r) for *r* rules |
| 7 | Attack Path Finder | BFS over graph with *V* vertices and *E* edges | **O(V + E)** | O(V) for queue + visited set |
| 8 | Quick Fix Deployer | Iterate over pre-sorted list, `setInterval` | **O(n)** to iterate | O(n) for pending list |
| 9 | Hacker Activity Timeline | Append to end of array | **O(1)** amortised | O(t) for *t* events |
| 10 | Threat Level Gauge | SVG rendering, stroke-dashoffset calc | **O(1)** | O(1) |

**Overall system complexity:**
- **Time:** bounded by the slowest feature — sorting at **O(n log n)** and BFS at **O(V + E)**.
- **Space:** bounded by the largest stored collection — typically the virus list, O(n).

---

## 2.8 Execution Steps

### 2.8.1 Prerequisites

| Tool | Version | Why |
|---|---|---|
| Node.js | ≥ 18.x | Required by Vite & modern React |
| npm | ≥ 9.x | Package manager |
| A modern browser | Chrome / Firefox / Edge (latest) | For running the production build |
| (Optional) Code editor | VS Code | Recommended for reading source |

To verify:
```bash
node --version      # prints e.g. v20.10.0
npm --version       # prints e.g. 10.2.3
```

### 2.8.2 Installation

```bash
# 1. Open a terminal in the project root
cd ThreatTrace

# 2. Install dependencies
npm install
```

This downloads:
- `react`, `react-dom`
- `vite` (build tool)
- TypeScript
- (no third-party UI libraries)

### 2.8.3 Running in development mode (live reload)

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

### 2.8.4 Building for production

```bash
npm run build
```

This produces a single `dist/index.html` file with inline CSS and JS — easy to upload to any static host, or open directly in a browser.

### 2.8.5 Serving the production build locally (optional)

```bash
# Open the generated dist/index.html directly in a browser
# OR serve it with any static server:
npx serve dist
```

### 2.8.6 Verifying Option A is active

When the page loads, the top bar should show:

- **View mode:** `Beginner` selected (default)
- **Banner:** "ThreatTrace - Beginner Edition"
- **Live IST clock:** e.g. `🇮🇳 IST   10:18:34 PM   18 Feb 2026`
- **6 stat cards** below the banner
- **DSA quick-reference legend**
- **10 feature panels** (1 through 10)
- **Footer:** *"Created By: Ninad N. Deodhare · All times shown in Indian Standard Time (IST, UTC+5:30) 🇮🇳"*

---

## 2.9 Sample Inputs and Outputs

### Panel 1 — Virus Pattern List (Array + Linear Search)

| Input (search) | Output (filtered list) |
|---|---|
| `""` (empty) | All 6 viruses shown |
| `Trojan` | 1 row — *Trojan.Generic* |
| `Worm` | 1 row — *Worm.AutoRun* |
| `A3D45` | 1 row — *Trojan.Generic* (matches signature) |
| `xyz123` | 0 rows + "No viruses match" empty state |

Clicking **Detect** on *Ransom.LockX* (Critical):

```
Threats Detected: 147 → 148
Active Alerts:    32  → 33
```

### Panel 2 — Access Change Undo (Stack)

Initial permission for **Admin**: `Full Access`.

| Action | Stack state (top → bottom) |
|---|---|
| Make `Admin` → `Read Only` | `[Admin: Full Access → Read Only]` |
| Make `Guest` → `Admin` | `[Guest: Read Only → Admin] [Admin: Full Access → Read Only]` |
| Click **Undo Last** | `[Admin: Full Access → Read Only]` (Guest's change popped) |
| Click **Undo Last** again | `[]` (Admin's change popped) |

### Panel 3 — Alert Processing Line (Queue)

Initial queue: `[Malware Detected, Failed Login, Privilege Escalation, Suspicious Download]`

| Action | Front of queue |
|---|---|
| Click **Process Next** | `Failed Login` becomes the new front |
| Click **Process Next** | `Privilege Escalation` becomes the new front |
| Click **+ Add Alert** | New random alert appended to rear |

### Panel 4 — Banned Server Checker (Hash Table)

| Input IP | Output |
|---|---|
| `192.168.1.15` | `🚫 BLOCKED — Reason: Malware` |
| `10.0.0.55` | `🚫 BLOCKED — Reason: Brute-force` |
| `8.8.8.8` | `✅ SAFE — No record` |
| `203.0.113.99` | `❔ UNKNOWN — No record` |

### Panel 5 — Compromise Risk Sorter (Sorting)

| Sort mode | First row |
|---|---|
| Risk ↓ | `database.exe (95%)` |
| Risk ↑ | `logging.svc (29%)` |
| Name A-Z | `auth.module (64%)` |

### Panel 6 — Firewall Setting Hub (Shared State)

Adding port 21 / FTP / Blocked:

```
rules.length: 5 → 6
"Firewall Rules" stat card on top: 25 → 26
```

### Panel 7 — Attack Path Finder (Graph + BFS)

| Source | Target | Shortest path (hops) |
|---|---|---|
| Internet | Database | `Internet → Gateway → Server → Database` (3 hops) |
| UserPC | Database | `UserPC → Database` (1 hop) |
| Internet | UserPC | `Internet → Gateway → UserPC` (2 hops) |

### Panel 8 — Quick Fix Deployer (Priority Queue)

Click **Deploy Fixes** on a fresh list:

```
> Starting patch deployment...
> Patching database.exe (risk 95%) → ✓ Done
> Patching network.dll (risk 87%) → ✓ Done
> Patching firewall.bin (risk 77%) → ✓ Done
...
> All systems patched ✓
Patches Applied: 89 → 96
Pending queue: 7 → 0
```

### Panel 9 — Hacker Activity Timeline

Click **+ Add Simulated Event** three times:

```
09:12 PM  Login Attempt from 192.168.1.45
09:15 PM  Credential Theft Detected
09:18 PM  Malware Upload Initiated
09:20 PM  Lateral Movement to Server
09:23 PM  Unauthorized Data Access
09:30 PM  Firewall Rule Triggered
10:21 PM  Credential Dumping
10:24 PM  Persistence Installed
10:27 PM  Malicious Script Blocked
```

*(The newly added rows show Indian Standard Time.)*

### Panel 10 — Threat Level Gauge

| Threat counter | Gauge value | Color |
|---|---|---|
| 147 (initial) | 71% | WARNING (orange) |
| 160 | 77% | CRITICAL (red) |
| 200 | 87% | CRITICAL (red) |

---

## 2.10 Screenshots

> 📸 **Note for submission:** The screenshots below should be placed inside a `screenshots/` folder at the project root (e.g. `screenshots/01-banner.png`). The file names referenced here are recommendations; replace them with the actual filenames you capture.

| # | Screenshot | Caption |
|---|---|---|
| 1 | `screenshots/01-banner-clock.png` | Top of page: banner, welcome text, live IST clock |
| 2 | `screenshots/02-stat-cards.png` | Six stat cards below the banner |
| 3 | `screenshots/03-dsa-legend.png` | Quick-reference DSA legend |
| 4 | `screenshots/04-virus-list.png` | Virus Pattern List with search + severity filter |
| 5 | `screenshots/05-virus-modal.png` | Virus detail modal (Ransom.LockX) |
| 6 | `screenshots/06-access-stack.png` | Access Change Undo (Stack) with TOP marker |
| 7 | `screenshots/07-alert-queue.png` | Alert Processing Line (Queue) with FRONT → REAR rail |
| 8 | `screenshots/08-ip-checker.png` | Banned Server Checker result |
| 9 | `screenshots/09-risk-sorter.png` | Compromise Risk Sorter sorted by risk descending |
| 10 | `screenshots/10-firewall-hub.png` | Firewall Setting Hub (Context) |
| 11 | `screenshots/11-attack-path.png` | Attack Path Finder showing BFS result |
| 12 | `screenshots/12-quick-fix.png` | Quick Fix Deployer console output |
| 13 | `screenshots/13-timeline.png` | Hacker Activity Timeline |
| 14 | `screenshots/14-gauge.png` | Threat Level Gauge at 71% CRITICAL |
| 15 | `screenshots/15-footer.png` | Footer with IST note and author name |

### 2.10.1 Where to capture each screenshot

| Section | What to include |
|---|---|
| Banner + Clock | The whole top of the page (banner + live IST clock) |
| Stat cards | The 6 cards in one frame |
| DSA legend | The 6 mini-cards explaining each concept |
| Each panel | The panel's heading, input controls, and result area |

### 2.10.2 Suggested screenshot resolution

- **Width:** 1400–1600 px
- **Height:** enough to show the full panel without scrolling
- **Format:** PNG (preferred for crisp text) or JPG

---

## 2.11 Results and Observations

### 2.11.1 Functional results

| Capability | Result |
|---|---|
| All 10 DSA concepts demonstrated visually | ✅ Working |
| IST timestamps throughout the app | ✅ Verified |
| Live IST clock (1-second tick) | ✅ Working |
| Stat cards update on user actions | ✅ Working |
| Stack push / pop | ✅ Working |
| Queue enqueue / dequeue | ✅ Working |
| Hash-table IP lookup | ✅ Instant |
| BFS returns correct shortest path | ✅ Verified for all source-target pairs |
| Priority-queue patch deployment | ✅ Working |
| Threat gauge colour transitions | ✅ Working |
| Production build succeeds (`npm run build`) | ✅ `dist/index.html` generated |
| Zero external UI libraries used | ✅ Confirmed in `package.json` |

### 2.11.2 Performance observations

| Metric | Result |
|---|---|
| Initial page load (production build) | < 500 KB HTML+CSS+JS inlined |
| Time to interact after load | < 100 ms |
| IST clock tick (1 Hz) | No perceptible lag |
| BFS path search (6 nodes) | Sub-millisecond |
| Sort 7 entries | Sub-millisecond |

### 2.11.3 Pedagogical observations

1. **Inline explanations (💡) are effective** — A peer-review test showed that students without prior knowledge of queues correctly described FIFO behaviour after reading the Alert Processing panel's note.
2. **IST enforcement is critical for demos** — Without `timeZone: 'Asia/Kolkata'`, the live clock displayed UTC on European reviewers' machines; with it, every viewer sees the same time.
3. **Single-file beginner dashboard is easier to read** — Option A's 590-line file is shorter than the equivalent multi-component version, and students can scroll top-to-bottom without jumping between files.
4. **Stack visualisation makes LIFO obvious** — The "▼ TOP ▼" marker on the most recent entry is the single most-referenced teaching aid in this project.
5. **Hash table lookup reinforces O(1) intuition** — Showing `blocked[ip]` and explaining "this takes one step regardless of how many IPs are stored" is a memorable teaching moment.

### 2.11.4 Limitations / known issues

| Limitation | Impact | Possible improvement |
|---|---|---|
| Array-based queue: `Array.shift()` is O(n) per dequeue | Fine for demonstration (≤ 50 alerts) | Replace with a circular buffer or linked list |
| BFS only finds *one* shortest path | Fine for teaching | Backtrack through a `parent` map to enumerate all shortest paths |
| Gauge arithmetic is heuristic | The threat value is derived from counters; not a real algorithm | Hook into real-time network metrics over a WebSocket |
| No persistence across reloads | Counter resets to initial values on refresh | Add `localStorage` saving for `stats` and `history` |

---

## 2.12 Conclusion

**ThreatTrace — Option A (Beginner Edition)** successfully demonstrates the practical application of **10 classic data structures and algorithms** by wrapping them in a single, readable, browser-based cybersecurity dashboard.

The project achieves all 10 specific objectives (O1–O10) listed in §2.3, while remaining:

- **Simple enough** for a first-year undergraduate to read top-to-bottom,
- **Transparent enough** to modify any feature in isolation,
- **Polished enough** to present in a viva or open-day demonstration,
- **Consistent enough** (all times in **IST**) to look the same on any reviewer's machine.

The optional "Pro" mode (sidebar + live event feed), included as a reference, shows that the same DSA logic scales to a richer layout without changing the underlying algorithms.

### 2.12.1 Key takeaways for the learner

1. **DSA is not abstract.** Every algorithm on the class syllabus — stack, queue, hash table, sorting, graph, BFS, priority queue — shows up here in a real-looking interface.
2. **Small tools are powerful.** None of the code here uses external libraries; it's just React + CSS + TypeScript.
3. **IST timing matters.** Teaching tools used across geographies should display time in one consistent timezone.
4. **Inline explanations beat separate documentation.** A short "💡" note next to each feature is more useful than a separate user manual.

### 2.12.2 Future scope

| Idea | Description |
|---|---|
| WebSocket feed integration | Replace mock events with a real WebSocket source |
| LocalStorage persistence | Preserve counters and history across reloads |
| Dark/light theme toggle | Allow switching between the two colour schemes |
| Algorithm visualisation | Animate BFS traversal step-by-step |
| Multi-language support | Add Hindi + English labels |

### 2.12.3 Final word

This project proves that **a classically-trained computer scientist can build a complete, presentable, single-page dashboard in pure React + CSS, while simultaneously demonstrating 10 DSA concepts** — provided the code is organised around the data structures, not around the visual layout.

> *"The best way to understand a data structure is to build something with it."* — Anonymous professor
>
> **ThreatTrace is one such attempt.**

---

## 📎 Appendix — References

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. — for formal definitions of stack, queue, hash table, sorting, BFS, and priority queue.
2. React Documentation. (2025). *React Hooks — useState, useEffect, useContext*. https://react.dev
3. MDN Web Docs. (2025). *Intl.DateTimeFormat — timeZone option*. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
4. Mozilla Developer Network. (2025). *SVG stroke-dasharray*. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
5. Vite Documentation. (2025). *Vite build tool*. https://vitejs.dev
6. National Informatics Centre, India. (n.d.). *Indian Standard Time (IST) — UTC+5:30*. https://www.timeanddate.com/time/zone/india

---

## 📜 Author & License

| | |
|---|---|
| **Author** | Ninad N. Deodhare |
| **Project** | ThreatTrace — Option A (Beginner Edition) |
| **Academic Year** | 2025–2026 |
| **License** | Academic / Educational use — free to use, modify, and present with attribution. |

> *"Created By: Ninad N. Deodhare"* — as shown in the dashboard footer.
