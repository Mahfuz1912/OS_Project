import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CompareAlgorithm = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(['waitingTime', 'throughput', 'responseTime']);

  const algorithms = {
    FCFS: {
      name: "FCFS",
      fullName: "First Come First Serve",
      type: "Non-preemptive",
      starvation: "No",
      overhead: "Low",
      throughput: "Medium",
      waitingTime: "High",
      responseTime: "High",
      turnaroundTime: "High",
      fairness: "High",
      implementation: "Very Easy",
      bestFor: "Batch Systems",
      worstFor: "Interactive Systems",
      description: "Simple FIFO queue, processes executed in arrival order",
      color: "from-orange-500 to-red-500",
      efficiency: "60%"
    },
    SJF: {
      name: "SJF",
      fullName: "Shortest Job First",
      type: "Non-preemptive",
      starvation: "Yes",
      overhead: "Medium",
      throughput: "High",
      waitingTime: "Low",
      responseTime: "Medium",
      turnaroundTime: "Low",
      fairness: "Low",
      implementation: "Difficult",
      bestFor: "Batch Processing",
      worstFor: "Time-sharing",
      description: "Executes shortest job first, minimizes waiting time",
      color: "from-green-500 to-emerald-500",
      efficiency: "85%"
    },
    SRTF: {
      name: "SRTF",
      fullName: "Shortest Remaining Time First",
      type: "Preemptive",
      starvation: "Yes",
      overhead: "High",
      throughput: "Very High",
      waitingTime: "Very Low",
      responseTime: "Low",
      turnaroundTime: "Very Low",
      fairness: "Low",
      implementation: "Complex",
      bestFor: "Interactive Systems",
      worstFor: "Batch Systems",
      description: "Preemptive version of SJF, shortest remaining time first",
      color: "from-blue-500 to-cyan-500",
      efficiency: "90%"
    },
    RR: {
      name: "RR",
      fullName: "Round Robin",
      type: "Preemptive",
      starvation: "No",
      overhead: "Medium",
      throughput: "Medium",
      waitingTime: "Medium",
      responseTime: "Low",
      turnaroundTime: "Medium",
      fairness: "Very High",
      implementation: "Easy",
      bestFor: "Time-sharing Systems",
      worstFor: "Real-time Systems",
      description: "Fixed time quantum, circular execution",
      color: "from-purple-500 to-pink-500",
      efficiency: "75%"
    }
  };

  const metrics = [
    { id: 'waitingTime', name: 'Waiting Time', description: 'Average time processes wait in ready queue' },
    { id: 'responseTime', name: 'Response Time', description: 'Time from submission to first response' },
    { id: 'turnaroundTime', name: 'Turnaround Time', description: 'Time from submission to completion' },
    { id: 'throughput', name: 'Throughput', description: 'Number of processes completed per time unit' },
    { id: 'overhead', name: 'Overhead', description: 'Context switching and scheduling overhead' },
    { id: 'fairness', name: 'Fairness', description: 'Equal treatment of all processes' },
    { id: 'starvation', name: 'Starvation', description: 'Possibility of indefinite waiting' }
  ];

  const getPerformanceLevel = (value) => {
    const levels = {
      'Very Low': 'bg-green-500',
      'Low': 'bg-green-400',
      'Medium': 'bg-yellow-400',
      'High': 'bg-orange-500',
      'Very High': 'bg-red-500'
    };
    return levels[value] || 'bg-gray-400';
  };

  const getEfficiencyColor = (efficiency) => {
    const eff = parseInt(efficiency);
    if (eff >= 85) return 'text-green-400';
    if (eff >= 70) return 'text-yellow-400';
    if (eff >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const toggleMetric = (metricId) => {
    setSelectedMetrics(prev =>
      prev.includes(metricId)
        ? prev.filter(m => m !== metricId)
        : [...prev, metricId]
    );
  };

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
            Algorithm Comparison
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Compare CPU scheduling algorithms across multiple performance metrics and characteristics to understand their trade-offs.
          </p>
        </motion.div>

        {/* Metrics Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Select Metrics to Compare</h3>
          <div className="flex flex-wrap gap-3">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => toggleMetric(metric.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedMetrics.includes(metric.id)
                    ? 'bg-cyan-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={metric.description}
              >
                {metric.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedMetrics(metrics.map(m => m.id))}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedMetrics([])}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>
        </motion.div>

        {/* Main Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 overflow-x-auto"
        >
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-4 text-cyan-400 font-semibold">Algorithm</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Type</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Efficiency</th>
                
                {/* Dynamic Metrics Headers */}
                {selectedMetrics.map(metricId => {
                  const metric = metrics.find(m => m.id === metricId);
                  return (
                    <th key={metricId} className="text-center p-4 text-cyan-400 font-semibold" title={metric.description}>
                      {metric.name}
                    </th>
                  );
                })}
                
                <th className="text-left p-4 text-cyan-400 font-semibold">Best For</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Implementation</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(algorithms).map((algo, index) => (
                <motion.tr
                  key={algo.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  {/* Algorithm Name */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${algo.color}`}></div>
                      <div>
                        <div className="font-bold text-white">{algo.name}</div>
                        <div className="text-xs text-gray-400">{algo.fullName}</div>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      algo.type === 'Preemptive' 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {algo.type}
                    </span>
                  </td>

                  {/* Efficiency */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${algo.color}`}
                          style={{ width: `${algo.efficiency}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${getEfficiencyColor(algo.efficiency)}`}>
                        {algo.efficiency}
                      </span>
                    </div>
                  </td>

                  {/* Dynamic Metrics */}
                  {selectedMetrics.map(metricId => (
                    <td key={metricId} className="p-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-semibold text-white mb-1">
                          {algo[metricId]}
                        </span>
                        <div className={`w-16 h-2 rounded-full ${getPerformanceLevel(algo[metricId])}`}></div>
                      </div>
                    </td>
                  ))}

                  {/* Best For */}
                  <td className="p-4">
                    <span className="text-sm text-gray-300">{algo.bestFor}</span>
                  </td>

                  {/* Implementation */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      algo.implementation === 'Very Easy' 
                        ? 'bg-green-500/20 text-green-300'
                        : algo.implementation === 'Easy'
                        ? 'bg-blue-500/20 text-blue-300'
                        : algo.implementation === 'Difficult'
                        ? 'bg-orange-500/20 text-orange-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {algo.implementation}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
        >
          {Object.values(algorithms).map((algo, index) => (
            <motion.div
              key={algo.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`bg-gradient-to-br ${algo.color} rounded-2xl p-6 text-white shadow-2xl`}
            >
              <h3 className="text-xl font-bold mb-2">{algo.name}</h3>
              <p className="text-sm opacity-90 mb-4">{algo.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="font-bold">{algo.efficiency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Starvation:</span>
                  <span className={`font-bold ${algo.starvation === 'No' ? 'text-green-300' : 'text-red-300'}`}>
                    {algo.starvation}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Overhead:</span>
                  <span className="font-bold">{algo.overhead}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best For:</span>
                  <span className="font-bold text-right">{algo.bestFor}</span>
                </div>
              </div>

              <Link
                to="/simulator"
                state={{ algorithm: algo.name }}
                className="block w-full mt-4 bg-white/20 hover:bg-white/30 text-white text-center py-2 rounded-lg transition-colors font-semibold"
              >
                Try {algo.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </div>
  );
};

export default CompareAlgorithm;