import React from 'react'
import { IoMdMenu,IoIosNotifications,IoMdAddCircle } from "react-icons/io";
import { SearchBar } from "../SearchBar/Searchbar.jsx";
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
          <SearchBar onSearch={(q) => setSearchQuery(q)}/>
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

      {/* OVERLAY (mobile) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      </>
    
  )
}

export default Navbar