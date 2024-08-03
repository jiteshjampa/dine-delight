// src/pages/NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl">Page Not Found</p>
      <a href="/" className="mt-4 text-blue-600 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
