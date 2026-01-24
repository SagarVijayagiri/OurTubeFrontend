
import React ,{useState} from "react";
import { IoIosContact } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { CiPhone } from "react-icons/ci";

import AOS from "aos";
import "aos/dist/aos.css";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      const res = await axios.post(
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
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-[url('./assets/bgTwo.png')]  w-full h-screen bg-cover bg-center">
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center justify-center w-full h-full p-2"
        >
          <h1 className="text-white text-5xl">Sign Up</h1>
          <p className="text-white p-2 text-2xl">Create your account </p>
          <form onSubmit={submithandler}className="bg-gray-300 rounded-lg w-full sm:w-1/2 md:mx-auto p-3 opacity-90">
            <div className="relative mb-2">
              <input required
                type="text"
                className="bg-gray-100 rounded-sm w-full p-2 pl-10 "
                placeholder="Name"
                onChange={(e) => setchannelname(e.target.value)}
              />
              <IoIosContact className="absolute left-3  top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
            </div>
            <div className="relative mb-2">
              <input required
                type="email"
                className="bg-gray-100 rounded-sm w-full p-2 pl-10 "
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
              />
              <MdOutlineMail className="absolute left-3  top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
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
            <div className="relative mb-2">
              <input required
                type="tel"
                className="bg-gray-100 rounded-sm w-full p-2 pl-10 "
                placeholder="Phone Number"
                onChange={(e) => setphone(e.target.value)}
              />
              <CiPhone className="absolute left-3  top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
            </div>
            <div className="relative mb-2">
              <input required
                type="file"
                className="cursor-pointer bg-gray-100 rounded-sm w-full p-2 pl-10 "
                onChange={fileHandler}
              />
            </div>
            {imageurl && (
          <img
            className="flex justify-center mx-auto h-16 w-16 rounded-full object-cover"
            src={imageurl}
            alt="logo preview"
          />
        )}


            <button className="bg-blue-500 text-white rounded-lg w-full p-2 mt-4 hover:bg-blue-600" disabled={isloading}>
              {isloading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Sign Up"
          )}
            </button>

            <p className="flex justify-center pt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline pl-2">
         Login
        </Link>
            </p>
            <p className="flex justify-center pt-1 text-sm">
              By signing up,you agree to our Terms and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
