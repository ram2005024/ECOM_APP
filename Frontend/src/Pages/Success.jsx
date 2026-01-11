import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { login } from "../slices/authSlice";
const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const sessionID = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    const type = new URLSearchParams(window.location.search).get("type");
    const verifyPayment = async () => {
      if (type === "cart") {
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
            navigate("/orders", { replace: true });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (type === "subscription") {
        try {
          const sessionId = new URLSearchParams(window.location.search).get(
            "session_id"
          );
          const res = await axios.post(
            import.meta.env.VITE_SERVER_URL +
              "/subscription/plus/session/verify",
            {
              sessionId,
            },
            {
              withCredentials: true,
            }
          );
          if (res.data.success) {
            dispatch(login({ ...user, plusMember: true }));
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (type === "sellerSubscription") {
        try {
          const sessionId = new URLSearchParams(window.location.search).get(
            "session_id"
          );
          const res = await axios.post(
            import.meta.env.VITE_SERVER_URL +
              "/subscription/seller/session/verify",
            {
              sessionId,
            },
            {
              withCredentials: true,
            }
          );
          if (res.data.success) {
            console.log("hello bri");
            const user = await axios.get(
              import.meta.env.VITE_SERVER_URL + "/auth/user/me",
              {
                withCredentials: true,
              }
            );
            dispatch(login(user.data.user));
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.log(error);
        }
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
