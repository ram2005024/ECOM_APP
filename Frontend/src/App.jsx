import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Components/SignIn/Login";
import Seller from "./Pages/Seller";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "./slices/authSlice";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/auth/user/me",
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) return toast.error(res.data.message);
        console.log(res.data.user);
        dispatch(login(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = createBrowserRouter([
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/store",
      element: isAuthenticated ? <Seller /> : <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
