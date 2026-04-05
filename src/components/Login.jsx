/*import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IoIosContact } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";


export const Login = () => {
  const [channelname, setchannelname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isloading,setloading]=useState('');
  const navigate = useNavigate();

  

  const submithandler = (e) => {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData();
    
    formdata.append('email', email);
    formdata.append('password', password);

    axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
      email:email,
      password:password
    })
    .then(res => {
      setloading(false)
      console.log(res.data);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('userid',res.data._id)
      localStorage.setItem('channelname',res.data.channelname)
      localStorage.setItem('logourl',res.data.logourl)
          localStorage.setItem("user", JSON.stringify({
          token: res.data.token,
          _id: res.data._id,
          channelname: res.data.channelname,
          logourl: res.data.logourl,
        }));


      toast("welcome to our tube")
      navigate('/dashboard/home')
      console.log("TOKEN:", localStorage.getItem("token"));
      console.log("USER:", JSON.parse(localStorage.getItem("logourl")));

    })
    .catch(err => {
      setloading(false)
      console.log(err.response.data.error)
      toast.error(err.response.data.error)
    });
  };



  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-[url('./assets/bgTwo.png')]  w-full h-screen bg-cover bg-center">
         <div
          data-aos="zoom-in"
          className="flex flex-col items-center justify-center w-full h-full p-2"
        >
          <h1 className="text-white text-5xl">Sign In</h1>
          <p className="text-white p-2 text-2xl">Login to your account </p>
          <form className="bg-gray-300 rounded-lg w-full sm:w-1/2 lg:w-1/4 p-3 opacity-90" onSubmit={submithandler}>
            <div className="relative mb-2">
                          <input required

                            type="email"
                            className="bg-gray-100 rounded-sm w-full p-2 pl-10 "
                            placeholder="Email"
                            onChange={(e) => setemail(e.target.value)}
                          />
                          <IoIosContact className="absolute left-3  top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
              </div>
              <div className="relative mb-2">
                          <input required
                            type="password"
                            className="bg-gray-100 rounded-sm w-full p-2 pl-10 "
                            placeholder="Password"
                            onChange={(e) => setpassword(e.target.value)}
                          />
                          <MdOutlinePassword className="absolute left-3  top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
              </div>
              <button className="bg-blue-500 text-white rounded-lg w-full p-2 mt-4 hover:bg-blue-600">{isloading && <i className="fa-solid fa-circle-notch fa-spin"></i>}Login</button>
              <Link to='/signup' className="flex justify-center pt-2 text-blue-500">Create Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}*/

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IoIosContact } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isloading, setloading] = useState(false); // Changed to boolean
  const navigate = useNavigate();

  const submithandler = (e) => {
    e.preventDefault();
    setloading(true);

    axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
      email: email,
      password: password
    })
    .then(res => {
      setloading(false);
      
      // Save user session securely
      localStorage.setItem("user", JSON.stringify({
        token: res.data.token,
        _id: res.data._id,
        channelname: res.data.channelname,
        logourl: res.data.logourl,
      }));

      toast.success("Welcome back!");
      navigate('/dashboard/home');
    })
    .catch(err => {
      setloading(false);
      const errorMessage = err.response?.data?.error || "Failed to login. Please try again.";
      console.error(errorMessage);
      toast.error(errorMessage);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f13] p-4 font-sans text-white">
      {/* Set Toast theme to dark to match the UI */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="w-full max-w-md bg-[#1a1a20] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-[#2a2a35] p-8 sm:p-10 relative overflow-hidden">
        
        {/* Subtle gradient accent bar at the top of the card */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500"></div>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-[#8a8a93] text-sm">Sign in to your account to continue.</p>
        </div>

        <form onSubmit={submithandler} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">
              Email Address
            </label>
            <div className="relative">
              <IoIosContact className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5a5a65] text-xl" />
              <input 
                required
                type="email"
                className="w-full bg-[#22222a] border border-[#3a3a45] rounded-lg p-3 pl-11 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">
              Password
            </label>
            <div className="relative">
              <MdOutlinePassword className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5a5a65] text-xl" />
              <input 
                required
                type="password"
                className="w-full bg-[#22222a] border border-[#3a3a45] rounded-lg p-3 pl-11 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isloading}
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-3.5 px-4 rounded-lg shadow-[0_4px_15px_rgba(20,184,166,0.2)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] transition-all duration-300 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isloading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer / Sign Up Link */}
        <div className="mt-8 text-center border-t border-[#2a2a35] pt-6">
          <p className="text-[#8a8a93] text-sm">
            Don't have an account?{' '}
            <Link to='/signup' className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
