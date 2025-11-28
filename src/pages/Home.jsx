import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  simulateFCFS,
  simulateSJF,
  simulateRR,
  simulateSRTF,
} from "../utlis/algorithms";
import { uid } from "../utlis/helpers";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [quantum, setQuantum] = useState(4);
  const [processes, setProcesses] = useState([
    { id: uid(), name: "P1", arrival: 0, burst: 5, color: "#f97316" },
    { id: uid(), name: "P2", arrival: 2, burst: 3, color: "#60a5fa" },
  ]);

  const [name, setName] = useState("");
  const [arrival, setArrival] = useState(0);
  const [burst, setBurst] = useState(1);
  const [color, setColor] = useState("#86efac");

  function handleAdd() {
    if (!name.trim()) return toast.error("Process name required");
    if (burst <= 0) return toast.error("Burst must be > 0");

    const p = {
      id: uid(),
      name: name.trim(),
      arrival: Number(arrival),
      burst: Number(burst),
      color,
    };
    setProcesses((prev) => [...prev, p]);

    setName("");
    setArrival(0);
    setBurst(1);

    toast.success("Process added");
  }

  function handleDelete(id) {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
    toast.info("Process removed");
  }

  function handleClear() {
    setProcesses([]);
    toast.warning("All processes removed");
  }

  const simulation = useMemo(() => {
    if (!processes.length)
      return { gantt: [], summary: [], totalTime: 0, totals: {}, busyTime: 0 };
    if (algorithm === "FCFS") return simulateFCFS(processes);
    if (algorithm === "SJF") return simulateSJF(processes);
    if (algorithm === "SRTF") return simulateSRTF(processes);
    return simulateRR(processes, quantum);
  }, [processes, algorithm, quantum]);

  function runSimulation() {
    if (!processes.length) return toast.error("Add at least one process");
    toast.success(`${algorithm} simulation completed`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl mx-auto p-4"
    >
      <ToastContainer position="top-right" />

      {/* ================= Top Controls ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Algorithm Section */}
        <motion.div
          // Container: Dark background, rounded, elevated on hover with an indigo glow
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)",
          }}
          className="bg-gray-900 border border-indigo-700/50 p-6 rounded-2xl shadow-xl transition-all duration-300"
        >
          {/* Header: Large, bold, and accented with indigo color */}
          <h2 className="text-2xl font-extrabold mb-5 text-indigo-400 flex items-center">
            <span className="mr-2 text-3xl">⚙️</span>
            Algorithm Configuration
          </h2>

          {/* Algorithm Selector: Darker input field for better contrast */}
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            // Adjusted classes for dark mode and focus style
            className="select select-bordered w-full bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option className="bg-gray-800" value="FCFS">
              FCFS (First Come First Serve)
            </option>
            <option className="bg-gray-800" value="SJF">
              SJF (Shortest Job First) - Non-preemptive
            </option>
            <option className="bg-gray-800" value="RR">
              Round Robin
            </option>
            <option className="bg-gray-800" value="SRTF">
              SRTF (Shortest Remaining Time First)
            </option>
          </select>

          <AnimatePresence>
            {algorithm === "RR" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden relative" // Added 'relative' for absolute positioning of 'ms'
              >
                {/* Label and Input for Time Quantum */}
                <label className="text-sm font-semibold text-gray-300 block mb-1">
                  ⏳ Time Quantum
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={quantum}
                    onChange={(e) => setQuantum(Number(e.target.value))}
                    min="1"
                    placeholder="e.g., 4"
                    // Dark mode input styling with focus ring
                    className="input input-bordered w-full bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-12"
                  />
                  {/* Unit indicator for better context */}
                  <span className="absolute right-9 text-indigo-400 text-sm font-mono pointer-events-none">
                    ms
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simulate Button: Strong CTA with shadow lift effect */}
          <button
            onClick={runSimulation}
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none w-full mt-6 text-lg font-bold shadow-xl shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            ✨ Run Simulation
          </button>
        </motion.div>

        {/* Add Process */}

        <motion.div
          // Container: Slightly lighter dark background for contrast, subtle border
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)",
          }}
          className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg transition-all duration-300"
        >
          {/* Header: Clear title with an icon */}
          <h2 className="text-xl font-bold mb-5 text-white flex items-center">
            <span className="mr-2 text-indigo-400 text-2xl">➕</span> Add New
            Process
          </h2>

          {/* Process Name Input */}
          <label className="text-sm font-semibold text-gray-400 block mb-1">
            🏷️ Process Name
          </label>
          <input
            placeholder="e.g., P1, UI Thread"
            className="input input-bordered w-full mb-4 bg-gray-700 text-white border-gray-600 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Arrival Time Input */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-400 block mb-1">
                ⏱️ Arrival Time
              </label>
              <input
                type="number"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 pr-10"
                placeholder="Time (ms)"
                min="0"
              />
              <span className="absolute right-3 bottom-3 text-indigo-400 text-xs pointer-events-none">
                ms
              </span>
            </div>

            {/* Burst Time Input */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-400 block mb-1">
                ⚡ Burst Time
              </label>
              <input
                type="number"
                value={burst}
                onChange={(e) => setBurst(e.target.value)}
                className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 pr-10"
                placeholder="Duration (ms)"
                min="1"
              />
              <span className="absolute right-3 bottom-3 text-indigo-400 text-xs pointer-events-none">
                ms
              </span>
            </div>
          </div>

          {/* Color Preview with Hex Code */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-lg text-gray-400">🎨</span>
            <div
              style={{
                background: color,
                width: "2.5rem",
                height: "1.5rem",
                borderRadius: "0.5rem",
                border: "2px solid #fff3",
              }}
              className="shadow-inner"
            />
            <small className="text-sm text-gray-300 font-mono select-all">
              {color}
            </small>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              // Add Button: Dominant CTA
              className="btn bg-green-600 hover:bg-green-700 text-white border-none flex-1 font-bold shadow-lg shadow-green-500/30 transition-all duration-200"
              onClick={() => {
                // ... (Your existing logic for validation, color generation, and adding process)
                if (!name.trim()) return toast.error("Process name required");
                if (burst <= 0) return toast.error("Burst must be > 0");

                const getRandomColor = (excludeColors = []) => {
                  let color;
                  do {
                    color =
                      "#" +
                      Math.floor(Math.random() * 0xffffff)
                        .toString(16)
                        .padStart(6, "0");
                  } while (excludeColors.includes(color));
                  return color;
                };

                // Assuming 'processes' and 'uid' are defined in the component scope
                const usedColors = processes.map((p) => p.color);
                const uniqueColor = getRandomColor(usedColors);

                const p = {
                  id: uid(),
                  name: name.trim(),
                  arrival: Number(arrival),
                  burst: Number(burst),
                  color: uniqueColor,
                };

                setProcesses((prev) => [...prev, p]);
                setName("");
                setArrival(0);
                setBurst(1);
                setColor(uniqueColor);

                // toast.success("Successfully Added New Process");
              }}
            >
              ✅ Add Process
            </button>

            <button
              // Reset Button: Secondary action, softer style
              className="btn btn-outline border-gray-500 text-gray-400 hover:bg-gray-700 hover:border-gray-600"
              onClick={() => {
                setName("");
                setArrival(0);
                setBurst(1);

                // Update color preview for next process
                const usedColors = processes.map((p) => p.color);
                const getRandomColor = (excludeColors = []) => {
                  let color;
                  do {
                    color =
                      "#" +
                      Math.floor(Math.random() * 0xffffff)
                        .toString(16)
                        .padStart(6, "0");
                  } while (excludeColors.includes(color));
                  return color;
                };
                setColor(getRandomColor(usedColors));
              }}
            >
              🗑️ Reset
            </button>
          </div>
        </motion.div>

        {/* Process List */}
        <motion.div
          // Container: Consistent dark theme with subtle hover lift
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)",
          }}
          className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg transition-all duration-300 h-fit"
        >
          {/* Header: Clear title with an icon */}
          <h2 className="text-xl font-bold mb-5 text-white flex items-center">
            <span className="mr-2 text-indigo-400 text-2xl">📋</span> Active
            Process Queue
          </h2>

          {/* Process List Container: Defined height and custom scrollbar style */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {processes.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 py-4 border border-dashed border-gray-700 rounded-lg"
                >
                  No processes added yet. Add a process or use Quick Add!
                </motion.div>
              )}
              {processes.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  // New Styles: dark background, colored left border for visual accent
                  className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border-l-4 border-gray-600 shadow-md"
                  style={{ borderLeftColor: p.color }} // Use the process color for the left border accent
                >
                  <div className="flex items-center gap-3">
                    {/* Colored Name Chip */}
                    <div
                      style={{ background: p.color, color: "#111" }} // Force text color to dark for contrast on random colors
                      className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-extrabold shadow-sm"
                    >
                      {p.name.slice(0, 2)}
                    </div>

                    <div>
                      {/* Process Name: Primary focus, white text */}
                      <div className="text-base font-semibold text-white">
                        {p.name}
                      </div>

                      {/* Metrics: Secondary focus, using monospace font for numbers */}
                      <div className="text-xs text-gray-400 font-mono">
                        AT:{" "}
                        <span className="text-indigo-300">{p.arrival}ms</span> |
                        BT: <span className="text-red-300">{p.burst}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button: Small, clear, with an icon */}
                  <button
                    className="btn btn-xs btn-error btn-square bg-red-600 hover:bg-red-700 border-none text-white"
                    onClick={() => handleDelete(p.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Utility Buttons: Quick Add and Clear */}
          <div className="mt-6 flex gap-3">
            <button
              // Quick Add: Action button, using the original 'warning' color but enhanced
              className="btn bg-amber-500 hover:bg-amber-600 text-black border-none flex-1 font-semibold shadow-md shadow-amber-500/40"
              onClick={() => {
                const id = uid();
                const arrival = Math.floor(Math.random() * 10);
                const burst = Math.floor(Math.random() * 10) + 1;

                function getRandomColor(excludeColors = []) {
                  let color;
                  do {
                    color =
                      "#" +
                      Math.floor(Math.random() * 0xffffff)
                        .toString(16)
                        .padStart(6, "0");
                  } while (excludeColors.includes(color));
                  return color;
                }

                const usedColors = processes.map((p) => p.color);
                const color = getRandomColor(usedColors);

                setProcesses((prev) => [
                  ...prev,
                  { id, name: `P${prev.length + 1}`, arrival, burst, color },
                ]);

                // toast.success("Sample process added");
              }}
            >
              ⚡ Quick Add Sample
            </button>
            <button
              // Clear: Secondary action, outline style
              className="btn btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              onClick={handleClear}
            >
              🗑️ Clear All
            </button>
          </div>
        </motion.div>
      </div>

      {/* ================= Gantt Section ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-base-200 p-5 rounded-xl shadow-lg"
      >
        <h3 className="font-bold mb-3">📊 Gantt Chart</h3>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-indigo-400 flex items-center">
            <span className="mr-2">⏱️</span> CPU Gantt Chart
          </h2>

          {simulation.gantt.length === 0 ? (
            <p className="text-gray-500 text-center p-8 border border-dashed border-gray-700 rounded-lg">
              No simulation data. Run simulation to see the chart.
            </p>
          ) : (
            <div className="relative">
              {/* 1. PROCESS SEGMENTS (The Main Bar) */}
              <div className="flex h-12 overflow-x-auto w-full bg-gray-700 rounded-lg shadow-inner">
                {simulation.gantt.map((g, i) => {
                  // Calculate width based on total time for proportionate scaling
                  const width = simulation.totalTime
                    ? ((g.end - g.start) / simulation.totalTime) * 100
                    : 0;

                  return (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }} // Stagger animation slightly
                      style={{ width: `${width}%` }}
                      className="origin-left h-full border-r border-gray-800" // Add a subtle separator
                    >
                      <div
                        className="h-full w-full flex items-center justify-center font-extrabold text-xs sm:text-sm text-black rounded-lg transition-all duration-300 hover:opacity-90 cursor-default"
                        style={{ background: g.color }}
                        title={`Process: ${g.name} | Start: ${g.start} | End: ${g.end}`}
                      >
                        {/* Display process name only, but ensure visibility for short segments */}
                        <span className="truncate px-1">{g.name}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* 2. TIME AXIS (The Time Markers) */}
              <div className="relative flex w-full h-8 mt-2 overflow-hidden">
                {/* Start Time Marker (Always 0) */}
                <div className="absolute top-0 left-0 text-xs font-mono text-gray-400">
                  0
                </div>

                {/* Other Time Markers */}
                {simulation.gantt.map((g, i) => {
                  // Calculate the position based on the end time's percentage of total time
                  const position = simulation.totalTime
                    ? (g.end / simulation.totalTime) * 100
                    : 0;

                  // Only render the time marker if the position is > 0 and not the absolute start (0)
                  if (position > 0) {
                    return (
                      <div
                        key={`time-${i}`}
                        className="absolute top-0 flex flex-col items-center"
                        style={{
                          left: `${position}%`,
                          transform: "translateX(-50%)",
                        }} // Center the marker on the position
                      >
                        {/* Thin vertical line */}
                        <div className="w-px h-2 bg-gray-600 mb-1"></div>
                        {/* Time value */}
                        <div className="text-xs font-mono text-gray-400">
                          {g.end}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Total Time Marker (End of Chart) */}
                {simulation.totalTime > 0 && (
                  <div className="absolute top-0 right-0 text-xs font-mono text-gray-400">
                    {simulation.totalTime}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= Stats ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4 mt-8 text-green-400 flex items-center">
            <span className="mr-2">📈</span> Simulation Results
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {/* ========================================================= */}
            {/* METRIC 1: AVERAGE WAITING TIME */}
            {/* ========================================================= */}
            <div className="p-5 rounded-xl shadow-lg bg-gray-700 border-l-4 border-yellow-400 transition-all duration-300 hover:shadow-yellow-500/20">
              <p className="text-sm font-semibold text-gray-400 mb-1">
                Avg Waiting Time (ms)
              </p>
              <h2 className="text-3xl font-extrabold text-yellow-300">
                {(
                  simulation.totals.totalWaiting /
                  Math.max(1, simulation.summary.length)
                ).toFixed(2)}
              </h2>
            </div>

            {/* ========================================================= */}
            {/* METRIC 2: AVERAGE TURNAROUND TIME */}
            {/* ========================================================= */}
            <div className="p-5 rounded-xl shadow-lg bg-gray-700 border-l-4 border-sky-400 transition-all duration-300 hover:shadow-sky-500/20">
              <p className="text-sm font-semibold text-gray-400 mb-1">
                Avg Turnaround Time (ms)
              </p>
              <h2 className="text-3xl font-extrabold text-sky-300">
                {(
                  simulation.totals.totalTurnaround /
                  Math.max(1, simulation.summary.length)
                ).toFixed(2)}
              </h2>
            </div>


            {/* METRIC 3: CPU UTILIZATION */}

            <div className="p-5 rounded-xl shadow-lg bg-gray-700 border-l-4 border-green-500 transition-all duration-300 hover:shadow-green-500/20">
              <p className="text-sm font-semibold text-gray-400 mb-1">
                CPU Utilization
              </p>
              <h2 className="text-3xl font-extrabold text-green-400">
                {simulation.totalTime
                  ? (
                      (simulation.busyTime / simulation.totalTime) *
                      100
                    ).toFixed(2)
                  : "0.00"}
                <span className="text-xl">%</span>
              </h2>
            </div>
          </div>
        </div>
        
      </motion.div>
    </motion.div>
  );
}
