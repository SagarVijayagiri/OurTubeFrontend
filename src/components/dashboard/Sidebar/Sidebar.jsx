import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdHome, IoMdVideocam } from "react-icons/io";
import { FaUpload, FaMusic } from "react-icons/fa";
import { IoLogOut, IoGameController,IoLogIn } from "react-icons/io5";
import { MdLocalMovies, MdSportsBaseball } from "react-icons/md";
import { toast } from 'react-toastify';

const Sidebar = ({ isMenuOpen, setIsMenuOpen, isActive, handleLogout }) => {
  const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;


    {/* handling features that are yet to be added*/}
    const handleMusicClick = () => {
    toast("Music feature yet to be added!");
    }
    const handleMoviesClick = () => {
    toast("Movies feature yet to be added!");
    }
    const handleSportsClick = () => {
    toast("Sports feature yet to be added!");
    }
    const handleGamingClick = () => {
    toast("Gaming feature yet to be added!");
    }
  return (
    <>
    <aside
        className={`fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-64 bg-black border-r border-neutral-800 transform transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <nav className="p-4 space-y-2 border-b border-neutral-800">
          <Link to="/dashboard/home" className={`block px-3 py-2 rounded text-gray-300 ${isActive("/dashboard/home")}`}>
            <IoMdHome className="inline mr-2 text-2xl text-gray-300" /> Home
          </Link>
          <Link to="/dashboard/myvideos" className={`block px-3 text-gray-300 py-2 rounded ${isActive("/dashboard/myvideos")}`}>
            <IoMdVideocam className=" text-gray-300 inline mr-2 text-2xl" /> My Videos
          </Link>
          <Link to="/dashboard/uploadvideos" className={`block px-3 py-2 rounded text-gray-300 ${isActive("/dashboard/uploadvideos")}`}>
            <FaUpload className="inline mr-2 text-2xl text-gray-300" /> Upload Videos
          </Link>
          {user ? (
  <button
    onClick={handleLogout}
    className="text-gray-300 block w-full text-left px-3 py-2 rounded hover:bg-neutral-800"
  >
    <IoLogOut className="inline mr-2 text-2xl text-gray-300" /> Logout
  </button>
) : (
  <Link
    to="/login"
    className={`block px-3 py-2 rounded text-gray-300 ${isActive("/login")}`}
  >
    <IoLogIn className="inline mr-2 text-2xl text-gray-300" />
    Login
  </Link>
)}

        </nav>

        <nav className="p-4 space-y-2">
          <button className="text-gray-300 block w-full text-left px-3 py-2 rounded hover:bg-neutral-800" onClick={handleMusicClick} >
            <FaMusic className="inline mr-2 text-2xl text-gray-300" /> Music
          </button>
          <button className="text-gray-300 block w-full text-left px-3 py-2 rounded hover:bg-neutral-800">
            <MdLocalMovies className="inline mr-2 text-2xl text-gray-300" onClick={handleMoviesClick} /> Movies
          </button>
          <button className="text-gray-300 block w-full text-left px-3 py-2 rounded hover:bg-neutral-800" onClick={handleSportsClick}>
            <MdSportsBaseball className="inline mr-2 text-2xl text-gray-300" /> Sports
          </button>
          <button className="text-gray-300 block w-full text-left px-3 py-2 rounded hover:bg-neutral-800" onClick={handleGamingClick}>
            <IoGameController className="inline mr-2 text-2xl text-gray-300" /> Gaming
          </button>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar