import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IoIosContact } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
/*export const Login = () => {
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
      console.log(res);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('userid',res.data._id)
      localStorage.setItem('channelname',res.data.channelname)
      localStorage.setItem('logourl',res.data.logourl)
      toast("welcome to our tube")
      navigate('/dashboard/home')
    })
    .catch(err => {
      setloading(false)
      console.log(err.response.data.error)
      toast.error(err.response.data.error)
    });
  };

  return (
    <div className="main-wrapper">
      <div className="wrapper-header">
        <img className="logo-image" src="/logo.png" alt="app logo" />
        <h2 className="c-name">Our Tube</h2>
      </div>

      <form className="form-wrapper" onSubmit={submithandler}>
        <input required onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email" />
        <input required onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">{isloading && <i className="fa-solid fa-circle-notch fa-spin"></i>}Submit</button>
        <Link to='/signup' className="link">Create Account</Link>
      </form>
    </div>
  );
};*/

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
      /*localStorage.setItem('token',res.data.token)
      localStorage.setItem('userid',res.data._id)
      localStorage.setItem('channelname',res.data.channelname)
      localStorage.setItem('logourl',res.data.logourl)*/
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
}