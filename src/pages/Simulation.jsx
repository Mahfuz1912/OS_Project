import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Algorithm simulation functions (same as before)
const simulateFCFS = (processes) => {
  let currentTime = 0;
  const gantt = [];
  const summary = [];
  let totalWaiting = 0;
  let totalTurnaround = 0;
  let busyTime = 0;

  const sortedProcesses = [...processes].sort((a, b) => a.arrival - b.arrival);

  sortedProcesses.forEach((process) => {
    if (currentTime < process.arrival) {
      currentTime = process.arrival;
    }

    const start = currentTime;
    const end = currentTime + process.burst;
    const waiting = start - process.arrival;
    const turnaround = end - process.arrival;

    gantt.push({
      name: process.name,
      start,
      end,
      color: process.color,
    });

    summary.push({
      id: process.id,
      name: process.name,
      arrival: process.arrival,
      burst: process.burst,
      waiting,
      turnaround,
      color: process.color,
    });

    totalWaiting += waiting;
    totalTurnaround += turnaround;
    busyTime += process.burst;
    currentTime = end;
  });

  return {
    gantt,
    summary,
    totalTime: currentTime,
    totals: { totalWaiting, totalTurnaround },
    busyTime,
  };
};

const simulateSJF = (processes) => {
  let currentTime = 0;
  const gantt = [];
  const summary = [];
  let totalWaiting = 0;
  let totalTurnaround = 0;
  let busyTime = 0;
  const completed = new Set();
  const arrived = [];

  while (completed.size < processes.length) {
    processes.forEach((p) => {
      if (
        p.arrival <= currentTime &&
        !completed.has(p.id) &&
        !arrived.find((ap) => ap.id === p.id)
      ) {
        arrived.push(p);
      }
    });

    if (arrived.length === 0) {
      currentTime++;
      continue;
    }

    arrived.sort((a, b) => a.burst - b.burst);
    const process = arrived.shift();

    const start = currentTime;
    const end = currentTime + process.burst;
    const waiting = start - process.arrival;
    const turnaround = end - process.arrival;

    gantt.push({
      name: process.name,
      start,
      end,
      color: process.color,
    });

    summary.push({
      id: process.id,
      name: process.name,
      arrival: process.arrival,
      burst: process.burst,
      waiting,
      turnaround,
      color: process.color,
    });

    totalWaiting += waiting;
    totalTurnaround += turnaround;
    busyTime += process.burst;
    currentTime = end;
    completed.add(process.id);
  }

  return {
    gantt,
    summary,
    totalTime: currentTime,
    totals: { totalWaiting, totalTurnaround },
    busyTime,
  };
};

const simulateSRTF = (processes) => {
  let currentTime = 0;
  const gantt = [];
  const summary = [];
  let totalWaiting = 0;
  let totalTurnaround = 0;
  let busyTime = 0;

  const remainingTime = {};
  const arrivalTime = {};
  processes.forEach((p) => {
    remainingTime[p.id] = p.burst;
    arrivalTime[p.id] = p.arrival;
  });

  const completed = new Set();
  let lastProcess = null;

  while (completed.size < processes.length) {
    const available = processes.filter(
      (p) => p.arrival <= currentTime && remainingTime[p.id] > 0
    );

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    available.sort((a, b) => remainingTime[a.id] - remainingTime[b.id]);
    const process = available[0];

    if (!lastProcess || lastProcess.id !== process.id) {
      if (lastProcess && remainingTime[lastProcess.id] > 0) {
        gantt[gantt.length - 1].end = currentTime;
      }
      gantt.push({
        name: process.name,
        start: currentTime,
        end: currentTime + 1,
        color: process.color,
      });
      lastProcess = process;
    } else {
      gantt[gantt.length - 1].end = currentTime + 1;
    }

    remainingTime[process.id]--;
    busyTime++;

    if (remainingTime[process.id] === 0) {
      completed.add(process.id);
      const turnaround = currentTime + 1 - arrivalTime[process.id];
      const waiting = turnaround - process.burst;

      summary.push({
        id: process.id,
        name: process.name,
        arrival: process.arrival,
        burst: process.burst,
        waiting,
        turnaround,
        color: process.color,
      });

      totalWaiting += waiting;
      totalTurnaround += turnaround;
    }

    currentTime++;
  }

  return {
    gantt,
    summary,
    totalTime: currentTime,
    totals: { totalWaiting, totalTurnaround },
    busyTime,
  };
};

const simulateRR = (processes, quantum) => {
  let currentTime = 0;
  const gantt = [];
  const summary = [];
  let totalWaiting = 0;
  let totalTurnaround = 0;
  let busyTime = 0;

  const remainingTime = {};
  const arrivalTime = {};
  processes.forEach((p) => {
    remainingTime[p.id] = p.burst;
    arrivalTime[p.id] = p.arrival;
  });

  const queue = [];
  const completed = new Set();

  processes
    .filter((p) => p.arrival <= currentTime)
    .forEach((p) => queue.push(p));

  while (completed.size < processes.length) {
    if (queue.length === 0) {
      currentTime++;
      processes
        .filter(
          (p) =>
            p.arrival === currentTime &&
            !completed.has(p.id) &&
            !queue.includes(p)
        )
        .forEach((p) => queue.push(p));
      continue;
    }

    const process = queue.shift();
    const executionTime = Math.min(quantum, remainingTime[process.id]);

    gantt.push({
      name: process.name,
      start: currentTime,
      end: currentTime + executionTime,
      color: process.color,
    });

    remainingTime[process.id] -= executionTime;
    busyTime += executionTime;
    currentTime += executionTime;

    processes
      .filter(
        (p) =>
          p.arrival > currentTime - executionTime &&
          p.arrival <= currentTime &&
          !completed.has(p.id) &&
          !queue.includes(p) &&
          p.id !== process.id
      )
      .forEach((p) => queue.push(p));

    if (remainingTime[process.id] > 0) {
      queue.push(process);
    } else {
      completed.add(process.id);
      const turnaround = currentTime - arrivalTime[process.id];
      const waiting = turnaround - process.burst;

      summary.push({
        id: process.id,
        name: process.name,
        arrival: process.arrival,
        burst: process.burst,
        waiting,
        turnaround,
        color: process.color,
      });

      totalWaiting += waiting;
      totalTurnaround += turnaround;
    }
  }

  return {
    gantt,
    summary,
    totalTime: currentTime,
    totals: { totalWaiting, totalTurnaround },
    busyTime,
  };
};

// Fixed predefined processes - CANNOT BE MODIFIED OR DELETED
const FIXED_PROCESSES = [
  {
    id: "fixed-1",
    name: "P1",
    arrival: 0,
    burst: 5,
    color: "#f97316",
    fixed: true,
  },
  {
    id: "fixed-2",
    name: "P2",
    arrival: 2,
    burst: 3,
    color: "#60a5fa",
    fixed: true,
  },
  {
    id: "fixed-3",
    name: "P3",
    arrival: 4,
    burst: 2,
    color: "#86efac",
    fixed: true,
  },
  {
    id: "fixed-4",
    name: "P4",
    arrival: 6,
    burst: 4,
    color: "#d946ef",
    fixed: true,
  },
  {
    id: "fixed-5",
    name: "P5",
    arrival: 8,
    burst: 1,
    color: "#f59e0b",
    fixed: true,
  },
];

const Simulation = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialAlgorithm =
    (location.state && location.state.algorithm) ||
    urlParams.get("algo") ||
    "FCFS";
  const [algorithm, setAlgorithm] = useState(initialAlgorithm);
  const [quantum, setQuantum] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);

  // customProcesses may be passed via location.state or persisted in localStorage.
  // Fallback to empty array to avoid ReferenceError.
  const customProcesses =
    (location.state && location.state.customProcesses) ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem("customProcesses") || "[]");
      } catch {
        return [];
      }
    })();

  // Combine fixed and custom processes for simulation
  const allProcesses = useMemo(() => {
    return [...FIXED_PROCESSES, ...customProcesses];
  }, [customProcesses]);

  const algorithmInfo = {
    FCFS: {
      name: "First Come First Serve",
      description: "Processes are executed in order of arrival",
      complexity: "O(n)",
      bestFor: "Batch systems",
    },
    SJF: {
      name: "Shortest Job First",
      description: "Process with smallest burst time executes first",
      complexity: "O(n log n)",
      bestFor: "Batch processing",
    },
    SRTF: {
      name: "Shortest Remaining Time First",
      description: "Preemptive version of SJF",
      complexity: "O(n²)",
      bestFor: "Interactive systems",
    },
    RR: {
      name: "Round Robin",
      description: "Fixed time quantum for each process",
      complexity: "O(n)",
      bestFor: "Time-sharing systems",
    },
  };

  const runSimulation = async () => {
    if (allProcesses.length === 0) {
      toast.error("No processes available for simulation");
      return;
    }

    setIsSimulating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSimulating(false);

    toast.success(`${algorithmInfo[algorithm].name} simulation completed`);
  };

  // Simulation computation using all processes
  const simulation = useMemo(() => {
    if (allProcesses.length === 0) {
      return { gantt: [], summary: [], totalTime: 0, totals: {}, busyTime: 0 };
    }

    switch (algorithm) {
      case "FCFS":
        return simulateFCFS(allProcesses);
      case "SJF":
        return simulateSJF(allProcesses);
      case "SRTF":
        return simulateSRTF(allProcesses);
      case "RR":
        return simulateRR(allProcesses, quantum);
      default:
        return simulateFCFS(allProcesses);
    }
  }, [allProcesses, algorithm, quantum]);

  const avgWaitingTime =
    simulation.summary.length > 0
      ? (simulation.totals.totalWaiting / simulation.summary.length).toFixed(2)
      : "0.00";

  const avgTurnaroundTime =
    simulation.summary.length > 0
      ? (simulation.totals.totalTurnaround / simulation.summary.length).toFixed(
          2
        )
      : "0.00";

  const cpuUtilization =
    simulation.totalTime > 0
      ? ((simulation.busyTime / simulation.totalTime) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="container mx-auto p-6">
      {/* page background improved */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6">
        <div className=" gap-6">
          {/* Sidebar: Algorithm + Process Queue (side-by-side on lg) */}
          <aside className="lg:col-span-3 order-1">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Algorithm card */}
              <div className="flex-1 bg-gray-800/60 rounded-2xl p-4 border border-gray-700 shadow-md">
                {/* Place your existing Algorithm selection JSX here */}
                <h2 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                  <span>⚙️</span> Algorithm
                </h2>

                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="select select-bordered w-full bg-gray-700 border-gray-600 text-white mb-4"
                >
                  <option value="FCFS">FCFS (First Come First Serve)</option>
                  <option value="SJF">SJF (Shortest Job First)</option>
                  <option value="SRTF">
                    SRTF (Shortest Remaining Time First)
                  </option>
                  <option value="RR">Round Robin</option>
                </select>

                <AnimatePresence>
                  {algorithm === "RR" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        ⏱️ Time Quantum
                      </label>
                      <input
                        type="number"
                        value={quantum}
                        onChange={(e) => setQuantum(Number(e.target.value))}
                        min="1"
                        className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-cyan-400 mb-2">
                    {algorithmInfo[algorithm].name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {algorithmInfo[algorithm].description}
                  </p>
                  <div className="text-xs text-gray-400">
                    <div>Complexity: {algorithmInfo[algorithm].complexity}</div>
                    <div>Best for: {algorithmInfo[algorithm].bestFor}</div>
                  </div>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`btn w-full mt-4 ${
                    isSimulating
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  } text-white border-none`}
                >
                  {isSimulating ? "⏳ Simulating..." : "🚀 Run Simulation"}
                </button>
              </div>

              {/* Process Queue card */}
              <div className="flex-1 bg-gray-800/60 rounded-2xl p-4 border border-gray-700 shadow-md">
                <h3 className="text-sm font-semibold text-gray-200 mb-3">
                  🧾 Process Queue
                </h3>
                <div className="flex flex-col gap-2 max-h-60 overflow-auto">
                  {/* Place your existing Process Queue JSX here */}
                  <div>
                    <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                      <span>📋</span> Process Queue
                      <span className="text-sm text-gray-400 ml-2">
                        (Fixed: {FIXED_PROCESSES.length} | Custom: )
                      </span>
                    </h2>

                    {/* Fixed Processes Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <span>🔒</span> Fixed Processes (Cannot be modified)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {FIXED_PROCESSES.map((process) => (
                          <motion.div
                            key={process.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-cyan-500 relative"
                            style={{ borderLeftColor: process.color }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                style={{ background: process.color }}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold text-sm"
                              >
                                {process.name.slice(0, 2)}
                              </div>
                              <div>
                                <h3 className="font-bold text-white">
                                  {process.name}
                                </h3>
                                <div className="text-xs text-gray-400 font-mono">
                                  AT: {process.arrival}ms | BT: {process.burst}
                                  ms
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                              Fixed
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content: Process Summary + Gantt Chart (clean & nice) */}
          <main className="lg:col-span-9 flex flex-col gap-6 order-2">
            {/* Process Summary card (nice look) */}
            <section className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 shadow-sm">
              <h2 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
                📋 Process Summary
              </h2>
              <div className="overflow-auto">
                {/* Replace with your summary table JSX or keep existing summary rendering */}
                {simulation.summary.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No simulation data
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left p-2 text-cyan-400">
                            Process
                          </th>
                          <th className="text-left p-2 text-cyan-400">Type</th>
                          <th className="text-left p-2 text-cyan-400">
                            Arrival
                          </th>
                          <th className="text-left p-2 text-cyan-400">Burst</th>
                          <th className="text-left p-2 text-cyan-400">
                            Waiting
                          </th>
                          <th className="text-left p-2 text-cyan-400">
                            Turnaround
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {simulation.summary.map((proc) => {
                          const isFixed = FIXED_PROCESSES.some(
                            (p) => p.id === proc.id
                          );
                          return (
                            <tr
                              key={proc.id}
                              className="border-b border-gray-700/50"
                            >
                              <td className="p-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    style={{ background: proc.color }}
                                    className="w-3 h-3 rounded"
                                  ></div>
                                  <span className="font-semibold">
                                    {proc.name}
                                  </span>
                                </div>
                              </td>
                              <td className="p-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    isFixed
                                      ? "bg-cyan-500/20 text-cyan-300"
                                      : "bg-green-500/20 text-green-300"
                                  }`}
                                >
                                  {isFixed ? "Fixed" : "Custom"}
                                </span>
                              </td>
                              <td className="p-2 font-mono">
                                {proc.arrival}ms
                              </td>
                              <td className="p-2 font-mono">{proc.burst}ms</td>
                              <td className="p-2 font-mono">
                                {proc.waiting}ms
                              </td>
                              <td className="p-2 font-mono">
                                {proc.turnaround}ms
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-700/50">
                          <td className="p-2 font-bold">Averages</td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2 font-mono font-bold">
                            {avgWaitingTime}ms
                          </td>
                          <td className="p-2 font-mono font-bold">
                            {avgTurnaroundTime}ms
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* Full-width CPU Gantt Chart */}
            <section className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 shadow-sm">
              <h2 className="text-lg font-bold mb-4 text-indigo-300 flex items-center gap-2">
                ⏱️ CPU Gantt Chart
              </h2>

              {simulation.gantt.length === 0 ? (
                <p className="text-gray-400 text-center p-8 border border-dashed border-gray-700 rounded-lg">
                  No simulation data. Run simulation to see the chart.
                </p>
              ) : (
                <div className="relative">
                  <div className="flex h-14 overflow-x-auto w-full bg-gray-700 rounded-lg shadow-inner">
                    {simulation.gantt.map((g, i) => {
                      const width = simulation.totalTime
                        ? ((g.end - g.start) / simulation.totalTime) * 100
                        : 0;
                      const duration = g.end - g.start;
                      return (
                        <motion.div
                          key={i}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: i * 0.04 }}
                          style={{ width: `${Math.max(width, 1e-6)}%` }}
                          className="origin-left h-full border-r border-gray-800 min-w-[44px]"
                        >
                          <div
                            className="h-full w-full flex items-center justify-center font-semibold text-xs sm:text-sm text-black rounded transition-opacity"
                            style={{ background: g.color }}
                            title={`Process: ${g.name} | ${g.start} → ${g.end} | Dur: ${duration}`}
                          >
                            {duration >= 2 ? (
                              <span className="truncate px-1">{g.name}</span>
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-black/30" />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Time axis */}
                  <div className="relative flex w-full h-8 mt-3 overflow-x-hidden">
                    <div className="absolute top-0 left-0 text-xs font-mono text-gray-400">
                      0
                    </div>
                    {simulation.gantt.map((g, i) => {
                      const pos = simulation.totalTime
                        ? (g.end / simulation.totalTime) * 100
                        : 0;
                      if (pos > 0) {
                        return (
                          <div
                            key={`t-${i}`}
                            className="absolute top-0 flex flex-col items-center"
                            style={{
                              left: `${pos}%`,
                              transform: "translateX(-50%)",
                            }}
                          >
                            <div className="w-px h-2 bg-gray-600 mb-1" />
                            <div className="text-xs font-mono text-gray-400">
                              {g.end}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                    {simulation.totalTime > 0 && (
                      <div className="absolute top-0 right-0 text-xs font-mono text-gray-400">
                        {simulation.totalTime}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default Simulation;
