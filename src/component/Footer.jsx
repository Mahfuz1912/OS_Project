import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-xl shadow-lg mt-10">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <nav className="flex flex-col md:flex-row gap-4">
            <a className="link link-hover hover:text-yellow-300 transition-colors hover:text-xl duration-300">
              BLC
            </a>
            <a className="link link-hover hover:text-yellow-300 transition-colors duration-300">
              Project Report
            </a>
            <a className="link link-hover hover:text-yellow-300 transition-colors duration-300">
              GitHub
            </a>
          </nav>
        </div>
        <div>
          <h1 className="text-xl font-bold">Operating System</h1>
        </div>
        {/* Copyright */}
        <div className="text-center md:text-right mt-6 md:mt-0">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} S.A.Mahfuz & Ali Ashraf Emon Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
