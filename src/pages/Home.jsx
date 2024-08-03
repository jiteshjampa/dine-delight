import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import data from "../data/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../assets/Header.png";
import { setChange } from "../redux/Slice/ItemSlice";
const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartValue = useSelector((state) => {
    state.cart.change;
  });
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const [items, setItems] = useState(
    data.map((item) => ({ ...item, quantity: 1 }))
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = async (item) => {
    if (!isAuthenticated) {
      toast.info("Please log in to add items to the cart.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    if (item.quantity > 0) {
      try {
        const res = await axios.post(
          "https://dine-delight-backend.vercel.app/api/update-cart",
          {
            itemname: item.name,
            quantity: item.quantity,
            cost: item.cost,
          },
          { withCredentials: true }
        );

        dispatch(setChange());
        toast.success("Item added to cart!", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to add item to cart. Please try again.", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          autoClose: 3000,
        });
        console.error("Error adding item to cart:", error);
      }
    } else {
      toast.info("Please select a quantity greater than zero.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        autoClose: 3000,
      });
    }
  };

  const handleIncrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  // Filter items based on search term
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mt-20">
      <div className="w-11/12 h-11/12">
        <img src={Banner} alt="Banner" className="w-full h-full" />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-orange-600 font-mono mt-4">
        Food Items
      </h2>
      <div className="mb-4 border border-orange-600 rounded-md">
        <input
          type="text"
          placeholder="Search Food..."
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center items-center ">
        {filteredItems.map((item, index) => (
          <div key={index} className="bg-gray-800 m-4 p-4 rounded-lg w-80">
            <div className="flex flex-col items-start justify-between text-white font-semibold">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <div className="text-lg font-bold">{item.name}</div>
              <div className="text-md">${item.cost.toFixed(2)}</div>
              <p className="text-sm mt-2">{item.description}</p>
              <div className="flex items-center mt-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-l-lg"
                  onClick={() => handleDecrement(index)}
                >
                  -
                </button>
                <span className="px-4 py-1 bg-black">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded-r-lg"
                  onClick={() => handleIncrement(index)}
                >
                  +
                </button>
              </div>
              <div className="mt-2">
                Total: ${(item.cost * item.quantity).toFixed(2)}
              </div>
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg w-full mt-4"
              onClick={() => handleAddToCart(item)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
