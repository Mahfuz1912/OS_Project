import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {

  const quickLinks = [
    { name: "🏠 Home", path: "/" },
    { name: "⚡ Simulator", path: "/simulator" },
    { name: "📊 Compare", path: "/compare" },
    { name: "📚 Algorithms", path: "/algorithm" },
  ];

  const resources = [
    { name: "📄 Project Report", url: "https://drive.google.com/file/d/1x4er2bTyMxEDO3654OX_wP48LLogZoP_/view?usp=drive_link" },
    { name: "💻 GitHub", url: "https://github.com/Mahfuz1912/OS_Project" },
    // { name: "🎓 BLC", url: "#" },
    // { name: "📖 Documentation", url: "#" },
  ];

  const teamMembers = [
    { name: "Sabit Al Mahfuz", role: "Full Stack Developer" },
    { name: "Ali Ashraf Emon", role: "Full Stack Developer" },
  ];

  return (
    <footer className="bg-linear-to-r from-gray-900 via-purple-900 to-indigo-900 text-white mt-20 border-t border-indigo-500/30">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                DIU
              </div>
              <div>
                <h3 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Scheduler Pro
                </h3>
                <p className="text-sm text-gray-400">DIU Project</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Advanced CPU Scheduling Algorithms Simulator for Operating Systems
              course. Visualize and compare different scheduling techniques in
              real-time.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/Mahfuz1912/OS_Project"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-cyan-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg">
                  <FaGithub />
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="text-lg">📄</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <span className="text-lg">🎓</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center gap-2">
              <span>🚀</span> Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">
                      {link.name.split(" ")[0]}
                    </span>
                    <span className="text-sm">
                      {link.name.split(" ").slice(1).join(" ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
              <span>📚</span> Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                    target={
                      resource.url.startsWith("http") ? "_blank" : "_self"
                    }
                    rel={
                      resource.url.startsWith("http")
                        ? "noopener noreferrer"
                        : ""
                    }
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">
                      {resource.name.split(" ")[0]}
                    </span>
                    <span className="text-sm">
                      {resource.name.split(" ").slice(1).join(" ")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400 flex items-center gap-2">
              <span>👥</span> Development Team
            </h4>
            <div className="space-y-3 mb-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-gray-300">
                  <div className="font-medium text-white">{member.name}</div>
                  <div className="text-xs text-gray-400">{member.role}</div>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-semibold mb-3 text-green-400 flex items-center gap-2">
              <span>📖</span> Course Info
            </h4>
            <div className="text-gray-300">
              <div className="font-medium text-white">Operating Systems</div>
              <div className="text-xs text-gray-400">CSE 324 | Fall 2025</div>
              <div className="text-xs text-gray-400">
                Daffodil International University
              </div>
            </div>
          </div>
        </div>
        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-gray-400"
        >
          <hr />
          <p className="flex items-center justify-center gap-2 text-lg">
            Made For Operating Systems CSE 324 - Daffodil International University
          </p>
          <p className="text-sm mt-2 text-gray-500">
            © {new Date().getFullYear()} CPU Scheduler Pro | Developed by S.A.
            Mahfuz & Ali Ashraf
          </p>
        </motion.div>
      </div>

      {/* Decorative Gradient Bar */}
      <div className="h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;
