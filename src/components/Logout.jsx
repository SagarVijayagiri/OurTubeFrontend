import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Remove all stored user data
    toast("Logged out successfully");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};