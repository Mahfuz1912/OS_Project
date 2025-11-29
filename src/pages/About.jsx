import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "S.A. Mahfuz",
      role: "Full Stack Developer & Project Lead",
      description:
        "Focused on CPU scheduling algorithms, simulation design, and accurate execution flow. Expert in performance-optimized algorithm development and process-level logic engineering.",
      skills: [
        "Algorithm Design",
        "Simulation Logic Engineering",
        "Performance Optimization",
        "React.js",
        "JavaScript",
        "Problem Solving",
        "Framer Motion",
        "Tailwind CSS",
      ],
      contribution: [
        "Implemented Tailwind, and Framer Motion in the project",
        "Developed Round Robin (RR) and First Come First Serve (FCFS) scheduling algorithms",
        "Implemented complete simulation engine with accurate execution flow",
        "Designed logic for waiting time and turnaround time calculations",
        "Processed and prepared algorithm-side Gantt Chart data structure",
        "Handled edge-case management and execution accuracy",
        "Improved overall algorithm performance and logical reliability",
      ],
      image:
        "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/515439059_1296199291929219_8192045324855501956_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyGPZRRrsaTFUOh-qLLX5PASNQRcMANzcBI1BFwwA3N8pnC1AQvRNDUPFwgYvOMds9e9BOj-1LJrXhaZ3uqUhM&_nc_ohc=ZZXJLjlkRvsQ7kNvwEAUjas&_nc_oc=AdkklH0mVL3A-cCnb-FiYX6qkIOLbp-VvlKrDvtqFpfTpEsN768gIXwbqaP_F2gybag&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=vNnRkvgijV4DOrHnH2Q6mA&oh=00_Afi-jUYPF4bstYLxMsi8c01k0i8vRlHvHjlnKaIb1y1LEg&oe=692F9C13",
      education: "BSc in Computer Science & Engineering (CSE)",
      email: "mahfuz22205101912@diu.diu.edu.bd",
      github: "https://github.com/Mahfuz1912",
      linkedin: "https://linkedin.com/in/mahfuz",
      expertise: [
        "Algorithm Development",
        "Simulation Engineering",
        "Execution Flow Logic",
      ],
    },

    {
      name: "Ali Ashraf Emon",
      role: "MERN Stack Developer & Core Programmer",
      description:
        "Specializes in modern UI/UX engineering, frontend logic, and real-time visual representation. Ensures smooth user interaction with responsive layouts and motion-based visualization.",
      skills: [
        "Advanced UI/UX Design",
        "Frontend Architecture & Logic",
        "React.js",
        "JavaScript",
        "Problem Solving",
        "Responsive & Adaptive Layout Design",
        "Algorithm Visualization & Data Rendering",
      ],
      contribution: [
        "Designed UI/UX using React",
        "Implemented all frontend logic and user interaction flow",
        "Developed Shortest Job First (SJF) and Shortest Remaining Time First (SRTF) scheduling algorithms",
        "Handled all execution time calculations and process data presentation",
        "Created dynamic Gantt Chart visuals with real-time animations",
        "Optimized UI performance and enhanced overall user experience",
      ],
      image: "https://i.ibb.co.com/HD7x3VYZ/photo-2025-11-28-23-14-11.jpg",
      education: "BSc in Computer Science & Engineering (CSE)",
      email: "emon@student.diu.edu.bd",
      github: "https://github.com/emon",
      linkedin: "https://linkedin.com/in/emon",
      expertise: [
        "Frontend Development",
        "UI/UX Engineering",
        "Algorithm Visualization",
        "User Experience Design",
      ],
    },
  ];

  const technologies = [
    {
      name: "React.js",
      description:
        "Modern frontend library for building dynamic user interfaces",
      purpose:
        "Component-based architecture for scalable and maintainable code",
      icon: "⚛️",
      features: [
        "Hooks API",
        "Context API",
        "Component Reusability",
        "Virtual DOM",
      ],
    },
    {
      name: "Framer Motion",
      description: "Production-ready motion library for React",
      purpose: "Advanced animations and smooth page transitions",
      icon: "🎬",
      features: [
        "Spring Animations",
        "Layout Animations",
        "Gesture Handling",
        "Orchestration",
      ],
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      purpose: "Consistent design system and responsive layouts",
      icon: "🎨",
      features: [
        "Utility Classes",
        "Responsive Design",
        "Customization",
        "Dark Mode",
      ],
    },
    {
      name: "React Router",
      description: "Declarative routing for single-page applications",
      purpose: "Seamless navigation and route management",
      icon: "🧭",
      features: ["Dynamic Routing", "Nested Routes", "Programmatic Navigation"],
    },
    {
      name: "Algorithm Implementation",
      description: "Custom JavaScript algorithm implementations",
      purpose: "CPU scheduling logic and process simulation",
      icon: "⚡",
      features: [
        "FCFS",
        "SJF",
        "Priority Scheduling",
        "Round Robin",
        "Performance Analysis",
      ],
    },
    {
      name: "State Management",
      description: "React Context and useState for state management",
      purpose: "Efficient data flow and real-time updates",
      icon: "🔄",
      features: [
        "Global State",
        "Real-time Updates",
        "Performance Optimization",
      ],
    },
  ];

  const projectDetails = {
    title: "CPU Scheduling Algorithms Simulator",
    description:
      "An advanced educational platform designed to visualize and simulate CPU scheduling algorithms used in operating systems with real-time execution and comprehensive analysis.",
    purpose:
      "This project bridges theoretical concepts with practical understanding by providing interactive visualizations, performance comparisons, and detailed algorithm explanations.",
    features: [
      "Real-time algorithm simulation with dynamic Gantt charts",
      "Interactive process management with customizable parameters",
      "Comparative performance analysis with detailed metrics",
      "Educational content with step-by-step algorithm explanations",
      "Fully responsive design optimized for all devices",
      "Smooth animations and intuitive user interactions",
    ],
    targetAudience: [
      "Computer Science students learning operating systems concepts",
      "Educators seeking interactive teaching tools for scheduling algorithms",
      "Software developers understanding system performance optimization",
      "Researchers analyzing algorithm behavior and efficiency",
    ],
    technicalHighlights: [
      "Modular algorithm implementations for easy extensibility",
      "Real-time visualization with smooth animations",
      "Comprehensive performance metrics calculation",
      "Scalable architecture supporting multiple algorithm types",
      "Optimized rendering performance for large process sets",
    ],
  };

  const courseInfo = {
    name: "Operating Systems Lab (CSE 324)",
    institution: "Daffodil International University",
    semester: "Fall 2025",
    instructor: "Md. Jahangir Alam",
    department: "Department of Computer Science & Engineering",
    objectives: [
      "Understand fundamental CPU scheduling concepts and their real-world applications",
      "Compare and analyze different scheduling algorithms through interactive simulation",
      "Visualize process execution patterns and scheduling decisions in real-time",
      "Evaluate algorithm performance using comprehensive metrics analysis",
      "Develop practical understanding of operating system internals",
    ],
  };

  const developmentProcess = {
    phases: [
      {
        phase: "Research & Planning",
        activities: [
          "Algorithm study and theoretical analysis",
          "Technology stack selection and architecture design",
          "User experience planning and wireframing",
        ],
      },
      {
        phase: "Core Development",
        activities: [
          "Algorithm implementation and testing",
          "UI component development and integration",
          "State management and data flow design",
        ],
      },
      {
        phase: "Enhancement",
        activities: [
          "Animation and interaction implementation",
          "Performance optimization and testing",
          "Responsive design refinement",
        ],
      },
      {
        phase: "Deployment",
        activities: [
          "Comprehensive testing and bug fixing",
          "Documentation and educational content",
          "Performance benchmarking",
        ],
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skillCategoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            About CPU Scheduler Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            An advanced educational platform for visualizing CPU scheduling
            algorithms, developed as part of the Operating Systems course at
            Daffodil International University.
          </p>
        </motion.div>

        {/* Project Details */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
              Project Overview
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30"
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                🎯 Project Vision
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {projectDetails.description}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {projectDetails.purpose}
              </p>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">
                  Key Features:
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {projectDetails.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">
                  Technical Highlights:
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {projectDetails.technicalHighlights.map(
                    (highlight, index) => (
                      <li key={index}>{highlight}</li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-400">
                🏫 Academic Context
              </h3>
              <div className="space-y-4">
                <div>
                  <strong className="text-cyan-400">Course:</strong>{" "}
                  {courseInfo.name}
                </div>
                <div>
                  <strong className="text-cyan-400">Institution:</strong>{" "}
                  {courseInfo.institution}
                </div>
                <div>
                  <strong className="text-cyan-400">Department:</strong>{" "}
                  {courseInfo.department}
                </div>
                <div>
                  <strong className="text-cyan-400">Semester:</strong>{" "}
                  {courseInfo.semester}
                </div>
                <div>
                  <strong className="text-cyan-400">Instructor:</strong>{" "}
                  {courseInfo.instructor}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">
                  Learning Objectives:
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {courseInfo.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">
                  Target Audience:
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {projectDetails.targetAudience.map((audience, index) => (
                    <li key={index}>{audience}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Development Team */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
              Development Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Meet the talented developers behind CPU Scheduler Pro
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30 group"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Developer Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/50 group-hover:border-cyan-400 transition-colors duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold"
                        style={{ display: "none" }}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                  </div>

                  {/* Developer Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-cyan-400 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {member.description}
                    </p>

                    <div className="space-y-4">
                      {/* Expertise Areas */}
                      <div>
                        <h4 className="font-semibold text-purple-400 mb-2 text-sm">
                          Areas of Expertise:
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {member.expertise.map((expertise, expIndex) => (
                            <span
                              key={expIndex}
                              className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
                            >
                              {expertise}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Contributions */}
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2 text-sm">
                          Key Contributions:
                        </h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {member.contribution.map(
                            (contribution, contribIndex) => (
                              <li
                                key={contribIndex}
                                className="flex items-start gap-2"
                              >
                                <span className="text-green-400 mt-1">•</span>
                                <span>{contribution}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold text-blue-400 mb-2 text-sm">
                          Technical Skills:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h4 className="font-semibold text-cyan-400 mb-1 text-sm">
                          Education:
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {member.education}
                        </p>
                      </div>

                      {/* Contact Links */}
                      <div className="flex justify-center md:justify-start gap-4 pt-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110"
                          title="Email"
                        >
                          📧
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-purple-400 transition-colors duration-300 transform hover:scale-110"
                          title="GitHub"
                        >
                          💻
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                          title="LinkedIn"
                        >
                          🔗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Development Process */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
              Development Process
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {developmentProcess.phases.map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                    <span className="text-2xl">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-green-400">
                    {phase.phase}
                  </h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  {phase.activities.map((activity, activityIndex) => (
                    <li key={activityIndex} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technologies Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-400">
              Technology Stack
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 group hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>
                <p className="text-cyan-400 mb-3 text-sm">{tech.purpose}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-xs border border-purple-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Explore CPU Scheduling?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the power of algorithm visualization and understand how
              different scheduling strategies impact system performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/simulator"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                <span className="text-xl">🚀</span>
                Launch Simulator
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <span className="text-xl">📊</span>
                Compare Algorithms
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
