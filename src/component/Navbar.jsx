import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "🏠 Home", name: "home" },
    { path: "/simulator", label: "⚡ Simulator", name: "simulator" },
    { path: "/compare", label: "📊 Compare", name: "compare" },
    { path: "/algorithm", label: "📚 Algorithms", name: "algorithms" },
    { path: "/about", label: "ℹ️ About", name: "about" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl sticky top-0 z-50 border-b border-indigo-500/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={closeMobileMenu}
            >
              {/* Animated Logo */}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300 group-hover:scale-110">
                  <span className="drop-shadow-sm">DIU</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              </div>
              
              {/* Brand Text */}
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Scheduler Pro
                </span>
                <span className="text-xs text-gray-400 -mt-1">
                  OS Project
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group
                    ${isActive 
                      ? "text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {/* Hover Effect */}
                  <span className="relative z-10 flex items-center gap-2">
                    {item.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-b from-indigo-900/95 to-purple-900/95 backdrop-blur-lg border-t border-indigo-500/30 py-4">
            <div className="container mx-auto px-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${isActive
                      ? "text-white bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-500/50 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
}