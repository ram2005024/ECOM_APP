import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import { useDispatch } from "react-redux";
import Seller from "./Pages/Seller";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "./slices/authSlice";
import Protected from "./middlewares/Protected";
import Admin from "./Pages/Admin";
import ProductView from "./Pages/ProductView";
import { Footer } from "./Components/Home/Footer";
import MainLayout from "../Layouts/MainLayout";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import { addCart } from "./slices/cartSlice";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import Orders from "./Pages/Orders";
import ViewShop from "./Pages/Shop_Dynamic/ViewShop";
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

        console.log("ME API USER:", res.data.user);
        dispatch(login(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    const getCartDetail = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/cart/getCartDetail",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(addCart(res.data.response));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    getCartDetail();
  }, []);

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        { path: "/shop/:shopId", element: <ViewShop /> },

        {
          path: "/product/:pid",
          element: (
            <Protected>
              <ProductView />
            </Protected>
          ),
        },
        {
          path: "/cart",
          element: (
            <Protected>
              <Cart />
            </Protected>
          ),
        },
        {
          path: "/orders",
          element: (
            <Protected>
              <Orders />
            </Protected>
          ),
        },
      ],
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      element: <ProtectedLayout />,
      children: [
        {
          path: "/admin",
          element: (
            <Protected>
              <Admin />
            </Protected>
          ),
        },
        {
          path: "/store",
          element: (
            <Protected>
              <Seller />
            </Protected>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
