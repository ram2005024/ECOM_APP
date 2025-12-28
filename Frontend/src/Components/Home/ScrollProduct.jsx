import React from "react";

const ScrollProduct = () => {
  const items = [
    "Earpods",
    "Headphone",
    "Mobile",
    "Laptop",
    "Tablet",
    "Smartwatch",
    "Camera",
    "Speaker",
    "Keyboard",
    "Mouse",
  ];
  return (
    <div className="w-10/12 mx-auto mt-20 overflow-hidden mb-30">
      <div className="mask-fade-x">
        <div className="flex  justify-between gap-10 sm:mr-20 mr-0 animate-marquee ">
          {[...items, ...items].map((i) => {
            return (
              <span
                className="hover:pause-on-child-hover bg-gray-200 cursor-pointer rounded-lg text-sm hover:bg-gray-300 pause-on-hover text-gray-500 px-2 py-1.5 text-center"
                id="i"
              >
                {i}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollProduct;
