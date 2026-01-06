import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CoupenSection = ({ onSubmit }) => {
  const [coupenCode, setCoupenCode] = useState("");
  const [calculatedCoupen, setCalculatedCoupen] = useState();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const handleCoupenSubmit = async () => {
    try {
      const res = await toast.promise(
        axios.post(
          import.meta.env.VITE_SERVER_URL + "/cart/coupenApply",
          {
            coupenCode,
            items,
          },
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Applying Coupen...",
          success: (res) => {
            if (res.data.success === false) {
              throw new Error(res.data.message || "Failed to apply coupen");
            } else {
              return res.data.messsage || "Coupen applied";
            }
          },
          error: (error) => {
            return (
              error.response?.data?.message ||
              error.message ||
              "Something went wrong"
            );
          },
        }
      );
      if (res.data.success) {
        setCalculatedCoupen(res.data.coupenDetail);
        onSubmit(res.data.coupenDetail);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-2.5 ">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal:</span>
        <span className="font-bold">${totalPrice}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Shipping:</span>
        <span className="font-bold">Free</span>
      </div>
      {calculatedCoupen ? (
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Discount:</span>
            <span className="font-bold">
              - ${calculatedCoupen.discountedValue}
            </span>
          </div>
          <p className="text-center text-xs flex gap-2 items-center justify-center">
            {calculatedCoupen.coupenDescription}
            <X
              onClick={() => {
                setCalculatedCoupen(null);
                setCoupenCode("");
              }}
              size={12}
              className="hover:text-red-500 transition-colors cursor-pointer"
            />
          </p>
          <hr className="text-gray-300" />
          <div className="flex mt-5 px-3 justify-between text-sm text-gray-500">
            <span>Total:</span>
            <span className="font-bold">$ {calculatedCoupen.grandTotal}</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 text-sm">
          <input
            type="text"
            value={coupenCode}
            onChange={(e) => setCoupenCode(e.target.value)}
            placeholder="Coupen Code"
            className="text-sm pl-3 rounded-md p-2 outline-none ring ring-gray-300 transition-colors focus:ring-indigo-500"
          />
          <button
            onClick={async () => {
              handleCoupenSubmit();
            }}
            className="py-2 px-5 rounded-sm text-xs cursor-pointer text-center bg-slate-700 text-white font-semibold"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default CoupenSection;
