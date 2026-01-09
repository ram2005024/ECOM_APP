import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import { useDispatch, useSelector } from "react-redux";
import Seller from "./Pages/Seller";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "./slices/authSlice";
import Protected from "./middlewares/Protected";
import Admin from "./Pages/Admin";
import ProductView from "./Pages/ProductView";
import MainLayout from "../Layouts/MainLayout";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import { addCart } from "./slices/cartSlice";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import Orders from "./Pages/Orders";
import ViewShop from "./Pages/Shop_Dynamic/ViewShop";
import ContactAdmin from "./Pages/Contacts/ContactAdmin";
import ProtectSeller from "./middlewares/ProtectSeller";
import { createSeller } from "./slices/sellerSlice";
import ProtectContactAdmin from "./middlewares/ContactAdmin";
import ProtectAdmin from "./middlewares/ProtectAdmin";
const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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

        dispatch(login(res.data.user));
        if (res.data.user.role === "seller") {
          try {
            const resp = await axios.post(
              import.meta.env.VITE_SERVER_URL + "/store/get",
              { userID: res.data.user?.id },
              {
                withCredentials: true,
              }
            );
            if (!resp.data.success) {
              toast.error(resp.data.message);
              return;
            }

            dispatch(createSeller(resp.data.seller));
          } catch (error) {
            console.log(error);
          }
        }
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
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/contact/admin",

          element: (
            <ProtectContactAdmin>
              <ContactAdmin />
            </ProtectContactAdmin>
          ),
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
              <ProtectAdmin>
                <Admin />
              </ProtectAdmin>
            </Protected>
          ),
        },
        {
          path: "/store",
          element: (
            <Protected>
              <ProtectSeller>
                <Seller />
              </ProtectSeller>
            </Protected>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
