import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../../slices/authSlice";
import { addCart } from "../../slices/cartSlice";

const Login = ({ setLogButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentState, setCurrentState] = useState("Login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "Login") {
      setLoading(true);
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/auth/user/login",
          { email, password },
          { withCredentials: true }
        );
        console.log(res.data.user);
        if (!res.data.success) {
          setMessage(res.data.message);
          return;
        }
        if (setLogButton) setLogButton(false);
        dispatch(login(res.data.user));
        navigate(location.pathname);

        const response = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/cart/getCartDetail",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(addCart(response.data.response));
        }
        return;
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (currentState === "Seller") {
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/auth/user/seller/register",
          {
            email,
            password,
            name,
          },
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          setMessage(res.data.message);
          return;
        }
        toast.success(res.data.message);
        dispatch(login(res.data.user));
        setLogButton(false);
        navigate(location.pathname);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    setMessage("");
    setEmail("");
    setPassword("");
    setName("");
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
      className="fixed z-50 inset-0 bg-slate-400/30 backdrop-blur-sm flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {!location.pathname.startsWith("/product") ||
          !location.pathname.startsWith("/cart") ||
          (!location.pathname.startsWith("/orders") && (
            <button
              onClick={() => setLogButton(false)}
              className="absolute cursor-pointer top-5 right-5 z-20 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          ))}

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {currentState === "Login"
              ? "Welcome back"
              : currentState === "Sign Up"
              ? "Create Account"
              : "Become a Seller"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {currentState === "Login"
              ? "Sign in to your account"
              : currentState === "Sign Up"
              ? "Create a new account"
              : "Start selling on our platform"}
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentState("Login")}
              className={`flex-1 py-2 px-4 rounded font-medium transition-all ${
                currentState === "Login"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentState("Sign Up")}
              className={`flex-1 py-2 px-4 rounded font-medium transition-all ${
                currentState === "Sign Up"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setCurrentState("Seller")}
              className={`flex-1 py-2 px-4 rounded font-medium transition-all ${
                currentState === "Seller"
                  ? "bg-amber-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(currentState === "Sign Up" || currentState === "Seller") && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-transparent border border-gray-300 outline-none rounded-lg py-2.5 px-4 text-gray-800 placeholder-gray-400 focus:border-blue-500 transition-colors"
                required
              />
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-300 outline-none rounded-lg py-2.5 px-4 text-gray-800 placeholder-gray-400 focus:border-blue-500 transition-colors"
              type="email"
              placeholder="Enter your email"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-300 outline-none rounded-lg py-2.5 px-4 text-gray-800 placeholder-gray-400 focus:border-blue-500 transition-colors"
              type="password"
              placeholder="Enter your password"
              required
            />

            {currentState === "Login" && (
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {loading && (
              <div className="flex justify-center py-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-colors ${
                currentState === "Seller"
                  ? "bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white"
                  : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white"
              }`}
            >
              {currentState === "Login"
                ? "Log in"
                : currentState === "Sign Up"
                ? "Sign up"
                : "Become a Seller"}
            </button>

            {message && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                {message}
              </div>
            )}
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="w-full bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {currentState === "Login"
              ? "Login with Google"
              : "Sign up with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
