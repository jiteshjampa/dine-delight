import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../data/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [groupedOrders, setGroupedOrders] = useState(null); // Initial state set to null
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  // Function to find image by item name
  const findItemByName = (name) => {
    const item = data.find((item) => item.name === name);
    return item ? item.image : "http://example.com/default.jpg"; // Default image if not found
  };

  // Fetch orders from API
  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            "https://dine-delight-backend.vercel.app/api/order",
            {
              withCredentials: true,
            }
          );
          setGroupedOrders(response.data.groupedOrderItems);
        } catch (error) {
          console.error("Error fetching orders:", error);
          setGroupedOrders({}); // Set to empty object on error to avoid infinite loading
        }
      };

      fetchOrders();
    } else {
      navigate("/Login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="p-4 mt-20">
      {groupedOrders && Object.keys(groupedOrders).length > 0 ? (
        Object.keys(groupedOrders).map((date, index) => (
          <div key={index}>
            <h2 className="text-xl font-mono font-bold mt-4 mb-2">
              {new Date(date).toDateString()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedOrders[date].map((item, index) => {
                const itemImage = findItemByName(item.itemname);

                return (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden shadow-lg bg-white"
                  >
                    <img
                      src={itemImage}
                      alt={item.itemname}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{item.itemname}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-800 font-semibold">
                          ${item.cost.toFixed(2)}
                        </span>
                        <span className="text-gray-800">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="my-4 border-t border-gray-300" />
          </div>
        ))
      ) : (
        <div className="w-full h-full mt-10 font-semibold text-2xl flex justify-center items-center text-gray-500">
          Empty Orders
        </div>
      )}
    </div>
  );
};

export default Order;
