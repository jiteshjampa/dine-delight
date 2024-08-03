// components/Navbar.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/Slice/UserSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const cartValue = useSelector((state) => state.cart.value);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.delete("https://dine-delight-backend.vercel.app/api/logout", {
        withCredentials: true,
      });
      dispatch(setAuthenticated(false)); // Update Redux state
      console.log("User logged out. State should be updated now.");
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to view your cart.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        autoClose: 3000,
      });
      navigate("/Login");
    } else {
      navigate("/Cart");
    }
  };

  const getLinkClasses = (path) =>
    `px-4 py-2 ${
      location.pathname === path ? "border-b-2 border-b-orange-600" : ""
    } hover:border-b-2 hover:border-b-orange-600`;

  useEffect(() => {
    // This useEffect could be used for any side-effects needed on mount or when authentication state changes
    console.log("isAuthenticated updated:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="p-4 flex flex-col sm:flex-row justify-between items-center fixed w-full bg-white top-0 font-semibold font-serif text-orange-600">
      <div className="flex items-center w-full justify-between">
        <img src={Logo} alt="Logo" className="w-20 h-20 rounded-full" />
        <div className="hidden sm:flex items-center space-x-4">
          <Link to="/" className={getLinkClasses("/")}>
            Home
          </Link>
          <Link to="/Orders" className={getLinkClasses("/Orders")}>
            Orders History
          </Link>
        </div>

        <div className="flex items-center space-x-4 ml-auto sm:ml-0 mr-2">
          {/* Shopping Cart */}
          <button onClick={handleCartClick} className="flex items-center">
            <TfiShoppingCart className="w-6 h-6 text-orange-600" />
            <sup className="font-semibold bg-orange-600">
              {cartValue > 0 ? cartValue : ""}
            </sup>
          </button>

          {/* Hamburger Menu for Mobile */}
          <button
            className="sm:hidden text-orange-600"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg sm:hidden">
          <Link to="/" className={getLinkClasses("/")}>
            Home
          </Link>
          <Link to="/Orders" className={getLinkClasses("/Orders")}>
            Orders History
          </Link>
          {!isAuthenticated ? (
            <>
              <button
                className="w-full px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg m-2"
                onClick={() => navigate("/Login")}
              >
                Log In
              </button>
              <button
                className="w-full m-2 px-6 py-3 text-white font-semibold bg-red-600 rounded-lg"
                onClick={() => navigate("/Register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="w-full px-6 py-3 text-white font-semibold bg-red-600 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center space-x-4">
        {isAuthenticated ? (
          <button
            className="px-6 py-3 text-white font-semibold bg-red-600 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg"
              onClick={() => navigate("/Login")}
            >
              LogIn
            </button>
            <button
              className="px-6 py-3 text-white font-semibold bg-red-600 rounded-lg"
              onClick={() => navigate("/Register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
