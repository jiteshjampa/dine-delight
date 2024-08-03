import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/Slice/UserSlice"; // Ensure correct path
import Banner from "../assets/AuthImage.jpg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const res = await axios.post(
        "https://dine-delight-backend.vercel.app/api/login",
        loginData,
        {
          withCredentials: true,
        }
      );

      if (res.data.sucess) {
        // Set authenticated status
        toast.success("Login Successful!", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          autoClose: 2000,
          onClose: () => {
            // Set user data
            dispatch(setAuthenticated(true));
            navigate("/");
          },
        });
      }
    } catch (error) {
      console.error(error);
      setData(error.response.data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row text-orange-600  mt-24">
      {/* Image Section */}
      <div className="hidden md:block w-[600px] mr-10">
        <img src={Banner} alt="Banner" className="w-full h-full rounded-md" />
      </div>

      {/* Form Section */}
      <div className="flex-1 mt-10 md:mt-0">
        <form className="flex flex-col min-w-80 font-semibold p-4">
          <h1 className="flex justify-center items-center text-2xl mb-6">
            Log In
          </h1>

          <label htmlFor="email" className="mb-2 ml-2">
            Email
          </label>
          <input
            type="text"
            className="p-2 rounded-l-full rounded-r-full mb-3 border border-orange-500 placeholder:pl-3"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {data?.message?.email && (
            <div className="font-medium text-red-700">
              *{data.message.email[0]}
            </div>
          )}

          <label htmlFor="password" className="mb-2 ml-2">
            Password
          </label>
          <input
            type="password"
            className="p-2 rounded-l-full rounded-r-full mb-3 border border-orange-500 placeholder:pl-3"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {data?.message?.password && (
            <div className="font-medium text-red-700">
              *{data.message.password[0]}
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button
              className="rounded-md bg-green-600 px-4 py-2 text-white"
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
