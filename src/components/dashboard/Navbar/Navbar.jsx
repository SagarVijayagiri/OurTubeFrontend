/*import React from 'react'
import { IoMdMenu,IoIosNotifications,IoMdAddCircle } from "react-icons/io";
import { Searchbar } from "../Searchbar/Searchbar.jsx";
import { useState } from "react";
import { Link } from 'react-router-dom';



const Navbar = ({ setSearchQuery, setIsMenuOpen, isMenuOpen }) => {
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;



  
  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center gap-2 px-2 sm:px-4 bg-black border-b border-neutral-800">
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(prev => !prev)}

        >
          <IoMdMenu />
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-semibold hidden sm:inline">YouTube</span>
        </div>

        <div className="flex-1 flex justify-center px-2">
          <Searchbar onSearch={(q) => setSearchQuery(q)}/>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/dashboard/uploadvideos" className="hidden md:flex items-center gap-2 bg-neutral-800 px-3 py-1.5 rounded-full">
            <IoMdAddCircle className="text-xl" />
            <span className="text-sm">Create</span>
          </Link>
          <button className="text-xl">
            <IoIosNotifications />
          </button>
           {user ? (
    <img
      src={user.logourl}
      alt={user.channelname}
      className="w-8 h-8 rounded-full"
    />
  ) : (
    <Link
      to="/login"
      className="px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm"
    >
      Sign In
    </Link>
  )}
        </div>
      </header>

      {/* OVERLAY (mobile) }
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      </>
    
  )
}

export default Navbar*/
import React from 'react';
import { IoMdMenu, IoIosNotifications, IoMdAddCircle } from "react-icons/io";
import { Searchbar } from "../Searchbar/Searchbar.jsx"; // Assuming this is your custom component
import { Link } from 'react-router-dom';

const Navbar = ({ setSearchQuery, setIsMenuOpen, isMenuOpen }) => {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  return (
    <>
      {/* Header with Glassmorphism 
        bg-[#0f0f13]/90 + backdrop-blur-md creates the frosted glass effect 
      */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 bg-[#0f0f13]/90 backdrop-blur-md border-b border-[#2a2a35] transition-all">
        
        {/* LEFT SECTION: Menu & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            className="text-2xl text-[#8a8a93] hover:text-white hover:bg-[#22222a] p-2 rounded-full transition-colors md:hidden"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle Menu"
          >
            <IoMdMenu />
          </button>

          <Link to="/" className="flex items-center gap-2 outline-none">
            {/* You can replace this with your actual logo */}
            <div className="bg-gradient-to-tr from-teal-500 to-blue-500 text-white p-1 rounded-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </div>
            <span className="font-bold text-lg tracking-wide text-white hidden sm:block">
              V-Studio
            </span>
          </Link>
        </div>

        {/* MIDDLE SECTION: Searchbar */}
        {/* We give it max-w-2xl so it doesn't stretch too wide on huge monitors */}
        <div className="flex-1 flex justify-center px-4 max-w-2xl">
          <Searchbar onSearch={(q) => setSearchQuery(q)} />
        </div>

        {/* RIGHT SECTION: Actions & Profile */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Create Button */}
          <Link 
            to="/dashboard/uploadvideos" 
            className="hidden md:flex items-center gap-2 bg-[#1a1a20] hover:bg-[#22222a] border border-[#3a3a45] text-[#8a8a93] hover:text-white px-4 py-2 rounded-full transition-all hover:border-teal-500/50"
          >
            <IoMdAddCircle className="text-xl text-teal-500" />
            <span className="text-sm font-medium">Create</span>
          </Link>

          {/* Notifications */}
          <button className="relative p-2 text-[#8a8a93] hover:text-white hover:bg-[#22222a] rounded-full transition-colors">
            <IoIosNotifications className="text-2xl" />
            {/* Fake notification dot for realism */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#0f0f13]"></span>
          </button>

          {/* User Profile / Login */}
          <div className="ml-1 sm:ml-2">
            {user ? (
              <img
                src={user.logourl}
                alt={user.channelname}
                className="w-9 h-9 rounded-full border-2 border-transparent hover:border-teal-500 transition-all cursor-pointer object-cover shadow-lg"
                title={user.channelname}
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.src = "https://ui-avatars.com/api/?name=" + user.channelname + "&background=1a1a20&color=fff";
                }}
              />
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_4px_15px_rgba(20,184,166,0.2)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] whitespace-nowrap"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* OVERLAY (Mobile) - darkens background when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
