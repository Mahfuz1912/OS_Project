import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import developer images (make sure to add these images to your project)
// import mahfuzImage from '../assets/mahfuz.jpg';
// import emonImage from '../assets/emon.jpg';

const About = () => {
  const teamMembers = [
    {
      name: "S.A. Mahfuz",
      role: "Full Stack Developer & Project Lead",
      description: "Expert in algorithm design and system architecture with strong problem-solving skills. Passionate about creating efficient and scalable solutions.",
      skills: ["React", "Node.js", "Algorithm Design", "System Architecture", "Performance Optimization"],
      contribution: "Core algorithm implementation, simulation logic, performance optimization, and project architecture",
      image: "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/515439059_1296199291929219_8192045324855501956_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyGPZRRrsaTFUOh-qLLX5PASNQRcMANzcBI1BFwwA3N8pnC1AQvRNDUPFwgYvOMds9e9BOj-1LJrXhaZ3uqUhM&_nc_ohc=ZZXJLjlkRvsQ7kNvwEAUjas&_nc_oc=AdkklH0mVL3A-cCnb-FiYX6qkIOLbp-VvlKrDvtqFpfTpEsN768gIXwbqaP_F2gybag&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=vNnRkvgijV4DOrHnH2Q6mA&oh=00_Afi-jUYPF4bstYLxMsi8c01k0i8vRlHvHjlnKaIb1y1LEg&oe=692F9C13", // Replace with actual image path: mahfuzImage
      education: "BSc in Computer Science & Engineering",
      email: "mahfuz22205101912@diu.diu.edu.bd",
      github: "https://github.com/Mahfuz1912",
      linkedin: "https://linkedin.com/in/mahfuz"
    },
    {
      name: "Ali Ashraf Emon",
      role: "Full Stack Developer",
      description: "Creative designer with expertise in user experience and modern web technologies. Focused on creating intuitive and visually appealing interfaces.",
      skills: ["UI/UX Design", "React", "Framer Motion", "Tailwind CSS", "Figma"],
      contribution: "User interface design, animations, responsive layout, user experience optimization, and visual design",
      image: "https://i.ibb.co.com/HD7x3VYZ/photo-2025-11-28-23-14-11.jpg", // Replace with actual image path: emonImage
      education: "BSc in Computer Science & Engineering",
      email: "emon@student.diu.edu.bd",
      github: "https://github.com/emon",
      linkedin: "https://linkedin.com/in/emon"
    }
  ];

  const technologies = [
    {
      name: "React",
      description: "Frontend library for building user interfaces",
      purpose: "Component-based UI development and state management",
      icon: "⚛️"
    },
    {
      name: "Framer Motion",
      description: "Production-ready motion library for React",
      purpose: "Smooth animations and page transitions",
      icon: "🎬"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      purpose: "Rapid UI development and responsive design",
      icon: "🎨"
    },
    {
      name: "React Router",
      description: "Declarative routing for React applications",
      purpose: "Single-page application navigation",
      icon: "🧭"
    },
    {
      name: "React Toastify",
      description: "Toast notifications for React",
      purpose: "User feedback and notifications",
      icon: "💬"
    }
  ];

  const projectDetails = {
    title: "CPU Scheduling Algorithms Simulator",
    description: "An interactive educational platform designed to visualize and simulate CPU scheduling algorithms used in operating systems.",
    purpose: "This project aims to help students and developers understand how different CPU scheduling algorithms work by providing real-time visualizations and comparative analysis.",
    features: [
      "Real-time algorithm simulation with visual Gantt charts",
      "Interactive process management system",
      "Performance metrics and comparative analysis",
      "Educational content with detailed algorithm explanations",
      "Responsive design for all devices"
    ],
    targetAudience: [
      "Computer Science students learning operating systems",
      "Educators teaching CPU scheduling concepts",
      "Developers understanding system performance",
      "Anyone interested in algorithm visualization"
    ]
  };

  const courseInfo = {
    name: "Operating Systems (CSE 324)",
    institution: "Daffodil International University",
    semester: "Fall 2025",
    instructor: "Md. Jahangir Alam",
    department: "Department of Computer Science & Engineering",
    objectives: [
      "Understand fundamental CPU scheduling concepts",
      "Compare and analyze different scheduling algorithms",
      "Visualize process execution patterns in real-time",
      "Evaluate algorithm performance through metrics"
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
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
            An advanced educational platform for visualizing CPU scheduling algorithms, 
            developed as part of the Operating Systems course at Daffodil International University.
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
            <motion.div variants={itemVariants} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">🎯 Project Vision</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {projectDetails.description}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {projectDetails.purpose}
              </p>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Key Features:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {projectDetails.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">🏫 Academic Context</h3>
              <div className="space-y-4">
                <div>
                  <strong className="text-cyan-400">Course:</strong> {courseInfo.name}
                </div>
                <div>
                  <strong className="text-cyan-400">Institution:</strong> {courseInfo.institution}
                </div>
                <div>
                  <strong className="text-cyan-400">Department:</strong> {courseInfo.department}
                </div>
                <div>
                  <strong className="text-cyan-400">Semester:</strong> {courseInfo.semester}
                </div>
                <div>
                  <strong className="text-cyan-400">Instructor:</strong> {courseInfo.instructor}
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Target Audience:</h4>
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
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold"
                        style={{ display: 'none' }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>

                  {/* Developer Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-cyan-400 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {member.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2 text-sm">Education:</h4>
                        <p className="text-gray-300 text-sm">{member.education}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-400 mb-2 text-sm">Key Contributions:</h4>
                        <p className="text-gray-300 text-sm">{member.contribution}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-400 mb-2 text-sm">Skills & Technologies:</h4>
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

                      {/* Contact Links */}
                      <div className="flex justify-center md:justify-start gap-4 pt-2">
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                          title="Email"
                        >
                          📧
                        </a>
                        <a 
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                          title="GitHub"
                        >
                          💻
                        </a>
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
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

        {/* Project Development Story */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
              Project Development Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold mb-4 text-green-400">🚀 Development Journey</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  CPU Scheduler Pro started as a course project for Operating Systems (CSE 317) 
                  at Daffodil International University. Our goal was to create an interactive 
                  learning tool that makes complex scheduling algorithms accessible and engaging.
                </p>
                <p>
                  The project evolved through multiple iterations, incorporating feedback from 
                  peers and instructors to enhance both the educational value and user experience.
                </p>
                <p>
                  We faced challenges in accurately simulating preemptive algorithms and 
                  creating intuitive visualizations, but through collaborative problem-solving 
                  and modern web technologies, we developed a robust and educational platform.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">🎯 Learning Outcomes</h3>
              <div className="space-y-3">
                {courseInfo.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-gray-300">{objective}</span>
                  </div>
                ))}
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-cyan-400 font-semibold">
                    This project demonstrates the practical application of operating system 
                    concepts and modern web development practices.
                  </p>
                </div>
              </div>
            </motion.div>
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
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {tech.name}
                  </h3>
                </div>
                <p className="text-gray-300 mb-3">{tech.description}</p>
                <p className="text-sm text-cyan-400">{tech.purpose}</p>
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
              Experience CPU Scheduling
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Dive into the world of operating systems and explore how different scheduling 
              algorithms impact process execution and system performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/simulator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <span>🚀</span>
                Launch Simulator
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <span>📊</span>
                Compare Algorithms
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-gray-400"
        >
          <p className="flex items-center justify-center gap-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> 
            for Operating Systems CSE 317 - Daffodil International University
          </p>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} CPU Scheduler Pro - Developed by S.A. Mahfuz & Ali Ashraf Emon
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;