/*import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";

import { useState } from "react";
import { IoMdHome,IoMdVideocam,IoIosNotifications } from "react-icons/io";
import { FaUpload,FaMusic } from "react-icons/fa";
import { IoLogOut,IoGameController } from "react-icons/io5";
import { MdLocalMovies,MdSportsBaseball  } from "react-icons/md";

export const Dashboard = () => {
 
 const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active-menu-link" : "menu-link";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };


 const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-black text-white">

  
  <div className="flex items-center gap-2 px-2 sm:px-4 h-14">

    
    <button className="text-2xl" onClick={() => setIsMenuOpen(prev => !prev)}>☰</button>

    <div className="flex items-center gap-1 shrink-0">
      <img src="/logo.png" alt="Logo" className="h-8 w-8" />
      <span className="font-semibold hidden sm:inline">YouTube</span>
    </div>

    
    <div className="flex-1 flex justify-center px-2">
      <div className="
        flex items-center
        w-full max-w-[520px]
        h-9 sm:h-10
        rounded-full
        bg-neutral-900
        border border-neutral-700
        overflow-hidden
      ">
        <input
          type="text"
          placeholder="Search"
          className="
            flex-1 px-3
            bg-transparent
            text-sm sm:text-base
            text-white
            placeholder-neutral-400
            outline-none
          "
        />
        <div className="hidden sm:block h-5 w-px bg-neutral-700"></div>
        <button className="px-3 sm:px-4 hover:bg-neutral-800">
          <CiSearch className='text-2xl' />
        </button>
      </div>
    </div>

    
    <div className="flex items-center gap-2 shrink-0">
      <button className="hidden md:flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded-full">
        ➕ <span className="text-sm">Create</span>
      </button>
      <button className="text-xl">
        <IoIosNotifications />
      </button>
      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-semibold">
        S
      </div>
    </div>
  </div>


  <div className="flex gap-2 px-2 sm:px-4 py-2 overflow-x-auto scrollbar-hide">
    {[
      "All",
      "Music",
      "Karthi",
      "Nani",
      "Devi Sri Prasad",
      "Telugu cinema",
      "Makar Sankranti",
      "Rang"
    ].map((item, i) => (
      <button
        key={i}
        className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm ${
          i === 0
            ? "bg-white text-black"
            : "bg-neutral-800 hover:bg-neutral-700"
        }`}
      >
        {item}
      </button>
    ))}
  </div>

{isMenuOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 md:hidden "
    onClick={() => setIsMenuOpen(false)}
  />
)}



<div
  className={`
    fixed top-26 left-0 h-full w-64
    bg-black text-white
    z-50 opacity-110
    transform transition-transform duration-300
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>
  <div className="h-14 flex items-center px-4 border-b border-neutral-800">
    <span className="font-semibold text-lg">Menu</span>
  </div>

  <nav className="p-4 space-y-3 border-b border-neutral-800">
    
    <Link
  to="/dashboard/home"
  className="block hover:bg-neutral-800 px-3 py-2 rounded"
>
  <IoMdHome className="inline mr-2 text-2xl" />
  Home
</Link>
    <Link
  to="/dashboard/home"
  className="block hover:bg-neutral-800 px-3 py-2 rounded"
>
  <IoMdVideocam className="inline mr-2 text-2xl" />
  My Videos
</Link>
  <Link
  to="/dashboard/home"
  className="block hover:bg-neutral-800 px-3 py-2 rounded"
>
  <FaUpload className="inline mr-2 text-2xl" />
      Upload Videos
</Link>
    <Link
  to="/dashboard/home"
  className="block hover:bg-neutral-800 px-3 py-2 rounded"
>
  <IoLogOut className="inline mr-2 text-2xl" />
      Logout
</Link>
    
  </nav>
  <nav className="p-4 space-y-3 border-b border-neutral-800">
    <button className="block w-full text-left hover:bg-neutral-800 px-3 py-2 rounded">
      <FaMusic className="inline mr-2 text-2xl" />
      Music
    </button>
    <button className="block w-full text-left hover:bg-neutral-800 px-3 py-2 rounded">
      <MdLocalMovies className="inline mr-2 text-2xl" /> 
      Movies
    </button>
    <button className="block w-full text-left hover:bg-neutral-800 px-3 py-2 rounded">
      <MdSportsBaseball className="inline mr-2 text-2xl" />
      Sports
    </button>
    <button className="block w-full text-left hover:bg-neutral-800 px-3 py-2 ">
      <IoGameController className="inline mr-2 text-2xl"/>
      Gaming
    </button>
  </nav>
</div>

</div>

  );
};*/

import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";


export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-neutral-800 font-medium"
      : "hover:bg-neutral-800";
    
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
   
  return (
    <div className="min-h-screen bg-black text-white">
      {/* TOP BAR */}
      <Navbar setSearchQuery={setSearchQuery} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

      {/* SIDEBAR */}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isActive={isActive} handleLogout={handleLogout} />

      {/* MAIN CONTENT */}
      <main className="pt-14 md:pl-64 flex-1 overflow-y-auto">
        <Outlet context={{ searchQuery,setSearchQuery }}/>
      </main>
    </div>
  );
};
