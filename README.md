# OS Project – CPU Scheduling Simulator (React + Vite)

An interactive CPU scheduling simulator built with React and Vite. It visualizes common scheduling algorithms with a Gantt chart, shows per‑process metrics, and provides import/export of process sets.

## Features

- Algorithms: FCFS, SJF, SRTF (preemptive SJF), Round Robin (configurable time quantum).
- Gantt chart visualization with smooth animations.
- Hover tooltips on segments showing start → end times.
- Per‑process metrics: waiting time, turnaround time; plus averages and CPU utilization.
- Process management: add, edit, delete, clear; color assignment; validation.
- Import/Export processes as JSON.

## Quick Start

Prerequisites: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Build and preview production:

```bash
npm run build
npm run preview
```

## Usage

1. Choose an algorithm from the selector (FCFS, SJF, SRTF, RR).
2. For Round Robin, set the `Time Quantum`.
3. Add processes with fields:
   - `name`: unique label (e.g., P1)
   - `arrival`: arrival time (ms), ≥ 0
   - `burst`: CPU burst (ms), > 0
   - `color`: any valid hex color (optional, auto/unique if omitted)
4. Click `Run Simulation` to generate the schedule.
5. Hover Gantt segments to view `${name}: start → end` times.
6. Review metrics (waiting/turnaround) and averages.
7. Use `Export`/`Import` to save or load process sets.

## Import/Export JSON Format

Each process in the JSON array should include `name`, `arrival`, `burst`, and optionally `color`. If `id` is missing, it is generated.

```json
[
  { "name": "P1", "arrival": 0, "burst": 5, "color": "#86efac" },
  { "name": "P2", "arrival": 2, "burst": 3, "color": "#60a5fa" }
]
```

## Project Structure

```
eslint.config.js
index.html
package.json
vite.config.js
public/
src/
	App.css
	index.css
	main.jsx
	routes.jsx
	assets/
	component/
		Footer.jsx
		MainContent.jsx
		MainLayout.jsx
		Navbar.jsx
	pages/
		About.jsx
		Algorithm.jsx
		CompareAlgorithm.jsx
		Home.jsx
		Simulation.jsx
	utlis/
		algorithms.js
		helpers.js
```

Key files:

- `src/pages/Home.jsx`: main UI and simulator orchestration.
- `src/utlis/algorithms.js`: scheduling implementations (FCFS, SJF, SRTF, RR).
- `src/utlis/helpers.js`: utilities (e.g., id generation, color helpers).
- `src/component/*`: layout and shared components.

## Notes

- Chart scaling: with many segments, use horizontal scroll and hover tooltips to keep data readable.
- Validation: arrival ≥ 0, burst > 0, and unique `name` recommended.
- Built with Vite for fast dev and production builds.

## License

This project is for educational purposes. Add a license if you plan to publish or distribute.
