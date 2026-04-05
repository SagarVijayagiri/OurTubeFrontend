import React from 'react';
import { Link } from "react-router-dom";
import { IoMdHome, IoMdVideocam } from "react-icons/io";
import { FaUpload, FaMusic } from "react-icons/fa";
import { IoLogOut, IoGameController, IoLogIn } from "react-icons/io5";
import { MdLocalMovies, MdSportsBaseball } from "react-icons/md";
import { toast } from 'react-toastify';

const Sidebar = ({ isMenuOpen, setIsMenuOpen, isActive, handleLogout }) => {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  // Handling features that are yet to be added
  const handleFutureFeature = (featureName) => {
    toast.info(`${featureName} feature coming soon!`, {
      theme: "dark",
      autoClose: 2000,
    });
  };

  return (
    <aside
      // Adjusted top-16 and h-[calc(100vh-4rem)] to perfectly match the new Navbar height
      className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-[#0f0f13] border-r border-[#2a2a35] transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col`}
    >
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-hide">
        
        {/* SECTION 1: MAIN MENU */}
        <div>
          <p className="px-4 text-[10px] font-bold text-[#5a5a65] uppercase tracking-wider mb-3">
            Main Menu
          </p>
          <nav className="space-y-1.5">
            <Link 
              to="/dashboard/home" 
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-[#22222a] hover:text-white ${isActive("/dashboard/home") || "text-[#8a8a93]"}`}
            >
              <IoMdHome className="mr-3 text-xl" /> 
              Home
            </Link>
            
            <Link 
              to="/dashboard/myvideos" 
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-[#22222a] hover:text-white ${isActive("/dashboard/myvideos") || "text-[#8a8a93]"}`}
            >
              <IoMdVideocam className="mr-3 text-xl" /> 
              My Videos
            </Link>
            
            <Link 
              to="/dashboard/uploadvideos" 
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-[#22222a] hover:text-white ${isActive("/dashboard/uploadvideos") || "text-[#8a8a93]"}`}
            >
              <FaUpload className="mr-3 text-xl" /> 
              Upload Videos
            </Link>
          </nav>
        </div>

        {/* SECTION 2: DISCOVER */}
        <div>
          <p className="px-4 text-[10px] font-bold text-[#5a5a65] uppercase tracking-wider mb-3">
            Discover
          </p>
          <nav className="space-y-1.5">
            <button 
              className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[#8a8a93] hover:bg-[#22222a] hover:text-white transition-colors" 
              onClick={() => handleFutureFeature("Music")}
            >
              <FaMusic className="mr-3 text-xl" /> 
              Music
            </button>
            
            {/* Fixed the onClick bug here (moved from icon to button) */}
            <button 
              className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[#8a8a93] hover:bg-[#22222a] hover:text-white transition-colors"
              onClick={() => handleFutureFeature("Movies")}
            >
              <MdLocalMovies className="mr-3 text-xl" /> 
              Movies
            </button>
            
            <button 
              className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[#8a8a93] hover:bg-[#22222a] hover:text-white transition-colors" 
              onClick={() => handleFutureFeature("Sports")}
            >
              <MdSportsBaseball className="mr-3 text-xl" /> 
              Sports
            </button>
            
            <button 
              className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[#8a8a93] hover:bg-[#22222a] hover:text-white transition-colors" 
              onClick={() => handleFutureFeature("Gaming")}
            >
              <IoGameController className="mr-3 text-xl" /> 
              Gaming
            </button>
          </nav>
        </div>

      </div>

      {/* SECTION 3: AUTHENTICATION (Pinned to Bottom) */}
      <div className="p-4 border-t border-[#2a2a35]">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
          >
            <IoLogOut className="mr-2 text-xl" /> 
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 transition-colors"
          >
            <IoLogIn className="mr-2 text-xl" />
            Login
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
