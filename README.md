1 Project Title
* ThreatTrace Dashboard

2 Problem Statement
* Develop a screen for security experts to find and analyze dangerous activity (like hacking) on a computer system, tracking where attackers might move next.

3 Project description
- ThreatTrace is an educational React + Vite dashboard that demonstrates common data structures and algorithms through cybersecurity-themed UI modules (access-change undo stack, firewall rules, virus lists, attack-path BFS, patch priority queue, timeline, etc). It is intended for learning and demos.

4 Tech stack
- React (function components, hooks)
- Vite (dev server / build)
- Plain CSS for styling
- Optional: GitHub / Vercel for deployment

5 Main features
- VirusPatternList.jsx :- 
What it does: Searchable list of viruses.
How: Reads viruses.js array. Applies .filter() for search + severity filter. Modal for details. On detect, calls onDetect(v) which bumps stats in the parent.

- AccessChangeUndo.jsx :-
What it does: Tracks permission changes with undo.
How: pushChange() adds to a history array (Stack). popChange() removes the last element (slice(0, -1)). Visually marks the top of the stack with ▼ TOP ▼

- AlertProcessingLine.jsx :- 
What it does: Queue of alerts, processed in order.
How: FRONT → REAR rail uses alertQueue.map(). + Add Alert uses array spread ([...q, a]). Process Next uses array destructuring (const [first, ...rest] = queue).

- BannedServerChecker.jsx :-
What it does: Checks if an IP is on the banned list.
How: Hash table lookup blocked[ip] — O(1) regardless of list size. Quick-test buttons are pre-set.

- CompromiseRiskSorter.jsx :- 
What it does: Ranks files by risk.
How: .sort() with three modes (risk-desc, risk-asc, name). Returns a sorted copy; original stays intact.

- FirewallSettingHub.jsx :-
What it does: Central firewall rules.
How: Reads from useFirewall() context. Add/Remove/Toggle all call context methods that update the shared state.

- QuickAttackPathFinder.jsx :-
What it does: Finds shortest path through a network.
How: Breadth-First Search (BFS)

- QuickFixDeployer.jsx :-
What it does: Patches high-risk systems first.
How: Pre-sorts by risk descending. Uses useRef to store timer IDs (so we can clear them on unmount or reset). setInterval cycles through each system, simulating patch deployment with timeout delays.


6 Screenshots
<img width="1470" height="836" alt="image" src="https://github.com/user-attachments/assets/493a89b1-200c-449a-9c2b-29f67873aaca" />
<img width="1470" height="836" alt="image" src="https://github.com/user-attachments/assets/a05f3032-2573-42d4-b73d-b9b3f951870a" />

7 Deployment Link
https://react-major-project-pi.vercel.app/

8 Steps To Run in your system
- Download the zip folder 
- Run in your software

