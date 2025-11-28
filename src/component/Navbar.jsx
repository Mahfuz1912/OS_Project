import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Left Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
            DIU
          </div>
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-wide text-primary hover:opacity-80 transition"
          >
            CPU Scheduler
          </Link>
        </div>

        {/* Menu Section */}
        <div className="flex items-center gap-4">
          <NavLink 
            to="/" 
            className={({isActive}) =>
              `px-4 py-2 rounded-lg transition 
              ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/simulator" 
            className={({isActive}) =>
              `px-4 py-2 rounded-lg transition 
              ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`
            }
          >
            Simulator
          </NavLink>

          <NavLink 
            to="/compare" 
            className={({isActive}) =>
              `px-4 py-2 rounded-lg transition 
              ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`
            }
          >
            Compare
          </NavLink>
        </div>
      </div>
    </div>
  )
}
