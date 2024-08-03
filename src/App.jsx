import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { checkAuthStatus, setAuthenticated } from "./redux/Slice/UserSlice";
import { setCartValue } from "./redux/Slice/ItemSlice";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Orders = lazy(() => import("./pages/Orders"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
function App() {
  const dispatch = useDispatch();
  const cartValue = useSelector((state) => state.cart.change);
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const id = useSelector((state) => {
    state.user.id;
  });
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchCartValue = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(
            "https://dine-delight-backend.vercel.app/api/user",
            {
              withCredentials: true,
            }
          );

          dispatch(setCartValue(response.data.cartValue));
        } catch (error) {
          console.error("Failed to fetch cart value:", error);
        }
      }
    };

    fetchCartValue();
  }, [isAuthenticated, cartValue]);

  // Render a loading indicator while checking authentication status
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Navbar />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="custom-toast"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Cart" element={<Cart />} />

          <Route path="/login" element={<AuthRoute element={<Login />} />} />
          <Route
            path="/register"
            element={<AuthRoute element={<Register />} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
