import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/authSlice";
import toast, { ErrorIcon } from "react-hot-toast";
const Login = ({ setLogButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userID = useSelector((state) => state.user?.userID);
  //Login credentials states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // State to track if the user is logging in or signing up
  const [currentState, setCurrentState] = useState("Login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //If user register then
    if (currentState === "Login") {
      setLoading(true);
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/auth/user/login",
          { email, password },
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          setMessage(res.data.message);
          return;
        }
        dispatch(login(res.data.user));

        navigate("/");
        setLogButton(false);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    setMessage("");
    setEmail("");
    setPassword("");
  }, [currentState]);
  useEffect(() => {
    const timer = setTimeout(() => setMessage(""), 2000);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div
      onClick={() => {
        if (location.pathname === "/") setLogButton(false);
      }}
      className="absolute z-50 inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            {currentState === "Login" ? "Welcome back" : "Create Account"}
          </h2>

          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Add Name field only if state is Sign Up */}
            {currentState === "Sign Up" && (
              <input
                id="name"
                className="w-full bg-transparent border mb-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            )}

            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border mb-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="email"
              placeholder="Enter your email"
              required
            />
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="password"
              placeholder="Enter your password"
              required
            />

            {/* Conditional Forgot Password - Only shows on Login */}
            {currentState === "Login" && (
              <div className="text-right py-4">
                <a className="text-blue-600 underline text-xs" href="#">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className={`w-full mb-3 inline-flex gap-2.5 items-center justify-center bg-indigo-500 py-2.5 rounded-full text-white ${
                currentState === "Sign Up" ? "mt-6" : "mt-2"
              }`}
            >
              {loading && (
                <span className="size-7 border-r-2 border-t-2 rounded-full border-gray-200 animate-spin"></span>
              )}
              {currentState === "Login" ? "Log in" : "Sign up"}
            </button>
            {message && (
              <div className="text-red-500 text-sm  flex gap-1.5 ml-4 opacity-90">
                <ErrorIcon className=" fill-red-400" />
                <span>{message}</span>
              </div>
            )}
          </form>

          {/* State Toggle Link */}
          <p className="text-center mt-4">
            {currentState === "Login"
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
              }
              className="text-blue-500 underline cursor-pointer"
            >
              {currentState === "Login" ? "Signup" : "Login"}
            </span>
          </p>

          <button
            type="button"
            className="w-full cursor-pointer hover:bg-gray-100 flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
          >
            <img
              className="h-4 w-4"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
              alt="googleFavicon"
            />
            {currentState === "Login"
              ? "Log in with Google"
              : "Sign up with Google"}
          </button>
        </div>

        {/* Cross Icon */}
        {location.pathname == "/" && (
          <div onClick={() => setLogButton(false)}>
            <X className="size-5 absolute right-6 top-2 cursor-pointer hover:bg-gray-100 transition-all text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
