import React from "react";
import { LuLoader2 } from "react-icons/lu";
import Load from "../assets/loading.png";
const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full animate-spin mt-20">
      <img src={Load} alt="loader" className=" w-10 h-10" />
    </div>
  );
};

export default Loader;
