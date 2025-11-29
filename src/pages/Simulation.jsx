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

// Fixed predefined processes with BRIGHT COLORS
const FIXED_PROCESSES = [
  {
    id: "fixed-1",
    name: "P1",
    arrival: 0,
    burst: 5,
    color: "#FF6B6B", // Bright Red
    fixed: true,
  },
  {
    id: "fixed-2",
    name: "P2",
    arrival: 2,
    burst: 3,
    color: "#4ECDC4", // Bright Teal
    fixed: true,
  },
  {
    id: "fixed-3",
    name: "P3",
    arrival: 4,
    burst: 2,
    color: "#FFD166", // Bright Yellow
    fixed: true,
  },
  {
    id: "fixed-4",
    name: "P4",
    arrival: 6,
    burst: 4,
    color: "#06D6A0", // Bright Green
    fixed: true,
  },
  {
    id: "fixed-5",
    name: "P5",
    arrival: 8,
    burst: 1,
    color: "#118AB2", // Bright Blue
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

  const customProcesses =
    (location.state && location.state.customProcesses) ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem("customProcesses") || "[]");
      } catch {
        return [];
      }
    })();

  const allProcesses = useMemo(() => {
    return [...FIXED_PROCESSES, ...customProcesses];
  }, [customProcesses]);

  const processes = allProcesses;

  const algorithmInfo = {
    FCFS: {
      name: "First Come First Serve",
      description: "Processes are executed in order of arrival",
      complexity: "O(n)",
      bestFor: "Batch systems",
      color: "from-purple-500 to-pink-500",
    },
    SJF: {
      name: "Shortest Job First",
      description: "Process with smallest burst time executes first",
      complexity: "O(n log n)",
      bestFor: "Batch processing",
      color: "from-green-500 to-teal-500",
    },
    SRTF: {
      name: "Shortest Remaining Time First",
      description: "Preemptive version of SJF",
      complexity: "O(n²)",
      bestFor: "Interactive systems",
      color: "from-orange-500 to-red-500",
    },
    RR: {
      name: "Round Robin",
      description: "Fixed time quantum for each process",
      complexity: "O(n)",
      bestFor: "Time-sharing systems",
      color: "from-blue-500 to-cyan-500",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            CPU Scheduling Simulator
          </h1>
          <p className="text-gray-300 text-lg">
            Visualize and analyze process scheduling algorithms in real-time
          </p>
        </motion.header>

        <div className="">
          {/* Sidebar */}
          <aside className="grid grid-cols-12 gap-6 mb-8">
            {/* Algorithm Card */}
            <div className="grid col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300">
                      Algorithm
                    </h3>
                    <p className="text-sm text-gray-400">
                      Select scheduling method
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full bg-gray-700/80 border border-cyan-500/30 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  >
                    <option value="FCFS">First Come First Serve (FCFS)</option>
                    <option value="SJF">Shortest Job First (SJF)</option>
                    <option value="SRTF">
                      Shortest Remaining Time First (SRTF)
                    </option>
                    <option value="RR">Round Robin (RR)</option>
                  </select>

                  {algorithm === "RR" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-300">
                        ⏱️ Time Quantum
                      </label>
                      <input
                        type="number"
                        value={quantum}
                        onChange={(e) => setQuantum(Number(e.target.value))}
                        min={1}
                        className="w-full bg-gray-700/80 border border-cyan-500/30 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className={`w-full rounded-xl px-6 py-3 font-bold text-white transition-all ${
                      isSimulating
                        ? "bg-gray-600 cursor-not-allowed"
                        : `bg-gradient-to-r ${
                            algorithmInfo[algorithm]?.color ||
                            "from-cyan-500 to-blue-500"
                          } hover:shadow-lg`
                    }`}
                  >
                    {isSimulating ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Simulating...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        🚀 Run Simulation
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Process Queue Card */}
            <div className="col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <span className="text-2xl">🧾</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-purple-300">
                        Process Queue
                      </h3>
                      <p className="text-sm text-gray-400">
                        {processes.length} processes <span className="font-bold text-amber-300">Fixed </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-3 custom-scrollbar">
                  {processes && processes.length > 0 ? (
                    processes.map((process, index) => (
                      <motion.div
                        key={process.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group relative p-4 rounded-xl border-2 transition-all ${
                          process.fixed
                            ? "bg-gradient-to-r from-gray-800 to-gray-900 border-amber-500/30 hover:border-amber-500/60"
                            : "bg-gray-700/50 border-cyan-500/20 hover:border-cyan-500/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              style={{ background: process.color }}
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-black font-bold text-lg shadow-lg transition-transform group-hover:scale-110"
                            >
                              {process.name}
                            </div>
                            <div>
                              <div className="font-bold text-white">
                                {process.name}
                              </div>
                              <div className="text-sm text-gray-300">
                                Arrival:{" "}
                                <span className="font-mono">
                                  {process.arrival}
                                </span>{" "}
                                • Burst:{" "}
                                <span className="font-mono">
                                  {process.burst}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              process.fixed
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            }`}
                          >
                            {process.fixed ? (
                              <span className="flex items-center gap-1">
                                ⭐ Fixed
                              </span>
                            ) : (
                              "Custom"
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center p-6 border-2 border-dashed border-gray-600 rounded-xl text-gray-400">
                      <div className="text-3xl mb-2">📝</div>
                      <p>No processes available</p>
                      <p className="text-sm mt-1">
                        Add custom processes or use fixed ones
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="gap-6 space-y-8">
            {/* Process Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-green-300">
                      Process Summary
                    </h2>
                    <p className="text-gray-400">Detailed execution analysis</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Total CPU Time</div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {simulation?.totalTime ?? 0}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-700">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700/50 text-gray-300 uppercase text-sm">
                      <th className="px-6 py-4 text-left font-semibold">
                        Process
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Arrival
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Burst
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Waiting
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Turnaround
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {simulation?.summary && simulation.summary.length > 0 ? (
                      simulation.summary.map((s, index) => (
                        <motion.tr
                          key={s.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                style={{ background: s.color }}
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold shadow-lg"
                              >
                                {s.name}
                              </div>
                              <span className="font-semibold text-white">
                                {s.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-mono text-gray-200 bg-gray-700/50 px-3 py-1 rounded-lg">
                              {s.arrival}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-mono text-gray-200 bg-gray-700/50 px-3 py-1 rounded-lg">
                              {s.burst}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`font-mono px-3 py-1 rounded-lg ${
                                s.waiting > 5
                                  ? "bg-red-500/20 text-red-300"
                                  : "bg-blue-500/20 text-blue-300"
                              }`}
                            >
                              {s.waiting}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`font-mono px-3 py-1 rounded-lg ${
                                s.turnaround > 8
                                  ? "bg-orange-500/20 text-orange-300"
                                  : "bg-green-500/20 text-green-300"
                              }`}
                            >
                              {s.turnaround}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-12 text-center text-gray-400"
                        >
                          <div className="text-4xl mb-2">📈</div>
                          <p>No summary data available</p>
                          <p className="text-sm mt-1">
                            Run simulation to generate results
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* CPU Gantt Chart */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 shadow-2xl"
>
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-500/20 rounded-lg">
        <span className="text-xl">⏱️</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-blue-300">CPU Gantt Chart</h2>
        <p className="text-sm text-gray-400">Process execution timeline</p>
      </div>
    </div>
    
    {/* Stats */}
    {simulation.gantt.length > 0 && (
      <div className="flex gap-4 text-sm">
        <div className="text-right">
          <div className="text-gray-400">Total Time</div>
          <div className="font-mono text-white font-bold">{simulation.totalTime}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-400">Processes</div>
          <div className="font-mono text-white font-bold">{simulation.gantt.length}</div>
        </div>
      </div>
    )}
  </div>

  {/* Gantt Chart */}
  {simulation.gantt.length === 0 ? (
    <div className="text-center p-8 border-2 border-dashed border-gray-600 rounded-xl">
      <div className="text-4xl mb-3">📊</div>
      <p className="text-gray-400 mb-1">No simulation data available</p>
      <p className="text-sm text-gray-500">Run simulation to generate the Gantt chart</p>
    </div>
  ) : (
    <div className="space-y-4">
      {/* Process Labels Legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from(new Set(simulation.gantt.map(g => g.name))).map(processName => {
          const process = simulation.gantt.find(g => g.name === processName);
          return (
            <div key={processName} className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-lg">
              <div 
                className="w-3 h-3 rounded" 
                style={{ background: process.color }}
              />
              <span className="text-sm font-medium text-white">{processName}</span>
            </div>
          );
        })}
      </div>

      {/* Gantt Bars */}
<div className="relative bg-gray-900/50 rounded-xl p-4 border border-gray-700">

  {/* Gantt Bars (Simple Clean Version) */}
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

  {/* Clean Time Scale */}
  <div className="relative flex w-full h-8 mt-3">

    {/* Start time = 0 */}
    <div className="absolute left-0 text-xs font-mono text-gray-400">0</div>

    {simulation.gantt.map((g, i) => {
      const left = (g.end / simulation.totalTime) * 100;

      return (
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{
            left: `${left}%`,
            transform: "translateX(-50%)"
          }}
        >
          <div className="w-px h-3 bg-gray-600 mb-1"></div>
          <div className="text-xs font-mono text-gray-400">{g.end}</div>
        </div>
      );
    })}
  </div>
</div>



      {/* Performance Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Avg Wait</div>
          <div className="text-sm font-bold text-white font-mono">{avgWaitingTime}</div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Avg Turnaround</div>
          <div className="text-sm font-bold text-white font-mono">{avgTurnaroundTime}</div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">CPU Usage</div>
          <div className="text-sm font-bold text-green-400 font-mono">{cpuUtilization}%</div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Context Switches</div>
          <div className="text-sm font-bold text-white font-mono">
            {Math.max(0, simulation.gantt.length - 1)}
          </div>
        </div>
      </div>
    </div>
  )}
</motion.section>
          </main>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastClassName="bg-gray-800 border border-cyan-500/20"
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Simulation;
