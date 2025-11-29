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
  const [processes, setProcesses] = useState([]);

  const [name, setName] = useState("");
  const [arrival, setArrival] = useState(0);
  const [burst, setBurst] = useState(1);
  const [color, setColor] = useState("#86efac");
  const [isSimulating, setIsSimulating] = useState(false);
  const [editingProcess, setEditingProcess] = useState(null);

  // Input validation function
  function validateProcess(process) {
    if (process.arrival < 0) return "Arrival time cannot be negative";
    if (process.burst <= 0) return "Burst time must be positive";
    if (!process.name.trim()) return "Process name is required";

    // Check for duplicate names
    const duplicate = processes.find(
      (p) => p.name === process.name.trim() && p.id !== process.id
    );
    if (duplicate) return "Process name must be unique";

    return null;
  }

  // Color generation function
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

  function handleAdd() {
    const processData = {
      name,
      arrival: Number(arrival),
      burst: Number(burst),
      color,
      id: uid(),
    };

    const validationError = validateProcess(processData);
    if (validationError) return toast.error(validationError);

    setProcesses((prev) => [...prev, processData]);

    setName("");
    setArrival(0);
    setBurst(1);

    // Generate new random color for next process
    const usedColors = [...processes.map((p) => p.color), color];
    setColor(getRandomColor(usedColors));

    toast.success("Process added successfully");
  }

  function handleEdit() {
    const processData = {
      ...editingProcess,
      name: name.trim(),
      arrival: Number(arrival),
      burst: Number(burst),
      color,
    };

    const validationError = validateProcess(processData);
    if (validationError) return toast.error(validationError);

    setProcesses((prev) =>
      prev.map((p) => (p.id === editingProcess.id ? processData : p))
    );

    cancelEdit();
    toast.success("Process updated successfully");
  }

  function startEdit(process) {
    setEditingProcess(process);
    setName(process.name);
    setArrival(process.arrival);
    setBurst(process.burst);
    setColor(process.color);
  }

  function cancelEdit() {
    setEditingProcess(null);
    setName("");
    setArrival(0);
    setBurst(1);

    // Generate new random color
    const usedColors = processes.map((p) => p.color);
    setColor(getRandomColor(usedColors));
  }

  function handleDelete(id) {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
    if (editingProcess?.id === id) {
      cancelEdit();
    }
    toast.info("Process removed");
  }

  function handleClear() {
    setProcesses([]);
    cancelEdit();
    toast.warning("All processes removed");
  }

  const simulation = useMemo(() => {
    if (!processes.length)
      return {
        gantt: [],
        summary: [],
        totalTime: 0,
        // provide numeric defaults to avoid NaN when dividing
        totals: { totalWaiting: 0, totalTurnaround: 0 },
        busyTime: 0,
      };
    if (algorithm === "FCFS") return simulateFCFS(processes);
    if (algorithm === "SJF") return simulateSJF(processes);
    if (algorithm === "SRTF") return simulateSRTF(processes);
    return simulateRR(processes, quantum);
  }, [processes, algorithm, quantum]);

  async function runSimulation() {
    if (!processes.length) return toast.error("Add at least one process");

    setIsSimulating(true);
    // Simulate async operation for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSimulating(false);

    toast.success(`${algorithm} simulation completed`);
  }

  function exportProcesses() {
    const data = JSON.stringify(processes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "process-scheduling-data.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Processes exported successfully");
  }

  function importProcesses(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (
          Array.isArray(imported) &&
          imported.every(
            (p) => p.name && p.arrival !== undefined && p.burst !== undefined
          )
        ) {
          setProcesses(imported);
          cancelEdit();
          toast.success("Processes imported successfully");
        } else {
          toast.error("Invalid file format: missing required fields");
        }
      } catch (error) {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = "";
  }

  // Algorithm descriptions
  const algorithmDescriptions = {
    FCFS: "First Come First Serve (FCFS) – A simple, non-preemptive scheduling algorithm where processes are executed in the exact order of arrival. Its main drawback is the Convoy Effect, where a long process delays all shorter ones, increasing overall waiting time.",

    SJF: "Shortest Job First (SJF) – A non-preemptive algorithm that selects the process with the shortest burst (execution) time. It minimizes average waiting time but depends on accurate prediction of burst times, which is difficult in real systems.",

    RR: "Round Robin (RR) – A preemptive scheduling algorithm used in time-sharing systems. Every process receives a fixed Time Quantum (q). If it does not finish within q, it is preempted and moved to the end of the ready queue. RR focuses on fairness and provides good response time.",

    SRTF: "Shortest Remaining Time First (SRTF) – The preemptive version of SJF. The scheduler always picks the process with the shortest remaining execution time. A newly arrived process can interrupt the current one if it has a smaller remaining time. It reduces waiting time and improves responsiveness.",
  };

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
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)",
          }}
          className="bg-gray-900 border border-indigo-700/50 p-6 rounded-2xl shadow-xl transition-all duration-300"
        >
          <h2 className="text-2xl font-extrabold mb-5 text-indigo-400 flex items-center">
            <span className="mr-2 text-3xl">⚙️</span>
            Algorithm Configuration
          </h2>

          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="select select-bordered w-full bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option className="bg-gray-800" value="FCFS">
              FCFS (First Come First Serve)
            </option>
            <option className="bg-gray-800" value="SJF">
              SJF (Shortest Job First) - Non-preemptive
            </option>
            <option className="bg-gray-800" value="SRTF">
              SRTF (Shortest Remaining Time First)
            </option>
            <option className="bg-gray-800" value="RR">
              Round Robin
            </option>
          </select>

          {/* Algorithm Description */}
          <div className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-300">
              {algorithmDescriptions[algorithm]}
            </p>
          </div>

          <AnimatePresence>
            {algorithm === "RR" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden relative"
              >
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
                    className="input input-bordered w-full bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-12"
                  />
                  <span className="absolute right-9 text-indigo-400 text-sm font-mono pointer-events-none">
                    ms
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`btn ${
              isSimulating
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/50 hover:-translate-y-0.5"
            } text-white border-none w-full mt-6 text-lg font-bold transition-all duration-300 transform`}
          >
            {isSimulating ? "⏳ Simulating..." : "✨ Run Simulation"}
          </button>
        </motion.div>

        {/* Add/Edit Process */}
        <motion.div
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)",
          }}
          className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg transition-all duration-300"
        >
          <h2 className="text-xl font-bold mb-5 text-white flex items-center">
            <span className="mr-2 text-indigo-400 text-2xl">
              {editingProcess ? "✏️" : "➕"}
            </span>
            {editingProcess ? "Edit Process" : "Add New Process"}
          </h2>

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

          {/* Color Picker */}
          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-400 block mb-2">
              🎨 Process Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-8 rounded cursor-pointer"
              />
              <div
                style={{ background: color }}
                className="w-10 h-6 rounded border border-gray-600 shadow-inner"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="input input-bordered flex-1 bg-gray-700 text-white border-gray-600 focus:border-indigo-500 text-sm font-mono"
                placeholder="#86efac"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            {editingProcess ? (
              <>
                <button
                  className="btn bg-green-600 hover:bg-green-700 text-white border-none flex-1 font-bold shadow-lg shadow-green-500/30"
                  onClick={handleEdit}
                >
                  💾 Save Changes
                </button>
                <button
                  className="btn btn-outline border-gray-500 text-gray-400 hover:bg-gray-700 hover:border-gray-600"
                  onClick={cancelEdit}
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn bg-green-600 hover:bg-green-700 text-white border-none flex-1 font-bold shadow-lg shadow-green-500/30"
                  onClick={handleAdd}
                >
                  ✅ Add Process
                </button>
                <button
                  className="btn btn-outline border-gray-500 text-gray-400 hover:bg-gray-700 hover:border-gray-600"
                  onClick={() => {
                    setName("");
                    setArrival(0);
                    setBurst(1);
                    const usedColors = processes.map((p) => p.color);
                    setColor(getRandomColor(usedColors));
                  }}
                >
                  🗑️ Reset
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Process List */}
        <motion.div
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)",
          }}
          className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg transition-all duration-300 h-fit"
        >
          <h2 className="text-xl font-bold mb-5 text-white flex items-center">
            <span className="mr-2 text-indigo-400 text-2xl">📋</span>
            Active Process Queue
            <span className="ml-2 text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
              {processes.length}
            </span>
          </h2>

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
                  className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border-l-4 border-gray-600 shadow-md hover:bg-gray-650 transition-colors"
                  style={{ borderLeftColor: p.color }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{ background: p.color, color: "#111" }}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-extrabold shadow-sm"
                    >
                      {p.name.slice(0, 2)}
                    </div>

                    <div>
                      <div className="text-base font-semibold text-white">
                        {p.name}
                        {editingProcess?.id === p.id && (
                          <span className="ml-2 text-xs bg-yellow-500 text-black px-1 rounded">
                            Editing
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        AT:{" "}
                        <span className="text-indigo-300">{p.arrival}ms</span> |
                        BT: <span className="text-red-300">{p.burst}ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      className="btn btn-xs btn-info btn-square bg-blue-600 hover:bg-blue-700 border-none text-white"
                      onClick={() => startEdit(p)}
                      title="Edit process"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-xs btn-error btn-square bg-red-600 hover:bg-red-700 border-none text-white"
                      onClick={() => handleDelete(p.id)}
                      title="Delete process"
                    >
                      🗑️
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Utility Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              className="btn bg-amber-500 hover:bg-amber-600 text-black border-none flex-1 font-semibold shadow-md shadow-amber-500/40"
              onClick={() => {
                const id = uid();
                const arrival = Math.floor(Math.random() * 10);
                const burst = Math.floor(Math.random() * 10) + 1;
                const usedColors = processes.map((p) => p.color);
                const color = getRandomColor(usedColors);

                setProcesses((prev) => [
                  ...prev,
                  { id, name: `P${prev.length + 1}`, arrival, burst, color },
                ]);
              }}
            >
              ⚡ Quick Add Sample
            </button>
            <button
              className="btn btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              onClick={handleClear}
            >
              🗑️ Clear All
            </button>
          </div>

          {/* Import/Export Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-outline border-green-500 text-green-400 hover:bg-green-500 hover:text-white flex-1 text-sm"
              onClick={exportProcesses}
            >
              📤 Export
            </button>
            <label className="btn btn-outline border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white flex-1 text-sm cursor-pointer">
              📥 Import
              <input
                type="file"
                accept=".json"
                onChange={importProcesses}
                className="hidden"
              />
            </label>
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
      {/* Process Segments */}
      <div className="flex h-12 overflow-x-auto w-full bg-gray-700 rounded-lg shadow-inner">
{simulation.gantt.map((g, i) => {
  const duration = g.end - g.start;
  const width = (duration / simulation.totalTime) * 100;
  const finalWidth = Math.max(width, 5); // minimum 5% width

  return (
    <motion.div
      key={i}
      initial={{ width: 0 }}
      animate={{ width: `${finalWidth}%` }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="h-full border-r border-gray-800"
    >
      <div
        className="h-full w-full flex items-center justify-center text-xs sm:text-sm text-white font-bold rounded-lg"
        style={{ background: g.color }}
      >
        <span className="truncate px-1">{g.name}</span>
      </div>
    </motion.div>
  );
})}

      </div>

      {/* Optimized Time Scale */}
      <div className="relative flex w-full h-8 mt-3">
        {/* Start time = 0 */}
        <div className="absolute left-0 text-xs font-mono text-gray-400">0</div>

        {simulation.gantt.map((g, i) => {
          const left = (g.end / simulation.totalTime) * 100;

          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: `${left}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-3 bg-gray-600 mb-1"></div>
              <div className="text-xs font-mono text-gray-400">{g.end}</div>
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>



        {/* ================= Summary Table ================= */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">📋 Summary Table</h3>

          {simulation.summary.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No summary data. Run the simulation to populate the table.
            </p>
          ) : (
            <div className="overflow-x-auto bg-gray-800 p-3 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-300">
                    <th className="px-3 py-2 text-left">Process</th>
                    <th className="px-3 py-2 text-left">Arrival (ms)</th>
                    <th className="px-3 py-2 text-left">Burst (ms)</th>
                    <th className="px-3 py-2 text-left">Waiting (ms)</th>
                    <th className="px-3 py-2 text-left">Turnaround (ms)</th>
                  </tr>
                </thead>
                <tbody>
                  {simulation.summary.map((s) => (
                    <tr
                      key={s.id}
                      className="border-t border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-3 py-2">
                        <div className="inline-flex items-center gap-2">
                          <span
                            style={{ background: s.color }}
                            className="w-4 h-4 rounded-sm inline-block"
                          />
                          <span className="font-semibold text-white">
                            {s.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-mono text-gray-300">
                        {s.arrival}
                      </td>
                      <td className="px-3 py-2 font-mono text-gray-300">
                        {s.burst}
                      </td>
                      <td className="px-3 py-2 font-mono text-gray-300">
                        {s.waiting}
                      </td>
                      <td className="px-3 py-2 font-mono text-gray-300">
                        {s.turnaround}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-600 bg-gray-750">
                    <td className="px-3 py-2 font-bold text-gray-200">
                      Averages
                    </td>
                    <td />
                    <td />
                    <td className="px-3 py-2 font-mono text-gray-300">
                      {(
                        simulation.totals.totalWaiting /
                        Math.max(1, simulation.summary.length)
                      ).toFixed(2)}
                    </td>
                    <td className="px-3 py-2 font-mono text-gray-300">
                      {(
                        simulation.totals.totalTurnaround /
                        Math.max(1, simulation.summary.length)
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* ================= Stats ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4 mt-8 text-green-400 flex items-center">
            <span className="mr-2">📈</span> Simulation Results
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Average Waiting Time */}
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

            {/* Average Turnaround Time */}
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

            {/* CPU Utilization */}
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

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .hover:bg-gray-650:hover {
          background-color: #4b5563;
        }
        .bg-gray-750 {
          background-color: #374151;
        }
      `}</style>
    </motion.div>
  );
}
