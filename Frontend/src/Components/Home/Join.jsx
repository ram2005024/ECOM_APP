import React from "react";

const Join = () => {
  return (
    <div>
      <div className="w-10/12 mx-auto flex flex-col justify-center items-center mb-50">
        <div className="flex flex-col gap-6 mb-15 justify-center items-center">
          <h2 className="text-xl font-semibold">Join ShoppyGo</h2>
          <p className="text-sm text-gray-700 max-w-md ">
            Suscribe to ShoppyGo to get new exclusive memebership which assures
            to give you best deals,free shipping and many more discount offers.
          </p>
        </div>
        <div className="border border-gray-400 rounded-full  p-1 relative">
          <input
            type="text"
            placeholder="Enter your email"
            className="md:p-4 md:pl-5 md:pr-50 p-2 md:text-sm text-xs  text-gray-600 bg-gray-200 rounded-full outline-none"
          />
          <button className="bg-green-600 cursor-pointer  transform transition-all hover:scale-105 text-white text-xs md:text-sm md:py-2.5 p-1 md:px-3.5 absolute right-2 top-2.5 rounded-full">
            Get Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
