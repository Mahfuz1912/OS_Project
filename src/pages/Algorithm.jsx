import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Algorithm = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState("FCFS");

  const algorithms = {
    FCFS: {
      name: "FCFS (First Come First Serve)",
      fullName: "First Come First Serve",
      description:
        "The simplest CPU scheduling algorithm that processes tasks in the exact order they arrive in the ready queue.",
      working: [
        "Processes are executed in the order of their arrival time",
        "Non-preemptive - once a process starts, it runs to completion",
        "Uses a simple FIFO (First-In-First-Out) queue structure",
        "No priority system - all processes are treated equally",
      ],
      characteristics: [
        "Simple and easy to implement",
        "No starvation - every process gets executed",
        "Poor performance for short processes waiting behind long ones",
        "Not suitable for time-sharing systems",
        "Convoy effect - short processes wait behind long processes",
      ],
      advantages: [
        "Minimal overhead - very simple implementation",
        "Fairness - processes served in arrival order",
        "No starvation - guaranteed execution for all processes",
        "Predictable - easy to determine execution order",
      ],
      disadvantages: [
        "Poor average waiting time",
        "Not optimal for minimizing waiting time",
        "Convoy effect degrades performance",
        "Not responsive for interactive systems",
      ],
      formula: "Waiting Time = Start Time - Arrival Time",
      complexity: "Time: O(n), Space: O(n)",
      color: "from-orange-500 to-red-500",
    },
    SJF: {
      name: "SJF (Shortest Job First)",
      fullName: "Shortest Job First - Non-preemptive",
      description:
        "Selects the process with the smallest burst time from the ready queue. Also known as Shortest Job Next.",
      working: [
        "CPU is allocated to the process with the smallest burst time",
        "Non-preemptive version - runs selected process to completion",
        "Preemptive version is called SRTF (Shortest Remaining Time First)",
        "Requires knowledge of next CPU burst time",
      ],
      characteristics: [
        "Minimizes average waiting time",
        "Optimal for minimizing average waiting time",
        "Can cause starvation for long processes",
        "Difficult to implement in practice",
        "Requires estimation of burst times",
      ],
      advantages: [
        "Optimal for minimizing average waiting time",
        "Maximum throughput",
        "Efficient for batch systems",
        "Better than FCFS in most cases",
      ],
      disadvantages: [
        "Starvation of long processes",
        "Cannot implement in interactive systems",
        "Need to know/predict burst times",
        "Not suitable for time-sharing systems",
      ],

      formula: "Optimal for minimizing average waiting time",
      complexity: "Time: O(n log n), Space: O(n)",
      color: "from-green-500 to-emerald-500",
    },
    SRTF: {
      name: "SRTF (Shortest Remaining Time First)",
      fullName: "Shortest Remaining Time First",
      description:
        "Preemptive version of SJF where the process with the smallest remaining burst time is executed first.",
      working: [
        "Always executes the process with shortest remaining time",
        "Preemptive - can interrupt currently running process",
        "If new process arrives with shorter burst time, context switch occurs",
        "Continuously monitors remaining burst times",
      ],
      characteristics: [
        "Preemptive scheduling algorithm",
        "Better response time than SJF",
        "More context switches than non-preemptive algorithms",
        "Complex implementation",
        "Minimum average waiting time among all algorithms",
      ],
      advantages: [
        "Minimum average waiting time",
        "Better response time for short processes",
        "Efficient for interactive systems",
        "Flexible and responsive",
      ],
      disadvantages: [
        "High overhead due to frequent context switches",
        "Complex implementation",
        "Starvation for long processes",
        "Difficult to predict remaining time accurately",
      ],

      formula: "Context switch when shorter process arrives",
      complexity: "Time: O(n²), Space: O(n)",
      color: "from-blue-500 to-cyan-500",
    },
    RR: {
      name: "RR (Round Robin)",
      fullName: "Round Robin Scheduling",
      description:
        "Preemptive scheduling where each process gets a fixed time unit (time quantum) in cyclic order.",
      working: [
        "Each process gets a small unit of CPU time (time quantum)",
        "After time quantum expires, process is preempted and moved to queue end",
        "Processes are executed in circular fashion",
        "If process completes before quantum, it releases CPU voluntarily",
      ],
      characteristics: [
        "Preemptive and fair scheduling",
        "No starvation - every process gets regular CPU time",
        "Performance depends on time quantum size",
        "Good for time-sharing systems",
        "Common in interactive systems",
      ],
      advantages: [
        "Fair allocation of CPU time",
        "No starvation - every process executes",
        "Good for interactive systems",
        "Simple to implement",
        "Responsive",
      ],
      disadvantages: [
        "High context switching overhead with small quantum",
        "Poor performance with inappropriate quantum size",
        "Throughput depends on quantum size",
        "Not optimal for minimizing waiting time",
      ],

      formula: "Time Quantum = Fixed time slice per process",
      complexity: "Time: O(n), Space: O(n)",
      color: "from-purple-500 to-pink-500",
    },
  };

  const currentAlgo = algorithms[activeAlgorithm];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            CPU Scheduling Algorithms
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore different CPU scheduling algorithms used in operating
            systems to manage process execution efficiently. Understand their
            working, advantages, and trade-offs.
          </p>
        </motion.div>

        {/* Algorithm Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(algorithms).map((algoKey) => (
            <motion.button
              key={algoKey}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveAlgorithm(algoKey)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeAlgorithm === algoKey
                  ? `bg-gradient-to-r ${algorithms[algoKey].color} text-white shadow-lg`
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {algorithms[algoKey].name}
            </motion.button>
          ))}
        </div>

        {/* Algorithm Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlgorithm}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700"
          >
            {/* Algorithm Header */}
            <div
              className={`bg-gradient-to-r ${currentAlgo.color} rounded-xl p-6 mb-8 text-white`}
            >
              <h2 className="text-3xl font-bold mb-2">
                {currentAlgo.fullName}
              </h2>
              <p className="text-lg opacity-90">{currentAlgo.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <span className="bg-black/30 px-3 py-1 rounded-full">
                  Complexity: {currentAlgo.complexity}
                </span>
                <span className="bg-black/30 px-3 py-1 rounded-full">
                  {currentAlgo.formula}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* How It Works */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                    <span>⚙️</span> How It Works
                  </h3>
                  <ul className="space-y-2">
                    {currentAlgo.working.map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="text-cyan-400 mt-1">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Characteristics */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
                    <span>📋</span> Key Characteristics
                  </h3>
                  <ul className="space-y-2">
                    {currentAlgo.characteristics.map((char, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="text-green-400 mt-1">•</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Advantages & Disadvantages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
                    <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
                      <span>✅</span> Advantages
                    </h3>
                    <ul className="space-y-2">
                      {currentAlgo.advantages.map((adv, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="text-green-400 mt-1">✓</span>
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                    <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center gap-2">
                      <span>❌</span> Disadvantages
                    </h3>
                    <ul className="space-y-2">
                      {currentAlgo.disadvantages.map((disadv, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="text-red-400 mt-1">✗</span>
                          {disadv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <Link
                to="/simulator"
                state={{ algorithm: activeAlgorithm }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <span>🚀</span>
                Try {currentAlgo.name} in Simulator
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Algorithm;
