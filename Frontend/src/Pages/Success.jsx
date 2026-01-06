import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../slices/cartSlice";
const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const sessionID = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/cart/payment/verify",
          {
            sessionID,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          navigate("/orders");
          dispatch(deleteCart());
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyPayment();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-xl text-gray-700">Payment verifying...</p>
      </div>
    </div>
  );
};

export default Success;
