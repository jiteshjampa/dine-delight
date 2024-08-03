import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthImage from "../assets/AuthImage.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = { name, email, address, password };
      console.log(user);
      const res = await axios.post(
        "https://dine-delight-backend.vercel.app/api/register",
        user
      );
      if (res.data.success) {
        toast.success("Registration Successful!", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          autoClose: 2000,
          onClose: () => {
            navigate("/Login");
          },
        });
      }
    } catch (error) {
      setData(error.response.data);
      console.log(error.response);
    }
  };

  return (
    <div className="flex flex-col md:flex-row text-orange-600 mt-28 ">
      {/* Image Section */}
      <div className="hidden md:block w-[600px] mr-10">
        <img
          src={AuthImage}
          alt="AuthImage"
          className="w-full h-full rounded-md"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 mt-10 mr-6 ml-6 md:mt-0">
        <form className="flex flex-col min-w-80 font-semibold">
          <h1 className="flex justify-center items-center text-2xl mb-6">
            Sign Up
          </h1>

          <label htmlFor="name" className="mb-2 ml-2">
            Name
          </label>
          <input
            type="text"
            className="p-2 rounded-l-full rounded-r-full mb-3 border border-orange-500 placeholder:pl-3"
            placeholder="Enter Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {data?.message?.name && (
            <div className="font-medium text-red-700">*{data.message.name}</div>
          )}

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

          <label htmlFor="address" className="mb-2 ml-2">
            Address
          </label>
          <input
            type="text"
            className="p-2 rounded-l-full rounded-r-full rounded-md mb-3 border border-orange-500"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          {data?.message?.address && (
            <div className="font-medium text-red-700">
              *{data.message.address}
            </div>
          )}
          <label htmlFor="password" className="mb-2 ml-2">
            Password
          </label>
          <input
            type="password"
            className="p-2 rounded-l-full rounded-r-full mb-6 border border-orange-500 placeholder:pl-3"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {data?.message?.password && (
            <div className="font-medium text-red-700">
              *{data.message.password}
            </div>
          )}
          <div className="flex justify-center items-center">
            <button
              className="flex justify-center items-center ml-3 rounded-md bg-green-600 px-4 py-2 w-fit text-white"
              onClick={handleRegister}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
