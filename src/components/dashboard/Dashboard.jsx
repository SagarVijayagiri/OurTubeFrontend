import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // UX Upgrade: Automatically close the mobile menu whenever the user clicks a link to change pages
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Upgraded active state to match the premium V-Studio Sidebar styling
  // Returns a teal inset-shadow indicator and solid background when active
  const isActive = (path) => {
    return location.pathname === path
      ? "bg-[#22222a] text-white shadow-[inset_4px_0_0_0_#14b8a6]" 
      : ""; // Falls back to the default text color defined in your Sidebar
  };
    
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
    
  return (
    // Set the core background and default text color for the entire app here
    <div className="min-h-screen bg-[#0f0f13] text-white font-sans selection:bg-teal-500/30">
      
      {/* TOP BAR */}
      <Navbar 
        setSearchQuery={setSearchQuery} 
        setIsMenuOpen={setIsMenuOpen} 
        isMenuOpen={isMenuOpen} 
      />

      {/* SIDEBAR */}
      <Sidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        isActive={isActive} 
        handleLogout={handleLogout} 
      />

      {/* MAIN CONTENT WRAPPER */}
      {/* pt-16 matches the new Navbar height, md:pl-64 prevents overlap with Sidebar */}
      <main className="pt-16 md:pl-64 min-h-screen transition-all duration-300 ease-in-out">
        {/* Added a subtle fade-in animation container for route transitions */}
        <div className="animate-in fade-in duration-500">
          <Outlet context={{ searchQuery, setSearchQuery }} />
        </div>
      </main>

    </div>
  );
};
