import React from "react";

const Navbar = () => {
    return  (
    <>
     <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Navbar Brand */}
          <div className="flex-shrink-0">
            <span className="text-white text-lg font-semibold">Pocket Storage</span>
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex md:space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Services
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
    </>
    )
}

export default Navbar