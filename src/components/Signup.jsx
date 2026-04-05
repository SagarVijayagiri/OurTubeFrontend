import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { IoIosContact } from "react-icons/io";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { FaCamera } from "react-icons/fa"; // Added for the sleek avatar upload

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

export const Signup = () => {
  const [channelname, setchannelname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [logo, setlogo] = useState(null);
  const [imageurl, setimageurl] = useState("");
  const [isloading, setloading] = useState(false);

  const navigate = useNavigate();

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageurl(URL.createObjectURL(file));
      setlogo(file);
    }
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const formdata = new FormData();
      formdata.append("channelname", channelname);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);
      formdata.append("logo", logo);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f13] p-4 font-sans text-white">
      {/* Match Toast theme to dark UI */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div 
        data-aos="zoom-in"
        className="w-full max-w-lg bg-[#1a1a20] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-[#2a2a35] p-8 sm:p-10 relative overflow-hidden"
      >
        {/* Subtle gradient accent bar at the top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500"></div>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-[#8a8a93] text-sm">Join the community and share your content.</p>
        </div>

        <form onSubmit={submithandler} className="space-y-5">
          
          {/* Custom Avatar / Logo Upload Area */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-[#4a4a5a] bg-[#22222a] flex items-center justify-center overflow-hidden group cursor-pointer hover:border-teal-500 transition-colors">
              {/* Hidden file input stretching over the whole circle */}
              <input 
                required={!logo} // Only required if a logo hasn't been selected yet
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={fileHandler} 
                accept="image/*"
              />
              
              {imageurl ? (
                <img src={imageurl} className="w-full h-full object-cover" alt="Logo preview" />
              ) : (
                <div className="flex flex-col items-center text-[#5a5a65] group-hover:text-teal-400 transition-colors">
                  <FaCamera className="text-2xl mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Logo</span>
                </div>
              )}
            </div>
            {!imageurl && <p className="text-[#5a5a65] text-xs mt-3">Upload channel logo</p>}
          </div>

          <div className="grid grid-cols-1 gap-5">
            {/* Channel Name */}
            <div>
              <label className="block text-[11px] text-[#8a8a93] mb-1.5 tracking-wide uppercase font-semibold">Channel Name</label>
              <div className="relative">
                <IoIosContact className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5a5a65] text-xl" />
                <input 
                  required
                  type="text"
                  className="w-full bg-[#22222a] border border-[#3a3a45] rounded-lg p-3 pl-11 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  placeholder="Your channel name"
                  onChange={(e) => setchannelname(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] text-[#8a8a93] mb-1.5 tracking-wide uppercase font-semibold">Email Address</label>
              <div className="relative">
                <MdOutlineMail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5a5a65] text-xl" />
                <input 
                  required
                  type="email"
                  className="w-full bg-[#22222a] border border-[#3a3a45] rounded-lg p-3 pl-11 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  placeholder="name@example.com"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] text-[#8a8a93] mb-1.5 tracking-wide uppercase font-semibold">Password</label>
              <div className="relative">
                <MdOutlinePassword className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5a5a65] text-xl" />
                <input 
                  required
                  type="password"
                  className="w-full bg-[#22222a] border border-[#3a3a45] rounded-lg p-3 pl-11 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  placeholder="Create a password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[11px] text-[#8a8a93] mb-1.5 tracking-wide uppercase font-semibold">Phone Number</label>
              <div className="relative">
                <CiPhone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5a5a65] text-xl" />
                <input 
                  required
                  type="tel"
                  className="w-full bg-[#22222a] border border-[#3a3a45] rounded-lg p-3 pl-11 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  placeholder="Your phone number"
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isloading}
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-3.5 px-4 rounded-lg shadow-[0_4px_15px_rgba(20,184,166,0.2)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isloading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          {/* Footer Text */}
          <div className="mt-6 text-center">
            <p className="text-[#8a8a93] text-sm mb-2">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                Login here
              </Link>
            </p>
            <p className="text-[#5a5a65] text-xs">
              By signing up, you agree to our Terms and Privacy Policy.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
