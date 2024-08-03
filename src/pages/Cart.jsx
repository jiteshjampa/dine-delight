import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { setChange } from "../redux/Slice/ItemSlice";

const Cart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "https://dine-delight-backend.vercel.app/api/cart",
        {
          withCredentials: true,
        }
      );
      setItems(response.data.cartitems); // Adjust to match the data structure
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      toast.error("Failed to load cart items.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    } else {
      toast.info("Please log in to view your cart.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        autoClose: 3000,
      });
      navigate("/Login");
    }
  }, [isAuthenticated]);

  const handleIncrement = async (item) => {
    try {
      await axios.put(
        `https://dine-delight-backend.vercel.app/api/cart/increment`,
        { itemname: item.itemname },
        {
          withCredentials: true,
        }
      );
      fetchCartItems();
    } catch (error) {
      console.error("Failed to increment item quantity:", error);
    }
  };

  const handleDecrement = async (item) => {
    try {
      await axios.put(
        `https://dine-delight-backend.vercel.app/api/cart/decrement`,
        { itemname: item.itemname },
        {
          withCredentials: true,
        }
      );
      fetchCartItems();
    } catch (error) {
      console.error("Failed to decrement item quantity:", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      await axios.delete(
        `https://dine-delight-backend.vercel.app/api/delete-item`,
        {
          data: { itemname: item.itemname },
          withCredentials: true,
        }
      );
      dispatch(setChange());
      fetchCartItems();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleOrder = async () => {
    try {
      const response = await axios.post(
        "https://dine-delight-backend.vercel.app/api/order",
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Order placed successfully.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        autoClose: 2000,
      });
      dispatch(setChange());
      navigate("/");
      // Optionally clear cart or redirect to another page
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-4 mt-24">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 text-2xl flex justify-center items-center w-full h-[300px] font-semibold">
          Your cart is empty.
        </p>
      ) : (
        <div>
          {/* Table layout for large devices */}
          <div className="hidden lg:block">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border text-left">Item</th>
                  <th className="py-2 px-4 border text-left">Price</th>
                  <th className="py-2 px-4 border text-left">Quantity</th>
                  <th className="py-2 px-4 border text-left">Total</th>
                  <th className="py-2 px-4 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4 border">{item.itemname}</td>
                    <td className="py-2 px-4 border">
                      ${item.cost.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleDecrement(item)}
                          className="px-2 py-1 bg-red-500 text-white rounded-l-md hover:bg-red-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item)}
                          className="px-2 py-1 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4 border">
                      ${(item.cost * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleRemove(item)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for medium and smaller devices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                <div className="font-semibold text-gray-800">
                  {item.itemname}
                </div>
                <div className="text-sm text-gray-600">
                  ${item.cost.toFixed(2)}
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="px-2 py-1 bg-red-500 text-white rounded-l-md hover:bg-red-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-200">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="px-2 py-1 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="mt-2">
                  Total: ${(item.cost * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 font-bold text-xl text-gray-800">
            Total Amount: $
            {items
              .reduce((total, item) => total + item.cost * item.quantity, 0)
              .toFixed(2)}
          </div>
        </div>
      )}
      <div>
        <button
          onClick={handleOrder} // Update to call handleOrder function
          className={`${
            items.length == 0 ? "hidden" : ""
          } rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition-colors`}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
